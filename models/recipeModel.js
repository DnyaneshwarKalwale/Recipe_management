// models/RecipeModel.js (renamed from eventModel.js)
import mongoose from 'mongoose';
import userModel from './userModel.js';

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Recipe title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    image: {
        type: String,
        default: "https://via.placeholder.com/300"
    },
    ingredients: {
        type: [String],
        required: [true, "Ingredients are required"]
    },
    instructions: {
        type: [String],
        required: [true, "Instructions are required"]
    },
    cookingTime: {
        type: Number,
        required: [true, "Cooking time is required"]
    },
    category: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'],
        default: 'Lunch'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
        required: true
    },
    order: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;