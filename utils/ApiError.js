class ApiError extends Error{                     //extend function is used to overwrite the error
    constructor(
        statusCode,
        message="Something Went Wrong",
        errors=[],
        stack=""
    )
    {
        super[message];
        this.statusCode=statusCode;
        this.message=message;
        this.errors=error;
        this.success=false;
        this.data=null;
        //this.stack=stack; ye jada easy hai lekin production me nicche wala jada use hota hai
        if(stack){
            this.stack=stack;
        }
        else{
            Error.captureStackTrace(this,this.Constructor);
        }
    }
}
export {ApiError};  // or we can use export default ApiError;
