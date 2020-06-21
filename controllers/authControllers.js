const UserModel = require('../models/user')
const customError = require('../helpers/customError')


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email }).exec();
        if (!user) throw customError(401, "Incorrect Username or Password")
        const match = await user.comparePassword(password);
        if (!match) throw customError(401, "Incorrect Username or Password")
        const token = await user.generateToken("30m");
        res.status(200).json({ user, token })
    } catch (err) {
        next(err)
    }

}

const signup =  async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = new UserModel({
            firstName,
            lastName,
            email,
            password
        })
        await user.save()
        const token = await user.generateToken("30m");
        res.status(200).json({ user, token })
    } catch (err) {
        err.statusCode = 400;
        next(err);
    }
}

module.exports = {
    login,
    signup
}