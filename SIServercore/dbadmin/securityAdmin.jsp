<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ page import="com.spacetimeinsight.stas.config.GenericConfigurationManager,com.enterprisehorizons.magma.server.admin.AdminConfigUtils,com.spacetimeinsight.stas.config.ConfigurationConstants"%>

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

	boolean hasUserUGP= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.USR_GRP_PER_MAIN_USERS,null,EAccessAction.READ_ACCESS); 
	boolean hasGroupUGP= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.USR_GRP_PER_MAIN_GROUPS,null,EAccessAction.READ_ACCESS);
	
	boolean hasADGroupUGP= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.USR_GRP_PER_MAIN_GROUPS,null,EAccessAction.READ_ACCESS);
	boolean hasGrpUGP= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.USR_GRP_PER_MAIN_GROUPS,null,EAccessAction.READ_ACCESS);
	
	boolean hasUserGroupUGP= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.USR_GRP_PER_MAIN_USER_GROUP_MAP,null,EAccessAction.READ_ACCESS);
	
	boolean hasModuleGrpUGP= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.USR_GRP_PER_MAIN_MODULE_GROUP_MAP,null,EAccessAction.READ_ACCESS);
	boolean hasEcoSysUGP= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.USR_GRP_PER_MAIN_ECOSYSTEM_MAP,null,EAccessAction.READ_ACCESS);
	
	boolean hasModuUGP= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.USR_GRP_PER_MAIN_MODULES,null,EAccessAction.READ_ACCESS);
	boolean hasRolesUGP= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.USR_GRP_PER_MAIN_ROLES,null,EAccessAction.READ_ACCESS);
	boolean hasRoleGrpModuUGP= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.USR_GRP_PER_MAIN_ROLES_GROUP_MODULE_MAP,null,EAccessAction.READ_ACCESS);
	
	boolean hasRightsUGP= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.USR_GRP_PER_MAIN_RIGHTS,null,EAccessAction.READ_ACCESS);
	boolean hasSubRightsUGP= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.USR_GRP_PER_MAIN_RIGHTS_SUBRIGHTS_MAP,null,EAccessAction.READ_ACCESS);
	boolean hasRoleRightMapUGP= AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.USR_GRP_PER_MAIN_ROLES_RIGHTS_MAP,null,EAccessAction.READ_ACCESS);
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
	}
</style>
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
<%
boolean showFlag = true;

if (AdminConfigUtils.isLDAPDatasource() || AdminConfigUtils.isKRBLDAPDatasource() || AdminConfigUtils.isOpenLDAPDatasource())
	showFlag = false;
%>


<script type="text/javascript">

