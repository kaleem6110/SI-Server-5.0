<%@ page import="java.util.*,com.enterprisehorizons.db.util.*,com.enterprisehorizons.util.* , com.enterprisehorizons.magma.config.dbadmin.*" %> 
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/tags/struts-nested" prefix="nested"%>

<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>

<html>
<head>
<%@ include file="/common/dojo.jsp" %>

<title>View Details</title>

    <script>
try{
parent.parent.updateCSRFToken('<%=request.getAttribute("csrf")%>');
}catch(e){
//as the parent.parent might be null or fuction might not be able to find
}
        function closeWindow(){
            window.close();
        }
    </script>
</head>
<body class="tundra bodybg">

<html:form action="masterTableRecordViewAction.do" method="POST">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">


<br>
    <fieldset>
        <legend class="bigtext"><strong><%= session.getAttribute(ModelConfigConstants.DISPLAY_MODEL_NAME) %> <bean:message key="dbconfig.msg.properties"/></strong></legend>
        <span id="ctl00_mainbody_lblError" class="error"></span><br/>

        <table border="0"  id="table2" height="100" width="100%" cellspacing="0" cellpadding="0">
            <tr>
                <td height="27" align="left" width="100%">
                    <table width="100%" >
                        <tbody>
                            <tr>
                                <td align="left" style="padding-left:20px" >
                                <table cellSpacing="5" cellPadding="3" >
                                    <nested:iterate name="masterTableRecordViewForm" property="fieldValueBeanList" id="codeId" indexId="rowId">
                                        <tr>
                                           <td class="textnormal12" align="left" ><strong><nested:write property="fieldName"/> </strong> </td><td>&nbsp;<strong>:</strong>&nbsp;</td><td class="textnormal12" align="left"> <nested:write property="fieldValue"/></td>
                                        </tr>
										
                                        </nested:iterate>
                                </table>
								</td>
                            </tr>
                            
                            <!-- tr >
                                <td colspan="2" align="right">
                                <input align="right" class="formbutton" type="button" id="idBack" name="btnBack" value="Close" onClick="return closeWindow();">
                                
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            </tr  -->

                        </tbody>
                    </table>
                </td>
            </tr>
        </table>

        
    </fieldset>
  
</html:form>


</body>
</html>
