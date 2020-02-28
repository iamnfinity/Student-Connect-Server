const Sequelize = require('sequelize');

const sequelize = new Sequelize('CMSGGITSLIVE', 'sa', 'root', {
    host: 'localhost',
    port: 1433,
    dialect: 'mssql'
});

module.exports = sequelize;