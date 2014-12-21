<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-nested" prefix="nested"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="java.util.List"%>
<%@ page import="org.owasp.esapi.ESAPI" %>
<%@page import="com.enterprisehorizons.util.StringUtils"%>
<%@page import="com.enterprisehorizons.magma.ecoweb.bean.NewEcoDataSourceBean"%>

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
  RoleRightsMap roleRightsMap	= AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.Right.ECOSYSTEM_DATASOURCE,moduleId);  
  //Changes for applying Privileges -- End
  
%>


<head>
<%@ include file="/common/dojo.jsp"%>
 <% 
     int jdbCounter=1;
 %>

<script>
     function hover(obj){
        obj.className='class_hover';
    }

    function unHover(obj, row_num){
        if (tr_selected != row_num) obj.className = 'class_no_hover bgcolor';

    }

    function previousPage(){
        var pageNo = document.getElementById("pageNo").value;

        if(parseInt(pageNo)>1){
            document.forms[0].pageNo.value = (parseInt(pageNo)-1);
            document.forms[0].operation.value='showAllDatasource';
            document.forms[0].action="./WizardHomeAction.do";
            document.forms[0].submit();
        }
    }


    function nextPage(){
        var pageNo = document.getElementById("pageNo").value;
        var totalNoOfPages = document.getElementById("totalNoOfPages").value;
        if(parseInt(pageNo)<totalNoOfPages){
            document.forms[0].pageNo.value = (parseInt(pageNo)+1);
            document.forms[0].operation.value='showAllDatasource';
            document.forms[0].action="./WizardHomeAction.do";
            document.forms[0].submit();
        }
    }

    function gotoPage(pageNo){
            document.forms[0].pageNo.value = pageNo;
            document.forms[0].operation.value='showAllDatasource';
            document.forms[0].action="./WizardHomeAction.do";
            document.forms[0].submit();
    }

    function onEnterGoToPage(){
        if(window.event.keyCode==13){ 
            var pageNo = document.getElementById("enteredPageNo").value;
            var totalNoOfPages = document.getElementById("totalNoOfPages").value;
            if(parseInt(pageNo)>=1 && parseInt(pageNo)<=totalNoOfPages){
                document.forms[0].pageNo.value = pageNo;
                document.forms[0].operation.value='showAllDatasource';
                document.forms[0].action="./WizardHomeAction.do";
                document.forms[0].submit();
            }       
        }
    }

  function configureDS(){
    window.location = "WizardHomeAction.do?operation=configureDatasource";
  }

  var ecoDatasourceId, datasourceName, driverName, url, userId, pwd, dbTableName, filename, query, latitude, longitude, order, mashupId;

function viewEcoDatasource(ecoDatasourceId, datasourceName, primaryDB1, secondaryDB1, dbTableName, filename, latitude, longitude, coordinates, order, mashupId, datasourceDesc, srcPrjDef, srcPrjUnits){
    innerData = '<br><fieldset style="width: 100%"> <legend class="bigtext"><strong><bean:message key="datasource.database.properties.title" bundle="ds"/></strong></legend><table cellspacing="5" cellPadding="3"> <tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.datasourcename.label" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td align="left" class="textnormal12">'+datasourceName+'</td></tr><tr><td class="textnormal12" style="padding-left:20px" ><strong><bean:message key="datasource.desc" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left" style="overflow:hidden;word-break:break-all;">'+datasourceDesc+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.primaryDS" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+primaryDB1+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.failoverDS" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+secondaryDB1+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.query.label" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+document.getElementById('query'+ecoDatasourceId).value+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.tablename.label" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+dbTableName+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.sourceprjdef.label" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+srcPrjDef+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.srcprojectunit.label" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+srcPrjUnits+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.latitude.label" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+latitude+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.longitude.label" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+longitude+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.coordinate.label" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+coordinates+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.order.label" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+order+'</td></tr></table></fieldset>';
    openInfoframe(innerData, '<bean:message key="datasource.database.title" bundle="ds"/>', 200);
    
    }   
    
function viewShapeFileDatasource(ecoDatasourceId, datasourceName, datasourceDesc, filename, datarenderTypeId, srcPrjDef, srcPrjUnits,  datasourceTypeId){
    var datarender='';
    if(datarenderTypeId == 1 ){
        datarender = '<bean:message key="datasource.daterender.collection" bundle="ds"/>';
    }else if(datarenderTypeId == 2){
        datarender = '<bean:message key="datasource.datarender.enumeration" bundle="ds"/>';
    }
        innerData = '<br><fieldset style="width: 100%"> <legend class="bigtext"><strong><bean:message key="datasource.shapefile.properties.title" bundle="ds"/></strong></legend><table cellspacing="5" cellPadding="3"> <tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.datasourcename.label" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td align="left" class="textnormal12" >'+datasourceName+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.desc" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left" style="overflow:hidden;word-break:break-all;">'+datasourceDesc+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.shapefile.name" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+filename+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.shapefile.datarendertype" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+datarender+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.sourceprjdef.label" bundle="ds"/><strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+srcPrjDef+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.srcprojectunit.label" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+srcPrjUnits+'</td></tr></table></fieldset>';
        openInfoframe(innerData, '<bean:message key="datasource.shapefile.title" bundle="ds"/>', 200);
}

