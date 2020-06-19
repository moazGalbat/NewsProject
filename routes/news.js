const router = require("express").Router();
const axios = require("axios")
const authMiddleware = require('../middlewares/authMiddleware')



router.get('',authMiddleware, async (req, res, next) => {
    const pageSize = req.query.pageSize || 10;
    const page = req.query.page || 1
    const user = req.user;
    const sources = user.sources.join(",");
    try {
        const response = await axios.get(`https://newsapi.org/v2/everything?sources=${sources}&pageSize=${pageSize}&page=${page}&apiKey=3faed58441804588bfa8dc636f4b629b`)
        res.status(200).json(response.data)
    } catch (error) {
        next(error)   
    }
})

module.exports = router;
