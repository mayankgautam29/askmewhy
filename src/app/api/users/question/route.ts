import { connect } from "@/dbConfig/dbConfig";
import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connect();

    const Question = (await import("@/models/questionModel")).default;
    const User = (await import("@/models/userModel")).default;
    const Tag = (await import("@/models/tagSchema")).default;
    const Answer = (await import("@/models/answerModel")).default;

    const questions = await Question.find({})
      .populate("author")
      .populate("tags")
      .populate({
        path: "answers",
        populate: [
          { path: "author" },
          {
            path: "comments",
            populate: {
              path: "author",
            },
          },
        ],
      });

    return NextResponse.json({
      data: questions,
      success: true,
    });
  } catch (error: any) {
    console.error("🔥 Fetch /api/users/question error:", error);
    return NextResponse.json(
      { error: "Something went wrong: " + error.message },
      { status: 500 }
    );
  }
}