function viewRssFeedDatasource(ecoDatasourceId, datasourceName, datasourceDesc, rssfeedUrl, rssfeedName, srcPrjDef, srcPrjUnits,  datasourceTypeId){
        innerData = '<br><fieldset style="width: 100%"> <legend class="bigtext"><strong><bean:message key="datasource.rssfeed.properties.title" bundle="ds"/></strong></legend><table cellspacing="5" cellPadding="3"> <tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.datasourcename.label" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td align="left" class="textnormal12" >'+datasourceName+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.desc" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left" style="overflow:hidden;word-break:break-all;">'+datasourceDesc+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.rssfeed.url" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+rssfeedUrl+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.sourceprjdef.label" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left"> '+srcPrjDef+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.srcprojectunit.label" bundle="ds"/><strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td></td><td class="textnormal12" align="left">'+srcPrjUnits+'</td></tr></table></fieldset>';
        openInfoframe(innerData,'<bean:message key="datasource.rssfeed.title" bundle="ds"/>',200);
}

function viewExcelFileDatasource(ecoDatasourceId, datasourceName, datasourceDesc, excelName, excelLatitude, excelLongitude, excelCoordinates, address,addCity,addCounty,addState,addCountry,addZipCode,datasourceTypeId, srcPrjDef, srcPrjUnits){
        innerData = '<br><fieldset style="width: 100%"> <legend class="bigtext"><strong><bean:message key="datasource.excel.properties.title" bundle="ds"/></strong></legend><table cellspacing="5" cellPadding="3"> <tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.datasourcename.label" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+datasourceName+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.desc" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left" style="overflow:hidden;word-break:break-all;">'+datasourceDesc+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.excel.name" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+excelName+'</td></tr><tr><td class="textnormal12"  style="padding-left:20px"><strong><bean:message key="datasource.sourceprjdef.label" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left"> '+srcPrjDef+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.srcprojectunit.label" bundle="ds"/><strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td></td><td class="textnormal12" align="left">'+srcPrjUnits+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.latitude.label" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+excelLatitude+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.longitude.label" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left"> '+excelLongitude+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.coordinate.label" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+excelCoordinates+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.address" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+address+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.city" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+addCity+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.county" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+addCounty+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.state" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+addState+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.country" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+addCountry+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.zipcode" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+addZipCode+'</td></tr></table></fieldset>';
        openInfoframe(innerData,'<bean:message key="datasource.excel.title" bundle="ds"/>',200);
}

function viewHibernateDatasource(ecoDatasourceId, datasourceName, datasourceDesc, excelName, excelLatitude, excelLongitude, excelCoordinates,address,addCity,addCounty,addState,addCountry,addZipCode,  datasourceTypeId, srcPrjDef, srcPrjUnits){
        innerData = '<br><fieldset style="width: 100%"> <legend class="bigtext"><strong><bean:message key="datasource.hibernate.properties.title" bundle="ds"/></strong></legend><table cellspacing="5" cellPadding="3"> <tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.datasourcename.label" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+datasourceName+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.desc" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left" style="overflow:hidden;word-break:break-all;">'+datasourceDesc+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.excel.name" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+excelName+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.sourceprjdef.label" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12"align="left"> '+srcPrjDef+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.srcprojectunit.label" bundle="ds"/><strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td></td><td class="textnormal12"align="left">'+srcPrjUnits+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.latitude.label" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12"align="left">'+excelLatitude+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.longitude.label" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12"align="left"> '+excelLongitude+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.coordinate.label" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+excelCoordinates+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.address" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+address+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.city" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+addCity+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.county" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+addCounty+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.state" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+addState+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.country" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+addCountry+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.zipcode" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left">'+addZipCode+'</td></tr></table></fieldset>';
        openInfoframe(innerData,'<bean:message key="datasource.hibernate.title" bundle="ds"/>',200);
}


