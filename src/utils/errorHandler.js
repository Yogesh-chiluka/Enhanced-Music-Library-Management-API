import { ApiError } from "./ApiError.js";
import { ApiResponse } from "./ApiResponse.js";

const errorHandler = (err, req, res, next) => 
{ 
    if (err instanceof ApiError){ 
        res.status(err.statusCode).json(err.toJSON()); 
    } else { 
        if (err instanceof SyntaxError && err.status === 400 && 'body' in err) 
        { 
            res.status(400).json(
                new ApiResponse(400, null, "Bad Request, Invalid JSON format.")
            )
        }else{
        res.status(500).json(
            new ApiResponse(500, null, "Internal server error.")
        )
    }
    } 
};


export {errorHandler};