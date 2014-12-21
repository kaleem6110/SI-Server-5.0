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
<html>
<head>
	<%@ include file="/common/dojo.jsp"%>
	<%
		UserBean userBean = (UserBean)request.getSession(false).getAttribute(ServerUtils.USER_BEAN_NAME);
		String moduleId      =(String) session.getAttribute(ServerUtils.PARAM_MODULE_ID); 
		boolean hasAccessDropTable = AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.MONITOR_DYNAMIC_DATASOURCE_STATISTICS,null,EAccessAction.DELETE_ACCESS);
	%>
<script type="text/javascript">	
	var tableName=null;
	var dynamicDatasourceName = null;
	function dodelete()
	{	if(tableName !=null && tableName !="" && tableName !='undefined')
	    {
		 window.location ="<%=StringEscapeUtils.escapeHtml(ServerUtils.getContextName(request))%>/monitorDB.do?operation=dropTable&dynamicDatasourceTableName="+tableName;
		}
	}
	
	function setRefreshButtonState(state){
		if(state == "false"){
			document.getElementById('btnRefresh').disabled = true; 
		}else if(state == "true"){
			document.getElementById('btnRefresh').disabled = false; 
		}
	}
	
	function dropTables() {
		tableName = "";
	  	for(i=0;i<dropCheckBoxes.length;i++){
	    	if(dropCheckBoxes[i].checked){
	    		tableName += dropCheckBoxes[i].value + ",";
	    	}
		}
		if(tableName == ""){
			showEmptyDialog('<bean:message key="admin.monitor.db.no.table.selected" bundle="admin"/>','Alert');
		}else{
			confirmationDialog('<bean:message key="admin.monitor.db.drop.table.confirm" bundle="admin"/>');
		}
	}
	var infoFrameWin = null;
	function openInfoframe(tableName, dynamicDatasourceName){
	   
	    var urlToOpen = "./monitorDB.do?operation=viewMonitorTableRecordView&dynamicDatasourceTableName=" +tableName +"&dynamicDatasourceName="+dynamicDatasourceName;
	               
	     if(infoFrameWin==null)
	     {
	          infoFrameWin = new Window({id: "infoFrameWin", className: "alphacube", width:(screen.width)/(3/2), height:(screen.height)/2,top:100,left:100, title:"Table Properties", closable:true, wiredDrag: true}); 
	          infoFrameWin.setURL(urlToOpen); 
	          infoFrameWin.show();
		 }
	     else if(infoFrameWin!=null)
	     {	
			  infoFrameWin.setURL(urlToOpen);
	     	  infoFrameWin.refresh();
	     	  infoFrameWin.setLocation(100,100);
	     	  
	     	  if(infoFrameWin.isMinimized())
		   	  {
		       	  //use to restore the last maximized state
		       	  	infoFrameWin.setSize((screen.width)/(3/2),(screen.height)/2);
		      		infoFrameWin.minimized = false;
	     	  }
	     	  if(infoFrameWin.isMaximized())
	     	  {
	     	  //use to restore the last maximized state
	     	  	infoFrameWin.maximize();
	     	  }
	     	  
	     	  window.setTimeout('infoFrameWin.show()',400);
	     }	     
	}	
	function hover(obj){
        obj.className='class_hover';
    }

    function unHover(obj){
        obj.className = 'class_no_hover bgcolor';
    }
    
    function dropAllCheckBoxChange(source){
	  	for(i=0;i<dropCheckBoxes.length;i++){
	    	dropCheckBoxes[i].checked = source.checked;
		}
	}
	
	function dropCheckBoxChange(source){
		if(!source.checked){
			document.getElementById("dropAll").checked = false;
		}else{
		  	for(i=0;i<dropCheckBoxes.length;i++){
		    	if(!dropCheckBoxes[i].checked){
		    		return ;
		    	}
			}
			//if all check boxes are true than dropAll checkbox set to true 
			document.getElementById("dropAll").checked = true;
		}	
	}
    
    // Pagenation methods
    function nextPage(){
        var pageNo = document.monitorDBForm.pageNo.value;
        var totalNoOfPages = document.monitorDBForm.totalNoOfPages.value;
        if(parseInt(pageNo)<totalNoOfPages){
            document.monitorDBForm.pageNo.value = (parseInt(pageNo)+1);
            refresh();
        }
    }
    function previousPage(){
        var pageNo = document.monitorDBForm.pageNo.value;
        if(parseInt(pageNo)>1){
            document.monitorDBForm.pageNo.value = (parseInt(pageNo)-1);
            refresh();
        }
    }
    function gotoPage(pageNo){
        document.monitorDBForm.pageNo.value = pageNo;
        refresh();
    }
    
    function refresh(){
    	document.getElementById("operation").value = "showTablesInfo";
		setRefreshButtonState("false");
    	document.forms[0].submit();
    }
    
    function memoryRefreshResponse(xml){
		isRequestAlreadySent = false;
		var data = xml.getElementsByTagName("memoryStatistics")[0];
		if(data != null){
    		var memUsed = data.getElementsByTagName("memUsed")[0].firstChild.data;
			var memFree = data.getElementsByTagName("memFree")[0].firstChild.data;
			var lastRefresh = data.getElementsByTagName("lastRefresh")[0].firstChild.data;
    		document.getElementById('memUsed').innerHTML = memUsed;
			document.getElementById('memFree').innerHTML = memFree;
			document.getElementById('lastRefresh').innerHTML = lastRefresh;
    	}
		document.getElementById("refreshMemoryBtn").src="<%=StringEscapeUtils.escapeHtml(ServerUtils.getContextName(request))%>/images/portal/refresh.png";
	}
	

	var isRequestAlreadySent = false;
	function newXMLHttpRequest(){
		var xmlreq = null;     
		if (window.XMLHttpRequest){ 
		  xmlreq = new XMLHttpRequest(); 
		}else{
			xmlreq = new ActiveXObject("Microsoft.XMLHTTP");
		} 
		return xmlreq; 
	} 

	function refreshMemory(){ 
		 if(!isRequestAlreadySent){
			var req = newXMLHttpRequest();
			if(req != null){  
				req.onreadystatechange=function(){
				  if (req.readyState==4 && req.status==200){
					memoryRefreshResponse(req.responseXML);   //this method returns response to parent's page
				  }
				} 
				req.open("GET","monitorDB.do?operation=refreshMemory",true); 
				req.send("");  
				isRequestAlreadySent = true;
				document.getElementById("refreshMemoryBtn").src="<%=StringEscapeUtils.escapeHtml(ServerUtils.getContextName(request))%>/images/portal/loadinganim.gif";
			}
		}
	}
		
