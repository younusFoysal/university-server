import {model, Schema} from "mongoose";
import {TAcademicFaculty} from "./academicFaculty.interface";
import {AcademicSemester} from "../academicSemester/academicSemester.model";
// academicFaculty


const academicFacultySchema = new Schema<TAcademicFaculty>({
    name: {
        type: String,
        required: true,
        unique: true,
    },

}, {timestamps: true});


export const AcademicFaculty = model<TAcademicFaculty>('AcademicFaculty', academicFacultySchema);
