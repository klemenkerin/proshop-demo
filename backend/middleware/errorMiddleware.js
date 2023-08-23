const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`); // req.originalUrl is the URL that was requested
    res.status(404);
    next(error); // Pass the error to the error handler middleware
};

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode; // If the status code is 200, set it to 500, otherwise use the status code that was set
    let message = err.message;

    // Check for Mongoose bad ObjectId
    if (err.name === "CastError" && err.kind === "ObjectId") {
        message = "Resource not found";
        statusCode = 404;
    }

    res.status(statusCode).json({ 
        message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack // If we're in production, don't send the stack trace
    });
};

export { notFound, errorHandler };