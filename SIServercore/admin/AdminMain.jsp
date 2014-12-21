<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ page import="com.spacetimeinsight.stas.config.GenericConfigurationManager,com.enterprisehorizons.magma.server.admin.AdminConfigUtils,com.spacetimeinsight.stas.config.ConfigurationConstants"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>

<!-- Privileges imports  -->
<%@page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@page import="com.enterprisehorizons.magma.security.util.AccessHelper"%>
<%@page import="com.spacetimeinsight.db.privileges.model.RoleRightsMap"%>
<%@page import="com.spacetimeinsight.stas.privileges.services.PrivilegesConstants"%>
<%@page import="com.enterprisehorizons.magma.security.util.EAccessAction"%>
<%@page import="com.enterprisehorizons.magma.config.dbadmin.ModelConfigConstants"%>


<%
    session.removeAttribute(ModelConfigConstants.SESSION_MODEL_NAME);
	UserBean userBean = (UserBean)request.getSession(false).getAttribute(ServerUtils.USER_BEAN_NAME);
	String moduleId  =request.getParameter(ServerUtils.PARAM_MODULE_ID); 	
	if(moduleId==null){
		moduleId = (String) session.getAttribute(ServerUtils.PARAM_MODULE_ID);		
	}
	session.setAttribute(ServerUtils.PARAM_MODULE_ID,moduleId);

	if(userBean == null){ %>
	<script>
		window.location = "<%=ServerUtils.getContextName(request)%>/";				
	</script>
<%	}

	boolean hasEcoSysDSAccess= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.Right.ECOSYSTEM_DATASOURCE,null,EAccessAction.READ_ACCESS); 
	boolean hasModelMaintAccess= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.Right.MODEL_MAIN,null,EAccessAction.READ_ACCESS); 
	boolean hasSchedulerAccess= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.Right.SCHEDULERS,null,EAccessAction.READ_ACCESS); 
	boolean hasCacheAccess= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.Right.CACHE,null,EAccessAction.READ_ACCESS); 
	boolean hasShapeToDBMapAccess= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.Right.SHAPE_TO_DB_MAPPING,null,EAccessAction.READ_ACCESS); 
	boolean hasExpShapeToDBAccess= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.Right.SHAPE_TO_DB_EXPORT,null,EAccessAction.READ_ACCESS); 
	boolean hasKmlKmzAccess= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.Right.KMZ_GENERATOR,null,EAccessAction.READ_ACCESS); 
	boolean hasManageFileAccess= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.Right.MANAGE_FILES,null,EAccessAction.READ_ACCESS); 
	boolean hasDeleteFilesAccess= true;//AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.Right.DELETE_UPLOADED_FILES,null,EAccessAction.READ_ACCESS); 
	
	boolean hasUnDepEcoSysFilesAccess= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.Right.UNDEPLOY_ECOSYSTEM_FILES ,null,EAccessAction.READ_ACCESS); 
	boolean hasManageConfigAccess= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.Right.MANAGE_CONF,null,EAccessAction.READ_ACCESS); 
	boolean hasUsrGrpPerAccess= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.Right.USR_GRP_PER_MAIN,null,EAccessAction.READ_ACCESS);
	boolean hasSgigAccess= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.Right.SGIG_REPORTING ,null,EAccessAction.READ_ACCESS);
	boolean hasMonitorAccess= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.Right.MONITOR,null,EAccessAction.READ_ACCESS);
	boolean hasPIAccess= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.Right.PI_MAIN,null,EAccessAction.READ_ACCESS);
	boolean hasLoggerAccess= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.Right.LOGGER,null,EAccessAction.READ_ACCESS);
	boolean hasAuditAccess= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.Right.AUDIT,null,EAccessAction.READ_ACCESS);
	boolean manageLassoAndFavAccess= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.Right.AUDIT,null,EAccessAction.READ_ACCESS);

	boolean showLdapText = false;

if (AdminConfigUtils.isLDAPDatasource() || AdminConfigUtils.isKRBLDAPDatasource() || AdminConfigUtils.isOpenLDAPDatasource())
	showLdapText = true;

