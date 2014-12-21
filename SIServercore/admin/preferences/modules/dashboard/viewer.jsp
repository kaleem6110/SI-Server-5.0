<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/WEB-INF/UserPreferences.tld" prefix="UserPreferences"%>
<%@page import="java.util.List" %>
<%@page import="java.util.Map" %>
<%@ page import="org.owasp.esapi.ESAPI" %> 
<%@page import="org.apache.commons.lang.StringEscapeUtils"%>
<%  
   
   String  categoryName="Viewer";
   String importType=String.valueOf(request.getParameter("importType"));

   String userId=String.valueOf(request.getParameter("userId"));
String moduleId=String.valueOf(request.getParameter("moduleId"));   
 String configNames="";
 if("-1".equals(userId))
   {
		configNames += "moduleJSUrl:#PREF_MODULE_DASHBOARD_VIEWER_MODULEJSURL,layerEventHandlerJSFunction:#PREF_MODULE_DASHBOARD_VIEWER_LAYEREVENTHANDLERJSFUNCTION";
   } 
  
%>

<UserPreferences:UserPreferences userId="<%=ESAPI.encoder().encodeForHTML(userId)%>" moduleId="<%=ESAPI.encoder().encodeForHTML(moduleId)%>"  categoryName="<%=ESAPI.encoder().encodeForHTML(categoryName)%>" configNames="<%=ESAPI.encoder().encodeForHTML(configNames)%>" importType="<%=ESAPI.encoder().encodeForHTML(importType)%>"/>


<script>
      var categoryName='<%=categoryName%>';
      function validateCategory() {
        return true;
      }
   </script>
 
  <input type="hidden" name="categoryName" value="<%=categoryName%>"/>  

<!-- independent preferences -->
<table cellspacing="0" style="margin-left:10px;">
      <tr><td>&nbsp;</td></tr> 
    </table>
 <table cellspacing="5" style="margin-left:10px;"> 
<logic:equal name="userId" value='-1'>
		<tr>
		<td align="right" >
                        <strong><bean:message key="preferences.viewer.module.js.url" bundle="admin"/></strong> :
                    </td>
		<td align="left" title='<bean:message key="preferences.dashboard.viewer.modulejsurl.tooltip" bundle="admin"/>'>
                         <input size="3" type="text" name="moduleJSUrl"  required='false'
							style="width:250px;" value='<%=ESAPI.encoder().encodeForHTML(pageContext.getAttribute("moduleJSUrl").toString())%>' <%=ESAPI.encoder().encodeForHTML((pageContext.getAttribute("moduleJSUrl_update")!=null)?"disabled=\"disabled\"":"") %>>
                    </td> 
		</tr>
	
		<tr>
		<td align="right" >
                        <strong><bean:message key="preferences.viewer.layer.event" bundle="admin"/> </strong> :
                    </td>
		<td align="left" title='<bean:message key="preferences.dashboard.viewer.layereventhandlerjsfunction.tooltip" bundle="admin"/>'>
                         <input size="3" type="text" name="layerEventHandlerJSFunction"  required='false'
							style="width:250px;" value='<%=ESAPI.encoder().encodeForHTML(pageContext.getAttribute("layerEventHandlerJSFunction").toString())%>' <%=ESAPI.encoder().encodeForHTML((pageContext.getAttribute("layerEventHandlerJSFunction_update")!=null)?"disabled=\"disabled\"":"") %>>
                    </td> 
		</tr>
		
	
	
		</logic:equal>
		<logic:notEqual name="userId" value='-1'>
			<strong><bean:message key="preferences.viewer.no.poroperties" bundle="admin"/></strong>
		</logic:notEqual>
	
 </table>     
<script>
	   var enableApplyBtn='<%=ESAPI.encoder().encodeForHTML(pageContext.getAttribute("enableApplyButton").toString())%>';
</script>

 
 

