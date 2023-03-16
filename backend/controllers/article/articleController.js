import {Article} from "../../models/articles/articlesSchema.js";
import mongoose from "mongoose";



export const getAllBlogArticle = async (req , res) => {
    try{
        const article = await Article.find({type:"blog"});
        res.status(200).json(article);
    }catch (err) {
        console.log(err);
        res.status(500).json({message:"Bad request or no id provided"});
    }
};


export const getAllGuideArticle = async (req , res) => {
    
    try{
        const article = await Article.find({type:"guide"});
        res.status(200).json(article);
    }catch (err) {
        console.log(err);
        res.status(500).json({message:"Bad request or no id provided"});
    }
};


export const getOneArticle = async (req , res) => {
    
    if (!req.params) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }
    
    const id = req.params.id;
    
    try{
        const article = await Article.findById(id);
        if(!article){
            return res.status(404).json({ message: "Article not found" });
        }
        res.status(200).json(article);
    }catch (err) {
        console.log(err);
        res.status(500).json({message:"Bad request or no id provided"});
    }
};


export const createArticle = async (req , res) => {
    const {title , content , type , link } = req.body;
    const userId = req.userId;
    
    if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
        return res.status(401).json({message:"Invalid user ID or article ID"});
    }
    if(!title || !content || !type){
        return res.status(401).json({message:"All fields must fill"});
    }
    try{
        const article = new Article({
            title,
            content,
            user:userId,
            type,
            link
        });
        
        await article.save();
        res.status(200).json({message:"Article created successfully!", article});
    }
    catch(err){
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).json({ message: "title already exists" });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const updateArticle = async (req , res) => {
    const id = req.params.id;
    const {title , content} = req.body;
    
    if (!req.params) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }
    
    const update = {
        title,
        content
        };
    
    try {
        const article = await Article.findByIdAndUpdate(id, update);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.status(200).json({ message: "Article updated successfully", article });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Bad request or no id provided" });
    }
};


export const deleteArticle = async (req , res) => {
    const id = req.params.id;
    
    if (!req.params) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }
    
    try {
        const article = await Article.findByIdAndDelete(id);
        if (!article ) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.status(200).json({ message: "Article deleted successfully" });
    } 
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Bad request or no id provided" });
    }
};