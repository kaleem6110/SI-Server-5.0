<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ include file="/common/dojo.jsp"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<html>
<head>
<!-- Privileges imports  -->
<%@page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@page import="com.enterprisehorizons.magma.security.util.AccessHelper"%>
<%@page import="com.spacetimeinsight.db.privileges.model.RoleRightsMap"%>
<%@page import="com.spacetimeinsight.stas.privileges.services.PrivilegesConstants"%>
<%@page import="com.enterprisehorizons.magma.security.util.EAccessAction"%>

<%
UserBean userBean = (UserBean)request.getSession(false).getAttribute(ServerUtils.USER_BEAN_NAME);
String moduleId      =(String) session.getAttribute(ServerUtils.PARAM_MODULE_ID);
boolean hasAccessCache= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.MONITOR_CACHE_STA,null,EAccessAction.READ_ACCESS); 
boolean hasAccessSession= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.MONITOR_SESS_STA,null,EAccessAction.READ_ACCESS);
boolean hasAccessDsPool= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.MONITOR_DS_POOL,null,EAccessAction.READ_ACCESS); 
boolean hasAccessDynamicDatasourceStatistics = AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.MONITOR_DYNAMIC_DATASOURCE_STATISTICS,null,EAccessAction.READ_ACCESS);
%>
<style>
    @import "<%=ServerUtils.getContextName(request)%>/js/dojo/resources/dojo.css";
    @import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/tundra/tundra.css";
    @import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/tundra/tundra_rtl.css";   
    
    .fade_thumbnail
	{
		filter: alpha(opacity=50);
		opacity:0.4;
	}
</style>
<jsp:include page="/common/charsetmeta.jsp"/>  

<script type="text/javascript">

function showthumbnails()
{
	
	var thumbnailData = new Array();
	var cols = 6;
	var countThumbs=0;
	var countrows = 0;
	
	thumbnailData.push({"action":"<%=hasAccessCache?"monitorCacheAction.do?operation=return":""%>", "imagename":"icon_cachestatistics.png", "label":"<bean:message key='admin.monitor.cache' bundle='admin' />", "rights":<%=hasAccessCache%>});
	thumbnailData.push({"action":"<%=hasAccessSession?"monitorHttpSessionAction.do?operation=return&tabId=session":""%>", "imagename":"icon_sessionstatistics.png", "label":"<bean:message key='admin.monitor.session' bundle='admin' />", "rights":<%=hasAccessSession%>});
	thumbnailData.push({"action":"<%=hasAccessDsPool?"monitorPools.do":""%>", "imagename":"icon_choose_datasource.png", "label":"<bean:message key='admin.monitor.pool' bundle='admin' />", "rights":<%=hasAccessDsPool%>});
	thumbnailData.push({"action":"<%=hasAccessDynamicDatasourceStatistics?"monitorDB.do?operation=showTablesInfo":""%>", "imagename":"icon_monitor_h2db.png", "label":"<bean:message key='admin.monitor.db' bundle='admin' />", "rights":<%=hasAccessDynamicDatasourceStatistics%>});
	
	countThumbs = thumbnailData.length;
	if( thumbnailData.length % cols == 0)
		countrows = parseInt(thumbnailData.length/cols);
	else
		countrows = parseInt((thumbnailData.length/cols)+1);
	
	
	thumbnailText = '<table cellpadding="0" cellspacing="19px">';
	countthumbs = 0;
	
	for(row=1; row <= countrows; row++)
	{
		
		thumbnailText += '<tr>';
		
		for( i=1; i<=cols; i++)
		{
			if(countthumbs < thumbnailData.length)
			{
				if( thumbnailData[countthumbs]['rights'] )
				{
					thumbnailText += '<td>';
   				thumbnailText += '<div dojoType="dijit.layout.ContentPane" region="center"  class="thumbnail-itemOut"  onclick=renderPage("<%=ServerUtils.getContextName(request)%>/'+thumbnailData[countthumbs]["action"]+'")\><div class="thumbnail-itemIn" ><img src="<%=ServerUtils.getContextName(request)%>/images/portal/'+thumbnailData[countthumbs]["imagename"]+'" /></div>'+thumbnailData[countthumbs]["label"]+'</div>';
					thumbnailText += '</td>';
				}
				else
				{
					thumbnailText += '<td>';
   				thumbnailText += '<div dojoType="dijit.layout.ContentPane" region="center" class="thumbnail-itemOut fade_thumbnail" style="cursor:default;" ><div class="thumbnail-itemIn fade_thumbnail" ><img src="<%=ServerUtils.getContextName(request)%>/images/portal/'+thumbnailData[countthumbs]['imagename']+'"  /></div>'+thumbnailData[countthumbs]['label']+'</div>';
					thumbnailText += '</td>';
				}
			}
			else
			{
				thumbnailText += '<td>';
   			
				thumbnailText += '</td>';
				
			}
			countthumbs = countthumbs + 1;
		}
	
		thumbnailText += '</tr>';
	}
	thumbnailText += '</table>';
	document.getElementById("thumbnailTiles").innerHTML = thumbnailText;
}

</script>
</head>
<body class="tundra bodybg" >
<table width="100%" cellspacing="0" cellpadding="0">
    <tr>
        <td  class="pageTitle paddingTitle">      
            <bean:message key="admin.monitor" bundle="admin"/>
        </td>
    </tr>
    <tr>
        <td class="paddingTitleDesc bodytext">
            <strong><bean:message key="admin.monitor.description" bundle="admin" /></strong>
        </td>     
    </tr>
    <tr>
    <td style="padding-left:48px;padding-top:30px;">
        <div id="thumbnailTiles">
        </div>
        <script type="text/javascript">
            showthumbnails();
        </script>
    </td>
</tr>
</table>
<!-- Button Panel -->
  <table width="101.2%" border="0" >
   	<tr class="barColor">
      <td align="center" width="100%"><button dojoType="dijit.form.Button"  type="button"  onclick="window.location =  '<%=ServerUtils.getContextName(request)%>/adminMain.do'  ">
        <bean:message key="admin.monitor.home.button" bundle="admin" />
        </button>
        </td>
    </tr>
   </table>
</body>
</html>


<script>
// to avoid multiple requests on single click
var requestSent = false;
function renderPage(url){
	if(!requestSent){
		window.location = url;
		requestSent = true;
	}
}
</script>