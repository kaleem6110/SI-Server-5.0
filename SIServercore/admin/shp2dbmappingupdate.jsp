	<%@page import="com.enterprisehorizons.util.StringUtils"%>
	<%@page import="com.enterprisehorizons.magma.server.admin.Shp2DBMappingUtils"%>
	<%@page import="com.enterprisehorizons.magma.shape2dbmapping.model.AttrMappingDef"%>
	<%@page import="com.enterprisehorizons.magma.shape2dbmapping.model.Shape2DBMappingDef"%>
	<%@page import="com.enterprisehorizons.magma.shape2dbmapping.model.ShapeFileCollatorDef"%>
	<%@page import="com.enterprisehorizons.magma.shape2dbmapping.model.Parameter"%>
	<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
	<%@ page import="org.owasp.esapi.ESAPI" %>
    <%@ taglib uri="/tags/struts-bean" prefix="bean"%>
	<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
    <%@ taglib uri="/tags/struts-html" prefix="html"%>
    <%@ taglib uri="/tags/struts-logic" prefix="logic"%>


	<%	String shapeFileName = null;
		Shape2DBMappingDef mappingDef = null;
		String dbModelName = null;
		ShapeFileCollatorDef collatorDef = null;
		String collatorType = "";
		String radius = "";
		String nameIndex = "";
		String[][] shapeFileAttributes = null;	
		String exceptionName = null;
		int noOfShapeAttrs  = 0;


		try{
			shapeFileName = request.getParameter("cmbMappedDefinitions");
			mappingDef = Shp2DBMappingUtils.getMappedDefinition(shapeFileName);
			dbModelName = mappingDef.getDbModel();
			collatorDef = mappingDef.getShapeFileCollatorDef();
			if(collatorDef != null) {
				collatorType = collatorDef.getType();
				Parameter[] parameters = collatorDef.getParameter();
				if(parameters != null) {
					if(parameters.length == 2) {
						radius = parameters[0].getValue();
						nameIndex = parameters[1].getValue();
					}
				}
			}
			shapeFileAttributes = Shp2DBMappingUtils.getShapeFileAttributes(shapeFileName);
			noOfShapeAttrs  =  shapeFileAttributes == null ? 0 : shapeFileAttributes.length;
		}catch(Exception e){
			exceptionName = e.getMessage();
		}

	%>

	<html>
	<head>
	<!-- Importing the Styles -->
