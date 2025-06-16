import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Vote from "@/models/voteSchema";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const { targetId, targetType } = await request.json();

    const existingVote = await Vote.findOne({
      user: userId,
      targetId,
      targetType,
    });

    return NextResponse.json({ voteType: existingVote?.voteType || null });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
