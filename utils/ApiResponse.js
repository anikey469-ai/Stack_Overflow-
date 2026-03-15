class APiResponse{
    constructor(statusCode,data=null,message="Success"){ // mesage jo likte hia uska koi kam nhi hai bss likhna parta hia
        this.statusCode=statusCode;
        this.data=data;
        this.message=message;
        this.success=statusCode<400;
}
}
export {APiResponse};


