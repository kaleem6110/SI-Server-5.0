<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ page import="javax.servlet.*" %>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<html>
<head>
<title></title>
<style type="text/css">
			@import "js/dojo/resources/dojo.css";
			@import "js/dijit/themes/tundra/tundra.css";
			@import "js/dijit/themes/tundra/tundra_rtl.css";
			@import "js/dijit/tests/css/dijitTests.css";
			@import "js/dojox/form/resources/FileInput.css"; 
</style>
<script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/dojo/dojo.js"
	djConfig="isDebug: false, parseOnLoad: true"></script>

<style type="text/css">
			@import "js/dojo/resources/dojo.css";
</style>			
<link href="<%=ServerUtils.getContextName(request)%>/css/sti.css" rel="stylesheet" type="text/css" /> 
<script type="text/javascript">
			dojo.require("dijit.form.Button");
			dojo.require("dojo.parser");	// scan page for widgets and instantiate them
</script>
</head>
<body class="tundra bodybg" >
	<!--<center>
	Ecosystem Generated Successfully.....
	</center>
<tr>	
Please use the following URL to access the generated EcoSystem
<br>
<br>
<br>
<bean:write property="magmaRequestHandlerLink" name="magmaURIDtls"/>
-->   

   <table width="101.4%" cellspacing="0" cellpadding="0">
    <tr>
    
    <td align="left">
    <table width="1000" cellpadding="0" cellspacing="0"  align="left">
      <tr>
      
      <td  align="left" valign="top" align="justify">
      <table width="1000" cellspacing="0" cellpadding="0">
        <tr>
          <td width="67">&nbsp;</td>
          <td width="938" height="37">&nbsp;</td>
        </tr>
		<tr>
		 <td>&nbsp;</td>
          <td height="37" valign="top" class="redtitle"><strong><bean:message key="ecoweb.wizard.title" bundle="ecoweb"/></strong><br />
            <span class="bodytext"></span></td>
		</tr>
		 <tr>
          <td>&nbsp;</td>
          <td height="37" valign="top" class="bluetitle"><strong><bean:message key="ecoweb.wizard.success.msg" bundle="ecoweb"/></strong><br />
            <span class="bodytext"></span></td>
         </tr>
		<tr>
          <td>&nbsp;</td>
		  <td height="37" valign="top" >
		  <table align="left" width="800px" border="0">

               <tr >
                  
                  <td>
                  		<b><bean:message key="ecoweb.wizard.download.desc" bundle="ecoweb"/></b> <br>
                  		<br>
                  		<br>
                  	    <b><bean:message key="ecoweb.wizard.link" bundle="ecoweb"/></b>&nbsp;&nbsp;<a href="<bean:write property="magmaRequestHandlerLink" name="magmaURIDtls"/>"><bean:message key="ecoweb.wizard.linktext" bundle="ecoweb"/></a>
                  		<br>
						<br>
                  	     <br><b><bean:message key="ecoweb.wizard.url" bundle="ecoweb"/>&nbsp;&nbsp;<bean:write property="magmaRequestHandlerLink" name="magmaURIDtls"/></b>
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
	<tr>
			
			<td width ="1000" colspan="2" align="right" class="barColor">
			
				<button dojoType="dijit.form.Button" type='button' onClick="window.location = '<%=ServerUtils.getContextName(request)%>/admin/AdminMain.jsp'"><bean:message key="admin.common.home" bundle="admin"/></button> &nbsp;&nbsp;&nbsp;&nbsp;	
			
			</td>
		</tr>
    </table>
    </td>
    </tr>

    </table>
</body>
</html>

