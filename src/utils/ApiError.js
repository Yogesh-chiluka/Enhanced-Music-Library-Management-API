class ApiError extends Error {
    constructor(statusCode, message = 'Something went wrong', errors = [], stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors.length ? errors : null;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON() {
        return {
            status: this.statusCode,
            data: null,
            message: this.message,
            error: this.errors
        };
    }
}

export { ApiError };
