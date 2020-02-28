/**
 * Model To Manage Session 
 * For Automated Login 
 * Managed By Auth Token
 */

const Sequelize = require('sequelize');

// Import Premade Connector 
const sequelize = require('./DBConfigs');

// Import Sequelize Model Class To Extend It
const Model = Sequelize.Model;

class SessionManager extends Model{}

// Defining Model
SessionManager.init({
    UserId:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    authToken:{
        type: Sequelize.STRING,
        unique: true
    }
  }, {
    sequelize,
    modelName: 'LoginSessionManagerApp',
    freezeTableName: true,
    // options
  });

// Use to sync table


// SessionManager.sync({
//   force:true
// });

module.exports = SessionManager;
