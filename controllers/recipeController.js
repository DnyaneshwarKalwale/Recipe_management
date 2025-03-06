import Recipe from '../models/recipeModel.js';
import { errorResponse } from '../utils/ErrorResponse.js';

export const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, cookingTime, category } = req.body;
    
    // Validate required fields
    if (!title || !ingredients || !instructions) {
      return errorResponse(res, 400, 'Please fill all required fields');
    }

    // Create recipe
    const recipe = await Recipe.create({
      title,
      ingredients: ingredients.split('\n'),
      instructions: instructions.split('\n'),
      cookingTime,
      category,
      owner: req.user._id
    });

    res.status(201).json(recipe);
    
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const getRecipes = async (req, res) => {
  try {
    // Get all recipes with owner details
    const recipes = await Recipe.find()
      .populate('owner', 'name avatar')
      .sort('-createdAt');
      
    res.json(recipes);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const updateRecipe = async (req, res) => {
  try {
    // Find recipe
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return errorResponse(res, 404, 'Recipe not found');

    // Check ownership
    if (recipe.owner.toString() !== req.user._id.toString()) {
      return errorResponse(res, 401, 'Not authorized');
    }

    // Update recipe
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json(updatedRecipe);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const getRandomRecipe = async (req, res) => {
  try {
    // Get random recipe
    const count = await Recipe.countDocuments();
    const random = Math.floor(Math.random() * count);
    const recipe = await Recipe.findOne().skip(random).populate('owner', 'name avatar');
    
    res.json(recipe);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};