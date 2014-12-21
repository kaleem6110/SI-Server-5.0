<%
  response.setHeader("Cache-Control","no-cache"); //HTTP 1.1
  response.setHeader("Pragma","no-cache"); //HTTP 1.0
  response.setDateHeader ("Expires", 0); //prevents caching at the proxy server
%>

<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="com.enterprisehorizons.magma.server.util.CommonUtils"%>
<%@page import="com.enterprisehorizons.magma.server.admin.AdminConfigUtils"%>
<%@ include file="style.jsp"%>
<script type="text/javascript"
    src="js/windowsjs/javascripts/prototype.js"> </script>
<script type="text/javascript" src="js/windowsjs/javascripts/effects.js"> </script>
<script type="text/javascript" src="js/windowsjs/javascripts/window.js"> </script>
<script type="text/javascript"
    src="js/windowsjs/javascripts/window_effects.js"> </script>
<script type="text/javascript" src="js/windowsjs/javascripts/debug.js"> </script>
<link href="js/windowsjs/themes/default.css" rel="stylesheet"
    type="text/css" />
<link href="js/windowsjs/themes/alert.css" rel="stylesheet"
    type="text/css" />
<link href="js/windowsjs/themes/alert_lite.css" rel="stylesheet"
    type="text/css" />
<link href="js/windowsjs/themes/spread.css" rel="stylesheet"
    type="text/css">
</link>
<!-- commented for Firefox: applying styles from style.css -->
<!--
<link href="js/windowsjs/themes/alphacube.css" rel="stylesheet"
    type="text/css" />
-->
<style type="text/css">
@import "<%=ServerUtils.getContextName(request)%>/js/dojo/resources/dojo.css";
@import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/tundra/tundra.css";
</style>

<script>

var titleMesssage;
var contactSupportEmail;

function showReportBug(hasRaiseTicketAccess) {
	contactSupportEmail='<%=AdminConfigUtils.getSupportContactEmail()%>';
	titleMessage='<strong class="bannerText"><bean:message key="header.reportbug" bundle="admin"/></strong>';
    
    var innerData = "<table width='100%' cellspacing='5' cellpadding='0'><tr><td colspan='2'><div style='position:relative; top:5px; left:60px; width:300px; height:24px' class='logoAbout' /></td></tr>";
    innerData=innerData+"<tr><td colspan='2'><hr></td></tr>";
    
    innerData=innerData+"<tr><td align='right'><b><bean:message key="header.reportbug.email" bundle="admin"/></b></td><td><a class=\"hyperLinkColor\" target='_blank' href=\'mailto:"+contactSupportEmail+"\'><bean:message key="header.reportbug.email.title" bundle="admin"/></a></td></tr>";
	if(hasRaiseTicketAccess){
		innerData=innerData+"<tr><td align='right'><b><bean:message key="header.reportbug.ticket" bundle="admin"/></b></td><td><a class=\"hyperLinkColor\" target='_blank' href='<bean:message key="header.reportbug.ticket.url" bundle="admin"/>'><bean:message key="header.reportbug.ticket.title" bundle="admin"/></a></td></tr>";
	}
    innerData=innerData+"</table>";
    openInfoframe(innerData,titleMessage,103);
}

function showAbout() {
    titleMessage='<strong class="bannerText"><bean:message key="header.about" bundle="admin"/></strong>';
    
    var innerData = "<div><div style='height:30px;border-bottom: 1px solid black'><div style='position:relative; top:5px; left:60px; width:300px; height:24px' class='logoAbout' /></div></div>";
	innerData=innerData+"<div style='height:103px'><div style='position:relative;top:3px;left:14px; width:120px;display: inline-block' class='siServerLogo' /></div>";
    innerData=innerData+"<div align='left' style='font-family:arial; font-size:15px;color:black;display: inline-block;padding-top:12px'><b><bean:message key="header.about.title" bundle="admin"/></b><br>";
    innerData=innerData+"<b><bean:message key="header.about.version" bundle="admin"/></b>&nbsp;<bean:message key="header.about.version.value" bundle="buildinfo"/><br>";
    innerData=innerData+"<b><bean:message key="header.about.build.id" bundle="admin"/></b>&nbsp;<bean:message key="current.build.id" bundle="buildinfo"/><br></div></div>";
    innerData=innerData+"<div style='font-family:arial; font-size:12px;color:black;padding-left:20px;border-top: 1px solid black'><bean:message key="header.about.copyright" bundle="admin"/></div>";
    innerData=innerData+"</div>";
    openInfoframe(innerData,titleMessage,150);
}

function changePassword()
{
    titleMessage='<strong class="bannerText"><bean:message key="header.changepassword" bundle="admin"/></strong>';

    var innerData = "<iframe style='width:390px; height:220px' frameborder='0' scrolling='no' border='0' src='<%=ServerUtils.getContextName(request)%>/security/changePassword.jsp'></iframe>";
    openInfoframe(innerData,titleMessage,230);

}


var infoFrameWin;
function openInfoframe(innerData,title,numHeight){
    try{
         infoFrameWin = new Window({id: "infoFrameWin",showEffect:Element.show,hideEffect:Element.hide,className: "alphacube",minimizable: false,maximizable: false, resizable: false, title: title, width:400, height:numHeight, destroyOnClose:true, closable:true, wiredDrag: false, draggable: false,closeCallback:closeEvent}); 
         infoFrameWin.getContent().innerHTML = innerData;
         infoFrameWin.showCenter(true);
         infoFrameWin.toFront();
         enableGE(false);   
    }   
    catch(ef){
        if(infoFrameWin!=null) {
            infoFrameWin.destroy();
        }      
    }
}

