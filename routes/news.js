const router = require("express").Router();
const {getNews} =  require('../controllers/newsControllers')


router.get('/', getNews)

module.exports = router;