</script>
</head>
<body class="tundra bodybg" onLoad="setRefreshButtonState('true');validateAndExtendSession()">
<html:form action="/monitorDB" method="post">
	<input type="hidden" id="csrf" name="csrf" value="${csrf}">
	<html:hidden property="totalNoOfPages"/>
	<html:hidden property="pageNo"/>
	<input type="hidden" id="operation" name="operation"/>
</html:form>


<table width="101.2%" cellspacing="0" cellpadding="0" align="center"  border="0" >
    <tr>
        <td style="padding-left:67px;padding-top:37px;" class="pageTitle paddingTitle"><bean:message key="admin.monitor.db" bundle="admin" /></td>
    </tr>
    <tr>
        <td style="padding-left:67px;" class="paddingTitleDesc"><strong><bean:message key="admin.monitor.db.description" bundle="admin" /></strong></td>  
    </tr>
 	<tr>
	   <td style="padding-left:67px; padding-top:30px;" >
			 <span id="ctl00_mainbody_lblError" class="error">
				   <label class="success">  
					<html:messages id="msg" message="true" property="admin.monitor.db.delete.success"><bean:message key="admin.monitor.db.delete.success" bundle="admin"/></html:messages> 
				   </label>
				  <label class="error">
					<html:messages id="msg" message="true" property="admin.monitor.db.delete.fail"><bean:message key="admin.monitor.db.delete.fail" bundle="admin"/></html:messages> 
				  </label>
			</span>
		</td>
    </tr>
	
	<tr>
        <td style="padding-left:67px; padding-top:20px;">
		<table border="0">
			<tr>
				<td valign="top">
					<strong>Last Refreshed : &nbsp; </strong><label id="lastRefresh"><%=ESAPI.encoder().encodeForHTML((String)request.getAttribute(MonitorDBAction.LAST_REFRESH))%></label>
					<br>
					<strong>Memory Used &nbsp;&nbsp;: &nbsp; </strong><label id="memUsed"><%=ESAPI.encoder().encodeForHTML((String)request.getAttribute(IDynamicDatasourceManager.MEM_STATS_PROPERTY_MEMORY_USED))%></label>
					<br>
					<strong>Memory Free &nbsp;&nbsp;: &nbsp; </strong><label id="memFree"><%=ESAPI.encoder().encodeForHTML((String)request.getAttribute(IDynamicDatasourceManager.MEM_STATS_PROPERTY_MEMORY_FREE))%></label>
				</td>
				<td valign="middle">
					<a style="cursor:pointer" onclick="refreshMemory();"><img id="refreshMemoryBtn" title="<bean:message key="admin.monitor.refresh.memory.button" bundle="admin"/>" src="<%=StringEscapeUtils.escapeHtml(ServerUtils.getContextName(request))%>/images/portal/refresh.png"></a> 
				</td>
				<!--<td valign="top" align="right">
					<strong><bean:message key="admin.monitor.refreshrate" bundle="admin" /></strong>
					<select id="refreshRate" name="refreshRate" autocomplete="off" dojoType="dijit.form.FilteringSelect" style="width:60">
						<option value="60">1</option>
						<option value="120">2</option>
						<option value="300">5</option>
						<option value="600">10</option>
						<option value="1200">20</option>
						<option value="1800">30</option>
					</select>
					<button dojoType="dijit.form.Button" id="btnSetRefreshRate" type="button"  onclick="changeRefreshRate();"><bean:message key="admin.monitor.set.button" bundle="admin" />
					</button>
				</td> -->
			</tr>
			</table>
        </td>
    </tr>
	<tr><td>&nbsp;</td></tr>
    
	<tr>
        <td style="padding-left:67px; padding-top:10px;">
			<table style="align:left;" border="0" width="60%" class="bgcolorReports ">
			  <tr>
				<td colspan="6" align="right">
					<table class="htmlPagination">
				<tr>
	                <td><img src="<%=StringEscapeUtils.escapeHtml(ServerUtils.getContextName(request))%>/images/portal/btn_remove_all_on.png" id="start_on" style="display:none;cursor:pointer" onClick="gotoPage(1);"/> <img src="<%=StringEscapeUtils.escapeHtml(ServerUtils.getContextName(request))%>/images/portal/btn_remove_all_off.png" id="start_off" style="display:none;cursor:pointer"/></td>
	                <td align="center"><img src="<%=StringEscapeUtils.escapeHtml(ServerUtils.getContextName(request))%>/images/portal/btn_remove_one_on.png" id="previous_on" style="display:none;cursor:pointer" onClick="previousPage();" /> <img src="<%=StringEscapeUtils.escapeHtml(ServerUtils.getContextName(request))%>/images/portal/btn_remove_one_off.png" id="previous_off" style="display:none;cursor:pointer"/></td>
	                <td valign="top"><input type="text" id="enteredPageNo" size="5" name="enteredPageNo" style="height:28;width:50; text-align:center; vertical-align:middle" autocomplete="off" onKeyPress="onEnterGoToPage();" value="<bean:write name="monitorDBForm" property="pageNo"/> of <bean:write name="monitorDBForm" property="totalNoOfPages"/>" disabled="true"/></td>
	                <td align="center"><img src="<%=StringEscapeUtils.escapeHtml(ServerUtils.getContextName(request))%>/images/portal/btn_add_one_on.png" id="next_on" style="display:none;cursor:pointer" onClick="nextPage()"/> <img src="<%=StringEscapeUtils.escapeHtml(ServerUtils.getContextName(request))%>/images/portal/btn_add_one_off.png" id="next_off" style="display:none;cursor:pointer"/></td>
	                <td align="center"><img src="<%=StringEscapeUtils.escapeHtml(ServerUtils.getContextName(request))%>/images/portal/btn_add_all_on.png" id="end_on" style="display:none;cursor:pointer" onClick="gotoPage(<bean:write name="monitorDBForm" property="totalNoOfPages"/>)" /> <img src="<%=StringEscapeUtils.escapeHtml(ServerUtils.getContextName(request))%>/images/portal/btn_add_all_off.png" id="end_off" style="display:none;cursor:pointer"/></td>
 				</tr>
			</table>
				</td>
				</tr>
			  <tr class="subHeaddings">
			  	  <td class="tab panelColor" align="left" valign="middle">&nbsp;<input type="checkbox" id="dropAll" name="dropAll" onclick="dropAllCheckBoxChange(this);"/></td>
				  <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.db.sno" bundle="admin" /></td>
				  <td class="tab panelColor" align="left" valign="middle">&nbsp;Dynamic Datasource Name</td>
				  <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.db.tablename" bundle="admin" /></td>
				  <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.db.no_of_columns" bundle="admin" /></td>
				  <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.db.no_of_rows" bundle="admin" /></td>
				  <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.db.table.status" bundle="admin" /></td>
 			  </tr>
			   <% 
					int i=0;
				%>
			  <logic:present name="tableInfoMap">
			  	<bean:define id="pageNo" name="monitorDBForm" property="pageNo" type="java.lang.Integer"/>
			  <!--  table name is a key in tableInfoMap -->
			  	<logic:iterate id="tableInfo" name="tableInfoMap">
			  		<bean:define id="tableValues" name="tableInfo" property="value"/>
			  		<tr height="14" onDblClick="openInfoframe('<bean:write name="tableValues" property="tableName"/>','<bean:write name="tableValues" property="dynamicDatasourceName"/>')" class="bgcolor" onMouseOver="hover(this);" onMouseOut="unHover(this);">
			  		  <td align="left" valign="middle">&nbsp;<input type="checkbox" name="drop" id="drop<%=i%>" onclick="dropCheckBoxChange(this);" value='<bean:write name="tableValues" property="tableName"/> ::  <bean:write name="tableValues" property="dynamicDatasourceName"/>'/></td>
					  <td align="left" valign="middle">&nbsp;<%= ++i + (pageNo - 1) * MonitorDBAction.PAGE_LIMIT%></td>
					  <td align="left" valign="middle">&nbsp;<bean:write name="tableValues" property="dynamicDatasourceName"/></td>
					  <td align="left" valign="middle">&nbsp;<bean:write name="tableValues" property="tableName"/></td>
					  <td align="left" valign="middle">&nbsp;<bean:write name="tableValues" property="columnCount"/></td>
					  <td align="left" valign="middle">&nbsp;<bean:write name="tableValues" property="rowCount"/></td>
					  <td align="left" valign="middle">&nbsp;<bean:write name="tableValues" property="status"/></td>
					  
			  		</tr>
			  	</logic:iterate>
			  </logic:present>
			</table>
		</td>  
    </tr>
