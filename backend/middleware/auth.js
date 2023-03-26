import jwt from "jsonwebtoken";
import {User} from "../models/users/usersSchema.js";
import dotenv from "dotenv";

dotenv.config();

const ADMIN_ROLE = "admin";
const MOD_ROLE = "mod";

export const verifyUser = ( req , res , next) => {
    
    const token = req.headers.authorization;
    if(!token){
       return res.status(403).json({message: "No Token Provided"});
    }
    
    jwt.verify(token.split(" ")[1], process.env.JWT_KEY, async (err, decoded) => {
        if (err) {
            res.status(401).send({message: "Unauthorized!"});
            return;
        }
        req.userId = decoded.id;
        next();
    });
};

export const verifyMod = async (req , res , next) => {
  try {
    const user = await User.findOne({_id: req.userId});
    if (user.role !== MOD_ROLE) {
      return res.status(400).json({message:"Unauthorized!"});
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({message: "Unauthorized!"});
  }
};

export const verifyAdmin = async (req , res , next) => {
  try { 
    const user = await User.findOne({_id: req.userId});
    if (user.role !== ADMIN_ROLE) {
      return res.status(400).json({message:"Unauthorized!"});
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({message: "Unauthorized!"});
  }
};