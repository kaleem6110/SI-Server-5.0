<%@ page import="java.util.*,
com.enterprisehorizons.magma.server.util.ServerUtils,
com.enterprisehorizons.util.StringUtils, 
com.spacetimeinsight.magma.job.JobConstants, 
com.enterprisehorizons.magma.jobs.forms.URLExtractorForm,
com.spacetimeinsight.db.scheduler.model.ServerEnvMaster,
com.spacetimeinsight.db.model.util.DataModelsCache, 
com.spacetimeinsight.db.scheduler.model.*"%>
<%@page import="org.owasp.esapi.ESAPI"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>
<%@ include file="/common/dojo.jsp" %>
<%
	URLExtractorForm formObj = (URLExtractorForm)request.getAttribute("urlExtractorForm");
	int urlCount =  Integer.parseInt(session.getAttribute("urlCount")+"");  
%>
<%@ include file="jobsHelper.jsp" %>
<script type="text/javascript" src="js/jobs.js"></script>
<html:html locale="true">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>View / Update Job</title>   
</head>
<body onLoad="" class="tundra bodybg">
<html:form action="/uRLExtractorAction.do?operation=onUpdateURLExtractor"  method="POST">

<table width="100%" cellspacing="0" cellpadding="0" align="center"  border="0" >
	<tr>
		<td  class="pageTitle paddingTitle">
			<% if (!readOnly) { %>
				<bean:message key="jobs.updateHeader" bundle="jobs"/>
		</td>
	</tr>
	<tr>
		<td class="paddingTitleDesc">
			<bean:message key="jobs.updatesubHeader" bundle="jobs"/>
			<%} else if (!StringUtils.isNull(tmp) && tmp.equals("delete")) { %>
            <bean:message key="jobs.deleteHeader" bundle="jobs"/>
		</td>
	</tr>
	<tr>
		<td class="paddingTitleDesc">
			<bean:message key="jobs.deletesubHeader" bundle="jobs"/>
			<% } else { %>
			<bean:message key="jobs.viewHeader" bundle="jobs"/>
		</td>
	</tr>
	<tr>
		<td class="paddingTitleDesc">
			<bean:message key="jobs.viewsubHeader" bundle="jobs"/>
			<%}%>
		</td>  
	</tr>
	<tr>
		<td style="padding-left:67px; width:800px;"> 
		   <font color="blue" style="font-family: Tahoma;font-size: 12px;" ><b>
				<html:messages id="saveStatus" message="true" bundle="jobs"><bean:write name="saveStatus" /></html:messages>
			</b></font> 
			<font color="red" style="font-family: Tahoma;font-size: 12px;"><b><html:errors bundle="jobs"/></b></font> 
		</td>  
	</tr>
	<tr height="30px">
		<td>&nbsp;</td>
	</tr>
	<tr>
		<td>
			<table cellspacing="0" cellpadding="0" width="100%" border="0">
				<html:hidden  property="id" name="uRLExtractorForm"  />
				<tr>
					<td style="padding-left:36px;align:left;">
                    	<table cellspacing="0" cellpadding="0" border="0">
                        	<tr>
                            	<td align="right" style="padding-right:5px">&nbsp;</td>
                                <td align="left">&nbsp;</td>
                                <td width="30">&nbsp;</td>
                                <td align="right" style="padding-right:5px">&nbsp;</td>
                                <td align="left">&nbsp;</td>
                          	</tr>
                            <tr>
                            	<td colspan="5" height="10">&nbsp;</td>
                            </tr>
                            <tr>
                            	<td align="right" style="padding-right:5px"><label class="label">Create As Task:</label></td>
                                <td align="left"><input dojotype='dijit.form.CheckBox' name="isTask" value="isTask" id="isTask"></td>
                                <td>&nbsp;</td>
                                <td align="right" style="padding-right:5px"><label class="label">Add Dependent Task:</label></td>
                                <td align="left"><input dojotype='dijit.form.CheckBox' name="isTaskPresent" value="isTaskPresent" id="isTaskPresent" onClick="addDependentTasksPanel(this,true)" <%if (readOnly) {%> disabled=true <%}%>/></td>
                          	</tr>
                            <tr>
                            	<td colspan="5" height="10">&nbsp;</td>
                            </tr>
                            <tr>
                            	<td align="right" style="padding-right:5px"><label class="label"><bean:message key="jobs.jobName" bundle="jobs"/></label><label class="error">*</label><b>:</b></td>
                                <td align="left"><input type="text"  id="jobName" name="jobName"  class="medium1" style="height:1.7em;" maxlength="45" autocomplete="off"	dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true"  value="<bean:write name="uRLExtractorForm" property="jobName" />" />   </td>
                                <td width="30">&nbsp;</td>
                                <td align="right" style="padding-right:5px"><label class="label"><bean:message key="jobs.startType" bundle="jobs"/></label><label class="error">*</label><b>:</b>                     </td>
                                <td align="left">
                                	<select id="startTimeType" dojoType="dijit.form.FilteringSelect"  name="startTimeType" autocomplete="off" onChange="showConcernDiv()" >
																<option value=""><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
																<logic:present name="allStartTimesList">    
																	<logic:iterate name="allStartTimesList" id="allStartTimesDtls">
																		<option value="<bean:write name="allStartTimesDtls" property="key"/>">
																			<bean:message  bundle="jobs" name="allStartTimesDtls" property="value" />
																		</option>
																	</logic:iterate>
																</logic:present>
															</select>
                                </td>
                          	</tr>
                            <tr>
                            	<td colspan="5" height="10">&nbsp;</td>
                            </tr>
                            <tr>
                            	<td rowspan="3" align="right" style="padding-right:5px"> <label class="label"><bean:message key="jobs.description" bundle="jobs"/></label><b>:</b></td>
                                <td rowspan="3" align="left"><textarea dojoType="dijit.form.SimpleTextarea" rows="5" cols="30" id="description" class="medium1" style="height:5.7em;" name="description"  ><bean:write name="uRLExtractorForm" property="description" /></textarea></td>
                                <td width="30">&nbsp;</td>
                                <td align="right" style="padding-right:5px"> <label class="label"><bean:message key="jobs.startDate" bundle="jobs"/><span id="startDateMand">:</label>                                </td>
                                <td align="left">
                                	<div id="dateDiv" >
												<input id="startDate" type="text" name="startDate" style="width:194px;height:1.7em;" autocomplete="off" dojoType="dijit.form.DateTextBox" trim="true"  promptMessage="mm/dd/yyyy" onChange="dojo.byId('calendarDiv').innertHTML=arguments[0];" invalidMessage="Invalid date. Use mm/dd/yyyy format." /><font size="1">&nbsp;<label><bean:message key="jobs.startDateFormat" bundle="jobs"/></label></font>
												</div>
												<div id="calendarDiv"  style="position:absolute;z-index:100;display:none; top:176px; left:600px; width:200; height:200; border:2px solid #EAEAEA;background-color:blue;opacity:1;">

												</div>
                                </td>
                          	</tr>
                            <tr>
                            	<td colspan="3" height="10">&nbsp;</td>
                            </tr>
                            <tr>
                            	
                                <td >&nbsp;</td>
                                <td align="right" style="padding-right:5px"> <label class="label"><bean:message key="jobs.startTime" bundle="jobs"/><span id="startTimeMand"></span><label class="error">*</label><b>:</b>   </td>
                                <td align="left">
                                	 <div id="startTimeDiv" style="width:194px;height:1.7em;">
													<input type="text"   id="startTime" name="startTime" class="medium1" style="height:1.7em;" autocomplete="off" dojoType="dijit.form.ValidationTextBox"   invalidMessage="Invalid time. Use HH:mm:ss where HH is 00 - 23 hours."/><font size="1">&nbsp;<label><bean:message key="jobs.startTimeFormat" bundle="jobs"/></label></font>
												</div>
                                </td>
                          	</tr>
                            <tr>
                            	<td colspan="5" height="10">&nbsp;</td>
                            </tr>
                            <tr>
                            	<td align="right" style="padding-right:5px"><label class="label"><bean:message key="jobs.jobType" bundle="jobs"/></label><label class="error">*</label><b>:</b></td>
                                <td align="left">
                                		<select  id="jobType" dojoType="dijit.form.FilteringSelect"name="jobType" autocomplete="off" onChange="javascript:statusChange();" value="<bean:write name="uRLExtractorForm" property="jobType" />">
                                                <option value="-1"><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
                                                <logic:present name="allJobsTypesList">
                                                <logic:iterate name="allJobsTypesList" id="allJobsTypesDtls">
                                                <option value="<bean:write name="allJobsTypesDtls" property="key"/>">
                                                    <bean:message  bundle="jobs" name="allJobsTypesDtls" property="value" />
                                                </option>
                                                </logic:iterate>
                                                </logic:present>
                                            </select> 
                                		
                                </td>
                                <td >&nbsp;</td>
                                <td align="right" style="padding-right:5px"><label class="label">Listener:</label></td>
                                <td align="left">
                                	<input type="text"  id="listener" name="listener"  class="medium1" style="height:1.7em;width:210px;" autocomplete="off"	dojoType="dijit.form.ValidationTextBox" trim="true" ucfirst="true" <%if (readOnly) {%> disabled=true <%}%>/>
                                </td>
                          	</tr>
                            <tr>
                            	<td colspan="5" height="10">&nbsp;</td>
                            </tr>
                           <%if(AdminConfigUtils.isClustered()&& showCheckBox){%>
                            <tr>
                            	<td align="right" style="padding-right:5px"><label class="label"><bean:message key="jobs.commonJob" bundle="jobs"/>:</label></td>
                                <td align="left"><html:checkbox  name="uRLExtractorForm" property="commonJobFlag" onclick="checkBoxAlert(this);" disabled="<%=checkboxstatus%>"></html:checkbox></td>
                                <td >&nbsp;</td>
                                <td align="right" style="padding-right:5px">&nbsp;</td>
                                <td align="left">&nbsp;</td>
                          	</tr>
                            <tr>
                            	<td colspan="5" height="10">&nbsp;</td>
                            </tr>
                            <%}%>
                         </table>
                    
						
					</td>
				</tr>
				
			</table>    
		</td>
	</tr>
	
	
	<tr>
		<html:hidden  property="id" name="uRLExtractorForm"  />
		<td style="padding-left:65px;align:left;">
			<table cellspacing="0" cellpadding="0" border="0" align="left" width="780" >
				<tr>
					<td width="35%">
						<table cellpadding="10" cellspacing="" border="0" width="100%"  id="recurrenceLabelDtls" style="display:none">
							<tr>
								<td height="27" align="left"  colspan="2" >
									  <label><b><bean:message key="jobs.recur.recurranceLabel" bundle="jobs"/></b></label>
								</td>					
							</tr>     				
						</table>
					</td> 
					<td style="padding-left:60px">
					</td>			
				</tr>
			</table>
		</td>
	</tr>

	<!---   DIV Started for AFTER SERVER START JOB  -->
	<tr id="afterServerStartDivDtls" style="display:none">
		<td style="padding-left:65px;align:left;" >
			<table cellspacing="0" cellpadding="0" border="0" align="left" width="100%">
				<tr>
					<td>
					<table width="auto" cellpadding="0" cellspacing="0" align="left" border="0">
						<tr>
							<td height="27" align="left" width="100px">
								<input type="radio" dojoType="dijit.form.RadioButton" name="afterServerStartsPattern" id="afterServerStartsPatternEvery" autocomplete="off" value="selectedAfterServerStartsEvery" onClick="resetAfterServerStartsFormValues()"/><label><b><bean:message key="jobs.recur.everyLabel" bundle="jobs"/></b></label>
							</td>                                                                      
							<td>
								<input type="text"   id="interval" name="interval" autocomplete="off" style="width:100px;height:1.7em" dojoType="dijit.form.ValidationTextBox" required="false" invalidMessage="Invalid Number" maxlength="10" onkeyup="return setFocus();"/>
							</td>
							<td>
								<select  id="intervalType" dojoType="dijit.form.FilteringSelect"  name="intervalType" autocomplete="off"   onChange="return setFocus();" value='<bean:write name="uRLExtractorForm" property="intervalType" />'>
									<option value=""><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
									<logic:present name="allIntervalsSimpleList">    
									<logic:iterate name="allIntervalsSimpleList" id="allIntervalsDtls">
										<option value="<bean:write name="allIntervalsDtls" property="key"/>">
											<bean:message  bundle="jobs" name="allIntervalsDtls" property="value" />
										</option>
									</logic:iterate>
									</logic:present>
								</select>  
							</td>
						</tr>
						<tr>
							<td>
								<input type="radio" autocomplete="off" dojoType="dijit.form.RadioButton" name="afterServerStartsPattern" id="afterServerStartsPatternOnce" value="selectedAfterServerStartsOnce" onClick="resetAfterServerStartsFormValues()"/><label><b><bean:message key="jobs.recur.onceLabel" bundle="jobs"/></b></label>
							</td>
						</tr>
					</table>
					<table width="auto" cellpadding="0" cellspacing="0" align="left" border="0">
								<tr>
									<td id="td_simpletriggernotestserverstart" name="td_simpletriggernotestserverstart" height="auto" width="450px"> 
										<font class="simpletriggernote">
												<bean:message key="job.dst.message" bundle="jobs"/>
										</font>	
									</td>
								</tr>
					</table>
					</td>           
				</tr>
			</table>
		</td>   
	</tr>
	<!---   DIV Ended for AFTER SERVER START JOB  -->

	<!---   DIV Started for EXPRESSION JOB  -->
	<tr id="expressionDivDtls" style="display:none">
		<td style="padding-left:65px;align:left;" >
			<table cellspacing="0" cellpadding="0" border="0" align="left" width="100%">
				<tr>
					<td>
					<table cellpadding="0"  border="0" >
						<tr>
							<td>
								 <label class="label"><bean:message key="jobs.recur.expressionLabel" bundle="jobs"/></label>&nbsp;<label class="error">* </label><label class="label"><b>:</b></label>
							</td>
							<td>
								<input type="text"   id="expression" name="expression" autocomplete="off" style="height:1.7em" dojoType="dijit.form.ValidationTextBox" required="false" trim="true"  />
							</td>
						</tr>               
					</table>
					</td> 
				</tr>
			</table>
		</td>   
	</tr>
	<!---   DIV Ended for EXPRESSION JOB  -->

	<!---   DIV Started for ABSOLUTE JOB  -->
	<tr id="absoluteDivDtls" style="display:none">
		<td style="padding-left:65px;align:left;" >
			<table cellspacing="0" cellpadding="0" border="0" align="left" width="100%">
				<tr>
					<td>
					<table cellpadding="0"  border="0" width="auto">
						<tr>
							<td>
								<select  id="cronTypeId" dojoType="dijit.form.FilteringSelect"  name="cronTypeId" autocomplete="off"  onChange="resetAbsoluteFormValues()" value="">
									<option value=''><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
									<logic:present name="allIntervalsCronList">    
									<logic:iterate name="allIntervalsCronList" id="cronTriggerMasterDtls">
										<option value="<bean:write name="cronTriggerMasterDtls" property="key"/>">
											<bean:message  bundle="jobs" name="cronTriggerMasterDtls" property="value"  />
										</option>
									</logic:iterate>
									</logic:present>
								</select>  
							</td>
							<td width="13px">&nbsp;            
							</td>
							<!--  SECONDS / MINUTES / HOURS  PATTERN -->                    
							<td id="absoluteIntervalSMHDIVLabelDtls" style="display:none">
								<label class="label"><b><bean:message key="jobs.recur.everyLabel" bundle="jobs"/></b></label>&nbsp;<label class="error">*</label><b>:</b>
							</td>
							<td id="absoluteIntervalSMHDIVComponentDtls" style="display:none">
								<input type="text"  id="absoluteInterval" name="absoluteInterval" autocomplete="off" style="height:1.7em;" dojoType="dijit.form.ValidationTextBox" maxlength="10"/> 
							</td>
							<!--  DAILY PATTERN -->
							<td id="absoluteIntervalDailyDIVLabelDtls" style="display:none">
								<table border="0" width="auto">
									<tr>
										<td width="70px">
											<input type="radio" dojoType="dijit.form.RadioButton" name="absoluteDailyPattern" id="absoluteDailyPatternEveryDay" autocomplete="off" value="selectedAbsoluteDailyPatternEveryDay" onClick="resetAbsoluteDailyPatternFormValues()" /><label><b><bean:message key="jobs.recur.everyLabel" bundle="jobs"/></b></label>
										</td>
										<td>
											<input type="text"  id="absoluteDailyInterval" name="absoluteDailyInterval" style="height:1.7em;width:100px;" autocomplete="off" dojoType="dijit.form.ValidationTextBox" maxlength="2" onkeyup="return setdailyFocus();"/> <label><b><bean:message key="jobs.recur.daysLabel" bundle="jobs"/></b></label>
										</td>
									</tr>
									
									<tr>
										<td colspan="2">
											<input onClick="resetAbsoluteDailyPatternFormValues()" type="radio" dojoType="dijit.form.RadioButton" name="absoluteDailyPattern" id="absoluteDailyPatternEveryWeekDay" autocomplete="off" autocomplete="off" value="selectedAbsoluteDailyPatternEveryWeekDay" /><label><b><bean:message key="jobs.recur.weekdaysLabel" bundle="jobs"/></b></label>
										</td>                               
									</tr>
								</table>
							</td>

							<!--  WEEKLY PATTERN -->
							<td id="absoluteIntervalWeeklyDIVLabelDtls" style="display:none">
								<table border="0" width="320px">
									<tr>
										<td  colspan="2">
											<b><label><bean:message key="jobs.recur.recureveryweekonLabel" bundle="jobs"/>:</label></b>
										</td>
									</tr>
									<tr>
										<td colspan="2">
											<input type='checkbox'  dojotype='dijit.form.CheckBox' name="absoluteWeeklyPatternSunday" id="absoluteWeeklyPatternSunday" autocomplete="off" value="absoluteWeeklyPatternSunday" /><label><bean:message key="job.cron.day.type.sunday" bundle="jobs"/></label>
											<input type='checkbox'  dojotype='dijit.form.CheckBox' name="absoluteWeeklyPatternMonday" id="absoluteWeeklyPatternMonday" autocomplete="off" value="absoluteWeeklyPatternMonday" /><label><bean:message key="job.cron.day.type.monday" bundle="jobs"/></label>
											<input type='checkbox'  dojotype='dijit.form.CheckBox' name="absoluteWeeklyPatternTuesday" id="absoluteWeeklyPatternTuesday" autocomplete="off" value="absoluteWeeklyPatternTuesday" /><label><bean:message key="job.cron.day.type.tuesday" bundle="jobs"/></label>
											<input type='checkbox'  dojotype='dijit.form.CheckBox' name="absoluteWeeklyPatternWednesday" id="absoluteWeeklyPatternWednesday" autocomplete="off" value="absoluteWeeklyPatternWednesday" /><label><bean:message key="job.cron.day.type.wednesday" bundle="jobs"/></label>
										</td>
									</tr>
									<tr>
										<td colspan="2">
											<input type='checkbox'  dojotype='dijit.form.CheckBox' name="absoluteWeeklyPatternThursday" id="absoluteWeeklyPatternThursday" autocomplete="off" value="absoluteWeeklyPatternThursday" /><label><bean:message key="job.cron.day.type.thursday" bundle="jobs"/></label>
											<input type='checkbox'  dojotype='dijit.form.CheckBox' name="absoluteWeeklyPatternFriday" id="absoluteWeeklyPatternFriday" autocomplete="off" value="absoluteWeeklyPatternFriday" /><label><bean:message key="job.cron.day.type.friday" bundle="jobs"/></label>
											<input type='checkbox'  dojotype='dijit.form.CheckBox' name="absoluteWeeklyPatternSaturday" id="absoluteWeeklyPatternSaturday" autocomplete="off" value="absoluteWeeklyPatternSaturday" /><label><bean:message key="job.cron.day.type.saturday" bundle="jobs"/></label>
										</td>
									</tr>
									
								</table>
							</td>

							<!--  MONTHLY PATTERN -->
							<td id="absoluteIntervalMonthlyDIVLabelDtls" style="display:none">
								<table border="0" width="720px">
									<tr>
										<td width="70px">
											<input type="radio" dojoType="dijit.form.RadioButton" name="absoluteMonthlyPattern" id="absoluteMonthlyPatternEveryDay" autocomplete="off" value="selectedAbsoluteMonthlyPatternEveryDay"  onClick="resetAbsoluteMonthlyPatternFormValues()" /><label><b><bean:message key="job.cron.day.type.day" bundle="jobs"/></b></label>
										</td>
										<td colspan="2" style="padding-left:5px">
											<input type="text"  id="absoluteMonthlyDayInterval" name="absoluteMonthlyDayInterval" autocomplete="off" style="height:1.7em;width:100px;" dojoType="dijit.form.ValidationTextBox" maxlength="2" onkeyup="return setmonthFocus();"/> <label><b><bean:message key="jobs.recur.ofeverymonthLabel" bundle="jobs"/></b></label> 
										</td>
									</tr>                         
									<tr>
										<td colspan="2">
											<input type="radio" dojoType="dijit.form.RadioButton" name="absoluteMonthlyPattern" id="absoluteMonthlyPatternEveryMonth" autocomplete="off" value="selectedAbsoluteMonthlyPatternEveryMonth" onClick="resetAbsoluteMonthlyPatternFormValues()"/><label><b><bean:message key="jobs.recur.theLabel" bundle="jobs"/></b></label>
										</td>
										<td>
											<select  id="absoluteMonthlyWeekType" dojoType="dijit.form.FilteringSelect"  name="absoluteMonthlyWeekType" autocomplete="off"  value=''  onChange="return setmonthFocus();">
												<option value=''><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
												<logic:present name="allWeekTypeMasterList">    
												<logic:iterate name="allWeekTypeMasterList" id="allWeekDtls">
													<option value="<bean:write name="allWeekDtls" property="id"/>">
														<bean:message  bundle="jobs" name="allWeekDtls" property="type" />
													</option>
												</logic:iterate>
												</logic:present>
											</select>  
										</td>
										<td>
											<select  id="absoluteMonthlyDayType" dojoType="dijit.form.FilteringSelect"  name="absoluteMonthlyDayType" autocomplete="off"  value='' onChange="return setmonthFocus();">
												<option value=''><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
												<logic:present name="allDayTypeMasterList">    
												<logic:iterate name="allDayTypeMasterList" id="allDayDtls">
													<option value="<bean:write name="allDayDtls" property="id"/>">
														<bean:message  bundle="jobs" name="allDayDtls" property="type" />
													</option>
												</logic:iterate>
												</logic:present>
											</select><label><b><bean:message key="jobs.recur.ofeverymonthLabel" bundle="jobs"/></b></label>
										</td>
									</tr>
								</table>
							</td>

							<!--  YEARLY PATTERN -->
							<td id="absoluteIntervalYearlyDIVLabelDtls" style="display:none">
								<table border="0" width="720px">
									<tr>
										<td width="70px">
											<input type="radio" dojoType="dijit.form.RadioButton" name="absoluteYearlyPattern" id="absoluteYearlyPatternEveryMonth" autocomplete="off" value="selectedAbsoluteYearlyPattern" onClick="resetAbsoluteYearlyPatternFormValues()" /><label><b><bean:message key="jobs.recur.everyLabel" bundle="jobs"/></b></label>
										</td>
										<td colspan="2" style="padding-left:5px">
											 <select  id="absoluteYearlyMonthType" dojoType="dijit.form.FilteringSelect"  name="absoluteYearlyMonthType" autocomplete="off"  value='' onChange="return setyearFocus();">
												<option value=''><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
												<logic:present name="allMonthTypeMasterList">    
												<logic:iterate name="allMonthTypeMasterList" id="allMonthDtls">
													<option value="<bean:write name="allMonthDtls" property="id"/>">
														<bean:message  bundle="jobs" name="allMonthDtls" property="type" />
													</option>
												</logic:iterate>
												</logic:present>
											</select>
										</td>
										<td colspan="1" >
											<input type="text"  id="absoluteYearlyDayInterval" name="absoluteYearlyDayInterval" autocomplete="off" style="height:1.7em;width:100px;" dojoType="dijit.form.ValidationTextBox" maxlength="2" onkeyup="return setyearFocus();"/>  
										</td>                               
									</tr>
									<tr>
										<td colspan="2">
											<input type="radio" dojoType="dijit.form.RadioButton" name="absoluteYearlyPattern" id="absoluteYearlyPatternEveryMonthDay" autocomplete="off" value="selectedAbsoluteYearlyPatternEveryMonthDay" onClick="resetAbsoluteYearlyPatternFormValues()"/><label><b><bean:message key="jobs.recur.theLabel" bundle="jobs"/></b></label>
										</td>
										<td>
											<select  id="absoluteYearlyMonthlyWeekType" dojoType="dijit.form.FilteringSelect"  name="absoluteYearlyMonthlyWeekType" autocomplete="off"  value='' onChange="return setyearFocus();">
												<option value=''><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
												<logic:present name="allWeekTypeMasterList">    
												<logic:iterate name="allWeekTypeMasterList" id="allWeekDtls">
													<option value="<bean:write name="allWeekDtls" property="id"/>">
														<bean:message  bundle="jobs" name="allWeekDtls" property="type" />
													</option>
												</logic:iterate>
												</logic:present>
											</select>  
										</td>
										<td>
											<select  id="absoluteYearlyMonthlyDayType" dojoType="dijit.form.FilteringSelect"  name="absoluteYearlyMonthlyDayType" autocomplete="off"  value='' onChange="return setyearFocus();">
												<option value=''><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
												<logic:present name="allDayTypeMasterList">    
												<logic:iterate name="allDayTypeMasterList" id="allDayDtls">
													<option value="<bean:write name="allDayDtls" property="id"/>">
														<bean:message  bundle="jobs" name="allDayDtls" property="type" />
													</option>
												</logic:iterate>
												</logic:present>
											</select> <b> of</b>
										</td>
										<td>
											 <select  id="absoluteYearlyMonthlyMonthType" dojoType="dijit.form.FilteringSelect"  name="absoluteYearlyMonthlyMonthType" autocomplete="off"  value='' onChange="return setyearFocus();">
												<option value=''><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
												<logic:present name="allMonthTypeMasterList">    
												<logic:iterate name="allMonthTypeMasterList" id="allMonthDtls">
													<option value="<bean:write name="allMonthDtls" property="id"/>">
														<bean:message  bundle="jobs" name="allMonthDtls" property="type" />
													</option>
												</logic:iterate>
												</logic:present>
											</select>
										</td>
									</tr>
								</table>
							</td>
							<td id="td_simpletriggernote" name="td_simpletriggernote" height="auto" width="450px" style="display:none;" > 
									<font class="simpletriggernote">
										<bean:message key="job.dst.message" bundle="jobs"/>
									</font>	
							</td>
						</tr>               
					</table>
					</td> 
				</tr>
			</table>
		</td>   
	</tr>
	<!---   DIV Ended for ABSOLUTE JOB  -->
	<tr>
		<td style="padding-left:67px;">
			<div id="div2" style="display:block;" width="80%">
				<% if (!readOnly) { %>
				<table class="tableBgColor"  width = "54.9%">		
				<%} else if (!StringUtils.isNull(tmp) && tmp.equals("delete")) { %>
				<table class="tableBgColor"  width = "55.5%">        
				<% } else { %>
				<table class="tableBgColor"  width = "55.4%">			
				<%}%>
					<tr height="10px">
						<td>&nbsp;
						</td>
					</tr>
					<tr>
						<td class="pageTitle " style="padding-left:30px;align:left;">
							<bean:message key="jobs.urlExtractorFieldset" bundle="jobs"/>
						</td>
					</tr>   
					<tr>
					   <td class="paddingTitleDesc" style="padding-left:30px;">
						 <bean:message key="jobs.urlExtractor.description" bundle="jobs"/>
						</td>  
					</tr>
					<tr>
						<td height="13" colspan="8" align="left" class=""></td>
					</tr>
					<tr>
						<td style="padding-left:0px;width="900px">
							<table cellspacing="0" cellpadding="0" width="100%" >
								<tr>
									<td style="padding-left:0px;align:left;">
										<table cellspacing="0" cellpadding="0" border="0" align="left" >
											<tr>
												<td>
													<table cellpadding="10" cellspacing="" border="0" width="100%">
														<tr>
															<td height="27" align="right"  style="width:172px;" nowrap="nowrap" >
																<label class="label"><bean:message key="jobs.urls" bundle="jobs"/></label><label class="error">*</label><b>:</b>
															</td>
															<td style="align:left;" width="350px" nowrap="nowrap">
																<table id="mytable1">
																	<%
																	if(urlCount != 0) {
																		String urls[] = (String[]) session.getAttribute("urls");
																		for(int count = 0; count < urlCount ; count++) {
																			String urlName ="url" + (count+1);
																			int prefixVal =  (count+1); 
																			if(count == 0){
																	%>  
																	<script >addedURLRowsNumbers = '1,' ;</script>   
																			<%}%>
																		<tr>
																			<td style="padding-left:2px;align:left;">                                                          
																				<input type="text"  id="<%=urlName%>" name="<%=urlName%>" style="width=300px;height:1.7em" autocomplete="off" dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true" invalidMessage="Invalid URL.  Be sure to include the scheme, http://..."  value="<%=urls[count]%>"/>        
																				<%if(count == 0 ) {
																					if(!readOnly) {%>
																						<a href="#" onClick="javascript:addRow('mytable1');"><img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_plus_1.png"  / ></a> 
																					<%}
																				} else {
																					if(!readOnly) {%>
																						<a href="#" onClick="javascript:removeRow('mytable1',this.parentNode.parentNode,'<%=prefixVal%>')"><img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_dash_1.png" / ></a> 
																					<%}
																				}
																		}
																	} else {%>
																		<input type="text"  id="url1" name="url1" style="height:1.7em;width=300px;" autocomplete="off" dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true" invalidMessage="Invalid URL.  Be sure to include the scheme, http://..."  value=""   />        
																		<%if(!readOnly){%>
																			<a href="#" onClick="javascript:addRow();"><img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_plus_1.png"  / ></a> 
																			</td>
																		</tr>                                                                                          
																		<%}
																	}%>
																</table>                    
															</td>
														</tr>       
													</table>
												</td> 
												<td style="width:30px;">
												</td>       
												<td align="center">
													<table cellpadding="" cellspacing="0" border="0">
														<tr>
															<td height="27" align="right" style="width:100;">
															</td>                
														</tr>
													</table>    
												</td>
											</tr>
										</table>
									</td>   
								</tr>
							</table>    
						</td>
					</tr>
					<tr>
						<td height="13" colspan="8" align="left" class=""></td>
					</tr>            
					<tr>
						<td style="padding-left:30px;width="900px">
							<table cellspacing="0" cellpadding="0" width="100%" >
								<tr>
									<td style="padding-left:0px;align:left;">
										<table cellspacing="0" cellpadding="0" border="0" align="left">
											<tr>
												<td>
                                                    <table cellpadding="10" cellspacing="" border="0" width="100%">
														<tr>
															<td height="27" align="right"  style="width:140px;" nowrap="nowrap" >
																<label class="label"><bean:message key="jobs.destination" bundle="jobs"/></label><label class="error">*</label><b>:</b></td>
																<td style="padding-left:2px;align:left;width:140px;">
																	<input type="text" id="destination" name="destination" style="width:300px;height:1.7em;" autocomplete="off" dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true" value="<bean:write name="uRLExtractorForm" property="destination" />"  />  
																</td>
                                                        </tr>       
                                                    </table>
												</td> 
												<td style="width:30px;">
												</td>       
												<td align="center">
                                                    <table cellpadding="" cellspacing="0" border="0">
                                                        <tr>
                                                            <td height="27" align="right" style="width:100px;">
                                                                </td>                
                                                        </tr>
                                                    </table>    
												</td>
											</tr>
										</table>
									</td>   
								</tr>
							</table>    
						</td>
					</tr>
					<tr>
						<td height="13" colspan="8" align="left" class=""></td>
					</tr>            
					<tr>
						<td style="padding-left:30px;width="900px">
							<table cellspacing="0" cellpadding="0" width="100%" >
								<tr>
									<td style="padding-left:0px;align:left;">
										<table cellspacing="0" cellpadding="0" border="0" align="left">
											<tr>
												<td>
													<table cellpadding="10" cellspacing="" border="0" width="100%">
														<tr>
															<td height="27" align="right"  style="width:145px;" nowrap="nowrap" >
																<label class="label"><bean:message key="jobs.urlsTimeOut" bundle="jobs"/>:</label>
															</td> 
															<td style="padding-left:2px;align:left;width:140;">
																<input type="text" id="urlTimeOut" name="urlTimeOut" style="width:300px;height:1.7em;" autocomplete="off" dojoType="dijit.form.NumberTextBox" constraints="{min:0,max:86400,places:0}" invalidMessage="The value entered is invalid" value="<bean:write name="uRLExtractorForm" property="urlTimeOut" />" />    
															</td>
														</tr>       
													</table>
												</td> 
												<td style="width:30px;">
												</td>       
												<td align="center">
													<table cellpadding="" cellspacing="0" border="0">
														<tr>
															<td height="27" align="right" style="width:100;">
															</td>                
														</tr>
													</table> 
												</td>
											</tr>
										</table>
									</td>   
								</tr>
							</table>    
						</td>
					</tr>				
					<tr>
						<td height="13" colspan="8" align="left" class="bodytext"></td>
					</tr>
					<tr>
						<td style="padding-left:30px;width="900px">
							<table cellspacing="0" cellpadding="0" width="100%" >
								<tr>
									<td style="padding-left:0px;align:left;">
										<table cellspacing="0" cellpadding="0" border="0" align="left">
											<tr>
												<td>
													<table cellpadding="10" cellspacing="" border="0" width="100%">
														<tr>
															<td height="27" align="right" style="width:145px;"  nowrap="nowrap" >
																<label class="label"><bean:message key="jobs.userId" bundle="jobs"/></label><b>:</b>
															</td>
															<td height="27" align="left"  style="width:130px;padding-left:2px" nowrap="nowrap"  >
																<input type="text"  id="userId" name="userId" class="medium" style="height:1.7em;" autocomplete="off" dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true" value="<bean:write name="uRLExtractorForm" property="userId"/>"   />        
															</td>
														</tr>       
													</table>
												</td> 
												<td style="width:30px;">
												</td>       
												<td align="left">
													<table cellpadding="0" cellspacing="0" border="0" width="100%">
														<tr>
															<td height="27" align="right" style="padding-right:0px;width:60px;">
																<label class="label"><bean:message key="jobs.password" bundle="jobs"/></label><b>:</b>
															</td>
															<td height="27" align="left" style="padding-left:10px;width:30px;">
																<input type="password"  id="password" name="password" class="medium"  onclick="resetFieldById('password')" autocomplete="off" dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true" value="<bean:write name="uRLExtractorForm" property="password"/>"   />        
															</td>                
														</tr>   
													</table> 
												</td>
											</tr>
										</table>
									</td>   
								</tr>
							</table>    
						</td>
					</tr>
					<tr>
						<td height="13" colspan="8" align="left" class=""></td>
					</tr>
					<tr>
						<td style="padding-left:30px;width="900px">
							<table cellspacing="0" cellpadding="0" width="100%" >
								<tr>
									<td style="padding-left:0px;align:left;">
										<table cellspacing="0" cellpadding="0" border="0" align="left">
											<tr>
												<td>
                                                    <table cellpadding="10" cellspacing="" border="0" width="100%">
                                                        <tr>
                                                            <td height="27" align="left"  style="width:280px;" nowrap="nowrap" >
																<html:checkbox  name="uRLExtractorForm" property="overwrite" disabled="<%=readOnly%>" ></html:checkbox>
																 <label class="label"><bean:message key="jobs.overwrite" bundle="jobs"/></label>
																<html:checkbox  name="uRLExtractorForm" property="extract" disabled="<%=readOnly%>" ></html:checkbox>                
																 <label class="label"><bean:message key="jobs.extract" bundle="jobs"/></label>
                                                            </td>
														</tr>      
                                                    </table>
												</td> 
												<td style="width:30px;">
												</td>       
												<td align="left">
                                                    <table cellpadding="10" cellspacing="0" border="0">
                                                        <tr>
                                                            <td height="27" align="left" style="padding-right:0px;width:400;" nowrap="nowrap">
																<html:checkbox  name="uRLExtractorForm" property="extractChildDirectory" disabled="<%=readOnly%>" ></html:checkbox>                
                                                                <label class="label"><bean:message key="jobs.extractChildDir" bundle="jobs"/></label>
																<html:checkbox  name="uRLExtractorForm" property="deleteSourceFile" disabled="<%=readOnly%>" ></html:checkbox>                                      
                                                                <label class="label"><bean:message key="jobs.delSrcFile" bundle="jobs"/></label>
                                                            </td>                
                                                        </tr>
                                                    </table>    
												</td>
											</tr>
										</table>
									</td>   
								</tr>
							</table>    
						</td>
					</tr>
				</table>    
			</div>
        </td>
    </tr>
