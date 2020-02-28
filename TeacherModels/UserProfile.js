const Sequelize = require('sequelize');

// Import Premade Connector 
const sequelize = require('./DBConfigs');


async function getUserProfile(userId){
   
    let Quer = "SELECT [UserId], [Role], [Name], [Password], [Active] FROM [UserProfile] WHERE [UserId]=";
    // Execute getFlag Stored Procedure in data base
    let Data;
    await sequelize.query(Quer+"'"+userId+"';").then((data)=>{
        Data = data[0][0];
    }).catch(e=>{
        console.log(e);
    });
    return Data;
}


// rollNumbers = ["0206CS171014","0206CS171012","0206CS171022","0206CS171029","0206CS171059","1983"];
// rollNumbers.forEach(async (rollNumber)=>{
//    console.log(await getStudentDetails(rollNumber)); 
// });

module.exports = getUserProfile;