import express from "express";
import { updateArticle , deleteArticle , createArticle } from "../controllers/article/articleController.js";

const router = express.Router();

router.post('/create-article', createArticle);
router.put('/update-article/:id', updateArticle);
router.delete('/delete-article/:id', deleteArticle);

export default router;