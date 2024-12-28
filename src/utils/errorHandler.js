import { ApiError } from "./ApiError.js";
import { ApiResponse } from "./ApiResponse.js";

const errorHandler = (err, req, res, next) => 
{ 
    if (err instanceof ApiError){ 
        res.status(err.statusCode).json(err.toJSON()); 
    } else { 
        res.status(500).json(
            new ApiResponse(500, null, "Internal server error.")
        )
    } 
};


export {errorHandler};