</table>
<table width="100%">
	<tr id="dependentTaskPanel" style="display:none">
		<td style="padding-left:67px;">
			<table class="tableBgColor"  border="0">
				<tr>
					<td>
						<table>
							<tr height="10px">
								<td>&nbsp;
								</td>
							</tr>
							<tr>
								<td class="pageTitle paddingTitle">
									Dependent Tasks
								</td>
							</tr>
							<tr>
								<td class="paddingTitleDesc">
									<strong>Provides provision to add dependent tasks</strong>
								</td>
							</tr>
						</table>
					</td>
				</tr>
							<tr height="10px">
											<td>&nbsp;
											</td>
							</tr>
							<tr>
								<td style="padding-left:30px;">
									
									<table  id="dependentTaskTable"  >
									<tr id="header">
														<th></th>
														<th><label class="label" valign= "bottom" >Task</label><label class="error">*</label><b>:</b></th>
														<th><label class="label"><bean:message key="jobs.run" bundle="jobs"/></label><label class="error">*</label><b>:</b></th>
														<th><label class="label">Type</label><label class="error">*</label><b>:</b></th>
														<th><label class="label" ><bean:message key="jobs.parameters" bundle="jobs"/>&nbsp;(<bean:message key="jobs.suggestParamsinshort" bundle="jobs"/>)</label><b>:</b></th>
														<th></th>
										</tr>				
									<%if (taskCount == -1 || taskCount == 0) {%>
										<script>addedDependentTasksNumbers = '1,';</script>
										<tr id="row1">				
											<td id="jobOrder1">
											<%if (!readOnly) {%>
												<input type="radio" name="jobOrder" onclick="validate()" style="align:center" autocomplete="off"/>	
											<% } %>
											</td>
											<td>
												<select  id="availableTasks1" dojoType="dijit.form.FilteringSelect"  name="availableTasks1"    autocomplete="off" <%if (readOnly) {%> disabled=true <%}%>>
													<option value=" ">
														<bean:message key="validation.msg.select" bundle="splchvalidation"/>
													</option>
													<logic:notEmpty name="allTasksList">
														<logic:iterate name="allTasksList" id="allTaskDtls">
															<option value='<bean:write name="allTaskDtls" property="id"/>'>
																<bean:write name="allTaskDtls" property="name"/>
															</option>
														</logic:iterate>
													</logic:notEmpty>
												</select>
											</td>
											<td>
												<select  id="availableTaskRunType1"    dojoType="dijit.form.FilteringSelect"  name="availableTaskRunType1"    autocomplete="off"   value='<bean:write name="uRLExtractorForm" property="availableTaskRunType1" />'
													<%if (readOnly) {%> disabled=true <%}%>>
													<option value=""><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
													<option value="1">Once</option>
													<option value="2">Everytime</option>
												</select>
											</td>
											<td>
											<select  id="availableTaskType1"    dojoType="dijit.form.FilteringSelect"  name="availableTaskType1"    autocomplete="off"   value='<bean:write name="uRLExtractorForm" property="availableTaskType1" />'
												<%if (readOnly) {%> disabled=true <%}%>>
													<option value=""><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
													<option value="1">Pre</option>
													<option value="2">Post</option>
												</select>
											</td>
											<td>
												<textarea dojoType="dijit.form.SimpleTextarea" rows="5" cols="30" id="availableTaskParamMap1" style="height:1.7em;width:20em" name="availableTaskParamMap1" <%if (readOnly) {%> disabled=true <%}%>></textarea>
											</td>
											<td>
												<%if (!readOnly) {%>
												<a href="#" onClick="javascript:removeDependentRow('dependentTaskTable',this.parentNode.parentNode,1)"><img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_dash_1.png"/></a>
												<% } %>
											</td>
										</tr>
									<% } else {
											java.util.List allTasksList = (java.util.List) session.getAttribute("allTasksList");
											for (int i = 0; i < taskCount; i++) {
												String taskName = dependenttasks.getDependenttask(i).getName();
												String taskType = dependenttasks.getDependenttask(i).getTasktype();
												String runType = dependenttasks.getDependenttask(i).getRuntype();
												String taskParam = dependenttasks.getDependenttask(i).getParameters();
												if(taskParam == null || taskParam.equalsIgnoreCase("null")){
													taskParam = "";
												}
												int suffixInt = i + 1;
												String jobOrder="jobOrder"+suffixInt;
                                        %>
										
										<tr id="<%=suffixInt%>">
											<td id="<%=jobOrder%>">
											<%if (!readOnly) {%>
												<input type="radio" name="jobOrder" onclick="validate()" >
											<% } %>
											</td> 
											<td>
												<select  id="availableTasks<%=suffixInt%>" dojoType="dijit.form.FilteringSelect"  name="availableTasks<%=suffixInt%>"    autocomplete="off" <%if (readOnly) {%> disabled=true <%}%>>
													<option value=" ">
														<bean:message key="validation.msg.select" bundle="splchvalidation"/>
													</option>
													<%
                                                    for (int count = 0; count < allTasksList.size(); count++) {
                                                    	com.spacetimeinsight.db.scheduler.model.StiJob jobBean = (com.spacetimeinsight.db.scheduler.model.StiJob) allTasksList.get(count);
													%>
													<option value="<%=jobBean.getId()%>"<%if (taskName.equals(jobBean.getName())) {%>
														selected="selected" <%}%>><%=ESAPI.encoder().encodeForHTML(jobBean.getName())%></option>
													<%}%>
												</select>
											</td>
											<td>
												<select  id="availableTaskRunType<%=suffixInt%>"    dojoType="dijit.form.FilteringSelect"  name="availableTaskRunType<%=suffixInt%>"    autocomplete="off"    <%if (readOnly) {%> disabled=true <%}%>>
													<option value="" <%if (runType.equals("")) {%>selected="selected" <%}%>><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
													<option value="1" <%if (runType.equals("1")) {%>selected="selected" <%}%>>Once</option>
													<option value="2" <%if (runType.equals("2")) {%>selected="selected" <%}%>>Everytime</option>
												</select>
											</td>
											<td>
											<select  id="availableTaskType<%=suffixInt%>"    dojoType="dijit.form.FilteringSelect"  name="availableTaskType<%=suffixInt%>"    autocomplete="off"    <%if (readOnly) {%> disabled=true <%}%>>
													<option value="" <%if (taskType.equals("")) {%>selected="selected" <%}%>><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
													<option value="1" <%if (taskType.equals("1")) {%>selected="selected" <%}%>>Pre</option>
													<option value="2" <%if (taskType.equals("2")) {%>selected="selected" <%}%>>Post</option>
												</select>
											</td>
											<td>
											<textarea dojoType="dijit.form.SimpleTextarea" rows="5" cols="30" id="availableTaskParamMap<%=suffixInt%>" style="height:1.7em;width:20em" name="availableTaskParamMap<%=suffixInt%>" <%if (readOnly) {%> disabled=true <%}%>><%=ESAPI.encoder().encodeForHTML(taskParam)%></textarea>
											</td>
											
											<td>
												<%if (!readOnly) {%>
														<a href="#" onClick="javascript:removeDependentRow('dependentTaskTable',this.parentNode.parentNode,<%=suffixInt%>)"><img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_dash_1.png"  / ></a>
													<% } %>
											</td>
										</tr>
									<% 		}
										}
									%>
									</table>
								</td>
								<td style="padding-top:20; padding-left:15;">
									<%if (!readOnly) {%>
									<table>
										<tr>
										   <td>
										  <button  onClick="javascript:addDependentTaskRow('dependentTaskTable'); validate();return false;" style="background:url(<%=ServerUtils.getContextName(request)%>/images/portal/icon_plus_1.png) no-repeat center center; width: 30px; height: 25px;" />
										  </td>
										</tr>
										<tr>
										  <td style="padding-top:3px;">
										  <button style='background:url(<%=ServerUtils.getContextName(request)%>/images/icon_arrow_up.png) no-repeat center center; display:none; width: 30px; height: 25px;'  id="up_on"  onClick="getSelected(1);return false;"/> 
										  <button style='background:url(<%=ServerUtils.getContextName(request)%>/images/icon_arrow_up_grey.png) no-repeat center center;width: 30px; height: 25px;'  id="up_off" onClick="return false;"/>
										  </td>
										</tr>
										<tr>
										  <td style="padding-top:3px;">
										<button style='background:url(<%=ServerUtils.getContextName(request)%>/images/icon_arrow_down.png) no-repeat center center; display:none; width: 30px; height: 25px;' id="down_on"  onClick="getSelected(2);return false;"/>
										<button style='background:url(<%=ServerUtils.getContextName(request)%>/images/icon_arrow_down_grey.png) no-repeat center center; width: 30px; height: 25px; '  id="down_off" onClick="return false;"/>
										 </td>
										</tr>
									</table>
									<% } %>
								</td>
							</tr>
							
						</table>
					</td>
				</tr>							
			</table>
		</td>
	</tr>
    <tr>
		<td style="width:100%">&nbsp;
		</td>
	</tr>
