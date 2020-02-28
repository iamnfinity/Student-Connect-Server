/**
 * Login Route For Both Teacher And Student 
 * Route Accept UserId and Password 
 * JSON Format
 */

const userRoutes = require('express').Router();
const body_parser = require('body-parser');

// Import Crypto Js For Token Generation
const crypto = require('crypto');

// Import UserProfilesDB
const userProfile = require('../TeacherModels/UserProfile');

// Import Session Manager Database
const SessionManager = require('../TeacherModels/SessionManager');

// Function To Generate hash
function dohash(data){
    const hash = crypto.createHmac('sha256',data).update('ALAAHCDATFH').digest('hex');
    return hash;
}

// Generate Auth Token For Login
function generateAuthToken(data){
    let dataString = data + Date.now();
    return dohash(dataString);
}

// Store Session Data Function
async function storeSessionInfo(sessionData){
    console.log(sessionData.auth_token);
    SessionManager.upsert({
        UserId: sessionData.userId,
        authToken: sessionData.auth_token
    }).then(()=>{
        console.log("Done");
    }).catch(e=>{
        console.log(e);
    });
}

// Adding Body Parser For JSON
userRoutes.use(body_parser.json());
userRoutes.get(body_parser.urlencoded());

// Login Route
// Uses Type Post Request
userRoutes.post("/doLogin/:type", async (req,res)=>{

    // Define response values
    var response = {
        "status" : "failed",
        "name" : "",
        "userId": "",
        "error" : true,
        "message" : "Incorect UserId or Password",
        "auth_token" : ""
    };

    // Get User Id From Post Route
    const userId = req.body.userId;
    // Get Password Form Post Route
    const password = req.body.password;
    // Get Login Type From URI
    const type = req.params.type;



    // Get Profile Of The Associated ID
    var UserProfile = await userProfile(userId);
    if(UserProfile == undefined){
        res.send(response);
    }
    else{
        switch(type){
            // Case for type stundent
            case "Student":
                if(UserProfile.Role == 2){
                    if(UserProfile.Password == password && UserProfile.Active == 1){
                        response.auth_token = generateAuthToken(UserProfile.UserId);
                        response.error = false;
                        response.name = UserProfile.Name;
                        response.userId = UserProfile.UserId;
                        response.message = "Login Successful";
                        response.status = "success";

                        // Store Informantion In Session Manager
                        storeSessionInfo(response);

                        res.send(response);
                    }
                }
                else{
                    res.send(response);
                }
                break;
    
            // Case for Type Teacher
            case "Teacher":
                    if(UserProfile.Role == 1){
                        if(UserProfile.Password == password && UserProfile.Active == 1){
                            response.auth_token = generateAuthToken(UserProfile.UserId);
                            response.error = false;
                            response.name = UserProfile.Name;
                            response.userId = UserProfile.UserId;
                            response.message = "Login Successful";
                            response.status = "success";

                            // Store Informantion In Session Manager
                            storeSessionInfo(response);

                            res.send(response);
                        }
                    }
                    else{
                        res.send(response);
                    }
                    break;
        }
    }

    res.send(response);
});


module.exports = userRoutes;