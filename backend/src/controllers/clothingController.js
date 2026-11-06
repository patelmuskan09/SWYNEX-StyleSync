
const Clothing = require("../models/Clothing");

// 1. Add a clothing item
const addClothing = async (req, res) => {
    try {
        const clothing = await Clothing.create(req.body);

        res.status(201).json({
            success: true,
            message: "Clothing item added successfully",
            data: clothing
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// 2. Get all clothing items
const getClothing = async (req, res) => {
    try {
        const clothing = await Clothing.find();

        res.status(200).json({
            success: true,
            count: clothing.length,
            data: clothing
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// 3. Get a single clothing item
const getClothingById = async (req, res) => {
    try {
        const clothing = await Clothing.findById(req.params.id);

        if (!clothing) {
            return res.status(404).json({
                success: false,
                message: "Clothing item not found"
            });
        }

        res.status(200).json({
            success: true,
            data: clothing
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid clothing ID"
        });
    }
};

// 4. Update clothing details
const updateClothing = async (req, res) => {
    try {
        const clothing = await Clothing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!clothing) {
            return res.status(404).json({
                success: false,
                message: "Clothing item not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Clothing item updated successfully",
            data: clothing
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// 5. Delete a clothing item
const deleteClothing = async (req, res) => {
    try {
        const clothing = await Clothing.findByIdAndDelete(req.params.id);

        if (!clothing) {
            return res.status(404).json({
                success: false,
                message: "Clothing item not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Clothing item deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid clothing ID"
        });
    }
};

module.exports = {
    addClothing,
    getClothing,
    getClothingById,
    updateClothing,
    deleteClothing
};
