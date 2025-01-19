const {Router} = require("express");
const router = Router();

const {Items} = require("../db/index")


// Create an item
router.post("/create", async (req, res) => {
    try {
        const name = req.body.name;
        const price = req.body.price;

        const newItem = await Items.create({
            name: name,
            price: price,
        });

        res.status(201).json({ msg: "Item created successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Error creating item", error: error.message });
    }
});


// Get all items
router.get("/getItems", async (req, res) => {
    try {
        const items = await Items.find();
        res.json({ items: items });
    } catch (error) {
        res.status(500).json({ msg: "Error retrieving items", error: error.message });
    }
});
 

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const item = await Items.findById(id);

        // Check if the item is found
        if (!item) {
            return res.status(404).json({ msg: "Item not found" });
        }

        console.log("Found item:", item); // Debug log
        res.json({ item });
    } catch (error) {
        console.log("Error fetching item:", error.message); // Debug log
        res.status(500).json({ msg: "Error fetching item", error: error.message });
    }
});


// Update the price of an item by ID
router.put("/:id/price", async (req, res) => {
    try {
        const id = req.params.id;
        const  price  = req.body.price; 

        const updatedItem = await Items.findByIdAndUpdate(
            id,
            { price }
        );

        // If the item doesn't exist
        if (!updatedItem) {
            return res.status(404).json({ msg: "Item not found" });
        }

        res.json({ msg: "Price updated successfully", item: updatedItem });
    } catch (error) {
        res.status(500).json({ msg: "Error updating price", error: error.message });
    }
});

// Delete an item by ID
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const deletedItem = await Items.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ msg: "Item not found" });
        }

        res.json({ msg: "Item deleted successfully", item: deletedItem });
    } catch (error) {
        res.status(500).json({ msg: "Error deleting item", error: error.message });
    }
});


module.exports = router;