import express from "express";
import {AcademicSemesterControllers} from "./academicSemester.controller";
import validateRequest from "../../app/middlwares/validateRequest";
import {AcademicSemesterValidations} from "./academicSemester.validation";


const router = express.Router();

// Will Call controller function

// router.get('/', StudentControllers.getAllStudents);
// router.get('/:studentId', StudentControllers.getSingleStudent);
// router.delete('/:studentId', StudentControllers.deleteSingleStudent);


// @ts-ignore
router.post('/create-academic-semester', validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema),
    AcademicSemesterControllers.createAcademicSemester)

export const AcademicSemesterRouter =  router;