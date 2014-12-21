<%@page import="com.enterprisehorizons.magma.server.util.CommonUtils"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@page import="com.spacetimeinsight.security.bean.ModuleBean"%>
<%@page import="com.spacetimeinsight.preferences.PreferenceHelper"%>

<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils,com.spacetimeinsight.security.bean.JAASConstants"%>
<%@page import="com.spacetimeinsight.security.bean.JAASAuthenticationTypeInitializer"%>
<%@page import="java.util.*"%>
<%@ page import="org.owasp.esapi.ESAPI" %>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%><head>
<%@page import="java.util.List"%>
<%@page import="com.spacetimeinsight.db.model.util.DataModelsCache"%>
<%@page import="com.spacetimeinsight.db.config.model.LanguageMaster"%>
<%@page import="com.enterprisehorizons.magma.server.admin.AdminConfigUtils"%>
<%@page import="java.util.Locale"%>
<%@page import="com.spacetimeinsight.web.common.constants.WebConstants,com.enterprisehorizons.util.StringUtils"%>

	<jsp:include page="/common/style.jsp"/>
  	<jsp:include page="/common/HeaderCommon.jsp"/>
</head>
<!-- Privileges imports  -->
<%@page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@page import="com.enterprisehorizons.magma.security.util.AccessHelper"%>
<%@page import="com.spacetimeinsight.db.privileges.model.RoleRightsMap"%>
<%@page import="com.spacetimeinsight.stas.privileges.services.PrivilegesConstants"%>
<%@page import="com.enterprisehorizons.magma.security.util.EAccessAction"%>

 <%
  List languagesList = DataModelsCache.getInstance().retrieve(
            LanguageMaster.class.getName()); 
	UserBean userBean   = (UserBean)request.getSession(false).getAttribute(ServerUtils.USER_BEAN_NAME);
     String moduleId      =(String) session.getAttribute(ServerUtils.PARAM_MODULE_ID);
	boolean hasUserChgPass  = AccessHelper.hasAccess(userBean,null,PrivilegesConstants.Right.CHANGE_PASSWORD,null,EAccessAction.UPDATE_ACCESS); 
	boolean hasUserPreferns = AccessHelper.hasAccess(userBean,moduleId,PrivilegesConstants.Right.PREFERENCES,null,EAccessAction.READ_ACCESS);
	boolean hasRaiseTicketAccess  = AccessHelper.hasAccess(userBean,null,PrivilegesConstants.Right.RAISE_SUPPORT_TICKET,null,EAccessAction.READ_ACCESS); 
	
	String helpPath = AdminConfigUtils.getPortalUserGuide();
	
	if(!helpPath.startsWith("http")){
		helpPath = "serverresources/"+helpPath;
	}
	String disable=(String)request.getAttribute("disablepref");
	String makeDisable="javascript:toggleMenu()";
	if(disable!=null){
			makeDisable="return false";
	}
	String defaultModule=PreferenceHelper.getDefaultModule((UserBean) request.getSession().getAttribute(ServerUtils.USER_BEAN_NAME));
	
	String menu2load = (String)request.getParameter("menu2load");
	
%> 
<script>
window.onload=function(){
	var menu2load= <%=menu2load%>;
		if(menu2load != null && menu2load !='' ){
		document.getElementById('menu2Load').value = menu2load;
	}	
}
 var moduleIds=[];
 jQuery( document ).ready(function() {
	
	
	//jQuery("#moduleList").kendoDropDownList();
 	jQuery('#moduleList').change(function(){
		var selectedOption =jQuery("#moduleList option:selected");
	
		var arr = selectedOption.val().split('|');
		
		loadToIFrameUrl(arr[0], arr[1], 'true');
		
 	});
 });
 
 function disable(){ 
	document.getElementById("moduleList").style.display = "none";
	document.getElementById("app_help").style.display = "none";
	document.getElementById("userPreferencesImgId").style.display = "none";
 }

