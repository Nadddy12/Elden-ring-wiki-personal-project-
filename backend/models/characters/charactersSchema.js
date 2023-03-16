import mongoose from "mongoose";

export const attributesSchema = mongoose.Schema({
    vigor: {
        type:Number,
        default:6,
        required:true
    },
    mind: {
        type:Number,
        default:6,
        required:true
    },
    endurance: {
        type:Number,
        default:6,
        required:true
    },
    strength: {
        type:Number,
        default:6,
        required:true
    },
    dexterity: {
        type:Number,
        default:6,
        required:true
    },
    intelligence: {
        type:Number,
        default:6,
        required:true
    },
    faith: {
        type:Number,
        default:6,
        required:true
    },
    arcane: {
        type:Number,
        default:6,
        required:true
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
    attributes: {
        type: Object,
        required:true
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
export const AttributeModel = mongoose.model("AttributeModel", attributesSchema);