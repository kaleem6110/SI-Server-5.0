<%@page import="com.enterprisehorizons.constants.CommonConstants"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="com.enterprisehorizons.magma.server.admin.CommonConfigUtils" %>
<%@page import="com.enterprisehorizons.util.StringUtils, java.net.*"%>
<%@page import="org.owasp.esapi.ESAPI"%>
<%
    String url = request.getParameter("url").replace("lookatfunction=", "lookatfunction=parent.");
    String winName = request.getParameter("Name");
    String winWidth = request.getParameter("width");
    String winHeight = request.getParameter("height");
    String layerId = request.getParameter("LayerId");
    String dashboardId = request.getParameter("dashBoardId");
    String IsCameraSensitive = "false";
    String serverUrl = ServerUtils.getServerContextBaseUrl(request);
    String dashboardJSUrl = request.getParameter("customJSUrlDashboard");
	String windowName = request.getParameter("title");
	String ispercentage = request.getParameter("ispercentage");
	
    if (request.getParameter("isCameraSensitive")!=null)
    	IsCameraSensitive=request.getParameter("isCameraSensitive");
	
	if (request.getParameter("isLaunchInExternalWindow")!=null)
        url = url + "&isLaunchInExternalWindow=" + request.getParameter("isLaunchInExternalWindow");

    if (request.getParameter("isnewwindow")!=null)
		url = url + "&isnewwindow=" + request.getParameter("isnewwindow");

    if (request.getParameter("swfobject")!=null)
		url = url + "&swfobject=" + request.getParameter("swfobject");
	
%>

<%
    URLDecoder urlDecode = new URLDecoder();
%>

<%
if(!StringUtils.isNull(dashboardJSUrl)) {
%>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl+dashboardJSUrl.trim())%>" ></script>
<%
}
%>
 



<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
     <title></title>
     <style type="text/css">
         html, body
         {
             margin: 0;
             padding: 0;
             height: 100%;
             width: 100%;
             overflow: hidden;
         }
         #myContent
         {
             overflow: hidden;
         }
     </style>

     <script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/js/swfobject.js"></script>
     <script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/jsp/offlineslviewer/viewerfunctions.js"></script>

     <script type="text/javascript">
		var winWidth = "<%=ESAPI.encoder().encodeForHTML(winWidth) %>";
		var winHeight =  "<%=ESAPI.encoder().encodeForHTML(winHeight) %>";
        
		function loadDashboard() {
			if('<%=ESAPI.encoder().encodeForHTML(ispercentage) %>' != "null" && '<%=ESAPI.encoder().encodeForHTML(ispercentage) %>' == "True"){
				winWidth+= "%";
				winHeight+= "%";
			}
            if (winWidth.indexOf("%") != -1) {
	            if (parseInt(winWidth.substring(0, winWidth.indexOf("%"))) > 100 || parseInt(winHeight.substring(0, winHeight.indexOf("%"))) > 100) {
	                document.getElementById("Body").style.overflow = "auto";
	            }
            }
             var flashvars = { allowScriptAccess: "always", allowNetworking: "all" };
             var params = { allowScriptAccess: "always", allowNetworking: "all" };
             var attributes = { allowScriptAccess: "always", allowNetworking: "all" };
             
             url= '<%=ESAPI.encoder().encodeForHTML(urlDecode.decode(url)) %>';
             swfobject.embedSWF(url, "myContent", winWidth, winHeight, "9.0.0", flashvars, params, attributes);
             
             document.getElementById("hdnName").value = '<%=ESAPI.encoder().encodeForHTML(winName) %>';
             document.getElementById("hdnDashBoardId").value ='<%=ESAPI.encoder().encodeForHTML(dashboardId) %>';
             document.getElementById("hdnLayerId").value ='<%=ESAPI.encoder().encodeForHTML(layerId) %>';
             document.getElementById("isCameraSensitive").value ='<%=ESAPI.encoder().encodeForHTML(IsCameraSensitive) %>';
			 
			 if('<%=ESAPI.encoder().encodeForHTML(windowName) %>' != null && '<%=ESAPI.encoder().encodeForHTML(windowName) %>' != "null")
				document.title = '<%=ESAPI.encoder().encodeForHTML(windowName) %>';
			else
				document.title = '<%=ESAPI.encoder().encodeForHTML(winName) %>';
         }
         function getWindowName() {
             return document.getElementById("hdnName").value;
         }

		function getLayerId() {
             return document.getElementById("hdnLayerId").value;
         }
         function getDashBoardId() {
             return document.getElementById("hdnDashBoardId").value;
         }
         
 		function checkIsCameraSensitive() {
            return document.getElementById("isCameraSensitive").value;
        }
        function clearSwfObject() {
            swfobject.removeSWF("myContent");
        }
		
		function getSwfObject() {
            return swfobject.getObjectById("myContent");
        }
         
        function sessionDetails(){
			parent.clearTimer();
		}
		
		function setDashboardActionEvents(eventActionData, eventActionKey) {
            parent.actionEvts(eventActionData, eventActionKey);
        }

		 function fireDashboardActionEvent(eventArgs) {
            var obj = parent.actionEvtMap();
            var keys;
            try {
                if (obj != null) {
                    for (key in obj) {
                        if (key == eventArgs.layerId + "_" + eventArgs.dashboardId) {
                            var eventFunctionArray = new Array();
                            eventFunctionsArray = obj[key];
                            for (var i = 0; i < eventFunctionsArray.length; i++) {
                                var eventFunctionArray = new Array();
                                eventFunctionArray = eventFunctionsArray[i];
                                if (eventArgs.eventName == eventFunctionArray[0]) {
                                    try {
                                        window[eventFunctionArray[1]](eventArgs);
                                    } catch (e) {
                                        alert('Mapped javascript function :[' + eventFunctionArray[1] + '] was not found for the event :[' + eventFunctionArray[0] + ']');
                                    }
                                }
                            }
                        }
                    }
                }
            } catch (e) {
                alert('Error [' + e.message + '] occurred while getting the eventArgs/firing the Dashboard Event in loadswf');
            }
        }
		
		function _registerDashboardRefreshEvents(ecodashbaordEvents) {
			try {
				var params = [];
				params.push(ecodashbaordEvents);
				params.push(getLayerId() + "_" + getDashBoardId());
				parent.registerDashboardForEvents(ecodashbaordEvents, getLayerId() + "_" + getDashBoardId());
			} catch (err) {
				alert(err.message);
			}
		}
		
		function loadDashboardInExternalWindow(dashboardId) {
            dashboardId = dashboardId + "_popup";
            var url = "isnewwindow=true&isLaunchInExternalWindow=true&swfobject=" + dashboardId;
            parent.openDashboardExternalWindow(url, dashboardId);
        }
		
		function onSearch(advancedSearchArgs) {
            try {
                if (advancedSearchArgs.isApplyToArtifact) {
                    parent.onSearchArtifacts(advancedSearchArgs);
                }
                if (advancedSearchArgs.isApplyToDashboard) {
                    parent.onSearchDashboards(advancedSearchArgs);
                }
            } catch (e) {
                alert('Error [' + e.message + '] occurred while performing search');
            }
        }



     </script>

 </head>
 <body id="Body" style="background-color: #D6E5F0" runat="server" onload=loadDashboard();>
     <div id="myContent" style="position: relative">
         <p>
             Alternative contents
         </p>
     </div>
     <input type="hidden" id="hdnLayerId" value="" />
     <input type="hidden" id="hdnDashBoardId" value="" />
     <input type="hidden" id="hdnName" value="" />
     <input type="hidden" id="isCameraSensitive" value="" />
 </body>
 </html>