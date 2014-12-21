<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="com.spacetimeinsight.stas.privileges.services.PrivilegesConstants"%>
<%@page import="com.enterprisehorizons.magma.security.util.AccessHelper"%>
<%@page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@page import="com.enterprisehorizons.magma.security.util.EAccessAction"%>
<%@page import="com.spacetimeinsight.dynamicdatasource.IDynamicDatasourceManager"%>
<%@page import="com.spacetimeinsight.monitor.action.MonitorDBAction"%>
<%@page import="org.owasp.esapi.ESAPI"%>
<%@page import="org.apache.commons.lang.StringEscapeUtils"%>
<%@page import="com.spacetimeinsight.db.model.util.DataModelsCacheHelper"%>

<%@page import="com.spacetimeinsight.db.config.model.DatabaseConfigurations"%>
<%@ page import ="java.util.*" %>
<html>
<head>
	
	<%
		Boolean connectionStatus=(Boolean)request.getAttribute("CONNECTION_STATUS");
		String selectedDS = (String) request.getAttribute("SELECTED_DATASOURCE");
		String executeBtnStatusString = (String) request.getAttribute("ENABLE_EXECUTE_BUTTON");
		boolean executeBtnStatus = false;
		if(executeBtnStatusString != null && executeBtnStatusString.equals("TRUE")){
			executeBtnStatus = true;
		}
		UserBean userBean = (UserBean)request.getSession(false).getAttribute(ServerUtils.USER_BEAN_NAME);
		String moduleId      =(String) session.getAttribute(ServerUtils.PARAM_MODULE_ID); 
		boolean hasAccessDropTable = AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.MODEL_MAIN_QUERY_BROWSER,null,EAccessAction.DELETE_ACCESS);
	%>
<script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/dojo/dojo.js"
    djConfig="isDebug: false, parseOnLoad: true"></script>
