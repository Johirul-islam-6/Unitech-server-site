// import { Schema, model } from 'mongoose';

import { Model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
// Created User resive Value inferface
export type IUser = {
  name: string;
  studentRoll: string;
  institute: string;
  department: string;
  phone: string;
  gender: string;
  email: string;
  address: string;
  password: string;
  ruler: string;
  joinginDate: string;
};

// "name": "Md. Johirul Islam",
//     "roll": "574206",
//     "institute": "Mymensingh Polytechnic Institute",
//     "department": "Computer Science and Technology",
//     "address": "Maskanda, Mymensingh, Bangladesh",
//     "phone": "01824842336",
//     "email": "r@gmail.com",
//     "password": "12456",
//     "gender": "male"

//Created return value
export type IUserCreated = {
  accessToken?: string;
  refreshToken?: string;
  id?: string;
  name: string;
  studentRoll: string;
  institute: string;
  department: string;
  phone: string;
  gender: string;
  email: string;
  address: string;
  password?: string;
  ruler: string;
  joinginDate: string;
};
//login return value
export type IUserLogin = {
  accessToken?: string;
  refreshToken?: string;
  id?: string;
  name: string;
  studentRoll: string;
  institute: string;
  department: string;
  phone: string;
  gender: string;
  email: string;
  address: string;
  password?: string;
  ruler: string;
  joinginDate: string;
};
//get searching all user
export type ISearchUser = {
  name?: string;
  studentRoll?: string;
  id?: string;
};
// update a user ruler
export type IupdateRuler = {
  ruler: string;
};

// Create a new Model type that knows about IUserMethods...
export type UserModel = Model<IUser, Record<string, unknown>>;
