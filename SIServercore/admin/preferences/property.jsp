<%@page import="com.enterprisehorizons.magma.server.admin.CacheConfigUtils , com.enterprisehorizons.util.StringUtils,java.util.Arrays"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>

<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>
<%@page import="com.spacetimeinsight.preferences.PreferenceHelper"%>
<%@page import="com.spacetimeinsight.db.preferences.UserPreferencesConfig"%>
<%@page import="java.util.List"%>
<html>
<head>
<%@ include file="/common/dojo.jsp" %>
 

<style>
        body .txtareamedium {
            width: 25em;
            height: 5em;
        }

</style>


<title><bean:message key="cache.cache" bundle="cache"/></title>


<script type="text/JavaScript">
	
	//variable to denote if the selected key is present in the keys array or not
	var isPresent=false;
 
    function goToDBHomePage(){
            window.location = "<%=ServerUtils.getContextName(request)%>/adminMain.do";
    }
    
        function submitForm()
    {
      
    }
	  
</script>
</head>
</html>
 
