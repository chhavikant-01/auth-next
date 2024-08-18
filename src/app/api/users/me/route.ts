import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    
    try{
        const userId = await getDataFromToken(request);
        const user = await User.findById(userId).select("-password, -isAdmin");
        return NextResponse.json({
            message: "User found",
            data: user,
        }
        );
    }catch(err: any){
        return NextResponse.json({error: err.message},{status: 500})
    }
}

