const router = require("express").Router();
const UserModel = require('../models/user')
const {subscribe,getUserSources} = require ('../controllers/userControllers')


router.post("/:id/sources" ,subscribe)

router.get("/:id/sources" ,getUserSources)



module.exports = router;