function viewJoinDatasource(ecoDatasourceId, datasourceName, datasourceDesc, firstDSN,secondDSN,firstList, secondList, srcPrjDef, srcPrjUnits ){

    var buffer='<table  cellspacing="5" cellPadding="3"><tr><td align="left" class="textnormal12" ><strong><bean:message key="datasource.first.dsn" bundle="ds"/></strong></td><td>&nbsp;&nbsp;<strong>:</strong>&nbsp;</td><td class="textnormal12" align="left">'+firstDSN+'</td><td>&nbsp;&nbsp;</td><td class="textnormal12" align="left"><strong><bean:message key="datasource.second.dsn" bundle="ds"/></strong></td><td>&nbsp;&nbsp;<strong>:</strong>&nbsp;</td><td class="textnormal12" align="left">'+secondDSN+'</td></tr>'; 
	for(index=0;index<firstList.length;index++) {
            buffer=buffer+"<tr><td class='textnormal12' ><strong><bean:message key='datasource.attribute.label' bundle='ds'/>&nbsp;"+(index+1)+"</strong></td><td>&nbsp;&nbsp;<strong>:</strong>&nbsp;</td><td align='left'>"+firstList[index]+"</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td class='textnormal12'><strong><bean:message key='datasource.attribute.label' bundle='ds'/>&nbsp;"+(index+1)+"</strong></td><td>&nbsp;&nbsp;<strong>:</strong>&nbsp;</td><td align='left'>"+secondList[index]+"</td></tr>";                    	    	 
	}
				
	buffer=buffer+"</table>";							 	 
    innerData = '<br><fieldset style="width: 100%"> <legend class="bigtext"><strong><bean:message key="datasource.join.properties.title" bundle="ds"/></strong></legend><table cellspacing="5" cellPadding="3"> <tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.datasourcename.label" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left"> '+datasourceName+'</td></tr><tr><td class="textnormal12" style="padding-left:20px"><strong><bean:message key="datasource.desc" bundle="ds"/></strong></td><td><strong>&nbsp;&nbsp;:&nbsp;</strong></td><td class="textnormal12" align="left" style="overflow:hidden;word-break:break-all;">'+datasourceDesc+'</td></tr></table><table><tr><td style="padding-left:20px">'+buffer+'</td></tr></table></fieldset>';
    openInfoframe(innerData,'<bean:message key="datasource.joindatasource.title" bundle="ds"/>',200);
}

function openInfoframe(innerData, titleText, numWidth){
	infoFrameWin=null;
    try{
          infoFrameWin = new Window({id: "infoFrameWin", className: "alphacube", title: titleText, width:(screen.width)*(0.4), height:(screen.height)*(0.45),top:(screen.height)*(0.10),left:(screen.width)*(0.10), closable:true, wiredDrag: true}); 
          infoFrameWin.getContent().innerHTML = innerData; 
          infoFrameWin.setDestroyOnClose(); 
          infoFrameWin.show();
          infoFrameWin.toFront();   
    }
    catch(ef){}
 }

var url, deleteUrl;
var rowSelected = 'no';
function updateDS(){
	window.location = url;
}


function dodelete(){
	window.location = deleteUrl;
}



function enableBtn(selectedObj, dsType){
        		
        if(dsType == 1){
            document.getElementById('datasourceTypeId').value = selectedObj.value;
            url ="UpdateDataSource.do?operation=updateDatabase&action=view&datasourceTypeId="+selectedObj.value;
            deleteUrl = "UpdateDataSource.do?operation=deleteDatasource&action=view&datasourceTypeId="+selectedObj.value;
        }else if(dsType=="3"){
            url ="UpdateDataSource.do?operation=updateShapefile&action=view&datasourceTypeId="+selectedObj.value;
            deleteUrl = "UpdateDataSource.do?operation=deleteDatasource&action=view&datasourceTypeId="+selectedObj.value;
        }else if(dsType == "4"){
            document.getElementById('datasourceTypeId').value = selectedObj.value;
            url ="UpdateDataSource.do?operation=updateRssFeed&action=view&datasourceTypeId="+selectedObj.value;
            deleteUrl = "UpdateDataSource.do?operation=deleteDatasource&action=view&datasourceTypeId="+selectedObj.value;
        }else if(dsType=="6"){
            url ="UpdateDataSource.do?operation=updateExcelFile&action=view&datasourceTypeId="+selectedObj.value;
            deleteUrl = "UpdateDataSource.do?operation=deleteDatasource&action=view&datasourceTypeId="+selectedObj.value;
        }else if(dsType=="7"){
            url ="UpdateDataSource.do?operation=updateHibernate&action=view&datasourceTypeId="+selectedObj.value;
            deleteUrl = "UpdateDataSource.do?operation=deleteDatasource&action=view&datasourceTypeId="+selectedObj.value;
        }else if(dsType=="8"){
            url ="UpdateDataSource.do?operation=updateJoinDatasource&action=view&datasourceTypeId="+selectedObj.value;
            deleteUrl = "UpdateDataSource.do?operation=deleteDatasource&action=view&datasourceTypeId="+selectedObj.value;
        }
		rowSelected = 'yes';
}

var tr_selected = '';

</script>

