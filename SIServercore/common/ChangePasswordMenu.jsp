<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
	<div class="mattblacktabs">
	<ul>
		<li id="pwd" class="selected">
			<span><bean:message key='admin.changepassword.title' bundle='admin'/></span>
		</li>	
		<!--<li id="logout">
				<span onclick="invalidateSession()" onmouseover="changeStyle('logout')" onmouseout="resetStyle('logout')">
					<bean:message key='admin.menu.logout' bundle='admin'/>
				</span>				

		</li>-->	
	</ul>
	</div>
	
<script>
var selectedMenuId = 0;
	function loadToIFrameUrl(url, menuId){
		var validateUrl = trimAll(url);
		if(validateUrl == ''){
			showEmptyDialog("<bean:message key='admin.msg.invalid.url' bundle='admin'/>", "<bean:message key='admin.alert.title' bundle='admin'/>");
			return false;
		}
		try{
			window.frames['windowIframe'].location = url;
		}catch(er){
			document.getElementById('windowIframe').src = url; 
		}
		resetButtonState();
		selectedMenuId = menuId;
		document.getElementById(menuId).className = "selected";
		
		return false;
	}

	function resetButtonState(){
		for(i=0; i<1; i++){
			try{
				document.getElementById(i).className = "";			
			}catch(er){}
		}
		document.getElementById('pwd').className = "";
	}
	
	function refreshSessionInvalid(){
		window.location = '<%=ServerUtils.getContextName(request)%>/loginAction.do';
	}

	function changeStyle(menuId){
		document.getElementById(menuId).className = "selected";
	}
	
	function resetStyle(menuId){
		if(selectedMenuId != menuId){
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
		window.location = '<%=ServerUtils.getContextName(request)%>/logout.do';
	}

	function changeStyle(menuId){
		document.getElementById(menuId).className = "selected";
	}

	function resetStyle(menuId){
		if(selectedMenuId != menuId){
			document.getElementById(menuId).className = "";
		}
	}

</script>