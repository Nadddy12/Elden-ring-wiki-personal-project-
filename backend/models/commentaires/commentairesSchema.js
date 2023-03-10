import mongoose from "mongoose";

export const commentairesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Article',
    },
    content: {
        type: String,
    }
},  {timestamps: true,
    versionKey: false});
    
export const Commentaire = mongoose.model("Commentaire", commentairesSchema);