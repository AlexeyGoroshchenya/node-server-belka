const {Sequelize} = require('sequelize')


console.log(process.env.DB_PASSWORD);

module.exports = new Sequelize("postgres://postgres:postgres@localhost/belka",
    // `${process.env.DB_NAME}`,
    // `${process.env.DB_USER}`,
    // `${process.env.DB_PASSWORD}`,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    }

)