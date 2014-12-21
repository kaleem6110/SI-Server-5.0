<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="com.enterprisehorizons.util.StringUtils"%>
<%@ page import="com.enterprisehorizons.magma.config.dbadmin.* , com.enterprisehorizons.magma.config.dbadmin.bd.*, java.io.*, java.util.*" %>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>

<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>

<!-- Privileges imports  -->
<%@page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@page import="com.enterprisehorizons.magma.security.util.AccessHelper"%>
<%@page import="com.spacetimeinsight.db.privileges.model.RoleRightsMap"%>
<%@page import="com.spacetimeinsight.stas.privileges.services.PrivilegesConstants"%>

<% 
 String selectedModelName = "";
 //if(request.getAttribute("DROPDOWN_VALUE") != null)
if(session.getAttribute(ModelConfigConstants.SESSION_MODEL_NAME) != null)
 {
   selectedModelName =(String) session.getAttribute(ModelConfigConstants.SESSION_MODEL_NAME); // (String) request.getAttribute("DROPDOWN_VALUE") ;
 }
 
 // Changes for applying Privileges -- Start
 UserBean userBean          = (UserBean)session.getAttribute(ServerUtils.USER_BEAN_NAME); 
  String moduleId           =(String) session.getAttribute(ServerUtils.PARAM_MODULE_ID);
 //Get right or subright name from given model 
 String rightOrSubright             = AccessHelper.getRightOrSubRightNameFromModel(selectedModelName);    
 //Get the access permissions for the given right or subright and accessType
 RoleRightsMap roleRightsMap	    = AccessHelper.getRoleRightsMap(userBean,rightOrSubright,moduleId);
 RoleRightsMap roleRightsMapImpExp	= AccessHelper.getRoleRightsMap(userBean,rightOrSubright+PrivilegesConstants._IMP_EXP,moduleId);
  
%>
<html:html locale="true">
<head>
<%@ include file="/common/dojo.jsp"%>


<script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/dijit/form/_testCommon.js"></script>
<script type="text/javascript">
         dojo.require("dojo.parser");
         dojo.require("dijit.form.Form");
         dojo.require("dijit.form.Button");
         dojo.require("dijit.form.ComboBox");
         dojo.require("dijit.form.FilteringSelect");
</script>

<style>
			@import "<%=ServerUtils.getContextName(request)%>/js/dojo/resources/dojo.css";
			@import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/tundra/tundra.css";
			@import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/tundra/tundra_rtl.css";
			@import "<%=ServerUtils.getContextName(request)%>/js/dijit/tests/css/dijitTests.css";
			@import "<%=ServerUtils.getContextName(request)%>/js/dojox/form/resources/FileInput.css"; 
			@import "<%=ServerUtils.getContextName(request)%>/css/style.css";

        body .txtareamedium {
            width: 25em;
            height: 5em;
        }

</style>

<title><bean:message key='dbconfig.model.title'/></title>

    <script>
	
     function submitForm(btn) {
            //document.forms[0].submitName.value=btn.value;
            var selectObj = dijit.byId("selectedModelId");

			if(btn.name != 'btnBack' && btn.name != 'btnHome')			
			if(selectObj.value == "" || selectObj.value == null)
			{
				showEmptyDialog("<bean:message key='dbconfig.model.check.value'/>", "<bean:message key='dbconfig.model.check.title'/>");
				return false;
			}

            document.forms[0].submitName.value=btn.name;
			<%if(request.getParameter("fromHeader")!=null && "true".equalsIgnoreCase(request.getParameter("fromHeader"))){%>
			document.forms[0].action=document.forms[0].action+"?fromHeader=true"
			<%}%>
            document.forms[0].submit();
        }
		
		function checkSelected(selectObj) {
            //document.forms[0].submitName.value=btn.value;
            var selectMod = dijit.byId("selectedModelId");
		
			if(selectMod.value == "" || selectMod.value == null)
			{
				showEmptyDialog("<bean:message key='dbconfig.model.check.value'/>", "<bean:message key='dbconfig.model.check.title'/>");
				return false;
			}
			var valExcel = dijit.byId("btnExportFromExcel");
			if(valExcel!="xls" && valExcel!="xlsx"){
				return false;
			}	
            document.forms[0].submitName.value="btnExportFromExcel";
			<%if(request.getParameter("fromHeader")!=null && "true".equalsIgnoreCase(request.getParameter("fromHeader"))){%>
			document.forms[0].action=document.forms[0].action+"?fromHeader=true&"
			<%}%>
            document.forms[0].submit();
        }
 
 function onDropDownChanged() {			
   		var selectObj = dijit.byId("selectedModelId");         
		if( selectObj.value != '' && selectObj.value != "" && selectObj.value != null)
			{			 
 			   document.forms[0].action="<%=ServerUtils.getContextName(request)%>/masterMaintenanceHomeAction.do?onDropdownChanged=Yes";			   
			   document.forms[0].submit();
 			}
		}        
    </script>	
	<script>
		dojo.addOnLoad(loadFormValues); 
		function loadFormValues(){
		var selectObj = dijit.byId("selectedModelId"); 
		if( selectObj.value == '' || selectObj.value == "" || selectObj.value == null)
			dijit.byId('selectedModelId').setValue('');
		}
   </script>

</head>

<body class="tundra bodybg" >

<html:form action="/masterMaintenanceHomeAction"  method="POST">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">

