<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<!-- Privileges imports  -->
<%@page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@page import="com.enterprisehorizons.magma.security.util.AccessHelper"%>
<%@page import="com.spacetimeinsight.db.privileges.model.RoleRightsMap"%>
<%@page import="com.spacetimeinsight.stas.privileges.services.PrivilegesConstants"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>

<%
  // Changes for applying Privileges -- Start
  UserBean userBean          = (UserBean)session.getAttribute(ServerUtils.USER_BEAN_NAME); 
  String moduleId      =(String) session.getAttribute(ServerUtils.PARAM_MODULE_ID);
  //Get the access permissions for the given right or subright and accessType
  RoleRightsMap roleRightsMap	= AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.Right.SHAPE_TO_DB_MAPPING,moduleId);  
  //Changes for applying Privileges -- End
  
%>
<script>
function showAlertMessage()
{
	if(dijit.byId('cmbMappedDefinitions') != null && dijit.byId('cmbMappedDefinitions').value == ''){
		showEmptyDialog('<bean:message key="shpDbMap.check.correct.value" bundle="shpDbMap"/>','<bean:message key="admin.common.alert.title" bundle="admin"/>');
		return false;
	}
	else if(dijit.byId('cmbMappedDefinitions') != null && dijit.byId('cmbMappedDefinitions').value != ''){
		confirmationDialog(MSG_CONFIRM);
	}
	else{
		showEmptyDialog("<bean:message key='shpDbMap.check.correct.value' bundle='shpDbMap'/>","<bean:message key='admin.common.alert.title' bundle='admin'/>");
		return false;		
	}	
}
</script>

       <tr  height="30" colspan="2" class="barColor">
       <td height="30" colspan="2" class="barColor" align="center">	  
          <button dojoType="dijit.form.Button"  type="button" onclick="goToDBHomePage()"><bean:message key="shpDbMap.home" bundle="shpDbMap"/> </button>
            <button dojoType="dijit.form.Button" <%if(!roleRightsMap.getHasReadAccess()) { %> disabled="true" <%}%> id="View" name="btnView" type="button" onclick="return submitForm(this);"> <bean:message key="shpDbMap.view" bundle="shpDbMap"/> </button>
            <button dojoType="dijit.form.Button" <%if(!roleRightsMap.getHasCreateAccess()) { %> disabled="true" <%}%> id="Add" name="btnAdd" type="button" onclick="return submitForm(this);"> <bean:message key="shpDbMap.add" bundle="shpDbMap"/> </button>
            <button dojoType="dijit.form.Button" <%if(!roleRightsMap.getHasUpdateAccess()) { %> disabled="true" <%}%> id="Update" name="btnUpdate" type="button" onclick="return submitForm(this);"> <bean:message key="shpDbMap.update" bundle="shpDbMap"/> </button>
            <button dojoType="dijit.form.Button" <%if(!roleRightsMap.getHasDeleteAccess()) { %> disabled="true" <%}%> id="Delete" name="btnDelete" type="button" onclick="showAlertMessage();"> <bean:message key="shpDbMap.delete" bundle="shpDbMap"/> </button>


            </td>
        </tr>