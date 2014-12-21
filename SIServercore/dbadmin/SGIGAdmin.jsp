<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ page import="com.spacetimeinsight.stas.config.GenericConfigurationManager,com.enterprisehorizons.magma.server.admin.AdminConfigUtils,com.spacetimeinsight.stas.config.ConfigurationConstants"%>

<html>
<head>
<!--- Importing the Styles -->
<%@ include file="/common/dojo.jsp"%>
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

<!-- Privileges imports  -->
<%@page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@page import="com.enterprisehorizons.magma.security.util.AccessHelper"%>
<%@page import="com.spacetimeinsight.db.privileges.model.RoleRightsMap"%>
<%@page import="com.spacetimeinsight.stas.privileges.services.PrivilegesConstants"%>
<%@page import="com.enterprisehorizons.magma.security.util.EAccessAction"%>

<%
UserBean userBean = (UserBean)request.getSession(false).getAttribute(ServerUtils.USER_BEAN_NAME);
String moduleId      =(String) session.getAttribute(ServerUtils.PARAM_MODULE_ID);

boolean hasReportCheckSgig= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.SGIG_REPORTING_CHECKLIST,null,EAccessAction.READ_ACCESS); 
boolean hasReportOrgWbsgig= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.SGIG_REPORTING_ORG_WBS_MAP,null,EAccessAction.READ_ACCESS);
boolean hasReportOrgPartSgig= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.SGIG_REPORTING_ORG_PART_MAP,null,EAccessAction.READ_ACCESS); 

%>
<script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/dojo/dojo.js" djConfig="isDebug: false, parseOnLoad: true"></script>
<script type="text/JavaScript">
    function goToDBHomePage(){
            window.location = "<%=ServerUtils.getContextName(request)%>/adminMain.do";
    }
</script>

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
	
	thumbnailData.push({"action":"<%=hasReportCheckSgig?"masterTableViewAction.do?paramModelName=com.spacetimeinsight.arra.db.models.ChecklistItem&fromScreen=SGIG":""%>", "imagename":"icon_checklist_items.png", "label":"<bean:message key="admin.sgig.checklist" bundle="admin"/>", "rights":<%=hasReportCheckSgig%>});
	thumbnailData.push({"action":"<%=hasReportOrgWbsgig?"masterTableViewAction.do?paramModelName=com.spacetimeinsight.arra.db.models.OrganizationWBSMapping&fromScreen=SGIG":""%>", "imagename":"icon_wbs_mapping.png", "label":"<bean:message key="admin.sgig.orgwbs" bundle="admin"/>", "rights":<%=hasReportOrgWbsgig%>});
	thumbnailData.push({"action":"<%=hasReportOrgPartSgig?"masterTableViewAction.do?paramModelName=com.spacetimeinsight.arra.db.models.OrganizationActCodeMapping&fromScreen=SGIG":""%>", "imagename":"icon_org_participant_mapping.png", "label":"<bean:message key="admin.sgig.orgact" bundle="admin"/>", "rights":<%=hasReportOrgPartSgig%>});
	
	
	
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
		<td align="left">
  			<table width="1000" cellpadding="0" cellspacing="0" align="left">
        		<tr>
      				<td align="left" valign="top" align="justify">
       					<table width="1000" cellspacing="0" cellpadding="0">
       						<tr>
    							<td>&nbsp;</td>
								<td height="30" align="left" valign="top" class="redtitle">
    								<table width="900" cellspacing="0" cellpadding="0" border="0">
        								<tr>
            								<td  class="pageTitle paddingTitle">      
            								<bean:message key="admin.sgig.title" bundle="admin"/>   
            								</td>
        								</tr>
        								<tr>
           									<td class="paddingTitleDesc bodytext">
           								 <strong><bean:message key="admin.sgig.description" bundle="admin"/></strong>
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
    									<!-- Button Panel -->
    									
    									  <table width="101.2%" border=0 >
    									    <tr>
    									      <td>&nbsp;</td>
    									    </tr>
    									    <tr>
    									      <td>&nbsp;</td>
    									    </tr>
    									    <tr  align="right" class="barColor">
    									      <td align="center" width="100%"><button dojoType="dijit.form.Button" class="register"  type="button" onClick="goToDBHomePage()"> <bean:message key="dbconfig.home"/> </button>
    									        </td>
    									    </tr>
    									   </table>
    									  
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
</body>

</html>
<script>
function renderPage(url){   
	window.location = url;
}
dojo.addOnLoad(init);
function init(){
	try{
		parent.setIFrameProperties(false);
	}catch(err){
		//ERROR. when included the application under IFrame
	}
}
</script>