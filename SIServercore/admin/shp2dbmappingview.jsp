<%@page import="com.enterprisehorizons.util.StringUtils"%>
<%@page import="com.enterprisehorizons.magma.server.admin.Shp2DBMappingUtils"%>
<%@page import="com.enterprisehorizons.magma.shape2dbmapping.model.AttrMappingDef"%>
<%@page import="com.enterprisehorizons.magma.shape2dbmapping.model.Shape2DBMappingDef"%>
<%@page import="com.enterprisehorizons.magma.shape2dbmapping.model.ShapeFileCollatorDef"%>
<%@page import="com.enterprisehorizons.magma.shape2dbmapping.model.Parameter"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ page import="org.owasp.esapi.ESAPI" %>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%
	String shapeFileName = null;
	Shape2DBMappingDef mappingDef  = null;
	ShapeFileCollatorDef collatorDef = null;
	String[][] shapeFileAttributes  = null;
	int noOfShapeAttrs  = 0;
	String collatorType = "";
	String radius = "";
    String nameIndex = "";
    String collatorTypeStr = "";
    int colbyIndex = 0;
	String collByIndexStr = "";
		    
	try{
		shapeFileName = request.getParameter("cmbMappedDefinitions");

        mappingDef = Shp2DBMappingUtils.getMappedDefinition(shapeFileName);
        collatorDef = mappingDef.getShapeFileCollatorDef();
		shapeFileAttributes = Shp2DBMappingUtils.getShapeFileAttributes(shapeFileName);
        noOfShapeAttrs  =  shapeFileAttributes == null ? 0 : shapeFileAttributes.length;
        if(collatorDef != null) {
            collatorType = collatorDef.getType();
            if(!StringUtils.isNull(collatorType)) {
                if(collatorType.indexOf("MergingTieLineCollator") > 0) {
                    collatorTypeStr = "Radius";
                } else {
                    collatorTypeStr = "Point";
                }
                Parameter[] parameters = collatorDef.getParameter();
                if(parameters != null) {
                    if(parameters.length == 2) {
                        radius = parameters[0].getValue();
                        nameIndex = parameters[1].getValue();
                    }
                }
            }
        }

		if(nameIndex != null && !"".equals(nameIndex)){
		colbyIndex = Integer.parseInt(nameIndex);

		collByIndexStr = shapeFileAttributes[colbyIndex][0];
		}
	}catch(Exception e){

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
		  var divarray=[];
</script>

<style>
    @import "<%=ServerUtils.getContextName(request)%>/js/dojo/resources/dojo.css";
	@import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/tundra/tundra.css";
	@import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/tundra/tundra_rtl.css";
	@import "<%=ServerUtils.getContextName(request)%>/js/dijit/tests/css/dijitTests.css";
	@import "<%=ServerUtils.getContextName(request)%>/js/dojox/form/resources/FileInput.css";
    @import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/dijit.css";
    @import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/dijit_rtl.css";
  
        body .txtareamedium {
            width: 25em;
            height: 5em;
        }

</style>


<title>Shape to Database Mapping - View</title>


<script type="text/JavaScript">
    function goToDBHomePage(){
            window.location = "<%=ServerUtils.getContextName(request)%>/adminMain.do";
    }
</script>

</head>

<body class="tundra bodybg">

<form name="frm" method="post"> 
<input type="hidden" id="csrf" name="csrf" value="${csrf}">
<table width="40%" cellspacing="0" cellpadding="0" align="center" >
    <table width="100%" cellspacing="0" cellpadding="0" align="center" >
<tr>
<td style = "padding-left : 67px;">    
	<table >
<tr>
       
              <td height="20px" style = "padding-top : 30px;" align="left" valign="top"  class="pageTitle " style = "padding-left : 0px;"><strong><bean:message key="shpDbMap.shpToDataMapView" bundle="shpDbMap"/></strong>
				
            </td>
			</tr>
<tr>
                   
                    <td height="40px" align="left" valign="top" class="paddingTitleDesc bodytext" style = "padding-left:0px;"><strong><bean:message key="shpDbMap.shpToDataMapViewDesription" bundle="shpDbMap"/></strong>
                    </td>
			</tr>

            <tr>
					
						 
                  <tr>
				  <td>
				  <table  border="0" width="104%">
                <tr>
                   
                    <td><label class="label"><bean:message key="shpDbMap.dbmodel.label" bundle="shpDbMap"/></label>
                    </td>
                    <td colspan="2" class="bodytext"><%=ESAPI.encoder().encodeForHTML(mappingDef.getDbModel())%>
                    </td>
                </tr>
                <tr>
                   
                   <td><label class="label"><bean:message key="shpDbMap.shapefile.label" bundle="shpDbMap"/></label>
                    </td>
                    <td colspan="2" class="bodytext"> <%=ESAPI.encoder().encodeForHTML(mappingDef.getShapeFile())%>
                    </td>
                </tr>
				</table>
				</td>
				</tr>
				 <table id="table2" height="54" width="50%" cellspacing="2" cellpadding="2" class="border1">
                                <tbody>
           <tr><td align="left">
            
                <tr valign="top">
                    <td width="35%" align="right"><label class="label"><bean:message key="shpDbMap.modelattribute.name" bundle="shpDbMap"/> &nbsp;&nbsp;&nbsp;&nbsp;</label>
					</td>
                    </td>
                    <td width="25%"><label class="label"><bean:message key="shpDbMap.shapeattribute.name" bundle="shpDbMap"/></label>
					</td>
                    <td><label class="label"><bean:message key="shpDbMap.customvalue.label" bundle="shpDbMap"/></label>
                    </td>
                </tr>
				
                <%
				         String displayField = null;
						StringBuffer tempStr = new StringBuffer();
                    AttrMappingDef[] attrMappingDef = mappingDef.getAttrMappingDef();
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
                <tr >
                  <td  align="right" width = "35%"> <label class="label" ><%=tempStr.toString()%> :&nbsp;&nbsp;&nbsp;</label>
                    </td>
                    <td class="bodytext" width = "25%" > <%=(attrMappingDef[i].getShapeAttributeName() == null ? "None" : attrMappingDef[i].getShapeAttributeName())%>
                    </td>
                    <td class="bodytext"><%=(attrMappingDef[i].getCustomValue() == null ? "None" : attrMappingDef[i].getCustomValue())%>
                    </td>           
                </tr>
                <%
                    }
                %>      
                <tr> 
                    <td align="right" width = "35%">  <label class="label"><bean:message key="shpDbMap.collator.label" bundle="shpDbMap"/>:&nbsp;&nbsp;&nbsp;</label>
                   </td>
               
                <% if("Radius".equals(collatorTypeStr)) { %>
               
                   
                    <td class="bodytext" >
                            <bean:message key="shpDbMap.radius.label" bundle="shpDbMap"/>: &nbsp;<%=radius%>
                       </td>
					   <td class="bodytext">
                            <bean:message key="shpDbMap.collateby.label" bundle="shpDbMap"/>: &nbsp;
                 
					<%=collByIndexStr%>
					</td>
					
                <%
                    }
							else  if("Point".equals(collatorTypeStr)) {
                %>   
				<td colspan="2" >
                            <bean:message key="shpDbMap.point.label" bundle="shpDbMap"/>
                    </td>
				<%} else{%>
				<td colspan="2" class="bodytext">
                          <bean:message key="shpDbMap.none.label" bundle="shpDbMap"/>
<%}%>
                    </td>
					</tr>
            </table>
      </td></tr>
	  </tbody>
	  </table>
	  </td></tr>
        <table width="101.2%">
           <tr  height="30" colspan="2" class="barColor">
       <td height="30" colspan="2" class="barColor" align="center">	
	    <button dojoType="dijit.form.Button"  type="button" onClick="window.location ='<%=ServerUtils.getContextName(request)%>/adminMain.do'"><bean:message key="shpDbMap.home" bundle="shpDbMap"/> </button>
                       <button dojoType="dijit.form.Button"  type="button" onClick="window.location= '<%=ServerUtils.getContextName(request)%>/shapedbMapping.do'"><bean:message key="shpDbMap.back" bundle="shpDbMap"/> 
            </td></tr>
        </table>
    </tr>
    </td>
</form>
</body>
</html>