<%@ include file="/common/dojo.jsp"%>
<script type="text/javascript">	
	var tableName=null;
	function showEmptyDialog(data2Display, dialogTitle){
               var  emptyDlg = new dijit.Dialog({
            title: "<bean:message key='admin.common.dialog.loading' bundle='admin' />",
            style: "width: 300px;height:125px",
			draggable:false
        }); 
        // set the content of the dialog:
        if(emptyDlg != null) {          
            emptyDlg.attr("title",  dialogTitle);
            emptyDlg.attr("content", "<center><table ><tr><td align=center></tr><tr><td align='center'>"+data2Display+"</td></tr><tr><td align='center'>    <button dojoType=dijit.form.Button type='submit'><bean:message key="admin.common.dialog.ok" bundle="admin" /></button></td></td></tr></table></center>");
            emptyDlg.show();
        }
    }
    // Pagination methods
	function onEnterGoToPage(n,totalNoOfPages){
		if(n.keyCode == 13){
			if(isNaN(parseInt(document.getElementById("enteredPageNo").value))){
				document.getElementById("enteredPageNo").value =document.getElementById("pageNo").value;
				return false;
			}
			var pageNo=parseInt(document.getElementById('enteredPageNo').value);
			if(pageNo>totalNoOfPages){
				document.dynamicDatasourceQueryForm.pageNo.value=totalNoOfPages;
			}else if(parseInt(pageNo)<1){
				document.dynamicDatasourceQueryForm.pageNo.value=1;
			}else{
				document.dynamicDatasourceQueryForm.pageNo.value=pageNo;
			}
			document.getElementById("queryTextArea").value=document.getElementById("sqlQueryProperty").value;
			refresh();
		}
	}
	
    function nextPage(totalNoOfPages){
        var pageNo = document.getElementById("enteredPageNo").value;
        if(parseInt(pageNo)<totalNoOfPages){
            document.dynamicDatasourceQueryForm.pageNo.value = (parseInt(pageNo)+1);
            refresh();
        }
    }
    
    function previousPage(totalNoOfPages){
        var pageNo = document.getElementById("enteredPageNo").value;
        if(parseInt(pageNo)>1){
            document.dynamicDatasourceQueryForm.pageNo.value = (parseInt(pageNo)-1);
            refresh();
        }
    }
    
    function gotoPage(pageNo){
        document.dynamicDatasourceQueryForm.pageNo.value = pageNo;
        refresh();
    }
    
	function execute(){
		document.dynamicDatasourceQueryForm.pageNo.value = 1;
		document.frmPageSize.pageSize.value = 10;
		refresh();
	}
    
    function refresh(){
		if(document.getElementById("queryTextArea").value==""){
			showEmptyDialog('<bean:message key="admin.monitor.db.query.browser.empty" bundle="admin" />','<bean:message key="admin.monitor.db.query.browser" bundle="admin" />');
			return false;
		}
		document.getElementById("sqlQuery").value = document.getElementById("queryTextArea").value;
		document.getElementById("pageSize").value = document.frmPageSize.pageSize.value;
		document.getElementById("dynamicDatasourceName").value = document.getElementById("dsName").value;
		document.forms[0].submit();
    }
   
    function changePage() {
		document.getElementById("enteredPageNo").value=1;
		document.getElementById("queryTextArea").value=document.getElementById("sqlQueryProperty").value;
		document.getElementById("pageNo").value=1;
		refresh();
	}
    
	function hideDiv() { 
		document.getElementById('resultData1').style.visibility = "hidden";
	}
	
	function showDiv() { 
		document.getElementById('resultData4').style.visibility = 'visible'; 
	}
	
	function enableTestConnectionButton(obj){
		clear();
		if(obj.selectedIndex>0){
			dijit.byId('testConnectionButton').setAttribute('disabled', false);
			document.getElementById("queryTextArea").disabled = false;
		}else{
			dijit.byId('testConnectionButton').setAttribute('disabled', true);
			document.getElementById("queryTextArea").disabled = true;
		}
	} 

	function clear(){
		document.getElementById("queryTextArea").value = "";
		document.getElementById("sqlQuery").value = "";
		document.getElementById("pageSize").value = "";
		document.getElementById("dynamicDatasourceName").value = document.getElementById("dsName").value;
		document.forms[0].submit();
	}
		
	function enableExecuteButton(){
		var selectedDSIndex = document.getElementById('dsName').selectedIndex;
		var textLength = document.getElementById('queryTextArea').value.length;
		if(selectedDSIndex!==0){
			if(textLength>0){
				dijit.byId('executeButton').setAttribute('disabled', false);
			}else{
				dijit.byId('executeButton').setAttribute('disabled', true);
			}
		}
	}

</script>
</head>
<body class="tundra bodybg" >

<html:form action="/dynamicDatasourceQueryAction" method="post">
	<input type="hidden" id="csrf" name="csrf" value="${csrf}">
	<input type="hidden" name="pageNo" id="pageNo"/>
	<input type="hidden" name="pageSize" id="pageSize"/>
	<input type="hidden" name="operation" id="operation"/>
	<input type="hidden" name="sqlQuery" id="sqlQuery"/>
	<input type="hidden" name="dynamicDatasourceName" id="dynamicDatasourceName"/>	
</html:form>


