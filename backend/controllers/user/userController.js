import {User} from "../../models/users/usersSchema.js";

export const getAllUser = async (req , res) => {
    try{
        const users = await User.find();
        if(!users){
            res.status(401).json({message:"Found no users in database"});
        }
        res.status(200).json({
            users: users.map((user) => ({
            username: user.username,
            email: user.email,
            role: user.role
            })) 
        });
    }
    catch(err){
        res.status(500).json({message: "Internet server error"});
    }
};


export const getOneUser = async (req , res) => {
    const id = req.params.id;
    
    if (!req.params) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }
    try{
        const user = await User.findById(id);
        if(!user){
            return res.status(401).json({message:"Invalid user ID"});
        }
        res.status(201).json(user);
    }catch(err){
        res.status(500).josn({message:"Internet server error"});
    }
};


export const updateUserRole = async (req , res) => {
    const id = req.params.id;
    const {role} = req.body;
    
    if (!req.params) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }
    try{
        const update = {
            role,
        };
        const user = await User.findById(id);
        if(!user){
            return res.status(401).json({message:"Invalid user ID"});
        }
        const updatedUser = await User.findByIdAndUpdate(id , update);
        res.status(201).json({ message: "Role successfully update", updatedUser });
    }catch(err){
        res.status(500).josn({message:"Internet server error"});
    }
};


export const deleteUser = async (req , res) => {
    const id = req.params.id;
    
    if (!req.params) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }
    try{
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(401).json({message:"Invalid user ID"});
        }
        res.status(201).json({message:"User successfully deleted"});
    }catch(err){
        res.status(500).josn({message:"Internet server error"});
    }
};