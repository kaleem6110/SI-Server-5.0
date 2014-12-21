<%@ taglib uri="/tags/struts-bean" prefix="bean" %>
<%@ taglib uri="/tags/struts-logic" prefix="logic" %>
<%@ taglib uri="/tags/struts-html" prefix="html" %>
<%@ taglib uri="/tags/struts-nested" prefix="nested" %>
<%@ page import="com.enterprisehorizons.magma.config.beans.SecurityRoleBean" %>
<%@ page import="com.enterprisehorizons.magma.ecoweb.constants.IWebSessionContants"%>
<%@ page import="java.util.Vector"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.Iterator"%>
<%@ include file="/common/dojo.jsp" %> 

<%@page import="com.enterprisehorizons.magma.config.forms.EcoSecurityRoleMapForm"%>
<%@page import="java.util.List"%>
<%@page import="com.enterprisehorizons.magma.config.beans.ModuleBean"%>
<html:html locale="true">
<head>
	
<SCRIPT LANGUAGE="JavaScript">
    function hasOptions(obj) {
        if (obj!=null && obj.options!=null) { return true; }
        return false;
    }
    
    function sortSelect(obj) {
        var o = new Array();
        if (!hasOptions(obj)) { return; }
    
        for (var i=0; i<obj.options.length; i++) {
            o[o.length] = new Option( obj.options[i].text, obj.options[i].value, obj.options[i].defaultSelected, obj.options[i].selected) ;
        }
    
        if (o.length==0) { return; }

        o = o.sort( 
        function(a,b) { 
            if ((a.text+"") < (b.text+"")) { return -1; }
            if ((a.text+"") > (b.text+"")) { return 1; }
            return 0;
            } 
        );

        for (var i=0; i<o.length; i++) {
            obj.options[i] = new Option(o[i].text, o[i].value, o[i].defaultSelected, o[i].selected);
        }
    }


    function selectAllOptions(obj) {
        if (!hasOptions(obj)) { return; }
        
        for (var i=0; i<obj.options.length; i++) {
            obj.options[i].selected = true;
        }
    }
    
	function getDropDownSelected(eName) {
	   var value=dijit.byId(eName).value
	   return value;
	   /*
	   var elem=document.getElementById(eName);
	   var selectedIndex=elem.selectedIndex;
	   alert(elem);
       var value=elem.options[selectedIndex].value;
	   alert(value);
	   */
	   
	   /*
	   if(eName=="selectedRole") {
	      return document.forms[0].selectedRole.value;
	   }
	   if(eName=="mapModule") {
	      return document.forms[0].mapModule.value;
	   }
	   */
	   // var selectedIndex=document.getElementsByName(eName)[0].selectedIndex;
	   // var value=document.getElementsByName(eName)[0].options[selectedIndex].value;	   
	   // return value;
	}
	
    function getDomainIdValue() {
	   return document.getElementById("mapDomain").value;
	}
    
    function getEcoDisplayNameListObject() {
      return document.getElementsByName("ecoDisplayNames")[0];
    }

    function getEcoParametersListObject() {
      return document.getElementsByName("ecoParameters")[0];
    }
    
    function getEcoCategoryListObject() {
      return document.getElementsByName("ecoCategories")[0];
    }
    
	function getSelectedListObject() {
      return document.getElementsByName("updatedSelectedEcoModels")[0];
    }
	
    function getSelectedFlagListObject() {
      return document.getElementsByName("ecoSelectFlag")[0];;
    }
    
    function getServerUrlListObject() {
      return document.getElementsByName("serverUrls")[0];;
    }
    
    function addBlankElement(listBox) {  
         listBox.options[listBox.options.length] = new Option( "","",false, false);           
    }
    
    function addSelectedFlagBlankElement(listBox) {  
         listBox.options[listBox.options.length] = new Option( "false","false",false, false);           
    }
        
    function deleteElement(listBox,index) {
        listBox.remove(index);
    }
    
    function selectSimilar() {
    
      var selectedList=getSelectedListObject();
      var displayNameList=getEcoDisplayNameListObject();
      var parameterList=getEcoParametersListObject();
      var categoryList=getEcoCategoryListObject();
      var selectedFlagList=getSelectedFlagListObject();   
      var serverUrlList=getServerUrlListObject();
               
      for (var index=0; index<selectedList.options.length; index++) {
         var o = selectedList.options[index];
            if (o.selected) {
                displayNameList.options[index].selected=true;
                parameterList.options[index].selected=true;
                categoryList.options[index].selected=true;
                selectedFlagList.options[index].selected=true;
                serverUrlList.options[index].selected=true;
            }  
        }    
    }
    
    function clearAttachedInfo() {
       document.getElementById("displayNameText").value="";
       document.getElementById("ecoParameterText").value="";
	   document.getElementById("ecoCategoryTextInput").value="";
	   document.getElementById("ecoCategoryId").value="";
	   document.getElementById("serverUrlInput").value="";
    }
            
    function moveSelectedOptions(from,to) {
        // Unselect matching options, if required
        
        clearAttachedInfo();
                
        if (arguments.length>3) {
            var regex = arguments[3];
            if (regex != "") {
                unSelectMatchingOptions(from,regex);
            }
        }

        // Move them over
        if (!hasOptions(from)) { return; }

        for (var i=0; i<from.options.length; i++) {
            var o = from.options[i];
            if (o.selected) {
              
                if (!hasOptions(to)) 
                    { 
                       var index = 0; 
                    } 
                    else 
                    { 
                       var index=to.options.length; 
                    }
                // Adding blank name  
                if(from.name=="updatedAvailableEcoModels") {
				       to.options[index] = new Option( o.text, o.value, false, false); 
                       addBlankElement(getEcoDisplayNameListObject());
                       addBlankElement(getEcoParametersListObject());
                       addBlankElement(getEcoCategoryListObject());
                       addBlankElement(getServerUrlListObject());
                       addSelectedFlagBlankElement(getSelectedFlagListObject());
                }
            }
        }
                
        var displayNameList=getEcoDisplayNameListObject();
        var parameterList=getEcoParametersListObject();
        var categoryList=getEcoCategoryListObject();
        var selectedFlagList=getSelectedFlagListObject();
        var serverUrlList=getServerUrlListObject();
              
      if(from.name=="updatedSelectedEcoModels") {
                                                
        selectSimilar();
                                    
        var index=0;
                
        while(index<=from.options.length-1) {
                        
            var o = from.options[index];
            if (o.selected) {
                from.options[index] = null;
            } else {
               index++;
               continue;
            }
                        
            var dispObject=displayNameList.options[index];
            if(dispObject.selected) {
               displayNameList.options[index]=null;
            }
            
            var parameterObject=parameterList.options[index];
            if(parameterObject.selected) {
               parameterList.options[index]=null;
            }
            
            var categoryObject=categoryList.options[index];
            if(categoryObject.selected) {
               categoryList.options[index]=null;
            }      
            
            var selectedObject=selectedFlagList.options[index];
            if(selectedObject.selected) {
               selectedFlagList.options[index]=null;
            }
                        
            var serverUrlObject=serverUrlList.options[index];
            if(serverUrlObject.selected) {
               serverUrlList.options[index]=null;
            }
                                         
         } // end of the for loop
        } // end of the if statement
                
        if ((arguments.length<3) || (arguments[2]==true)) {
            //sortSelect(from);
            //sortSelect(to);
        }
        
        from.selectedIndex = -1;
        to.selectedIndex = -1;
        
        getEcoDisplayNameListObject().selectedIndex=-1;
        getEcoParametersListObject().selectedIndex=-1;
        getEcoCategoryListObject().selectedIndex=-1;
        getSelectedFlagListObject().selectedIndex=-1;
        getServerUrlListObject().selectedIndex=-1;
		disableSaveBtn(false);
		cleanMessage();	
    }
	

    function setCategory(selectedID,selectedLabel)  {	    
	    document.getElementById("ecoCategoryTextInput").value=selectedLabel;
	    document.getElementById("ecoCategoryId").value=selectedID;
		hideManager();
	}
	
	function resetCategory() {
	    document.getElementById("ecoCategoryTextInput").value="";
	    document.getElementById("ecoCategoryId").value="";
		hideManager();
	}
	
	function hideManager() {
	   hideCategoryManager();
	   window.status='Done';
	}
	
	function showCategoryManagerDialogBox() {
	    var selectedList=getSelectedListObject();
            var listIndex=selectedList.selectedIndex;
			document.getElementById("ecoCategoryTextInput").focus();
			if(listIndex<0) {			
			   showEmptyDialog('<bean:message key="group.alert.ecosystem.notselected" bundle="GroupMapping"/>','<bean:message key="group.alert.header" bundle="GroupMapping"/>');
			   return;
			}
	   
	   showCategoryManagerDialog();
	}
	
    function moveAllOptions(from,to) {
        selectAllOptions(from);
        if (arguments.length==2) {
            moveSelectedOptions(from,to);
        }
        else if (arguments.length==3) {
            moveSelectedOptions(from,to,arguments[2]);
        }
        else if (arguments.length==4) {
            moveSelectedOptions(from,to,arguments[2],arguments[3]);
        }
    }

    function showAllValues(listBox){
        var selectedEcosystemValues='';
        for(i=0;i<listBox.options.length;i++){
            if((i+1) == listBox.options.length){
                selectedEcosystemValues += listBox.options[i].value;
            }else{
                selectedEcosystemValues += listBox.options[i].value+',';
            }

        }
      
    }
    
    
  //-->
  </SCRIPT>
 
 
  <script>
        
        function moveAdditionalValuesUp(listIndex) {
           var displayList=getEcoDisplayNameListObject();
           var paramList=getEcoParametersListObject();
           var categoryList=getEcoCategoryListObject();
           var selectedFlagList=getSelectedFlagListObject();
           var serverUrlList=getServerUrlListObject();
           
           swapOption(displayList.options[listIndex],displayList.options[listIndex-1]);
           swapOption(paramList.options[listIndex],paramList.options[listIndex-1]);
           swapOption(categoryList.options[listIndex],categoryList.options[listIndex-1]);  
           swapOption(selectedFlagList.options[listIndex],selectedFlagList.options[listIndex-1]);   
           swapOption(serverUrlList.options[listIndex],serverUrlList.options[listIndex-1]);            
        }
        
        function moveAdditionalValuesDown(listIndex) {
           var displayList=getEcoDisplayNameListObject();
           var paramList=getEcoParametersListObject();
           var categoryList=getEcoCategoryListObject();
           var selectedFlagList=getSelectedFlagListObject();
           var serverUrlList=getServerUrlListObject();
            
           swapOption(displayList.options[listIndex],displayList.options[listIndex+1]);
           swapOption(paramList.options[listIndex],paramList.options[listIndex+1]);
           swapOption(categoryList.options[listIndex],categoryList.options[listIndex+1]);       
           swapOption(selectedFlagList.options[listIndex],selectedFlagList.options[listIndex+1]);    
           swapOption(serverUrlList.options[listIndex],serverUrlList.options[listIndex+1]);         
        }
                                 
        function swapOption(source,target)
        {    
             var tempValue=null;
             var tempText=null;
             
             tempValue=source.value;
             tempText=source.text;
             
            // alert("source :"+ tempValue+" "+tempText);
                          
             source.value=target.value;
             source.text=target.text;
                          
             //alert("target :"+ source.value+" "+source.text);
             
             target.value=tempValue;
             target.text=tempText;
             
            /* 
               var temp;             
               temp=source;
               source=target;
               target=temp;
            */             
        }
        
        function moveUp() {
            var selectedList=getSelectedListObject();
            var listIndex=selectedList.selectedIndex;
			if(listIndex<0) {			
			   showEmptyDialog('<bean:message key="group.alert.ecosystem.notselected" bundle="GroupMapping"/>','<bean:message key="group.alert.header" bundle="GroupMapping"/>');
			   return;
			}
            if(selectedList.options.length>0 && listIndex>0) {
               swapOption(selectedList.options[listIndex],selectedList.options[listIndex-1]);
               selectedList.options[listIndex].selected=false;
               selectedList.options[listIndex-1].selected=true;  
               moveAdditionalValuesUp(listIndex);   
               disableSaveBtn(false); 	
               cleanMessage();			   
            }                      
        }
                        
        function moveDown() {
            var selectedList=getSelectedListObject();
            var listIndex=selectedList.selectedIndex;
			
			if(listIndex<0) {
			   showEmptyDialog('<bean:message key="group.alert.ecosystem.notselected" bundle="GroupMapping"/>','<bean:message key="group.alert.header" bundle="GroupMapping"/>');
			   return;
			}
			
            if(selectedList.options.length>0 && (listIndex>=0 && listIndex<selectedList.options.length-1)) {
               swapOption(selectedList.options[listIndex],selectedList.options[listIndex+1]);     
               selectedList.options[listIndex].selected=false;
               selectedList.options[listIndex+1].selected=true;   
               moveAdditionalValuesDown(listIndex);    
               disableSaveBtn(false);	
                cleanMessage();	 			   
            }            
        }
       
                                       
     function showAttachedData() {                		
     var selectedIndex=document.getElementsByName("updatedSelectedEcoModels")[0].selectedIndex;
	 if(selectedIndex!=-1)
      {
      
	   document.getElementById("displayNameText").value=document.getElementsByName("ecoDisplayNames")[0].options[selectedIndex].value;
       document.getElementById("ecoParameterText").value=document.getElementsByName("ecoParameters")[0].options[selectedIndex].value;
	   document.getElementById("ecoCategoryTextInput").value=document.getElementsByName("ecoCategories")[0].options[selectedIndex].text;
	   document.getElementById("ecoCategoryId").value=document.getElementsByName("ecoCategories")[0].options[selectedIndex].value;
	   document.getElementById("serverUrlInput").value=document.getElementsByName("serverUrls")[0].options[selectedIndex].value;
	   
	   var sData=document.getElementsByName("ecoSelectFlag")[0].options[selectedIndex].value;
	   setSelectedFlagState(sData);
	 }  		 
    }
   
   function checkMultipleSelection() {
       var selectedList=getSelectedListObject();
       var count=0;
       for (var index=0; index<selectedList.options.length; index++) {
         var o = selectedList.options[index];
            if (o.selected) {
               count++;
               if(count>1) {
                  return true;
               }
            }  
        }
        return false;   
   }
         		
   function attachData() {
            var multipleSelect=checkMultipleSelection();
			document.getElementById("ecoCategoryTextInput").focus();
			
            if(multipleSelect==true) {
               showEmptyDialog('<bean:message key="dataattach.multiple.selection" bundle="GroupMapping"/>','<bean:message key="group.alert.header" bundle="GroupMapping"/>');
			   return;
            }
                         
		    var selectedIndex=document.getElementsByName("updatedSelectedEcoModels")[0].selectedIndex;
			if(selectedIndex==-1) {
			   showEmptyDialog('<bean:message key="group.alert.ecosystem.notselected" bundle="GroupMapping"/>','<bean:message key="group.alert.header" bundle="GroupMapping"/>');
			   return;
			}
            
             document.getElementsByName("ecoDisplayNames")[0].options[selectedIndex].value=document.getElementById("displayNameText").value;
             document.getElementsByName("ecoDisplayNames")[0].options[selectedIndex].text=document.getElementById("displayNameText").value;
             document.getElementsByName("ecoParameters")[0].options[selectedIndex].value=document.getElementById("ecoParameterText").value;                      
             document.getElementsByName("ecoParameters")[0].options[selectedIndex].text=document.getElementById("ecoParameterText").value;                        
             document.getElementsByName("ecoCategories")[0].options[selectedIndex].value=document.getElementById("ecoCategoryId").value;
             document.getElementsByName("ecoCategories")[0].options[selectedIndex].text=document.getElementById("ecoCategoryTextInput").value;
             
             document.getElementsByName("serverUrls")[0].options[selectedIndex].value=document.getElementById("serverUrlInput").value;
             document.getElementsByName("serverUrls")[0].options[selectedIndex].text=document.getElementById("serverUrlInput").value;
             
             document.getElementsByName("ecoSelectFlag")[0].options[selectedIndex].value=getSelectedFlagState();
             document.getElementsByName("ecoSelectFlag")[0].options[selectedIndex].text=getSelectedFlagState();
                          
             showEmptyDialog('Data attached successfully','Data attachment');
			 disableSaveBtn(false);
  		     cleanMessage();	 
        }
             
     function setSelectedFlagState(value) {
         if(value=='true') {
             document.getElementById("selectedInput").checked=true;
         } else {
             document.getElementById("selectedInput").checked=false;
         }  
     } 
     
     function getSelectedFlagState() {
        if(document.getElementById("selectedInput").checked==true) 
           return 'true';
        else  
           return 'false';            
     }
     
 </script>
 

