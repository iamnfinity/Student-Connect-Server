const Sequelize = require('sequelize');

// Import Premade Connector 
const sequelize = require('./DBConfigs');

async function getStudentDetails(rollNumber){
   
    let Quer = "SELECT [Roll_No], [BR_Branch_Id], [Full_Name], [Current_semester], [Lab_groups], [Session_ID] FROM [Student_Details] WHERE [Roll_No]=";
    // Execute getFlag Stored Procedure in data base
    let Data;
    await sequelize.query(Quer+"'"+rollNumber+"';").then((data)=>{
        Data = data[0][0];
    }).catch(e=>{
        console.log(e);
    });
    return Data;
}


// rollNumbers = ["0206CS171014","0206CS171012","0206CS171022","0206CS171029","0206CS171059"];
// rollNumbers.forEach(async (rollNumber)=>{
//    console.log(await getStudentDetails(rollNumber)); 
// });

module.exports = getStudentDetails;
