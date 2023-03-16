import { getOneArticle } from "../controllers/article/articleController.js";
import { createCommentaire , getCommentaireByArticle , updateCommentaire , deleteCommentaireUser } from "../controllers/commentaire/commentaireController.js";
import { saveCharacter , getCharactersByUser , deleteCharacterByUser} from "../controllers/character/characterController.js";
import express from "express";

const router = express.Router();

router.get('/article/:id', getOneArticle);

router.get('/article/:id/commentaire', getCommentaireByArticle);
router.post('/article/:id/create-commentaire', createCommentaire);
router.put('/update-commentaire/:id', updateCommentaire);
router.delete('/delete-commentaire/:id', deleteCommentaireUser);

router.post('/character', saveCharacter);
router.get('/get-character' , getCharactersByUser);
router.delete('/delete-character/:id' , deleteCharacterByUser);

export default router;