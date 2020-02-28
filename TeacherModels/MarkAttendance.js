const Sequelize = require('sequelize');

const sequelize = new Sequelize('CMSGGITSLIVE', 'sa', 'root', {
    host: 'localhost',
    port: 1433,
    dialect: 'mssql'
});

const Model = Sequelize.Model;

class MarkAttendanceModel extends Model{}

MarkAttendanceModel.init({
    Attendence_Id : {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: "1213",
      primaryKey: true,
    },
    CL_Col_Id:{
      type: Sequelize.DECIMAL(18),
      allowNull: true
    },
    BR_Branch_Id:{
      type: Sequelize.DECIMAL(18),
      allowNull: true
    },
    SY_Syllabus_Id:{
      type: Sequelize.STRING,
      allowNull: true
    },
    SM_Sem_Id:{
      type: Sequelize.DECIMAL(18),
      allowNull: true
    },
    Lecturer_id:{
      type: Sequelize.STRING(100),
      allowNull: true
    },
    Attendence_Status:{
      type: Sequelize.STRING(100),
      allowNull: true
    },
    Period_no:{
      type: Sequelize.STRING(100),
      allowNull: true
    },
    Period_start_Time:{
      type: Sequelize.STRING(100),
      allowNull: true
    },
    Period_End_Time:{
      type: Sequelize.STRING(100),
      allowNull: true
    },
    Attendence_Date:{
      type: Sequelize.STRING,
      allowNull: true
    },
    Approved_Date:{
      type: Sequelize.STRING,
      allowNull: true
    },
    Approved_By:{
      type: Sequelize.STRING(100),
      allowNull: true
    },
    Approved_Status:{
      type: Sequelize.STRING(100),
      allowNull: true
    },
    Lab_Room:{
      type: Sequelize.DECIMAL(18),
      allowNull: true
    },
    Class_type:{
      type: Sequelize.STRING(100),
      allowNull: true
    },
    Makercode:{
      type: Sequelize.STRING(100),
      allowNull: true
    },
    UpdateDateTime:{
      type: Sequelize.STRING,
      allowNull: true
    },
    Roll_No:{
      type: Sequelize.STRING(100),
      allowNull: true
    },
    Lab_groups:{
      type: Sequelize.STRING(100),
      allowNull: true
    },
    AD_Holiday:{
      type: Sequelize.STRING(50),
      allowNull: true
    },
    AD_WeeklyOff:{
      type: Sequelize.STRING(50),
      allowNull: true
    },
    BitIsActive:{
      type: Sequelize.STRING(50),
      allowNull: true,
      defaultValue: 1
    },
    Session_ID:{
      type: Sequelize.DECIMAL(18),
      allowNull: true,
    },
    Attendance_Flag:{
      type: Sequelize.STRING(),
      allowNull: true
    },
    Cm_Sem_Id:{
      type: Sequelize.DECIMAL(18),
      allowNull: true
    },
    ComClass:{
      type: Sequelize.CHAR(10),
      allowNull: true
    },
    Supporting_Lecturer:{
      type: Sequelize.STRING(2000),
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Attendence_MasterForTheory',
    freezeTableName: true,
    timestamps: false
    // options
  });

// Use to sync table


// AttendanceProfile.sync({
//   force:true
// });

module.exports = MarkAttendanceModel;

// MarkAttendanceModel.findAll({
//   where:{
//     Roll_No: '0206CS171014',
//     Attendence_Id: 8006435
//   }
// }).then(data=>{
//  console.log(data);
// });

// MarkAttendanceModel.create({
// CL_Col_Id:3,
// BR_Branch_Id:20,
// SM_Sem_Id:49,
// Lecturer_id:"asd",
// Attendence_Status:"P",
// Period_no:"1",
// Period_start_Time:"10:00",
// Period_End_Time:"11:00",
// Roll_No:"0206CS171014",
// Lab_groups:"A",
// Session_ID:13,
// Supporting_Lecturer: "10000"
// }).then(()=>{
//   console.log("Done");
// });