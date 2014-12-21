<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils,com.spacetimeinsight.security.bean.JAASConstants"%>
<%@page import="com.spacetimeinsight.security.bean.JAASAuthenticationTypeInitializer"%>
<%@page import="com.spacetimeinsight.preferences.PreferenceHelper"%>
<%@page import="com.spacetimeinsight.security.bean.UserBean"%> 

<% 

 String defaultModule=PreferenceHelper.getDefaultModule((UserBean) request.getSession().getAttribute(ServerUtils.USER_BEAN_NAME));
%> 
<script>
 var moduleIds=[];
 jQuery( document ).ready(function() {
	
	// alert('hi');
	//jQuery("#moduleList").kendoDropDownList();
 	jQuery('#moduleList').change(function(){
 		
		var selectedOption =jQuery("#moduleList option:selected");
	//	 alert('rrrr ' +selectedOption.val());
		var arr = selectedOption.val().split('|');
		
		loadToIFrameUrl(arr[0], arr[1], 'true');
 	});
 });

</script>
<% try { %>

	<logic:present name="stiUser" >
		<div class="left">
		
		
						
					<table>
						<tr>
							<td><label class="label_style" text="grey">Module</label></td>
							<td style="padding-left:5px">  
								<select id="moduleList">
									
										<logic:iterate id="stiModulesList" name="stiUser"  property="modules" >
										
									 <script>
									    moduleIds.push("<bean:write name="stiModulesList" property="id" />")
									 </script>
											<option value='<bean:write name="stiModulesList" property="url" />|<bean:write name="stiModulesList" property="id" />'><bean:write name="stiModulesList" property="name" filter="false"/></option>
										</logic:iterate>
										
								</select>
								 <logic:iterate id="stiModulesList" name="stiUser"  property="modules" >
									 <logic:equal name="stiModulesList" property="id" value="<%=defaultModule%>"> 
				  	 					<input type="hidden" id="menu2Load" name="menu2Load" value="<bean:write name="stiModulesList" property="url"  />" />
		       						 </logic:equal> 
		        			</logic:iterate> 
							</td>
						</tr>	
					</table>
			
				</div>
				
<%-- 		 <logic:match name="stiModulesList" property="mobileSpecific" value="false">
		 <logic:notEmpty name="stiModulesList" property="url">
			<logic:match name="stiModulesList" property="url" value="myaction">
				 <logic:equal name="rasEnabled" value="true">
						<li id='<bean:write name="stiModulesList" property="id" />' >
							<span id="<bean:write name="stiModulesList" property="name" />" onmouseover="changeStyle('<bean:write name="stiModulesList" property="id" />')" onmouseout="resetStyle('<bean:write name="stiModulesList" property="id" />')"  onclick="return loadToIFrameUrl('<bean:write name="stiModulesList" property="url"  />', '<bean:write name="stiModulesList" property="id" />', 'true')" >
								<bean:write name="stiModulesList" property="name" filter="false"/>
							</span>
						</li>
				 </logic:equal>
			</logic:match>
			<logic:notMatch name="stiModulesList" property="url" value="myaction">
                   <li id='<bean:write name="stiModulesList" property="id" />' >
                                <span id="<bean:write name="stiModulesList" property="name" />"  onmouseover="changeStyle('<bean:write name="stiModulesList" property="id" />')" onmouseout="resetStyle('<bean:write name="stiModulesList" property="id" />')" onclick="return loadToIFrameUrl('<bean:write name="stiModulesList" property="url"  />', '<bean:write name="stiModulesList" property="id" />', 'true')" >
                                    <bean:write name="stiModulesList" property="name" filter="false"/>
                                </span>
                    </li>
            </logic:notMatch>
		</logic:notEmpty>
			    <logic:equal name="stiModulesList" property="id" value="<%=defaultModule%>"> 
				   <input type="hidden" id="menu2Load" name="menu2Load" value="<bean:write name="stiModulesList" property="url"  />" />
		        </logic:equal> 
			</logic:match>
		</logic:iterate>	
			
		  
	</ul>
	</div>		 --%>
	</logic:present>	
			

<%  }catch(Exception e) { %>
	<div class="mattblacktabs">
	<ul>
		<!--<li id="pwd">
				<a href="#" onclick="return loadToIFrameUrl('<%=ServerUtils.getContextName(request)%>/security/changePassword.jsp', 'pwd')" >
					Change Password
				</a>
		</li>-->
		
	</ul>
	</div>

<%}%>
<script>
var isLogoutClicked = false;
var selectedMenuId = 0;
var selectLayerIds = "";
var currentSelectedModule=""; // added to know in which module user is in now
var currentModuleURL = "";
var situationModuleId="";   //added to know the layer/window is related to a module in situation room is selected
var selectedRBRegion = "";
var selectedRBRegionModule = "";
	function resetLogout(){
		isLogoutClicked = true;
		
		if(currentModuleURL.indexOf("confirmBeforeLeave=true") > 0 ) {					
			var message = confirm('<bean:message key='admin.menu.confirm.msg' bundle='admin' />');				
			if (message){ 				
				return false;					
			}
		} 		
		invalidateSession();
	}
	
