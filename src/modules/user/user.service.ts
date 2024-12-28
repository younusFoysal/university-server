import {TStudent} from "../student/student.interface";
import {Student} from "../student/student.model";
import {User} from "./user.model";
import config from "../../app/config";
import { TUser} from "./user.interface";
import {TAcademicSemester} from "../academicSemester/academicSemester.interface";
import {AcademicSemester} from "../academicSemester/academicSemester.model";
import {generateStudentId} from "./user.utils";
import mongoose from "mongoose";
import AppError from "../../app/errors/AppError";
// @ts-ignore
import httpStatus from "http-status";


const createStudentIntoDB = async (password: string, payload: TStudent) => {

    // create a user object
    const userData: Partial<TUser> = {}

    // if password is not given, use default password
    userData.password = password || (config.default_password as string)

    // set student role
    userData.role = 'student'

    // find academic info
    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)



    const session = await mongoose.startSession()

    try {

        session.startTransaction()

        // @ts-ignore
        userData.id = await generateStudentId(admissionSemester)

        console.log("udatas",userData);

        // create a user (Transion -1 )
        const newUser =  await User.create([userData], {session}); // build in static method of mongoose

        console.log("newUser OK");
        // create a student
        if (!newUser.length){

            throw new AppError(httpStatus.BAD_REQUEST, 'FAiled to create user')
        }


            // set id, _id as user
            payload.id = newUser[0].id;
            payload.user = newUser[0]._id; // reference _id
            console.log("studentData OK")

            // (Transion - 2 )
            const newStudent = await Student.create([payload], {session});

            if (!newStudent.length){
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
            }

            await session.commitTransaction()
            await session.endSession()

            console.log("newStudent OK");
            return newStudent


    } catch (err) {

        await session.abortTransaction()
        await session.endSession()
        throw new Error("Failed to create student")

    }




};


export const UserServices = {
    createStudentIntoDB
}