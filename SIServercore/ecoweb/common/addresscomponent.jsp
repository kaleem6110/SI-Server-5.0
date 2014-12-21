<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<script>
		function addhide(){
		document.getElementById('addressDtls').style.display='none';
		document.getElementById('addressminimizeLabel').style.display='none';
		document.getElementById('addressmaximizeLabel').style.display='';
	}
	
	function addshow(){
		document.getElementById('addressDtls').style.display='';
		document.getElementById('addressminimizeLabel').style.display='';
		document.getElementById('addressmaximizeLabel').style.display='none';
	}
</script>
			
<body class="tundra panelbg">		
			
			
				
<table width="100%" cellspacing="0" cellpadding="0" class="tableBgColor">
                  <tr>
                      <td colspan="7">
					  <table width="100%"    border ="0">
					  <tr>
                    <td width="20%"    class="pageTitle paddingTitle" style="padding-top:13px; padding-left:13px;"><strong><bean:message key="datasource.addressfield" bundle="ds" /></strong></td>
                    <td width="80%"    style="padding-top:13px; padding-left:13px;" align="right"><strong><span id="addressminimizeLabel" onClick="addhide()" style="display:none; cursor:pointer" ><u><bean:message key="datasource.minimizepanel" bundle="ds" /></u> <img src="<%=ServerUtils.getContextName(request)%>/images/portal/uparrow.gif" width="7" height="11" align="absmiddle" /></span> <span id="addressmaximizeLabel" onClick="addshow()" style="cursor:pointer"><u><bean:message key="datasource.maximizepanel" bundle="ds" /></u> <img src="<%=ServerUtils.getContextName(request)%>/images/portal/downarrow.gif" width="7" height="11" align="absmiddle" /> </span></strong></td>
                  </tr>
                  <tr>
                    <td colspan="2"    style="padding-top:0px; padding-left:13px;"></td>
                  </tr>
                  <tr>
                    <td height="13" colspan="2"    style="padding-top:0px; padding-left:0px;"></td>
                  </tr>

                  <tr>
                    <td colspan="2"    style="padding-top:13px; padding-left:13px; display: none;" id="addressDtls">
					<table width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        
                       <td width="10%" align="right" class="bodytext" style="padding-right:12px;">
			<strong><bean:message key="datasource.address" bundle="ds" />&nbsp;:</strong>
			</td>
			  <td    width="20%"><select id="address" 
                            dojoType="dijit.form.FilteringSelect"  name="address"    autocomplete="off"     invalidMessage="Invalid Address Field"  store="columnStore" searchAttr="label" onChange="enableDisableColumns(this);resetNonAddressFields(this);" >
                <option value=""><bean:message key="datasource.select" bundle="ds" /></option>
              </select>
			  </td>
                      <td width="10%">&nbsp;&nbsp;</td> 
						<td width="10%" align="right" class="bodytext" style="padding-right:12px;">
			<strong><bean:message key="datasource.city" bundle="ds" />&nbsp;:</strong>
			</td>
			<td></td>
			  <td    width="20%"><select id="addCity" 
                            dojoType="dijit.form.FilteringSelect"  name="addCity"    autocomplete="off"     invalidMessage="Invalid Address Field"  store="columnStore" searchAttr="label" onChange="enableDisableColumns(this);resetNonAddressFields(this);">
                <option value=""><bean:message key="datasource.select" bundle="ds" /></option>
              </select></td>
			   <td width="10%">&nbsp;&nbsp;</td> 
						<td width="10%" align="right" class="bodytext" style="padding-right:12px;">
			<strong><bean:message key="datasource.county" bundle="ds" />&nbsp;:</strong>
			</td>
			<td></td>
			  <td    width="20%"><select id="addCounty" 
                            dojoType="dijit.form.FilteringSelect"  name="addCounty"    autocomplete="off"     invalidMessage="Invalid Address Field"  store="columnStore" searchAttr="label" onChange="enableDisableColumns(this);resetNonAddressFields(this);" >
                <option value=""><bean:message key="datasource.select" bundle="ds" /></option>
              </select></td>
                        
                      </tr>

<tr>
<td>&nbsp;&nbsp;</td> 
</tr>

 <tr>
                        
                       <td width="10%" align="right" class="bodytext" style="padding-right:12px;">
			<strong><bean:message key="datasource.state" bundle="ds" />&nbsp;:</strong>
			</td>
			  <td    width="20%"><select id="addState" 
                            dojoType="dijit.form.FilteringSelect"  name="addState"    autocomplete="off"     invalidMessage="Invalid Address Field"  store="columnStore" searchAttr="label" onChange="enableDisableColumns(this);resetNonAddressFields(this);">
                <option value=""><bean:message key="datasource.select" bundle="ds" /></option>
              </select>
			  </td>
                      <td width="10%">&nbsp;&nbsp;</td> 
						<td width="10%" align="right" class="bodytext" style="padding-right:12px;">
			<strong><bean:message key="datasource.country" bundle="ds" />&nbsp;:</strong>
			</td>
			<td></td>
			  <td    width="20%"><select id="addCountry" 
                            dojoType="dijit.form.FilteringSelect"  name="addCountry"    autocomplete="off"     invalidMessage="Invalid Address Field"  store="columnStore" searchAttr="label" onChange="enableDisableColumns(this);resetNonAddressFields(this);">
                <option value=""><bean:message key="datasource.select" bundle="ds" /></option>
              </select></td>
			   <td width="10%">&nbsp;&nbsp;</td> 
						<td width="10%" align="right" class="bodytext" style="padding-right:12px;">
			<strong><bean:message key="datasource.zipcode" bundle="ds" />&nbsp;:</strong>
			</td>
			<td></td>
			  <td    width="20%"><select id="addZipCode" 
                            dojoType="dijit.form.FilteringSelect"  name="addZipCode"    autocomplete="off"     invalidMessage="Invalid Address Field"  store="columnStore" searchAttr="label" onChange="enableDisableColumns(this);resetNonAddressFields(this);" >>
                <option value=""><bean:message key="datasource.select" bundle="ds" /></option>
              </select></td>
                        
                      </tr>

                    </table></td>
                  </tr>
                 
				  </table>
					</td>
					</tr>
	
				
</body>			