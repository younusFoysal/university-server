import {TStudent} from "../student/student.interface";
import {Student} from "../student/student.model";
import {User} from "./user.model";
import config from "../../app/config";
import { TUser} from "./user.interface";
import {TAcademicSemester} from "../academicSemester/academicSemester.interface";
import {AcademicSemester} from "../academicSemester/academicSemester.model";
import {generateStudentId} from "./user.utils";


const createStudentIntoDB = async (password: string, payload: TStudent) => {

    // create a user object
    const userData: Partial<TUser> = {}

    // if password is not given, use default password
    userData.password = password || (config.default_password as string)

    // set student role
    userData.role = 'student'





    // find academic info
    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)

    // @ts-ignore
    userData.id = await generateStudentId(admissionSemester)

    console.log("udatas",userData);

    // create a user
    const newUser =  await User.create(userData); // build in static method of mongoose

    console.log("newUser OK");
    // create a student
    if (Object.keys(newUser).length){

        // set id, _id as user
        payload.id = newUser.id;
        payload.user = newUser._id; // reference _id
        console.log("studentData OK")

        const newStudent = await Student.create(payload);
        console.log("newStudent OK");
        return newStudent
    }

};


export const UserServices = {
    createStudentIntoDB
}