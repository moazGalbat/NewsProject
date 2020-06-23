const router = require("express").Router();
const {getAllSources} = require('../controllers/sourcesControllers')
const cacheMiddleware = require('../middlewares/authMiddleware')




router.get("/",cacheMiddleware, getAllSources )


module.exports = router;
