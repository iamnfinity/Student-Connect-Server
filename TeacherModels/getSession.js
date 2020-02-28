const Sequelize = require('sequelize');

// Import Premade Connector 
const sequelize = require('./DBConfigs');

async function getSesion(){
   
    let Quer = "SELECT [Session_Name], [Session_ID] FROM [Session_Master];";
    // Execute getFlag Stored Procedure in data base
    let Data;
    await sequelize.query(Quer).then((data)=>{
        Data = data[0];
    }).catch(e=>{
        console.log(e);
    });
    return Data.slice((Data.length)-4,Data.length);
}


module.exports = getSesion;
