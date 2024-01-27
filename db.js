const {Sequelize} = require('sequelize')




module.exports = new Sequelize(
    
    

    {
        dialect: 'postgres',
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username:process.env.DB_USER,
        password:process.env.DB_PASSWORD,  
    }

)