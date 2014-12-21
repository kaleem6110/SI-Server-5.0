<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ page import="java.util.*,com.enterprisehorizons.db.util.*,com.enterprisehorizons.util.* , com.enterprisehorizons.magma.config.dbadmin.*" %> 
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>

<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>



<html>
<head>
<%@ include file="/common/dojo.jsp"%>
<!-- Privileges imports  -->
<%@page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@page import="com.enterprisehorizons.magma.security.util.AccessHelper"%>
<%@page import="com.spacetimeinsight.db.privileges.model.RoleRightsMap"%>
<%@page import="com.spacetimeinsight.stas.privileges.services.PrivilegesConstants"%>
<%@page import="com.enterprisehorizons.magma.security.util.EAccessAction"%>

<%
UserBean userBean = (UserBean)request.getSession(false).getAttribute(ServerUtils.USER_BEAN_NAME);
String moduleId      =(String) session.getAttribute(ServerUtils.PARAM_MODULE_ID);
boolean hasAccessSrcType = AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.MODEL_MAIN_ALERTS_ALT_SRCTYPE,null,EAccessAction.READ_ACCESS); 
boolean hasAccessAlertMod= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.MODEL_MAIN_ALERTS_ALT_MODE,null,EAccessAction.READ_ACCESS);
boolean hasAccessTourNav = AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.MODEL_MAIN_ALERTS_ALT_TOURNAV,null,EAccessAction.READ_ACCESS);
boolean hasAccessAltAlt = AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.MODEL_MAIN_ALERTS_ALT_ALT,null,EAccessAction.READ_ACCESS); 
%>

<!--- Importing the Styles -->

<style>
    @import "<%=ServerUtils.getContextName(request)%>/js/dojo/resources/dojo.css";
    @import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/tundra/tundra.css";
    @import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/tundra/tundra_rtl.css";
    
    .fade_thumbnail
	{
		filter: alpha(opacity=50);
		opacity:0.4;
		cursor:default; 
	}
            
    .thumbnail-item {
        float: left; 
        margin: 5px; 
        padding: 25px; 
        border: 2px #fff solid; 
        cursor: pointer;
        text-align: center;
        background-color: #fafafa;
        width: 150px;
        height: 150px;
        font-size: 11px;
        color: #990000;
        border-color:'#cccccc'
    }

    .thumbnail-item img {
        margin: 0px;
    }
	<%request.getSession().removeAttribute(ModelConfigConstants.GO_BACK);%>
</style>
<script type="text/JavaScript">
    function goToDBHomePage(){
            window.location = "<%=ServerUtils.getContextName(request)%>/adminMain.do";
    }
</script>
<script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/dojo/dojo.js" djConfig="isDebug: false, parseOnLoad: true"></script>
<script type="text/javascript">
            dojo.require("dijit.layout.ContentPane");
            dojo.require("dijit.form.Button");      
</script>
<script type="text/javascript">

function showthumbnails()
{
	
	var thumbnailData = new Array();
	var cols = 6;
	var countThumbs=0;
	var countrows = 0;
	
	thumbnailData.push({"action":"<%=hasAccessSrcType?"masterMaintenanceHomeAction.do?screenCategory=alerts&selectedModelId=com.spacetimeinsight.db.config.alerts.model.AlertSourceType&submitName=btnView&fromScreen=Alerts":""%>", "imagename":"alert-source.png", "label":"Alert Source Type", "rights":<%=hasAccessSrcType%>});
	thumbnailData.push({"action":"<%=hasAccessAlertMod?"masterMaintenanceHomeAction.do?screenCategory=alerts&selectedModelId=com.spacetimeinsight.db.config.alerts.model.AlertMode&submitName=btnView&fromScreen=Alerts":""%>", "imagename":"alertMode.png", "label":"Alert Mode", "rights":<%=hasAccessAlertMod%>});
	thumbnailData.push({"action":"<%=hasAccessTourNav?"masterMaintenanceHomeAction.do?screenCategory=alerts&selectedModelId=com.spacetimeinsight.db.config.alerts.model.AlertNavigation&submitName=btnView&fromScreen=Alerts":""%>", "imagename":"alert-naviagtion.png", "label":"Alert Tour Navigation", "rights":<%=hasAccessTourNav%>});
	thumbnailData.push({"action":"<%=hasAccessAltAlt?"alertRoute.do?swfName=Alerts":""%>", "imagename":"alert.png", "label":"Alert", "rights":<%=hasAccessAltAlt%>});
	
	
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
   				thumbnailText += '<div dojoType="dijit.layout.ContentPane" region="center" class="thumbnail-itemOut fade_thumbnail"  ><div class="thumbnail-itemIn fade_thumbnail" ><img src="<%=ServerUtils.getContextName(request)%>/images/portal/'+thumbnailData[countthumbs]['imagename']+'"  /></div>'+thumbnailData[countthumbs]['label']+'</div>';
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
<body class="tundra bodybg">
<form name= "adminCategory" method="post">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">
	
    <table width="101.2%" cellspacing="0" cellpadding="0" border="0" >
    	<tr>
        	<td  class="pageTitle paddingTitle"> 
            	<bean:message key="dbconfig.alertMaintainHome"/>            
            </td>
       	</tr>
        <tr>
        	<td class="paddingTitleDesc">
            	<strong><bean:message key="dbconfig.alert.category.desc"/></strong>       
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
        <tr align = "right" >         
        	<td height="30" class="barColor">
            	<table width="100%" cellspacing="0" cellpadding="0">                          
                	<td align="center"><button dojoType="dijit.form.Button" class="register"  type="button" onClick="goToDBHomePage()"> <bean:message key="dbconfig.home"/> </button>
                    <button dojoType="dijit.form.Button"  type="button"  onclick="window.location ='<%=ServerUtils.getContextName(request)%>/dbadmin.do'"><bean:message key="dbconfig.back"/> </button>			  
                  	</td>  
				  	<td>&nbsp;</td>				   
                </table>
          	</td>
		</tr>
	</table>
    
 
	 
</form>
</body>
</html>

<script>
function renderPage(url){
	window.location = url;
}
</script>