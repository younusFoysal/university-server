import express, {NextFunction} from "express";
import {UserControllers} from "./user.controller";
import {createStudentValidationSchema} from "../student/student.zod.validation";
import validateRequest from "../../app/middlwares/validateRequest";



const router = express.Router();


// Will Call controller function
// @ts-ignore
router.post("/create-student", validateRequest(createStudentValidationSchema),  UserControllers.createStudent);
// router.get('/', UserControllers.getAllStudents);



export const UserRoutes =  router;