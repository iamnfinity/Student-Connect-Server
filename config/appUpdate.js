// Current App Version 
const currentAppVerion = "1.0";
// Download Links
const downloadArm = "http://google.com";

const downloadArm64 = "http://facebook.com";


const userRoutes = require('express').Router();
const body_parser = require('body-parser');


console.log("Update Module");
console.log("Version Number : "+currentAppVerion);

// Adding Body Parser For JSON
userRoutes.use(body_parser.json());
userRoutes.get(body_parser.urlencoded());

// Login Route
// Uses Type Post Request
userRoutes.get("/updateCheck/:type", async (req,res)=>{
    let type = req.params.type;
    if(type == "arm"){
        res.send({
            "version": currentAppVerion,
            "downloadUrl": downloadArm
        });
    }
    else{
        res.send({
            "version": currentAppVerion,
            "downloadUrl": downloadArm64
        });
    }
});


module.exports = userRoutes;