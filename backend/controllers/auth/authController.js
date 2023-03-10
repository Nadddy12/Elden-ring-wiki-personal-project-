import bcrypt from "bcrypt";
import {User} from "../../models/users/usersSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signin = async (req , res) => {
    
    const {username , email , password , role} = req.body;
    
    try{
        if(!username || !email || !password){
            res.status(400).json({message:"All fields are required"});
        }
        const saltRounds = 10;
    
        const hash = await bcrypt.hash(password , saltRounds);
        
        const user = new User({
           username,
           email,
           password:hash,
           role
        });
        await user.save();
        
        const jwt = user.createJWT();
            res.status(200).json({
                user: {
                username: user.username,
                email: user.email,
                id: user._id
            },
                jwt
            });
    }
    catch (err) {
        console.log(err);
        if (err.code === 11000) {
        return res.status(400).json({message:"Username or email already exists"});
        }
        res.status(500).json({error: "Internal server error."});
    }
};

export const login = async(req , res) => {
    
    const {email ,password} = req.body;
    const user = await User.findOne({email});
    
    try {
        if(user == undefined){
            res.status(400).json("invalid email or password");
        }
        bcrypt.compare(password, user.password, (err,match) =>{
            if(err){
                console.log(err);
                res.status(400).json({error: "Invalid email or password."});
            }
            if(match){
                const jwt = user.createJWT();
                res.status(200).json({
                    user: {
                        username:user.username,
                        email: user.email,
                        id: user._id,
                        role:user.role
                    },
                    jwt
                });
            } else {
                res.status(400).json({error: "invalid password or email"});
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error."});
    }
};


export const verifyToken = async(req , res) => {
    
    const token = req.headers.authorization;
    if(!token){
       return res.status(403).json({message: "No Token Provided"});
    }
    jwt.verify(token.split(" ")[1], process.env.JWT_KEY, async (err, decoded) => {
        if (err) {
            res.status(401).send({message: "Unauthorized!"});
            return;
        }
        const user = await User.findOne({_id: decoded.id});
        res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    });
};