
export class AppError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.name = "AppError";
    }
}

export class BadRequest extends AppError {
    constructor(message: string) {
        super(400, message);
        this.name = "BadRequest";

    }
}
export class NotFoundError extends AppError {
    constructor(message: string) {
        super(404, message)
        this.name = "NotFoundError";

    }
}
export class ConflictError extends AppError {
    constructor(message: string) {
        super(409, message)
        this.name = "ConflictError";

    }
}
export class UnauthorizedError extends AppError {
    constructor(message: string = "Unauthorized") {
        super(401, message);
        this.name = "UnauthorizedError";

    }
}
export class InternalServerError extends AppError {
    constructor(message: string = "Internal Server Error") {
        super(500, message);
        this.name = "InternalServerError";

    }
}