<logic:present name="ecoDatasourceList" scope="request" >
<script>
function isAnyRowSelected(displayMessage,callfrom){
    if(rowSelected == 'no'){
        showEmptyDialog(displayMessage,'DataSources');
        return false;
    }else{
        if(callfrom == 'update'){
            updateDS();
        }else if(callfrom == 'delete'){
            confirmationDialog('Do you want to delete the record?');
        }

    }
    return true;
}
</script>
</logic:present>

<logic:notPresent name="ecoDatasourceList" scope="request">
<script>
function isAnyRowSelected(displayMessage,callfrom){
    if(callfrom=='update'){
    showEmptyDialog('<bean:message key="datasource.no.record.update" bundle="ds"/>','DataSources');
    }else if (callfrom == 'delete'){
        showEmptyDialog('<bean:message key="datasource.no.record.delete" bundle="ds"/>','DataSources');
    }
    return false;
}
</script>
</logic:notPresent>



	 


</head>
<body class="tundra bodybg"  >
	<html:form action="WizardHomeAction"  method="POST">
	<input type="hidden" id="csrf" name="csrf" value="${csrf}">

		<html:hidden property="operation" value="database" styleId="operation"/>
			<input type="hidden" name="datasourceTypeId" id="datasourceTypeId" />
			
			<table width="100%" cellspacing="0" cellpadding="0">
			<tr>
    
			    <td align="left">
				    <table cellpadding="0" cellspacing="0" align="left">
				      <tr>
      
					      <td  valign="top"  align="justify">
						      <table cellspacing="0" cellpadding="0">
       
						        <tr>
									<td  class="pageTitle paddingTitle">      
						                 <bean:message key="datasource.configuredDSFieldset" bundle="ds"/>
						            </td>
								</tr>
       
						        <tr>
									<td  class="paddingTitleDesc bodytext">      
										 <strong><bean:message key="datasource.configuredDSDescription" bundle="ds"/></strong>
						            </td>
					             </tr>
    
		
        
        
        <table width="900" cellspacing="0" cellpadding="0" border="0" >
 
		<tr>
	
		  <td height="30" valign="bottom" class="paddingTitleDesc redtitle"><%  String curdStatus = (String) request.getSession(false).getAttribute("curdStatus");
          request.getSession(false).removeAttribute("curdStatus");    
		        %>
				<div id="curdStatus">
		        <% if(!StringUtils.isNull(curdStatus) && curdStatus.equals("Inserted")){  %>
				<label class="success">
		        <bean:message key="datasource.inserted" bundle="ds" />
				</label>
		        <%  }else if (!StringUtils.isNull(curdStatus) && curdStatus.equals("Deleted")){  %>
				<label class="success">
		        <bean:message key="datasource.deleted" bundle="ds" />
				</label>
		        <%      }else if (!StringUtils.isNull(curdStatus) && curdStatus.equals("Not Deleted")){ %>
				<label class="success">
		        <bean:message key="datasource.notDeleted" bundle="ds" />
				</label>
		        <%      }else if (!StringUtils.isNull(curdStatus) && curdStatus.equals("Not Inserted")){ %>
		        <label class="success">
				<bean:message key="datasource.notInserted" bundle="ds" />
		        </label>
				<%      }else if (!StringUtils.isNull(curdStatus) && curdStatus.equals("Updated")){ %>
		        <label class="success">
		        <bean:message key="datasource.updated" bundle="ds" />
				</label>
		        <%      }else if (!StringUtils.isNull(curdStatus) && curdStatus.equals("Not Updated")){ %>
		        <label class="error">
				<bean:message key="datasource.notUpdated" bundle="ds" />
		        </label>
				<%  }else if (!StringUtils.isNull(curdStatus) && curdStatus.equals("errorInUpdating")){ %>
		        <label class="error">
					<bean:message key="datasource.errorInUpdating" bundle="ds" />
		        </label>
				<%} else if (!StringUtils.isNull(curdStatus) && curdStatus.equals("Datasource Not Found")){ %>
		        <label class="error">
					Datasource not found or Deleted
			     </label>
		        <%}%> 
		</td> 

    </tr>
	
    
       <tr>
	  <logic:notPresent name="ecoDatasourceList" scope="request" >
     <td style = "padding-left: 67px;padding-top: 20px;"><label class = "label">
          <bean:message key="datasource.noRecordFound" bundle="ds" />
		  </label>
		  </td>
		   </logic:notPresent>
		     <logic:present name="ecoDatasourceList" scope="request" >
             					<td height="30" valign="top" align="right">
            						<table class="htmlPagination">
                						<tr>
                                            <td><img src="<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/images/portal/btn_remove_all_on.png" id="start_on" style="display:none;cursor:pointer" onClick="gotoPage(1);"/> <img src="<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/images/portal/btn_remove_all_off.png" id="start_off" style="display:none;cursor:pointer"/></td>
                                            <td align="center"><img src="<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/images/portal/btn_remove_one_on.png" id="previous_on" style="display:none;cursor:pointer" onClick="previousPage();"/> <img src="<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/images/portal/btn_remove_one_off.png" id="previous_off" style="display:none;cursor:pointer"/></td>
                                            <td valign="top"><input type="text" id="enteredPageNo" size="5" name="enteredPageNo" style="height:30;width:50" autocomplete="off" onkeypress="onEnterGoToPage();" value="<bean:write name="resultBean" property="pageNo"/> of <bean:write name="resultBean" property="totalNoOfPages"/>"  disabled="true"/></td>
                                            <td align="center"><img src="<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/images/portal/btn_add_one_on.png" id="next_on" style="display:none;cursor:pointer" onClick="nextPage()"/> <img src="<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/images/portal/btn_add_one_off.png" id="next_off" style="display:none;cursor:pointer"/></td>
                                            <td align="center"><img src="<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/images/portal/btn_add_all_on.png" id="end_on" style="display:none;cursor:pointer" onClick="gotoPage('<bean:write name="resultBean" property="totalNoOfPages"/>')" />  <img src="<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/images/portal/btn_add_all_off.png" id="end_off" style="display:none;cursor:pointer"/></td>
                    					</tr>
               						</table>
      							</td>
            </logic:present>
    
	</tr>

    <tr>
      
      <td height="30" align="right" valign="top" class="redtitle"><logic:present name="ecoDatasourceList" scope="request" >
          <table id="myTable" class=bgcolorReports cellSpacing=1 
                              cellPadding=0 width="92.5%" border="0">
            <tr class="subHeaddings">
              <td valign="middle" class="panelColor">&nbsp;<bean:message key="datasource.actionLabel" bundle="ds" />&nbsp;</td>
              <td valign="middle" class="panelColor">&nbsp;<bean:message key="datasource.dsTypeLabel" bundle="ds" />&nbsp;</td>
              <td valign="middle" class="panelColor">&nbsp;<bean:message key="datasource.dsNameLabel" bundle="ds" />&nbsp;</td>
              <td valign="middle" class="panelColor">&nbsp;<bean:message key="datasource.descriptionLabel" bundle="ds" />&nbsp;</td>
            </tr>
           <logic:iterate name="ecoDatasourceList" scope="request" id="ecoDatasourceDtls" type="com.enterprisehorizons.magma.ecoweb.bean.NewEcoDataSourceBean" >
                    <logic:equal value="1" name="ecoDatasourceDtls" property="datasourceTypeId">
                    <tr  class="bgcolor" onMouseOver="hover(this);" onMouseOut="unHover(this, 1);"
                    ondblclick='showSelectedRow("<bean:write name='ecoDatasourceDtls' property='id'/>","<bean:write name='ecoDatasourceDtls' property='datasourceTypeId' />");viewEcoDatasource("<bean:write name='ecoDatasourceDtls' property='id'/>","<bean:write name='ecoDatasourceDtls' property='datasourceName' />","<bean:write name='ecoDatasourceDtls' property='primaryDatasourceId' />", "<bean:write name='ecoDatasourceDtls' property='secondaryDatasourceId' />","<bean:write name='ecoDatasourceDtls' property='tableName' />","<bean:write name='ecoDatasourceDtls' property='fileName' />","<bean:write name='ecoDatasourceDtls' property='latitude' />","<bean:write name='ecoDatasourceDtls' property='longitude' />","<bean:write name='ecoDatasourceDtls' property='coordinates' />","<bean:write name='ecoDatasourceDtls' property='order' />","<bean:write name='ecoDatasourceDtls' property='datasourceTypeId' />","<bean:write name='ecoDatasourceDtls' property='datasourceDesc' />", "<bean:write name='ecoDatasourceDtls' property='srcPrjDefinition' />","<bean:write name='ecoDatasourceDtls' property='srcPrjUnits' />")'>
					<input type="hidden" name="query" id="query<bean:write name="ecoDatasourceDtls" property="id"/>" value="<bean:write name='ecoDatasourceDtls' property='query' />" />
                    </logic:equal>
                    <logic:equal value="3" name="ecoDatasourceDtls" property="datasourceTypeId">
                        <tr  class="bgcolor" onMouseOver="hover(this);" onMouseOut="unHover(this, 1);"
                     ondblclick='showSelectedRow("<bean:write name='ecoDatasourceDtls' property='id'/>","<bean:write name='ecoDatasourceDtls' property='datasourceTypeId' />");viewShapeFileDatasource("<bean:write name='ecoDatasourceDtls' property='id'/>","<bean:write name='ecoDatasourceDtls' property='datasourceName' />","<bean:write name='ecoDatasourceDtls' property='datasourceDesc' />","<bean:write name='ecoDatasourceDtls' property='fileName' />","<bean:write name='ecoDatasourceDtls' property='dataRenderTypeId' />","<bean:write name='ecoDatasourceDtls' property='srcPrjDefinition' />","<bean:write name='ecoDatasourceDtls' property='srcPrjUnits'/>","<bean:write name='ecoDatasourceDtls' property='datasourceTypeId' />")'>
                    </logic:equal>
                    
                    <logic:equal value="4" name="ecoDatasourceDtls" property="datasourceTypeId">
                        <tr  class="bgcolor" onMouseOver="hover(this);" onMouseOut="unHover(this, 1);"
                     ondblclick='showSelectedRow("<bean:write name='ecoDatasourceDtls' property='id'/>","<bean:write name='ecoDatasourceDtls' property='datasourceTypeId' />");viewRssFeedDatasource("<bean:write name='ecoDatasourceDtls' property='id'/>","<bean:write name='ecoDatasourceDtls' property='datasourceName' />","<bean:write name='ecoDatasourceDtls' property='datasourceDesc' />","<bean:write name='ecoDatasourceDtls' property='rssfeedUrl' />","<bean:write name='ecoDatasourceDtls' property='rssfeedName' />","<bean:write name='ecoDatasourceDtls' property='srcPrjDefinition' />","<bean:write name='ecoDatasourceDtls' property='srcPrjUnits' />","<bean:write name='ecoDatasourceDtls' property='datasourceTypeId' />")'>
                    </logic:equal>                                                                               
                    
                     <logic:equal value="6" name="ecoDatasourceDtls" property="datasourceTypeId">
                        <tr  class="bgcolor" onMouseOver="hover(this);" onMouseOut="unHover(this, 1);"
                     ondblclick='showSelectedRow("<bean:write name='ecoDatasourceDtls' property='id'/>","<bean:write name='ecoDatasourceDtls' property='datasourceTypeId' />");viewExcelFileDatasource("<bean:write name='ecoDatasourceDtls' property='id'/>","<bean:write name='ecoDatasourceDtls' property='datasourceName' />","<bean:write name='ecoDatasourceDtls' property='datasourceDesc' />","<bean:write name='ecoDatasourceDtls' property='excelName' />","<bean:write name='ecoDatasourceDtls' property='excelLatitude' />","<bean:write name='ecoDatasourceDtls' property='excelLongitude' />","<bean:write name='ecoDatasourceDtls' property='excelCoordinates' />",
					 "<bean:write name='ecoDatasourceDtls' property='address' />","<bean:write name='ecoDatasourceDtls' property='addCity' />","<bean:write name='ecoDatasourceDtls' property='addCounty' />","<bean:write name='ecoDatasourceDtls' property='addState' />","<bean:write name='ecoDatasourceDtls' property='addCounty' />","<bean:write name='ecoDatasourceDtls' property='addZipCode' />", "<bean:write name='ecoDatasourceDtls' property='datasourceTypeId' />", "<bean:write name='ecoDatasourceDtls' property='srcPrjDefinition' />","<bean:write name='ecoDatasourceDtls' property='srcPrjUnits' />")'>
                    </logic:equal>       
                    
                    <logic:equal value="7" name="ecoDatasourceDtls" property="datasourceTypeId">
                        <tr  class="bgcolor" onMouseOver="hover(this);" onMouseOut="unHover(this, 1);"
                     ondblclick='showSelectedRow("<bean:write name='ecoDatasourceDtls' property='id'/>","<bean:write name='ecoDatasourceDtls' property='datasourceTypeId' />");viewHibernateDatasource("<bean:write name='ecoDatasourceDtls' property='id'/>","<bean:write name='ecoDatasourceDtls' property='datasourceName' />","<bean:write name='ecoDatasourceDtls' property='datasourceDesc' />","<bean:write name='ecoDatasourceDtls' property='hibernateName' />","<bean:write name='ecoDatasourceDtls' property='hibernateLatitude' />","<bean:write name='ecoDatasourceDtls' property='hibernateLongitude' />","<bean:write name='ecoDatasourceDtls' property='hibernateCoordinates' />",
					 "<bean:write name='ecoDatasourceDtls' property='address' />","<bean:write name='ecoDatasourceDtls' property='addCity' />","<bean:write name='ecoDatasourceDtls' property='addCounty' />","<bean:write name='ecoDatasourceDtls' property='addState' />","<bean:write name='ecoDatasourceDtls' property='addCounty' />","<bean:write name='ecoDatasourceDtls' property='addZipCode' />","<bean:write name='ecoDatasourceDtls' property='datasourceTypeId' />","<bean:write name='ecoDatasourceDtls' property='srcPrjDefinition' />","<bean:write name='ecoDatasourceDtls' property='srcPrjUnits' />")'>
                    </logic:equal>     
                    
                     <logic:equal value="8" name="ecoDatasourceDtls" property="datasourceTypeId">  
                        <script>
                          var firstList<%=jdbCounter%>=new Array();
                          var secondList<%=jdbCounter%>=new Array();
                           <%   
	                          List firstList=((NewEcoDataSourceBean)pageContext.getAttribute("ecoDatasourceDtls")).getMapFirstList();
	                          List secondList=((NewEcoDataSourceBean)pageContext.getAttribute("ecoDatasourceDtls")).getMapSecondList();
	                          for(int index=0;index<firstList.size();index++) {
	                              %>
	                                 firstList<%=jdbCounter%>[<%=index%>]='<%=firstList.get(index)%>';  
	                                 secondList<%=jdbCounter%>[<%=index%>]='<%=secondList.get(index)%>';               
	                              <%	
	                          }
                          %>                  
                        </script>
                        <tr  class="bgcolor" onMouseOver="hover(this);" onMouseOut="unHover(this, 1);"
                     ondblclick='showSelectedRow("<bean:write name='ecoDatasourceDtls' property='id'/>","<bean:write name='ecoDatasourceDtls' property='datasourceTypeId' />");viewJoinDatasource("<bean:write name='ecoDatasourceDtls' property='id'/>","<bean:write name='ecoDatasourceDtls' property='datasourceName' />","<bean:write name='ecoDatasourceDtls' property='datasourceDesc' />","<bean:write name='ecoDatasourceDtls' property='mapFirstDSN' />","<bean:write name='ecoDatasourceDtls' property='mapWithSecondDSN'/>",firstList<%=jdbCounter%>,secondList<%=jdbCounter%>,"<bean:write name='ecoDatasourceDtls' property='srcPrjDefinition' />","<bean:write name='ecoDatasourceDtls' property='srcPrjUnits' />")'>
                    <%jdbCounter++;%>
                    </logic:equal>  
               <td class="textnormal12" align="center"> 
                            &nbsp;
                            
                                <input type="radio" name="datasource" autocomplete="off" id="<bean:write name="ecoDatasourceDtls" property="id"/>" value="<bean:write name="ecoDatasourceDtls" property="id"/>" onclick="enableBtn(this, '<bean:write name="ecoDatasourceDtls" property="datasourceTypeId" />');"/>
                             
                            
                             &nbsp;
                        </td>
                <td class="textnormal12"><logic:equal value="1" name="ecoDatasourceDtls" property="datasourceTypeId">
                    <bean:message key="datasource.databaseLabel" bundle="ds" />
                  </logic:equal>
                  <logic:equal value="2" name="ecoDatasourceDtls" property="datasourceTypeId">
                    <bean:message key="datasource.excelLabel" bundle="ds" />
                  </logic:equal>
                  <logic:equal value="3" name="ecoDatasourceDtls" property="datasourceTypeId">
                    <bean:message key="datasource.shapefileLabel" bundle="ds" />
                  </logic:equal>
                  <logic:equal value="4" name="ecoDatasourceDtls" property="datasourceTypeId">
                    <bean:message key="datasource.rssFeedLabel" bundle="ds" />
                  </logic:equal>
                  <logic:equal value="6" name="ecoDatasourceDtls" property="datasourceTypeId">
                    <bean:message key="datasource.excelLabel" bundle="ds" />
                  </logic:equal>
                  <logic:equal value="7" name="ecoDatasourceDtls" property="datasourceTypeId">
                    <bean:message key="datasource.hibernateLabel" bundle="ds" />
                  </logic:equal>
                  <logic:equal value="8" name="ecoDatasourceDtls" property="datasourceTypeId">
                    <bean:message key="datasource.joinDatasourceLabel" bundle="ds" />
                  </logic:equal>
                </td>
                <td class="textnormal12"><bean:write name="ecoDatasourceDtls" property="datasourceName" />
                </td>
               <td class="textnormal12" width="300px" style="overflow:hidden;word-break:break-all;" title="<bean:write name="ecoDatasourceDtls" property="datasourceDesc" />">
			   <logic:notEqual value="" name="ecoDatasourceDtls" property="datasourceDesc">
			    <bean:define id="datasourceDescLabel" scope="page" > 
					<bean:write name="ecoDatasourceDtls" property="datasourceDesc" />
				</bean:define> 
			   <% 
					if(datasourceDescLabel !=null && datasourceDescLabel.length() > 100){
						out.println(datasourceDescLabel.substring(0, 99)+"...");
					}else{
						out.println(ESAPI.encoder().encodeForHTML(datasourceDescLabel));
 					}

			   %> 
			   </logic:notEqual>

			   <logic:notPresent name="ecoDatasourceDtls" property="datasourceDesc">
					<bean:write name="ecoDatasourceDtls" property="datasourceDesc" />12
			   </logic:notPresent>
                </td>
              </tr>
            </logic:iterate>
          </table>
        </logic:present>
     
        <input type="hidden" name="totalNoOfPages" id="totalNoOfPages" value="<bean:write name="resultBean" property="totalNoOfPages"/>
        "/>
        <input type="hidden" name="pageNo" id="pageNo" value="<bean:write name="resultBean" property="pageNo"/>
        " />
  </table>
  </tr>
  </table>
  </tr>
  </table>
    </td>
          
          </tr>
          
        </table>
      </table>
      </td>
      
      </tr>
      
    </table>
  </table>
  </td>
  </tr>
  </table>
  <!-- Button Panel -->
  <table width="101.2%" border=0 >
   <tr class="barColor">
      <td align="center"><button dojoType="dijit.form.Button"  type="button"  onclick="window.location =  '<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/adminMain.do'  ">
        <bean:message key="datasource.home" bundle="ds" />
        </button>
        <button dojoType="dijit.form.Button" <%if(!roleRightsMap.getHasCreateAccess()) { %> disabled="true" <%}%> type="button"  onclick="configureDS()">
        <bean:message key="datasource.add" bundle="ds" />
        </button>
        <button dojoType="dijit.form.Button" <%if(!roleRightsMap.getHasUpdateAccess()) { %> disabled="true" <%}%> type="button"  onclick="return isAnyRowSelected('<bean:message key="datasource.record.update" bundle="ds"/>','update');" id="updateBtn">
        <bean:message key="datasource.update" bundle="ds" />
        </button>
        <button dojoType="dijit.form.Button" <%if(!roleRightsMap.getHasDeleteAccess()) { %> disabled="true" <%}%> type="button"  onclick="return isAnyRowSelected('<bean:message key="datasource.record.delete" bundle="ds"/>','delete');" id="deleteBtn">
        <bean:message key="datasource.delete" bundle="ds" />
        </button>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		</td>
    </tr>
   
 </table>

