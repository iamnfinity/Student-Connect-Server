const Sequelize = require('sequelize');

// Import Premade Connector 
const sequelize = require('./DBConfigs');


async function getAttendanceId(){
 let Data
await sequelize.query("SELECT TOP 1 Attendence_Id as flag FROM Attendence_MasterForTheory ORDER BY Attendence_Id DESC").then(data=>{
   Data =  data[0][0].flag;
 }).catch(e=>{
    
 });
 return Data;
}

module.exports = getAttendanceId;