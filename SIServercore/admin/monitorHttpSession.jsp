<%@ include file="/common/dojo.jsp" %>

<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@page import="com.enterprisehorizons.constants.CommonConstants"%>
<%@page import="com.spacetimeinsight.admin.bean.MonitorSessionBean"%>
<%@page import="com.spacetimeinsight.admin.bean.MonitorArtifactBean"%>
<%@page import="com.spacetimeinsight.admin.bean.MonitorUserBean"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Iterator"%>
<%@ page import="org.owasp.esapi.ESAPI" %>

<!-- Privileges imports  -->
<%@page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@page import="com.enterprisehorizons.magma.security.util.AccessHelper"%>
<%@page import="com.spacetimeinsight.db.privileges.model.RoleRightsMap"%>
<%@page import="com.spacetimeinsight.stas.privileges.services.PrivilegesConstants"%>

<%
 
  // Changes for applying Privileges -- Start
  UserBean userBean          = (UserBean)session.getAttribute(ServerUtils.USER_BEAN_NAME);   
  String moduleId      =(String) session.getAttribute(ServerUtils.PARAM_MODULE_ID);
  
  //Get the access permissions for the given right or subright and accessType
  RoleRightsMap roleRightsMapSessVi	= AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.SubRight.MONITOR_SESS_STA_SESS_VIEW, moduleId);  
  RoleRightsMap roleRightsMapArtVi	= AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.SubRight.MONITOR_SESS_STA_ART_VIEW, moduleId);
  RoleRightsMap roleRightsMapUsrVi	= AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.SubRight.MONITOR_SESS_STA_USER_VIEW, moduleId);
  //Changes for applying Privileges -- End
  
%>
<html:html locale="true">
<head>
<% 
    String tabId=(String)session.getAttribute("tabId");
    String refreshRate=(String)session.getAttribute(CommonConstants.REFRESH_RATE_SESSION_PAGE);
%>
<meta http-equiv="refresh" content="<%=ESAPI.encoder().encodeForHTML(refreshRate)%>" />
<script>

    function hover(obj){
        obj.className='class_hover';
    }

    function unHover(obj){
       obj.className = 'class_no_hover bgcolor';
    }

    function showMonitor(){
        window.location = "monitor.do";
    }
    
  function showData(tabId) {
     window.location = "<%=ServerUtils.getContextName(request)%>/monitorHttpSessionAction.do?tabId="+tabId;
  }
    
    function changeRefreshRate(){
        document.forms[0].submit();
    }


</script>



<style type="text/css">


div.clear {
    clear: both;
} 

</style>
</head>


<body class="tundra bodybg" >
<html:form action="/monitorHttpSessionAction.do" method="POST">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">
<hidden name="tabId" value="<%=ESAPI.encoder().encodeForHTML(tabId)%>">

