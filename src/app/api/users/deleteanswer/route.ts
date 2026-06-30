import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Answer from "@/models/answerModel";
import Question from "@/models/questionModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Answer ID not provided" }, { status: 400 });
    }

    const answer = await Answer.findById(id);
    if (!answer) {
      return NextResponse.json({ error: "Answer not found" }, { status: 404 });
    }

    if (answer.author.toString() !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await Answer.findByIdAndDelete(id);
    await Question.findByIdAndUpdate(answer.question, {
      $pull: { answers: id },
    });
    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: -1 },
    });

    return NextResponse.json({ message: "Answer deleted", success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Delete failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
