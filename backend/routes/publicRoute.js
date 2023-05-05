import express from "express";
import { rateLimiter } from "../middleware/rateLimiter.js"
import {signup , login , verifyToken} from "../controllers/auth/authController.js";
import { getAllBlogArticle , getOneArticle , getAllGuideArticle } from "../controllers/article/articleController.js";
import { getAllEquipment , getEquipmentByType , getOneEquipment } from "../controllers/equipment/equipmentController.js";
import { getAllSpell , getSpellByType , getOneSpell } from "../controllers/spell/spellController.js";
import { getCommentaireByArticle } from "../controllers/commentaire/commentaireController.js";


const router = express.Router();

router.post('/signup', rateLimiter, signup);
router.post('/login', rateLimiter , login);
router.get('/verify-token', verifyToken);

router.get('/article/:id', getOneArticle);
router.get('/article/:id/commentaire', getCommentaireByArticle);
router.get('/blog', getAllBlogArticle);
router.get('/guide', getAllGuideArticle);

router.get('/equipment' , getAllEquipment);
router.get('/equipment-by-type' , getEquipmentByType);
router.get('/equipment-by-id/:id' , getOneEquipment);

router.get('/spell' , getAllSpell);
router.get('/spell-by-type' , getSpellByType);
router.get('/spell-by-id/:id' , getOneSpell);

export default router;