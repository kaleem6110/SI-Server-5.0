<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>



<html>
<head>
<%@ include file="/common/dojo.jsp"%>
<style>
    @import "<%=ServerUtils.getContextName(request)%>/js/dojo/resources/dojo.css";
    @import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/tundra/tundra.css";
    @import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/tundra/tundra_rtl.css";
</style>

<!--- Importing the Styles -->

<script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/dojo/dojo.js" djConfig="isDebug: false, parseOnLoad: true"></script>
<script type="text/javascript">
            dojo.require("dijit.layout.ContentPane");
			dojo.require("dijit.form.Button");
			dojo.require("dojo.parser");	// scan page for widgets and instantiate them
</script>
</head>
<body class="tundra bodybg" >
	<table width="100%" cellspacing="0" cellpadding="0" border = "0">

		<tr>
			<td  class="pageTitle paddingTitle">      
				<bean:message key="datasource.addDatasourceFieldset" bundle="ds"/>
			</td>
		</tr>
       
		<tr>
			<td  class="paddingTitleDesc bodytext">      
			<strong><bean:message key="datasource.addDatasourceDescription" bundle="ds"/></strong>
			</td>
		</tr>
        
     </table>   


	 <table width="60%"  cellspacing="0" cellpadding="0" border="0">
		<tr>
			
			<td width = "12%" style = "padding-left : 67px;padding-top : 30px;">

				<div dojoType="dijit.layout.ContentPane" region="center" class="thumbnail-itemOut" onClick="renderPage('database.do')">
                
				<div  class="thumbnail-itemIn"  > <img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_choose_datasource.png" /> </div>
                <bean:message key="datasource.databaseLabel" bundle="ds" />

                </div>

			</td>
			
			<td style = "padding-left : 19px;padding-top : 30px;">
				<div dojoType="dijit.layout.ContentPane" region="center" class="thumbnail-itemOut" onClick="renderPage('shapefile.do')">
                 <div  class="thumbnail-itemIn"  > <img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_shape_to_db_mapping.png" /> </div>
                 <bean:message key="datasource.shapefileLabel" bundle="ds" />
                 </div>
			</td>
                
				<td style = "padding-left : 19px;padding-top : 30px;">
					<div dojoType="dijit.layout.ContentPane" region="center" class="thumbnail-itemOut" onClick="renderPage('rssFeed.do')">
                    <div  class="thumbnail-itemIn"  > <img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_rss.png" /> </div>
                    <bean:message key="datasource.rssFeedLabel" bundle="ds" />
                    </div>
				</td>
                
				<td style = "padding-left : 19px;padding-top : 30px;">
					<div dojoType="dijit.layout.ContentPane" region="center" class="thumbnail-itemOut" onClick="renderPage('excel.do')">
                    <div  class="thumbnail-itemIn"  > <img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_xls.png" /> </div>
                    <bean:message key="datasource.excelLabel" bundle="ds" />
                    </div>
				</td>

                <td style = "padding-left : 19px;padding-top : 30px;">
					<div dojoType="dijit.layout.ContentPane" region="center" class="thumbnail-itemOut" onClick="renderPage('hibernate.do')">
                    <div  class="thumbnail-itemIn"  > <img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_hibernate.png" /> </div>
                    <bean:message key="datasource.hibernateLabel" bundle="ds" />
                    </div>
				</td>

          
	
                <td style = "padding-left : 19px;padding-top : 30px;">
					<div dojoType="dijit.layout.ContentPane" region="center" class="thumbnail-itemOut" onClick="renderPage('<%=ServerUtils.getContextName(request)%>/ConfigureDataSource.do?operation=loadJoinDatasource')">
	                <div  class="thumbnail-itemIn"  > <img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_join_datasources.png" /></div>
                    <bean:message key="datasource.joinDatasourceLabel" bundle="ds" />
                    </div>
				</td>
			</tr>
	</table>
	
		
	<table width="101.2%" cellspacing="0" cellpadding="0" align="center"  border="0" >

		<tr>
			<td style = "padding-top : 4px;">&nbsp;
			
			</td>
		</tr>

		<tr>
		
			<td class="barColor" align="center" width="100%">
				<button dojoType="dijit.form.Button"  type="button"  onclick="window.location =  '<%=ServerUtils.getContextName(request)%>/adminMain.do'  ">
				<bean:message key="datasource.home" bundle="ds" />
		        </button>
				<button dojoType="dijit.form.Button"  type="button" onClick="window.location = 'WizardHomeAction.do?operation=showAllDatasource&pageNo=1' "> <bean:message key="datasource.back" bundle="ds" /> </button>
			</td>
		</tr>


    </table>

</body>
</html>
<script>
function renderPage(url){
	window.location = url;
}
</script>