</table>
<table style = "padding-top:100px;" border="0" width="100%">
	<tr class="barColor">
		<td align="center" style="padding-left:122px;"> 
			<button dojoType="dijit.form.Button" type="button" id="idHome" name="btnHome" value="<bean:message key="jobs.home" bundle="jobs"/>" onClick="window.location= '<%=ServerUtils.getContextName(request)%>/adminMain.do' "> <bean:message key="jobs.home" bundle="jobs"/></button>
			<button dojoType="dijit.form.Button"  type="button"  id="idBack" name="btnBack" value="<bean:message key="jobs.back" bundle="jobs"/>" onClick="return submitForm(this);">
				<bean:message key="jobs.back" bundle="jobs"/> 
			</button>   
			<% if (!readOnly) { %>
			<button dojoType="dijit.form.Button" id="idUpdate" name="btnupdate" value="<bean:message key="jobs.save" bundle="jobs"/>" onClick="assignTotalNoOfEcos();assignTotalNoOfDependentTasks();return submitForm(this);" >
				<bean:message key="jobs.save" bundle="jobs"/>
			</button>  
			<button dojoType="dijit.form.Button" id="idReset" name="btnReset" onClick="resetValues()" >   
				<bean:message key="jobs.reset" bundle="jobs"/>
			</button>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<%}%>
			<% if (!StringUtils.isNull(tmp) && tmp.equals("delete")) { %>
			<button dojoType="dijit.form.Button" id="idDelete" name="btndelete" value='Delete' onClick="confirmationDialog('Do you want to delete the record?');" > 
				<bean:message key="jobs.delete" bundle="jobs"/>
			</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<%}%>
		</td>       
    </tr>
