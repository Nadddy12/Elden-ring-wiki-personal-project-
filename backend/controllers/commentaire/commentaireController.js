import { Commentaire } from "../../models/commentaires/commentairesSchema.js";
import {Article} from "../../models/articles/articlesSchema.js";
import {User} from "../../models/users/usersSchema.js";
import mongoose from "mongoose";
import {ObjectId} from "mongodb";


export const getCommentaireByArticle = async (req , res) => {
    const articleId = req.params.id;
    
    try{
        if (!req.params) {
            return res.status(400).json({ message: 'Missing required parameters' });
        }
        if(articleId){
            const commentaire = await Commentaire.find({article:articleId}).populate({ path: 'user', select: 'username' });
            if (!commentaire) {
                return res.status(404).json({ message: 'No comments found for the given article ID' });
            }
            res.status(200).json(commentaire);
        }else{
            res.status(400).json({message:"Bad request"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }
};


export const createCommentaire = async (req , res) => {
    const userId = req.userId;
    const articleId = req.params.id;
    const { content } = req.body;
    
    if(!articleId || !userId || !mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(articleId)){
            return res.status(401).json({message:"Invalid user ID or article ID"});
    }
    
    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(401).json({message:"Invalid user ID"});
        }
        const article = await Article.findById(articleId);
        if(!article){
            return res.status(401).json({message:"Invalid article ID"});
        }
        const commentaire = new Commentaire({
            user:userId,
            article:articleId,
            content,
        });
        
        await commentaire.save();
        res.status(200).json({ message: "Comment successfully created", commentaire });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};


export const updateCommentaire = async (req , res) => {
    const userId = req.userId; 
    const id = req.params.id;
    const { content } = req.body;
    const userIdObj = new ObjectId(userId);
    
    if (!req.params) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }
    
    try{
        const update = {
            content
        };
        const commentaire = await Commentaire.findById(id);
        if(!commentaire){
            return res.status(401).json({message:"Invalid commentaire ID"});
        }
        if(commentaire.user.toString !== userIdObj.toString){
            return res.status(401).json({message: "Unauthorized!"});
        }
        const updatedCommentaire = await Commentaire.findByIdAndUpdate(id , update);
        res.status(200).json({ message: "Comment successfully update", updatedCommentaire });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const deleteCommentaireUser = async (req , res) => {
    const userId = req.userId; 
    const id = req.params.id;
    if (!req.params) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }
    
    try{

        const commentaire = await Commentaire.findById(id);
        if(!commentaire){
            return res.status(401).json({message:"Invalid commentaire ID"});
        }
        const user = await User.findById(commentaire.user);
        if(user.id !== userId){
            return res.status(401).json({message: "Unauthorized!"});
        }
        await Commentaire.findByIdAndDelete(id);
        res.status(200).json({ message: "Comment successfully deleted" });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }

};


export const deleteCommentaireMod = async (req , res) => {
     
    const id = req.params.id;
    if (!req.params) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }
    
    try{

        const commentaire = await Commentaire.findById(id);
        if(!commentaire){
            return res.status(401).json({message:"Invalid commentaire ID"});
        }
        const user = await User.findById(commentaire.user);
        console.log(user);
        if(user.role === "admin"){
            return res.status(401).json({message: "Unauthorized!"});
        }
        await Commentaire.findByIdAndDelete(id);
        res.status(200).json({ message: "Comment successfully deleted" });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};


export const deleteCommentaireAdmin = async (req , res) => {
    const id = req.params.id;
    if (!req.params) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }
    
    try{

        const commentaire = await Commentaire.findById(id);
        if(!commentaire){
            return res.status(401).json({message:"Invalid commentaire ID"});
        }
        await Commentaire.findByIdAndDelete(id);
        res.status(200).json({ message: "Comment successfully deleted" });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};




/*const userId = req.userId;
    const userIdObj = new ObjectId(userId);
    const articleId = req.params.id;
    const commentaireId = req.query.id;
    const { content } = req.body;
    
    if(!articleId || !userId || !commentaireId ||!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(articleId) || !mongoose.Types.ObjectId.isValid(commentaireId)){
            return res.status(401).json({message:"Invalid user ID or article ID"});
    }
    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(401).json({message:"Invalid user ID"});
        }
        const article = await Article.findById(articleId);
        if(!article){
            return res.status(401).json({message:"Invalid article ID"});
        }
        const commentaire = await Commentaire.findById(commentaireId);
        if(!commentaire){
            return res.status(401).json({message:"Invalid commentaire ID"});
        }
        if(commentaire.user.toString !== userIdObj.toString){
            console.log(commentaire.user, userId);
            return res.status(401).json({message:"Unauthorized!"});
        }*/