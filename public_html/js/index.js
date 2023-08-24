/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL ='/api/irl';
var jpdbIML ='/api/iml';
var DBName ='COLLEGE-DB';
var RelationName ='PROJECT-TABLE';
var connToken ='90931289|-31949327943897364|90961126';
$("#projId").focus();

function saveRecNo2LS(jsonObj) {
    var tvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', tvData.rec_no);
    
}

function getprojIdAsJsonObj() {
    var projId = $('#projId').val();
    var jsonStr = {
        id: projId
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#projname").val(record.name);
    $("#assignto").val(record.assignto); 
    $("#date").val(record.date);
    $("#dead").val(record.dead);
}

function resetForm() {
    $("#emoid").val("");
    $("#projname").val("");
    $("#assignto").val("");
    $("#date").val("");
    $("#dead").val("");
    $("#projId").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#projId").focus();
}

function validateData() {
    var projId, projname, assignto, date, dead;
    projId = $("#projId").val();
    projname = $("#projname").valueOf();
    assignto = $("#assignto").val();
    date = $("#date").val();
    dead = $("#dead").val();
   
    if (projId === '') {
        alert('project missing');
        $("#projId").focus();
        return "";
    }
    if (projname === '') {
        alert('project Name missing');
        $("#projname").focus();
        return "";
    }
    if (assignto === '') {
        alert(' assignto missing');
        $("#assignto").focus();
        return "";
    }
    if (date === '') {
        alert('date missing');
        $("#date").focus();
        return "";
    }
    if (dead === '') {
        alert('Deadline missing');
        $("#dead").focus();
        return "";
    }
   
    var jsonStrObj = {
        id: projId,
        name: projname,
        assignto: assignto,
        date: date,
        dead: dead,
    };
    return JSON.stringify(jsonStrObj);
}



function getProj() {
    var projIdJsonObj = getprojIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken,DBName,RelationName,projIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#projname").focus();
    } else if (resJsonObj.status === 200) {
        $("#projId").prop("disabled", true);
        fillData(resJsonObj);
        
        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#projname").focus();
    }
}


function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === '') {
        return "";
    }
    var putRequest = createPUTRequest(connToken,jsonStrObj,DBName,RelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#projId").focus();
}

function changeData() {
    $("#change").prop("disabled", true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken,jsonChg,DBName,RelationName,localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#projId").focus();
}