</table>
<input type="hidden" id = "totalNoOfUrls" name="totalNoOfUrls" value=""/>
<input type="hidden" id="operation" name="operation" value="">
<input type="hidden" name="commonJobFlag" id="commonJobFlag" value="<%=ESAPI.encoder().encodeForHTML(formObj.getCommonJobFlag())%>">
<input type="hidden" name="csrf" id="csrf" value="${csrf}"/>
<input type="hidden" id="totalNoOfDependentTasks" name="totalNoOfDependentTasks" value="" />
<input type="hidden" id="isTaskFlag" name="isTaskFlag" value="" />
<input type="hidden"  name="encryptedPassword" id="encryptedPassword" />
<input type="hidden"  name="virtualPassword" id="virtualPassword" />
</html:form>
<script>
dojo.addOnLoad(loadFormValues); 
function loadFormValues(){
	resetViewSimpleTriggerNote('none');  
	document.getElementById('encryptedPassword').value = '<bean:write name="uRLExtractorForm" property="encryptedPassword" />';
	document.getElementById('virtualPassword').value = '<bean:write name="uRLExtractorForm" property="password" />';
	dojo.byId('startTime').setAttribute('value', '<bean:write name="uRLExtractorForm" property="startTime" />');
    document.getElementById('startTime').value= '<bean:write name="uRLExtractorForm" property="startTime" />';
    dijit.byId('startDate').setDisplayedValue('<bean:write name="uRLExtractorForm" property="startDate" />');
	var status = false;
    if(<%= readOnly%>){
		status = true;              
    }
	dijit.byId('startTimeType').setAttribute('disabled', true);   
	dijit.byId('startTimeType').setValue('<bean:write name="uRLExtractorForm" property="startTimeType" />'); 
	if(dijit.byId('startTimeType').value == START_JOB_AFTER_SERVER_START){
		if('<bean:write name="uRLExtractorForm" property="afterServerStartsPattern" />' == 'EVERY'){
			dijit.byId('afterServerStartsPatternEvery').setAttribute('checked',true);
			dijit.byId('afterServerStartsPatternEvery').setAttribute('disabled',status);
			dijit.byId('afterServerStartsPatternOnce').setAttribute('disabled',status);
		}else if('<bean:write name="uRLExtractorForm" property="afterServerStartsPattern" />' == 'ONCE'){
			dijit.byId('afterServerStartsPatternOnce').setAttribute('checked',true);
			dijit.byId('afterServerStartsPatternEvery').setAttribute('disabled',status);
			dijit.byId('afterServerStartsPatternOnce').setAttribute('disabled',status);
		}
	}else if(dijit.byId('startTimeType').value == START_JOB_ABSOLUTE){
		dijit.byId('cronTypeId').setValue('<bean:write name="uRLExtractorForm" property="cronTypeId" />');
		dijit.byId('absoluteInterval').setValue('<bean:write name="uRLExtractorForm" property="absoluteInterval" />');
		dijit.byId('cronTypeId').setAttribute('disabled', status);
		dijit.byId('absoluteInterval').setAttribute('disabled', status);
		populateAbsoluteStartTypeValues('<bean:write name="uRLExtractorForm" property="cronTypeId" />', status);
	}else if(dijit.byId('startTimeType').value == START_JOB_EXPRESSION){
			dijit.byId('expression').setValue('<bean:write name="uRLExtractorForm" property="expression" />');
			dijit.byId('expression').setAttribute('disabled', status);
	}
	dojo.byId('interval').value = '<bean:write name="uRLExtractorForm" property="interval" />';
//	dijit.byId('intervalType').setValue('<bean:write name="uRLExtractorForm" property="intervalType" />');
    dijit.byId('description').setAttribute('disabled', status);     
    if(status){
		dijit.byId('startDate').setAttribute('disabled', status);   
	}   
	dijit.byId('jobType').setAttribute('disabled', true);
    dijit.byId('startTime').setAttribute('disabled', status);   
    dijit.byId('interval').setAttribute('disabled', status);    
    dijit.byId('intervalType').setAttribute('disabled', status);    
    dijit.byId('urlTimeOut').setAttribute('disabled', status); 
    dijit.byId('destination').setAttribute('disabled', status); 
    dijit.byId('userId').setAttribute('disabled', status);  
    dijit.byId('password').setAttribute('disabled', status);    
	dijit.byId('jobName').setAttribute('disabled', true);   
	dijit.byId('absoluteDailyPatternEveryDay').setAttribute('disabled',status);
	dijit.byId('absoluteDailyPatternEveryWeekDay').setAttribute('disabled',status);        
    var total = <%=urlCount%>;  
	for(count = 1;count <= total; count++) {
		if(count != 1)  {
			addedURLRowsNumbers    = addedURLRowsNumbers + count +',';                        
		}
		var ulrName = 'url' + count;
		dijit.byId(ulrName).setAttribute('disabled', status);  
	}

	var total = <%=taskCount%>;  
	for(count = 1;count <= total; count++) {
		addedDependentTasksNumbers = addedDependentTasksNumbers + count + ',';
	}
	
	dijit.byId('listener').setValue('<bean:write name="uRLExtractorForm" property="listener" />');
	dijit.byId('isTask').setAttribute('disabled', true);
	if('<bean:write name="uRLExtractorForm" property="isTask" />' == 'Y') {
		if(document.getElementById('isTaskFlag') != null){
			document.getElementById('isTaskFlag').value = 'Y';
		}
		dijit.byId('isTask').setAttribute('checked', true);
		dijit.byId('isTaskPresent').setAttribute('disabled', true);
		dijit.byId('startDate').setAttribute('disabled', true); 
		dijit.byId('startDate').setAttribute('class', 'overlay_alphacube');
		dijit.byId('startTime').setAttribute('disabled', true);  
		dijit.byId('startTime').setAttribute('class', 'overlay_alphacube');
		dijit.byId('listener').setAttribute('disabled','true');
		dijit.byId('listener').setAttribute('class', 'overlay_alphacube');   
	}else {
		if(document.getElementById('isTaskFlag') != null){
			document.getElementById('isTaskFlag').value = 'N';
		}
	}
	if('<bean:write name="uRLExtractorForm" property="isTaskPresent" />' == 'Y') {
		dijit.byId('isTaskPresent').setAttribute('checked', true);
	}
	addDependentTasksPanel(dijit.byId('isTaskPresent'),false);	
}

