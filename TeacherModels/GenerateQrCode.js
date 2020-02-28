const Sequelize = require('sequelize');

// Import Premade Connector 
const sequelize = require('./DBConfigs');

// Import Sequelize Model Class To Extend It
const Model = Sequelize.Model;

class QRCodeModel extends Model{}

// Defining Model
QRCodeModel.init({
    ID:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true,
        allowNull: false
    },
    CollegeId:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    BranchId:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    SemisterId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }        
  }, {
    sequelize,
    modelName: 'QRCodeTable',
    freezeTableName: true,
    timestamps: false
    // options
  });

// Use to sync table


// AttendanceProfile.sync({
//   force:true
// });

module.exports = BranchModel;
