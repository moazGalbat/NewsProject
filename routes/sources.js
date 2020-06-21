const router = require("express").Router();
const {getAllSources} = require('../controllers/sourcesControllers')
// const SourceModel = require('../models/source')


router.get("/", getAllSources )


module.exports = router;