<logic:present name="ecoDatasourceList" scope="request" >
  <script>
    dojo.addOnLoad(loadFormValues); 
        function loadFormValues(){
				
                if(<bean:write name="resultBean" property="totalNoOfPages"/>  <= 1 && <bean:write name="resultBean" property="pageNo"/> <= 1){
                        document.getElementById('start_on').style.display='none';
						document.getElementById('start_off').style.display='';
						document.getElementById('previous_on').style.display='none';
						document.getElementById('previous_off').style.display='';
						document.getElementById('next_on').style.display='none';
						document.getElementById('next_off').style.display='';
						document.getElementById('end_on').style.display='none';
						document.getElementById('end_off').style.display='';						
                }else if(<bean:write name="resultBean" property="totalNoOfPages"/>  > 1 && <bean:write name="resultBean" property="pageNo"/> <= 1){
                         document.getElementById('start_on').style.display='none';
						document.getElementById('start_off').style.display='';
						document.getElementById('previous_on').style.display='none';
						document.getElementById('previous_off').style.display='';
						document.getElementById('next_on').style.display='';
						document.getElementById('next_off').style.display='none';
						document.getElementById('end_on').style.display='';
						document.getElementById('end_off').style.display='none';
                }else if(<bean:write name="resultBean" property="totalNoOfPages"/>  > 1 && (<bean:write name="resultBean" property="pageNo"/> > 1 && (<bean:write name="resultBean" property="pageNo"/> != <bean:write name="resultBean" property="totalNoOfPages"/>))){
                        document.getElementById('start_on').style.display='';
						document.getElementById('start_off').style.display='none';
						document.getElementById('previous_on').style.display='';
						document.getElementById('previous_off').style.display='none';
						document.getElementById('next_on').style.display='';
						document.getElementById('next_off').style.display='none';
						document.getElementById('end_on').style.display='';
						document.getElementById('end_off').style.display='none';
                }else if((<bean:write name="resultBean" property="totalNoOfPages"/>  > 1) && (<bean:write name="resultBean" property="pageNo"/> == <bean:write name="resultBean" property="totalNoOfPages"/>)){                     
                        document.getElementById('start_on').style.display='';
						document.getElementById('start_off').style.display='none';
						document.getElementById('previous_on').style.display='';
						document.getElementById('previous_off').style.display='none';
						document.getElementById('next_on').style.display='none';
						document.getElementById('next_off').style.display='';
						document.getElementById('end_on').style.display='none';
						document.getElementById('end_off').style.display='';
						
                }


        }

		function showSelectedRow(radioButtonId, datasourceId){
			//alert(document.getElementById(radioButtonId).checked = true)
			dojo.byId(radioButtonId).setAttribute('checked', true);
			
			enableBtn(dojo.byId(radioButtonId), datasourceId);
		}

		
</script>
</logic:present>
</html:form>
</body>
