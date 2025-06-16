import mongoose from 'mongoose'

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Tag || mongoose.model('Tag', tagSchema)
