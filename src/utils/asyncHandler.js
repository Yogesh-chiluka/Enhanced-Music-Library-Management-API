const asyncHandler = (requestHandler)=>{
    return (req,res) =>{
        promise.resolve(requestHandler(req,res,next)
        .catch((err) => next(err))
    }
}

export { asyncHandler }