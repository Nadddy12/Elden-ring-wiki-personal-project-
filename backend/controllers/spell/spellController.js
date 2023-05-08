import {Spell} from "../../models/spells/spellsSchema.js";
import formidable from 'formidable';
import fs from 'fs';


export const getAllSpell = async (req , res) => {
    try{
        const spell = await Spell.find();
        if(!spell){
          return res.status(401).json({message:"No spell found in database"});
        }
        res.status(200).json(spell);
    }catch (err) {
        res.status(500).json({message:"Server error"});
    }
};


export const getSpellByType = async (req, res) => {
    const spellType = req.query.type;
    
    if (!req.query) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }
    try {
      const types = await Spell.distinct("type");
      if(!spellType){
          return res.status(401).json({message: "No information of spell type provided!"});
      }
      if(types.includes(spellType)){
          const spell = await Spell.find({ type:spellType });
          res.status(200).json(spell);
      }else {
          res.status(400).json({message: "Invalid spell type or spell type doesn't exist"});
      }
    }    
    catch (err) {
      res.status(500).json({ message: "Server error" });
    }
};


export const getOneSpell = async (req , res) => {
    
    const id = req.params.id;
    
    if (!req.params) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }
    try{
        const spell = await Spell.findById(id);
        if(!spell){
            return res.status(404).json({ message: 'spell not found' });
        }
        res.status(200).json(spell);
    }catch (err) {
        res.status(401).json({message:"Bad request or no id provided"});
    }
};


export const addSpell = async (req, res) => {
  
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({ message: "The information provided in your form not completed" });
        }

    const { name, type, damagetype, damage } = fields;
    
    const image=[];
    
    if(!name || !type || !damagetype || !damage){
      return res.status(401).json({message:"All fields must fill"});
    }

    const spell = new Spell({
      name,
      type,
      damagetype,
      damage,
      image 
    });
    try {
      if(!files.image){
        return res.status(400).json({message:"must upload photo!"});
      }
      if( files.image instanceof Array){
        return res.status(400).json({message:"Can't upload more than one photo"});
      }
      if(files.image instanceof Object){
        let oldpath = files.image.filepath;

        let newpath = 'public/spellImg/' + files.image.originalFilename;

        await fs.copyFile(oldpath , newpath , function(err) {
          if (err) {
            console.log(err);
          }
        });
        await spell.image.push(`/spellImg/${files.image.originalFilename}`);

        await spell.save();
        res.status(201).json({message:"Spell successfully created", spell});
      }
    }
    catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({message:"Name already exists"});
        }
      res.status(500).json({ message: "Internal server error" });
    }
  });
};


export const updateSpell = async (req, res) => {
  
  const id = req.params.id;
  
  const form = formidable({ multiples: true });
  
  if (!req.params) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }
  
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: "The information provided in your form not completed" });
    }
    
    const { name, type, damagetype, damage } = fields;
    
    const update = {
      name,
      type,
      damagetype,
      damage,
    };
    
    if( files.image instanceof Array){
        return res.status(400).json({message:"Can't upload more than one photo"});
      }
      
    try {
      
      if(files.image instanceof Object){
        const oldpath = files.image.filepath;
        const newpath = 'public/spellImg/' + files.image.originalFilename;

        fs.promises.copyFile(oldpath, newpath);
        update.image = [`/spellImg/${files.image.originalFilename}`];
      }
        const spell = await Spell.findByIdAndUpdate(id, update);
        
        if(!spell){
          return res.status(404).json({ message: "Spell not found" });
        }
        res.status(200).json({message: "Spell successfully updated" , spell});
    }
    catch (error) {
      res.status(500).json({ message: "Internet server error" });
    }
  });
};


export const deleteSpell = async (req , res) => {
    const id = req.params.id;
    
    if (!req.params) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }
    
    try {
        const spell = await Spell.findByIdAndDelete(id);
        if (!spell ) {
            return res.status(404).json({ message: "Spell not found" });
        }
        res.status(200).json({ message: "Spell deleted successfully" });
    } 
    catch (error) {
        res.status(400).json({ message: "Bad request or no id provided" });
    }
};