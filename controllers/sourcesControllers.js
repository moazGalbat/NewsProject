const axios = require("axios")


const apiKey = process.env.NEWS_API_KEY

const getAllSources = async (req, res, next) => {
    try {
        const response = await axios.get(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
        res.status(200).json(response.data.sources)
    } catch (error) {
        next(error)   
    }
}

module.exports ={
    getAllSources,
}