import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig";
import Question from "@/models/questionModel";
import Tag from "@/models/tagSchema";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import axios from "axios";

connect();

export async function POST(request: NextRequest) {
  try {
    const authorId = await getDataFromToken(request);
    if (!authorId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content, tags } = await request.json();

    if (!title || !content || !tags) {
      return NextResponse.json(
        { error: "Title, content, and tags are required" },
        { status: 400 }
      );
    }
    const tagDocs = await Promise.all(
      tags.map(async (tagName: string) => {
        let tag = await Tag.findOne({ name: tagName.trim() });
        if (!tag) {
          tag = await Tag.create({ name: tagName.trim() });
        }
        return tag._id;
      })
    );

    const newQuestion = new Question({
      title,
      content,
      tags: tagDocs,
      author: authorId,
    });

    await User.findByIdAndUpdate(authorId, {
      $inc: { reputation: +1 },
    });
    const saved = await newQuestion.save();
    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/aiansweradd`,
      {
        question: newQuestion._id,
      }
    );
    return NextResponse.json({ message: "Question created", success: true, id: saved._id });
  } catch (error: any) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
