<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/WEB-INF/UserPreferences.tld" prefix="UserPreferences"%>
<%@page import="java.util.List" %>
<%@page import="java.util.Map" %>
<%@page import="org.owasp.esapi.ESAPI"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="org.apache.commons.lang.StringEscapeUtils"%>
<%@page pageEncoding="UTF-8"%>
 
<%  
   String serverUrl = ServerUtils.getServerContextBaseUrl(request);
   String configNames= "fillColor:PREF_USER_GE_RUBBERBAND_FILLCOLOR#PREF_MODULE_GE_RUBBERBAND_FILLCOLOR,applyRegionDefault:PREF_USER_GE_RUBBERBAND_APPLYREGIONDEFAULT#PREF_MODULE_GE_RUBBERBAND_APPLYREGIONDEFAULT,rbHideNameEntry:PREF_USER_GE_RUBBERBAND_RBHIDENAMEENTRY#PREF_MODULE_GE_RUBBERBAND_RBHIDENAMEENTRY,rbHideSituationRoom:PREF_USER_GE_RUBBERBAND_RBHIDESITUATIONROOM#PREF_MODULE_GE_RUBBERBAND_RBHIDESITUATIONROOM,rbShowDetailsButton:PREF_USER_GE_RUBBERBAND_RBSHOWDETAILSBUTTON#PREF_MODULE_GE_RUBBERBAND_RBSHOWDETAILSBUTTON,highlightColor:PREF_USER_GE_RUBBERBAND_HIGHLIGHTCOLOR#PREF_MODULE_GE_RUBBERBAND_HIGHLIGHTCOLOR,lineThickness:PREF_USER_GE_RUBBERBAND_LINETHICKNESS#PREF_MODULE_GE_RUBBERBAND_LINETHICKNESS";
   String  categoryName="Rubberband";
   String importType=String.valueOf(request.getParameter("importType"));
   String userId=String.valueOf(request.getParameter("userId"));
   String moduleId=String.valueOf(request.getParameter("moduleId"));
   
   if("-1".equals(userId)){
	   configNames += ",rbServerEventsListener:#PREF_MODULE_GE_RUBBERBAND_RBSERVEREVENTSLISTENER,rbCustomRubberbandRenderer:#PREF_MODULE_GE_RUBBERBAND_RBCUSTOMRUBBERBANDRENDERER";
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

 	<div id="colorpicker" onmousedown="HSVslide('drag','colorpicker',event)" style=" TOP:20px; LEFT:230px; Z-INDEX:20;">
 		<div id="plugHEX" onmousedown="stop=0; setTimeout('stop=1',100);"></div>
        <div id="plugCLOSE" onmousedown="close_colorPicker()" style="font-family:Verdana, Geneva, sans-serif"><b>X</b></div>
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
   
    <!-- independent preferences -->
	<table cellspacing="0" style="margin-left:10px;">
      <tr><td>&nbsp;</td></tr> 
    </table>
	<table cellspacing="5" style="margin-left:10px;"> 
       
       
        <tr>
            <td align="right" ><strong><bean:message key="preferences.line.thickness" bundle="admin"/></strong>:</td>
            <td align="left" title='<bean:message key="preferences.ge.rubberband.linethickness.tooltip" bundle="admin"/>'><input size="3" type="text" name="lineThickness" dojoType="dijit.form.NumberSpinner" required='false'
 constraints="{min:0,max:999,places:0}" style="width:70px;" value='<%=ESAPI.encoder().encodeForHTML("".equals((String)pageContext.getAttribute("lineThickness")) || pageContext.getAttribute("lineThickness") == null?"3":(String)pageContext.getAttribute("lineThickness"))%>'
  <%=(pageContext.getAttribute("lineThickness_update")!=null)?"disabled=\"disabled\"":"" %> >&nbsp;<b><bean:message key="preferences.pixel.label" bundle="admin" /></b></td> 
        </tr>  
        
	    <tr>
			<td align="right" >&nbsp;</td>
        
            <td align="left" title='<bean:message key="preferences.ge.rubberband.rbHidenameentry.tooltip" bundle="admin"/>'><input type="checkbox" name="rbHideNameEntry" <%= "on".equals(pageContext.getAttribute("rbHideNameEntry"))?"checked":""%>
 <%=(pageContext.getAttribute("rbHideNameEntry_update")!=null)?"disabled=\"disabled\"":"" %> />
 <strong><bean:message key="preferences.hide.name.entry" bundle="admin"/></strong>
 </td> 
        </tr>
        <tr>
			<td align="right" >&nbsp;</td>
			
			<td align="left" title='<bean:message key="preferences.ge.rubberband.rbHidesituationroom.tooltip" bundle="admin"/>'><input type="checkbox" name="rbHideSituationRoom" <%= "on".equals(pageContext.getAttribute("rbHideSituationRoom"))?"checked":""%> 
			 <%=(pageContext.getAttribute("rbHideSituationRoom_update")!=null)?"disabled=\"disabled\"":"" %> />
             <strong><bean:message key="preferences.hide.situation.room" bundle="admin"/></strong>
             </td> 
        </tr>
        <tr>
			<td align="right" >&nbsp;</td>
        
            <td align="left" title='<bean:message key="preferences.ge.rubberband.rbshowdetailsbutton.tooltip" bundle="admin"/>'><input type="checkbox" name="rbShowDetailsButton" <%= "on".equals(pageContext.getAttribute("rbShowDetailsButton"))?"checked":""%> 
			 <%=(pageContext.getAttribute("rbShowDetailsButton_update")!=null)?"disabled=\"disabled\"":"" %> />
             <strong><bean:message key="preferences.show.details.button" bundle="admin"/></strong>
             </td> 
        </tr>
		<!-- only visible at module level -->
		<logic:equal name="userId" value='-1'>
        <script>
      		colorPickerTopPosition = 58;
	  		colorPickerLeftPosition = 200;
      	</script>
		<tr>
			<td align="right" ><strong><bean:message key="preferences.server.events.listener" bundle="admin"/></strong>:</td>
        
            <td align="left" title='<bean:message key="preferences.ge.rubberband.rbservereventslistener.tooltip" bundle="admin"/>'><input type="text" name="rbServerEventsListener" style="width:250px" value='<%= pageContext.getAttribute("rbServerEventsListener")%>' 
			 <%=(pageContext.getAttribute("rbServerEventsListener_update")!=null)?"disabled=\"disabled\"":"" %> /></td> 
        </tr>
		<tr>
			<td align="right" ><strong><bean:message key="preferences.custom.rubberband.renderer" bundle="admin"/></strong>:</td>
        
            <td align="left" title='<bean:message key="preferences.ge.rubberband.rbcustomrubberbandrenderer.tooltip" bundle="admin"/>'><input type="text" name="rbCustomRubberbandRenderer" style="width:250px" value='<%= "".equals(pageContext.getAttribute("rbCustomRubberbandRenderer")) || pageContext.getAttribute("rbCustomRubberbandRenderer") == null?"com.spacetimeinsight.stas.rubberband.services.RBServiceImpl":pageContext.getAttribute("rbCustomRubberbandRenderer")%>' 
			 <%=(pageContext.getAttribute("rbCustomRubberbandRenderer_update")!=null)?"disabled=\"disabled\"":"" %> /></td> 
        </tr>
		</logic:equal>
        <tr>
			<td align="right" ><strong><bean:message key="preferences.apply.region.default" bundle="admin"/></strong>:</td>
				<td align="left" title='<bean:message key="preferences.ge.rubberband.applyregiondefault.tooltip" bundle="admin"/>'> <select id = "apply_Region_Default" name="applyRegionDefault" dojoType="dijit.form.FilteringSelect" invalidMessage="<bean:message key="admin.invalid.error" bundle="admin" />"  autocomplete="off" style="width:200px"  <%=(pageContext.getAttribute("applyRegionDefault_update")!=null)?"disabled=\"disabled\"":"" %> >
			<option value="None" <logic:equal name="applyRegionDefault" value='None'> selected </logic:equal> ><bean:message key="preferences.none" bundle="admin"/></option>
			 <option value="IntersectionAll" <logic:equal name="applyRegionDefault" value='IntersectionAll'> selected </logic:equal> ><bean:message key="preferences.intersection.all" bundle="admin"/></option>
			 <option value="IntersectionAny"<logic:equal name="applyRegionDefault" value='IntersectionAny'> selected </logic:equal> ><bean:message key="preferences.intersection.any" bundle="admin"/></option>
			 <option value="Union" <logic:equal name="applyRegionDefault" value='Union'> selected </logic:equal> ><bean:message key="preferences.union" bundle="admin"/></option>
			 <option value="UnionComplement" <logic:equal name="applyRegionDefault" value='UnionComplement'> selected </logic:equal> ><bean:message key="preferences.union.complement" bundle="admin"/></option>
			 
		 </select></td> 
		</tr> 
    </table>
    
    <!-- Color Group Preferences -->    
    <fieldset class="fieldsetpref">
        <legend class="fieldsetlegend"><strong><bean:message key="preferences.colors" bundle="admin"/></strong></legend>
            <table cellspacing="5" >
                <tr>
                    <td align="right" width="93"><strong><bean:message key="preferences.fill" bundle="admin"/></strong>:</td>
                    <td width="40" title='<bean:message key="preferences.ge.rubberband.fillcolor.tooltip" bundle="admin"/>'><input id="fillcolorname" size="10" type="text" name="fillColor" 
					value='<%=ESAPI.encoder().encodeForHTML("".equals((String)pageContext.getAttribute("fillColor")) || pageContext.getAttribute("fillColor") == null?"#00FF00":(String)pageContext.getAttribute("fillColor"))%>' <%=(pageContext.getAttribute("fillColor_update")!=null)?"disabled=\"disabled\"":"" %> dojoType="dijit.form.ValidationTextBox" style="width:100px" ></td>
                    <td width="20"><div id="fillcolorbox" style="width:16px; padding-top:1px; height:15px; border: 1px solid gray; background-color: <%=ESAPI.encoder().encodeForHTML("".equals((String)pageContext.getAttribute("fillColor")) || pageContext.getAttribute("fillColor") == null?"#00FF00":(String)pageContext.getAttribute("fillColor"))%>" onclick="javascript:setid(id,colorPickerTopPosition ,colorPickerLeftPosition)" <%=(pageContext.getAttribute("fillColor_update")!=null)?"disabled=\"disabled\"":"" %> >	</div></td>
                    <td width="20">&nbsp;</td>
                    <td align="right" width="60"><strong><bean:message key="preferences.highlight" bundle="admin"/></strong>:</td>
                    <td title='<bean:message key="preferences.ge.rubberband.highlightcolor.tooltip" bundle="admin"/>'><input id="highlightcolorname" size="10" type="text" name="highlightColor" 
					value='<%=ESAPI.encoder().encodeForHTML("".equals((String)pageContext.getAttribute("highlightColor")) || pageContext.getAttribute("highlightColor") == null?"#00FF00":(String)pageContext.getAttribute("highlightColor"))%>'
					 <%=(pageContext.getAttribute("highlightColor_update")!=null)?"disabled=\"disabled\"":"" %> dojoType="dijit.form.ValidationTextBox" style="width:100px" ></td>
                	<td width="20"><div id="highlightcolorbox" style="width:16px; padding-top:1px; height:15px; border: 1px solid gray; background-color: <%=ESAPI.encoder().encodeForHTML("".equals((String)pageContext.getAttribute("highlightColor")) || pageContext.getAttribute("highlightColor") == null?"#00FF00":(String)pageContext.getAttribute("highlightColor"))%>" onclick="javascript:setid(id, colorPickerTopPosition, colorPickerLeftPosition+90)" <%=(pageContext.getAttribute("highlightColor_update")!=null)?"disabled=\"disabled\"":"" %>>	</div></td>
                </tr>
           </table>             
    </fieldset>
 
	<script type="text/javascript">
	
	function close_colorPicker(){
		toggle('colorpicker');
	}
		var ob;
		var tempcol;
	     function setid(id, top_pos, left_pos)
		 {
			ob = id;
			if(ob == "fillcolorbox") {
				tempcol = document.getElementById("fillcolorname").value;
				tempcol = tempcol.replace('#','');
        		 updateH(tempcol); }
			if(ob == "highlightcolorbox") {
				tempcol = document.getElementById("highlightcolorname").value;
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
		if(ob == "highlightcolorbox")
		document.getElementById("highlightcolorname").value = '#'+v;
        }
		
       
		toggle('colorpicker');
        
        </script>
		<script>
	   var enableApplyBtn='<%=ESAPI.encoder().encodeForHTML(pageContext.getAttribute("enableApplyButton").toString())%>';
	</script>