</script>
<script language="javascript" type="text/javascript">


	var timeout	= 2000;
	var closetimer	= 0;
	var ddmenuitem	= 0;
	 
	function toggleMenu() {
		//var menutabs = document.getElementById("menutabs");	
	
		var ele = document.getElementById("headersubmenu");
		if(ele.style.display == "block") {
    		ele.style.display = "none";
			mcancelclosetime();
  		}
		else {
			ele.style.display = "block";
		 	mcancelclosetime();
			}
		
	} 

	function resetLogout(){
		window.location = '<%=ServerUtils.getContextName(request)%>/logout.do';
	}

	// close showed layer
	function mclose()
	{
		toggleMenu();
	}

	// go close timer
	function mclosetime()
	{
		closetimer = window.setTimeout(mclose, timeout);
	}

	// cancel close timer
	function mcancelclosetime()
	{
		if(closetimer)
		{
			window.clearTimeout(closetimer);
			closetimer = null;
		}
	}
	// close layer when click-out
	//document.onclick = mclose; 
	var validProtocals=["file:///","ftp://","http://","https://"];
	var isLogoutClicked = false;
	var selectedMenuId = 0;
	var selectLayerIds = "";
	var currentSelectedModule=""; // added to know in which module user is in now
	var currentModuleURL = "";
	var situationModuleId="";   //added to know the layer/window is related to a module in situation room is selected
	var selectedRBRegion = "";
	var selectedRBRegionModule = "";
	
		function loadToIFrameUrl(url, menuId, isModuleClicked){
			
			var str =url.split('?');		
				
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
			
		if(str[0] == '/htmlViewer.do'){
				window.location = url;
			}else{
			window.frames['windowIframe'].location = url;
			}
		}catch(er){
			document.getElementById('windowIframe').src = url; 
		}
		
		selectedMenuId = menuId;
		//document.getElementById(menuId).className = "selected";
		try{
			parent.setIFrameProperties(false);
		}catch(err){
			//ERROR. when included the application under IFrame
		}
		return false;
	}
</script>

<script type="text/javascript">
		dojo.require("dijit.form.Button");
		dojo.require("dijit.Menu");
		/* Getting list of modules */
		dojo.addOnLoad(function() {
			//<!--<% 
			//		UserBean userBean = (UserBean)session.getAttribute("stiUser");
			//		List moduleList = userBean.getModules();
			//		for(int i=0;i<moduleList.size();i++){
			//			ModuleBean moduleBean = (ModuleBean)moduleList.get(i);
			//		}
			//	%>-->
				var button = new dijit.form.Button({
					label: "Modules",
					name: "programmatic2",
					id: "moduleButton", 
					style: "display: none; "						
				}); 
			});
</script>
 <body >
  <% String  userLogins =null;
	boolean flag = false;
  %>
  <% if (JAASAuthenticationTypeInitializer.getInstance().isSSO()) {   
		userLogins = "/ssoLoginAction.do";
		flag = true;
   }else{
		userLogins = "/loginAction.do";
	}   
   
   %>