var validProtocals=["file:///","ftp://","http://","https://"];

	function loadToIFrameUrl(url, menuId, isModuleClicked){
		var contextPath= '<%=request.getContextPath()%>';
		
		var includeContext=true;
		for (i=0;i<validProtocals.length;i++){
			if(url.toLowerCase().indexOf(validProtocals[i])==0){
			includeContext=false;break;
			}
	  	}
		if(includeContext){
		url =contextPath+url;
		}
		var validateUrl = trimAll(url);
		if(validateUrl == ''){
			showEmptyDialog("Not a Valid URL", "Space Time Insight");
			return false;
		}		
		if(currentModuleURL == "") {			
			currentModuleURL = url;
		}
		if(isModuleClicked == 'true'){
			if(currentModuleURL.indexOf("confirmBeforeLeave=true") > 0 ) {					
				var message = confirm('<bean:message key='admin.menu.confirm.msg' bundle='admin' />');				
				if (message){ 				
					return false;					
				}else{
					currentModuleURL = url;
				}
			} else {
				currentModuleURL = url;
			}
		} 
		
		try{
			window.frames['windowIframe'].location = url;
		}catch(er){
			document.getElementById('windowIframe').src = url; 
		}
		resetButtonState();
		selectedMenuId = menuId;
		//document.getElementById(menuId).className = "selected";
		try{
			parent.setIFrameProperties(false);
		}catch(err){
			//ERROR. when included the application under IFrame
		}
		return false;
	}

	function resetButtonState(){
		for(i=0; i < moduleIds.length; i++){
			try{
				document.getElementById(moduleIds[i]).className = "";			
			}catch(er){}
		}
		//document.getElementById('pwd').className = "";
	}
	
	function refreshSessionInvalid(){
		window.location = '<%=ServerUtils.getContextName(request)%>/loginAction.do';
	}

	function changeStyle(menuId){
		if(document.getElementById(menuId)){
			document.getElementById(menuId).className = "selected";
		}
	}
	
	function resetStyle(menuId){
		if(selectedMenuId != menuId && document.getElementById(menuId)){
			document.getElementById(menuId).className = "";
		}
	}

	function trimAll(sString){
		while (sString.substring(0,1) == ' ')
		{
			sString = sString.substring(1, sString.length);
		}
		while (sString.substring(sString.length-1,  sString.length) == ' ')
		{
			sString = sString.substring(0,sString.length-1);
		}
		return sString;
	}
	
	function invalidateSession(){
		if(!isLogoutClicked){
			<% if (JAASAuthenticationTypeInitializer.getInstance().isSSO()) {%>
				validateAndExtendSession();	
			<% }else{ %>
				window.location = '<%=ServerUtils.getContextName(request)%>/logout.do?isSessionExpired=yes';
			<% } %>
		 }else{
			window.location = '<%=ServerUtils.getContextName(request)%>/logout.do';
		}
	}
	
	function loadGEFrame(url, menu,selectLayerIds1,selectedRBRegion1,isModuleLevel){
		loadToIFrameUrl(url,menu, 'false');
		var geFrameWindow = null;
		try{
			geFrameWindow = window.frames['windowIframe']
		}catch(er){
			geFrameWindow = document.getElementById('windowIframe') 
		}
		selectLayerIds = selectLayerIds1;
		if(isModuleLevel){
			selectedRBRegionModule = selectedRBRegion1;
		}else{			
			selectedRBRegion = selectedRBRegion1;
		}
	}
	/**
	opens a module 
	*/
	function openModule(moduleName){		
		try{
			var moduleSpanLink = document.getElementById(moduleName);
			moduleSpanLink.click();
		}catch(err){
			alert("No module found with "+moduleName);
		}		
	}
</script>