export class UnauthorizedError extends Error {
    code = 401
    constructor(message = 'Unauthorized') {
        super(message)
    }
}