class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = Boolean(statusCode < 400);
    }
}

class ApiError extends Error {
    constructor(statusCode, message = "Something Went Wrong", errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = Array.isArray(errors) ? errors : [errors];

        if (stack) {
            this.stack = stack;
        } else if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    toJSON() {
        const { statusCode, data, success, errors, message } = this;
        const response = { statusCode, data, success, errors, message };

        if (process.env.NODE_ENV === "development") {
            response.stack = this.stack;
        }

        return response;
    }
}

export { ApiError, ApiResponse };
