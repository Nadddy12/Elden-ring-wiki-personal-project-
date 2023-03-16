import express from "express";
import { updateArticle , deleteArticle , createArticle } from "../controllers/article/articleController.js";
import { deleteCommentaireMod } from "../controllers/commentaire/commentaireController.js";

const router = express.Router();

router.post('/create-article', createArticle);
router.put('/update-article/:id', updateArticle);
router.delete('/delete-article/:id', deleteArticle);

router.delete('/delete-commentaire/:id', deleteCommentaireMod);

export default router;