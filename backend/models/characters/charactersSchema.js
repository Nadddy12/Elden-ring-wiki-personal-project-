import mongoose from "mongoose";

export const charactersSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        default: "Build",
    },
    level: {
        type: Number,
        required: true,
    },
    attributes: {
        vigor: {
            type:Number,
            default:10,
            min:10,
            max:99,
            required:true
        },
        mind: {
            type:Number,
            default:10,
            min:10,
            max:99,
            required:true
        },
        endurance: {
            type:Number,
            default:10,
            min:10,
            max:99,
            required:true
        },
        strength: {
            type:Number,
            default:10,
            min:10,
            max:99,
            required:true
        },
        dexterity: {
            type:Number,
            default:10,
            min:10,
            max:99,
            required:true
        },
        intelligence: {
            type:Number,
            default:10,
            min:10,
            max:99,
            required:true
        },
        faith: {
            type:Number,
            default:10,
            min:10,
            max:99,
            required:true
        },
        arcane: {
            type:Number,
            default:10,
            min:10,
            max:99,
            required:true
        }
    },
    equipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipment',
        required: true,
    },
    spell: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spell',
        required: true,
    }
}, {timestamps: true,
    versionKey: false});
    
export const Character = mongoose.model("Character", charactersSchema);