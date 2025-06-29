import mongoose, { Schema } from "mongoose";
import "@/models/commentModel";

const AnswerSchema = new Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
    question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    votes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Answer || mongoose.model("Answer", AnswerSchema);