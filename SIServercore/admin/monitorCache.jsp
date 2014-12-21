<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@page import="com.enterprisehorizons.constants.CommonConstants"%>
<%@page import="com.spacetimeinsight.admin.bean.MonitorCacheBean"%>
<%@page import="com.spacetimeinsight.admin.utils.IMonitorConstants"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.Iterator"%>
<%@ page import="org.owasp.esapi.ESAPI" %>
<%@ include file="/common/dojo.jsp"%>
<% 
	String refreshRate=(String)session.getAttribute(CommonConstants.REFRESH_RATE_CACHE_PAGE);
%>
<html:html locale="true">

<head>
<meta http-equiv="refresh" content="<%=ESAPI.encoder().encodeForHTML(refreshRate) %>" />
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
    
    function changeRefreshRate(){
    
        document.forms[0].submit();
    }
    
</script>
</head>




<body class="tundra bodybg" >
<html:form action="monitorCacheAction.do" method="POST">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">
<table width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
        <td class="pageTitle paddingTitle"><bean:message key="admin.monitor.cache" bundle="admin" /></td>
    </tr>
    <tr>
        <td class="paddingTitleDesc bodytext"><strong><bean:message key="admin.monitor.cache.description" bundle="admin" /></strong></td>     
    </tr>
    <tr>
        <td style="padding-left:67px;padding-top:30px;">
            <table cellspacing="0" cellpadding="0" style="align:left;" border="0" width="100%">
                <tr align="center" >
                    <td style="padding-left:450px;"><strong><bean:message key="admin.monitor.refreshrate" bundle="admin" /></strong>
                        <select id="refreshRate_Cache_Page" name="refreshRate_Cache_Page" autocomplete="off" dojoType="dijit.form.FilteringSelect" style="width:60">
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
                <tr>
                    <td valign="top" width="100%">
                        <table width="75%" border='0'>
						<%int i=0;%>
							<logic:iterate id="cacheList" name="cacheObjects" scope="session" >
                                    <tr>
										<td>
											<table>
												<tr class="subHeaddings">
													<td>
														<span id="MinimizeLabel<%=i%>" onclick="document.getElementById(<%=i%>).style.display='none'; document.getElementById('MinimizeLabel<%=i%>').style.display='none';document.getElementById('MaximizeLabel<%=i%>').style.display=''" style="display:none;cursor:pointer">
															<h2><bean:message key="admin.monitor.cachekey" bundle="admin" /> <bean:write name='cacheList' property='key' />&nbsp;<img src="<%=ServerUtils.getContextName(request)%>/images/portal/uparrow.gif" width="7" height="11" align="absmiddle" /></h2>
														</span>							
														<span id="MaximizeLabel<%=i%>" onclick="document.getElementById(<%=i%>).style.display=''; document.getElementById('MinimizeLabel<%=i%>').style.display='';document.getElementById('MaximizeLabel<%=i%>').style.display='none'" style="cursor:pointer">
															<h2><bean:message key="admin.monitor.cachekey" bundle="admin" /> <bean:write name='cacheList' property='key' />&nbsp;<img src="<%=ServerUtils.getContextName(request)%>/images/portal/downarrow.gif" width="7" height="11" align="absmiddle" /></h2>
														</span>
													</td>
												</tr>
											</table>
										</td>
									</tr>
									<tr>
										<td>
											<table width="100%" id="<%=i%>" style="display:none">
												<tr class="subHeaddings">
													<td class="panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.number" bundle="admin" /></td>
													<td class="panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.sub.cachekey" bundle="admin" /></td>                              
													<td class="panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.cache.class" bundle="admin" /></td>
													<td class="panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.elements.count" bundle="admin" /></td>
													<td class="panelColor" align="left" valign="middle">&nbsp;<bean:message key="admin.monitor.key.type" bundle="admin" /></td>
													<%i++;%>
												</tr>
												<logic:iterate id="cache" name="cacheList" property="value">
													<logic:present name="cache" property="value.childCacheBeans">
														<bean:define id="childValues" name='cache' property='value.childCacheBeans' />
														<logic:iterate id="monitorBean" name="childValues" indexId="cacheListCount" >
															<tr class="bgcolor" onMouseOver="hover(this);" onMouseOut="unHover(this)">
																<td align="left" valign="middle">&nbsp;&nbsp;${cacheListCount+1}</td>
																<td align="left" valign="middle">&nbsp;&nbsp;<bean:write name='monitorBean' property='value.cacheKey' /></td>
																<td align="left" valign="middle">&nbsp;&nbsp;<bean:write name='monitorBean' property='value.cacheClass' /></td>
																<td align="left" valign="middle">&nbsp;&nbsp;<bean:write name='monitorBean' property='value.noOfElements' /></td>
																<td align="left" valign="middle">&nbsp;&nbsp;<bean:write name='monitorBean' property='value.cacheType' /></td>
															</tr>
														</logic:iterate>
													</logic:present>	
												</logic:iterate>
											</table>
										</td>
									</tr>
                            </logic:iterate>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
 
<!-- Button Panel -->
<table width="100%" border=0 >
    <tr>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td>&nbsp;</td>
    </tr>
    <tr align="right" class="barColor">
        <td align="center" width="100%">
            <button dojoType="dijit.form.Button"  type="button"  onclick="window.location =  '<%=ServerUtils.getContextName(request)%>/adminMain.do'  "><bean:message key="admin.monitor.home.button" bundle="admin" />
            </button>
			<button dojoType="dijit.form.Button" id="btnRefresh" type="button"  onclick="window.location =('<%=ServerUtils.getContextName(request)%>/monitorCacheAction.do?operation=return')"><bean:message key="admin.monitor.refresh.button" bundle="admin" />
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
    dijit.byId('refreshRate_Cache_Page').setValue("<%=ESAPI.encoder().encodeForHTML(refreshRate)%>");
    window.status="Done";
    }
</script>
</html:html>