<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/WEB-INF/UserPreferences.tld" prefix="UserPreferences"%>
<%@page import="java.util.List" %>
<%@page import="java.util.Map" %>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ page import="org.owasp.esapi.ESAPI" %>
<%@page import="org.apache.commons.lang.StringEscapeUtils"%>
<%@page pageEncoding="UTF-8"%>
<%  
	String serverUrl = ServerUtils.getServerContextBaseUrl(request);
   	String configNames= "geoFeatureHighlightColor:PREF_USER_GE_VIEWER_GEOFEATURE_HIGHLIGHTCOLOR#PREF_MODULE_GE_VIEWER_GEOFEATURE_HIGHLIGHTCOLOR,defaultFavorite:PREF_USER_GE_VIEWER_DEFAULTFAVORITE#PREF_MODULE_GE_VIEWER_DEFAULTFAVORITE,expandTree:PREF_USER_GE_VIEWER_EXPANDTREE#PREF_MODULE_GE_VIEWER_EXPANDTREE,disableTour:PREF_USER_GE_VIEWER_DISABLETOUR#PREF_MODULE_GE_VIEWER_DISABLETOUR,searchByAddress:PREF_USER_GE_VIEWER_SEARCHBYADDRESS#PREF_MODULE_GE_VIEWER_SEARCHBYADDRESS,expandState:PREF_USER_GE_VIEWER_EXPANDSTATE#PREF_MODULE_GE_VIEWER_EXPANDSTATE,layout:PREF_USER_GE_VIEWER_LAYOUT#PREF_MODULE_GE_VIEWER_LAYOUT,measurementType:PREF_USER_GE_VIEWER_MEASUREMENTTYPE#PREF_MODULE_GE_VIEWER_MEASUREMENTTYPE";
   	String  categoryName="Viewer";
	String importType=String.valueOf(request.getParameter("importType"));

   String userId=String.valueOf(request.getParameter("userId"));
String moduleId=String.valueOf(request.getParameter("moduleId"));   
  if("-1".equals(userId))
   {
		configNames += ",moduleJSUrl:#PREF_MODULE_GE_VIEWER_MODULEJSURL,pluginJSUrl:#PREF_MODULE_GE_VIEWER_PLUGINJSURL,layerEventHandlerJSFunction:#PREF_MODULE_GE_VIEWER_LAYEREVENTHANDLERJSFUNCTION";
   }
  
%>

<UserPreferences:UserPreferences userId="<%=ESAPI.encoder().encodeForHTML(userId)%>" moduleId="<%=ESAPI.encoder().encodeForHTML(moduleId)%>"  categoryName="<%=ESAPI.encoder().encodeForHTML(categoryName)%>" configNames="<%=ESAPI.encoder().encodeForHTML(configNames)%>" importType="<%=ESAPI.encoder().encodeForHTML(importType)%>"/>

<script src="<%=ESAPI.encoder().encodeForHTML(serverUrl) %>js/colorpicker.js" type="text/JavaScript"></script>
<script>
      var categoryName='<%=categoryName%>';
      var colorPickerTopPosition = 1;
  	var colorPickerLeftPosition = 200;
      function validateCategory() {
        return true;
      }
   </script>
 <div id="colorpicker" onmousedown="HSVslide('drag','colorpicker',event)" style=" TOP: 20px; LEFT: 230px; Z-INDEX: 20;">
 		<div id="plugHEX" onmousedown="stop=0; setTimeout('stop=1',100);"></div>
        <div id="plugCLOSE" onmousedown="toggle('colorpicker')" style="font-family:Verdana, Geneva, sans-serif"><b>X</b></div>
        <br>
 		<div id="SV" class="colorpickerSV" onmousedown="HSVslide('SVslide','colorpicker',event)" title="Saturation + Value">
  			<div id="SVslide" style="TOP: -4px; LEFT: -4px;"><br /></div>
 		</div>
 		<div id="H" onmousedown="HSVslide('Hslide','colorpicker',event)" title="Hue">
            <div id="Hslide" style="TOP: -7px; LEFT: -8px;"><br /></div>
            <div id="Hmodel"></div>
 		</div>
	</div>
  <input type="hidden" name="categoryName" value="<%=categoryName%>"/>  
  	<script>
	colorPickerTopPosition = 35;
	colorPickerLeftPosition = 200;
	</script>