function showUserPreferences()
{
  	titleMessage = '<strong class="bannerText"><bean:message key="preferences.title" bundle="admin"/></strong>'
    var innerData = '';
    
   var selectedUrl =encodeURIComponent('<%=ServerUtils.getContextName(request)%>/prefAction.do?operation=renderPortalPreferences');
    innerData=innerData+'<div id="loadImg" style="position:absolute;z-index:999; width:730px; text-align:center" class="tundra bodybg"><table width="100%" height="400" cellpadding="0" cellspacing="0" align="center"><tr><td align="center" valign="middle"><div style="height:100px; width:100px; text-align:center; vertical-align:middle"><img src="<%=ServerUtils.getContextName(request)%>/images/portal/loadinganim.gif"><br><h4><bean:message key="preferences.loading" bundle="admin"/></h4></div></td></tr></table></div><iframe class="tundra bodybg" style="width:730px; height:440px;" frameborder="0" scrolling="no" border="0" src="<%=ServerUtils.getContextName(request)%>/prefAction.do?operation=renderMainView&clickedModule=0&preferencesLevel=user&selectedUrl=' + selectedUrl + '" onload="document.getElementById(&quot;loadImg&quot;).style.display=&quot;none&quot;;"></iframe>';
    openPreferences(innerData,titleMessage,450); 
}

var infoFrameWin;
function openPreferences(innerData,title,numHeight){
    try{
         infoFrameWin = new Window({id: "infoFrameWin",showEffect:Element.show,hideEffect:Element.hide,className: "alphacube",minimizable: false,maximizable: false, resizable: false, title: title, width:730, height:numHeight, destroyOnClose:true, closable:true, wiredDrag: false, draggable: false,closeCallback:closeEvent}); 
         infoFrameWin.getContent().innerHTML = innerData;
         infoFrameWin.showCenter(true);
         infoFrameWin.toFront(); 
		 enableGE(false);
		  document.onkeydown = function(e){
				if (!e) e = event;
					if (e.keyCode == 27){
					return false;
					}
				} //Added for SI-1146(Preferences: Giving HTTP error if user exists from preferences window while loading), Tested on Chrome,IE, Firefox.
		 document.getElementById('infoFrameWin_close').style.display="none"; 
    }   
    catch(ef){
        if(infoFrameWin!=null) {
            infoFrameWin.destroy();
        }      
    }
}

function enableGE(flag)
{
    var iframe = document.getElementById('windowIframe');
	try
		{
			var fraContent = iframe.contentWindow || iframe.contentDocument ;
			if(fraContent != null)
				{
					if(!flag){
					fraContent.document.getElementById('geFrameDiv').style.visibility = "hidden";
					}else{
					fraContent.document.getElementById('geFrameDiv').style.visibility = "visible";
					}
				}
		
		}  
	catch(err)
		{
			//Parent page is not a GE.
			// for login page
		}
}

function showLicenseWizard()
{
	titleMessage='<bean:message key="license.wizard.title.label.licensewizard" bundle="security"/>';
	var innerData = '';

	var selectedUrl =encodeURIComponent('<%=ServerUtils.getContextName(request)%>/licenseInstallAction.do');
	innerData=innerData+"<iframe class='tundra bodybg' style='width:600px; height:400px;' frameborder='0' scrolling='no' border='0' src='<%=ServerUtils.getContextName(request)%>/licenseInstallAction.do'></iframe>";
	openLicenseWizard(innerData,titleMessage,402);
}

function openLicenseWizard(innerData,title,numHeight){
	try{
			infoFrameWin = new Window({id: "infoFrameWin",showEffect:Element.show,hideEffect:Element.hide,className: "alphacube",minimizable: false,maximizable: false, resizable: false, title: title, width:600, height:numHeight, destroyOnClose:true, closable:true, wiredDrag: false, draggable: false});
			infoFrameWin.getContent().innerHTML = innerData;
			infoFrameWin.showCenter(true);
			infoFrameWin.toFront();
		}
		catch(ef){
			if(infoFrameWin!=null) {
				infoFrameWin.destroy();
			}
		}
}

function closeEvent()
{
	  document.onkeydown = function(e){
			if (!e) e = event;
				if (e.keyCode == 27){
				return true;
				}
			} //Added for SI-1146(Preferences: Giving HTTP error if user exists from preferences window while loading), Tested on Chrome,IE, Firefox.
	enableGE(true);
	return true;
}

function closeInfoFrame() {
	infoFrameWin.close();
	var iframe = document.getElementById('windowIframe');
	try	{
		var fraContent = iframe.contentWindow || iframe.contentDocument ;
		if(fraContent != null){
			fraContent.focus();
		}	
	}  
	catch(err){}
}
var flashDialog = null;
function flashRequired(msg,flashLink){
	flashDialog = new dijit.Dialog({
            					 title:'Flash Required',
          						 style: "width: 350px;height:150px"}); 
			
			flashDialog.attr("title",  'Flash Required');
			flashDialog.attr("content", "<center><table><tr><td align='center'></tr><tr><td align='center'>" + msg + "</td></tr><tr><td align='center'> <a href=" + flashLink +" target='_blank'>" + flashLink + "</a></td></tr><tr><td align='center'><button dojoType='dijit.form.Button' onClick='flashDialog.hide()'>Close</button></td></tr></table></center>");
            flashDialog.show();  
}
</script>