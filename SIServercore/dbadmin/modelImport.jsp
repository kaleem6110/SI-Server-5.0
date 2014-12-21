<%@ page import="com.enterprisehorizons.magma.config.dbadmin.* , com.enterprisehorizons.magma.config.dbadmin.bd.*, java.io.*, java.util.*" %>
<%@ page import="org.owasp.esapi.ESAPI" %>  
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/tags/fileupload" prefix="upload"%>
<%@ include file="/common/dojo.jsp" %>



<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>

<%			boolean fromHeader=false;
				if(request.getParameter("fromHeader")!=null &&  request.getParameter("fromHeader").equals("true")) {
				fromHeader=Boolean.parseBoolean(request.getParameter("fromHeader"));
				}
%>
<html:html locale="true">
<head>




<title>Excel2DB</title>

 <script type="text/javascript" src="js/windows.js"></script>
 
<script type="text/javascript">
        function submitForm(btn) {
            //document.forms[0].submitName.value=btn.value;
            document.forms[0].submitName.value=btn.name;
			
			var excelFileName = document.getElementById('excelFile').value;
			
			if(excelFileName == '' && btn.name == 'btnUpload'){
				showEmptyDialog("<bean:message key='dbconfig.check.excel'/>","<bean:message key='dbconfig.alert.title'/>");
				return false;
			}
			excelFileName = excelFileName.substring(excelFileName.lastIndexOf("\\") +1);
			if(!directoryTxtBoxSplCh(excelFileName)){
				return false;
			}
			<%if(request.getParameter("fromHeader")!=null){%>
			document.forms[0].action=document.forms[0].action+"?fromHeader=<%=ESAPI.encoder().encodeForHTML(request.getParameter("fromHeader"))%>";
			<%}%>
            document.forms[0].submit();
        }

</script>

</head>
<body class="tundra bodybg">

<html:form action="/modelExportAction?csrf=${csrf}" method="post"  enctype="multipart/form-data" >

<html:hidden property = "<%= ModelConfigConstants.SUBMIT_HOME_SCREEN_PARAM %>" value="false" />

<table width="101.2%" cellspacing="0" cellpadding="0" align="center"  >
<tr>
<td class="pageTitle paddingTitle">
 <table>
 
	<tr>         
            <td height="60px" align="left" valign="top"  class="redtitle"><strong class="pageTitle paddingTitle" style="padding-left:0px"><bean:message key="dbconfig.import.header"/><br />
                 <span class="paddingTextDesc bodytext" style="padding-left:0px"><bean:message key="dbconfig.import.description"/></span></strong>
			  </td>
			  <td width="67px">&nbsp;</td>	 
    </tr>	
	
    <tr>
	
    <td align="left">     
        <table border="0"  width="100%" id="table2" height="54" cellspacing="2" cellpadding="2">
            <tr>
                <td height="27" align="left" >
                    <table width="100%" border="0" class="lfr-table">
                        <tbody>
                            <tr> 
                                
                                <td colspan="2" class="error" align="left">
                                    <html:errors/> 
                                    </td>
                                </tr>
                            
                            <tr>
                                <td align="right" width="80px"><label class="label"><bean:message key="dbconfig.model.import.select.title"/>&nbsp;:</label></td>
								
                                <td align="left"><label class="label"><bean:write property="modelFileName" name="modelExportImportForm" /></label></td>

                            </tr>
							<tr>
								<td height="13px"></td>
							</tr>
                            <tr valign="top">
                                <td align="right" ><label class="label"><bean:message key="dbconfig.model.import.selectfile.title"/>&nbsp;:  </label></td>
							   
                               <TD align="left" width="60%" ><label class="label"><upload:RenderUploadField fileName="excelFile" parseSupport="true"  /></label>
                               </TD>
                           </tr>
                            
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                                <html:hidden name="modelExportImportForm" property="modelFileName"/>  
                        </tbody>
                    </table>
                </td>
            </tr>
        </table>

    
    </td>
    </tr> 
</table>
</td>
<td>&nbsp;</td>
</tr>
   <tr align="right" class="barColor">
        <td colspan="2" align="center" width="655">
		<%if(request.getParameter("fromHeader")==null){%>
        <button dojoType="dijit.form.Button"  id="idHome" name="btnHome" type="button" onClick="return submitForm(this)"> <bean:message key="dbconfig.home" /> </button>
		<%}%>
        <button dojoType="dijit.form.Button"  id="idBack" name="btnBack" type="button" onClick="return submitForm(this)"> <bean:message key="dbconfig.back"/> </button>
		<button dojoType="dijit.form.Button"  id="idUpload" name="btnUpload" type="button" onClick="return submitForm(this)"> Upload </button>
        <button dojoType="dijit.form.Button" type="reset" id='resetBtn' > <bean:message key="dbconfig.reset" /> </button>
        </td>
   </tr>
</table>


</html:form>


</body>
</html:html>
