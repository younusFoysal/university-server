class AppError extends Error {
    private statusCode : number;

    constructor(statusCode: number, message: string, stack='error' ) {
        super(message);
        this.statusCode = statusCode;

        if (stack){
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default AppError;