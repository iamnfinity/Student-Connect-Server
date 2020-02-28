const app = require('express')();
const body_parser = require('body-parser');
const moment = require('moment-timezone');

// Getting Sored Procedures
const getAttendanceId = require('./Stored_Procedures/getAttendenceId');
const getFlag = require('./Stored_Procedures/getFlag');

// DB File to get Stundent Profile
const getStudentProfile = require('./TeacherModels/getStudentDetails');

// Import Attendance Database Model Main
const markAttendanceModel = require('./TeacherModels/MarkAttendance');

// Datavbase Flag Value
app.locals.flag = 0;
// Database Attendance Value
app.locals.attendanceId = 0;

// Init Unique IDs
app.locals.uniqueId = 1;

// App Local Variable For Attendance Value Holder
app.locals.attendanceData = {};

// Live head count variable
app.locals.headCount = {};

// Init Student Names Container
app.locals.markedStudentDataClass = {};

// Student Roll Number Attendance Info
app.locals.markedStudentRollNumberClass = {};

async function setAttendancIdAndFlag() {
    app.locals.attendanceId = await getAttendanceId();
    app.locals.flag = await getFlag();
    console.log("Done Setting Up!");
}

// Call the above async function
setAttendancIdAndFlag();

// Get Flag For Attendance
function getFlagNow() {
    app.locals.flag = app.locals.flag + 1;
    return app.locals.flag - 1;
}

// Get Attendance Id Now
function getAttendanceIdNow() {
    app.locals.attendanceId = app.locals.attendanceId + 1;
    return app.locals.attendanceId;
}

// Get Unique Id
function getUniqueId() {
    app.locals.uniqueId = app.locals.uniqueId + 1;
    return app.locals.uniqueId - 1;
}


// Check is attendance is already marked
function checkIfMarked(rollNumber, uniqueId) {
    if (app.locals.markedStudentRollNumberClass[uniqueId].includes(rollNumber)) {
        return true;
    } else {
        return false;
    }
    return false;
}

// Function to only generate first name
function getFirstName(name){
    return name.split(' ').slice(0, -1).join(' ');
}

// System Variables
const PORT = process.env.PORT || 5000;


// Using body Parser
app.use(body_parser.json());


// // Setting User Routes
// app.use("/v1",require('./Routes/StudentSignup'));
// app.use('/v1',require('./Routes/StudentLogin'));
// app.use('/v1',require('./Routes/CheckStudentToken'));
// app.use('/v1',require('./Routes/MarkAttendance'));
// //app.use('/v1',require('./Routes/showAttendance'));

// App Update Check Route 
app.use("/v1",require('./config/appUpdate'));


// Setting Teachers Routes
app.use('/v1', require("./TeacherRoutes/getBranch"));
app.use('/v1', require('./TeacherRoutes/getSemister'));
app.use('/v1', require('./TeacherRoutes/getSyllabus'));
app.use("/v1", require('./TeacherRoutes/getSession'));


// Common Routes For Student And Teacher
app.use("/v1", require("./TeacherRoutes/doLogin"));
app.use('/v1', require('./TeacherRoutes/checkSession'));

// Home Page
app.get("/", (req, res) => {
    res.send("<h1>You Found Us! ;_;</h1>");
});

