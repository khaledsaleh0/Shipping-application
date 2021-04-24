import { check } from "express-validator";
import Port from "../models/portModel.js";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./factoryhandler.js";

//* ==========================================================

//! Get All Ports
export const getAllPorts = getAll(Port);

// ==========================================================

//! Add New Port
export const validatePort = [check("name", "Port Name is required.").trim().exists().notEmpty()];
export const addPorts = createOne(Port);

// ==========================================================

//! Get Port By ID
export const getPortByID = getOne(Port);

// ==========================================================

//! Update Port By ID
export const updatePortByID = updateOne(Port);

// ==========================================================

//! Delete Port By ID
export const deletePortByID = deleteOne(Port);