<script>
    function showEcosystemDtls(obj){
        if(obj.value != ''){
            document.getElementById('ecosystemDtls').style.display='';
        }else{
            document.getElementById('ecosystemDtls').style.display='none';
        }
    }
    
    function loadModuleGroupMapping(){
        var roleId = document.ecoSecurityRoleMapForm.selectedRole.value;
        document.ecoSecurityRoleMapForm.mapModule.value="";
        if(roleId != ''){
            document.getElementById('operation').value='loadGroupModuleMapping';
            document.ecoSecurityRoleMapForm.submit();
        }                
    }
    
    function searchForRoleEcoModels(){
        var roleId = document.ecoSecurityRoleMapForm.selectedRole.value;
        var mapModuleId = document.forms[0].mapModule.value;
        var mapDomainId = document.forms[0].mapDomain.value;
        		
        if(roleId != '' && mapModuleId != ''){
            document.getElementById('operation').value='searchForRoleEcoModels';
            document.ecoSecurityRoleMapForm.submit();
        }else{
            document.getElementById('ecosystemDtls').style.display='none';
			document.getElementById('saveBtn').style.display='none';
            //alert("Please select a Role");    
        }
        
    }
            
    function submitChanges(listBox){

        var selectedEcosystemValues='';
        for(i=0;i<listBox.options.length;i++){
            if((i+1) == listBox.options.length){
                selectedEcosystemValues += listBox.options[i].value;
            }else{
                selectedEcosystemValues += listBox.options[i].value+',';
            }
        }
        
        selectAllOptions(document.getElementsByName("ecoDisplayNames")[0]);
        selectAllOptions(document.getElementsByName("ecoParameters")[0]);
        selectAllOptions(document.getElementsByName("ecoCategories")[0]);
        selectAllOptions(document.getElementsByName("ecoSelectFlag")[0]);
        selectAllOptions(document.getElementsByName("serverUrls")[0]);
                                
        document.ecoSecurityRoleMapForm.finalSelectedModels.value = selectedEcosystemValues; 
        //if(selectedEcosystemValues.length > 0){
            document.getElementById('operation').value='submitChanges';
            document.ecoSecurityRoleMapForm.submit();
        //}     
        getEcoDisplayNameListObject().selectedIndex=-1;
        getEcoParametersListObject().selectedIndex=-1;
    }
    
    function backToAdminHome(){
            document.getElementById('operation').value='backToAdminHome';
            document.ecoSecurityRoleMapForm.submit();
    }
	
    
