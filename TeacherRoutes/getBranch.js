const userRoutes = require('express').Router();
const body_parser = require('body-parser');


// Import Branch Model File 
const BranchModel = require('../TeacherModels/BranchModel');

// Adding Body Parser For JSON
userRoutes.use(body_parser.json());
userRoutes.get(body_parser.urlencoded());

// Get Branch Route
// Uses Type Get Request
userRoutes.get("/getBranch", async (req,res)=>{

    console.log("Getting Branches");

    Branches = [];
   // Using Branch Model To Get Data
    await BranchModel.findAll({
        where:{
            bitIsActive: 1,
            Category_Id: 13
        },
        attributes: ["BR_Branch_Id","BR_Branch_Name"]
    }).then(data=>{
    data.forEach(d => {
        Branches.push(d.dataValues);
    });
    });
    res.send(Branches);
});


module.exports = userRoutes;