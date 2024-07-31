const express = require("express");
const router = express.Router()
const Person = require("./person")


router.post("/", async (req, res) => {
    try {
        const data = req.body
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved')
        res.status(200).json(response);

    } catch (error) {
        console.log("Server error", error)
        res.status(500).json({ error: `Internal Server Error` })
    }
})


router.get("/", async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched')
        res.status(200).json(data);

    } catch (error) {
        console.log("Server error", error)
        res.status(500).json({ error: `Internal Server Error` })
    }
})
router.get("/:workType", async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == "chef" || workType == "manager" || workType == "waiter") {
            const response = await Person.find({ work: workType })
            console.log('data fetched')
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: "Invalid work type" });
        }

    } catch (error) {
        console.log("Server error", error)
        res.status(500).json({ error: `Internal Server Error` })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const personId = req.params.id;
        const updatePersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new: true,
            runValidators: true,
        })
        if (!response) {
            return res.status(404).json({ error: `Person Not Found` })
        }
        res.status(200).json(response);

    } catch (error) {
        console.log("Server error", error)
        return res.status(500).json({ error: `Internal Server Error` })
    }
})

router.delete("/:id", async (req, res) => {
    try{const personId = req.params.id

    const response = await Person.findByIdAndDelete(personId)
    if (!response) {
        return res.status(404).json({ error: `Person Not Found` })
    }
    console.log("Data Delete")
    res.status(200).json({ message: `Person Deleted Successfully` });
} catch (error) {
    return res.status(500).json({ error: `Internal Server Error` })
}
}

)




module.exports = router;