<!-- independent preferences -->
	<table cellspacing="0" style="margin-left:10px;">
      <tr><td>&nbsp;</td></tr> 
    </table>
 <table cellspacing="5" style="margin-left:10px; "> 

    <tr>
        <td align="right" ><strong><bean:message key="preferences.viewer.default.favorite" bundle="admin"/></strong>:</td>
        <td align="left" title='<bean:message key="preferences.ge.viewer.defaultfavorite.tooltip" bundle="admin"/>'><select id = "defaultFavorite" name="defaultFavorite" dojoType="dijit.form.FilteringSelect"  autocomplete="off" style="width:200px" <%=(pageContext.getAttribute("defaultFavorite_update")!=null)?"disabled=\"disabled\"":"" %>> 
        <option value=" " '<%=(pageContext.getAttribute("defaultFavorite").toString().equals(" ")?"selected":"")%>' />
        <logic:present name="defaultFavoriteOptions">
          <logic:iterate id="favorite" name="defaultFavoriteOptions" >
                  <option value="<bean:write name='favorite' property='key'/>" <logic:equal name="favorite" property="key" value='<%=pageContext.getAttribute("defaultFavorite").toString()%>'> selected </logic:equal>>   
                    <bean:write name='favorite' property='value'/> 
                  </option>
               </logic:iterate>
        </logic:present>
     </select></td> 
    </tr>  
    <tr>
        <td align="right" ><strong><bean:message key="preferences.layout" bundle="admin"/></strong>:</td>
        <td width="60" title='<bean:message key="preferences.ge.viewer.layout.tooltip" bundle="admin"/>'>
            <select id ="layout" name="layout" dojoType="dijit.form.FilteringSelect" invalidMessage="<bean:message key="admin.invalid.error" bundle="admin" />"  autocomplete="off" style="width:200px" <%=(pageContext.getAttribute("layout_update")!=null)?"disabled=\"disabled\"":"" %>>
                 <option value="horizontal" <logic:equal name="layout" value='horizontal'> selected </logic:equal> ><bean:message key="preferences.horizontal" bundle="admin"/></option>
                 <option value="vertical" <logic:equal name="layout" value='vertical'> selected </logic:equal> ><bean:message key="preferences.vertical" bundle="admin"/></option>
            </select>
        </td>
    </tr>
    <tr>
        <td align="right" ><strong><bean:message key="preferences.viewer.expand.state" bundle="admin"/></strong>:</td>
        <td width="60" title='<bean:message key="preferences.ge.viewer.expandState.tooltip" bundle="admin"/>'>
            <select id ="expandState" name="expandState" dojoType="dijit.form.FilteringSelect" invalidMessage="<bean:message key="admin.invalid.error" bundle="admin" />"  autocomplete="off" style="width:200px" <%=(pageContext.getAttribute("expandState_update")!=null)?"disabled=\"disabled\"":"" %>>
                 <option value="2" <logic:equal name="expandState" value='2'> selected </logic:equal> ><bean:message key="preferences.viewer.dashboard.map" bundle="admin"/></option>
                 <option value="1" <logic:equal name="expandState" value='1'> selected </logic:equal> ><bean:message key="preferences.viewer.dashboard.maximize" bundle="admin"/> </option>
                 <option value="0" <logic:equal name="expandState" value='0'> selected </logic:equal> ><bean:message key="preferences.viewer.map.maximize" bundle="admin"/></option>
            </select>
        </td> 
    </tr>
     
     <tr>
        <td align="right" >&nbsp;</td>
        <td align="left" title='<bean:message key="preferences.ge.viewer.expandtree.tooltip" bundle="admin"/>'><input type="checkbox" name="expandTree" <%= "on".equals(pageContext.getAttribute("expandTree"))?"checked":""%> <%=(pageContext.getAttribute("expandTree_update")!=null)?"disabled=\"disabled\"":"" %>>&nbsp;<strong><bean:message key="preferences.viewer.label.expandtree" bundle="admin"/></strong></td> 
    </tr> 
    <tr>
        <td align="right" >&nbsp;</td>
        <td align="left" title='<bean:message key="preferences.ge.viewer.disabletour.tooltip" bundle="admin"/>'><input type="checkbox" name="disableTour" <%= (("on".equals(pageContext.getAttribute("disableTour")))||("".equals(pageContext.getAttribute("disableTour"))))?"checked":""%> <%=(pageContext.getAttribute("disableTour_update")!=null)?"disabled=\"disabled\"":"" %>>&nbsp;<strong><bean:message key="preferences.viewer.label.showdisabletour" bundle="admin"/></strong></td> 
    </tr> 
    <tr>
        <td align="right" >&nbsp;</td>
        <td align="left" title='<bean:message key="preferences.ge.viewer.searchbyaddress.tooltip" bundle="admin"/>'><input type="checkbox" name="searchByAddress" <%= (("on".equals(pageContext.getAttribute("searchByAddress")))||("".equals(pageContext.getAttribute("searchByAddress"))))?"checked":""%> <%=(pageContext.getAttribute("searchByAddress_update")!=null)?"disabled=\"disabled\"":"" %>>&nbsp;<strong><bean:message key="preferences.viewer.label.showsearchbox" bundle="admin"/></strong></td> 
    </tr>
	
	 <tr>
            <td align="right" ><strong><bean:message key="preferences.viewer.measurement.type" bundle="admin"/></strong>:</td>
            <td align="left" title='<bean:message key="preferences.ge.viewer.measurementtype.tooltip" bundle="admin"/>'> <select id = "measurement_Type" name="measurementType" dojoType="dijit.form.FilteringSelect" invalidMessage="<bean:message key="admin.invalid.error" bundle="admin" />"  autocomplete="off" style="width:100px" <%=(pageContext.getAttribute("measurementType_update")!=null)?"disabled=\"disabled\"":"" %>>

             <option value="imperial" <logic:equal name="measurementType" value='imperial'> selected </logic:equal> ><bean:message key="preferences.viewer.imperial" bundle="admin"/></option>
             <option value="metric"<logic:equal name="measurementType" value='metric'> selected </logic:equal> ><bean:message key="preferences.viewer.metric" bundle="admin"/></option>
         </select></td> 
        </tr>
                <tr>
                    <td align="right"><strong><bean:message key="preferences.geo.feature.highlight.color" bundle="admin"/></strong>:</td>
                    <td align="left" title='<bean:message key="preferences.ge.viewer.geofeaturehighlightcolor.tooltip" bundle="admin"/>' ><table><tr><td><input id="fillcolorname" size="10" type="text" name="geoFeatureHighlightColor" 
					value='<%=ESAPI.encoder().encodeForHTML("".equals((String)pageContext.getAttribute("geoFeatureHighlightColor"))?"#2EFEF7":(String)pageContext.getAttribute("geoFeatureHighlightColor"))%>' <%=(pageContext.getAttribute("geoFeatureHighlightColor_update")!=null)?"disabled=\"disabled\"":"" %> dojoType="dijit.form.ValidationTextBox" style="width:100px"></td>
                    <td><div id="fillcolorbox" style="width:16px;padding-top:1px; height:15px; border: 1px solid gray; background-color: <%=ESAPI.encoder().encodeForHTML("".equals((String)pageContext.getAttribute("geoFeatureHighlightColor"))?"#00FF00":(String)pageContext.getAttribute("geoFeatureHighlightColor"))%>" onclick="javascript:setid(id,colorPickerTopPosition ,colorPickerLeftPosition)" <%=(pageContext.getAttribute("geoFeatureHighlightColor_update")!=null)?"disabled=\"disabled\"":"" %>>	</div></td></tr></table></td>
                </tr>

	<logic:equal name="userId" value='-1'>
	 
		<tr>
		<td align="right" >
                        <strong><bean:message key="preferences.viewer.module.js.url" bundle="admin"/></strong> :
                    </td>
		<td align="left" title='<bean:message key="preferences.ge.viewer.modulejsurl.tooltip" bundle="admin"/>'>
                         <input size="3" type="text" name="moduleJSUrl"  required='false'
							style="width:250px;" value='<%=ESAPI.encoder().encodeForHTML(pageContext.getAttribute("moduleJSUrl").toString())%>' <%=ESAPI.encoder().encodeForHTML((pageContext.getAttribute("moduleJSUrl_update")!=null)?"disabled=\"disabled\"":"" )%>>
                    </td> 
		</tr>
		<tr>
		<td align="right" >
                        <strong><bean:message key="preferences.viewer.plugin.js.url" bundle="admin"/> </strong> :
                    </td>
		<td align="left" title='<bean:message key="preferences.ge.viewer.pluginjsurl.tooltip" bundle="admin"/>'>
                         <input size="3" type="text" name="pluginJSUrl"  required='false'
							style="width:250px;" value='<%=ESAPI.encoder().encodeForHTML(pageContext.getAttribute("pluginJSUrl").toString())%>' <%=ESAPI.encoder().encodeForHTML((pageContext.getAttribute("pluginJSUrl_update")!=null)?"disabled=\"disabled\"":"" )%>>
                    </td> 
		</tr>
		<tr>
		<td align="right" >
                        <strong><bean:message key="preferences.viewer.layer.event" bundle="admin"/></strong> :
                    </td>
		<td align="left" title='<bean:message key="preferences.ge.viewer.layereventhandlerjsfunction.tooltip" bundle="admin"/>'>
                         <input size="3" type="text" name="layerEventHandlerJSFunction"  required='false'
							style="width:250px;" value='<%=ESAPI.encoder().encodeForHTML(pageContext.getAttribute("layerEventHandlerJSFunction").toString())%>' <%=ESAPI.encoder().encodeForHTML((pageContext.getAttribute("layerEventHandlerJSFunction_update")!=null)?"disabled=\"disabled\"":"") %>>
                    </td> 
		</tr>
		
	</logic:equal>
		
	
	
 </table>     
<script type="text/javascript">
		var ob;
		var tempcol;
		 function setid(id, top_pos, left_pos)
		 {
			ob = id;
			if(ob == "fillcolorbox") {
				tempcol = document.getElementById("fillcolorname").value;
				tempcol = tempcol.replace('#','');
        		 updateH(tempcol); }
			document.getElementById("colorpicker").style.top = top_pos;	
			document.getElementById("colorpicker").style.left = left_pos;
			toggle('colorpicker'); 
		 }
        loadSV();
        //*** CUSTOMIZE mkcolor() function below to perform the desired action when the color picker is being dragged/ used
        //*** Parameter "v" contains the latest color being selected
        function mkColor(v){
        //** In this case, just update DIV with ID="colorbox" so its background color reflects the chosen color
        $S(ob).background='#'+v;
		if(ob == "fillcolorbox")
		document.getElementById("fillcolorname").value = '#'+v;
		}
		toggle('colorpicker');
        
        </script>
<script>
	   var enableApplyBtn='<%=ESAPI.encoder().encodeForHTML(pageContext.getAttribute("enableApplyButton").toString())%>';
</script>
 
 