</script>
</head>

<body class="tundra bodybg">

<table width="100%" > 
<tr>
  <td class="pageTitle paddingTitle">
   <table>    
    <tr>
          <td height="60px" align="left" valign="top"  class="redtitle"><strong class="pageTitle paddingTitle"><bean:message  key="header.main" bundle="GroupMapping" /></strong><br/>
           
	      </td>
 	     <td width="67px">&nbsp;</td>
    </tr>	
	<tr>
	<td>	
    
<html:form action="/ecoSecurityRoleMapAction" enctype="form-data" method="POST">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">

<input type="hidden" name="mapDomain" id="mapDomain" value="<bean:write     name='<%=IWebSessionContants.SECURITY_USER_BEAN%>' property='domainId'/>" /> 

<table width="600" border="0">
<TR>
    <TD COLSPAN="3" align="left">
        <b><div id="updateStatus"></div></b>
    </TD>               
</TR>   
  
<tr>
<td nowrap align="right"><strong> <bean:message key="label.group" bundle="GroupMapping" /> : </strong></td>
<td align="left">

 <%
     EcoSecurityRoleMapForm roleForm=((EcoSecurityRoleMapForm)request.getAttribute("ecoSecurityRoleMapForm"));
     List userRoles=roleForm.getUserRoles();
     List mapModules=roleForm.getModules();
     
     String selectedRole=roleForm.getSelectedRole();    
     int selectedModule=0; 
       if(!"loadGroupModuleMapping".equals(request.getParameter("operation"))){
     	 selectedModule=roleForm.getMapModule();
         }else{
                selectedModule=0;
           }

	 
	 
 %>

 <select id = "selectedRole" name="selectedRole" dojoType="dijit.form.FilteringSelect" autocomplete="off"  onchange="populateForm('role');loadModuleGroupMapping()" >
 <option value=""></option>
                                    <% if(userRoles != null)
                                    {
                                        for(int modIdx=0;modIdx<userRoles.size(); modIdx++)
                                        {
                                        	SecurityRoleBean roleBean = (SecurityRoleBean)userRoles.get(modIdx);
                                    %>
                                        <option value="<%=roleBean.getRoleId()%>" <%=(selectedRole!=null && selectedRole.equals(String.valueOf(roleBean.getRoleId())))?"selected":""%> ><%=roleBean.getRoleDesc()%></option>
                                    <% } 
                                       } 
                                    %>
                                    </select>
                                    
 
