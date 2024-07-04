import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";



connect();


export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();

        const { token } = reqBody;
        console.log(token);

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpires: { $gt: Date.now() },
        });

        if (!user) {
            return NextResponse.json({ message: "Token is invalid or has expired" },{status: 400});
        }

        console.log(user);


        // update user to verified
        user.isVerified = true;


        // remove token and expiry date from user
        user.verifyToken = undefined;
        user.verifyTokenExpires = undefined;


        // save user
        await user.save();
        
        
        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
        }, { status: 200 });
        
    } catch (error:any) {
        return NextResponse.json({ message: error.message },{status: 500});
    }
}