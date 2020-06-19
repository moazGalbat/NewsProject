const router = require("express").Router();
const axios = require("axios")
const authMiddleware = require('../middlewares/authMiddleware')


router.get("/all", (req,res,next)=>{
    res.status(200).json("alll")
})

router.get("", async (req, res, next) => {
    try {
        const response = await axios.get("https://newsapi.org/v2/sources?apiKey=3faed58441804588bfa8dc636f4b629b")
        res.status(200).json(response.data.sources)
    } catch (error) {
        next(error)   
    }
})

router.post("/subscribe", authMiddleware ,async (req, res, next) => {
    try {
        const { sources } = req.body;
        const user = req.user;
        user.sources = sources;
        await user.save()
        res.status(200).json(user.sources)
    } catch (error) {
        next(error)   
    }
})


module.exports = router;
