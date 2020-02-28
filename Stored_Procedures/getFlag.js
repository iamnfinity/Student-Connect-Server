const Sequelize = require('sequelize');

// Import Premade Connector 
const sequelize = require('./DBConfigs');

async function getFlag(){
    let Data = 0;
await sequelize.query("EXEC get_flag").then(data=>{
    Data = data[0][0].flag;
}).catch(e=>{
    console.log(e);
});
return Data;
}

module.exports = getFlag;