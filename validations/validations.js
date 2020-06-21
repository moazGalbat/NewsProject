const { check } = require('express-validator');


const loginValidations = [
    check('email').trim().normalizeEmail().notEmpty().withMessage("email is required").isEmail().withMessage("Invalid Mail Format"),
    check('password').trim().notEmpty().withMessage("password is required"),
]


const signupValidations = [
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
]

module.exports = {
    loginValidations,
    signupValidations
}