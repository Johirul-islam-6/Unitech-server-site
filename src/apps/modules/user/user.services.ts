import { IGenaricRespons } from './../../../interfaces/common';
import httpStatus from 'http-status';
import { ApiError } from '../../../errors/ApiError';
import { ISearchUser, IUser, IUserLogin } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { IPaginationOpton } from '../../../interfaces/pagination';

import { HelperPagination } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import { userSearchableFields } from './user.constant';
import { Types } from 'mongoose';
import { sendEmail } from './sendResetPass';

// ==============> all user business logic applies  this services page ================>

// -----> single user created business logic------>
const createdUser = async (user: IUser): Promise<IUserLogin | null> => {
  const {
    email,
    name,
    phone,
    ruler,
    gender,
    studentRoll,
    institute,
    department,
    address,
    joinginDate,
  } = user;

  const createAuser = await User.create(user);

  if (!createAuser) {
    throw new Error('Failed to Create A user');
  }
  const { id } = createAuser;
  // Generate access token
  const accessToken = jwtHelpers.createToken(
    { email: user?.email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  // Generate refresh token
  const refreshToken = jwtHelpers.createToken(
    { email: user?.email },
    config.jwt.secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  // Attach the tokens to the user object
  // createAuser.accessToken = accessToken;
  // createAuser.refreshToken = refreshToken;

  // console.log(createAuser?.accessToken, "accesstoken")
  // console.log(createAuser, "created")

  return {
    accessToken,
    refreshToken,
    email,
    id,
    name,
    phone,
    ruler,
    gender,
    studentRoll,
    institute,
    department,
    address,
    joinginDate,
  };
};

// -----> Login User business logic ------->
const loginUser = async (payload: IUser): Promise<IUserLogin | null> => {
  const { email, password } = payload;
  // check user exist
  const isUserExist = await User.findOne(
    { email },
    { email: 1, password: 1 }
  ).lean();

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user does not email exist', '');
  }
  //  ## user password Match to the database Password
  const isPasswordMatch = await bcrypt.compare(password, isUserExist?.password);

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Your Password incorrect', '');
  }
  const studentInfo = await User.findOne({ email: email });
  const {
    name,
    id,
    phone,
    ruler,
    gender,
    studentRoll,
    institute,
    department,
    address,
    joinginDate,
  } = studentInfo || {};

  // create accessToken Token
  const accessToken = jwtHelpers.createToken(
    { email: isUserExist.email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  // create refreshToken Token
  const refreshToken = jwtHelpers.createToken(
    { email: isUserExist.email },
    config.jwt.expires_in as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken: accessToken ?? '',
    refreshToken: refreshToken ?? '',
    email,
    id: id ?? '',
    name: name ?? '',
    phone: phone ?? '',
    ruler: ruler ?? '',
    gender: gender ?? '',
    studentRoll: studentRoll ?? '',
    institute: institute ?? '',
    department: department ?? '',
    address: address ?? '',
    joinginDate: joinginDate ?? '',
  };
};

// get Searching Student
const getSearchingUser = async (
  filtering: any,
  paginationOption: IPaginationOpton
): Promise<IGenaricRespons<ISearchUser[]> | null> => {
  const { searchTerm, ...filtersData } = filtering;

  // this variable find database collection/ model querys
  const andConditions = [];

  // This is Searching Condition
  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  //This is Filering condition
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  //This is Pagination sorting limit etc condition
  const { page, limit, skip, sortBy, sortOrder } =
    HelperPagination.calculationPagination(paginationOption);

  // sort conditions base get all data
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // condition display data show
  const whereConditons =
    andConditions.length > 0 ? { $and: andConditions } : {};

  // get to the all data in mongoDb model/collection .
  const result = await User.find(whereConditons)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  //total modal/collections Number count
  const total = await User.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Update a User Ruler
const updateRuler = async (id: string, data: string): Promise<IUser | null> => {
  const objectId = new Types.ObjectId(id);

  // Check if the user exists
  const isExist = await User.findOne({ _id: objectId });

  if (!isExist) {
    throw new Error("User doesn't match Id");
  }

  // Update the ruler field
  const result = await User.findOneAndUpdate(
    { _id: objectId },
    { ruler: data },
    { new: true }
  );

  return result;
};
// Update a User Ruler
const singelUser = async (id: string): Promise<IUser | null> => {
  const objectId = Types.ObjectId.createFromHexString(id);

  // Check if the user exists
  const isExist = await User.findOne({ _id: objectId });

  if (!isExist) {
    throw new Error("User doesn't match Id");
  }

  return isExist;
};

//forgot password
const forgotPass = async (payload: any) => {
  // Check if the user exists

  const isExist = await User.findOne(
    { email: payload?.email },
    { id: 1, email: 1, name: 1 }
  );

  if (!isExist) {
    throw new Error("User doesn't registration Account!");
  }

  const createPasswordToken = await jwtHelpers.createForgotPasswordToken(
    {
      _id: isExist?._id,
    },
    config.jwt.secret as string,
    '15m'
  );

  const resetClientLink: string =
    config.resetPassLink + `${createPasswordToken}`;

  await sendEmail(
    isExist?.email,
    `
  <div>
   <h1>Hi! ${isExist?.name}</h1>
   <h5 style="font-size: 14px;">Your Reset Password Link Is : <a href="${resetClientLink}" style="color: blue; text-decoration: underline; font-size: 14px;">${resetClientLink?.slice(
      0,
      100
    )}...</a></h5>
   <p>Thank You ${isExist?.name}</p>
</div>


  `
  );
  return 'Check your Email!';
};

// Reset Password set
const resetPasswordSet = async (payload: {
  id: string;
  password: string;
  token: string;
}) => {
  const { id, password, token } = payload;

  // Check if the user exists
  const isUser = await User.findOne({ _id: id }, { _id: 1, email: 1, name: 1 });

  if (!isUser) {
    throw new Error("User doesn't match Id");
  }

  const result = await jwtHelpers.verifiedToken(
    token,
    config.jwt.secret as string
  );

  if (!result) {
    throw new Error("jwt token doesn't match!");
  }

  // ---- set new password ----

  const newPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_round)
  );

  await User.updateOne({ _id: isUser?._id }, { password: newPassword });

  return '';
};

const updateRoll = async (id: string, data: string): Promise<IUser | null> => {
  const objectId = new Types.ObjectId(id);

  // Check if the user exists
  const isExist = await User.findOne({ _id: objectId });

  if (!isExist) {
    throw new Error("Book doesn't match Id");
  }
  // Check if the user exists
  const isExistRoll = await User.findOne({ studentRoll: data });

  if (isExistRoll) {
    throw new Error('This roll already Exists!');
  }

  // Update the ruler field
  const result = await User.findOneAndUpdate(
    { _id: objectId },
    { studentRoll: data },
    { new: true }
  );

  return result;
};

export const UserServices = {
  createdUser,
  loginUser,
  getSearchingUser,
  updateRuler,
  singelUser,
  resetPasswordSet,
  forgotPass,
  updateRoll,
};
