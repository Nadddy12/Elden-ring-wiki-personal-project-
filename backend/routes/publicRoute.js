import express from "express";
import {signin , login , verifyToken} from "../controllers/auth/authController.js";
import { getAllBlogArticle , getOneArticle , getAllGuideArticle } from "../controllers/article/articleController.js";
import { getAllEquipment , getEquipmentByType , getOneEquipment } from "../controllers/equipment/equipmentController.js";


const router = express.Router();

router.post('/signin', signin);
router.post('/login', login);
router.get('/verify-token', verifyToken);

router.get('/article/:id', getOneArticle);
router.get('/blog', getAllBlogArticle);
router.get('/guide', getAllGuideArticle);

router.get('/equipment' , getAllEquipment);
router.get('/equipment/:query' , getEquipmentByType);
router.get('/equipment/:id' , getOneEquipment);

export default router;