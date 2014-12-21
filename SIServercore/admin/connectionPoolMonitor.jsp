
<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ page import="org.owasp.esapi.ESAPI" %>
<%@page import="com.enterprisehorizons.dbutils.ConnectionPoolStatistics"%>
<%@page import="com.enterprisehorizons.dbutils.ConnectionPoolUtils,com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="com.enterprisehorizons.constants.CommonConstants"%>
<%
	ConnectionPoolStatistics[] poolStatistics = ConnectionPoolUtils.getConnectionPoolStatistics();
	int count = poolStatistics == null ? 0 : poolStatistics.length;
%>

<html:html locale="true">
<head>

<% 
	String refreshRate = (String)session.getAttribute(CommonConstants.REFRESH_RATE_CONNECTION_PAGE);
 if(refreshRate == null){
	 refreshRate="60";
   }
 if(request.getParameter(CommonConstants.REFRESH_RATE_CONNECTION_PAGE) != null){
   refreshRate=request.getParameter(CommonConstants.REFRESH_RATE_CONNECTION_PAGE);
   }
 session.setAttribute(CommonConstants.REFRESH_RATE_CONNECTION_PAGE,refreshRate);
%>
<meta http-equiv="refresh" content="<%=ESAPI.encoder().encodeForHTML(refreshRate)%>" />
<script>
var listSize = '<%=count%>';

    function hover(obj){
        obj.className='class_hover';
    }

    function unHover(obj){
       obj.className = 'class_no_hover bgcolor';
    }

  
  
    function changeRefreshRate(){
        document.forms[0].submit();
    }

function isAnyRecordSelected(){
    
        var allRecords = document.forms[0].poolName;
        if(allRecords!=null && allRecords.length > 1){
            for(var count=0;count < allRecords.length;count++)      
            {
                if(allRecords[count].checked){
                    return true;
                }   
            }
        } else if(allRecords != null && allRecords.checked){
            return true;
        }
        return false;
    }
 function submitForm(btn) {
        if(listSize < 1){
            if(btn.id == 'btnShutDown'){ 
                showEmptyDialog('No records to select for shut down','Alert');
                return false;
            }
           
        }
        else{
       	        if(!isAnyRecordSelected()){
                   showEmptyDialog('No records selected to perform action','Alert');
                    
                    return false;
                }
               
            
        }
      
        document.forms[0].action="<%=ServerUtils.getContextName(request)%>/shutdownPool.do?operation=monitor";
        document.forms[0].submit();
    }
    
function toggleSelectAll(source) {
	if(listSize >1){
	  checkboxes = document.forms[0].poolName;
	   for(var count=0;count < checkboxes.length;count++){
	    checkboxes[count].checked = source.checked;
	   }
	 }else{
		 if(document.forms[0].poolName){
		 document.forms[0].poolName.checked=source.checked;
		 }
	 }
}


function toggleSelect() {
  checkboxes =document.forms[0].poolName;
  var flag=true;
 if(listSize==1){
	 flag=checkboxes.checked;
 }else{
  for(var count=0;count <checkboxes.length;count++) {
 
	if(checkboxes[count].checked==false){
	flag=false;break;
	}
   }
 }
   document.forms[0].all.checked=flag;
   
   
}
</script>


<%@ include file="/common/dojo.jsp"%>

</head>


<body class="tundra bodybg" >
<form action="<%=ServerUtils.getContextName(request)%>/monitorPools.do" method="post">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">



