const mongoose = require('mongoose')


const sourceSchema = new mongoose.Schema({
        id: { type: String, required: true , unique:true},
        name: { type: String, required: true },
})


const Source = mongoose.model('Source', sourceSchema)

module.exports = Source;