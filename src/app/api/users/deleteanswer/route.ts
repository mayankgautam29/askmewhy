import { connect } from "@/dbConfig/dbConfig";
import Answer from "@/models/answerModel";
import Question from "@/models/questionModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    console.log("ID FROM ANSWER DELETE BACKEND", id);

    if (!id) {
      return NextResponse.json(
        { message: "Answer ID not provided" },
        { status: 400 }
      );
    }
    const answer = await Answer.findById(id);
    if (!answer) {
      return NextResponse.json(
        { message: "Answer not found" },
        { status: 404 }
      );
    }
    await Answer.findByIdAndDelete(id);
    await Question.findByIdAndUpdate(answer.question, {
      $pull: { answers: id },
    });
    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: -1 },
    });

    return NextResponse.json({ message: "Deleted answer and updated reputation" });
  } catch (error: any) {
    console.error("Error deleting answer:", error);
    return NextResponse.json({
      message: "Found some error deleting the answer",
    });
  }
}