</td>
</tr>

<tr>
<td nowrap  align="right" ><strong> <bean:message key="label.module" bundle="GroupMapping" /> :  </strong></td>
<td align="left">

 
<select id = "mapModule" name="mapModule" dojoType="dijit.form.FilteringSelect"  autocomplete="off"  onchange="searchForRoleEcoModels();" >
 <option value=""></option>
                                    <% if(mapModules != null)
                                    {
                                        for(int modIdx=0;modIdx<mapModules.size(); modIdx++)
                                        {
                                        	ModuleBean moduleBean = (ModuleBean)mapModules.get(modIdx);
                                    %>
                                        <option value="<%=moduleBean.getModuleId()%>" <%=(selectedModule==moduleBean.getModuleId())?"selected":""%> ><%=moduleBean.getModuleName()%></option>
                                    <% } 
                                       } 
                                    %>
                 </select>
				 
</td>
</tr>
</table>


<html:hidden property="updateStatusDtls" />
<html:hidden property="successErrorStatus" />
<TABLE     id="ecosystemDtls"  >
<TR>
        <TD COLSPAN="5" align="center">&nbsp;
        
        </TD>               
</TR>

<TR>
    <TD> <b><bean:message key="header.available.list" bundle="GroupMapping" /> </b></TD>
    <TD>&nbsp; </TD>
    <TD > <b><bean:message key="header.selected.list" bundle="GroupMapping" /> </b></TD>
    <TD ALIGN='left'>&nbsp; </TD>
    <TD ALIGN='left'>&nbsp; </TD>
