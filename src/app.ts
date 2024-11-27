import express, {Application, Request, Response} from "express";
import cors from 'cors';
import {StudentRoutes} from "./modules/student/student.route";
const app : Application = express();

//parsers
app.use(express.json());
app.use(express.text());
app.use(cors());


// application routes
app.use('/api/v1/students', StudentRoutes); // /api/v1/students/create-student


const getAController = (req: Request, res: Response) => {
    const a = "Hello World";
    res.send(a);
};

app.get('/', getAController);

// console.log(process.cwd())
// npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
export default app;