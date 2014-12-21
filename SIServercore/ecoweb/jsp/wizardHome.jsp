<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ page import="javax.servlet.*" %>
<html>
<head>
<title></title>

<style type="text/css">
			@import "js/dojo/resources/dojo.css";
			@import "js/dijit/themes/tundra/tundra.css";
			@import "js/dijit/themes/tundra/tundra_rtl.css";
			@import "js/dijit/tests/css/dijitTests.css";

			.formQuestion {
				background-color:#d0e3f5;
				padding:0.3em;
				font-weight:900;
				font-family:Verdana, Arial, sans-serif;
				font-size:0.8em;
				color:#5a5a5a;
			}
			.formAnswer {
				background-color:#f5eede;
				padding:0.3em;
				margin-bottom:1em;
				width: 100%;
			}
			.pageSubContentTitle {
					color:#8e8e8e;
					font-size:1em;
					font-family:Verdana, Arial, sans-serif;
					margin-bottom:0.75em;
			}
			body .short {
				width: 5em;
			}
			body .medium {
				width: 10em;
			}
			body .long {
				width: 20em;
			}
			.firstLabel {
				display: inline-block;
				display: -moz-inline-box;
				width: 10em;
				min-width: 10em;
			}
			.secondLabel {
				width: auto;
				margin-left: 5em;
				margin-right: 1em;
			}
			fieldset label {
				margin-right: 1em;
			}
			.noticeMessage {
				display: block;
				float: right;
				font-weight: normal;
				font-family:Arial, Verdana, sans-serif;
				color:#663;
				font-size:0.9em;
			}
			.dj_ie .dijitSlider .dijitRuleContainer {
			        z-index: 1;
			}
		</style>
		
<script type="text/javascript" src="js/dojo/dojo.js"
	djConfig="isDebug: false, parseOnLoad: true"></script>
		<script type="text/javascript">
			dojo.require("dijit.form.Form");
			dojo.require("dijit.form.CheckBox");
			dojo.require("dijit.form.Button");
			dojo.require("dijit.form.ValidationTextBox");
			dojo.require("dojo.parser");	// scan page for widgets and instantiate them
		</script>
	<script type="text/javascript" src="js/ecowebDS.js" ></script>
	<script>
		function backToHome(){
			window.location = "<%=ServerUtils.getContextName(request)%>";
		}
	</script>
	
</head>
<body class="tundra">


