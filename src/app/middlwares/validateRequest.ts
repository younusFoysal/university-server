import {AnyZodObject} from "zod";
import  {NextFunction} from "express";

// middleware
const validateRequest = (schema : AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            // console.log(`Middleware is working on ${name}`);

            // validation check
            await schema.parseAsync({body: req.body});
            next();
        }catch(error){
            next(error)
        }
    }
}

export default validateRequest;