<html:hidden property = "<%= ModelConfigConstants.SUBMIT_HOME_SCREEN_PARAM %>" value="false" />
<center>
<table width="101.2%" cellspacing="0" cellpadding="0" align="right" border=0>
<tr>
<td class="pageTitle paddingTitle" >    
	<table>
	<%
            String re = (String)session.getAttribute(ModelConfigConstants.SESSION_SCREEN_CATEGORY);
            List modelList = DBDelegate.getModelListDropDown(re, request);
            
        %>
	 
	 
	 <tr>         
        		 
             <td height="60px" align="left" valign="top"  class="redtitle">
			  <strong class="pageTitle" style="padding-left:0px"><%if("config".equals(re)){%><bean:message key="dbconfig.config"/><%}else if("alerts".equals(re)) { %> <bean:message key="dbconfig.alerts"/><%}else{ %>
			  <bean:message key="dbconfig.platform"/>
			  <%} %>
			  <bean:message key="dbconfig.model"/><br/>
                 <span class="paddingTitleDesc bodytext" style="padding-left:0px"><bean:message key="dbconfig.data.description"/></span></strong>
			  </td>  		  
              <td width="67px">&nbsp;</td>	 
      </tr>		  
    <tr>
    
    <td>		
         
        <span id="ctl00_mainbody_lblError" class="error"><label class="success">
        <html:messages id="msg" message="true" ><bean:write name="msg"/></html:messages>         
        </label></span><br/>
	
	   <% if(request.getAttribute("errormsg") != null ){%>
	  <font color="red" style="font-family: Tahoma;font-size: 12px;"><b> <bean:message key="dbconfig.invalidModel.error"/></b></font>  
       <%}%>
        

        <table id="table2" height="54" cellspacing="2" cellpadding="2" class="border1">
		                    
            <tr>
                <td height="27" align="left" class="tableBgColor">
                    <table class="lfr-table"0>
                        <tbody>
						    <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td ><label class="bodytext"><strong><bean:message key="dbconfig.model"/> : </strong></label></td>

                                <td align="center"><select id = "selectedModelId" name="selectedModelId" dojoType="dijit.form.FilteringSelect" autocomplete="off" onChange="onDropDownChanged();">
                                    <% if(modelList != null)
                                    {
                                        for(int modIdx=0;modIdx<modelList.size(); modIdx++)
                                        {
                                            ModelBean modelBean = (ModelBean)modelList.get(modIdx);
											String modelClNm = modelBean.getModelClassName();
											boolean bool = false;
											if(selectedModelName.equalsIgnoreCase(modelClNm))
											bool=true;
											
                                            if(StringUtils.isNull(modelBean.getModelClassName()))
                                            {%> <option value=''><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
                                            <%}
                                            else{
                                    %>
                                        <option value="<%=modelBean.getModelClassName()%>"  <%if(bool){ %> selected <%}%>  ><%=modelBean.getModelName()%></option>
                                    <% } }} %>
                                    </select>
                                </td>

                            </tr>
                           
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                                <html:hidden name="masterMaintenanceHomeForm" property="selectedModelId"/>
                        </tbody>
                    </table>
                </td>
            </tr>
        </table>        
    </td>
	<td>&nbsp;</td>
     </tr>	    
     <tr>
        <td></td>
		<td>&nbsp;</td>
    </tr>
  </table>
 </td>
 </tr>
 
 <tr  height="30" class="barColor" >
       <td height="30" colspan="2"  align="center">	   
       <%if(request.getParameter("fromHeader")==null || "false".equalsIgnoreCase(request.getParameter("fromHeader"))) {%> <button dojoType="dijit.form.Button"  id="idHome" name="btnHome" type="button" onClick="return submitForm(this)"> <bean:message key="dbconfig.home" /> </button>
        <button dojoType="dijit.form.Button"  id="idBack" name="btnBack" type="button" onClick="return submitForm(this)"> <bean:message key="dbconfig.back"/> </button>
        <%}%>
        <button dojoType="dijit.form.Button"  <%if(!roleRightsMap.getHasReadAccess()) { %> disabled="true" <%}%> id="idView" name="btnView" type="button" onClick="return submitForm(this)"> <bean:message key="dbconfig.view"/> </button>
        <button dojoType="dijit.form.Button" <%if(!roleRightsMap.getHasCreateAccess()) { %> disabled="true" <%}%> id="idCreate" name="btnCreate" type="button" onClick="return submitForm(this)"> <bean:message key="dbconfig.create"/> </button>
        <button dojoType="dijit.form.Button" <%if(!roleRightsMapImpExp.getHasReadAccess()) { %> disabled="true" <%}%>  id="idImport2Excel" name="btnImport2Excel" type="button" onClick="return submitForm(this)"> <bean:message key="dbconfig.import2Excel"/> </button>                
        <select id = "btnExportFromExcel" <%if(!roleRightsMapImpExp.getHasCreateAccess()) { %> disabled="true" <%}%> name="btnExportFromExcel" dojoType="dijit.form.FilteringSelect" autocomplete="off" onChange="checkSelected(this);dijit.byId('btnExportFromExcel').setValue('select');"> 
			  <option value="select" >--Export To Excel--</option>
			  <option value="xls" >XLS</option>
			  <option value="xlsx" >XLSX</option>
		</select>        
        </td>
 </tr>    

</table>
</html:form>


</body>
</html:html>
