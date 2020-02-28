const Sequelize = require('sequelize');

// Import Premade Connector 
const sequelize = require('./DBConfigs');

// Import Sequelize Model Class To Extend It
const Model = Sequelize.Model;

class BranchModel extends Model{}

// Defining Model
BranchModel.init({
    BR_Branch_Id:{
        type: Sequelize.DECIMAL(18),
        primaryKey: true,
        allowNull: false
    },
    BR_Branch_Name:{
        type: Sequelize.STRING(50),
        allowNull: true
    },
    CL_Col_Id:{
        type: Sequelize.STRING(256),
        allowNull: true
    },
    MakerCode:{
        type: Sequelize.STRING(50),
        allowNull: true
    },
    UpdateDateTime:{
        type: Sequelize.DATE,
        allowNull: true
    },
    bitIsActive:{
        type: Sequelize.BOOLEAN,
        allowNull:false
    },
    BR_Branch_No:{
        type: Sequelize.STRING(50),
        allowNull: false
    },
    Course_Type:{
        type: Sequelize.STRING(200)
    },
    Deadline:{
        type: Sequelize.DATE,
        allowNull: true
    },
    Remaining_Seats:{
        type: Sequelize.STRING(50),
        allowNull: true
    },
    Course_FeesINR:{
        type: Sequelize.DECIMAL(18,2),
        allowNull: true
    },
    Prosp_FeeINR:{
        type: Sequelize.STRING(50),
        allowNull: true
    },
    Prosp_FeeUSD:{
        type: Sequelize.STRING(50),
        allowNull: true
    },
    Course_startDate:{
        type: Sequelize.DATE,
        allowNull: true
    },
    Degree_Type:{
        type: Sequelize.STRING(50),
        allowNull: true
    },
    Country:{
        type: Sequelize.STRING(500),
        allowNull: true
    },
    Location:{
        type: Sequelize.STRING(500),
        allowNull: true
    },
    Brochure_Path:{
        type: Sequelize.STRING(500),
        allowNull: true
    },
    FlagDownload:{
        type: Sequelize.CHAR(10),
        allowNull: true
    },
    FlagPayOnline:{
        type: Sequelize.CHAR(10),
        allowNull: true
    },
    FlagApplyOnline:{
        type: Sequelize.CHAR(10),
        allowNull: true
    },
    FlagEnquiry:{
        type: Sequelize.CHAR(10),
        allowNull: true
    },
    Course_EndDate:{
        type: Sequelize.DATE,
        allowNull: true
    },
    Category_Id:{
        type: Sequelize.DOUBLE(18),
        allowNull: true
    },
    BR_Full_Name:{
        type: Sequelize.CHAR(10),
        allowNull: true
    },
    Roll_Code:{
        type: Sequelize.CHAR(10),
        allowNull: true
    },
    Roll_Format:{
        type: Sequelize.CHAR(10),
        allowNull: true
    }
  }, {
    sequelize,
    modelName: 'tbl_mst_Col_Branch',
    freezeTableName: true,
    timestamps: false
    // options
  });

// Use to sync table


// AttendanceProfile.sync({
//   force:true
// });

module.exports = BranchModel;


// Querry To Get Branch

// BranchModel.findAll({
//     where:{
//         bitIsActive: 1
//     },
//     attributes: ["BR_Branch_Id","BR_Branch_Name"]
// }).then(data=>{
//  data.forEach(d => {
//      console.log(d.dataValues);
//  });
// });