</TR>

            <TR>
                <TD>
<html:select property="updatedAvailableEcoModels" size='10' multiple= "true" style='width:250px;height:300px' ondblclick="moveSelectedOptions(this.form['updatedAvailableEcoModels'],this.form['updatedSelectedEcoModels'],true,'')">
<html:optionsCollection name="ecoSecurityRoleMapForm" property="availableEcoModels"  value="ecoExpmlFileName" label="ecoExpmlFileName"/>
</html:select>


                </TD>
                <TD VALIGN=MIDDLE ALIGN='CENTER'>
                <table>
                <tr>
                    <td>
					<img src="<%=ServerUtils.getContextName(request)%>/images/portal/btn_move_right_all.png"   ONCLICK="moveAllOptions(document.forms[0].updatedAvailableEcoModels,document.forms[0].updatedSelectedEcoModels,true,'')" />
                    </td>
                </tr>
                <tr>
                    <td>&nbsp;
                        
                    </td>
                </tr>
                <tr>
                    <td>
                       <img src="<%=ServerUtils.getContextName(request)%>/images/portal/btn_move_right_one.png" ONCLICK="moveSelectedOptions(document.forms[0].updatedAvailableEcoModels,document.forms[0].updatedSelectedEcoModels,true,'')"   /> 
                        </td>
                </tr>
                <tr>
                    <td>&nbsp;
                        
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src="<%=ServerUtils.getContextName(request)%>/images/portal/btn_move_left_one.png" ONCLICK="moveSelectedOptions(document.forms[0].updatedSelectedEcoModels,document.forms[0].updatedAvailableEcoModels,true,'')"  value=" < "  /> 
                    </td>
                </tr>
                <tr>
                    <td>&nbsp;
                        
                    </td>
                </tr>
                <tr>
                    <td>        
                       <img src="<%=ServerUtils.getContextName(request)%>/images/portal/btn_move_left_all.png" ONCLICK="moveAllOptions(document.forms[0].updatedSelectedEcoModels,document.forms[0].updatedAvailableEcoModels,true,'')"   /> 
                    </td>
                </tr>
                </table>
                </TD>
                <TD ALIGN="right">
