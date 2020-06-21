const axios = require("axios")

const getAllSources = async (req, res, next) => {
    try {
        const response = await axios.get("https://newsapi.org/v2/sources?apiKey=3faed58441804588bfa8dc636f4b629b");
        
        // SourceModel.collection.insertMany(response.data.sources, onInsert);
        // function onInsert(err, docs) {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.info('%d potatoes were successfully stored.', docs.length);
        //     }
        // }
        res.status(200).json(response.data.sources)
    } catch (error) {
        next(error)   
    }
}

module.exports ={
    getAllSources,
}