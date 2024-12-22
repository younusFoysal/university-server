import {model, Schema} from "mongoose";

import {TAcademicDepartment} from "./academicDepartment.interface";

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
        throw new Error(`Department with name already exists.`);
    }

    next();

})


export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema);
