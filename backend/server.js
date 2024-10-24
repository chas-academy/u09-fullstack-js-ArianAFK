require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const productRoutes = require('./routes/products')
const userRoutes = require('./routes/user')
const cors = require('cors');

// express app
const app = express()

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

// middleware
app.use(express.json())

/* app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
}) */

    app.use(
        cors({
            origin: [
                "http://localhost:3000",
                "https://bossmedia.netlify.app"
            ],
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            credentials: true,
        })
    );
    app.options('*', cors());

// routes
app.use('/api/products', productRoutes)
app.use('/api/user', userRoutes)