<table width="80%" cellspacing="0" cellpadding="0" border="0">
    <tr>
		<td style="padding-left:67px;padding-top:37px;" class="pageTitle paddingTitle"><bean:message key="admin.monitor.db.query.browser" bundle="admin" /></td>
    </tr>
    <tr>
		<td class="paddingTitleDesc" valign="top"><strong><bean:message key="admin.monitor.db.query.debug" bundle="admin" /></strong></td>  
    </tr>
 	<tr>
	    <td style="padding-left:67px; padding-top:20px;">
			<div style = "height: 20px; line-height: 20px; display: inline-block; position: relative;">
				<strong>Datasource:</strong>
				<select id="dsName" name="select1" data-dojo-type="dijit/form/Select" onchange="enableTestConnectionButton(this)" style="width:100px">
					<option value="0"><bean:message key="admin.usrgrppermission.select.default" bundle="admin"/></option>
					<%
					String[] datasourceName=DataModelsCacheHelper.getAllDynamicDatasourceNames();
					List list = Arrays.asList(datasourceName);
					for(int i=0;i<list.size();i++){
					
						if(selectedDS != null && selectedDS.equals(list.get(i))){
						%>
							<option value="<%=list.get(i)%>" selected> <%=list.get(i)%></option>
						<%}else{%>
							<option value="<%=list.get(i)%>"> <%=list.get(i)%></option>
						<%}%>
					<%}%>			
				</select>		
				&nbsp;&nbsp;&nbsp;
				<button dojoType="dijit.form.Button" type="button" id="testConnectionButton" style="position: absolute; top: 0px; left: 195px; font-family: arial; font-size: 12px !important" onclick=	"testConnection();" 
					<%if(selectedDS == null || selectedDS.equals("0")){%>
						disabled 
					<%}%>
					>Test Connection
				</button>  
				<label id="connectionMessage" style="position: absolute; top: 0px; left: 320px; width: 150px;"><%= connectionStatus == null ? "" : (connectionStatus ? " <font color='#0000FF'> Connection Successful " : "<font color='#FF0000'> Connection Failed ") %></label>
			</div>
        </td>
    </tr>
	
	<tr>
		<td style="padding-left:67px; padding-top:20px;">
			&nbsp;&nbsp;&nbsp;
        </td>
	</tr>
	<tr>
		<td align="left">
			<table border="0">
				<tr> 
					<td align="left" valign="top" style="padding-left:67px; padding-right:5px" >
						<strong><bean:message key="admin.monitor.db.query" bundle="admin" /> </strong>
					</td>
					<td><input type="hidden" name="sqlQueryProperty" id="sqlQueryProperty" value="<bean:write name="dynamicDatasourceQueryForm" property="sqlQuery"/>" />
						<textarea rows="8" cols="80" name="queryTextArea" id="queryTextArea" onkeyup="enableExecuteButton()"
						<%if(selectedDS == null || selectedDS.equals("0")){%>
								disabled 
							<%}%>
						><bean:write name="dynamicDatasourceQueryForm" property="sqlQuery"/></textarea>
					</td>
					<td style="vertical-align:bottom">
						<button dojoType="dijit.form.Button"  type="button" id="executeButton" onclick="execute();" 
							<%if(!executeBtnStatus){%>
								disabled
							<%}%>>
							<bean:message key="admin.monitor.execute.button" bundle="admin" />
						</button>  
					</td>
				</tr>
			</table>
        </td>
	</tr>
	<tr>
		<td style="padding-left:185px;padding-top:5px;padding-bottom:5px;" >
			<label class="error" id="errorMessage">
					 <html:errors bundle="admin"/>
			</label>
		</td>
	</tr>
	<tr>
		<td>
			&nbsp;
		</td>
	</tr>
	<tr>
		<td>
			<div style="margin-left:67px; margin-bottom:10px; height:200px; width:100%; overflow:off;" id="resultData1"> 
				<table  border="0" id="resultData2" width="100%" style="table-layout:fixed;overflow:auto;">
					<tr>
						<td>
							<table style="align:left;table-layout:fixed;" width="100%" class="bgcolorReports ">
								<tr>
									<td align="left">
										<div>
										<b>Results:</b>
										&nbsp;
										<logic:present name="recordCount">	
											<logic:notEqual name="recordCount"  value="-1" >
												<bean:write name="recordCount" scope="request"/>
												Record(s) found
											</logic:notEqual>
										</logic:present>
										</div>
									</td>
									<td align="right">
										<table class="htmlPagination" border="0">
											<tr>							
												<td  align="right">Size</td>
												<td>
													<form name="frmPageSize" id="frmPageSize">
														<html:select  name="dynamicDatasourceQueryForm" property="pageSize" styleId="pageLimit" onchange="changePage();">
														<html:option value="10">10</html:option>
														<html:option value="25">25</html:option>
														<html:option value="50">50</html:option>
														<html:option value="100">100</html:option>
														<html:option value="500">500</html:option>
														</html:select>
													</form>
												</td> 
												<td>&nbsp;</td>
												<td><img src="<%=StringEscapeUtils.escapeHtml(ServerUtils.getContextName(request))%>/images/portal/btn_remove_all_on.png" id="start_on" style=	"display:none;cursor:pointer" onClick="gotoPage(1);"/> <img src="<%=StringEscapeUtils.escapeHtml(ServerUtils.getContextName(request))%>			/images/portal/btn_remove_all_off.png" id="start_off" style="display:none;cursor:pointer"/></td>
												<td align="center"><img src="<%=StringEscapeUtils.escapeHtml(ServerUtils.getContextName(request))%>/images/portal/btn_remove_one_on.png" id="previous_on" style="display:none;cursor:pointer" onClick="previousPage(<bean:write name="dynamicDatasourceQueryForm" property="totalNoOfPages"/>);" /> <img src="<%=StringEscapeUtils.escapeHtml(ServerUtils.getContextName(request))%>/images/portal/btn_remove_one_off.png" id="previous_off" style="display:none;cursor:pointer"/></td>
												<td valign="top"><input type="text" id="enteredPageNo" size="5" name="enteredPageNo" style="height:28;width:60; text-align:center; vertical-align:middle" autocomplete="off" onkeydown="onEnterGoToPage(event,<bean:write name="dynamicDatasourceQueryForm" property="totalNoOfPages"/>);" value="<bean:write name="dynamicDatasourceQueryForm" property="pageNo"/>" /></td><td valign="top"><input type="text" id="enteredPageNos" size="5" name="showPageNo" style="height:28;width:60; text-align:center; vertical-align:middle" autocomplete="off" value="of <bean:write name="dynamicDatasourceQueryForm" property="totalNoOfPages"/>" disabled="true"/></td>
												<td align="center"><img src="<%=StringEscapeUtils.escapeHtml(ServerUtils.getContextName(request))%>/images/portal/btn_add_one_on.png" id="next_on" style="display:none;cursor:pointer" onClick="nextPage(<bean:write name="dynamicDatasourceQueryForm" property="totalNoOfPages"/>)"/> <img src="<%=StringEscapeUtils.escapeHtml(ServerUtils.getContextName(request))%>/images/portal/btn_add_one_off.png" id="next_off" style="display:none;cursor:pointer"/></td>
												<td align="center"><img src="<%=StringEscapeUtils.escapeHtml(ServerUtils.getContextName(request))%>/images/portal/btn_add_all_on.png" id="end_on" style="display:none;cursor:pointer" onClick="gotoPage(<bean:write name="dynamicDatasourceQueryForm" property="totalNoOfPages"/>)" /> <img src="<%=StringEscapeUtils.escapeHtml(ServerUtils.getContextName(request))%>/images/portal/btn_add_all_off.png" id="end_off" style="display:none;cursor:pointer"/></td>
											</tr>
										</table>
									</td>
								</tr>
							</table> 
						</td>
					</tr>
					<tr>
						<td>
							<div style="width:100%; height:150px; overflow:auto;">
								<table style="align:left" width="100%" >
									<tr>
										<td>
											<div id="resultData4" style="overflow:auto;">
												<table id="resultData3">
													<tr>
														<td>
															<logic:notPresent  name="tableInfoMap">
																<script> hideDiv();</script>
															</logic:notPresent>
															<logic:present name="tableInfoMap">
																<script> showDiv();</script>
																<bean:size id="size" name="tableInfoMap"/>
																<logic:iterate  id="tableInfoMapId" name="tableInfoMap" indexId="index1">	
																	<tr class="subHeaddings" align="right">
																	<logic:iterate id="objArrId" name="tableInfoMapId" >
																		<logic:equal name="index1"  value="0" >
																			<td class="tab panelColor" align="left" valign="middle">
																				<bean:write name="objArrId"/>	
																			</td>
																		</logic:equal>
																		<logic:notEqual name="index1"  value="0" >
																			<td style="padding-right:10px" align="left" valign="middle">
																				<bean:write name="objArrId"/>
																			</td>
																		</logic:notEqual>
																	</logic:iterate>
																	</tr>
																	<logic:lessThan name="size" value="2" >
																		<tr>
																			<td>&nbsp;</td>
																			<td align="left" valign="middle" colspan="4">
																				<label class="error"><bean:message key="admin.monitor.no.record.found" bundle="admin" /></label>
																			</td>
																		</tr>
																		</logic:lessThan>
																</logic:iterate>
															</logic:present>
														</td>
													</tr>
												</table>
											</div>
										</td>
									</tr>
								</table>
							</div> 
						</td>
					</tr>
				</table>
			</div>
		</td>
	</tr>
