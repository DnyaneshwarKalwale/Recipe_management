import express from 'express';
import { verifyToken } from '../utils/Token.js';
import { 
  createRecipe, 
  getRecipes, 
  updateRecipe, 
  getRandomRecipe 
} from '../controllers/recipeController.js';

const router = express.Router();

router.post('/', verifyToken, createRecipe);
router.get('/', getRecipes);
router.put('/:id', verifyToken, updateRecipe);
router.get('/random', getRandomRecipe);

export default router;