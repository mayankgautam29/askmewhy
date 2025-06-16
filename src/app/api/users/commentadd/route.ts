import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";
import Comment from "@/models/commentModel";
import Answer from "@/models/answerModel"

connect();

export async function POST(request: NextRequest) {
  try {
    const author = await getDataFromToken(request);
    const reqBody = await request.json();
    const { content, answer } = reqBody;
    if (!content || !answer) {
      return NextResponse.json({ error: "Empty content" }, { status: 500 });
    }
    const newComment = new Comment({
      author: author,
      content: content,
      answer: answer,
    });
    const saved = await newComment.save();
    await Answer.findByIdAndUpdate(answer, {
      $push: { comments: saved._id },
    });
    
    return NextResponse.json({message: "Done",success: true})
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
