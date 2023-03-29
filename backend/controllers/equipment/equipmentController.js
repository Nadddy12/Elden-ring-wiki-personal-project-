import {Equipment} from "../../models/equipments/equipmentsSchema.js";
import formidable from 'formidable';
import fs from 'fs';


export const getAllEquipment = async (req , res) => {
    try{
        const equipment = await Equipment.find();
        if (!equipment) {
        return res.status(400).json({ message: "No equipment found in database" });
    }
        res.status(200).json(equipment);
    }catch (err) {
        console.log(err);
        res.status(500).json({message:"Server error"});
    }
};


export const getEquipmentByType = async (req, res) => {
    const equipmentType = req.query.type;
    if (!req.query) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }
    
    try {
      const types = await Equipment.distinct("type");
      if(!equipmentType){
          return res.status(401).json({message: "No information of equipment type provided!"});
      }
      if(types.includes(equipmentType)){
          const equipment = await Equipment.find({ type: equipmentType });
          res.status(200).json(equipment);
      }else {
          res.status(400).json({message: "Invalid equipment type"});
      }
    }    
    catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    }
};


export const getOneEquipment = async (req , res) => {
    
    const id = req.params.id;
    if (!req.params) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }
    
    try{
        const equipment = await Equipment.findById(id);
        if(!equipment){
            return res.status(404).json({ message: 'Equipment not found' });
        }
        res.status(200).json(equipment);
    }catch (err) {
        console.log(err);
        res.status(401).json({message:"Bad request or no id provided"});
    }
};


export const addEquipment = async (req, res) => {
  
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      console.log(fields , files)
        if (err) {
            return res.status(400).json({ message: "The information provided in your form not completed" });
        }

    const { name, type, damagetype, infusion, damage } = fields;
    
    const image=[];
    if(!name || !type || !damagetype || !infusion || !damage){
      return res.status(401).json({message:"All fields must fill"});
    }

    const equipment = new Equipment({
      name,
      type,
      damagetype,
      infusion,
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

        let newpath = 'public/equipmentImg/' + files.image.originalFilename;

        await fs.copyFile(oldpath , newpath , function(err) {
          if (err) {
            console.log(err);
          }
        });
        await equipment.image.push(`/equipmentImg/${files.image.originalFilename}`);

        await equipment.save();
        res.status(201).json({message:"Equipment successfully created", equipment});
      }
    }
    catch (error) {
      console.log(error);
      if (error.code === 11000) {
        return res.status(400).json({ message: "Name already exists" });
      }
        return res.status(500).json({ message: "Internal server error" });
    }
  });
};


export const updateEquipment = async (req, res) => {
  
  const id = req.params.id;
  
  const form = formidable({ multiples: true });
  if (!req.params) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }
  
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: "The information provided in your form not completed" });
    }
    
    const { name, type, damagetype, infusion, damage } = fields;
    
    const update = {
      name,
      type,
      damagetype,
      infusion,
      damage,
    };
    
    if( files.image instanceof Array){
        return res.status(400).json({message:"Can't upload more than one photo"});
      }
      
    try {
      
      if(files.image instanceof Object){
        const oldpath = files.image.filepath;
        const newpath = 'public/equipmentImg/' + files.image.originalFilename;

        fs.promises.copyFile(oldpath, newpath);
        update.image = [`/equipmentImg/${files.image.originalFilename}`];
      }
        const equipment = await Equipment.findByIdAndUpdate(id, update);
        
        if(!equipment){
          return res.status(404).json({ message: "Equipment not found" });
        }
        res.status(200).json({message: "Equipment successfully updated" , equipment});
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internet server error" });
    }
  });
};


export const deleteEquipment = async (req , res) => {
    const id = req.params.id;
    
    if (!req.params) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }
    
    try {
        const equipment = await Equipment.findByIdAndDelete(id);
        if (!equipment ) {
            return res.status(404).json({ message: "Equipment not found" });
        }
        res.status(200).json({ message: "Equipment deleted successfully" });
    } 
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Bad request or no id provided" });
    }
};