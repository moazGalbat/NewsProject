const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const util = require('util')
const jwt = require('jsonwebtoken')


const saltRounds = 10;
const jwtSecretKey = process.env.JWT_SECRET;

const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    sources: [String]
})

userSchema.pre('save', async function () {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, saltRounds)
    }
});

userSchema.methods.comparePassword = function (plainPassword) {
    const user = this;
    return bcrypt.compare(plainPassword, user.password);
}

userSchema.methods.generateToken = function (expiresIn) {
    const user = this;
    return sign({ id: user._id, email: user.email }, jwtSecretKey, { expiresIn });
}

userSchema.statics.getVerifiedUser = async function (token) {
    const User = this;
    const payload = await verify(token, jwtSecretKey);
    const currentUser = await User.findById(payload.id);
    if (!currentUser) throw new Error("User Not Found");
    return currentUser;
}


userSchema.statics.findUserByEmail = async function (mail) {
    const User = this;
    const user = await User.findOne({ email: mail }).exec();
    return user;
}

const User = mongoose.model('User', userSchema)

module.exports = User;