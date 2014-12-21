function clearTimer() {
    validateAndExtendSession();
	sessionDetails();
}

function startTimer(){
	sessionDetails();
}

/*
 * Session TIme Out Javascript
 */
//----------

 //var sessionAlertTime = 0;
function newXMLHttpRequest() 
{
    var xmlreq = false;     
    if (window.XMLHttpRequest) 
    { 
      xmlreq = new XMLHttpRequest(); 
    } 
    else if (window.ActiveXObject) 
    { 
        try 
        { 
           xmlreq = new ActiveXObject("Msxml2.XMLHTTP"); 
        } 
        catch (e1) 
        { 
            try 
            {             
             xmlreq = new ActiveXObject("Microsoft.XMLHTTP"); 
            } 
            catch (e2) 
            { 
              xmlreq = false; 
            } 
        } 
    } 
    return xmlreq; 
} 

function getReadyStateHandler(req,reponseXmlHandler) 
{ 
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
    startTimer();
} 

function validateAndExtendSession(){ 
     var req = newXMLHttpRequest();  
    req.onreadystatechange = getReadyStateHandler(req,updateSessionInfo); 
    req.open("GET","EcoWebAjaxAction.do?operation=getSessionDtls&num="+new Date().getTime(), true); 
    req.send("");  
} 

function updateSessionInfo(sessionXML){
    var session   =  sessionXML.getElementsByTagName("sessionDtls")[0];
   if (session == null){
      alert(parent.SESSION_EXPIRE_ALERT);
      parent.invalidateSession();
   }
} 



