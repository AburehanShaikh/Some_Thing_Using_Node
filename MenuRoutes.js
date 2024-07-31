const express = require("express");
const router = express.Router()
const MenuItem = require("./menu")


router.post("/", async (req, res) => {
    try {
        const data = req.body
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log('data saved')
        res.status(200).json(response);

    } catch (error) {
        console.log("Server error", error)
        res.status(500).json({ error: `Internal Server Error` })
    }
})

router.get("/", async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('data fetched')
        res.status(200).json(data);

    } catch (error) {
        console.log("Server error", error)
        res.status(500).json({ error: `Internal Server Error` })
    }
})
router.get('/:taste', async (req, res) => {
    const taste = req.params.taste; // Extract the taste parameter from the URL

    try {
        // Query the database for menu items with the specified taste
        const menuItems = await MenuItem.find({ taste: taste });

        // Check if any items were found
        if (menuItems.length > 0) {
            res.status(200).json(menuItems); // Send the found items as JSON
        } else {
            res.status(404).json({ message: 'No menu items found with that taste' }); // Send a 404 response if no items found
        }
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // Send a 500 response in case of server error
    }
});


module.exports = router;
