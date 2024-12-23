import {model, Schema} from "mongoose";

import {TAcademicDepartment} from "./academicDepartment.interface";
import AppError from "../../app/errors/AppError";
// @ts-ignore
import httpStatus from "http-status";

// academicDepartment


const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    academicfaculty: {
        type: Schema.Types.ObjectId,
        ref: "AcademicFaculty",
    }

}, {timestamps: true});


academicDepartmentSchema.pre('save', async function (next) {

    const isDepartmentExist = await AcademicDepartment.findOne({name: this.name});

    if (isDepartmentExist) {
        throw new AppError( httpStatus.NOT_FOUND_ERR,`Department with name already exists.`);
    }

    next();
})




academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {

    const query = this.getQuery()
    const isDepartmentExist = await AcademicDepartment.findOne(query);

    if (!isDepartmentExist) {
        throw new AppError(404,`Department does not exists.`);
    }


    next();
})


export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema);
