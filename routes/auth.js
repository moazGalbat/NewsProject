const router = require("express").Router();
const UserModel = require('../models/user')
const { check, body } = require('express-validator');
const customError = require('../helpers/customError')

const authMiddleware = require('../middlewares/authMiddleware')
const validationMiddleware = require('../middlewares/validation')

router.post("/login", validationMiddleware(
    [
        check('email').trim().normalizeEmail().notEmpty().withMessage("email is required").isEmail().withMessage("Invalid Mail Format"),
        check('password').trim().notEmpty().withMessage("password is required"),
    ])
    ,
    async (req, res, next) => {
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

    })

router.post("/signup", validationMiddleware(
    [
        check('email').trim().normalizeEmail().notEmpty().withMessage("email is required").isEmail().withMessage("Invalid Mail Format"),
        check('password').trim().isLength({ min: 8 }).withMessage("Password is at least 8 characters").notEmpty().withMessage("password is required").trim(),
        check('firstName').trim().isAlpha().withMessage("Use Letters only.").isLength({ min: 3 }).withMessage("First name is at least 3 characters").notEmpty().withMessage("First name is required"),
        check('lastName').trim().isAlpha().withMessage("Use Letters only.").isLength({ min: 3 }).withMessage("Last name is at least 3 characters").notEmpty().withMessage("Last name is required"),
        check('passwordConfirmation', 'passwordConfirmation field must have the same value as the password field')
            .exists()
            .custom((value, { req }) => value === req.body.password),
        check('email', 'Mail already in Use').custom(async value => {
            const user = await UserModel.findUserByEmail(value);
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        })
    ]),
    async (req, res, next) => {
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
    })

router.get("/checkAuth", authMiddleware, (req, res, next) => {
    res.status(200).json({message: "loggedIn"})
})

module.exports = router;
