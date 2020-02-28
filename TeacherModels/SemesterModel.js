const Sequelize = require('sequelize');

// Import Premade Connector 
const sequelize = require('./DBConfigs');

// Import Sequelize Model Class To Extend It
const Model = Sequelize.Model;

class SemesterModel extends Model{}

// Defining Model
SemesterModel.init({
    SM_Sem_Id:{
        type: Sequelize.DECIMAL(18),
        allowNull:false,
        primaryKey: true
    },
    SM_Sem_Name:{
        type: Sequelize.STRING(50),
        allowNull: false
    },
    BR_Branch_Id:{
        type: Sequelize.STRING(50),
        allowNull: false
    },
    MakerCode:{
        type: Sequelize.STRING(50),
        allowNull: false
    },
    UpdateDateTime:{
        type: Sequelize.DATE,
        allowNull: false
    },
    bitIsActive:{
        type: Sequelize.CHAR(10),
        allowNull: true
    },
    bitEvenOdd:{
        type: Sequelize.CHAR(10),
        allowNull: true
    },
    SM_Sem_No:{
        type: Sequelize.STRING(50),
        allowNull: false
    },
    CL_Col_Id:{
        type: Sequelize.DECIMAL(18),
        allowNull:false,
    }
  }, {
    sequelize,
    modelName: 'tbl_mst_Semister_Details',
    freezeTableName: true,
    timestamps: false
});


module.exports = SemesterModel;


// Querry To Get Semester

// SemesterModel.findAll({
//     where:{
//         BR_Branch_Id: {ID}
//     },
//     attributes: ["SM_Sem_Id","SM_Sem_Name"]
// }).then(data=>{
//  data.forEach(d => {
//      console.log(d.dataValues);
//  });
// });