<table width="101.2%" cellspacing="0" cellpadding="0" align="center"  border="0" >
    <tr>
        <td style="padding-left:67px;padding-top:37px;" class="pageTitle paddingTitle"><bean:message key="admin.monitor.pool" bundle="admin" /></td>
    </tr>
    <tr>
        <td style="padding-left:67px;" class="paddingTitleDesc"><strong><bean:message key="admin.monitor.pool.description" bundle="admin" /></strong></td>  
    </tr>   
    <tr>
        <td style="padding-left:67px;padding-top:30px;">
            <table width="100%" cellspacing="0" cellpadding="0" align="center" border="0">
                
                 <!--<tr align="center" >
		                    <td style="padding-top:30px;">
		                         <table style="align:left;" border="0" width="100%" class="bgcolorReports ">
		                        <tr class="subHeaddings">
						<td class="tab panelColor" align="left" valign="middle">Server Name</td>
						<td class="tab panelColor" align="left" valign="middle">Server IP</td>
						
					</tr>
		                          
		                                <td align="left" valign="middle">&nbsp;&nbsp;<%=ServerUtils.getSystemServerName()%></td>
		                                <td align="left" valign="middle">&nbsp;&nbsp;<%=ServerUtils.getSystemServerIP()%></td>
		                            </tr>
		                        </table>
		                    </td>
                </tr>
                -->
                <tr align="center" >
		                    <td>
		                        <table width="75%" cellspacing="0" cellpadding="0" align="left">
		                            <tr>
		                                <td align="right">
		                                    <strong><bean:message key="admin.monitor.refreshrate" bundle="admin" /></strong>
		                                    <select id="refreshRate_Connection_Page" name="refreshRate_Connection_Page" autocomplete="off" dojoType="dijit.form.FilteringSelect" style="width:60;">
		                                        <option value="60">1</option>
		                                        <option value="120">2</option>
		                                        <option value="300">5</option>
		                                        <option value="600">10</option>
		                                        <option value="1200">20</option>
		                                        <option value="1800">30</option>
		                                    </select>
		                                    <button dojoType="dijit.form.Button" id="btnSetRefreshRate" type="button"  onclick="changeRefreshRate();"><bean:message key="admin.monitor.set.button" bundle="admin" />
		                                    </button>
		                                </td>
		                            </tr>
		                        </table>
		                    </td>
                </tr>
                <tr>
                    <td style="padding-top:30px;">
                                                 <table style="align:left;" border="0" width="100%" class="bgcolorReports ">
                                                    <tr class="subHeaddings">
                                                     	<td class="tab panelColor" align="left" valign="middle">&nbsp;&nbsp;<input type="checkbox"  id="all" onClick="toggleSelectAll(this)"/></td>
                                                        <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.pool.name" bundle="admin" /></td>
                                                        <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.pool.type" bundle="admin" /></td>
                                                        <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.pool.active" bundle="admin" /></td>
                                                        <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.pool.available" bundle="admin" /></td>
                                                        <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.pool.max" bundle="admin" /></td>
                                                        <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.pool.offline" bundle="admin" /></td>
                                                        <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.pool.served" bundle="admin" /></td>
                                                        <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.pool.refused" bundle="admin" /></td>
                                                        <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.pool.startdate" bundle="admin" /></td>
                                                    </tr>
                                                    <%
						    	for(int i = 0; i < count; i++) {
						    %>
						    <tr class="bgcolor" onMouseOver="hover(this);" onMouseOut="unHover(this)">
						    	<td align="left" valign="middle">&nbsp;&nbsp;<input type="checkbox" id="poolName" name="poolName" value="<%=poolStatistics[i].getPoolName()%>" onClick="toggleSelect()"/></td>
						    	<td align="left" valign="middle">&nbsp;&nbsp;<%=poolStatistics[i].getPoolName()%></td>
						    	<td align="left" valign="middle">&nbsp;&nbsp;<%=poolStatistics[i].getPoolType().toString()%></td>
						    	<td align="left" valign="middle">&nbsp;&nbsp;<%=poolStatistics[i].getActiveCount() == -1 ? "NA" : poolStatistics[i].getActiveCount()%></td>
						    	<td align="left" valign="middle">&nbsp;&nbsp;<%=poolStatistics[i].getAvailableCount() == -1 ? "NA" : poolStatistics[i].getAvailableCount()%></td>
						    	<td align="left" valign="middle">&nbsp;&nbsp;<%=poolStatistics[i].getMaxCount() == -1 ? "NA" : poolStatistics[i].getMaxCount()%></td>
						    	<td align="left" valign="middle">&nbsp;&nbsp;<%=poolStatistics[i].getOfflineCount() == -1 ? "NA" : poolStatistics[i].getOfflineCount()%></td>
						    	<td align="left" valign="middle">&nbsp;&nbsp;<%=poolStatistics[i].getServedCount() == -1 ? "NA" : poolStatistics[i].getServedCount()%></td>
						    	<td align="left" valign="middle">&nbsp;&nbsp;<%=poolStatistics[i].getRefusedCount() == -1 ? "NA" : poolStatistics[i].getRefusedCount()%></td>
						    	<td align="left" valign="middle">&nbsp;&nbsp;<%=poolStatistics[i].getServedDate() == null ? "NA" : poolStatistics[i].getServedDate()%></td>
						    </tr>
						    <%
						    	}
						   %>
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
<!-- Button Panel -->
<table width="101.2%" border="0" >
    <tr>
        <td style="padding-top:55px;">&nbsp;</td>
    </tr>
    <tr align="right" class="barColor">
        <td align="center" width="100%">
            <button dojoType="dijit.form.Button"  type="button"  onclick="window.location =  '<%=ServerUtils.getContextName(request)%>/adminMain.do'  "><bean:message key="admin.monitor.home.button" bundle="admin" />
            </button>
			<button dojoType="dijit.form.Button" id="btnRefresh" type="button"  onclick="window.location =('<%=ServerUtils.getContextName(request)%>/monitorPools.do')"><bean:message key="admin.monitor.refresh.button" bundle="admin" />
            </button>
            <button dojoType="dijit.form.Button" id="btnBack" type="button"  onclick="window.location =('<%=ServerUtils.getContextName(request)%>/monitor.do')"><bean:message key="admin.monitor.back.button" bundle="admin" />
            </button>
              <button dojoType="dijit.form.Button" id="btnShutDown" type="button"  onclick=" return submitForm(this);"><bean:message key="admin.monitor.shutdown.button" bundle="admin" />
            </button>
        </td>
    </tr>
</table>
</form>
</body>
<script>
   dojo.addOnLoad(loadValues); 
   function loadValues(){
      dijit.byId('refreshRate_Connection_Page').setValue("<%=ESAPI.encoder().encodeForHTML(refreshRate)%>");
      window.status="Done";
    }
</script>
</html:html>