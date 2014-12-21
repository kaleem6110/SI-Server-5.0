<%@page import="com.enterprisehorizons.magma.server.admin.CacheConfigUtils , com.enterprisehorizons.util.StringUtils,java.util.Arrays"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
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
  // Changes for applying Privileges -- Start
  UserBean userBean          = (UserBean)session.getAttribute(ServerUtils.USER_BEAN_NAME);
  String moduleId      =(String) session.getAttribute(ServerUtils.PARAM_MODULE_ID);
  //Get the access permissions for the given right or subright and accessType
  RoleRightsMap roleRightsMap	= AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.Right.CACHE,moduleId);  
  //Changes for applying Privileges -- End
  
%>
<html>
<head>
<%@ include file="/common/dojo.jsp" %>
<%
   	         String[] cacheKeys = CacheConfigUtils.getCacheKeys();
 %>

<style>
        body .txtareamedium {
            width: 25em;
            height: 5em;
        }

</style>


<title><bean:message key="cache.cache" bundle="cache"/></title>


<script type="text/JavaScript">
	
	//variable to denote if the selected key is present in the keys array or not
	var isPresent=false;
	
	var cacheKeysArray = new Array(<%=cacheKeys.length%>);
		<% for (int i=0; i<cacheKeys.length; i++) { %>
			cacheKeysArray[<%= i %>] = "<%= cacheKeys[i] %>"; 
		<% } %>
    function goToDBHomePage(){
            window.location = "<%=ServerUtils.getContextName(request)%>/adminMain.do";
    }
    
        function submitForm()
    {
        var obj = document.getElementById('btnRadioCacheId');
        if(obj.checked == true )
        {
        var selectedKey=document.getElementById("cmbCacheKey").value;
            if( selectedKey== "<bean:message key="validation.msg.select" bundle="splchvalidation"/>")
            {
                showEmptyDialog("<bean:message key="cache.chkClearRadioAlert" bundle="cache" />", "<bean:message key="cache.alert.title" bundle="cache" />");
                return false;
            }
            else
            {
				for(var i=0; i<cacheKeysArray.length; i++) {
					if (cacheKeysArray[i] == selectedKey)
						isPresent=true;
				}
            	if(!isPresent){
            	showEmptyDialog("<bean:message key="cache.chkNotMatch" bundle="cache" />", "<bean:message key="cache.alert.title" bundle="cache" />");
                return false;
            	}
                document.forms[0].submit();        
                return true;
            }
        }
        else
        {
            document.forms[0].submit();
            return true;
        }
    }
	  
</script>
</head>

<body class="tundra bodybg">

<form name="frmCache" method="post" action="CacheAction.do">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">


<table width="100%" cellspacing="0" cellpadding="0" align="center" >
<tr>
<td>
<table width="100%" cellspacing="0" cellpadding="0" align="center"  border="0" >
            <tr>
                <td  class="pageTitle paddingTitle">      
                <strong><bean:message key="cache.cache" bundle="cache"/>
                </td>
            </tr>
            <tr>
               <td class="paddingTitleDesc bodytext">
                 <strong><bean:message key="cache.description" bundle="cache"/></strong>
                </td>  
            </tr>
           <tr valign="top">
                 <span id="ctl00_mainbody_lblError" class="error"><label class="success">
                <html:messages id="msg" message="true" ><bean:write name="msg"/></html:messages>
                </label></span><br/>
                    <td style="padding-left:61px;">&nbsp;  <logic:present name="success">    <label class="success"><bean:message key="cache.success" bundle="cache"/></label></logic:present>
                        <logic:present name="errorMessage"><label class="error"><bean:message key="cache.error" bundle="cache"/>(<bean:write name="errorMessage" /> )</label></logic:present>
                    </td>
            </tr>
            
        <tr>
        <tr>
        <td height="13" colspan="8" align="left" class="bodytext"></td>
        </tr>
         <td style="padding-left:67px;">
             <table id="table2" height="54" cellspacing="0" cellpadding="0" class="border1">
                 <tr>
                <td height="27" align="left" class="tableBgColor">
                    <table>
                         <tbody>
                                <tr>
                                <td >
                                <input type="radio" name="btnRadioCache" id="cacheRadioBtn" checked="true"  value="clearAll" onClick="enableDisable(this);" autocomplete="off"><label class="label"><bean:message key="cache.clearall" bundle="cache"/></label>
                                    </td>
                                    <td>&nbsp;
                                    </td>
                                </tr>
                                <tr>
                                <td height="13" colspan="8" align="left" class="bodytext"></td>
                                </tr>
                                <tr valign="top">
                                    <td align="right"><input type="radio" autocomplete="off" id="btnRadioCacheId"  name="btnRadioCache"  value="clearKey" onClick="enableDisable(this);"><label class="label"><bean:message key="cache.clear" bundle="cache"/></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </td>
                                    <td align="center">
                               
                                        <select dojoType="dijit.form.FilteringSelect" id="cmbCacheKey" name="cmbCacheKey"  autocomplete="off"     invalidMessage="Invalid value" >
                                            <option value=""><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
                                            <%
                                                int noOfKeys = cacheKeys == null ? 0 : cacheKeys.length;
                                                for(int i = 0; i < noOfKeys; i++) {
                                            %>  
                                                <option value="<%=cacheKeys[i]%>"><%=cacheKeys[i]%></option>
                                            <%
                                            }
                                            %>  
                                        </select>

                                    </td>

                                </tr>
                                <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
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
  <tr height="30" class="barColor" >
       <td height="30" class="barColor" align="center">    
            <button dojoType="dijit.form.Button"  type="button" onClick="goToDBHomePage()"><bean:message key="cache.home" bundle="cache"/> </button>
            <button dojoType="dijit.form.Button"  <%if(!roleRightsMap.getHasDeleteAccess()) { %> disabled="true" <%}%> type="button"  id="idSubmit" name="btnSubmit"   onclick="return submitForm();" > <bean:message key="cache.submit" bundle="cache"/> </button>
            <button dojoType="dijit.form.Button"  id="idSReset" name="btnReset" type="reset" onClick="performReset();"> <bean:message key="cache.reset" bundle="cache"/> </button>
            </td>
        </tr>
    </td>
    </tr>
    </table>
    
</form>

</body>
<script>
	function enableDisable(selectedObject){
	if(selectedObject.value == "clearAll"){
	dijit.byId('cmbCacheKey').reset();
	dijit.byId('cmbCacheKey').setAttribute('disabled', true);     
	}
	else {
	dijit.byId('cmbCacheKey').setAttribute('disabled', false);     
    dijit.byId('cmbCacheKey').setValue('');
	}
	}
 document.getElementById("cmbCacheKey").disabled= true;
 function performReset(){
	 dijit.byId('cmbCacheKey').reset();
	dijit.byId('cmbCacheKey').setAttribute('disabled', true);   

 }
</script>
</html>