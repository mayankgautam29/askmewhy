import mongoose from "mongoose";
import Comment from "@/models/commentModel";
import Answer from "@/models/answerModel"
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Question from "@/models/questionModel";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const author = await getDataFromToken(request);
    const reqBody = await request.json();
    const { content, question } = reqBody;
    if (!content || !question) {
      return NextResponse.json(
        { error: "Content and question ID are required" },
        { status: 400 }
      );
    }
    const newAnswer = new Answer({
      author: author,
      content: content,
      question: question,
    });
    await Question.findByIdAndUpdate(
      question,
      {
        $push: { answers: newAnswer._id },
      },
      { new: true }
    );
    await User.findByIdAndUpdate(
      author,
      {
        $inc: { reputation: +1 },
      }
    )
    const saved = await newAnswer.save();
    console.log("Saved")
    return NextResponse.json({
      data: saved,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
