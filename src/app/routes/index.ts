import {Router} from "express";
import {StudentRoutes} from "../../modules/student/student.route";
import {UserRoutes} from "../../modules/user/user.route";
import {AcademicSemesterRouter} from "../../modules/academicSemester/academicSemester.route";
import {AcademicFacultyRouter} from "../../modules/academicFaculty/academicFaculty.route";
import {AcademicDepartmentRouter} from "../../modules/academicDepartment/academicDepartment.route";


const router = Router();

const moduleRoutes = [
    {
        path: "/student",
        route: StudentRoutes,
    },
    {
        path: "/users",
        route: UserRoutes,
    },
    {
        path: "/academic-semesters",
        route: AcademicSemesterRouter,
    },
    {
        path: "/academic-faculties",
        route: AcademicFacultyRouter,
    },
    {
        path: "/academic-department",
        route: AcademicDepartmentRouter,
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

// router.use('/users', UserRoutes)
// router.use('/students', StudentRoutes)



export default router;