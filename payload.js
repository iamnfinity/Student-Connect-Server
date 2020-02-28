// Getting Sored Procedures
const getAttendanceId = require('./Stored_Procedures/getAttendenceId');
let attendanceId = 0;

import moment = require('moment-timezone');

async function setAttendancIdAndFlag() {
    attendanceId = await getAttendanceId();
    console.log("Done Setting Up!");
}

// Call the above async function
setAttendancIdAndFlag();



async function addValues(subjectId,Lid,periodNo,aflag){    
    markAttendanceModel.create({
        Attendence_Id: attendanceId,
        CL_Col_Id: 3,
        BR_Branch_Id: '20',
        SM_Sem_Id: '53',
        SY_Syllabus_Id: subjectId,
        Lecturer_id: Lid,
        Attendence_Status: "P",
        Period_no: periodNo,
        Period_start_Time: attendanceData.periodStart,
        Period_End_Time: attendanceData.periodEnd,
        Attendence_Date: attendanceData.attendanceDate,
        Approved_Status: "P",
        Class_type: "1",
        Makercode: Lid,
        UpdateDateTime: moment().tz("Asia/Kolkata").format('YYYY-MM-DD hh:mm:ss.SSS'),
        Roll_No: userId,
        Lab_groups: 'A',
        Session_ID: '15',
        Attendance_Flag: aflag 
    }).then(() => {
        console.log("Entered Manually");
    }).catch(e => {
        console.log(e);
    });
    // Mark Attendance using secondry thread [START]
}

async function Driver(){

}


