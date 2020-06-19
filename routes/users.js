const router = require("express").Router();
const UserModel = require('../models/user')
const { check, body } = require('express-validator');
const customError = require('../helpers/customError')

const authMiddleware = require('../middlewares/authMiddleware')




router.get("/:id/sources",authMiddleware ,async (req, res, next) => {
    try {
        const { params: { id } } = req
        const user = req.user;
        res.status(200).json(user.sources)
    } catch (error) {
        next(error)   
    }
})



module.exports = router;
