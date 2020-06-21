const router = require("express").Router();
const UserModel = require('../models/user')



router.post("/:id/sources" ,async (req, res, next) => {
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

router.get("/:id/sources" ,async (req, res, next) => {
    try {
        const { params: { id } } = req
        const user = req.user;
        res.status(200).json(user.sources)
    } catch (error) {
        next(error)   
    }
})



module.exports = router;
