import {TStudent} from "./student.interface";
import {Student} from "./student.model";
import path from "path";
import mongoose from "mongoose";
import AppError from "../../app/errors/AppError";
// @ts-ignore
import httpStatus from "http-status";
import {User} from "../user/user.model";


// const createStudentIntoDB = async (studentdata: TStudent) => {
//
//     if (await Student.isUserExist(studentdata.id)) {
//         throw new Error("Student already exists");
//     }
//     const result =  await Student.create(studentdata); // build in static method of mongoose
//
//
//     // const student = new Student(studentdata) // create an instance
//     // if (await student.isUserExist(studentdata.id)) {
//     //     throw new Error("Student already exists")
//     // }
//
//
//     //const result = await student.save() // build in instance method
//     return result;
// };

const getAllStudentsFromDB = async () => {
    const result = await Student
        .find()
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
            path: 'academicFaculty'
            }
        });
    return result;
};

const getSingleStudentFromDB = async (id:string) => {
    //const result = await Student.findOne({id});

    // const result = await Student.aggregate([
    //     {$match: {id: id}}
    // ]);
    const result = await Student
        .findById('id')
       .populate('admissionSemester')
       .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty'
            }
        });

    return result;
};

// updating both premetive and non premitive object data
const updateStudentIntoDB = async (id:string, payload: Partial<TStudent>) => {


    const { name, guardian, localGuardian, ...remainingStudentData} = payload

    const modifiedUpdatedData : Record<string, unknown>= {...remainingStudentData};

    if (name && Object.keys(name).length){
        for (const [key, value] of Object.entries(name)){
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }

    if (guardian && Object.keys(guardian).length){
        for (const [key, value] of Object.entries(guardian)){
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }

    if (localGuardian && Object.keys(localGuardian).length){
        for (const [key, value] of Object.entries(localGuardian)){
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }

    console.log(modifiedUpdatedData)


    const result = await Student
        .findByIdAndUpdate({id}, modifiedUpdatedData, {new: true, runValidators: true})

    return result;
};


const deleteSingleStudentFromDB = async (id:string) => {

    const session =await mongoose.startSession()

    try {
        session.startTransaction();

        const result = await Student.findOneAndUpdate(
            {id},
            { isDeleted: true },
            {new: true, session}
        );

        if (!result){
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student")
        }

        const deletedUser = await User.findOneAndUpdate(
            {id},
            { isDeleted: true },
            {new: true, session}
        )

        if (!deletedUser){
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user")
        }

        await session.commitTransaction();
        await session.endSession();

        return result;


    }  catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error("Failed to delete student");
    }


};

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteSingleStudentFromDB,
    updateStudentIntoDB
};