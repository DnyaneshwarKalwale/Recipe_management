import { createEvent, getEvent, getEvents, getMyEvents, getOrders, getPopularEvents, getUsersEvents, deleteEvent, editEvent } from "../controllers/recipeController.js";
import express from 'express';
import { VarifyToken } from '../utils/Token.js'

const router = express.Router();



router.post('/create', VarifyToken, createEvent);
router.get('/get-users-recipe/:userId', getUsersEvents);
router.get('/get-my-recipe', VarifyToken, getMyEvents);
router.get('/get-recipe/:recipeId', getEvent);
router.get('/get-recipe', getEvents);
router.get('/get-popular-recipe', getPopularEvents);
router.get('/orders/:recipeId',VarifyToken , getOrders);
router.get('/event/:recipeId', VarifyToken, getEvent);
router.delete('/delete-recipe/:recipeId', VarifyToken, deleteEvent);
router.put('/edit-recipe/:recipeId', VarifyToken, editEvent);


export default router;