<table valign='top'>
<tr> <td valign='top' align='left'>                                
<html:select property="updatedSelectedEcoModels"  size='5' multiple= "true"  style='width:250px;height:300px;' ondblclick="moveSelectedOptions(this.form['updatedSelectedEcoModels'],this.form['updatedAvailableEcoModels'],true,'')" onchange="showAttachedData()">
<html:optionsCollection name="ecoSecurityRoleMapForm" property="selectedEcoModels"  value="ecoModelName" label="ecoModelName"/>
</html:select>
</td>
<td valign='top'  align='left'>
</td> </tr>
</table>

<html:select  property="ecoDisplayNames" size='5' multiple= "true" style='display:none'>
  <html:optionsCollection name="ecoSecurityRoleMapForm" property="selectedEcoModels"  value="displayName" label="displayName"/>
</html:select>

<html:select property="ecoParameters" size='5' multiple= "true" style='display:none'>
  <html:optionsCollection name="ecoSecurityRoleMapForm" property="selectedEcoModels"  value="parameterDetail" label="parameterDetail"/>
</html:select>

<html:select property="ecoCategories" size='5' multiple= "true" style='display:none'>
  <html:optionsCollection name="ecoSecurityRoleMapForm" property="selectedEcoModels"  value="ecoCategory" label="ecoCategoryName"/>
