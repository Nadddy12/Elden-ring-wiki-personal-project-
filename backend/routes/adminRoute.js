import express from "express";
import { updateArticle , deleteArticle , createArticle } from "../controllers/article/articleController.js";
import { addEquipment , updateEquipment , deleteEquipment} from "../controllers/equipment/equipmentController.js";
import { addSpell , updateSpell , deleteSpell} from "../controllers/spell/spellController.js";
import { deleteCommentaireAdmin } from "../controllers/commentaire/commentaireController.js";
import { getAllUser , getOneUser , deleteUser } from "../controllers/user/userController.js";

const router = express.Router();

router.get('/user', getAllUser);
router.get('/user/:id', getOneUser);
router.delete('/delete-user/:id', deleteUser);

router.post('/create-article', createArticle);
router.put('/update-article/:id', updateArticle);
router.delete('/delete-article/:id', deleteArticle);

router.post('/add-equipment', addEquipment);
router.put('/update-equipment/:id', updateEquipment);
router.delete('/delete-equipment/:id', deleteEquipment);

router.post('/add-spell', addSpell);
router.put('/update-spell/:id', updateSpell);
router.delete('/delete-spell/:id', deleteSpell);

router.delete('/delete-commentaire/:id', deleteCommentaireAdmin);

export default router;