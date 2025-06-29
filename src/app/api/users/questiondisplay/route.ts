import mongoose from "mongoose";
import Question from "@/models/questionModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    let userId = null;
    try {
      userId = await getDataFromToken(request);
    } catch (err) {
      userId = null;
    }
    const question = await Question.findById(id)
      .populate({ path: "author", select: "username reputation" })
      .populate("tags")
      .populate({
        path: "answers",
        populate: [
          { path: "author" },
          {
            path: "comments",
            populate: { path: "author" },
          },
        ],
      });

    if (!question) {
      return NextResponse.json({ error: "No question found" }, { status: 404 });
    }
    return NextResponse.json({
      data: question,
      userid: userId,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
