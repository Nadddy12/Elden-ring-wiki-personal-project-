import mongoose from "mongoose";

const attributesSchema = mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    value: {
        type:Number,
        required:true,
    }
});

export const charactersSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    level: {
        type: Number,
        required: true,
    },
    attribute: {
        type: Map,
        of: attributesSchema,
    },
    equipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipment',
    },
    spell: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spell',
    }
}, {timestamps: true,
    versionKey: false});
    
export const Character = mongoose.model("Character", charactersSchema);