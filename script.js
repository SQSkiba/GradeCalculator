var rowCount = 0;
function setUpPage() {
    document.getElementById("container").style.backgroundColor = "pink";
}
function createTable(){
    var div = document.getElementById("container");
    var table = document.createElement("table");
    table.setAttribute("id","mainTable");
    div.appendChild(table);

    addRow();
}

function addRow(){
    var table = document.getElementById("mainTable");
    var labelRow = document.createElement("tr");
    var inputRow = document.createElement("tr");

    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var input1 = document.createElement("input");
    var input2 = document.createElement("input");

    table.append(labelRow);
    table.append(inputRow);
    labelRow.append(td1);
    labelRow.append(td2);
    inputRow.append(td3);
    inputRow.append(td4);
    td3.append(input1);
    td4.append(input2);

    var label = document.getElementById("type").value;
    td1.innerHTML = label + " Points";
    td2.innerHTML = label + " Weight";
    if( label == "") {
        td1.innerHTML = "Homework Points";
        td2.innerHTML = "Homework Weight";
    }

    input1.setAttribute("id", "input1" + rowCount);
    input2.setAttribute("id", "input2" + rowCount);
    input1.setAttribute("placeholder", "ex: 70,80,90");
    input2.setAttribute("placeholder", "ex: 50");
    rowCount = rowCount + 1;

    if((rowCount)%3 == 1) {
        labelRow.setAttribute('class','blue1');
        inputRow.setAttribute('class','blue1');
    }
    if(rowCount%3 ==2){
        labelRow.setAttribute('class','blue2');
        inputRow.setAttribute('class','blue2');
    }
    if(rowCount%3 ==0){
        labelRow.setAttribute('class','blue3');
        inputRow.setAttribute('class','blue3');
    }
    if(rowCount>5) {
        return document.getElementById("rowButton").disabled = true
    }
}

function calculateGrade() {
    var totalWeight = 0;
    var grade = [];
    var weight = [];
    finalGrade = 0;
    for (var i=0; i<rowCount; i++) {
        grade.push(document.getElementById("input1" + i).value);
        grade[i] = convertStringToArray(grade[i]);
        grade[i] = average(grade[i]);

        weight.push(document.getElementById("input2" + i).value);
        totalWeight = totalWeight + parseInt(weight[i]);
        console.log(weight[i]);

        var finalGrade = finalGrade + (grade[i]*(weight[i]/100));
        console.log(finalGrade);
    }

    if(finalGrade>80) {
        document.getElementById("totalGrade").innerHTML = "Your current grade is " + finalGrade + "%. Nice!";
    }else {
        document.getElementById("totalGrade").innerHTML = "Your current grade is " + finalGrade + "%";
    }
    if(totalWeight!==100) {
        document.getElementById("totalGrade").innerHTML = "Error. Invalid weights."
    }
    if(isNaN(finalGrade)) {
        document.getElementById("totalGrade").innerHTML = "Error. Bad data."
    }
    if(finalGrade<0||totalWeight<=0) {
        document.getElementById("totalGrade").innerHTML = "Error. Bad data. Please enter positive data."
    }
    return finalGrade;
}

function convertStringToArray(grade) {
    var arr = grade.split(",");
    for (var i=0; i<arr.length; i++){
        arr[i] = parseInt(arr[i]);
    }
    console.log (arr);
    return arr;
}

function average (grade) {
    var sum = 0;
    for(var i=0; i<grade.length; i++) {
        sum = sum + grade[i];
    }
    var average = sum/grade.length;
    console.log(average);
    return average;
}

function determineNeededGrade(){
    var currentGrade = calculateGrade();
    var finalWeight = document.getElementById("finalWeight").value;
    var desiredGrade = document.getElementById("gradeDesired").value;
    var a = currentGrade*(1-finalWeight/100);
    var b = desiredGrade-a;
    var gradeNeeded = 100 * b/finalWeight;
    if(finalWeight>100||finalWeight<0) {
        return document.getElementById("neededGrade").innerHTML = "Error. Invalid weights."
    }
    if(isNaN(desiredGrade)) {
        return document.getElementById("neededGrade").innerHTML = "Error. Bad data."
    }
    if(gradeNeeded <=0) {
        return document.getElementById("neededGrade").innerHTML = " You need a " + gradeNeeded + "%. You don’t even need to bother studying.";
    }
    if(gradeNeeded>0 && gradeNeeded<100){
        return document.getElementById("neededGrade").innerHTML = " You need a " + gradeNeeded + "%. Good luck!";
    }
    if(gradeNeeded>=100){
        return document.getElementById("neededGrade").innerHTML = " You need a " + gradeNeeded + "%. Better luck next time!"
    }

}