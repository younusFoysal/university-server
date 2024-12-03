

// TODO: 1. Create interface
import {Model, Types} from "mongoose";

export type TGuardian = {
    fatherName: string;
    fatherEmail: string;
    fatherPhone: string;
    fatherOccupation: string;
    motherName: string;
    motherEmail: string;
    motherPhone: string;
    motherOccupation: string;
}

export type TUserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
}

export type TLocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
}

export type TStudent = {
    id: string;
    user: Types.ObjectId;
    password: string
    name: TUserName
    gender: "male" | "female" | "other";
    dateOfBirth?: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: "A+" | "AB+" | "B+" | "O+" | "A-" | "AB-" | "B-" | "O-";
    presentAddress: string
    permanentAddress: string
    guardian: TGuardian;
    localGuardian: TLocalGuardian;
    profileImg?: string
    isDeleted: boolean
}

// for creating Static
export interface StudentModel extends Model<TStudent> {
    isUserExist(id: string) : Promise<TStudent | null>
}


// for creating Interface
// export interface StudentMethods {
//     isUserExist(id: string) : Promise<TStudent | null>
// }

// export type StudentModel = Model<TStudent, Record<string, never>, StudentMethods>