<table width="101.2%" cellspacing="0" cellpadding="0" align="center"  border="0" >
    <tr>
        <td style="padding-left:67px;padding-top:37px;" class="pageTitle paddingTitle"><bean:message key="admin.monitor.session" bundle="admin" /></td>
    </tr>
    <tr>
        <td style="padding-left:67px;" class="paddingTitleDesc"><strong><bean:message key="admin.monitor.session.description" bundle="admin" /></strong></td>  
    </tr>   
    <tr>
        <td style="padding-left:67px;padding-top:30px;">
            <table width="100%" cellspacing="0" cellpadding="0" align="center" border="0">
                <tr align="center" >
                    <td>
                        <table width="75%" cellspacing="0" cellpadding="0" align="left">
                            <tr>
                                <td align="right">
                                    <strong><bean:message key="admin.monitor.refreshrate" bundle="admin" /></strong>
                                    <select id="refreshRate_Session_Page" name="refreshRate_Session_Page" autocomplete="off" dojoType="dijit.form.FilteringSelect" style="width:60;">
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
                        <table width="75%" cellspacing="0" cellpadding="0" style="align:left;" border="0" >
                            <tr>
                                <td align="left">
                                   
                                        <div id="tabs_container_crystal" style="align:left; height:25px">
                                            <ul style="padding-left:0px">
                                            	<li class='<%=tabId.equals("session")?"active_t tabs_border":"panelColor tabs_border"%>'><a <%if(!roleRightsMapSessVi.getHasReadAccess()) { %> style='color:#CCC'  <%}else{%> href="#"  onclick="showData('session')" <%}%> style='cursor:hand'><bean:message key="admin.monitor.session.view" bundle="admin" /></a></li>
                                            	<li class='<%=tabId.equals("artifact")?"active_t tabs_border":"panelColor tabs_border"%>'><a <%if(!roleRightsMapArtVi.getHasReadAccess()) { %> style='color:#CCC'  <%}else{%> href="#" onClick="showData('artifact')" <%}%>  style='cursor:hand'><bean:message key="admin.monitor.artifact.view" bundle="admin" /></a></li>
                                                <li class='<%=tabId.equals("user")?"active_t tabs_border":"panelColor tabs_border"%>'><a <%if(!roleRightsMapUsrVi.getHasReadAccess()) { %> style='color:#CCC' <%}else{%>  href="#" onclick="showData('user')" <%}%>  style='cursor:hand'><bean:message key="admin.monitor.user.view" bundle="admin" /></a></li>  
                                            </ul>
                                        </div>
                             		
                                </td>
                            </tr>
                            <tr>
                            	<td>          
                                     <div class="clear"></div>
                            <div class="tabsContentsContainer" style="width:1000px">
                                     <logic:equal name="tabId" value="session">                                            
                                            <div class="bodybg" id="tab1" style="visibility:<%=tabId.equals("session")?"visible":"hidden"%>" <%if(!roleRightsMapSessVi.getHasReadAccess()) { %> disabled="true" <%}%>>
                                                <table style="align:left;" border="0" width="100%" class="bgcolorReports ">
                                                    <tr class="subHeaddings">
                                                        <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.number" bundle="admin" /></td>
                                                        <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.session.id" bundle="admin" /></td>
                                                        <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.artifact.name" bundle="admin" /></td>
                                                        <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.artifact.count" bundle="admin" /></td>
                                                    </tr>
                                                    <logic:notPresent name="listMonitorBySession" scope="request" >
                                                        <tr class="bgcolor">
                                                            <td colspan="4">
                                                                <label class = "label"><bean:message key="admin.monitor.no.data.available" bundle="admin" />
                                                                </label>
                                                            </td>
                                                        </tr>
                                                    </logic:notPresent> 
                                                    <logic:present name="listMonitorBySession" scope="request" >    
                                                        <logic:iterate id="sessionList" name="listMonitorBySession" scope="request" indexId="sessionListCount">
                                                            <tr class="bgcolor" onMouseOver="hover(this);" onMouseOut="unHover(this)">
                                                                <td align="left" valign="middle">&nbsp;&nbsp;${sessionListCount+1}</td>
                                                                <td align="left" valign="middle">&nbsp;&nbsp;<bean:write name='sessionList' property='sessionId' /></td>
                                                                <td align="left" valign="middle">&nbsp;&nbsp;<bean:write name='sessionList' property='artifactName' /></td>
                                                                <td align="left" valign="middle">&nbsp;&nbsp;<bean:write name='sessionList' property='noOfArtifacts' /></td>
                                                            </tr>
                                                        </logic:iterate>
                                                    </logic:present>    
                                                </table>
                                            </div>
                                            </logic:equal> 
                                            
                                            <logic:equal name="tabId" value="artifact">  
                                            <div id="tab2" class="bodybg" style="visibility:<%=tabId.equals("artifact")?"visible":"hidden"%>" <%if(!roleRightsMapArtVi.getHasReadAccess()) { %> disabled="true" <%}%>>
                                                <table style="align:left;" border="0" width="100%" class="bgcolorReports ">
                                                    <tr class="subHeaddings">
                                                        <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.number" bundle="admin" /></td>
                                                        <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.artifact.name" bundle="admin" /></td>
                                                        <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.artifact.count" bundle="admin" /></td>
                                                        <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.session.count" bundle="admin" /></td>
                                                    </tr>
                                                    <logic:notPresent name="listMonitorByArtifacts" scope="request" >
                                                        <tr class="bgcolor">
                                                            <td colspan="4">
                                                                <label class = "label"><bean:message key="admin.monitor.no.data.available" bundle="admin" />
                                                                </label>
                                                            </td>
                                                        </tr>
                                                    </logic:notPresent>
                                                    <logic:present name="listMonitorByArtifacts" scope="request" >
                                                        <logic:iterate id="artifactList" name="listMonitorByArtifacts" scope="request" indexId="artifactListCount">
                                                            <tr class="bgcolor" onMouseOver="hover(this);" onMouseOut="unHover(this)">
                                                                <td align="left" valign="middle">&nbsp;&nbsp;${artifactListCount+1}</td>
                                                                <td align="left" valign="middle">&nbsp;&nbsp;<bean:write name='artifactList' property='artifactName' /></td>
                                                                <td align="left" valign="middle">&nbsp;&nbsp;<bean:write name='artifactList' property='noOfArtifacts' /></td>
                                                                <td align="left" valign="middle">&nbsp;&nbsp;<bean:write name='artifactList' property='noOfSessions' /></td>
                                                            </tr>
                                                        </logic:iterate>
                                                    </logic:present> 
                                                </table>
                                            </div>
                                             </logic:equal> 
                                             
                                            <logic:equal name="tabId" value="user">   
                                            <div id="tab3" class="bodybg" style="visibility:<%=tabId.equals("user")?"visible":"hidden"%>" <%if(!roleRightsMapUsrVi.getHasReadAccess()) { %> disabled="true" <%}%>>
                                                <table style="align:left;" border="0" width="100%" class="bgcolorReports ">
                                                    <tr class="subHeaddings">
                                                        <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.number" bundle="admin" /></td>
                                                        <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.login.id" bundle="admin" /></td>
                                                        <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.session.count" bundle="admin" /></td>
                                                        <td class="tab panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.artifact.count" bundle="admin" /></td>
                                                    </tr>
                                                    <logic:notPresent name="listMonitorByUser" scope="request" >
                                                        <tr class="bgcolor">
                                                            <td colspan="4">
                                                                <label class = "label"><bean:message key="admin.monitor.no.data.available" bundle="admin" />
                                                                </label>
                                                            </td>
                                                        </tr>
                                                    </logic:notPresent>
                                                    <logic:present name="listMonitorByUser" scope="request" >
                                                        <logic:iterate id="userList" name="listMonitorByUser" scope="request" indexId="userListCount">
                                                            <tr class="bgcolor" onMouseOver="hover(this);" onMouseOut="unHover(this)">
                                                                <td align="left" valign="middle">&nbsp;&nbsp;${userListCount+1}</td>
                                                                <td align="left" valign="middle">&nbsp;&nbsp;<bean:write name='userList' property='loginId' /></td>
                                                                <td align="left" valign="middle">&nbsp;&nbsp;<bean:write name='userList' property='noOfSessions' /></td>
                                                                <td align="left" valign="middle">&nbsp;&nbsp;<bean:write name='userList' property='noOfArtifacts' /></td>
                                                            </tr>
                                                        </logic:iterate>
                                                    </logic:present>
                                                </table>
                                            </div>
                                            </logic:equal> 
                                                    
                                  </div>     
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
			<button dojoType="dijit.form.Button" id="btnRefresh" type="button"  onclick="window.location =('<%=ServerUtils.getContextName(request)%>/monitorHttpSessionAction.do?operation=return')"><bean:message key="admin.monitor.refresh.button" bundle="admin" />
            </button>
            <button dojoType="dijit.form.Button" id="btnBack" type="button"  onclick="showMonitor()"><bean:message key="admin.monitor.back.button" bundle="admin" />
            </button>
        </td>
    </tr>
</table>
</html:form>
</body>
<script>
   dojo.addOnLoad(loadValues); 
   function loadValues(){
      dijit.byId('refreshRate_Session_Page').setValue("<%=ESAPI.encoder().encodeForHTML(refreshRate) %>");
      window.status="Done";
    }
</script>
</html:html>