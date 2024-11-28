import {Request, Response} from "express";
import { StudentServices} from "./student.service";
import studentValidationSchema from "./student.zod.validation";



const createStudent = async (req: Request, res: Response) => {
    try{
        // TODO: creating a schema validation using joi
        // const JoivalidationSchema = Joi.object({
        //     id: Joi.string().required(),
        //     name: {
        //         firstname: Joi.string().max(20).required(),
        //         middleName: Joi.string().max(20).required(),
        //         lastName: Joi.string().max(20).required(),
        //     },
        //     email: Joi.string().email().required(),
        //     gender: Joi.string().required().valid(["male", "female", "other"])
        // })


        // TODO: creating a schema validation using Zod
        // const studentValidationSchema = z.object({
        //     id: z.string(),
        //     name: z.object({
        //         firstName: z.string().max(20, { message: "First name must be at least 20 characters"})
        //     })
        // })



        const { student : studentData} = req.body;

        // TODO:  data validation using joi
        //const {value, error} = studentValidationSchema.validate(studentData)
        //console.log(value, error)

        // TODO:  data validation using zod
        const zodparseddata = await studentValidationSchema.parse(studentData)
        // studentValidationSchema

        // will call service function
        const result = await StudentServices.createStudentIntoDB(zodparseddata);

        // if (error){
        //     res.status(500).json({
        //         success: false,
        //         message: "Something went wrong",
        //         error: error.details
        //     })
        // }


        //send res
        console.log(result);
        res.status(200).json({
            success: true,
            message: "Student created successfully",
            data: studentData
        });
    }catch(err: any){
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err
        });
    }
};

const getAllStudents = async (req: Request, res: Response) => {
    try{
        const result = await StudentServices.getAllStudentsFromDB();
        //send res
        res.status(200).json({
            success: true,
            message: "Students are retrieved successfully",
            data: result
        });

    }catch (err){
        console.log(err);
    }
};

const getSingleStudent = async (req: Request, res: Response) => {
    try{

        const studentId: string = req.params.studentId;

        const result = await StudentServices.getSingleStudentFromDB(studentId);
        //send res
        res.status(200).json({
            success: true,
            message: "Student is retrieved successfully",
            data: result
        });

    }catch (err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Student is not retrieved",
            error: err
        });
    }
};


export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent
};