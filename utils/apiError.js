
const ApiStatusCodes = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_ERROR: 500
};
module.exports = class ApiError extends Error{
    constructor(message, status){
        super();
        this.message = message;
        this.status = status;
        this.extensions = { message: message, status: status };
    }
    static INTERNAL_SERVER_ERROR(message='Internal Server Error'){
        return new ApiError(message, ApiStatusCodes.INTERNAL_ERROR);
    }
    static UNAUTHORIZED_ERROR(message="Unauthorized request"){
        return new ApiError(message, ApiStatusCodes.UNAUTHORIZED);
    }
};