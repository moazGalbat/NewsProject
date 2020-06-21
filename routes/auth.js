const router = require("express").Router();
const {login,signup} = require('../controllers/authControllers')
const authMiddleware = require('../middlewares/authMiddleware')
const validationMiddleware = require('../middlewares/validation')
const authValidations = require ('../validations/validations')

router.post("/login", validationMiddleware(authValidations.loginValidations),login)

router.post("/signup", validationMiddleware(authValidations.signupValidations),signup)

router.get("/checkAuth", authMiddleware, (req, res, next) => {
    res.status(200).json({message: "loggedIn"})
})

module.exports = router;