</html:select>

 <html:select property="ecoSelectFlag" size='5' multiple= "true" style='display:none'>
  <html:optionsCollection name="ecoSecurityRoleMapForm" property="selectedEcoModels"  value="selected" label="selected"/>
</html:select>
 
 <html:select property="serverUrls" size='5' multiple= "true" style='display:none'>
  <html:optionsCollection name="ecoSecurityRoleMapForm" property="selectedEcoModels"  value="serverUrl" label="serverUrl"/>
 </html:select>

 </td>
   <TD COLSPAN='2'  valign='top'  align='left'> 
   <img border="2" src="<%=ServerUtils.getContextName(request)%>/images/portal/move_up.png" style="width:20px"  onclick="moveUp()" /> <br>
   <img border="2" src="<%=ServerUtils.getContextName(request)%>/images/portal/move_down.png" style="width:20px" onClick="moveDown()" />
</TD>
      
 <td valign="top" align="left">
 <table   style='height:250px;' width='100%' >
 <tr><td align="left"><b><bean:message key="label.displayname" bundle="GroupMapping"/></b> </td></tr>
 <tr><td> <input type="text" id="displayNameText" autocomplete="off" style="width:'100px'"     > </td></tr>
 <tr><td align="left"><b><input type="checkbox" id="selectedInput"   autocomplete="off"  >Selected </b> </td></tr>
 <tr><td align="left"><b><bean:message key="label.parametertext" bundle="GroupMapping" /></b></td></tr>
 <tr><td> <textarea cols="30" rows="5" id="ecoParameterText" > </textarea></td></tr>
 <tr><td align="left"><b><bean:message key="label.category" bundle="GroupMapping"/></b><br></td></tr>
 <tr><td> 
   <table >
   <tr>
   <td> <input type="text" id="ecoCategoryTextInput" autocomplete="off" style="width:100px" readonly   > 
   <input type="hidden" id="ecoCategoryId"    /></td> 
   <td> 
     <button dojoType="dijit.form.Button"  type="button" style='width:100px;'  onclick="showCategoryManagerDialogBox()" >Select</button>
   </td>
   </tr>
   <tr>
   <td colspan="2"><b><bean:message key="label.serverurl" bundle="GroupMapping"/></b><br><textarea cols="30" rows="3" id="serverUrlInput" > </textarea></td>
   </tr>
   <tr>
 <td>&nbsp;</td>
 <td align="center">      
     <button dojoType="dijit.form.Button"    style='width:100px;' onClick="attachData()"><bean:message key="button.attachdata" bundle="GroupMapping"/></button>
  </td></tr>
    
 </table>  
 </td>  
 </tr>
  </table>
  </TD>
            </TR>
            
            
            
			 
                    
        </TABLE>         
<input type='hidden' name='hdnActionMode'>
<input type='hidden' name='hdnEcoSectionNode'>
<input type='hidden' name='hdnEcoSectionNodeValue'>
<input type="hidden" name="operation" id="operation" value="" />
 <html:hidden property="finalSelectedModels" value="S"/>

