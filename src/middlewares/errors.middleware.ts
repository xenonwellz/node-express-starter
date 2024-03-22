import env from '../config/env';
import logger from '../config/logger';
import ApiError from "../utils/errors";

const errorConverter = (err: any, req: any, res: any, next: any) => {
    let error: any = err;
    if (!(error instanceof ApiError)) {
        const statusCode: any = error.statusCode ? 400 : 500;
        const message = error.message || "An error occured";
        error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err: any, req: any, res: any, next: any) => {
    let { statusCode, message } = err;
    if (env.get('NODE_ENV') === 'production' && !err.isOperational) {
        statusCode = 500;
        message = err.message || "An error occured";
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        ...(env.get('NODE_ENV') === 'development' && { stack: err.stack }),
    };

    if (env.get('NODE_ENV') === 'development') {
        logger.error(err);
    }

    res.status(statusCode).send(response);
};

export { errorConverter, errorHandler };