// Attendance Mark Student Route Start
app.post("/v1/markAttendanceStudent", async (req, res) => {

    // Base Response
    let response = {
        "status": "failed",
        "message": "Some Server Error",
        "subject": "",
        "branch": "",
        "semester": "",
        "period": ""
    };

    // Print Data
    //console.log(req.body);

    // Get Post Details UserId Token And Code
    const userId = req.body.userId;
    const authToken = req.body.auth_token;
    // Code : Contains attendance code
    const code = req.body.code;

    // Start attendance procedure

    // Get data from attendance code
    const attendanceData = app.locals.attendanceData[code];

    // Get Student Profile from Roll Number
    const studentProfileData = await getStudentProfile(userId);

    console.log(attendanceData);
    console.log(studentProfileData);


    // Check if attendance is already marked
    // UserId : Student Roll Number
    // Code : Attendance Code
    if (checkIfMarked(userId, code)) {
        response.message = "Looks like your attendance is already marked.";
        res.send(response);
        res.end();
    } else {

        // Compare Data To Mark Attendance
        if ((studentProfileData.BR_Branch_Id == attendanceData.branchId) && (studentProfileData.Current_semester == attendanceData.semesterId)) {

            // Get Attendance Id to mark
            const attendanceId = getAttendanceIdNow();

            console.log("Data Flag : " + (attendanceData.flag).toString());
            console.log("Data Syllabus : " + attendanceData.subjectId);
            // Mark Attendance using secondry thread [START]
            markAttendanceModel.create({
                Attendence_Id: attendanceId,
                CL_Col_Id: 3,
                BR_Branch_Id: attendanceData.branchId,
                SM_Sem_Id: attendanceData.semesterId,
                SY_Syllabus_Id: attendanceData.subjectId,
                Lecturer_id: attendanceData.userId,
                Attendence_Status: "P",
                Period_no: attendanceData.periodId,
                Period_start_Time: attendanceData.periodStart,
                Period_End_Time: attendanceData.periodEnd,
                Attendence_Date: attendanceData.attendanceDate,
                Approved_Status: "P",
                Class_type: "1",
                Makercode: attendanceData.userId,
                UpdateDateTime: moment().tz("Asia/Kolkata").format('YYYY-MM-DD hh:mm:ss.SSS'),
                Roll_No: userId,
                Lab_groups: studentProfileData.Lab_groups,
                Session_ID: attendanceData.sessionId,
                Attendance_Flag: (attendanceData.flag).toString()
            }).then(() => {
                console.log("Entered");
            }).catch(e => {
                console.log(e);
            });
            // Mark Attendance using secondry thread [START]


            // Increment Head Count For ID
            const headCount = app.locals.headCount[attendanceData.uniqueId];
            app.locals.headCount[attendanceData.uniqueId] = headCount + 1;

            // Store is Student Data Class 
            app.locals.markedStudentDataClass[code].push({
                "studentName": getFirstName(studentProfileData.Full_Name),
                "rollNumber": studentProfileData.Roll_No
            });

            // Store Marked Roll Numbers
            app.locals.markedStudentRollNumberClass[code].push(studentProfileData.Roll_No);

            console.log(app.locals.markedStudentDataClass);
            console.log(app.locals.markedStudentRollNumberClass);

            // Send Response To Student
            response.status = "success";
            response.message = "Attendance Marked Successfully";
            response.branch = attendanceData.branchName;
            response.subject = attendanceData.subjectName;
            response.semester = attendanceData.semesterName;
            response.period = attendanceData.periodId;

            // Send Response
            res.send(response);

        } else {
            response.message = "Looks like you are trying to mark attendance for different branch or semester.";
            res.send(response);
        }
    }

});
// Attendance Mark Student Route End


// Get Head Count For ID Route
app.get("/v1/getHeadCount/:uid", (req, res) => {
    res.send({
        "count": app.locals.headCount[req.params.uid]
    });
});

// Make Attendance Data To Add In Mark Attendance Database Start
app.post("/v1/doMakeCodeForAttendance", async (req, res) => {

    let response = {
        "error": true,
        "message": "Error Occured",
        "uniqueId": "", // Will help in sound
        "flag": "",
        "userId": "",
        "sessionId": "",
        "branchId": "",
        "branchName": "",
        "semesterId": "",
        "semesterName": "",
        "subjectId": "",
        "subjectName": "",
        "periodId": "",
        "periodStart": "",
        "periodEnd": "",
        "attendanceDate": "",
    };

    // Store POST body in variable
    const reqBody = req.body;

    // Start Making Response Text
    response.error = false;
    response.message = "Attendance Started On Server";
    response.userId = reqBody.userId;
    response.uniqueId = getUniqueId();
    response.flag = getFlagNow();
    response.sessionId = reqBody.sessionId;
    response.branchId = reqBody.branchId;
    response.branchName = reqBody.branchName;
    response.semesterId = reqBody.semesterId;
    response.semesterName = reqBody.semesterName;
    response.subjectId = reqBody.subjectId;
    response.subjectName = reqBody.subjectName;
    response.periodId = reqBody.periodId;
    response.periodStart = reqBody.periodStart;
    response.periodEnd = reqBody.periodEnd;
    response.attendanceDate = moment().tz("Asia/Kolkata").format('YYYY-MM-DD') + " 00:00:00.000";

    // Init Head Count Array For Id 
    app.locals.headCount[response.uniqueId] = 0;

    // Init RollNumbers Class
    app.locals.markedStudentRollNumberClass[response.uniqueId] = [];

    // Init Marked Student Roll Number and Name
    app.locals.markedStudentDataClass[response.uniqueId] = [];

    // console.log(response);
    // Store In Local Session
    app.locals.attendanceData[response.uniqueId] = response;

    res.send(response);

});
// Make Attendance Data To Add In Mark Attendance Database End