<jsp:include page="/common/charsetmeta.jsp"/>
<script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/sessionTimeOut.js"></script>
<%@ include file="/common/style.jsp"%>	
<script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/dojo/dojo.js" djConfig="isDebug: false, parseOnLoad: true"></script>
	<script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/dijit/form/_testCommon.js"></script>
	<script type="text/javascript">
			 dojo.require("dojo.parser");
			 dojo.require("dijit.form.Form");
			 dojo.require("dijit.form.Button");
			 dojo.require("dijit.form.ComboBox");
			 dojo.require("dijit.form.FilteringSelect");
			 dojo.require("dijit.form.ValidationTextBox");
			 		 dojo.require("dijit.Dialog");

	</script>
	
	<style type="text/css">
				@import "<%=ServerUtils.getContextName(request)%>/js/dojo/resources/dojo.css";
				@import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/tundra/tundra.css";
				@import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/tundra/tundra_rtl.css";
				@import "<%=ServerUtils.getContextName(request)%>/js/dijit/tests/css/dijitTests.css";
				@import "<%=ServerUtils.getContextName(request)%>/js/dojox/form/resources/FileInput.css"; 
				
				body .medium {
					width: 15em;
					height:1.7em
				}

				
	</style>


	<title>Shape to Database Mapping - Update</title>



	<script type="text/JavaScript">
	   var divarray=[];
	   var customValueArray = [];
   var  temp = "<%=radius%>";
	  var collateby;

		function goToDBHomePage(){
				window.location = "<%=ServerUtils.getContextName(request)%>/adminMain.do";
		}
	function enableButtons() {
		  dijit.byId('idSubmit').setAttribute('disabled', false);
					dijit.byId('idSReset').setAttribute('disabled', false);
	}
		function showOrHideCustomText(cmbBox) {
			enableButtons();
			var cmbBoxname = cmbBox.name;
			
			var selValue = dijit.byId(cmbBoxname).getDisplayedValue();
			if(selValue != "<bean:message key='shpDbMap.custom.label' bundle='shpDbMap'/>" ) {
				document.getElementById('div'+cmbBoxname).style.visibility = 'hidden';
				document.getElementById("txt"+cmbBoxname).disabled=true;
				
				var name_cmbBoxname = document.getElementById("txt"+cmbBoxname).value;
				customValueArray.push({valueList: name_cmbBoxname , name:cmbBoxname});
				document.getElementById("txt"+cmbBoxname).value ="";
				
				
				
			} else {
			  for(var j=0;j<customValueArray.length;j++){
				  var temp1 = customValueArray[j].name;
                 if (customValueArray[j].name == cmbBoxname ){
					  document.getElementById("txt"+cmbBoxname).value = customValueArray[j].valueList ;
				 }	 
		}
		document.getElementById('div'+cmbBoxname).style.visibility = 'visible';
				document.getElementById("txt"+cmbBoxname).disabled=false;

			}
		}

		function showOrHideRadiusCollatorDiv(cmbBox) {
			enableButtons();
			var selValue = dijit.byId('cmbCollator').getDisplayedValue()
			if(selValue != 'Radius'){
				document.getElementById('divRadiusCollator').style.visibility = 'hidden';

                document.getElementById("txtRadius").value ="";
                document.getElementById("txtRadius").disabled=true;
				
				document.getElementById("cmbCollateBy").value ="";
                document.getElementById("cmbCollateBy").disabled=true;
				
			} else {
				document.getElementById('divRadiusCollator').style.visibility = 'visible';

				document.getElementById("txtRadius").value =temp;
				document.getElementById("txtRadius").disabled=false;
				
				document.getElementById("cmbCollateBy").selectedIndex = collateby;
				dijit.byId("cmbCollateBy").reset();
                document.getElementById("cmbCollateBy").disabled=false;

			}
			
			
		}
		
	</script>

	</head>

	<body class="tundra bodybg">

	<form name="frm" id ="frm" method="post" action="<%=ServerUtils.getContextName(request)%>/shptodb.do">
	<input type="hidden" id="csrf" name="csrf" value="${csrf}">
	<table width="101.2%" cellspacing="0" cellpadding="0" border="0" >
     	<tr>
	        <td style = "padding-left : 67px;">    
		        <table>
	    		    <tr>
		   			    <td height="60px" style = "padding-top : 30px;" align="left" valign="top" class="pageTitle" style="padding-left:0px"><bean:message key="shpDbMap.shpToDataMapUpdate" bundle="shpDbMap"/>
					        <span id="ctl00_mainbody_lblError" class="error">
					            <label class="success">
					                <html:messages id="msg" message="true" >
					                    <bean:write name="msg"/>
					                 </html:messages>
					            </label>
					        </span>
					         <br/>
					      
					    </td>
			        </tr>

					<tr>
                   
                    <td height="30px" align="left" valign="top" class="paddingTitleDesc bodytext" style="padding-left:0px"><strong><bean:message key="shpDbMap.shpToDataMapUpdateDesription" bundle="shpDbMap"/></strong>
                    </td>
			</tr>

			        <tr>
		                <td>
				            <html:messages id="saveStatus" message="true" bundle="shptoDb">
					           <logic:present name="saveStatus"> <bean:write name="saveStatus" />  
				               </logic:present>
		                    </html:messages>
				             </b>
				            <font color="red" style="font-family: Tahoma;font-size: 12px;">
				            <b>
				            <html:errors bundle="shptoDb"/>
						    </b>
							</font> 
				        </td>
				    </tr>
			    </table>
			</td>
	    </tr>
	    <tr>
	    <tr>
		    <td>&nbsp;
				 
			</td>
		</tr>
		<tr>
	     	<td>&nbsp;
			    
			</td>
	    </tr>
	    <tr>
		    <td style = "padding-left : 67px;">
		        <table  border="0" align="center" width="100%">
		          
					
					<tr>
                        <td width="8%" align="left" style="padding-top:10px"><label class="label"><bean:message key='shpDbMap.dbmodel.label' bundle='shpDbMap'/> :</label>
                        </td>
                        <td width="60%" class="bodytext" style="padding-top:11px" valign="top">&nbsp;<%=ESAPI.encoder().encodeForHTML(dbModelName)%>
                        </td>
						<td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td align="left" style="padding-top:10px"><label class="label" ><bean:message key='shpDbMap.shapefile.label' bundle='shpDbMap'/>:</label>
                        </td>
                        <td class="bodytext" style="padding-top:10px" align="top">  &nbsp;<%=ESAPI.encoder().encodeForHTML(shapeFileName)%>
                        </td>
						<td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td align="left" style="padding-top:10px"><label class="label" align="top">[ATTR=<i>VALUE</i>] :</label>
                        </td>
                        <td class="bodytext" style="padding-top:24px"><% for(int i = 0; i < noOfShapeAttrs; i++) {%> [<%=shapeFileAttributes[i][0]%>=<i><%=shapeFileAttributes[i][1]%></i>] &nbsp; <% }%>
                        </td>
					   
                    </tr>
	    
			    </table>
			</td>
	    </tr>
	    <tr>
			<td>&nbsp;
				   
			</td>
					        
		</tr>
		 <tr>
			<td>
					<% if (exceptionName == null ) {%>
			    <table width="100%" border="0" cellpadding="2" cellspacing="2">
					    
				    <tr>
						<td width="250" align="right" class="redtitle1"><strong class="bodytext1"><bean:message key='shpDbMap.modelattribute.name' bundle='shpDbMap'/></strong>&nbsp;</label>
						</td>
						
						<td class="redtitle1" width="10%"><strong class="bodytext1"><bean:message key='shpDbMap.shapeattribute.name' bundle='shpDbMap'/></strong>
						</td>
							
				    </tr>
						 <%
							AttrMappingDef[] attrMappingDef = mappingDef.getAttrMappingDef();
						String displayField = null;
						StringBuffer tempStr = new StringBuffer();
						
							int noOfMappingDefs  =  attrMappingDef == null ? 0 : attrMappingDef.length;
							for(int i = 0; i < noOfMappingDefs; i++) {
							
								displayField = null;
								tempStr = null;
								displayField = attrMappingDef[i].getFieldName();%>
							
								<%if(displayField != null){
								 tempStr =  new StringBuffer();
								for(int j= 0; j< displayField.length(); j++) {%>


									<%if(j == 0)
										tempStr.append((""+displayField.charAt(j)).toUpperCase());
									else
										tempStr.append(""+displayField.charAt(j));
								}
								}
						%>        
				    <tr>
						<td  align="right"> <label class="label" ><%=tempStr.toString()%> :&nbsp;</label>
					    </td>
						
						<td   class="bodytext" style="padding-top:10px" >
							<select id = "<%=attrMappingDef[i].getFieldName()%>" name="<%=attrMappingDef[i].getFieldName()%>" dojoType="dijit.form.FilteringSelect" autocomplete="off" onChange="return showOrHideCustomText(this);">
								 <option value=""><bean:message key="validation.msg.select" bundle="splchvalidation"/> </option>
								 <option value="custom" <%=(StringUtils.isNull(attrMappingDef[i].getCustomValue()) ? "" : "selected")%>><bean:message key="shpDbMap.custom.label" bundle="shpDbMap"/>
								 </option>
							<%
								for(int j = 0; j < noOfShapeAttrs; j++) {
							%>  
								 <option value="<%=shapeFileAttributes[j][0]+"_"+j%>" <%=(shapeFileAttributes[j][0].equals(attrMappingDef[i].getShapeAttributeName()) ? "selected" : "")%>><%=shapeFileAttributes[j][0]%></option>
							<%
								}
							%>        
							<script>
								var value = "<%=attrMappingDef[i].getFieldName()%>";

							   var customValue =  "<%=attrMappingDef[i].getCustomValue()%>";
							     if(customValue == 'null')
                                  customValue ="";
							 divarray.push({divlist: value , customValueList: customValue});
				            dojo.byId('<%=attrMappingDef[i].getFieldName()%>').Value='';
							</script>

							</select>
						</td>
						<td class="bodytext" style="padding-top:0px">
						    <div id="div<%=attrMappingDef[i].getFieldName()%>" style="visibility:<%=(attrMappingDef[i].getCustomValue() == null ? "hidden" : "visible")%>;">
								<input type="text" name="txt<%=attrMappingDef[i].getFieldName()%>" id="txt<%=attrMappingDef[i].getFieldName()%>" dojoType="dijit.form.ValidationTextBox" 
									value="<%=(attrMappingDef[i].getCustomValue() == null ? "&nbsp;" : attrMappingDef[i].getCustomValue())%>" 
									<%if(attrMappingDef[i].getCustomValue() == null){%> disabled<%}%> MAXLENGTH="100" autocomplete="off">
							</div>
					    </td>           
					</tr>
						<%
							}
						%>      
					<tr valign="top">
					    <td align="right" class="bodytext" style="padding-top:10px;"><b><bean:message key="shpDbMap.collator.label" bundle="shpDbMap" /> : </b> <label class="label">&nbsp;</label>
                        </td>
						
						<td colspan="2" class="bodytext" style="padding-top:10px"><select id="cmbCollator" name="cmbCollator" dojoType="dijit.form.FilteringSelect" autocomplete="off" onChange="return showOrHideRadiusCollatorDiv(this);">
							    <option value="" ><bean:message key="validation.msg.select" bundle="splchvalidation"/> </option>
						         <option value="com.enterprisehorizons.conversion.shp.custom.TieLineStringCollater" <%=(collatorType.indexOf("TieLineStringCollater") > 0 ? "selected" : "")%>><bean:message key="shpDbMap.point.label" bundle="shpDbMap" /></option>
							    <option value="com.enterprisehorizons.magma.server.util.MergingTieLineCollator" <%=(collatorType.indexOf("MergingTieLineCollator") > 0 ? "selected" : "")%>><bean:message key="shpDbMap.radius.label" bundle="shpDbMap" /></option>
						    </select>
						</td>
				     </tr>
				</table>
			</td>
	    </tr>
		<tr valign="top">
			<td colspan="4" align="left" style="padding-left:195px;padding-top:10px;" >
				<div id="divRadiusCollator" style="visibility:<%=(collatorType.indexOf("MergingTieLineCollator") > 0 ? "visible" : "hidden")%>;">                    <table border="0" align="left" width="100%">
					    <tr>
							<td align="right" width="2%">
								<label class="label">Radius<font color="red" size="1">*</font>: </label></td>
								<%if(collatorType.indexOf("MergingTieLineCollator") > 0){%>
							<td  class="bodytext" width="19%" style="padding-top:0px">&nbsp;<input type="text" dojoType="dijit.form.ValidationTextBox"  name="txtRadius" id ="txtRadius" autocomplete="off" value="<%=radius%>" onKeyUp="enableButtons()" MAXLENGTH=100></td>
                                   <%}else{%>
							<td><input type="text" dojoType="dijit.form.ValidationTextBox"  name="txtRadius" id ="txtRadius" autocomplete="off" value="<%=radius%>" onKeyUp="enableButtons()"></td>
								   <%}%>
					          
						    <td> 
							        <label class="label" width="10%" >Collate By<font color="red" size="1">*</font>:
							        </label>
							
					  	        <select id="cmbCollateBy" name="cmbCollateBy" onChange="enableButtons()" dojoType="dijit.form.FilteringSelect" autocomplete="off">
						            <option value=""><bean:message key="validation.msg.select" bundle="splchvalidation"/> 
							        </option>
									      <%
										for(int j = 0; j < noOfShapeAttrs; j++) {
									%>  
							        <option value="<%=j%>" <%=(String.valueOf(j).equals(nameIndex) ? "selected" : "")%>><%=shapeFileAttributes[j][0]%>
							        </option>
									<%
										}
									%>          
								    </select>
								    <script>  collateby = document.getElementById("cmbCollateBy").selectedIndex;	</script>
							</td>
					    </tr>
				    </table>
				</div>
								
			</td>           
		</tr>           
			
				<% }else { %>
	    <tr>
		    <td class="redtitle1">&nbsp;</td>
	    </tr>
	    <tr>
		    <td class="redtitle1"><%=exceptionName %></td>
		</tr>
	    <tr>
		    <td class="redtitle1">&nbsp;</td>
	    </tr>
			<%	} %>				
				  
		<tr>
		     <td>&nbsp;</td>
        </tr>	
        <tr>
		     <td>&nbsp;</td>
        </tr>
	    <tr  height="30" colspan="2" class="barColor" >
            <td height="30" colspan="2" class="barColor" align="center">	 
	            <button dojoType="dijit.form.Button"  type="button" onClick="window.location ='<%=ServerUtils.getContextName(request)%>/adminMain.do'"><bean:message key="admin.common.home" bundle="admin"/> </button>
                <button dojoType="dijit.form.Button"  type="button" onClick="window.location= '<%=ServerUtils.getContextName(request)%>/shapedbMapping.do'"><bean:message key="admin.common.back" bundle="admin"/> </button><% if(exceptionName == null){ %>
                <button dojoType="dijit.form.Button"  id="idSubmit" name="btnSubmit" type="button" onClick="return performSubmit();"><bean:message key="admin.common.save" bundle="admin"/>  </button>
                <button dojoType="dijit.form.Button"  id="idSReset" name="btnReset"  onclick="performReset();"/> <bean:message key="admin.common.reset" bundle="admin"/>    </button> <% } %>
            </td>
        </tr>

	    
   <table>
		<input type="hidden" name="dbModelName" id="dbModelName" value="<%=ESAPI.encoder().encodeForHTML(dbModelName)%>"/>
		<input type="hidden" name="shapeFileName" id="shapeFileName" value="<%=ESAPI.encoder().encodeForHTML(shapeFileName)%>"/>
		<input type="hidden" name="operation" id="operation" value="update"/>
	</form>
	<script type="text/JavaScript">
	function showEmptyDialog(data2Display, dialogTitle){
		var emptyDlg = new dijit.Dialog({
            title: "<bean:message key='admin.common.dialog.loading' bundle='admin'/>",
            style: "width: 300px;height:125px"
        });
        if(emptyDlg != null) {          
            emptyDlg.attr("title",  dialogTitle);
            emptyDlg.attr("content", "<center><table ><tr><td align=center></tr><tr><td align='center'>"+data2Display+"</td></tr><tr><td align='center'>    <button dojoType=dijit.form.Button type='submit'><bean:message key='admin.common.dialog.ok' bundle='admin'/></button></td></td></tr></table></center>");
            emptyDlg.show();
        }
    }


