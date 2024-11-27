import {Request, Response} from "express";
import { StudentServices} from "./student.service";


const createStudent = async (req: Request, res: Response) => {
    try{
        const { student : studentData} = req.body;
        // will call service function
        const result = await StudentServices.createStudentIntoDB(studentData);
        //send res
        console.log(result);
        res.status(200).json({
            success: true,
            message: "Student created successfully",
            data: studentData
        });
    }catch(err){
        console.log(err);
        res.status(500).send({});
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
    }
};


export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent
};