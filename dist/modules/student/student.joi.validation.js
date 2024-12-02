"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userNameSchema = joi_1.default.object({
    firstName: joi_1.default.string()
        .trim()
        .required()
        .max(20)
        .custom((value, helpers) => {
        const firstName = value.charAt(0).toUpperCase() + value.slice(1);
        if (value !== firstName) {
            return helpers.error('any.invalid', { value });
        }
        return value;
    })
        .messages({
        'string.empty': 'First name is required',
        'string.max': 'Name can not be longer than 20',
        'any.invalid': '{#value} is not capitalize format',
    }),
    middleName: joi_1.default.string().optional(),
    lastName: joi_1.default.string()
        .required()
        .custom((value, helpers) => {
        if (!/^[a-zA-Z]+$/.test(value)) {
            return helpers.error('string.alphanum');
        }
        return value;
    })
        .messages({
        'string.empty': 'Last name is required',
        'string.alphanum': '{#value} is not alphanumeric',
    }),
});
const guardianSchema = joi_1.default.object({
    fatherName: joi_1.default.string().required().messages({ 'string.empty': 'Father name is required' }),
    fatherEmail: joi_1.default.string()
        .required()
        .email()
        .messages({ 'string.email': 'Invalid father email', 'string.empty': 'Father email is required' }),
    fatherPhone: joi_1.default.string().required().messages({ 'string.empty': 'Father phone is required' }),
    fatherOccupation: joi_1.default.string().required().messages({ 'string.empty': 'Father occupation is required' }),
    motherName: joi_1.default.string().required().messages({ 'string.empty': 'Mother name is required' }),
    motherEmail: joi_1.default.string()
        .required()
        .email()
        .messages({ 'string.email': 'Invalid mother email', 'string.empty': 'Mother email is required' }),
    motherPhone: joi_1.default.string().required().messages({ 'string.empty': 'Mother phone is required' }),
    motherOccupation: joi_1.default.string().required().messages({ 'string.empty': 'Mother occupation is required' }),
});
const localGuardianSchema = joi_1.default.object({
    name: joi_1.default.string().required().messages({ 'string.empty': 'Local guardian name is required' }),
    occupation: joi_1.default.string().required().messages({ 'string.empty': 'Local guardian occupation is required' }),
    contactNo: joi_1.default.string().required().messages({ 'string.empty': 'Local guardian contact number is required' }),
    address: joi_1.default.string().required().messages({ 'string.empty': 'Local guardian address is required' }),
});
const studentValidationSchema = joi_1.default.object({
    id: joi_1.default.string().required().messages({ 'string.empty': 'Student ID is required' }),
    name: userNameSchema.required(),
    gender: joi_1.default.string()
        .valid('male', 'female', 'other')
        .required()
        .messages({ 'any.only': '{#value} is invalid', 'string.empty': 'Gender is required' }),
    dateOfBirth: joi_1.default.string().optional(),
    email: joi_1.default.string()
        .required()
        .email()
        .messages({ 'string.email': '{#value} is not a valid email', 'string.empty': 'Email is required' }),
    contactNo: joi_1.default.string().required().messages({ 'string.empty': 'Contact number is required' }),
    emergencyContactNo: joi_1.default.string().required().messages({ 'string.empty': 'Emergency contact number is required' }),
    bloodGroup: joi_1.default.string()
        .valid('A+', 'A-', 'AB-', 'B-', 'O-')
        .optional()
        .messages({ 'any.only': 'Invalid blood group' }),
    presentAddress: joi_1.default.string().required().messages({ 'string.empty': 'Present address is required' }),
    permanentAddress: joi_1.default.string().required().messages({ 'string.empty': 'Permanent address is required' }),
    guardian: guardianSchema.required(),
    localGuardian: localGuardianSchema.required(),
    profileImg: joi_1.default.string().optional(),
    isActive: joi_1.default.string()
        .valid('active', 'blocked')
        .default('active')
        .messages({ 'any.only': '{#value} is not valid' }),
});
exports.default = studentValidationSchema;