// Manual Attendance Marking [start]
app.post("/v1/markManualAttendance", async (req, res) => {
    console.log("Manually marking attendance!");
    // Base Response
    let response = {
        "status": "failed",
        "message": "Some Server Error",
        "studentName": "",
        "subject": "",
        "branch": "",
        "semester": "",
        "period": ""
    };

    // Print Data
    //console.log(req.body);

    // Get Post Details UserId Token And Code
    const userId = req.body.rollNumber;
    // Code : Contains attendance code
    const code = req.body.code;

    // Start attendance procedure

    // Get data from attendance code
    const attendanceData = app.locals.attendanceData[code];

    // Get Student Profile from Roll Number
    const studentProfileData = await getStudentProfile(userId);

    console.log(attendanceData);
    console.log(studentProfileData);

    // Check if attendance is already marked
    // UserId : Student Roll Number
    // Code : Attendance Code
    if (checkIfMarked(userId, code)) {
        response.message = "Looks like attendance for " + studentProfileData.Full_Name + " is already marked.";
        res.send(response);
        res.end();
    } else {
        // Compare Data To Mark Attendance
        if ((studentProfileData.BR_Branch_Id == attendanceData.branchId) && (studentProfileData.Current_semester == attendanceData.semesterId)) {

            // Get Attendance Id to mark
            const attendanceId = getAttendanceIdNow();

            console.log("Data Flag : " + (attendanceData.flag).toString());
            console.log("Data Syllabus : " + attendanceData.subjectId)
            // Mark Attendance using secondry thread [START]
            markAttendanceModel.create({
                Attendence_Id: attendanceId,
                CL_Col_Id: 3,
                BR_Branch_Id: attendanceData.branchId,
                SM_Sem_Id: attendanceData.semesterId,
                SY_Syllabus_Id: attendanceData.subjectId,
                Lecturer_id: attendanceData.userId,
                Attendence_Status: "P",
                Period_no: attendanceData.periodId,
                Period_start_Time: attendanceData.periodStart,
                Period_End_Time: attendanceData.periodEnd,
                Attendence_Date: attendanceData.attendanceDate,
                Approved_Status: "P",
                Class_type: "1",
                Makercode: attendanceData.userId,
                UpdateDateTime: moment().tz("Asia/Kolkata").format('YYYY-MM-DD hh:mm:ss.SSS'),
                Roll_No: userId,
                Lab_groups: studentProfileData.Lab_groups,
                Session_ID: attendanceData.sessionId,
                Attendance_Flag: (attendanceData.flag).toString()
            }).then(() => {
                console.log("Entered Manually");
            }).catch(e => {
                console.log(e);
            });
            // Mark Attendance using secondry thread [START]


            // Increment Head Count For ID
            const headCount = app.locals.headCount[attendanceData.uniqueId];
            app.locals.headCount[attendanceData.uniqueId] = headCount + 1;

            // Store is Student Data Class 
            app.locals.markedStudentDataClass[code].push({
                "studentName": getFirstName(studentProfileData.Full_Name),
                "rollNumber": studentProfileData.Roll_No
            });

            // Store Marked Roll Numbers
            app.locals.markedStudentRollNumberClass[code].push(studentProfileData.Roll_No);

            // Send Response To Student
            response.status = "success";
            response.message = "Attendance Marked Successfully";
            response.branch = attendanceData.branchName;
            response.studentName = studentProfileData.Full_Name;
            response.subject = attendanceData.subjectName;
            response.semester = attendanceData.semesterName;
            response.period = attendanceData.periodId;

            // Send Response
            res.send(response);

        } else {
            response.message = "Looks like you are trying to mark attendance for different branch or semester.";
            res.send(response);
        }
    }
});
// Manual Attendance Marking [end]


// Get Marked Attendance Student List [Start]
app.get("/v1/getMarkedAttendanceList/:uid",(req,res)=>{

    const uniqueId = req.params.uid;
    //console.log(uniqueId);

    res.send(app.locals.markedStudentDataClass[uniqueId]);

});
// Get Marked Attendance Student List [Start]

// Delete marking attendance when stop attendance is clicked [Start]
app.get("/v1/stopTakingAttendance/:uid",(req,res)=>{

    // Get Unique ID From the server
    const uniqueId = req.params.uid;

    // Start Deleting values

    // Delete attendance data
    delete app.locals.attendanceData[uniqueId];

    // Delete head count
    delete app.locals.headCount[uniqueId];

    // Delete Student Data Class
    delete app.locals.markedStudentDataClass[uniqueId];

    // Delete Student Roll Number Class
    delete app.locals.markedStudentRollNumberClass[uniqueId];

    res.send({
        "status" : "success"
    });

});
// Delete marking attendance when stop attendance is clicked [Start]
// Starting Server
app.listen(PORT, "0.0.0.0", () => {
    console.log("Server Working on : " + PORT);
});