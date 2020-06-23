const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require("helmet");
const path = require("path")

require('dotenv').config()

const authRouter = require('./routes/auth')
const sourcesRouter = require ('./routes/sources')
const newsRouter = require ('./routes/news')
const userRouter = require ('./routes/users')
const authMiddleware = require('./middlewares/authMiddleware')

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



const corsOptions = {
    origin: process.env.CLIENT_URI,
}
    
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json())


app.use('/', authRouter)
app.use('/sources',authMiddleware, sourcesRouter)
app.use('/news',authMiddleware, newsRouter)
app.use('/users',authMiddleware, userRouter)

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

// for production only.
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "client", "build")))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}
// 

app.listen(port, () => console.log(`server started on port ${port}`))