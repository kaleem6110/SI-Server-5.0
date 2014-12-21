<%@page import="com.spacetimeinsight.preferences.PreferenceHelper"%> 
<%@ page import="org.owasp.esapi.ESAPI" %>
<html>

<head>
<%@ include file="/common/style.jsp"%>
</head>
<body class="bodybg" >
				
<script>
 <%
   String defaultModule=PreferenceHelper.getDefaultModule((UserBean) request.getSession().getAttribute(ServerUtils.USER_BEAN_NAME));
 
 %>
 
 	try{
 		
 		
		if(parent.document.getElementById('menu2Load').value != ""){
			parent.loadToIFrameUrl(parent.document.getElementById('menu2Load').value, '<%=ESAPI.encoder().encodeForHTML(defaultModule)%>')
		}
 		
	}catch(er){
	}
	
	
		
</script>
</body>
</html>