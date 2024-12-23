import {TStudent} from "./student.interface";
import {Student} from "./student.model";
import path from "path";


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

const deleteSingleStudentFromDB = async (id:string) => {
    const result = await Student.updateOne({id}, { isDeleted: true });
    return result;
};

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteSingleStudentFromDB
};