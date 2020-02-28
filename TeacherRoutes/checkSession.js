// Route To Check Validity Of A Session

const userRoutes = require('express').Router();
const body_parser = require('body-parser');


// Import Branch Model File 
const SessionManager = require('../TeacherModels/SessionManager');

// Adding Body Parser For JSON
userRoutes.use(body_parser.json());
userRoutes.get(body_parser.urlencoded());

// Get Branch Route
// Uses Type Get Request
userRoutes.post("/checkTokenStatus", async (req, res) => {
    let response = {
        "valid": false
    };

    console.log(req.body);
    const userId = req.body.userId;
    const auth_token = req.body.auth_token;

    if (userId == null || userId == "NULL" || userId == "") {
        res.send(response);
    } else {
        await SessionManager.findAll({
            where: {
                userId: userId,
                authToken: auth_token
            }
        }).then((data) => {
            console.log(data[0].dataValues.UserId == undefined);
            if(data[0].dataValues.UserId == undefined){
                response.valid = false;
            }
            else{
                response.valid = true;
            }
            console.log(response.valid);
            res.send(response);
        }).catch(e => {
            console.log("error");
            console.log(e);
            res.send(response);
        });

    }

});


module.exports = userRoutes;