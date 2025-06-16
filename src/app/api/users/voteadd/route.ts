import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Vote from "@/models/voteSchema";
import Question from "@/models/questionModel";
import Answer from "@/models/answerModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized – login required" }, { status: 401 });
    }

    const { targetId, targetType, voteType } = await request.json();

    if (
      !targetId ||
      !["question", "answer"].includes(targetType) ||
      !["up", "down"].includes(voteType)
    ) {
      return NextResponse.json({ error: "Invalid vote request" }, { status: 400 });
    }

    const existingVote = await Vote.findOne({ user: userId, targetId, targetType });

    let voteChange = 0;
    let action = "";

    if (!existingVote) {
      await Vote.create({ user: userId, targetId, targetType, voteType });
      voteChange = voteType === "up" ? 1 : -1;
      action = "voted";
    } else if (existingVote.voteType === voteType) {
      await Vote.findByIdAndDelete(existingVote._id);
      voteChange = voteType === "up" ? -1 : 1;
      action = "removed";
    } else {
      voteChange = voteType === "up" ? 2 : -2;
      existingVote.voteType = voteType;
      await existingVote.save();
      action = "switched";
    }

    if (targetType === "question") {
      await Question.findByIdAndUpdate(targetId, { $inc: { votes: voteChange } });
    } else {
      await Answer.findByIdAndUpdate(targetId, { $inc: { votes: voteChange } });
    }

    return NextResponse.json({ success: true, action });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
