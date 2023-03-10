import mongoose from "mongoose";

export const spellsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type:String,
    },
    damagetype: {
        type:String,
    },
    image: {
        type: String,
    },
    damage: {
        type: Number,
    }
}, {timestamps: true,
    versionKey: false});
    
export const Spell = mongoose.model("Spell", spellsSchema);