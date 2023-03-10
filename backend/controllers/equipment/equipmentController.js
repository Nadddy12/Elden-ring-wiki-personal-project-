import {Equipment} from "../../models/equipments/equipmentsSchema.js";
import formidable from 'formidable';
import fs from 'fs';


export const getAllEquipment = async (req , res) => {
    try{
        const equipment = await Equipment.find();
        res.status(200).json(equipment);
    }catch (err) {
        console.log(err);
        res.status(500).json({message:"Server error"});
    }
};


export const getEquipmentByType = async (req, res) => {
    const equipmentType = req.query.type;
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
    
    try{
        const equipment = await Equipment.findById(id);
        if(!equipment){
            return res.status(404).json({ message: 'Equipment not found' });
        }
        res.status(200).json(equipment);
    }catch (err) {
        console.log(err);
        res.status(500).json({message:"Server error"});
    }
};


export const addEquipment = async (req , res) => {
    
    const form = new formidable.IncomingForm();
    form.parse(req, async function(err , fields , files){
        
        if (err) return res.status(400).json({message: "The information provided in your form not completed"});

        const { name , type , damagetype , infusion , damage } = fields;
    
        const image = [];
    
        const equipment = new Equipment ({
            name,
            type,
            image,
            damagetype,
            infusion,
            damage
        });
    
        let oldpath = files.image.filepath;
        
        let newpath = 'public/equipmentImg/' + files.image.originalFilename;
        
        await fs.copyFile(oldpath , newpath , function(err) {
            if (err) {
                console.log(err);
            }
        });
        equipment.image.push(newpath);

        await equipment.save((err)=>{
            if(err){
                console.log(err);
                res.status(400).json({message: "Missing field or fields"});
            } else {
                res.status(200).json(equipment);
            }
        });
        
    });
};  