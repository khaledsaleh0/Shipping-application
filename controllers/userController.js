import { getAll, getOne } from "./factoryhandler.js";
import User from "../models/userModel.js";

//* ============================================================

//! get all users - Admin
export const getAllUsers = getAll(User);

//! Get user data
export const getUser = getOne(User);
