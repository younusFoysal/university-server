import express from "express";
import validateRequest from "../../app/middlwares/validateRequest";
import {academicDepartmentValidation} from "./academicDepartment.validation";
import {AcademicDepartmentControllers} from "./academicDepartment.controller";


const router = express.Router();


// @ts-ignore
router.post('/create-academic-department', validateRequest(
        academicDepartmentValidation.createAcademicDepartmentValidationSchema,
    ),
    AcademicDepartmentControllers.createAcademicDepartment,
);

router.get(
    '/:DepartmentId',
    AcademicDepartmentControllers.getSingleAcademicDepartment,
);

// @ts-ignore
router.patch('/:DepartmentId', validateRequest( academicDepartmentValidation.updateAcademicDepartmentValidationSchema,
    ),
    AcademicDepartmentControllers.updateAcademicDepartment,
);

router.get('/', AcademicDepartmentControllers.getAllAcademicFaculties);


export const AcademicDepartmentRouter =  router;