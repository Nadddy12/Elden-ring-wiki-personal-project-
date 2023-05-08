import { Character } from "../../models/characters/charactersSchema.js";
import {User} from "../../models/users/usersSchema.js";
import {Equipment} from "../../models/equipments/equipmentsSchema.js";
import {Spell} from "../../models/spells/spellsSchema.js";
import mongoose from "mongoose";
import {ObjectId} from "mongodb";

export const saveCharacter = async (req , res) => {
    const userId = req.userId;
    const { name , level , equipment , spell} = req.body;
    const { vigor , mind , endurance , strength , dexterity , intelligence , faith , arcane} = req.body;
    
    
    if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
            return res.status(401).json({message:"Invalid user ID"});
    }
    
    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(401).json({message:"Invalid User ID"});
        }
        let equipmentId = null;
        if(equipment) {
            equipmentId = await Equipment.findById(equipment);
            if(!equipmentId){
                return res.status(401).json({message:"Invalid Equipment ID"});
            }
        }
        let spellId = null;
        if(spell) {
            spellId = await Spell.findById(spell);
            if(!spellId){
                return res.status(401).json({message:"Invalid Spell ID"});
            }
        }
        const characterCount = await Character.countDocuments({user: userId});
        if(characterCount >= 5) {
            return res.status(400).json({ message: "You cannot create more than 5 characters"});
        }
        
        const character = new Character({
            user:userId,
            name,
            level,
            attributes:{
                vigor,
                mind,
                endurance,
                strength,
                dexterity,
                intelligence,
                faith,
                arcane
            },
            equipment:equipmentId,
            spell:spellId
        });
        await character.save();
        res.status(201).json({message:"Character was created" , character});
    }
    catch(err){
        if (err.message.includes("equipment")) {
            res.status(400).json({ message: 'Invalid equipment value. Please select equipment.' });
        } else if (err.message.includes("spell")) {
            res.status(400).json({ message: 'Invalid spell value. Please select spell.' });
        }else if (err instanceof mongoose.Error.ValidationError) {
            res.status(400).json({ message: 'Invalid attribute value. Please make sure values are between 10 and 99.' });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }
};


export const getCharactersByUser = async (req , res) => {
    const userId = req.userId;
    
    try{
        if(!userId){
            return res.status(401).json({message:"No user ID provided"});
        }
        const characters = await Character.find({user:userId})
        .populate("equipment")
        .populate("spell");
        if(characters.length === 0){
            return res.status(201).json({message:"No saved characters"});
        }
        res.status(201).json(characters);
    }
    catch(err){
        res.status(500).json({message:"internal server error"});
    }
};


export const deleteCharacterByUser = async (req , res) =>{
    const userId = req.userId; 
    const id = req.params.id;
    if (!req.params) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }
    
    try{

        const character = await Character.findById(id);
        if(!character){
            return res.status(401).json({message:"Invalid character ID"});
        }
        const user = await User.findById(character.user);
        if(user.id !== userId){
            return res.status(401).json({message: "Unauthorized!"});
        }
        await Character.findByIdAndDelete(id);
        res.status(200).json({ message: "Comment successfully deleted" });
    }
    catch(err){
        res.status(500).json({ message: "internal Server Error" });
    }

};