function performSubmit()
   {
	  var integerRadius = dijit.byId("txtRadius").value;
		var cmbCollatorValue = dijit.byId("cmbCollator").value;
		var cmbCollateByValue = dijit.byId("cmbCollateBy").value;
		re = /^\d+$/;	

		if(cmbCollatorValue != '' && cmbCollatorValue == 'com.enterprisehorizons.magma.server.util.MergingTieLineCollator'){
			
			if(integerRadius =='' || cmbCollateByValue == '') {
				showEmptyDialog("<bean:message key='admin.common.mandatory.alert' bundle='admin'/>","<bean:message key='admin.common.alert.title' bundle='admin'/>");
				return false;
			}

			if(integerRadius!= "" && !re.test(integerRadius)){
				showEmptyDialog("<bean:message key='admin.common.check.numeric' bundle='admin'/>","<bean:message key='admin.common.alert.title' bundle='admin'/>");		   
				return false;
			}
		}
      document.getElementById("frm").submit(); 
    }

function performReset(){
    dijit.byId('cmbCollator').setValue('');
    document.getElementById('cmbCollateBy').style.visibility = 'hidden';
            document.getElementById("cmbCollateBy").disabled=true;
            document.getElementById("cmbCollateBy").value ="";
		for(i=0;i<divarray.length;i++){
            dijit.byId(divarray[i].divlist).reset();
			if(i == 0){
				dijit.byId(divarray[i].divlist).focus();
			}
			if( dijit.byId(divarray[i].divlist).value != 'custom')
				document.getElementById("div"+divarray[i].divlist).style.visibility = 'hidden'; 
						dojo.byId("txt"+divarray[i].divlist).value=divarray[i].customValueList;

		}
		dijit.byId("txtRadius").reset();
			dijit.byId("cmbCollator").reset();
		 document.getElementById("cmbCollateBy").selectedIndex = collateby;
                    
		document.getElementById("txtRadius").value = temp;
		
		}
        dojo.addOnLoad(selVal);
function selVal(){
	dijit.byId('cmbCollator').setValue('');
    document.getElementById('cmbCollateBy').style.visibility = 'hidden';
            document.getElementById("cmbCollateBy").disabled=true;
            document.getElementById("cmbCollateBy").value ="";
        for(i=0;i<divarray.length;i++){
            dijit.byId(divarray[i].divlist).reset();
            if(i == 0){
                dijit.byId(divarray[i].divlist).focus();
            }
            if( dijit.byId(divarray[i].divlist).value != 'custom')
                document.getElementById("div"+divarray[i].divlist).style.visibility = 'hidden'; 
                        dojo.byId("txt"+divarray[i].divlist).value=divarray[i].customValueList;

        }
        dijit.byId("txtRadius").reset();
            dijit.byId("cmbCollator").reset();
         document.getElementById("cmbCollateBy").selectedIndex = collateby;
                    
        document.getElementById("txtRadius").value = temp;
}
	
	</script>