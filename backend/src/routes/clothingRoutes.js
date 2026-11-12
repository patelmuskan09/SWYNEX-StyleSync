
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    addClothing,
    getClothing,
    getClothingById,
    updateClothing,
    deleteClothing
} = require("../controllers/clothingController");

// Require a valid login token for every clothing route
router.use(protect);

// Routes for all clothing items
router.route("/")
    .get(getClothing)
    .post(addClothing);

// Routes for a specific clothing item
router.route("/:id")
    .get(getClothingById)
    .put(updateClothing)
    .delete(deleteClothing);

module.exports = router;
