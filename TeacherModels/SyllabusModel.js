const Sequelize = require('sequelize');

// Import Premade Connector 
const sequelize = require('./DBConfigs');

// Import Sequelize Model Class To Extend It
const Model = Sequelize.Model;

class SyllabusModel extends Model{}

// Defining Model
SyllabusModel.init({
    SY_Syllabus_Code:{
        type: Sequelize.STRING(50),
        allowNull: true
    },
    ST_Stllabus_Id:{
        type: Sequelize.DECIMAL(18),
        allowNull: false,
        primaryKey: true
    },
    SY_Syllabus_Name:{
        type: Sequelize.STRING(100),
        allowNull: true
    },
    MakerCode:{
        type: Sequelize.STRING(100),
        allowNull: true
    },
    UpdateDateTime:{
        type: Sequelize.DATE,
        allowNull: true
    },
    bitIsActive:{
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    Lab_required:{
        type: Sequelize.CHAR(10),
        allowNull: true
    },
    Sessional_required:{
        type: Sequelize.CHAR(10),
        allowNull: true
    },
    Practional_Required:{
        type: Sequelize.CHAR(10),
        allowNull: true
    },
    Elective_Sub_required:{
        type: Sequelize.CHAR(10),
        allowNull: true
    },
    Th_Max_Marks:{
        type: Sequelize.DECIMAL(18),
        allowNull: true
    },
    Th_Min_Marks:{
        type: Sequelize.DECIMAL(18),
        allowNull: true
    },
    Pr_Max_Marks:{
        type: Sequelize.DECIMAL(18),
        allowNull: true
    },
    Pr_Min_Marks:{
        type: Sequelize.DECIMAL(18),
        allowNull: true
    },
    Ses_Max_Marks:{
        type: Sequelize.DECIMAL(18),
        allowNull: true
    },
    Ses_Min_Marks:{
        type: Sequelize.DECIMAL(18),
        allowNull: true
    },
    Mt_Max_Marks:{
        type: Sequelize.DECIMAL(18),
        allowNull: true
    },
    Mt_Min_Marks:{
        type: Sequelize.DECIMAL(18),
        allowNull: true
    },
    Sub_shortcut:{
        type: Sequelize.STRING(100),
        allowNull: true
    },
    MRSheetSubject:{
        type: Sequelize.CHAR(10),
        allowNull: true
    },
    CL_Col_Id:{
        type: Sequelize.DECIMAL(18),
        allowNull: true
    },
    SubjectType:{
        type: Sequelize.STRING(100),
        allowNull: true
    },
    CreditSubjectWise:{
        type: Sequelize.STRING(100),
        allowNull: true
    },
    Suborderno:{
        type: Sequelize.CHAR(10),
        allowNull: true
    },
    CreditPoints:{
        type: Sequelize.DECIMAL(18),
        allowNull: true
    },
    Th_max_Grace_Marks:{
        type: Sequelize.DECIMAL(18),
        allowNull: true
    },
    PR_max_Grace_Marks:{
        type: Sequelize.DECIMAL(18),
        allowNull: true
    },
    Ses_max_Grace_Marks:{
        type: Sequelize.DECIMAL(18),
        allowNull: true
    },
    SY_Syllabus_PR_Code:{
        type: Sequelize.STRING(50),
        allowNull: true
    },
    MidTermMaxGrace:{
        type: Sequelize.STRING(200),
        allowNull: true
    },
    TheoryRequired:{
        type: Sequelize.CHAR(10),
        allowNull: true
    },
    PraticalSubjectName:{
        type: Sequelize.STRING(500)
    },
    CombinedGrading:{
        type: Sequelize.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'tbl_mst_Syllabus_Details',
    freezeTableName: true,
    timestamps: false
});


module.exports = SyllabusModel;


// Querry To Get Semester

// SyllabusModel.findAll({
//     where:{
//         SM_Sem_Id: {ID}
//     },
//     attributes: ["SY_Syllabus_Id","SY_Syllabus_Name","SY_Syllabus_Code"]
// }).then(data=>{
//  data.forEach(d => {
//      console.log(d.dataValues);
//  });
// });