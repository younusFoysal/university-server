import {TStudent} from "../student/student.interface";
import {Student} from "../student/student.model";
import {User} from "./user.model";
import config from "../../app/config";
import { TUser} from "./user.interface";


const createStudentIntoDB = async (password: string, studentData: TStudent) => {

    // create a user object
    const userData: Partial<TUser> = {}

    // if password is not given, use default password
    userData.password = password || (config.default_password as string)

    // set student role
    userData.role = 'student'

    // set  manually generated id
    userData.id = String(2030100001 + 1)

    console.log(userData);

    // create a user
    const newUser =  await User.create(userData); // build in static method of mongoose

    console.log("newUser OK");
    // create a student
    if (Object.keys(newUser).length){

        // set id, _id as user
        studentData.id = newUser.id;
        studentData.user = newUser._id; // reference _id
        console.log("studentData OK")

        const newStudent = await Student.create(studentData);
        console.log("newStudent OK");
        return newStudent
    }

};


export const UserServices = {
    createStudentIntoDB
}