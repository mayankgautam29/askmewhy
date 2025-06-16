// models/voteModel.ts
import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
    targetType: {
      type: String,
      enum: ["question", "answer"],
      required: true,
    },
    voteType: {
      type: String,
      enum: ["up", "down"],
      required: true,
    },
  },
  { timestamps: true }
);
voteSchema.index({ user: 1, targetId: 1, targetType: 1 }, { unique: true });
export default mongoose.models.Vote || mongoose.model("Vote", voteSchema);
