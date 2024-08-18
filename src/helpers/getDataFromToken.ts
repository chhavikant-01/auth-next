import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try{
        const token = request.cookies.get("token")?.value || ""
        const decodedToken:any /* not a good idea to put any! */ = jwt.verify(token, process.env.TOKEN_SECRET!)
        return decodedToken.id;
    }catch(err: any){
        throw new Error(err.message)
    }
}