</table>
<table width="100%" cellspacing="0" cellpadding="0" border="0">
	<tr class="barColor">
		<td align="right" width="50%">
		<button dojoType="dijit.form.Button" id="btnHome" type="button"  onclick="window.location =('<%=StringEscapeUtils.escapeHtml(    ServerUtils.getContextName(request))%>/adminMain.do')"><bean:message key="admin.common.home" bundle="admin" />
		</td>
	    <td align="left" width="50%">
        <button dojoType="dijit.form.Button" id="btnBack" type="button"  onclick="window.location =('<%=StringEscapeUtils.escapeHtml(    ServerUtils.getContextName(request))%>/dbadmin.do')"><bean:message key="admin.monitor.back.button" bundle="admin" />
        </button>
        </td>
    </tr>
</table>
								
</body>
<script>
dojo.addOnLoad(loadValues); 

function testConnection(){
	var element = document.getElementById("dsName");
	window.location = "EcoWebAjaxAction.do?operation=testDynamicDatasourceConnection&dynamicDatasource="+element.value;
}

var dropCheckBoxes = document.getElementsByName('drop');
function loadValues(){
    window.status="Done";
	loadFormValues();
}
function loadFormValues(){
   if(<bean:write name="dynamicDatasourceQueryForm" property="totalNoOfPages"/>  <= 1 && <bean:write name="dynamicDatasourceQueryForm" property="pageNo"/> <= 1){
           document.getElementById('start_on').style.display='none';
           document.getElementById('start_off').style.display='';
           document.getElementById('previous_on').style.display='none';
           document.getElementById('previous_off').style.display='';
           document.getElementById('next_on').style.display='none';
           document.getElementById('next_off').style.display='';
           document.getElementById('end_on').style.display='none';
           document.getElementById('end_off').style.display='';                        
   }else if(<bean:write name="dynamicDatasourceQueryForm" property="totalNoOfPages"/>  > 1 && <bean:write name="dynamicDatasourceQueryForm" property="pageNo"/> <= 1){
            document.getElementById('start_on').style.display='none';
           document.getElementById('start_off').style.display='';
           document.getElementById('previous_on').style.display='none';
           document.getElementById('previous_off').style.display='';
           document.getElementById('next_on').style.display='';
           document.getElementById('next_off').style.display='none';
           document.getElementById('end_on').style.display='';
           document.getElementById('end_off').style.display='none';
   }else if(<bean:write name="dynamicDatasourceQueryForm" property="totalNoOfPages"/>  > 1 && (<bean:write name="dynamicDatasourceQueryForm" property="pageNo"/> > 1 && (<bean:write name="dynamicDatasourceQueryForm" property="pageNo"/> != <bean:write name="dynamicDatasourceQueryForm" property="totalNoOfPages"/>))){
           document.getElementById('start_on').style.display='';
           document.getElementById('start_off').style.display='none';
           document.getElementById('previous_on').style.display='';
           document.getElementById('previous_off').style.display='none';
           document.getElementById('next_on').style.display='';
           document.getElementById('next_off').style.display='none';
           document.getElementById('end_on').style.display='';
           document.getElementById('end_off').style.display='none';
   }else if((<bean:write name="dynamicDatasourceQueryForm" property="totalNoOfPages"/>  > 1) && (<bean:write name="dynamicDatasourceQueryForm" property="pageNo"/> == <bean:write name="dynamicDatasourceQueryForm" property="totalNoOfPages"/>)){                     
           document.getElementById('start_on').style.display='';
           document.getElementById('start_off').style.display='none';
           document.getElementById('previous_on').style.display='';
           document.getElementById('previous_off').style.display='none';
           document.getElementById('next_on').style.display='none';
           document.getElementById('next_off').style.display='';
           document.getElementById('end_on').style.display='none';
           document.getElementById('end_off').style.display='';
           
   }
}
</script>
</html>