
const Clothing = require("../models/Clothing");

// Get the logged-in user's ID
const getUserId = (req) => String(req.user._id);

// Only allow these clothing fields to be saved or updated
const getAllowedFields = (body) => {
    const { name, category, color, size, imageUrl } = body;

    return { name, category, color, size, imageUrl };
};

// 1. Add a clothing item
const addClothing = async (req, res) => {
    try {
        const clothing = await Clothing.create({
            ...getAllowedFields(req.body),
            userId: getUserId(req)
        });

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

// 2. Get only the logged-in user's clothing
const getClothing = async (req, res) => {
    try {
        const clothing = await Clothing.find({
            userId: getUserId(req)
        });

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

// 3. Get one clothing item belonging to the logged-in user
const getClothingById = async (req, res) => {
    try {
        const clothing = await Clothing.findOne({
            _id: req.params.id,
            userId: getUserId(req)
        });

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

// 4. Update only the logged-in user's clothing
const updateClothing = async (req, res) => {
    try {
        const clothing = await Clothing.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: getUserId(req)
            },
            getAllowedFields(req.body),
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

// 5. Delete only the logged-in user's clothing
const deleteClothing = async (req, res) => {
    try {
        const clothing = await Clothing.findOneAndDelete({
            _id: req.params.id,
            userId: getUserId(req)
        });

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
