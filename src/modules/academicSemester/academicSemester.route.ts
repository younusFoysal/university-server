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
router.post('/create-academic-semester', validateRequest(
        AcademicSemesterValidations.createAcdemicSemesterValidationSchema,
    ),
    AcademicSemesterControllers.createAcademicSemester,
);

router.get(
    '/:semesterId',
    AcademicSemesterControllers.getSingleAcademicSemester,
);

// @ts-ignore
router.patch('/:semesterId', validateRequest( AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
    ),
    AcademicSemesterControllers.updateAcademicSemester,
);

router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);


export const AcademicSemesterRouter =  router;