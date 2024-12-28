import express from "express";
import {StudentControllers} from "./student.controller";
import validateRequest from "../../app/middlwares/validateRequest";
import {updateStudentValidationSchema} from "./student.zod.validation";

const router = express.Router();

// Will Call controller function

router.get('/', StudentControllers.getAllStudents);
router.get('/:studentId', StudentControllers.getSingleStudent);
// @ts-ignore
router.patch('/:studentId', validateRequest(updateStudentValidationSchema), StudentControllers.updateStudent);
router.delete('/:studentId', StudentControllers.deleteSingleStudent);


export const StudentRoutes =  router;