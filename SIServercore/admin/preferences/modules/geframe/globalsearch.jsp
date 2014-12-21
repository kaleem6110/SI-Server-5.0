 
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/WEB-INF/UserPreferences.tld" prefix="UserPreferences"%>
<%@page import="java.util.List" %>
<%@page import="java.util.Map" %>
<%@ page import="org.owasp.esapi.ESAPI" %>
<%@page import="org.apache.commons.lang.StringEscapeUtils"%> 
<%@page pageEncoding="UTF-8"%>
<%  
   String configNames= "maxNoOfResults:PREF_USER_GE_GLOBALSEARCH_MAXNOOFRESULTS#PREF_MODULE_GE_GLOBALSEARCH_MAXNOOFRESULTS,enableAutoZoom:PREF_USER_GE_GLOBALSEARCH_ENABLEAUTOZOOM#PREF_MODULE_GE_GLOBALSEARCH_ENABLEAUTOZOOM,launchInNewWindow:PREF_USER_GE_GLOBALSEARCH_LAUNCHINNEWWINDOW#PREF_MODULE_GE_GLOBALSEARCH_LAUNCHINNEWWINDOW";
   String  categoryName="GlobalSearch";
   String importType=String.valueOf(request.getParameter("importType"));
%> 

<%
   String userId=String.valueOf(request.getParameter("userId"));
String moduleId=String.valueOf(request.getParameter("moduleId"));   
%>

<UserPreferences:UserPreferences userId="<%=ESAPI.encoder().encodeForHTML(userId)%>" moduleId="<%=ESAPI.encoder().encodeForHTML(moduleId)%>"  categoryName="<%=ESAPI.encoder().encodeForHTML(categoryName)%>" configNames="<%=ESAPI.encoder().encodeForHTML(configNames)%>" importType="<%=ESAPI.encoder().encodeForHTML(importType)%>"/>

   <script>
      var categoryName='<%=ESAPI.encoder().encodeForHTML(categoryName)%>';
      function validateCategory() {
        return true;
      }
   </script>

 <input type="hidden" name="categoryName" value="<%=ESAPI.encoder().encodeForHTML(categoryName)%>"/>  
 
 <!-- independent preferences -->
	<table cellspacing="0" style="margin-left:10px;">
      <tr><td>&nbsp;</td></tr> 
    </table>
 <table cellspacing="5" style="margin-left:10px;"> 
    
    <tr>
        <td align="right" ><strong><bean:message key="preferences.max.no.of.results" bundle="admin"/></strong>:</td>
        <td align="left" title='<bean:message key="preferences.ge.globalsearch.maxnoofResults.tooltip" bundle="admin"/>'><input size="3"type="text" name="maxNoOfResults" dojoType="dijit.form.NumberSpinner" required='false'
 constraints="{min:-1,max:999,places:0}" style="width:70px;" value='<%=ESAPI.encoder().encodeForHTML(ESAPI.encoder().encodeForHTML("".equals((String)pageContext.getAttribute("maxNoOfResults")) || pageContext.getAttribute("maxNoOfResults") == null ?"5":(String)pageContext.getAttribute("maxNoOfResults")))%>'
 <%=(pageContext.getAttribute("maxNoOfResults_update")!=null)?"disabled=\"disabled\"":"" %>></td> 
    </tr> 
    <tr>
        <td align="right" >&nbsp;</td>
        <td align="left" title='<bean:message key="preferences.ge.globalsearch.enableautozoom.tooltip" bundle="admin"/>'><input type="checkbox" name="enableAutoZoom" <%= (("on".equals(pageContext.getAttribute("enableAutoZoom")))||("true".equals(pageContext.getAttribute("enableAutoZoom"))))?"checked":""%>
		<%=(pageContext.getAttribute("enableAutoZoom_update")!=null)?"disabled=\"disabled\"":"" %>>&nbsp;<strong><bean:message key="preferences.enable.auto.zoom" bundle="admin"/></strong></td> 
    </tr> 
     <tr>
        <td align="right" >&nbsp;</td>
        <td align="left" title='<bean:message key="preferences.ge.globalsearch.launchinnewwindow.tooltip" bundle="admin"/>'><input type="checkbox" name="launchInNewWindow" <%= (("on".equals(pageContext.getAttribute("launchInNewWindow")))||("true".equals(pageContext.getAttribute("launchInNewWindow"))))?"checked":""%>
		<%=(pageContext.getAttribute("launchInNewWindow_update")!=null)?"disabled=\"disabled\"":"" %>>&nbsp;<strong><bean:message key="preferences.launch.in.new.window" bundle="admin"/></strong></td> 
    </tr> 
 </table>     

 <script>
	   var enableApplyBtn='<%=ESAPI.encoder().encodeForHTML(pageContext.getAttribute("enableApplyButton").toString())%>';
	</script>
 
 


