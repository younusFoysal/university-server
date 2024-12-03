import express from "express";
import {UserControllers} from "./user.controller";


const router = express.Router();

// Will Call controller function
router.post("/create-student", UserControllers.createStudent);
// router.get('/', UserControllers.getAllStudents);



export const UserRoutes =  router;