<html:form action="WizardHomeAction"
	onsubmit="return validateAll();" enctype="multipart/form-data" method="POST">
	<input type="hidden" id="csrf" name="csrf" value="${csrf}">

	  <fieldset  style="width: 90%">
	<table width='40%' align="left">
		<tr>
			<td colspan="3"><input type="radio" name="ecosystem" autocomplete="off"
				id="newEcosystem" value="newEcosystem"
				dojoType="dijit.form.RadioButton" onClick="showEcosystemDtls()" />
				<bean:message bundle="ecoweb" key="ecomodel.label.create" /></td>
		</tr>
		<tr style="display:none" id="fileName">
			<td >&nbsp;&nbsp;&nbsp;&nbsp;</td>
			<td>&nbsp;&nbsp;</td>
			
			<th align="right" >
			<bean:message bundle="ecoweb" key="ecomodel.label.create.newfilename" /><font color="red" size="2">*</font>
				 <input type="text"	id="ecosystemFileName" name="ecosystemFileName" class="medium" autocomplete="off"
				 	dojoType="dijit.form.ValidationTextBox" required="true" trim="true"	ucfirst="true" />
				 </th>
		</tr>
		<tr>
			<td colspan='2'>&nbsp;</td>
			<th>&nbsp;</th>
		</tr>
		<tr>
			<td colspan="3"><input type="radio" name="ecosystem" autocomplete="off"
				id="ModifyEcosystem" value="ModifyEcosystem" 
				dojoType="dijit.form.RadioButton" onClick="showEcosystemDtls()" />
				<bean:message bundle="ecoweb" key="ecomodel.label.update" /></td>
		</tr>
		<tr>
			<td colspan='2'>&nbsp;</td>
			<th>&nbsp;</th>
		</tr>
		<tr>
			<td colspan="3"><input type="radio" name="ecosystem" autocomplete="off"
				id="deleteEcosystem" value="deleteEcosystem" 
				dojoType="dijit.form.RadioButton" onClick="showEcosystemDtls()" />
				<bean:message bundle="ecoweb" key="ecomodel.label.delete" /></td>
		</tr>
		
		<tr>
			<td colspan='2'>&nbsp;</td>
			<th>&nbsp;<input type="hidden" name="operation" id="operation"
				value="OnLoad" /><input type="hidden" name="pageId" id="pageId"
				value="1" /></th>
		</tr>
		<tr>
			<td colspan="3">
			<center>
			<button dojoType="dijit.form.Button" type='button' onClick="backToHome()">Admin Home</button> &nbsp;&nbsp;&nbsp;&nbsp;
			<button dojoType="dijit.form.Button" type=submit>Next</button>
			
			</center>
			</td>
		</tr>
		<!--<tr>
			<td colspan="7">
				<logic:present scope="session" name="ecoSystemParams">
				<table>
					<logic:iterate id="params" scope="session" name="ecoSystemParams">
						<tr><td><bean:write name="params" property="paramName"/> = <bean:write name="params" property="paramValue"/></td></tr>
					</logic:iterate>	
				</table>	
				</logic:present>
			</td>
		</tr>
	--></table>
	 </fieldset>
	<html:javascript formName="wizardHomeForm" dynamicJavascript="true"
		staticJavascript="true" />
		
		<input type="hidden" name="ecosystemType" value="<bean:write property="ecosystemType" name="beanDtls"/>"/>
		<input type="hidden" name="datasourceType" value="<bean:write property="datasourceType" name="beanDtls"/>"/>
		<input type="hidden" name="ecofeatureType" value="<bean:write property="ecofeatureType" name="beanDtls" />"/>
		<input type="hidden" name="ecoartifactType" value="<bean:write property="ecoartifactType" name="beanDtls" />"/>
</html:form>
	
	<!--  
				***************************************************************************************
					Populate the EcoDatasource page  ---- Input Properties & parameters
				***************************************************************************************
	-->

<script>
	var paramsMap = new Array(100);
	var i=0;
	<%
	     System.out.println(session.getAttribute("ecoSystemParams"));	  
	%>
	
<logic:present scope="session" name="ecoSystemParams">     
	<logic:iterate id="params" scope="session" name="ecoSystemParams">	
		paramsMap[i] = new Array(2);
		paramsMap[i][0]='<bean:write name="params" property="paramName"/>';
		paramsMap[i][1]=dojo.trim('<bean:write name="params" property="paramValue"/>');
		i++;
	</logic:iterate>	
</logic:present>		 
</script>

<script>	 
	 					
		dojo.addOnLoad(loadFormValues);						
		function loadFormValues(){
		    
			for(j = 0; j < i; j++){
			  
				try{				
					try{
						dijit.byId(paramsMap[j][0]).value = paramsMap[j][1];
											
					}catch(err){
						 
					}
										
					if(paramsMap[j][0] == 'ecosystemFileName'){
						document.getElementById('ecosystemFileName').value = paramsMap[j][1];
					}
					
				}catch(er){
                      				
				}
				
				if(paramsMap[j][0] == 'ecosystem' ){				   
				   // document.getElementById('newEcosystem').checked=true;
				   // document.getElementById('fileName').style.display='';
					dijit.byId(paramsMap[j][1]).setAttribute('checked', true);
					showEcosystemDtls()
				}
			}
		}	
	 
</script>
</body>
</html>