</table>


<table width="101.2%" border="0" >
    <tr>
        <td style="padding-top:55px;">&nbsp;</td>
    </tr>
    <tr align="right" class="barColor">
        <td align="center" width="100%">
            <button dojoType="dijit.form.Button"  type="button"  onclick="window.location =  '<%=StringEscapeUtils.escapeHtml(ServerUtils.getContextName(request))%>/adminMain.do'  "><bean:message key="admin.monitor.home.button" bundle="admin" />
            </button>
			<button dojoType="dijit.form.Button" id="btnRefresh" type="button"  onclick="refresh();"><bean:message key="admin.monitor.refresh.button" bundle="admin" />
            </button>
            <button dojoType="dijit.form.Button" id="btnBack" type="button"  onclick="window.location =('<%=StringEscapeUtils.escapeHtml(ServerUtils.getContextName(request))%>/monitor.do')"><bean:message key="admin.monitor.back.button" bundle="admin" />
            </button>
            <button dojoType="dijit.form.Button" id="btnDrop" type="button"  onclick="dropTables();" <%=hasAccessDropTable?"":"disabled"%> ><bean:message key="admin.monitor.db.drop.table.button" bundle="admin" />
            </button>
        </td>
    </tr>
</table>
</body>
<script>
dojo.addOnLoad(loadValues); 
var dropCheckBoxes = document.getElementsByName('drop');
function loadValues(){
    window.status="Done";
    loadFormValues();
}
function loadFormValues(){
   if(<bean:write name="monitorDBForm" property="totalNoOfPages"/>  <= 1 && <bean:write name="monitorDBForm" property="pageNo"/> <= 1){
           document.getElementById('start_on').style.display='none';
           document.getElementById('start_off').style.display='';
           document.getElementById('previous_on').style.display='none';
           document.getElementById('previous_off').style.display='';
           document.getElementById('next_on').style.display='none';
           document.getElementById('next_off').style.display='';
           document.getElementById('end_on').style.display='none';
           document.getElementById('end_off').style.display='';                        
   }else if(<bean:write name="monitorDBForm" property="totalNoOfPages"/>  > 1 && <bean:write name="monitorDBForm" property="pageNo"/> <= 1){
            document.getElementById('start_on').style.display='none';
           document.getElementById('start_off').style.display='';
           document.getElementById('previous_on').style.display='none';
           document.getElementById('previous_off').style.display='';
           document.getElementById('next_on').style.display='';
           document.getElementById('next_off').style.display='none';
           document.getElementById('end_on').style.display='';
           document.getElementById('end_off').style.display='none';
   }else if(<bean:write name="monitorDBForm" property="totalNoOfPages"/>  > 1 && (<bean:write name="monitorDBForm" property="pageNo"/> > 1 && (<bean:write name="monitorDBForm" property="pageNo"/> != <bean:write name="monitorDBForm" property="totalNoOfPages"/>))){
           document.getElementById('start_on').style.display='';
           document.getElementById('start_off').style.display='none';
           document.getElementById('previous_on').style.display='';
           document.getElementById('previous_off').style.display='none';
           document.getElementById('next_on').style.display='';
           document.getElementById('next_off').style.display='none';
           document.getElementById('end_on').style.display='';
           document.getElementById('end_off').style.display='none';
   }else if((<bean:write name="monitorDBForm" property="totalNoOfPages"/>  > 1) && (<bean:write name="monitorDBForm" property="pageNo"/> == <bean:write name="monitorDBForm" property="totalNoOfPages"/>)){                     
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