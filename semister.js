var roll=parseInt("20"+"18");
var date = new Date();
var month = date.getMonth()+1;
var year = date.getFullYear();

var semister = (year-roll)*2;

if(month > 5 && month << 11){
    semister+=1;
}

console.log(semister)