</html:form>
   </td>
   </tr>
   </table>
    
 </td>
 </tr>
 
 <tr class="barColor">            
  <td align="right" width="1000px">
         <button dojoType="dijit.form.Button" type="button" onClick="window.location ='<%=ServerUtils.getContextName(request)%>/adminMain.do'"> <bean:message key="dbconfig.home" /> </button>
     <span id="saveBtn">	 
       <button id="submitBtn" name="submitBtn" type="button" dojoType="dijit.form.Button" ONCLICK="submitChanges(document.forms[0].updatedSelectedEcoModels)"><bean:message key="button.save" bundle="GroupMapping"/> </button>	   
	 </span>
	   
	   <button  type="button" dojoType="dijit.form.Button" ONCLICK="window.location='<%=ServerUtils.getContextName(request)%>/dbaAdminSecurity.do'"><bean:message key="button.back" bundle="GroupMapping"/></button>   
                    </TD>       
 <TD  align="RIGHT" > </td>					
            </tr>
 
</table>
</center>
</body>


<script>

    if(document.ecoSecurityRoleMapForm.selectedRole.value < 0){
        document.getElementById('ecosystemDtls').style.display='none';
    }
        
    function populateForm(type){
        
        if(type == 'role'){
            if(document.forms[0].selectedRole.value == ""){
                document.getElementById('ecosystemDtls').style.display='none';
				document.getElementById('saveBtn').style.display='none';
                document.forms[0].mapModule.value = '';
                dijit.byId('mapModule').setAttribute('disabled', true);
                //document.forms[0].mapModule.disabled = true;                 
            }
            if(document.forms[0].selectedRole.value != ""){
                //document.getElementById('ecosystemDtls').style.display='none';
                document.forms[0].mapModule.disabled = false;
            }
            if(document.forms[0].selectedRole.value != "" && document.forms[0].mapModule.value != "" ){
                document.getElementById('ecosystemDtls').style.display='';
                document.forms[0].mapModule.disabled = false;
            }
			
			if(document.forms[0].mapModule.value == "") {
			   document.getElementById('ecosystemDtls').style.display='none';
			   document.getElementById('saveBtn').style.display='none';
			}

        }
		
		/*
		else if(type == 'module'){
            if(document.forms[0].mapDomain.value == ""){
                document.getElementById('ecosystemDtls').style.display='none';
				document.getElementById('saveBtn').style.display='none';
                document.forms[0].mapModule.value = '';
                document.forms[0].mapModule.disabled = true;
            }
            if(document.forms[0].mapDomain.value != ""){
                document.getElementById('ecosystemDtls').style.display='none';
				document.getElementById('saveBtn').style.display='none';
                document.forms[0].mapModule.disabled = false;
            }
            if(document.forms[0].selectedRole.value != "" && document.forms[0].mapModule.value != ""){
                document.getElementById('ecosystemDtls').style.display='';
				document.getElementById('saveBtn').style.display='';
                document.forms[0].mapModule.disabled = false;
            }
        } */
		
    } // end of the populate function	
// page load code
	
try{
    if(document.forms[0].successErrorStatus.value == 'true'){
        document.getElementById('updateStatus').innerHTML = '<font color="blue"><b>' + document.forms[0].updateStatusDtls.value + '</b></font>';
    }else if(document.forms[0].successErrorStatus.value == 'false'){
        document.getElementById('updateStatus').innerHTML = '<font color="red"><b>' + document.forms[0].updateStatusDtls.value + '</b></font>';
    }else{
        document.getElementById('updateStatus').innerHTML = '';
    }
    
}catch(er){}

// page load code ends here
  
 function loadData() {
	 if(document.getElementsByName("updatedSelectedEcoModels")[0].length>0) {
	     document.getElementsByName("updatedSelectedEcoModels")[0].selectedIndex=0;
		 showAttachedData();
		  // Added to avoid IE bug - infinite loading
		 window.status="Done";
	 }
 }
 
  function disableSaveBtn(flag) {
	dijit.byId('submitBtn').setAttribute('disabled', flag);
  }
 
  function cleanMessage() {
     document.getElementById('updateStatus').innerHTML = "&nbsp;"; 
  }
 
    function init() {
	   disableSaveBtn(true);
       loadData();  	
       populateForm('role');
        try{
   			parent.setIFrameProperties(false);
	   	}catch(err){
	   		//ERROR. when included the application under IFrame
	   	}
    }
	
	dojo.addOnLoad(init);

    window.status="Done";	
	
</script>


</html:html>