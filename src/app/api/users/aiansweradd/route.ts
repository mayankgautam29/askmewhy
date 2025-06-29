import mongoose from "mongoose";
import Comment from "@/models/commentModel";
import Answer from "@/models/answerModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Question from "@/models/questionModel";
import User from "@/models/userModel";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    await connect();
    const author = "6860cca69063b953bca49ec3";
    const reqBody = await request.json();
    const { question } = reqBody;
    console.log("HEHE", question);
    if (!question) {
      return NextResponse.json(
        { error: "Question ID are required" },
        { status: 400 }
      );
    }
    const thisQuestion = await Question.findById(question);
    const ques = thisQuestion.content;
    const res = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCrThM0enj_9PgOGScvkZdi129-XSncW34",
      {
        contents: [
          {
            parts: [
              {
                text: `Answer the following question concisely using plain text only. Avoid bullet points, Markdown formatting, explain answer breifly. Just give a clean answer. Question: ${ques}`,
              },
            ],
          },
        ],
      }
    );
    const content = await res.data.candidates[0].content.parts[0].text;
    console.log(content);
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
    await User.findByIdAndUpdate(author, {
      $inc: { reputation: +1 },
    });
    const saved = await newAnswer.save();
    console.log("Saved");
    return NextResponse.json({
      data: saved,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
