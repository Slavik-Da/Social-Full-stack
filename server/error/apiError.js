class ApiError extends Error {
    constructor (status, message) {
        super();
        this.status = status
        this. message = message
    }


    // static funct - is a func, which you can call without creating an object
    static badRequest(message) {
        return new ApiError(404, message)
    }

    static internal(message) {
        return new ApiError(500, message)
    }

    static forbidden(message) { // access denied 
        return new ApiError(403, message)
    }
}

module.exports = ApiError