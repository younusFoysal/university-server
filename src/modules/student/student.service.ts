import {TStudent} from "./student.interface";
import {Student} from "./student.model";


const createStudentIntoDB = async (studentdata: TStudent) => {

    if (await Student.isUserExist(studentdata.id)) {
        throw new Error("Student already exists");
    }
    const result =  await Student.create(studentdata); // build in static method of mongoose


    // const student = new Student(studentdata) // create an instance
    // if (await student.isUserExist(studentdata.id)) {
    //     throw new Error("Student already exists")
    // }


    //const result = await student.save() // build in instance method
    return result;
};

const getAllStudentsFromDB = async () => {
    const result = await Student.find();
    return result;
};

const getSingleStudentFromDB = async (id:string) => {
    //const result = await Student.findOne({id});

    const result = await Student.aggregate([
        {$match: {id: id}}
    ]);

    return result;
};

const deleteSingleStudentFromDB = async (id:string) => {
    const result = await Student.updateOne({id}, { isDeleted: true });
    return result;
};

export const StudentServices = {
    createStudentIntoDB,
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteSingleStudentFromDB
};