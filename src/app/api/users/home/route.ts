import { connect } from "@/dbConfig/dbConfig"
import Question from "@/models/questionModel"
import User from "@/models/userModel"
import Tag from "@/models/tagSchema"
import { NextResponse } from "next/server"

connect()

export async function GET() {
  try {
    const [topQuestions, totalUsers, totalQuestions, topTags] = await Promise.all([
      Question.find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("author tags"),
      User.countDocuments(),
      Question.countDocuments(),
      Tag.find({}).limit(10)
    ])

    return NextResponse.json({
      success: true,
      data: {
        recentQuestions: topQuestions,
        stats: {
          totalUsers,
          totalQuestions,
        },
        topTags
      }
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
