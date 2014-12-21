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
   String configNames= "measurementType:PREF_USER_MM_VIEWER_MEASUREMENTTYPE#PREF_MODULE_MM_VIEWER_MEASUREMENTTYPE";
   if("-1".equals(userId))
   {
		configNames += ",ecoexpml:#PREF_MODULE_MM_VIEWER_ECOEXPML,autoFitColumns:#PREF_MODULE_MM_VIEWER_AUTOFITCOLUMNS";
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
 <table cellspacing="5" style="margin-left:10px">
    <tr>
        <td colspan="2">&nbsp;</td>
    </tr> 
       
   
		
	   <tr>
            <td align="right" ><strong><bean:message key="preferences.viewer.measurement.type" bundle="admin"/></strong>:</td>
            <td align="left" title='<bean:message key="preferences.manualmapping.viewer.measurement.tooltip" bundle="admin"/>'> <select id = "measurement_Type" name="measurementType" dojoType="dijit.form.FilteringSelect" invalidMessage="<bean:message key="admin.invalid.error" bundle="admin" />"  autocomplete="off" style="width:100px" <%=(pageContext.getAttribute("measurementType_update")!=null)?"disabled=\"disabled\"":"" %>>

             <option value="imperial" <logic:equal name="measurementType" value='imperial'> selected </logic:equal> ><bean:message key="preferences.viewer.imperial" bundle="admin"/></option>
             <option value="metric"<logic:equal name="measurementType" value='metric'> selected </logic:equal> ><bean:message key="preferences.viewer.metric" bundle="admin"/></option>
         </select></td> 
        </tr>
	<!-- Ecoexpml and auto fit column only for module preferences -->
	<logic:equal name="userId" value='-1'>
	<tr>
        <td align="right" ><strong><bean:message key="preferences.ecoexpml" bundle="admin"/> </strong>:</td>
        <td width="60" title='<bean:message key="preferences.manualmapping.viewer.ecoexpml.tooltip" bundle="admin"/>'>
			<select name="ecoexpml" id="ecoexpml" value=""  dojoType="dijit.form.FilteringSelect" <%=(pageContext.getAttribute("ecoexpml_update")!=null)?"disabled=\"disabled\"":"" %>>
                    <option value=" " '<%=(pageContext.getAttribute("ecoexpml").toString().equals(" ")?"selected":"")%>' />
                    <logic:iterate id="ecoexpmlName" name="ecoexpmlOptions" >
                        <option value="<bean:write name='ecoexpmlName' property='key'/>" <logic:equal name="ecoexpmlName" property="key" value='<%=pageContext.getAttribute("ecoexpml").toString()%>'>   selected </logic:equal>>   
                        <bean:write name='ecoexpmlName' property='value'/> 
                        </option>
                    </logic:iterate>
			</select>    
		</td> 
    </tr>
     <tr>
        <td align="right" >&nbsp;</td>
        <td align="left" title='<bean:message key="preferences.manualmapping.viewer.autoFitColumns.tooltip" bundle="admin"/>'><input type="checkbox" name="autoFitColumns" <%= "on".equals(pageContext.getAttribute("autoFitColumns"))?"checked":""%> <%=(pageContext.getAttribute("autoFitColumns_update")!=null)?"disabled=\"disabled\"":"" %>>&nbsp;<strong><bean:message key="preferences.auto.fit.columns" bundle="admin"/> </strong></td> 
    </tr> 

	</logic:equal>
    
 </table>     
<script>
	   var enableApplyBtn='<%=ESAPI.encoder().encodeForHTML(pageContext.getAttribute("enableApplyButton").toString())%>';
</script>

 
 

