
const mongoose = require("mongoose");

const clothingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "User ID is required"]
        },

        name: {
            type: String,
            required: [true, "Clothing name is required"],
            trim: true
        },

        category: {
            type: String,
            required: [true, "Category is required"],
            enum: ["Shirt", "T-Shirt", "Jeans", "Dress", "Jacket", "Other"]
        },

        color: {
            type: String,
            required: [true, "Color is required"],
            trim: true
        },

        size: {
            type: String,
            required: [true, "Size is required"],
            trim: true
        },

        imageUrl: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: { createdAt: true, updatedAt: false }
    }
);

module.exports = mongoose.model("Clothing", clothingSchema);
