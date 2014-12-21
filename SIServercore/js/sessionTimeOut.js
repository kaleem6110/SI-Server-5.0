/*
 * Session TIme Out Javascript
 */
//----------
var timer = 0;
var sessionAlertTime = 0;
var isTimerON = true;
function newXMLHttpRequest() {
	var xmlreq = false;
    if (window.XMLHttpRequest) {
    	xmlreq = new XMLHttpRequest(); 
    } 
    else if (window.ActiveXObject) {
    	try {
           xmlreq = new ActiveXObject("Msxml2.XMLHTTP"); 
        }
    	catch (e1){
        	try {
        		xmlreq = new ActiveXObject("Microsoft.XMLHTTP"); 
            }
        	catch (e2) {
            	xmlreq = false; 
            } 
        } 
    } 
    return xmlreq;
} 

function getReadyStateHandler(req,reponseXmlHandler) {
    return function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				reponseXmlHandler(req.responseXML);
			}
			else {
				alert("HTTP error "+req.status+": "+req.statusText);
			}
		}
    }
}

window.onload=function(){
    validateAndExtendSession();
} 

window.onunload=function(){
}

function validateAndExtendSession(){ 
	var req = newXMLHttpRequest();  
    req.onreadystatechange = getReadyStateHandler(req,updateSessionInfo); 
    req.open("GET","EcoWebAjaxAction.do?operation=getSessionDtls&num="+new Date().getTime(), true); 
    req.send(""); //use POST when queryparameters are used 
} 
var IsSSOUser = "";
function updateSessionInfo(sessionXML){ 
    var session = sessionXML.getElementsByTagName("sessionDtls")[0];  
    if (session == null){
        parent.invalidateSession();
         alert(parent.SESSION_EXPIRE_ALERT);
    }
	else{
	// Getting the value of IsSSOUser for validating user
		IsSSOUser = session.getElementsByTagName("SSOUser")[0].firstChild.data;
		 
		var sessionAlert = session.getElementsByTagName("sessionAlert")[0].firstChild.data;
    	sessionAlertTime = session.getElementsByTagName("sessionAlertTime")[0].firstChild.data;
    	var currentUser = session.getElementsByTagName("currentUser")[0].firstChild.data;
    	var sessionMaxInterval = session.getElementsByTagName("sessionMaxInterval")[0].firstChild.data;
    	var sessionMaxDiff = sessionMaxInterval - sessionAlertTime ;
		  if(IsSSOUser == "true"){
		         clearTimeout(timer);
				 timer = 0 ;
				 timer = setTimeout('validateAndExtendSession()',sessionMaxInterval*1000-sessionAlertTime*1000);
		  }else{
			  if(sessionAlert == 'true'){
				setSessionTimeout(sessionMaxDiff);
			}else{
				if(isTimerON)
				{
					clearTimeout(timer);
					timer = 0 ;
					timer =  setTimeout('sessionExpire()',sessionMaxInterval*1000);
				}
        }
	  }
		
    	
    }
}

function sessionExpire(){
	  alert(parent.SESSION_EXPIRE_ALERT);
      parent.invalidateSession();				
}

function sessionTimeOut(){
	validateAndExtendSession();
}

function promptUser(){ 
	var minutes = parseInt( sessionAlertTime / 60 ) % 60;
	var seconds = sessionAlertTime % 60;
	if(seconds<10){
		seconds = '0'+seconds;
	}
	var message = confirm('Your login session will expire in ' +minutes+':'+seconds+ '(min:sec). Would you like to extend your session?');
    if (message){
    	validateAndExtendSession();
    }
	else{
		timer =  setTimeout('sessionExpire()',sessionAlertTime*1000);
    	//parent.invalidateSession();
    }
}

function setSessionTimeout(sessionMaxDiff){ 
	setTimeout('promptUser()',sessionMaxDiff*1000);
}

function sessionDetails(){
	validateAndExtendSession();
}
function setSessionTimer(flag)
{
	isTimerON = flag;
}

//default call to the timer function