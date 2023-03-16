import {Character , AttributeModel} from "../../models/characters/charactersSchema.js";
import {User} from "../../models/users/usersSchema.js";

export const saveCharacter = async (req , res) => {
    const userId = req.userId;
    const { level , equipment , spell} = req.body;
    const { vigor , mind , endurance , strength , dexterity , intelligence , faith , arcane} = req.body;
    
    const attributeModel = new AttributeModel({
        vigor,
        mind,
        endurance,
        strength,
        dexterity,
        intelligence,
        faith,
        arcane
    });
    const newAttributes = attributeModel;
    
    const character = new Character({
        user:userId,
        level,
        attributes:newAttributes,
        equipment,
        spell
    });
    try{
        await character.save();
        res.status(201).json({message:"Character was created" , character});
    }
    catch(err){
        res.status(500).json({message: "internal server error"});
    }
};


export const getCharactersByUser = async (req , res) => {
    const userId = req.userId;
    
    try{
        if(!userId){
            res.status(401).json({message:"No user ID provided"});
        }
        const characters = await Character.find({user:userId});
        if(!characters){
            res.status(401).json({message:"No saved characters"});
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
        console.log(err);
        res.status(500).json({ message: "internal Server Error" });
    }

};




/*const newAttributes = [];
    attributes.forEach((attribute) => {
        
           const attributeModel = {
                name: attribute.name,
                value:attribute.value
            }
        
            newAttributes.push(attributeModel)
    })   
    
    // touts les models dans : newAttributes
    console.log(newAttributes)
    
    const charactere = new Character({
        attributes: newAttributes
    })
    
    console.log(charactere)*/