class ApiResponse
 {
    constructor(
        statusCode,
        data,
        message='Success',
        error = null
    ){
        this.statusCode = statusCode,
        this.data = data,
        this.message = message,
        this.error = error
    }
}

export{ ApiResponse }

