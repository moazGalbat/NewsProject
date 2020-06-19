const UserModel = require ('../models/user')
const customError = require ("../helpers/customError")

module.exports =  async (req,res,next)=>{
    try {
        const token = req.headers.authorization;
        if (!token) throw customError (401, "Authorization header is missing");
        const currentUser =  await UserModel.getVerifiedUser(token);
        req.user = currentUser;
        next()
    } catch (err) {
        err.statusCode = 401;
        next(err)
    }
}