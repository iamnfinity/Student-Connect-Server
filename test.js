const moment = require('moment-timezone');

console.log(moment().tz("Asia/Kolkata").format('YYYY-MM-DD hh:mm:ss.SSS'));