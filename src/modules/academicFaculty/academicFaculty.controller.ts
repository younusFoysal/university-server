import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
// @ts-ignore
import httpStatus from "http-status";
import {AcademicSemesterServices} from "./academicFaculty.service";


const createAcademicFaculty = catchAsync(async (req, res) => {
    // const {password,  student: studentData} = req.body;
    const result = await AcademicSemesterServices.createAcademicFacultyIntoDB(req.body);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Faculty created successfully",
        data: result
    } )
})

const getAllAcademicFaculties = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.getAllAcademicFacultiesFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculties are retrieved successfully',
        data: result,
    });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result =
        await AcademicSemesterServices.getSingleAcademicFacultyFromDB(facultyId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty is retrieved successfully',
        data: result,
    });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result = await AcademicSemesterServices.updateAcademicFacultyIntoDB(
        facultyId,
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty is updated successfully',
        data: result,
    });
});

export const AcademicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty,
};