%>
<html>
<head>

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
<script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/dojo/dojo.js" djConfig="isDebug: false, parseOnLoad: true"></script>
<script type="text/javascript">
            dojo.require("dijit.layout.ContentPane");
</script>
<jsp:include page="/common/charsetmeta.jsp"/>
<script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/sessionTimeOut.js"></script>  
<%@ include file="/common/style.jsp"%>

<script type="text/javascript">

     function showthumbnails()
	 {
		
		var thumbnailData = new Array();
		var cols = 6;
		var countThumbs=0;
		var countrows = 0;
		//alert(<%=hasEcoSysDSAccess%>+" ECOSYSTEM_DATASOURCE "+<%=hasModelMaintAccess%>+" MODEL_MAIN "+ <%=hasSchedulerAccess%>+" SCHEDULERS "+ <%=hasCacheAccess%>+" CACHE "+	<%=hasShapeToDBMapAccess%>+" SHAPE_TO_DB_MAPPING "+	<%=hasExpShapeToDBAccess%>+" SHAPE_TO_DB_EXPORT "+	<%=hasKmlKmzAccess%>+" KMZ_GENERATOR "+ <%=hasManageFileAccess%>+" UPLOAD_FILES "+<%=hasDeleteFilesAccess%>+" DELETE_UPLOADED_FILES "+<%=hasUnDepEcoSysFilesAccess%>+" UNDEPLOY_ECOSYSTEM_FILES  "+<%=hasManageConfigAccess%>+" MANAGE_CONF "+<%=hasUsrGrpPerAccess%>+" USR_GRP_PER_MAIN "+<%=hasSgigAccess%>+" SGIG_REPORTING  "+<%=hasMonitorAccess%>+" MONITOR "+<%=hasPIAccess%>+" PI_MAIN ");

		thumbnailData.push({"action":"<%=hasEcoSysDSAccess?"WizardHomeAction.do?operation=showAllDatasource&pageNo=1":""%>", "imagename":"icon_datsources.png", "label":"<bean:message key='admin.datasources' bundle='admin'/>", "rights":<%=hasEcoSysDSAccess%>});
		thumbnailData.push({"action":"<%=hasModelMaintAccess?"dbadmin.do":""%>", "imagename":"icon_database_maintenance.png", "label":"<bean:message key='admin.databaseMaintenance' bundle='admin'/>", "rights":<%=hasModelMaintAccess%>});
		thumbnailData.push({"action":"<%=hasSchedulerAccess?"startStopAction.do?operation=refresh&jobName=null":""%>", "imagename":"icon_schedule.png", "label":"<bean:message key='admin.schedule.text' bundle='admin'/>", "rights":<%=hasSchedulerAccess%>});
		thumbnailData.push({"action":"<%=hasCacheAccess?"cache.do":""%>", "imagename":"icon_cache.png", "label":"<bean:message key='admin.cache' bundle='admin'/>", "rights":<%=hasCacheAccess%>});
		thumbnailData.push({"action":"<%=hasShapeToDBMapAccess?"shapedbMapping.do":""%>", "imagename":"icon_shape_to_db_mapping.png", "label": "<bean:message key='admin.shapeToDatabaseMapping' bundle='admin'/>", "rights":<%=hasShapeToDBMapAccess%>});
		thumbnailData.push({"action":"<%=hasExpShapeToDBAccess?"shapedbExport.do":""%>", "imagename":"icon_shape_to_db.png", "label":"<bean:message key='admin.shapeToDatabase' bundle='admin'/>", "rights":<%=hasExpShapeToDBAccess%>});
		thumbnailData.push({"action":"<%=hasKmlKmzAccess?"generateKmlKmz.do":""%>", "imagename":"icon_ge.png", "label":"<bean:message key='admin.kmlKmzGenerator' bundle='admin'/>", "rights":<%=hasKmlKmzAccess%>});
		thumbnailData.push({"action":"<%=hasManageFileAccess?"flexMultiFileUploadAction.do?flag=show&frommainpage=true":""%>", "imagename":"icon_manage_files.png", "label":"<bean:message key='admin.uploadFiles' bundle='admin'/>", "rights":<%=hasManageFileAccess%>});
		/*thumbnailData.push({"action":"deleteFileAction.do?flag=view", "imagename":"icon_delete_uploaded_files.png", "label":"<bean:message key='admin.deleteUploadedFiles' bundle='admin'/>", "rights":<%=hasDeleteFilesAccess%>});*/
		thumbnailData.push({"action":"<%=hasUnDepEcoSysFilesAccess?"unDeployEcoAction.do?flag=view":""%>", "imagename":"icon_undeploy_ecosys_files.png", "label":"<bean:message key='admin.undeployEcosystemFiles' bundle='admin'/>", "rights":<%=hasUnDepEcoSysFilesAccess%>});
		thumbnailData.push({"action":"<%=hasManageConfigAccess?"manageConfigAction.do?flag=view":""%>", "imagename":"icon_manage_config.png", "label":"<bean:message key='admin.manageConfigurations' bundle='admin'/>", "rights":<%=hasManageConfigAccess%>});
		
		if(<%=showLdapText%>){		
		  thumbnailData.push({"action":"<%=hasUsrGrpPerAccess?"dbaAdminSecurity.do?flag=view":""%>", "imagename":"icon_security.png", "label":"<bean:message key='admin.security.LDAP' bundle='admin'/>", "rights":<%=hasUsrGrpPerAccess%>});
         }else{
		  thumbnailData.push({"action":"<%=hasUsrGrpPerAccess?"dbaAdminSecurity.do?flag=view":""%>", "imagename":"icon_security.png", "label":"<bean:message key='admin.security' bundle='admin'/>", "rights":<%=hasUsrGrpPerAccess%>});                          
		}  
		
		//thumbnailData.push({"action":"<%=hasSgigAccess?"sgigAdmin.do?flag=view":""%>", "imagename":"icon_sgig_reporting.png", "label":"<bean:message key='admin.sgig' bundle='admin'/>", "rights":<%=hasSgigAccess%>});
		thumbnailData.push({"action":"<%=hasMonitorAccess?"monitor.do?flag=view":""%>", "imagename":"icon_monitor.png", "label":"<bean:message key='admin.monitor' bundle='admin'/>", "rights":<%=hasMonitorAccess%>});
		thumbnailData.push({"action":"<%=hasPIAccess?"pi.do?flag=view":""%>", "imagename":"pi.png", "label":"<bean:message key='admin.pi' bundle='admin'/>", "rights":<%=hasPIAccess%>});
		thumbnailData.push({"action":"<%=hasLoggerAccess?"loggerAction.do":""%>", "imagename":"logger.png", "label":"Logger", "rights":<%=hasLoggerAccess%>});
		thumbnailData.push({"action":"<%=hasAuditAccess?"audit.do":""%>", "imagename":"icon_audit.png", "label":"Audit", "rights":<%=hasAuditAccess%>});
			thumbnailData.push({"action":"<%=manageLassoAndFavAccess?"reassigndelfavnlassos.do":"reassigndelfavnlassos.do"%>", "imagename":"icon_managelasso.png", "label":"Manage Lassos and Favorites", "rights":<%=manageLassoAndFavAccess%>});
		
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
        				thumbnailText += '<div dojoType="dijit.layout.ContentPane" region="center"  class="thumbnail-itemOut"  onclick=renderPage("<%=ServerUtils.getContextName(request)%>/'+thumbnailData[countthumbs]["action"]+'") ><div class="thumbnail-itemIn" ><img src="<%=ServerUtils.getContextName(request)%>/images/portal/'+thumbnailData[countthumbs]["imagename"]+'" /></div>'+thumbnailData[countthumbs]["label"]+'</div>';
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
                 									<bean:message key="admin.title" bundle="admin"/>
                								</td>
            								</tr>
            								<tr>
               									<td class="paddingTitleDesc bodytext">
                 									<strong><bean:message key="admin.title.description" bundle="admin"/></strong>
                								</td>  
            								</tr>
            								<tr>
                                                <td style="padding-left:48px;">
                                                    <div id="thumbnailTiles">
                                                    </div>
                                                    <script type="text/javascript">
                                                        showthumbnails();
                                                    </script>
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