function populateAbsoluteStartTypeValues(cronTypeId, status){
	if(cronTypeId == REPEAT_TRIGGER_IN_DAILY){
		if('<bean:write name="uRLExtractorForm" property="absoluteDailyPattern" />' == 'selectedAbsoluteDailyPatternEveryDay'){
			dijit.byId('absoluteDailyPatternEveryDay').setAttribute('checked',true);
			dijit.byId('absoluteDailyInterval').setValue('<bean:write name="uRLExtractorForm" property="absoluteDailyInterval" />');
			dijit.byId('absoluteDailyPatternEveryWeekDay').setAttribute('disabled',status);
			dijit.byId('absoluteDailyInterval').setAttribute('disabled',status);
			resetViewSimpleTriggerNote('');
		}else if('<bean:write name="uRLExtractorForm" property="absoluteDailyPattern" />' == 'selectedAbsoluteDailyPatternEveryWeekDay'){
			dijit.byId('absoluteDailyPatternEveryWeekDay').setAttribute('checked',true);
			dijit.byId('absoluteDailyInterval').setAttribute('disabled',status);
			dijit.byId('absoluteDailyPatternEveryDay').setAttribute('disabled',status);
		}
	}
	if(cronTypeId == REPEAT_TRIGGER_IN_WEEKLY){
		if('<bean:write name="uRLExtractorForm" property="absoluteWeeklyPatternSunday" />' == 'absoluteWeeklyPatternSunday'){
			dijit.byId('absoluteWeeklyPatternSunday').setAttribute('checked',true);				
		}
		if('<bean:write name="uRLExtractorForm" property="absoluteWeeklyPatternMonday" />' == 'absoluteWeeklyPatternMonday'){
			dijit.byId('absoluteWeeklyPatternMonday').setAttribute('checked',true);				
		}
		if('<bean:write name="uRLExtractorForm" property="absoluteWeeklyPatternTuesday" />' == 'absoluteWeeklyPatternTuesday'){
			dijit.byId('absoluteWeeklyPatternTuesday').setAttribute('checked',true);			
		}
		if('<bean:write name="uRLExtractorForm" property="absoluteWeeklyPatternWednesday" />' == 'absoluteWeeklyPatternWednesday'){
			dijit.byId('absoluteWeeklyPatternWednesday').setAttribute('checked',true);
		}
		if('<bean:write name="uRLExtractorForm" property="absoluteWeeklyPatternThursday" />' == 'absoluteWeeklyPatternThursday'){
			dijit.byId('absoluteWeeklyPatternThursday').setAttribute('checked',true);			
		}
		if('<bean:write name="uRLExtractorForm" property="absoluteWeeklyPatternFriday" />' == 'absoluteWeeklyPatternFriday'){
			dijit.byId('absoluteWeeklyPatternFriday').setAttribute('checked',true);				
		}
		if('<bean:write name="uRLExtractorForm" property="absoluteWeeklyPatternSaturday" />' == 'absoluteWeeklyPatternSaturday'){
			dijit.byId('absoluteWeeklyPatternSaturday').setAttribute('checked',true);					
		}
		dijit.byId('absoluteWeeklyPatternSunday').setAttribute('disabled',status);
		dijit.byId('absoluteWeeklyPatternMonday').setAttribute('disabled',status);
		dijit.byId('absoluteWeeklyPatternTuesday').setAttribute('disabled',status);	
		dijit.byId('absoluteWeeklyPatternWednesday').setAttribute('disabled',status);	
		dijit.byId('absoluteWeeklyPatternThursday').setAttribute('disabled',status);	
		dijit.byId('absoluteWeeklyPatternFriday').setAttribute('disabled',status);
		dijit.byId('absoluteWeeklyPatternSaturday').setAttribute('disabled',status);	
	}
	if(cronTypeId == REPEAT_TRIGGER_IN_MONTHLY){
		if('<bean:write name="uRLExtractorForm" property="absoluteMonthlyPattern" />' == 'selectedAbsoluteMonthlyPatternEveryDay'){
			dijit.byId('absoluteMonthlyPatternEveryDay').setAttribute('checked',true);
			dijit.byId('absoluteMonthlyDayInterval').setValue('<bean:write name="uRLExtractorForm" property="absoluteMonthlyDayInterval" />');
			dijit.byId('absoluteMonthlyWeekType').setAttribute('disabled', true);
			dijit.byId('absoluteMonthlyDayType').setAttribute('disabled', true);
		}else if('<bean:write name="uRLExtractorForm" property="absoluteMonthlyPattern" />' == 'selectedAbsoluteMonthlyPatternEveryMonth'){
			dijit.byId('absoluteMonthlyPatternEveryMonth').setAttribute('checked',true);		
			dijit.byId('absoluteMonthlyWeekType').setValue('<bean:write name="uRLExtractorForm" property="absoluteMonthlyWeekType" />');
			dijit.byId('absoluteMonthlyDayType').setValue('<bean:write name="uRLExtractorForm" property="absoluteMonthlyDayType" />');
			dijit.byId('absoluteMonthlyDayInterval').setAttribute('disabled',true);
		}
		if(status){
			dijit.byId('absoluteMonthlyPatternEveryMonth').setAttribute('disabled',status);	
			dijit.byId('absoluteMonthlyWeekType').setAttribute('disabled', status);
			dijit.byId('absoluteMonthlyDayType').setAttribute('disabled', status);
			dijit.byId('absoluteMonthlyPatternEveryDay').setAttribute('disabled',status);
			dijit.byId('absoluteMonthlyDayInterval').setAttribute('disabled',status);
		}
	}
	if(cronTypeId == REPEAT_TRIGGER_IN_YEARLY){
		if('<bean:write name="uRLExtractorForm" property="absoluteYearlyPattern" />' == 'selectedAbsoluteYearlyPattern'){
			dijit.byId('absoluteYearlyPatternEveryMonth').setAttribute('checked',true);
			dijit.byId('absoluteYearlyMonthType').setValue('<bean:write name="uRLExtractorForm" property="absoluteYearlyMonthType" />');
			dijit.byId('absoluteYearlyDayInterval').setValue('<bean:write name="uRLExtractorForm" property="absoluteYearlyDayInterval" />');
			dijit.byId('absoluteYearlyMonthlyWeekType').setAttribute('disabled',true);
			dijit.byId('absoluteYearlyMonthlyDayType').setAttribute('disabled',true);
			dijit.byId('absoluteYearlyMonthlyMonthType').setAttribute('disabled',true);
		}else if('<bean:write name="uRLExtractorForm" property="absoluteYearlyPattern" />' == 'selectedAbsoluteYearlyPatternEveryMonthDay'){
			dijit.byId('absoluteYearlyPatternEveryMonthDay').setAttribute('checked',true);		
			dijit.byId('absoluteYearlyMonthlyWeekType').setValue('<bean:write name="uRLExtractorForm" property="absoluteYearlyMonthlyWeekType" />');
			dijit.byId('absoluteYearlyMonthlyDayType').setValue('<bean:write name="uRLExtractorForm" property="absoluteYearlyMonthlyDayType" />');
			dijit.byId('absoluteYearlyMonthlyMonthType').setValue('<bean:write name="uRLExtractorForm" property="absoluteYearlyMonthlyMonthType" />');
			dijit.byId('absoluteYearlyMonthType').setAttribute('disabled', true);
		    dijit.byId('absoluteYearlyDayInterval').setAttribute('disabled', true);
		}
		if(status){	
			dijit.byId('absoluteYearlyPatternEveryMonth').setAttribute('disabled',status);	
			dijit.byId('absoluteYearlyMonthType').setAttribute('disabled', status);
			dijit.byId('absoluteYearlyDayInterval').setAttribute('disabled', status);
			dijit.byId('absoluteYearlyPatternEveryMonthDay').setAttribute('disabled',status);
			dijit.byId('absoluteYearlyMonthlyWeekType').setAttribute('disabled',status);
			dijit.byId('absoluteYearlyMonthlyDayType').setAttribute('disabled',status);
			dijit.byId('absoluteYearlyMonthlyMonthType').setAttribute('disabled',status);
		}
	}
}

