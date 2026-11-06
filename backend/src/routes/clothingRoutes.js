const express = require("express");
const router = express.Router();

const {
    addClothing,
    getClothing,
    getClothingById,
    updateClothing,
    deleteClothing
} = require("../controllers/clothingController");

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