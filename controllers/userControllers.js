const UserModel = require('../models/user')

const subscribe = async (req, res, next) => {
    try {
        const { sources } = req.body;
        const userID = req.user._id;
        const user = await UserModel.findByIdAndUpdate(userID, { $set: { "sources": sources } }, { new: true }).exec()
        res.status(200).json(user.sources)
    } catch (error) {
        next(error)
    }
}

const getUserSources = async (req, res, next) => {
    try {
        const { params: { id } } = req
        const user = req.user;
        res.status(200).json(user.sources)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    subscribe,
    getUserSources
}