const axios = require("axios")
const customError = require('../helpers/customError')


const getNews = async (req, res, next) => {
    const pageSize = req.query.pageSize || 10;
    const page = req.query.page || 1
    const user = req.user;
    const sources = user.sources.join(",");
    try {
        if (user.sources.length === 0)  throw customError(422, "One source at least is required")
        const response = await axios.get(`https://newsapi.org/v2/everything?sources=${sources}&pageSize=${pageSize}&page=${page}&apiKey=3faed58441804588bfa8dc636f4b629b`)
        res.status(200).json(response.data)
    } catch (error) {
        next(error)   
    }
}

module.exports = {
    getNews,
}