function resetValues(){	 
	window.location.href="<%=ServerUtils.getContextName(request)%>/configureJobSchdAction.do?operation=view&action=edit&jobsType=<%=String.valueOf(JobConstants.JOB_TYPE_URLEXTRACTOR)%>&selUrlExtractor=<bean:write name="uRLExtractorForm" property="id"/>"; 
} 
function submitForm(btn) {
	var isValidForSubmit;
	if(dijit.byId('idUpdate') != null && btn.value == dijit.byId('idUpdate').value){
		var startDateValue = dijit.byId('startDate').getValue();
		if(startDateValue === undefined){
			showEmptyDialog("Please provide correct format for Start Date", "Error");
		return  false;
		}
	}
	
	if(btn.value == dijit.byId('idBack').value){
		document.forms[0].action = "configureJobSchdAction.do?operation=view";                          
		document.forms[0].submit();
	}else if(btn.value == dijit.byId('idUpdate').value){
		if(!chkForSpecialChars()){
			return false;
		}
		if(!validateDependentTasks() || !validateCommonFields()) {
			return false;
		}
		isValidForSubmit = validateURLExtractorJob('fromUpdateMode');
		if(!isValidForSubmit) {
			return false;
		}
		if(checkIntervalValue()){		
			return false;
		}
		if(!checkValidPassword(dijit.byId('password').value,dojo.byId('virtualPassword').value,true,true)){
			dijit.byId('password').setValue('');
			return false;
		}
		if(!isValidUsernamePassword(dijit.byId('userId').value,dijit.byId('password').value)){
			showEmptyDialog("User ID should not be blank on providing password", "Error");
			return false;
		}
		dijit.byId('jobName').setAttribute('disabled', false);
		dijit.byId('startTimeType').setAttribute('disabled', false);

		if(!performSubmit()) {
			dijit.byId('jobName').setAttribute('disabled', true);
			dijit.byId('startTimeType').setAttribute('disabled', true);
		}
	}else{
	   if(!performSubmit()) {
			dijit.byId('jobName').setAttribute('disabled', true);
			dijit.byId('startTimeType').setAttribute('disabled', true);
		}
	}
}

