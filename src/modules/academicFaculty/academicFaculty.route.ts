import express from "express";
import validateRequest from "../../app/middlwares/validateRequest";
import {academicFacultyValidation} from "./academicFaculty.validation";
import {AcademicFacultyControllers} from "./academicFaculty.controller";


const router = express.Router();


// @ts-ignore
router.post('/create-academic-faculty', validateRequest(
        academicFacultyValidation.createAcademicFacultyValidationSchema,
    ),
    AcademicFacultyControllers.createAcademicFaculty,
);

router.get(
    '/:facultyId',
    AcademicFacultyControllers.getSingleAcademicFaculty,
);

// @ts-ignore
router.patch('/:facultyId', validateRequest( academicFacultyValidation.updateAcademicFacultyValidationSchema,
    ),
    AcademicFacultyControllers.updateAcademicFaculty,
);

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);


export const AcademicFacultyRouter =  router;