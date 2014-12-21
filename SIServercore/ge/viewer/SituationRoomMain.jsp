<%@page import="com.enterprisehorizons.constants.CommonConstants"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="com.enterprisehorizons.magma.server.admin.CommonConfigUtils" %>
<%@page import="com.enterprisehorizons.util.StringUtils"%>
<%@page import="org.owasp.esapi.ESAPI"%>
<%
    //String serverUrl = ServerUtils.getServerContextBaseUrl(request);
    String serverRootUrl = ServerUtils.getServerRootUrl(request);
    String adminServerUrl = serverRootUrl+CommonConstants.FORWARD_SLASH + CommonConfigUtils.getConfigValue("coreservercontext")+CommonConstants.FORWARD_SLASH;
%>

<html>
<head>
<style>
	body { margin: 0px; overflow:hidden; bgcolor:#000000; width:100%; height:100%}
</style>
<script language="JavaScript" type="text/javascript">

function moveIFrame(divId, iframeId, x,y,w,h) {
    var frameRef=document.getElementById(divId);
    frameRef.style.left=x;
    frameRef.style.top=y;
    var iFrameRef=document.getElementById(iframeId);
	iFrameRef.width=w; 
	iFrameRef.height=h;
}

function hideIFrame(divId){
    document.getElementById(divId).style.visibility="hidden";
}

function showIFrame(divId){
    document.getElementById(divId).style.visibility="visible";
}

function loadIFrame(divId, iframeId, url){
	var divObj = document.getElementById(divId);
	if(!divObj){
		divObj = document.createElement('div');
		divObj.setAttribute('id', divId);
		divObj.style.position = "absolute";
		divObj.style.border = "0px";
		divObj.style.backgroundColor = "transparent";
		document.body.appendChild(divObj);
	}
	divObj.innerHTML = "<iframe id='"+iframeId+"' name='"+iframeId+"' src='" + url + "'frameborder='0' style='position:absolute;'></iframe>";
}

function setZIndex(divId,zindex){
	document.getElementById(divId).style.zIndex=zindex;
}

function bringToFront(divId){
	var divArray = document.getElementsByTagName("div");
	count = divArray.length;
	for(i=0;i<divArray.length;i++){
		var iframes = divArray[i].getElementsByTagName("iframe");
		if(divArray[i].id == divId){
			divArray[i].style.zIndex = divArray.length; 
			iframes[0].style.zIndex = divArray.length;
		}else{
			if(iframes[0]){
				--count;
				divArray[i].style.zIndex = count;
				iframes[0].style.zIndex = count;
			}
		}
	}
}

function removeIFrame(divId){
	var divObj = document.getElementById(divId);
	divObj.parentNode.removeChild(divObj);
}

</script>
</head>
<body>
<div id="podDiv" style="z-index:0">
  	<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
			id="SituationRoom" width="100%" height="100%"
			codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab">
			<param name="movie" value="SituationRoom.swf?adminServerUrl=<%=ESAPI.encoder().encodeForHTML(adminServerUrl)%>" />
			<param name="quality" value="high" />
			<param name="bgcolor" value="#869ca7" />
			<embed src="SituationRoom.swf" quality="high" bgcolor="#869ca7"
				width="100%" height="100%" name="SituationRoom" align="middle"
				play="true"
				loop="false"
				quality="high"
				type="application/x-shockwave-flash"
				pluginspage="http://www.adobe.com/go/getflashplayer">
			</embed>
	</object>
	</div>
</body>
</html>