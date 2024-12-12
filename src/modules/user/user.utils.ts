import {TAcademicSemester} from "../academicSemester/academicSemester.interface";
import {User} from "./user.model";

const findLastStudent = async ()=> {
    const lastStudent = await User.findOne(
        { role: "student"}, {id: 1, _id: 0})
        .sort({createdAt: -1})
        .lean()

    return lastStudent?.id ? lastStudent.id.substring(6) : undefined
}


export const generateStudentId = async (payload: TAcademicSemester) => {

    // first time 0000
    // const currentId = (await findLastStudent()) || (0).toString()
    let currentId =  (0).toString() // 0000 by default

    const lastStudentId = await findLastStudent();
    // 2030 01 0001
    const lastStudentSemesterCode = lastStudentId?.substring(4,6); //01
    const lastStudentYear = lastStudentId?.substring(0,4) //2030

    const currentSemesterCode = payload.code
    const currentYear = payload.year

    if (lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentYear){
        currentId = lastStudentId// 0001
    }
    console.log('okk',currentId)

    let incrementId = (Number(currentId) + 1).toString().padStart(4,'0')

    incrementId = `${payload.year}${payload.code}${incrementId}`
    console.log(incrementId)

    return incrementId;

}