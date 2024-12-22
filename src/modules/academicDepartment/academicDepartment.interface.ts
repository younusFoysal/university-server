import {Types} from "mongoose";

// academicDepartment


export type TAcademicDepartment = {
    name: string;
    academicfaculty: Types.ObjectId;
}