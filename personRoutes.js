const express = require("express");
const router = express.Router()
const Person = require("./person")
const { jwtAuthMiddleware, generateToken } = require("./jwt")

router.post("/signup", async (req, res) => {
    try {
        const data = req.body   
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved')

        const payload = {
            id: response.id,
            username: response.username
        }
        //console.log(JSON.stringify(payload));

        const token = generateToken(payload)
        console.log(token)

        res.status(200).json({ response: response, token: token });

    } catch (error) {
        console.log("Server error", error)
        res.status(500).json({ error: `Internal Server Error` })
    }
})

router.post("/login", async (req, res) => {
    try {
        //Extract username and password from body
        const { username, password } = req.body;

        //Find user by username
        const user = await Person.findOne({ username: username })

        //If user does not exist or password does not match
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: "Invalid username or password" })
        }
        //Generate Token
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload)
        res.json({ token })
    } catch (error) {
        console.log("Server error:", error)
        res.status(500).json({ error: `Internal Server Error` })
    }
})


router.get("/", jwtAuthMiddleware, async (req, res) => {
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

router.get('/profile', jwtAuthMiddleware, async (req, res) =>{
    try {
        const userData = req.user;
        console.log(userData, "Userdata");

        const userId = userData.id;
        const user = await Person.findById(userId);
        res.status(200).json({ user })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ err: `Internal Server Error` })
    }
})




router.delete("/:id", async (req, res) => {
    try {
        const personId = req.params.id

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