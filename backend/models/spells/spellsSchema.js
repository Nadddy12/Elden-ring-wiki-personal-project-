import mongoose from "mongoose";

export const spellsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type:String,
        enum: ["Incantation" , "Sorcery"],
        default: "Sorcery",
        required: true
    },
    damagetype: {
        type:String,
        required: true
    },
    image: {
        type:[String],
        required: true
    },
    damage: {
        type: Number,
        required: true
    }
}, {timestamps: true,
    versionKey: false});
    
export const Spell = mongoose.model("Spell", spellsSchema);