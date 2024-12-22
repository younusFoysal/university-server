import { z } from "zod";

// academicDepartment

const createAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({invalid_type_error: 'Name must be string', required_error: 'Name is required'}),
        academicFaculty: z.string({invalid_type_error: 'Faculty must be string', required_error: 'Faculty is required'}),
    })
})

const updateAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({invalid_type_error: 'Name must be string', required_error: 'Name is required'}).optional(),
        academicFaculty: z.string({invalid_type_error: 'Faculty must be string', required_error: 'Faculty is required'}).optional(),
    })
})

export const academicDepartmentValidation = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema
}