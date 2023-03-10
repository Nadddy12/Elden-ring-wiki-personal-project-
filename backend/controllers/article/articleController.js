import {Article} from "../../models/articles/articlesSchema.js";



export const getAllBlogArticle = async (req , res) => {
    try{
        const article = await Article.find({type:"blog"});
        res.status(200).json(article);
    }catch (err) {
        console.log(err);
        res.status(500).json({message:"Server error"});
    }
};


export const getAllGuideArticle = async (req , res) => {
    try{
        const article = await Article.find({type:"guide"});
        res.status(200).json(article);
    }catch (err) {
        console.log(err);
        res.status(500).json({message:"Server error"});
    }
};


export const getOneArticle = async (req , res) => {
    
    const id = req.params.id;
    
    try{
        const article = await Article.findById(id);
        if(!article){
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(article);
    }catch (err) {
        console.log(err);
        res.status(500).json({message:"Server error"});
    }
};


export const createArticle = async (req , res) => {
    const {title , content , type , link } = req.body;
    const userId = req.userId;
    
    try{
        const article = new Article({
            title,
            content,
            user:userId,
            type,
            link
        });
        
        await article.save();
        res.status(200).json({message:"Article created successfully!"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};


export const updateArticle = async (req , res) => {
    const id = req.params.id;
    const {title , content} = req.body;
    
    const update = {
        title,
        content
        };
    
    try {
        const article = await Article.findByIdAndUpdate(id, update);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.status(200).json({ message: "Article updated successfully" });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};


export const deleteArticle = async (req , res) => {
    const id = req.params.id;
    
    try {
        const article = await Article.findByIdAndDelete(id);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.status(200).json({ message: "Article deleted successfully" });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};