var addedURLRowsNumbers = "1,";
var initial_count = new Array(); 
var rows_limit = 0;
var dbColumnsArray = [];
var rows_count = 0;

function addRow(table_id) { 
	columnList = {identifier:"column",items:dbColumnsArray};
	columnStore = new dojo.data.ItemFileReadStore({data: columnList});
	var tbl = document.getElementById(table_id);
	// counting rows in table 
	rows_count = tbl.rows.length; 
	if (initial_count[table_id] == undefined) { 
    // if it is first adding in this table setting initial rows count 
		initial_count[table_id] = rows_count; 
	} 
	//determining real count of added fields 
    var text = 'Text field'; 
	var tFielsNum = rows_count - initial_count[table_id]; 
	if (rows_limit!=0 && tFielsNum >= rows_limit) {
		return false;
	}
	var rowNumbersArray = new Array();          
	rowNumbersArray = addedURLRowsNumbers.split(',');
	var prefix = rowNumbersArray.length;
	addedURLRowsNumbers = addedURLRowsNumbers + prefix + ",";
	var urlName = "url" + prefix;

	try { 
		var newRow = tbl.insertRow(rows_count); 
		var newCell = newRow.insertCell(0); 
		var input = '&nbsp;<input type="text" id="'+ urlName +'" name="' + urlName + '" style="width:300px;height:1.7em;" autocomplete="off" dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true"   />' +        
			'<a href="#" onclick="javascript:removeRow(\'mytable1\',this.parentNode.parentNode,'+ prefix +')"><img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_dash_1.png"  / ></a>'; 
		newCell.innerHTML =input; 
	} catch (ex) { 
		alert(ex); 
	} 
}

