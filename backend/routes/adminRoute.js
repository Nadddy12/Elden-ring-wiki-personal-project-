import express from "express";
import { updateArticle , deleteArticle , createArticle } from "../controllers/article/articleController.js";
import { addEquipment } from "../controllers/equipment/equipmentController.js";


const router = express.Router();

router.post('/create-article', createArticle);
router.put('/update-article/:id', updateArticle);
router.delete('/delete-article/:id', deleteArticle);

router.post('/add-equipment', addEquipment);

export default router;