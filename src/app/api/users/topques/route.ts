import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Question from "@/models/questionModel";

await connect();

export async function GET(req: NextRequest) {
  try {
    const questions = await Question.find({})
      .sort({ views: -1 })
      .limit(10)
      .select("title");
    return NextResponse.json({ questions });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
