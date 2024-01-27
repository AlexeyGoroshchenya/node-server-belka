const {Sequelize} = require('sequelize')


console.log(process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_HOST, process.env.DB_NAME);

module.exports = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@127.0.0.1/${process.env.DB_NAME}`,
    // `${process.env.DB_NAME}`,
    // `${process.env.DB_USER}`,
    // `${process.env.DB_PASSWORD}`,
    // {
    //     dialect: 'postgres',
    //     host: process.env.DB_HOST,
    //     port: process.env.DB_PORT,
    // }

)