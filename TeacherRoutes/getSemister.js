const userRoutes = require('express').Router();
const body_parser = require('body-parser');


// Import Branch Model File 
const SemesterModel = require('../TeacherModels/SemesterModel');

// Adding Body Parser For JSON
userRoutes.use(body_parser.json());
userRoutes.get(body_parser.urlencoded());

// Get Branch Route
// Uses Type Get Request
userRoutes.get("/getSemester/:brID", async (req,res)=>{

    console.log("Getting Semsester");

    // Getting Branch ID From URI
    const Branch_Id = req.params.brID;

    Semester = [];
   // Using Branch Model To Get Data
    await SemesterModel.findAll({
        where:{
            BR_Branch_Id: Branch_Id
        },
        attributes: ["SM_Sem_Id","SM_Sem_Name"]
    }).then(data=>{
     data.forEach(d => {
        Semester.push(d.dataValues);
     });
    });
    res.send(Semester);
});


module.exports = userRoutes;