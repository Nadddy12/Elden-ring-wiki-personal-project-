import mongoose from "mongoose";

export const articlesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['blog' , 'guide'],
        default: 'blog',
    },
    link: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
},  {timestamps: true,
    versionKey: false});
    
export const Article = mongoose.model("Article", articlesSchema);