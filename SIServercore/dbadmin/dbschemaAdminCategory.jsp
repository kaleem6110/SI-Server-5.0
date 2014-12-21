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
boolean hasAccessPlat  = AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.MODEL_MAIN_PLATFM,null,EAccessAction.READ_ACCESS); 
boolean hasAccessCof  = AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.MODEL_MAIN_CONFIG,null,EAccessAction.READ_ACCESS);
boolean hasAccessJ2ee = AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.MODEL_MAIN_J2EE_DS,null,EAccessAction.READ_ACCESS); 
boolean hasAccessAlrt  = AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.MODEL_MAIN_ALERTS,null,EAccessAction.READ_ACCESS);
boolean hasAccessExpo  = AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.MODEL_MAIN_EXPORT_MASTER_DATA,null,EAccessAction.READ_ACCESS);
boolean hasAccessCep  = AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.MODEL_MAIN_CEP_CONF,null,EAccessAction.READ_ACCESS);
boolean hasAccessModuleCatMap  = AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.MODEL_MAIN_CONFIG_MOD_CAT_MAP,null,EAccessAction.READ_ACCESS);
boolean hasAccessDynamicDatasource = AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.MODEL_MAIN_DYNAMIC_DATASOURCE,null,EAccessAction.READ_ACCESS); 
boolean hasAccessDynamicQueryBrowser = AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.SubRight.MODEL_MAIN_QUERY_BROWSER,null,EAccessAction.READ_ACCESS);
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
    
    thumbnailData.push({"action":"<%=hasAccessPlat?"masterMaintenanceHomeAction.do?screenCategory=platform":""%>", "imagename":"icon_platform.png", "label":"Platform", "rights":<%=hasAccessPlat%>});
    thumbnailData.push({"action":"<%=hasAccessCof?"masterMaintenanceHomeAction.do?screenCategory=config":""%>", "imagename":"icon_config.png", "label":"Configuration", "rights":<%=hasAccessCof%>});
    thumbnailData.push({"action":"<%=hasAccessJ2ee?"WizardHomeAction.do?operation=showAllJ2EEDatasource&pageNo=1":""%>", "imagename":"icon_choose_datasource.png", "label":"J2EE Datasources", "rights":<%=hasAccessJ2ee%>});
    thumbnailData.push({"action":"<%=hasAccessAlrt?"ams.do":""%>", "imagename":"alertMessaging.png", "label":"Alerts", "rights":<%=hasAccessAlrt%>});
    thumbnailData.push({"action":"<%=hasAccessExpo?"exportAdmin.do":""%>", "imagename":"icon_export.png", "label":"Export Master Data", "rights":<%=hasAccessExpo%>});
    thumbnailData.push({"action":"<%=hasAccessCep?"CEPAction.do":""%>", "imagename":"icon_CEP.png", "label":"CEP Configuration", "rights":<%=hasAccessCep%>});
    thumbnailData.push({"action":"<%=hasAccessModuleCatMap?"userPreferencesConfigAction.do?operation=showAllModulePrefMapping&pageNo=1":""%>", "imagename":"module_pref_mapping.png", "label":"Module and Preference Category Mapping", "rights":<%=hasAccessModuleCatMap%>});
    thumbnailData.push({"action":"<%=hasAccessDynamicDatasource?"masterTableViewAction.do?paramModelName=com.spacetimeinsight.db.config.model.DynamicDatasource&fromScreen=dbAdmin":""%>", "imagename":"modules.png", "label":"<label><bean:message key="admin.dynamicDatasources" bundle="admin"/>", "rights":<%=hasAccessDynamicDatasource%>});
	thumbnailData.push({"action":"<%=hasAccessDynamicQueryBrowser?"dynamicDatasourceQueryBrowser.do":""%>", "imagename":"inmemory-querybrowser.png", "label":"<bean:message key='admin.monitor.db.query.browser' bundle='admin' />", "rights":<%=hasAccessDynamicQueryBrowser%>});	
    
    
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
<body class="tundra bodybg" >
<form name= "adminCategory" method="post">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">
    <table width="101.2%" cellspacing="0" cellpadding="0" border="0" >
        <tr>
            <td  class="pageTitle paddingTitle"> 
                <bean:message key="dbconfig.modelMaintainHome"/>                
            </td>
        </tr>
        <tr>
            <td class="paddingTitleDesc">
                <strong><bean:message key="dbconfig.data.category.desc"/></strong>       
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