<html:form action='<%=userLogins%>' method="post" styleId = "test"> 

  <table width="100%" cellpadding="0" cellspacing="0" class="bgHeaderImage" >
	  <input type="hidden" name="languagechange" value="">
	<tr>
    	<td height="24" valign="top" width="31%"><div style="width:209px;" class="logo"></div></td>
        <%
	    String path=CommonUtils.getCustomerLogoPath(request);
		if(path.endsWith(".jpeg") || path.endsWith(".jpg") || path.endsWith(".gif") || path.endsWith(".png")
		   || path.endsWith(".JPEG") || path.endsWith(".JPG") || path.endsWith(".GIF") || path.endsWith(".PNG"))
	    {
			
			out.print("<td align=\"center\"><img src=\""+ESAPI.encoder().encodeForHTML(path)+"\" height=\"20\" /></td>");
			out.print("<td style=\"min-width:423px; overflow:hidden;\" width=\"31%\" align=\"right\">");
			
		}
            else
	    {
	       out.print("<td style=\"min-width:423px; overflow:hidden;\" width=\"31%\" align=\"right\">");
	    }	
	%>	
		
			<ul id="headerMenu">
				<%-- <li><img src='<%=ServerUtils.getContextName(request)%>/images/portal/toggleBtn.png' id="toggleButton" title="<bean:message key='admin.hidedisplay.title' bundle='admin'/>" onclick="showMenuTabs()" style="position:relative: top:2px;">&nbsp;  
    			</li> --%>
  			<% if (!JAASAuthenticationTypeInitializer.getInstance().isSSO())
				{%>
        		<li>
					<a href="#" onclick="resetLogout();" class="logoutlabel" title="<bean:message key='admin.menu.logout' bundle='admin'/>">
						<bean:message key='admin.menu.logout' bundle='admin'/>
					</a>
				</li>
	
			<% } %>
				
					<li><span class="v-separator"></li>
					<li style="padding-left:10px">
				<logic:present name="stiUser" >
				<logic:notEqual name="stiUser" property="firstName" value="">
					<logic:notEqual name="stiUser" property="lastName" value="">
					<span class="username-span" title='<bean:write name="stiUser" property="firstName" filter="false" />&nbsp;<bean:write name="stiUser" property="lastName"/>' filter="false" />
						<bean:write name="stiUser" property="firstName" filter="false" /> &nbsp;<bean:write name="stiUser" property="lastName" filter="false" />
					</logic:notEqual>
				</logic:notEqual>
				<logic:notEqual name="stiUser" property="firstName" value="">
					<logic:equal name="stiUser" property="lastName" value="">
					<span class="username-span" title='<bean:write name="stiUser" property="firstName" filter="false" />&nbsp;<bean:write name="stiUser" property="lastName"/>' filter="false" />
						<bean:write name="stiUser" property="firstName" filter="false" />
					</logic:equal>
				</logic:notEqual>
				<logic:equal name="stiUser" property="firstName" value="">
					<logic:notEqual name="stiUser" property="lastName" value="">
						<span class="username-span" title='<bean:write name="stiUser" property="firstName" filter="false" />&nbsp;<bean:write name="stiUser" property="lastName"/>' filter="false" />
						<bean:write name="stiUser" property="lastName" filter="false" />
					</logic:notEqual>
				</logic:equal>
				<logic:equal name="stiUser" property="firstName" value="">
					<logic:equal name="stiUser" property="lastName" value="">
						<span class="username-span" title='<bean:write name="stiUser" property="loginId" filter="false"/>' 	filter="false" />					<bean:write name="stiUser" property="loginId" filter="false" />
					</logic:equal>
				</logic:equal>
				</logic:present>
				</span>
    			</li>
				<li>
				<% if (JAASAuthenticationTypeInitializer.getInstance().isSSO()) { %>
               
                     <select id="languageId" name="languageId" autocomplete="off" onChange="changelocale(this);"  style="width:100px">
                                            <%
                                                Locale locale = (Locale)request.getSession(false).getAttribute(WebConstants.LOCALE_SESSION_CLASS_NAME);
                                                int count = languagesList == null ? 0 : languagesList.size();
                                                LanguageMaster language = null;
                                                for (int i = 0; i < count; i++) {
                                                    language = (LanguageMaster) languagesList.get(i);
													
                                            %>
											
                                            <option
                                                <%if (locale.getCountry().equals(language.getCountryCd())) {%>
                                                    selected <%}%> value="<%=language.getLanguageId()%>"><%=language.getDescription()%>
                                            </option>
                                                <%
                                                    }
                                                %>
                                        </select>
										 <%  }  %>
                </li>
    			<li>
				<logic:present name="stiUser" >
		<div >
		
		
						
					<table>
						<tr>
						<td style="padding-right:10px" title="<bean:message key='admin.menu.help' bundle='admin'/>">
						<select id="app_help" >
								<option value="javascript:openHelpWindow()"> &nbsp;&nbsp;<bean:message key="header.help" bundle="admin"/></option>
                           
                       			<% if(!JAASAuthenticationTypeInitializer.getInstance().isSSO() && !JAASAuthenticationTypeInitializer.getInstance().isLDAP() && !JAASAuthenticationTypeInitializer.getInstance().isOpenLDAP()) 							{ %>
                        		<option <%if(hasUserChgPass) { %>  value="javascript:changePassword()" <%}else {%> value="#" disabled <%}%>> &nbsp;&nbsp;<bean:message key='header.changepassword' bundle='admin'/></option>
                				<% } %>
                				<option disabled>-------------------------------</option>
								<option value="javascript:showReportBug(<%=hasRaiseTicketAccess%>)"> &nbsp;&nbsp;<bean:message key="header.reportbug" bundle="admin"/></option>
								<option value="javascript:showAbout()"> &nbsp;&nbsp;<bean:message key="header.about" bundle="admin"/> </option>
								</select></td>
						<td style="padding-right:10px" title="<bean:message key='preferences.title' bundle='admin'/>">
						<a id="userPreferencesImgId" <%if(hasUserPreferns) { %>  style="height:16px;width:16px;padding:0px"  href="javascript:showUserPreferences()" <%}else {%>  class="disablelink" href="#" <%}%> ><img src="images/preferences.png" style="height:16px;width"/>
						</a></td>
						<td>  
								<select id="moduleList" onmouseover = "onMouseEnter();">
									
										<logic:iterate id="stiModulesList" name="stiUser"  property="modules" >
										
										
										
										<bean:define id="dropDownValueAfterTrim" scope="request">
											<bean:write name="stiModulesList" property="name" filter="false"/>
										</bean:define>
										<% 
										if(dropDownValueAfterTrim != null && dropDownValueAfterTrim.length() >30){
										dropDownValueAfterTrim=dropDownValueAfterTrim.substring(0,27)+"...";
										}
										%>

										
										
										<% if(menu2load != null && menu2load !=""){%>
									<logic:equal name="stiModulesList" property="id" value="<%=menu2load%>">	
									<option title='<bean:write name="stiModulesList" property="name" filter="false"/>' value='<bean:write name="stiModulesList" property="url" />|<bean:write name="stiModulesList" property="id" />' selected="selected">
									<%=dropDownValueAfterTrim%>
									</option>
									</logic:equal>
									<logic:notEqual name="stiModulesList" property="id" value="<%=menu2load%>"> 
										
										<option title='<bean:write name="stiModulesList" property="name" filter="false"/>' value='<bean:write name="stiModulesList" property="url" />|<bean:write name="stiModulesList" property="id" />' >
										<%=dropDownValueAfterTrim%>
										</option>
										</logic:notEqual>
									 <% }else{ %>
									 	 <logic:equal name="stiModulesList" property="id" value="<%=defaultModule%>">				 	
											
									<option title='<bean:write name="stiModulesList" property="name" filter="false"/>' value='<bean:write name="stiModulesList" property="url" />|<bean:write name="stiModulesList" property="id" />' selected="selected"><%=dropDownValueAfterTrim%></option>
									
										</logic:equal>
										<logic:notEqual name="stiModulesList" property="id" value="<%=defaultModule%>"> 
										
										<option title='<bean:write name="stiModulesList" property="name" filter="false"/>' value='<bean:write name="stiModulesList" property="url" />|<bean:write name="stiModulesList" property="id" />' ><%=dropDownValueAfterTrim%></option>
										</logic:notEqual>
										 <%} %>
										
										
										
										</logic:iterate>
										
										
										<logic:iterate id="stiModulesList" name="stiUser"  property="modules" >
										<script>
										document.getElementById("app_help").selectedIndex = -1;
										document.getElementById("app_help").onchange = function() {
										location = this.options[this.selectedIndex].value;
										this.selectedIndex = -1;   
										};	
										function openHelpWindow(){
										var helpWindow = window.open('','portalUserGuide', 'width='+screen.width/2+',height='+screen.height+', resizable=yes, toolbar=no, location=no, directories=no, status=no, menubar=no,scrollbars=no');
										helpWindow.document.write('<html><head><title>SI Server Portal User Guide</title></head><body topmargin="0" leftmargin="0"><iframe src="<%=ESAPI.encoder().encodeForHTML(helpPath) %>" id="ifrm" name="ifrm" width="100%" height="100%"></iframe></body></html>');
										helpWindow.document.close();
										}
									    moduleIds.push("<bean:write name="stiModulesList" property="id" />")
									 </script>
								<% if(menu2load != null && menu2load !=""){%>	
								<logic:equal name="stiModulesList" property="id" value="<%=menu2load%>">	
										 		<input type="hidden" id="menu2Load" name="menu2Load" value="<bean:write name='stiModulesList' property='url'  />" />
										 </logic:equal>
										 <% }else{ %>
										<logic:equal name="stiModulesList" property="id" value="<%=defaultModule%>">	
										 		<input type="hidden" id="menu2Load" name="menu2Load" value="<bean:write name='stiModulesList' property='url'  />" />
										 </logic:equal>
										 <%} %>
										 </logic:iterate>
										 
								</select>
								 
							</td>
						</tr>	
					</table>
			
				</div>
				
				</logic:present>
				</li>
		<%-- 	 	<%
				String browser = request.getHeader("User-Agent");
		if(browser.contains("Firefox")) {
		%>
		 --%>
		
		<!-- <div style="overflow: hidden;">
    				<div id="headersubmenu" style="display:none; width: auto" onmouseover="mcancelclosetime()" onmouseout="mclosetime()">
    					
            				<li ><a <%if(hasUserPreferns) { %>  href="javascript:showUserPreferences()" <%}else {%>  class="disablelink" href="#" <%}%> ><bean:message key='preferences.title' bundle='admin'/></a></li>
                           
                            <% if(!JAASAuthenticationTypeInitializer.getInstance().isSSO() && !JAASAuthenticationTypeInitializer.getInstance().isLDAP() && !JAASAuthenticationTypeInitializer.getInstance().isOpenLDAP()) 							{ %>
                            
                            <li ><a <%if(hasUserChgPass) { %>  href="javascript:changePassword()" <%}else {%>  class="disablelink" href="#" <%}%> ><bean:message key='header.changepassword' bundle='admin'/></a> </li>
                		<% } %>
                 		
        			</div>
    			
			<div style="overflow: hidden;">
    			<li>
            		<a id="displayText" href="#" onclick="<%=makeDisable%>" >  
					<logic:present name="stiUser" >
						<bean:write name="stiUser" property="firstName" filter="false" />&nbsp;<bean:write name="stiUser" property="lastName" filter="false" /> 
					</logic:present>
                    <img src='<%=ServerUtils.getContextName(request)%>/images/portal/header_link_arrow.png' width="12" height="12" border="0" align="top" ></a>
    			</li>
			</div>
		</div> -->
		<%-- <%}else {
		%> 
			<li>
    				<div id="headersubmenu" style="display:none;" onmouseover="mcancelclosetime()" onmouseout="mclosetime()" >
    					<ul>
            				<li ><a <%if(hasUserPreferns) { %>  href="javascript:showUserPreferences()" <%}else {%>  class="disablelink" href="#" <%}%> ><bean:message key='preferences.title' bundle='admin'/></a></li>
                            <script language="javascript" type="text/javascript">
									document.getElementById("headersubmenu").style.width='auto';
							</script>
                            <% if(!JAASAuthenticationTypeInitializer.getInstance().isSSO() && !JAASAuthenticationTypeInitializer.getInstance().isLDAP() && !JAASAuthenticationTypeInitializer.getInstance().isOpenLDAP()){ %>
                            
                            <li ><a <%if(hasUserChgPass) { %>  href="javascript:changePassword()" <%}else {%>  class="disablelink" href="#" <%}%> ><bean:message key='header.changepassword' bundle='admin'/></a> </li>
                		<% } 
						else
						{%>
                        <script language="javascript" type="text/javascript">
									document.getElementById("headersubmenu").style.width=96;
							</script>
                        <% } %>
                 		</ul>
        			</div>
    			</li>
				<li>
            		<a id="displayText" href="#" onclick="<%=makeDisable%>" >  
					<logic:present name="stiUser" >
						<bean:write name="stiUser" property="firstName" filter="false" />&nbsp;<bean:write name="stiUser" property="lastName" filter="false" /> 
					</logic:present>
                    <img src='<%=ServerUtils.getContextName(request)%>/images/portal/header_link_arrow.png' width="12" height="12" border="0" ></a>
    			</li>
	 <%}
				%>
				 --%>
    			
		</ul>
        
        
	</td>
     <script>  
		/*add tooltip commented as not able to change the font size*/
		function showMenuTabs(){
	
			/*Toggling logic for menutabs getting menutabs id from stiLayout*/
			var menutabs = document.getElementById("menutabs");	
			if(menutabs != null){
				if(menutabs.style.visibility == 'visible') {
					menutabs.style.visibility='hidden';
					menutabs.style.display='none';
				} else {
					menutabs.style.visibility = 'visible';
					menutabs.style.display='';
				}
            if(document.getElementById("moduleButton")){
				var moduleButton = dijit.byId("moduleButton").domNode;
				if(moduleButton.style.display=='') {
					moduleButton.style.display='none';
				} else {
				//	moduleButton.style.display='';
				}
			}
		} 
	}
		function changelocale(localecode){
            if((document.getElementById('languageId').value) == 0){
				alert('if');
				return false;
				}
			else{
				document.forms[0].languagechange.value='changeEvent';
				document.forms[0].submit();
				
			}
           
        }
        
        function onMouseEnter(){
        	var module = document.getElementById('moduleList');
        	module.title = module.options[module.selectedIndex].title;
        }
							
	</script> 
	</tr>
</table>

</html:form>
</body>