import {connect} from "@/dbConfig/dbConfig"
import { NextRequest,NextResponse } from "next/server"
import Question from "@/models/questionModel"


export async function POST(request: NextRequest){
    const {id} = await request.json();
    console.log("FROM DELETE BACKEND",id)
    const res = await Question.findByIdAndDelete(id);
    return NextResponse.json({message: "Deleted"})
}