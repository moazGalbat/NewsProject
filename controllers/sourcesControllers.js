const axios = require("axios")
const { client } = require('../db/redis')


const apiKey = process.env.NEWS_API_KEY

const getAllSources = async (req, res, next) => {
    try {
        const response = await axios.get(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
        const cacheSources = JSON.stringify(response.data.sources)
        //cache source in redis db before sending it expires after 12 hours
        client.setex("sources",3600*12, cacheSources)
        res.status(200).json(response.data.sources)
    } catch (error) {
        next(error)   
    }
}

module.exports ={
    getAllSources,
}