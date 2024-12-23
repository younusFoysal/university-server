import {NextFunction, Request, Response} from "express";


const globalErrorhandler = (err: any, req: Request, res: Response,  next: NextFunction) => {
    // res.status(404).send("Not Found");
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";

    return res.status(statusCode).json({
        success: false,
        message: message,
        error: err
    })
}

export default globalErrorhandler;