function removeRow(tbl,row,prefix) { 
	var table = document.getElementById(tbl); 
	var rownum = row.rowIndex;
	try { 
		table.deleteRow(rownum); 
		delAddedRowsNumbers(prefix);    
	} catch (ex) { 
		alert(ex); 
	} 
} 

function delAddedRowsNumbers(tmp) {
    var rowNumbersArray = new Array(); 
    rowNumbersArray = addedURLRowsNumbers.split(',');
    for(countArr = 0;countArr < rowNumbersArray.length;countArr++) {
        var tmp1 = rowNumbersArray[countArr];
        if(tmp == tmp1) {
            rowNumbersArray[countArr] = 'n';
            break;
        }
    }
	addedURLRowsNumbers = rowNumbersArray.join(",");
}

function assignTotalNoOfEcos() {
    document.getElementById('totalNoOfUrls').value = addedURLRowsNumbers.split(',');
    return true;
}

function resetFieldById(fieldName) {
	document.getElementById(fieldName).value="";
}

function resetAbsoluteDailyPatternFormValues(){
	if(dijit.byId('absoluteDailyPatternEveryDay').checked){
		resetViewSimpleTriggerNote('');
	}else{
		resetViewSimpleTriggerNote('none');
	}
}
</script>
</body>
</html:html>