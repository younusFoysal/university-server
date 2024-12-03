import express, {Application, NextFunction, Request, Response} from "express";
import cors from 'cors';
import globalErrorhandler from "./app/middlwares/globalErrorhandler";
import notFound from "./app/middlwares/notFound";
import router from "./app/routes";

const app : Application = express();

//parsers
app.use(express.json());
app.use(express.text());
app.use(cors());


// application routes
app.use('/api/v1', router);


const test = (req: Request, res: Response) => {
    const a = "Hello World";
    res.send(a);
};

app.get('/', test);


// @ts-ignore
app.use(globalErrorhandler)

// Not Found
// @ts-ignore
app.use(notFound)

// console.log(process.cwd())
// npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
export default app;