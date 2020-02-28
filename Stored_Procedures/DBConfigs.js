const Sequelize = require('sequelize');

const sequelize = new Sequelize('CMSGGITSLIVE', 'sa', 'root', {
    host: 'localhost',
    port: 1433,
    dialect: 'mssql',
    dialectOptions: {
        options: { "requestTimeout": 300000 }
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = sequelize;