function showthumbnails()
{
	
	var thumbnailData = new Array();
	var cols = 6;
	var countThumbs=0;
	var countrows = 0;
	
   <%if(!showFlag){%>
   <%if(AdminConfigUtils.isAuthorizeInLDAP()){%>
 		   
     thumbnailData.push({"action":"<%=hasADGroupUGP?"manageADGroup.do":""%>", "imagename":"icon_ad_group_mapping.png", "label":"<bean:message key='admin.adgroupsyncmodule' bundle='admin'/>", "rights":<%=hasADGroupUGP%>});
          
    <%}%>
    <%if(!AdminConfigUtils.isAuthorizeInLDAP()){%>

     thumbnailData.push({"action":"<%=hasADGroupUGP?"masterTableViewAction.do?paramModelName=com.spacetimeinsight.db.security.model.Group&fromScreen=Security":""%>", "imagename":"icon_groups.png", "label":"<bean:message key='admin.groups' bundle='admin'/>", "rights":<%=hasADGroupUGP%>});	           
      
    <%}%>        
    <%}else{%>
            
      thumbnailData.push({"action":"<%=hasADGroupUGP?"userAction.do?operation=showAllUsers&pageNo=1":"" %>", "imagename":"icon_user.png", "label":"<bean:message key='admin.user' bundle='admin'/>", "rights":<%=hasUserUGP%>});	          
      thumbnailData.push({"action":"<%=hasADGroupUGP?"masterTableViewAction.do?paramModelName=com.spacetimeinsight.db.security.model.Group&fromScreen=Security":""%>", "imagename":"icon_groups.png", "label":"<bean:message key='admin.groups' bundle='admin'/>", "rights":<%=hasGrpUGP%>});
            
   <%}%>   
       
     thumbnailData.push({"action":"<%=hasModuUGP?"moduleAction.do?operation=showAllModules&pageNo=1":""%>", "imagename":"modules.png", "label":"<label><bean:message key="admin.module" bundle="admin"/>", "rights":<%=hasModuUGP%>});
    
   <!--  Same user group Mapping screen is used for  DB and LDAP with authorize in ldap false  -->
   <%if(!AdminConfigUtils.isLDAPDatasource() && !AdminConfigUtils.isOpenLDAPDatasource() && !AdminConfigUtils.isKRBLDAPDatasource() || !AdminConfigUtils.isAuthorizeInLDAP()){%>

     thumbnailData.push({"action":"<%=hasADGroupUGP?"authorizeInLDAP.do?paramModelName=com.spacetimeinsight.db.security.model.UserGroup&fromScreen=Security":""%>", "imagename":"icon_user_group_mapping.png", "label":"<bean:message key='admin.usergrpmapping' bundle='admin'/>", "rights":<%=hasUserGroupUGP%>});	            
 
   <%}%>
	
	thumbnailData.push({"action":"<%=hasModuleGrpUGP?"masterTableViewAction.do?paramModelName=com.spacetimeinsight.db.config.model.ModuleGroupMap&fromScreen=Security":""%>", "imagename":"icon_module_group_mapping.png", "label":"<bean:message key="admin.moduleGroupMapping" bundle="admin"/>", "rights":<%=hasModuleGrpUGP%>});
	thumbnailData.push({"action":"<%=hasEcoSysUGP?"manageRoles.do":""%>", "imagename":"icon_ecosys_group_mapping.png", "label":"<bean:message key="admin.ecoSystemGroupMapping" bundle="admin"/>", "rights":<%=hasEcoSysUGP%>});	
	thumbnailData.push({"action":"<%=hasRolesUGP?"masterTableViewAction.do?paramModelName=com.spacetimeinsight.db.privileges.model.RoleMaster&fromScreen=Security":""%>", "imagename":"roles.png", "label":"<bean:message key="admin.roles" bundle="admin"/>", "rights":<%=hasRolesUGP%>});
    thumbnailData.push({"action":"<%=hasRightsUGP?"masterTableViewAction.do?paramModelName=com.spacetimeinsight.db.privileges.model.RightsMaster&fromScreen=Security":""%>", "imagename":"rights.png", "label":"<bean:message key="admin.rights" bundle="admin"/>", "rights":<%=hasRightsUGP%>});
	thumbnailData.push({"action":"<%=hasSubRightsUGP?"masterTableViewAction.do?paramModelName=com.spacetimeinsight.db.privileges.model.SubRightsMaster&fromScreen=Security":""%>", "imagename":"sub-rights.png", "label":"<bean:message key="admin.sub.rights" bundle="admin"/>", "rights":<%=hasSubRightsUGP%>});
	thumbnailData.push({"action":"<%=hasRoleRightMapUGP?"mapRoleRight.do":""%>", "imagename":"roles-right-mapping.png", "label":"<bean:message key="admin.role.right.subright.map" bundle="admin"/>", "rights":<%=hasRoleRightMapUGP%>});
	thumbnailData.push({"action":"<%=hasRoleGrpModuUGP?"masterTableViewAction.do?paramModelName=com.spacetimeinsight.db.privileges.model.RoleGroupModuleMap&fromScreen=Security":""%>", "imagename":"group-module-role-mapping.png", "label":"<bean:message key="admin.group.module.role.mapping" bundle="admin"/>", "rights":<%=hasRoleGrpModuUGP%>});
		
	
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
   				thumbnailText += '<div dojoType="dijit.layout.ContentPane" region="center" class="thumbnail-itemOut fade_thumbnail" style="cursor:default;"  ><div class="thumbnail-itemIn fade_thumbnail" ><img src="<%=ServerUtils.getContextName(request)%>/images/portal/'+thumbnailData[countthumbs]['imagename']+'"  /></div>'+thumbnailData[countthumbs]['label']+'</div>';
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
<table width="101.2%" cellspacing="0" cellpadding="0" align="center"  border="0" >
            <tr>
                <td  class="pageTitle paddingTitle"> 
                <%if(!showFlag){%>
                 <bean:message key="admin.security.LDAP.title" bundle="admin"/>                
                <%}else{%>
                 <bean:message key="admin.security.title" bundle="admin"/>                
                <%}%>     

                </td>
            </tr>
            <tr>
               <td class="paddingTitleDesc">
                <%if(!showFlag){%>
                 <strong><bean:message key="admin.security.LDAP.description" bundle="admin"/></strong>                
                <%}else{%>
                 <strong><bean:message key="admin.security.description" bundle="admin"/></strong>
                <%}%>     



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
               <tr>         
          <td height="30"  class="barColor" align="center">
            <button dojoType="dijit.form.Button" class="register"  type="button" onClick="goToDBHomePage()"> <bean:message key="dbconfig.home"/> </button> 			  
                 
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