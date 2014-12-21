<%@page import="com.enterprisehorizons.magma.server.admin.CacheConfigUtils , com.enterprisehorizons.util.StringUtils,java.util.Arrays"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ page import="org.owasp.esapi.ESAPI" %>
<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>
<%@page import="com.spacetimeinsight.preferences.PreferenceHelper"%>
<%@page import="com.enterprisehorizons.util.StringUtils"%>
<%@page import="org.apache.commons.lang.StringEscapeUtils"%>
<%@page pageEncoding="UTF-8"%>
<html>
<head>
<%@ include file="/common/dojo.jsp" %>
 <%
	Long moduleUrlId=Long.valueOf(request.getAttribute("moduleUrlId").toString());
	Long moduleId = Long.valueOf(request.getAttribute("moduleId").toString());
    String categoryName = String.valueOf(request.getAttribute("categoryName").toString());
	String preferencesLevel=request.getAttribute("preferencesLevel").toString();
	
	String selectedUrl = request.getAttribute("selectedUrl").toString();
    String title = request.getAttribute("title").toString();
	String csrfString =(String)request.getAttribute("csrf");
 %>

<script>
	setSessionTimer(false);
	function submitForm()
	{
		if(document.getElementById("srcModuleId").value!=document.getElementById("moduleId").value)
	{
			document.forms[0].submit();
    }
		else
		{
		alert('<bean:message key="preferences.import.sourcemodule.error" bundle="admin"/>');
		}
    }
	function setImportType()
	{
		if(this.checked)
		{
			document.getElementById("importType").value=this.value;
		}
	}
	function setSourceModule()
	{
		if(this.checked)
		{
			document.getElementById("srcModuleId").value = this.value;
		}
	}
	function closeImport(){
	window.location = "<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/prefAction.do?operation=renderCategoryView&moduleUrlId=<%=moduleUrlId%>&moduleId=<%=moduleId%>&preferencesLevel=<%=ESAPI.encoder().encodeForHTML(preferencesLevel)%>&csrf=<%=ESAPI.encoder().encodeForHTML(csrfString)%>&selectedCategory=<%=ESAPI.encoder().encodeForHTML(categoryName)%>&selectedUrl=<%=ESAPI.encoder().encodeForHTML(selectedUrl)%>";
	}
</script>

</head>

<body class="tundra bodybg">

<form name="prefImportForm" method="post" dojoType='dijit.form.Form' action="<%=ServerUtils.getContextName(request)%>/prefAction.do">
<input type="hidden" id="csrf" name="csrf" value="<%=ESAPI.encoder().encodeForHTML(csrfString)%>">
			<input type="hidden" name="operation" id="operation" value="renderCategoryView"/>
			<input type="hidden" name="moduleId"  id="moduleId" value="<%=moduleId%>"/>
			<input type="hidden" name="moduleUrlId"  id="moduleUrlId" value="<%=moduleUrlId%>"/>
			<input type="hidden" name="preferencesLevel" id="preferencesLevel" value="<%=ESAPI.encoder().encodeForHTML(preferencesLevel)%>"/>
			<input type="hidden" name="importModule" id="importModule" value="true"/>
			<input type="hidden" name="importType" id="importType" value="merge"/>
			<input type="hidden" name="srcModuleId" id="srcModuleId" value="<%=moduleId%>"/>
            <input type="hidden" name="selectedCategory" id="selectedCategory" value="<%=ESAPI.encoder().encodeForHTML(categoryName)%>"/>
            <input type="hidden" name="selectedUrl" id="selectedUrl" value='<%=ESAPI.encoder().encodeForHTML(request.getParameter("selectedUrl"))%>' />
			
			 <div class="pref_import_container" >
              <table cellspacing="5" style="margin-left:10px; margin-top:10px;"> 
				<tr>
					<td><b><%=title%></b></td>
				</tr>
			  </table>
<br>			  
				 <!-- import Group Preferences -->    
			<fieldset class="fieldsetpref" >
				<legend class="fieldsetlegend"><strong><bean:message key="preferences.import.from.module" bundle="admin"/></strong></legend>
				<table cellspacing="5" style="margin-left:10px; "> 
				<tr>
					<td style="padding-top:10px" align="left">
						
						<div class="importListBox" style="padding-left:10px; padding-top:5px;">
							
							
								<logic:present name="moduleList"> 
											<logic:iterate name="moduleList" id="ModuleListID">
												<input type="radio" name="srcModule" id='<bean:write name="ModuleListID" property="moduleName" />' value='<bean:write name="ModuleListID" property="moduleId"/>'  dojoType="dijit.form.RadioButton" onchange="setSourceModule"/>
												<label for='<bean:write name="ModuleListID" property="moduleName"/>'> <bean:write name="ModuleListID" property="moduleName" filter="false"/> </label>&nbsp&nbsp  </br>
											</logic:iterate>
											<!--
											<logic:iterate name="moduleList" id="ModuleListID">
												<input type="radio" name="srcModule" id='<bean:write name="ModuleListID" property="moduleName"/>' value='<bean:write name="ModuleListID" property="moduleId"/>'  dojoType="dijit.form.RadioButton" onchange="setSourceModule"/>
												<label for='<bean:write name="ModuleListID" property="moduleName"/>'> <bean:write name="ModuleListID" property="moduleName"/> </label>&nbsp&nbsp 
											</logic:iterate>
											--> 
									
								</logic:present>
							
						</div>	
					</td>
				</tr>
			</table>
			
					<table cellspacing="5" >	
						<tr>
							<td>
								<input type="radio" name="importType" id="merge" value="merge" dojoType="dijit.form.RadioButton" checked onchange="setImportType"/> <label for="merge"><bean:message key="preferences.import.merge" bundle="admin"/> </label>&nbsp&nbsp 
							</td>
							<td>
								<input type="radio" name="importType" id="overrite" value="overrite" dojoType="dijit.form.RadioButton" onchange="setImportType"/> <label for="overrite"><bean:message key="preferences.import.overwrite" bundle="admin"/></label> 
							</td>
						</tr>
					</table>
						<br>	
			</fieldset>	
			</div>
            <div class="buttoncontainer" style=" text-align:right; padding-top:18px ">
			
						<button dojoType="dijit.form.Button" type="button"  id="execute" name="execute"  onclick="submitForm"> <bean:message key="preferences.import.execute" bundle="admin"/> </button> 
						<button dojoType="dijit.form.Button" type="button"  id="cancel" name="cancel"  onclick="closeImport"> <bean:message key="preferences.cancel" bundle="admin"/> </button>
				
			</div>
</form>
<script>  
     parent.updateSessionDetails();
</script>
</body>
</html>
 
