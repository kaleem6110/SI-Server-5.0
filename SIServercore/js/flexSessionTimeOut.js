
/*
 * Session TIme Out Javascript
 */
//----------

 var sessionAlertTime = 0;
 var isRequestAlreadySent = false;
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
    validateAndExtendSession();
} 

function validateAndExtendSession(){ 
     if(!isRequestAlreadySent){
	    var req = newXMLHttpRequest();  
	    req.onreadystatechange = getReadyStateHandler(req,updateSessionInfo); 
	    req.open("GET","EcoWebAjaxAction.do?operation=getSessionDtls&num="+new Date().getTime(), true); 
	    req.send("");  
    	isRequestAlreadySent = true;
    }
} 
var time = 0;
function updateSessionInfo(sessionXML){
	isRequestAlreadySent = false;
    var session   =  sessionXML.getElementsByTagName("sessionDtls")[0];
    sessionAlertTime = session.getElementsByTagName("sessionAlertTime")[0].firstChild.data;
   if (session == null){
      parent.invalidateSession();
      alert(parent.SESSION_EXPIRE_ALERT);
   }else{
   		var IsSSOUser = session.getElementsByTagName("SSOUser")[0].firstChild.data;
		var sessionMaxInterval = session.getElementsByTagName("sessionMaxInterval")[0].firstChild.data;
		if(IsSSOUser == "true"){
		         clearTimeout(time);
				 time = 0 ;
				 time = setTimeout('validateAndExtendSession()',sessionMaxInterval*1000-sessionAlertTime*1000);
		   	}
   }
   
} 
  



