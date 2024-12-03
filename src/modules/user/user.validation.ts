import { z } from "zod";


const UserValidationSchema = z.object({
    id: z.string({invalid_type_error: 'ID must be string'}),
    password: z.string().max(20, {message: 'Password can not be more than 20 characters'}).optional(),
})

export const UserValidation = {
    UserValidationSchema,
}