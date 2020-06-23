const { client } = require('../db/redis')


module.exports = (req,res,next)=>{
    client.get("sources",(err,data)=>{
        if (err) next(err);

        if (data!==null){
            res.status(200).json(JSON.parse(data))
        }else{
            next()
        }
    })
}