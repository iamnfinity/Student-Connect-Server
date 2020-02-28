const userRoutes = require('express').Router();
const body_parser = require('body-parser');


// Import Branch Model File 
const SyllabusModel = require('../TeacherModels/SyllabusModel');

// Adding Body Parser For JSON
userRoutes.use(body_parser.json());
userRoutes.get(body_parser.urlencoded());

// Get Branch Route
// Uses Type Get Request
userRoutes.get("/getSyllabus/:semID", async (req,res)=>{

    console.log("Getting Syllabus");

    // Getting Branch ID From URI
    const SemID = req.params.semID;

    Syllabus = [];
   // Using Branch Model To Get Data
    await SyllabusModel.findAll({
        where:{
            SM_Sem_Id: SemID,
            bitIsActive: 1,
        },
        attributes: ["SY_Syllabus_Id","SY_Syllabus_Name","SY_Syllabus_Code"]
    }).then(data=>{
     data.forEach(d => {
        Syllabus.push(d.dataValues);
     });
    });
    res.send(Syllabus);
});


module.exports = userRoutes;