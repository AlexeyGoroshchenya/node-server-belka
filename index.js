require('dotenv').config()
const config_file = require("./config.json");
const express = require('express')
const {Sequelize} = require('sequelize')
// const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 7000

const sequelize = new Sequelize(
`${process.env.DB_NAME}`,
`${process.env.DB_USER}`,
`${process.env.DB_PASSWORD}`,
{
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
}

)

const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)



app.use(errorHandler)

// app.get('/', (req, res)=>{
//     res.status(200).json({message:"its work"})
// })

const start = async ()=>{
    try {

        await sequelize.authenticate()
        await sequelize.sync()


        app.listen(PORT, ()=> console.log(`server started on port: ${PORT}`))
    } catch (error) {
        console.log(error);
        
    }
}

start()