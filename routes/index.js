import authRoutes from './authRoutes.js';
import express from 'express';
const router = express.Router();
import recipeRoutes from './recipeRoutes.js'
import userRoutes from './userRoutes.js'
// import myrecipeRoutes from './recipeBuyRoute.js';



router.use('/auth', authRoutes);
router.use('/recipe', recipeRoutes);
router.use('/user', userRoutes);
// router.use('/recipe', myrecipeRoutes);


export default router;