import mongoose,{models, mongo} from "mongoose";
const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    votes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    answers: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Answer' 
    }],
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Question || mongoose.model('Question', questionSchema)