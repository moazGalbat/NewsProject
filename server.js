const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

const authRouter = require('./routes/auth')
const sourcesRouter = require ('./routes/sources')
const newsRouter = require ('./routes/news')
const userRouter = require ('./routes/users')

const port = process.env.PORT || 5000;
const uri = process.env.DB_URI

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (!err) console.log("mongodb started");
    else {
        console.log(err);
        process.exit(1);
    };
})

app.use(cors());
app.use(express.json())


app.use('', authRouter)
app.use('/sources', sourcesRouter)
app.use('/news', newsRouter)
app.use('/users', userRouter)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    if (statusCode>= 500){
        res.status(statusCode).json({
            message: 'INTERNAL SERVER ERROR',
            type: "INTERNAL SERVER ERROR"
        })
    }else{
        res.status(statusCode).json ({
            message: err.message,
            type: err.type,
            details: err.details,
        })
    }
})


app.listen(port, () => console.log(`server started on port ${port}`))