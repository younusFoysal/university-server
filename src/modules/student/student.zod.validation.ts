import { z } from "zod";

// Zod schemas for nested fields
const userNameValidationSchema = z.object({
    firstName: z
        .string()
        .nonempty("First name is required")
        .max(20, "Name cannot be longer than 20 characters")
        .refine(
            (value) => value.charAt(0) === value.charAt(0).toUpperCase(),
            { message: "First name must be in capitalized format" }
        ),
    middleName: z.string().optional(),
    lastName: z
        .string()
        .nonempty("Last name is required")
        .refine((value) => /^[a-zA-Z]+$/.test(value), {
            message: "Last name must contain only alphabetic characters",
        }),
});

const guardianValidationSchema = z.object({
    fatherName: z.string().nonempty("Father's name is required"),
    fatherEmail: z
        .string()
        .nonempty("Father's email is required")
        .email("Invalid email format"),
    fatherPhone: z.string().nonempty("Father's phone is required"),
    fatherOccupation: z.string().nonempty("Father's occupation is required"),
    motherName: z.string().nonempty("Mother's name is required"),
    motherEmail: z
        .string()
        .nonempty("Mother's email is required")
        .email("Invalid email format"),
    motherPhone: z.string().nonempty("Mother's phone is required"),
    motherOccupation: z.string().nonempty("Mother's occupation is required"),
});

const localGuardianValidationSchema = z.object({
    name: z.string().nonempty("Local guardian's name is required"),
    occupation: z.string().nonempty("Local guardian's occupation is required"),
    contactNo: z.string().nonempty("Local guardian's contact number is required"),
    address: z.string().nonempty("Local guardian's address is required"),
});

// Main student schema
export const createStudentValidationSchema = z.object({
    body:  z.object({
        password: z.string().max(20),
        student: z.object({
            name: userNameValidationSchema,
            gender: z.enum(["male", "female", "other"], {
                errorMap: () => ({ message: "Gender must be one of 'male', 'female', or 'other'" }),
            }),
            dateOfBirth: z.string().optional(),
            email: z
                .string()
                .nonempty("Email is required")
                .email("Invalid email format"),
            contactNo: z.string().nonempty("Contact number is required"),
            emergencyContactNo: z.string().nonempty("Emergency contact number is required"),
            bloodGroup: z.enum(['A+' , "AB+" , "B+" , "O+" , "A-" , "AB-" , "B-" , "O-"]).optional(),
            presentAddress: z.string().nonempty("Present address is required"),
            permanentAddress: z.string().nonempty("Permanent address is required"),
            guardian: guardianValidationSchema,
            localGuardian: localGuardianValidationSchema,
            admissionSemester: z.string(),
            profileImg: z.string().optional(),
        })
    })
})


export const studentValidationSchemas = {
    createStudentValidationSchema
};
