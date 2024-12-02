import Joi from "joi";


const userNameSchema = Joi.object({
    firstName: Joi.string()
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
    middleName: Joi.string().optional(),
    lastName: Joi.string()
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

const guardianSchema = Joi.object({
    fatherName: Joi.string().required().messages({ 'string.empty': 'Father name is required' }),
    fatherEmail: Joi.string()
        .required()
        .email()
        .messages({ 'string.email': 'Invalid father email', 'string.empty': 'Father email is required' }),
    fatherPhone: Joi.string().required().messages({ 'string.empty': 'Father phone is required' }),
    fatherOccupation: Joi.string().required().messages({ 'string.empty': 'Father occupation is required' }),
    motherName: Joi.string().required().messages({ 'string.empty': 'Mother name is required' }),
    motherEmail: Joi.string()
        .required()
        .email()
        .messages({ 'string.email': 'Invalid mother email', 'string.empty': 'Mother email is required' }),
    motherPhone: Joi.string().required().messages({ 'string.empty': 'Mother phone is required' }),
    motherOccupation: Joi.string().required().messages({ 'string.empty': 'Mother occupation is required' }),
});

const localGuardianSchema = Joi.object({
    name: Joi.string().required().messages({ 'string.empty': 'Local guardian name is required' }),
    occupation: Joi.string().required().messages({ 'string.empty': 'Local guardian occupation is required' }),
    contactNo: Joi.string().required().messages({ 'string.empty': 'Local guardian contact number is required' }),
    address: Joi.string().required().messages({ 'string.empty': 'Local guardian address is required' }),
});

const studentValidationSchema = Joi.object({
    id: Joi.string().required().messages({ 'string.empty': 'Student ID is required' }),
    name: userNameSchema.required(),
    gender: Joi.string()
        .valid('male', 'female', 'other')
        .required()
        .messages({ 'any.only': '{#value} is invalid', 'string.empty': 'Gender is required' }),
    dateOfBirth: Joi.string().optional(),
    email: Joi.string()
        .required()
        .email()
        .messages({ 'string.email': '{#value} is not a valid email', 'string.empty': 'Email is required' }),
    contactNo: Joi.string().required().messages({ 'string.empty': 'Contact number is required' }),
    emergencyContactNo: Joi.string().required().messages({ 'string.empty': 'Emergency contact number is required' }),
    bloodGroup: Joi.string()
        .valid('A+', 'A-', 'AB-', 'B-', 'O-')
        .optional()
        .messages({ 'any.only': 'Invalid blood group' }),
    presentAddress: Joi.string().required().messages({ 'string.empty': 'Present address is required' }),
    permanentAddress: Joi.string().required().messages({ 'string.empty': 'Permanent address is required' }),
    guardian: guardianSchema.required(),
    localGuardian: localGuardianSchema.required(),
    profileImg: Joi.string().optional(),
    isActive: Joi.string()
        .valid('active', 'blocked')
        .default('active')
        .messages({ 'any.only': '{#value} is not valid' }),
});


export default studentValidationSchema;