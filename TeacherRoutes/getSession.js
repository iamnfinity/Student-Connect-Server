const userRoutes = require('express').Router();
const body_parser = require('body-parser');


// Import Branch Model File 
const SessionModel = require('../TeacherModels/getSession');

// Adding Body Parser For JSON
userRoutes.use(body_parser.json());

// Get Branch Route
// Uses Type Get Request
userRoutes.get("/getSession", async (req,res)=>{

    console.log("Getting Session");

    const Data = await SessionModel();
    res.send(Data);
});


module.exports = userRoutes;