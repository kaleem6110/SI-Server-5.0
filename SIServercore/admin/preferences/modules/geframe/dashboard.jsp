 
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
   String configNames= "layout:PREF_USER_GE_DASHBOARD_LAYOUT#PREF_MODULE_GE_DASHBOARD_LAYOUT,numberOfColumns:PREF_USER_GE_DASHBOARD_NUMBEROFCOLUMNS#PREF_MODULE_GE_DASHBOARD_NUMBEROFCOLUMNS,numberOfRows:PREF_USER_GE_DASHBOARD_NUMBEROFROWS#PREF_MODULE_GE_DASHBOARD_NUMBEROFROWS,defaultWidth:PREF_USER_GE_DASHBOARD_DEFAULTWIDTH#PREF_MODULE_GE_DASHBOARD_DEFAULTWIDTH,defaultHeight:PREF_USER_GE_DASHBOARD_DEFAULTHEIGHT#PREF_MODULE_GE_DASHBOARD_DEFAULTHEIGHT";
   String  categoryName="Dashboard";
   String importType=String.valueOf(request.getParameter("importType"));
%> 

<%
   String userId=String.valueOf(request.getParameter("userId"));
String moduleId=String.valueOf(request.getParameter("moduleId"));   
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
    <!-- Layout Group Preferences -->    
    <fieldset class="fieldsetpref" style="margin-left:10px">
        <legend class="fieldsetlegend"><strong><bean:message key="preferences.layout" bundle="admin"/></strong></legend>
            <table cellspacing="5" >
                <tr>
                    <td align="right"><strong><bean:message key="preferences.type" bundle="admin"/></strong>:</td>
                    <td width="60" title='<bean:message key="preferences.ge.dashboard.layout.tooltip" bundle="admin"/>'>
                        <select id ="dasboard_layout" name="layout" dojoType="dijit.form.FilteringSelect" invalidMessage="<bean:message key="admin.invalid.error" bundle="admin" />"  autocomplete="off" style="width:200px" <%=(pageContext.getAttribute("layout_update")!=null)?"disabled=\"disabled\"":"" %>>
                        	 <option value="default" <logic:equal name="layout" value='default'> selected </logic:equal> ><bean:message key="preferences.default.layout" bundle="admin"/></option>
                             <option value="horizontal" <logic:equal name="layout" value='horizontal'> selected </logic:equal> ><bean:message key="preferences.horizontal" bundle="admin"/></option>
                             <option value="vertical" <logic:equal name="layout" value='vertical'> selected </logic:equal> ><bean:message key="preferences.vertical" bundle="admin"/></option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <fieldset class="innerfieldsetpref">
                            <legend class="fieldsetlegend"><strong><bean:message key="preferences.dimensions" bundle="admin"/></strong></legend>
                                <table cellspacing="5" >
                                    <tr>
                                        <td align="right" width="110"><strong><bean:message key="preferences.rows" bundle="admin"/></strong>:</td>
                                        <td width="60" title='<bean:message key="preferences.ge.dashboard.numberofrows.tooltip" bundle="admin"/>'>
                                            <input size="3" type="text" name="numberOfRows" dojoType="dijit.form.NumberSpinner" required='false' style="width:70px;" value='<%=ESAPI.encoder().encodeForHTML((String)pageContext.getAttribute("numberOfRows"))%>' <%=(pageContext.getAttribute("numberOfRows_update")!=null)?"disabled=\"disabled\"":"" %>>
                                        </td>
                                         <td width="20">&nbsp;</td>
                                        <td align="right" width="110"><strong><bean:message key="preferences.columns" bundle="admin"/></strong>:</td>
                                        <td width="60" title='<bean:message key="preferences.ge.dashboard.numberofcolumns.tooltip" bundle="admin"/>'>
                                            <input size="3" type="text" name="numberOfColumns" dojoType="dijit.form.NumberSpinner" required='false' style="width:70px;" value='<%=ESAPI.encoder().encodeForHTML((String)pageContext.getAttribute("numberOfColumns"))%>' <%=(pageContext.getAttribute("numberOfColumns_update")!=null)?"disabled=\"disabled\"":"" %>>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="5">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="right" width="110"><strong><bean:message key="preferences.width" bundle="admin"/></strong>:</td>
                                        <td width="60" title='<bean:message key="preferences.ge.dashboard.defaultwidth.tooltip" bundle="admin"/>'>
                                           <input size="3" type="text" name="defaultWidth" dojoType="dijit.form.NumberSpinner" required='false' style="width:70px;" value='<%=ESAPI.encoder().encodeForHTML((String)pageContext.getAttribute("defaultWidth"))%>'
										   <%=(pageContext.getAttribute("defaultWidth_update")!=null)?"disabled=\"disabled\"":"" %>>
                                        </td>
                                           <td align="left"><b><bean:message key="preferences.pixel.label" bundle="admin" /></b></td>
                                        <td align="right" width="110"><strong><bean:message key="preferences.height" bundle="admin"/></strong>:</td>
                                        <td width="60" title='<bean:message key="preferences.ge.dashboard.defaultheight.tooltip" bundle="admin"/>'>
                                          <input size="3" type="text" name="defaultHeight" dojoType="dijit.form.NumberSpinner" required='false' style="width:70px;" value='<%=ESAPI.encoder().encodeForHTML((String)pageContext.getAttribute("defaultHeight"))%>'
										  <%=(pageContext.getAttribute("defaultHeight_update")!=null)?"disabled=\"disabled\"":"" %>>
                                        </td><td align="left"><b><bean:message key="preferences.pixel.label" bundle="admin" /></b></td>
                                    </tr>
                               </table>             
                        </fieldset>
                    </td>
                </tr>
                 <tr>
                    <td colspan="2"></td>
                 </tr>
           </table>             
    </fieldset>
    <script>
	   var enableApplyBtn='<%=ESAPI.encoder().encodeForHTML(pageContext.getAttribute("enableApplyButton").toString())%>';
	   
	</script>
    
    

 
 
