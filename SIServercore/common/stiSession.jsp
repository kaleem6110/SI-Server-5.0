<%@page import="com.enterprisehorizons.magma.server.admin.AdminConfigUtils"%>
<%@page import="com.spacetimeinsight.security.bean.JAASConstants"%>
<%@page import="com.spacetimeinsight.security.bean.JAASAuthenticationTypeInitializer"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="org.owasp.esapi.ESAPI"%>

<script>

    // added to handle on browser close scneario to invalidate user session
	//window.onbeforeunload = invalidateSession;
	var timer = 0;
	function sessionDetails(){
		var sessionMax = "<%=session.getMaxInactiveInterval()%>";
		var sessionAlert = "<%=AdminConfigUtils.getSessionAlert()%>";
		var sessionAlertTime = "<%=AdminConfigUtils.getSessionAlertTime()%>";
		var sessionMaxDiff = (sessionMax- sessionAlertTime);
		if(sessionAlert == 'true'){
			clearTimeout(timer);
			timer = 0 ;
			timer =  setTimeout("promptUser("+sessionAlertTime+")",sessionMaxDiff*1000); 
		}else{
			clearTimeout(timer);
			timer = 0 ;
			timer =  setTimeout("sessionExpire()",sessionMax*1000);
		}
	}

    function sessionExpire(){
		<% if (JAASAuthenticationTypeInitializer.getInstance().isSSO()) {%>
		//Extending session
			validateAndExtendSession();	
		<% }else{ %>
			parent.invalidateSession();
			//alert message is hardcoded here to show it in SI Designer also.
			alert("Your session has expired as per defined period of inactivity. Any unsaved data has been lost. Click OK to login again.");
			
		<% } %>
	}
    
    function clearTimer(){
    	clearTimeout(timer);
    	timer = 0 ;
    } 
       
    function promptUser(sessionAlertTime){
    	var minutes = parseInt( sessionAlertTime / 60 ) % 60;
		var seconds = sessionAlertTime % 60;
		if(seconds<10){
			seconds = '0'+seconds;
		}
		var message = confirm('Your login session will expire in ' +minutes+':'+seconds+ '(min:sec). Would you like to extend your session?');
    	if (message){
    		validateAndExtendSession();
    		sessionDetails();
    	}else{
    		timer =  setTimeout('sessionExpire()',sessionAlertTime*1000);
    		//parent.invalidateSession();
    	}
    }
    
    //function added here to invalidate the session in SI Designer also
    function invalidateSession(){
		<% if (JAASAuthenticationTypeInitializer.getInstance().isSSO()) {%>
			validateAndExtendSession();	
		<% }else{ %>
			 window.top.location.href = '<%=ServerUtils.getContextName(request)%>/logout.do?isSessionExpired=yes';
		<% } %>
    }
    
    
    //use to trim the string for white space
    String.prototype.trim = function (){
    	return this.replace(/^\s*/, "").replace(/\s*$/, "");
	}

    
    
    //Display user Friendly or developer friendly messages as per the choice made in admin Manage configuration enable debug Alert
    function showAlert(msg) 
    {
    	var enableDebug = <%=AdminConfigUtils.isJSErrorDebugEnabled()%>; //returns boolean
    	var userDefinedMsg = '<%=ESAPI.encoder().encodeForHTML(AdminConfigUtils.getJSUserDefaultErrorMessage())%>'; //returns string
    	var defaultMsg = "There is an error in application, please try your last step as system could not responds.";
    	if(enableDebug)
    	{
    		alert(msg);
    	}
    	else if( userDefinedMsg.trim().length == 0 ) //if no message is defined in manage configuration.
    	{
    		alert(defaultMsg);
    	}
    	else
    	{
    		alert(userDefinedMsg);
    	}
    }
    
</script>