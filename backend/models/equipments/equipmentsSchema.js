import mongoose from "mongoose";

export const equipmentsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    type: {
        type: String,
        enum: ["Daggers" , "Straight Swords" , "Greatswords" , "Colossal Swords" , "Thrusting Swords" , "Heavy Thrusting Swords" , "Curved Swords" , "Curved Greatswords" , "Katanas" , "Twinblades" , "Axes" , "Greataxes" , "Hammers" , "Flails" , "Great Hammers" , "Colossal Weapons" , "Spears" , "Great Spears" , "Halberds" , "Reapers" , "Whips" , "Fists" , "Claws"],
        default: "Daggers",
        required: true
    },
    damagetype: {
        type: Array(String),
        required: true
    },
    image: {
        type: [String],
        required: true
    },
    infusion: {
        type: Boolean,
        required: true
    },
    damage: {
        type: Number,
        required: true
    }
}, {timestamps: true,
    versionKey: false});
    
export const Equipment = mongoose.model("Equipment", equipmentsSchema);