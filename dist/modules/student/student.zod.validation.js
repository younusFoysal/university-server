"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidationSchema = void 0;
const zod_1 = require("zod");
// Zod schemas for nested fields
const userNameSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .nonempty("First name is required")
        .max(20, "Name cannot be longer than 20 characters")
        .refine((value) => value.charAt(0) === value.charAt(0).toUpperCase(), { message: "First name must be in capitalized format" }),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z
        .string()
        .nonempty("Last name is required")
        .refine((value) => /^[a-zA-Z]+$/.test(value), {
        message: "Last name must contain only alphabetic characters",
    }),
});
const guardianSchema = zod_1.z.object({
    fatherName: zod_1.z.string().nonempty("Father's name is required"),
    fatherEmail: zod_1.z
        .string()
        .nonempty("Father's email is required")
        .email("Invalid email format"),
    fatherPhone: zod_1.z.string().nonempty("Father's phone is required"),
    fatherOccupation: zod_1.z.string().nonempty("Father's occupation is required"),
    motherName: zod_1.z.string().nonempty("Mother's name is required"),
    motherEmail: zod_1.z
        .string()
        .nonempty("Mother's email is required")
        .email("Invalid email format"),
    motherPhone: zod_1.z.string().nonempty("Mother's phone is required"),
    motherOccupation: zod_1.z.string().nonempty("Mother's occupation is required"),
});
const localGuardianSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty("Local guardian's name is required"),
    occupation: zod_1.z.string().nonempty("Local guardian's occupation is required"),
    contactNo: zod_1.z.string().nonempty("Local guardian's contact number is required"),
    address: zod_1.z.string().nonempty("Local guardian's address is required"),
});
// Main student schema
exports.studentValidationSchema = zod_1.z.object({
    id: zod_1.z.string().nonempty("ID is required"),
    password: zod_1.z.string().max(20),
    name: userNameSchema,
    gender: zod_1.z.enum(["male", "female", "other"], {
        errorMap: () => ({ message: "Gender must be one of 'male', 'female', or 'other'" }),
    }),
    dateOfBirth: zod_1.z.string().optional(),
    email: zod_1.z
        .string()
        .nonempty("Email is required")
        .email("Invalid email format"),
    contactNo: zod_1.z.string().nonempty("Contact number is required"),
    emergencyContactNo: zod_1.z.string().nonempty("Emergency contact number is required"),
    bloodGroup: zod_1.z.enum(['A+', "AB+", "B+", "O+", "A-", "AB-", "B-", "O-"]).optional(),
    presentAddress: zod_1.z.string().nonempty("Present address is required"),
    permanentAddress: zod_1.z.string().nonempty("Permanent address is required"),
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: zod_1.z.string().optional(),
    isActive: zod_1.z.enum(["active", "blocked"]).default("active"),
    isDeleted: zod_1.z.boolean().default(false)
});
exports.default = exports.studentValidationSchema;
