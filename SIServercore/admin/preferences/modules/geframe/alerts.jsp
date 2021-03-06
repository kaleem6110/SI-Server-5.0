<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/WEB-INF/UserPreferences.tld" prefix="UserPreferences"%>
<%@page import="java.util.List" %>
<%@page import="java.util.Map" %>
<%@page import="org.owasp.esapi.ESAPI" %>
<%@page import="org.apache.commons.lang.StringEscapeUtils"%>
 <%@page pageEncoding="UTF-8"%>
<%  
   String configNames="snoozeTime:PREF_USER_GE_ALERT_SNOOZETIME#PREF_MODULE_GE_ALERT_SNOOZETIME,snoozeTimeUnits:PREF_USER_GE_ALERT_SNOOZETIME#PREF_MODULE_GE_ALERT_SNOOZETIME,audioFile:PREF_USER_GE_ALERT_AUDIOFILE#PREF_MODULE_GE_ALERT_AUDIOFILE,noOfMessages:PREF_USER_GE_ALERT_NOOFMESSAGES#PREF_MODULE_GE_ALERT_NOOFMESSAGES,enableAlarm:PREF_USER_GE_ALERT_ENABLEALARM#PREF_MODULE_GE_ALERT_ENABLEALARM,enableTour:PREF_USER_GE_ALERT_ENABLETOUR#PREF_MODULE_GE_ALERT_ENABLETOUR,zoomRange:PREF_USER_GE_ALERT_ZOOMRANGE#PREF_MODULE_GE_ALERT_ZOOMRANGE,tickerOffset:PREF_USER_GE_ALERT_TICKEROFFSET#PREF_MODULE_GE_ALERT_TICKEROFFSET,messageScrollCount:PREF_USER_GE_ALERT_MESSAGESCROLLCOUNT#PREF_MODULE_GE_ALERT_MESSAGESCROLLCOUNT,messageScrollSpeed:PREF_USER_GE_ALERT_MESSAGESCROLLSPEED#PREF_MODULE_GE_ALERT_MESSAGESCROLLSPEED";
   String  categoryName="Alerts";
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

 <input type="hidden" name="categoryName" value="<%=ESAPI.encoder().encodeForHTML(categoryName)%>"/>
    <table cellspacing="0" style="margin-left:10px;">
      <tr><td>&nbsp;</td></tr> 
    </table>
    <!-- independent preferences -->
    <table cellspacing="5" style="margin-left:10px;"> 
             
            <tr>
                    <td align="right" >
                        <strong><bean:message key="preferences.snooze.time" bundle="admin"/> </strong> :
                    </td>
                    <td align="left" title='<bean:message key="preferences.ge.alerts.snoozetime.tooltip" bundle="admin"/>'>
                         <input maxlength="5" size="3"  name="snoozeTime"  type="text" dojoType="dijit.form.NumberSpinner" required='false' constraints="{min:0,max:999,places:0}" style="width:70px;" value='<%=ESAPI.encoder().encodeForHTML("".equals((String)pageContext.getAttribute("snoozeTime")) || pageContext.getAttribute("snoozeTime") == null ?"20":(String)pageContext.getAttribute("snoozeTime"))%>'
                           <%=ESAPI.encoder().encodeForHTML((pageContext.getAttribute("snoozeTime_update")!=null)?"disabled=\"disabled\"":"") %> 
						 >
                    </td> 
                    <td align="left" title='<bean:message key="preferences.ge.alerts.snoozetimeunits.tooltip" bundle="admin"/>'>
                         <select id = "alert_snoozeTime" name="snoozeTimeUnits" dojoType="dijit.form.FilteringSelect"  invalidMessage="<bean:message key="admin.invalid.error" bundle="admin" />" autocomplete="off" style="width:80px"  <%=(pageContext.getAttribute("snoozeTime_update")!=null)?"disabled=\"disabled\"":"" %>>
						
							<option value="min" <logic:equal name="snoozeTimeUnits" value='min'> selected </logic:equal> ><bean:message key="preferences.min" bundle="admin"/></option>
                             <option value="hour" <logic:equal name="snoozeTimeUnits" value='hour'> selected </logic:equal> ><bean:message key="preferences.hour" bundle="admin"/></option>
                           
                             <option value="sec" <logic:equal name="snoozeTimeUnits" value='sec'> selected </logic:equal> ><bean:message key="preferences.sec" bundle="admin"/></option>      
                        </select>
                    </td> 
            </tr> 
            
            <tr>
                <td align="right"  >
                    <strong><bean:message key="preferences.no.of.messages" bundle="admin"/></strong> :
                </td>
                <td align="left" title='<bean:message key="preferences.ge.alerts.noofmessages.tooltip" bundle="admin"/>'>
                         <input size="3" type="text" name="noOfMessages" dojoType="dijit.form.NumberSpinner" required='false'
 constraints="{min:0,max:999,places:0}"
 style="width:70px;" value='<%=ESAPI.encoder().encodeForHTML((String)pageContext.getAttribute("noOfMessages"))%>' <%=(pageContext.getAttribute("noOfMessages_update")!=null)?"disabled=\"disabled\"":"" %>>
                </td> 
                <td align="left">&nbsp;
                        
                </td> 
            </tr>
    </table> 
      
    <!-- Alarm Group Preferences -->    
    <fieldset class="fieldsetpref" >
        <legend class="fieldsetlegend"><strong><bean:message key="preferences.alarm" bundle="admin"/></strong></legend>
            <table cellspacing="5" >
                <tr>
                    <td align="right" width="110" >&nbsp;</td>
                    <td width="70" title='<bean:message key="preferences.ge.alerts.enablealarm.tooltip" bundle="admin"/>'><input  type="checkbox" name="enableAlarm" <%= (("on".equals(pageContext.getAttribute("enableAlarm")))||("".equals(pageContext.getAttribute("enableAlarm"))))?"checked":""%> 
					<%=(pageContext.getAttribute("enableAlarm_update")!=null)?"disabled=\"disabled\"":"" %>
					/>&nbsp;<strong><bean:message key="preferences.enable" bundle="admin"/></strong></td>
                
                    <td >&nbsp;</td>
                    <td align="right" width="100" ><strong><bean:message key="preferences.audio.file" bundle="admin"/></strong>:</td>
                    <td title='<bean:message key="preferences.ge.alerts.audiofile.tooltip" bundle="admin"/>'><select name="audioFile" style="width:180px" id="audioFile" value="" dojoType="dijit.form.FilteringSelect" <%=(pageContext.getAttribute("audioFile_update")!=null)?"disabled=\"disabled\"":"" %>>
                    <option value=" " '<%=(pageContext.getAttribute("audioFile").toString().equals(" ")?"selected":"")%>' />                   
                    <logic:present  name="audioFileOptions">
                    <logic:iterate id="audioFileName" name="audioFileOptions" >
                                        <option value="<bean:write name='audioFileName' property='key'/>" <logic:equal name="audioFileName" property="key" value='<%=pageContext.getAttribute("audioFile").toString()%>'>   selected </logic:equal>>   
                                                    <bean:write name='audioFileName' property='value'/> 
                                        </option>
                                        </logic:iterate>
										</logic:present>                                        
                                        </select>               
                    </td>
                </tr>
                
                
           </table>             
    </fieldset>
     <!-- Tour Group Preferences -->    
    <fieldset class="fieldsetpref" >
        <legend class="fieldsetlegend"><strong><bean:message key="preferences.tour" bundle="admin"/></strong></legend>
            <table cellspacing="5" >
                <tr>
                    <td align="right" width="110">&nbsp;</td>
                    <td width="200" title='<bean:message key="preferences.ge.alerts.tourEnable.tooltip" bundle="admin"/>'> <input type="checkbox" name="enableTour" <%= (("on".equals(pageContext.getAttribute("enableTour")))||("".equals(pageContext.getAttribute("enableTour"))))?"checked":""%>  
					<%=(pageContext.getAttribute("enableTour_update")!=null)?"disabled=\"disabled\"":"" %>
					/>
                    <strong><bean:message key="preferences.enable" bundle="admin"/> </strong></td>
                </tr>
                
           </table>             
    </fieldset>
    
    <!-- Ticker Group Preferences -->    
    <fieldset class="fieldsetpref">
        <legend class="fieldsetlegend" ><strong><bean:message key="preferences.ticker" bundle="admin"/></strong></legend>
            <table cellspacing="5" >
                <tr>
                    <td align="right" width="110" ><strong><bean:message key="preferences.offset" bundle="admin"/></strong>:</td>
                    <td width="60" title='<bean:message key="preferences.ge.alerts.tickeroffset.tooltip" bundle="admin"/>'><input size="3"  dojoType="dijit.form.NumberSpinner" required='true' invalidMessage="<bean:message key="admin.invalid.error" bundle="admin" />" 
				constraints="{min:0,max:999,places:0}" style="width:70px;"
 type="text" name="tickerOffset" value='<%=ESAPI.encoder().encodeForHTML("".equals((String)pageContext.getAttribute("tickerOffset")) || pageContext.getAttribute("tickerOffset") == null ?"0":(String)pageContext.getAttribute("tickerOffset"))%>' <%=ESAPI.encoder().encodeForHTML((pageContext.getAttribute("tickerOffset_update")!=null)?"disabled=\"disabled\"":"") %> ></td>  
					<td align="left"><b><bean:message key="preferences.pixel.label" bundle="admin" /></b></td>
                    <td align="right" width="110"><strong><bean:message key="preferences.zoom.range" bundle="admin"/></strong>:</td>
                    <td title='<bean:message key="preferences.ge.alerts.zoomrange.tooltip" bundle="admin"/>'><input size="6" type="text" name="zoomRange" dojoType="dijit.form.NumberSpinner" required='false'
 constraints="{min:0,max:100000,places:0}" style="width:100px;" value='<%=ESAPI.encoder().encodeForHTML((String)pageContext.getAttribute("zoomRange"))%>'
  <%=(pageContext.getAttribute("zoomRange_update")!=null)?"disabled=\"disabled\"":"" %>
 ></td><td align="left"><b><bean:message key="preferences.meter.label" bundle="admin" /></b></td>
                </tr>
           </table>             
    </fieldset>
    
    <!-- Message Scroll Group Preferences -->    
    <fieldset class="fieldsetpref">
        <legend class="fieldsetlegend" ><strong><bean:message key="preferences.message.scroll" bundle="admin"/></strong></legend>
            <table cellspacing="5">
                <tr>
                    <td align="right" width="110"><strong><bean:message key="preferences.count" bundle="admin"/></strong>:</td>
                    <td width="60" title='<bean:message key="preferences.ge.alerts.messagescrollcount.tooltip" bundle="admin"/>'><input size="3" type="text" name="messageScrollCount" dojoType="dijit.form.NumberSpinner" required='true' invalidMessage="<bean:message key="admin.invalid.error" bundle="admin" />" 
 constraints="{min:0,max:999,places:0}" style="width:70px;" value='<%=ESAPI.encoder().encodeForHTML((String)pageContext.getAttribute("messageScrollCount"))%>'
   <%=(pageContext.getAttribute("messageScrollCount_update")!=null)?"disabled=\"disabled\"":"" %>></td>
                    
                    <td width="20">&nbsp;</td>
                    <td align="right" width="110" ><strong><bean:message key="preferences.speed" bundle="admin"/></strong>:</td>
                    <td title='<bean:message key="preferences.ge.alerts.messagescrollspeed.tooltip" bundle="admin"/>'><input size="3" type="text" name="messageScrollSpeed" dojoType="dijit.form.NumberSpinner" required='false'
 constraints="{min:0,max:999,places:0}" style="width:70px;" value='<%=ESAPI.encoder().encodeForHTML((String)pageContext.getAttribute("messageScrollSpeed"))%>'
 <%=(pageContext.getAttribute("messageScrollSpeed_update")!=null)?"disabled=\"disabled\"":"" %>></td>
					<td align="left"><b><bean:message key="preferences.secs" bundle="admin"/></b></td>
                </tr>
           </table>             
    </fieldset>
    
<!--
<button type="submit" name="submit" onClick="importUserPreferences()">
submit
</button>
-->
<script>
	   var enableApplyBtn='<%=ESAPI.encoder().encodeForHTML(pageContext.getAttribute("enableApplyButton").toString())%>';
</script>