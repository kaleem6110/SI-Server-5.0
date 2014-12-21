<jsp:include page="/common/charsetmeta.jsp"/>  

<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<script type="text/javascript" src="js/windowsjs/javascripts/prototype.js"> </script> 
<script type="text/javascript" src="js/windowsjs/javascripts/effects.js"> </script>
<script type="text/javascript" src="js/windowsjs/javascripts/window.js"> </script>
<script type="text/javascript" src="js/windowsjs/javascripts/window_effects.js"> </script>
<script type="text/javascript" src="js/windowsjs/javascripts/debug.js"> </script>
<link href="js/windowsjs/themes/default.css" rel="stylesheet" type="text/css" />	
<link href="js/windowsjs/themes/alert.css" rel="stylesheet" type="text/css" />
<link href="js/windowsjs/themes/alert_lite.css" rel="stylesheet" type="text/css" />
<link href="js/windowsjs/themes/spread.css" rel="stylesheet" type="text/css" >	 </link>
<!--link href="js/windowsjs/themes/alphacube.css" rel="stylesheet" type="text/css"/ -->
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>


<style>{cursor:wait}</style>
<style type="text/css">
@import "<%=ServerUtils.getContextName(request)%>/js/dojo/resources/dojo.css";
@import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/tundra/tundra.css";
@import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/tundra/tundra_rtl.css";
@import "<%=ServerUtils.getContextName(request)%>/js/dijit/tests/css/dijitTests.css";
@import "<%=ServerUtils.getContextName(request)%>/js/dojox/form/resources/FileInput.css"; 
@import "<%=ServerUtils.getContextName(request)%>/js/dojox/form/resources/CheckedMultiSelect.css";

body .medium {
	width: 15em;
	height:1.7em
}

body .medium1 {
	width: 15em;
	height:1.7em
}
body .medium2 {
	width: 16em;
	height:1.7em
}

body .urlTxt {
	width: 15em;
	height:2 em
}

.formQuestion {
	background-color:#d0e3f5;
	padding:0.3em;
	font-weight:900;
	font-family:Verdana, Arial, sans-serif;
	font-size:0.8em;
	color:#5a5a5a;
}
.formAnswer {
	background-color:#f5eede;
	padding:0.3em;
	margin-bottom:1em;
	width: 100%;
}
.simpletriggernote{
	font-size: 11px;
	color:808080;
}
</style>

<style id="txtareamedium_ie">
	body .txtareamedium {
		width: 15em;
		height:5em;
	}

</style>

<style id="txtareamedium_mogilla">
	body .txtareamedium {
		width: 15em;				
	}

</style>
<!--   Vertical Align Top for labels-->
<style>
	.td,tr{
		vertical-align: top; 	
	}	
</style>

<%@ include file="style.jsp"%>
<%@ include file="commonValidation.jsp" %>
<script type="text/javascript" src="js/dojo/dojo.js"
	djConfig="isDebug: false, parseOnLoad: true"></script>

<script type="text/javascript" src="js/dojox/form/FileInput.js"></script>
<script type="text/javascript"
	src="js/dojox/form/FileInputAuto.js"></script>
<script>
var DB_CONN_PROGRESS = '<bean:message key="j2eeDS.gettingConnection" bundle="j2eeDS" />';
var CAPTION_ALERT = '<bean:message key="j2eeDS.error" bundle="j2eeDS" />';
var PROGRESS_RETRIEVE_COLUMNS = '<bean:message key="j2eeDS.gettingColumns" bundle="j2eeDS" />';
var PRB_LOADING_COLUMNS = '<bean:message key="j2eeDS.prbLoadingColumns" bundle="j2eeDS" />';
var DB_CONFIGURATION_NOT_AVAIL = '<bean:message key="j2eeDS.dbConfigNameNotAvailable" bundle="j2eeDS" />';

</script>
	
<script type="text/javascript" src="js/ecoweb.js" ></script>
<script type="text/javascript">
dojo.require("dijit.form.Form");
dojo.require("dijit.form.CheckBox");
dojo.require("dijit.form.Button");
dojo.require("dijit.form.ValidationTextBox");
dojo.require("dijit.form.ComboBox");
dojo.require("dojox.form.DropDownSelect");
dojo.require("dojo.parser");	// scan page for widgets and instantiate them
dojo.require("dijit.form.Textarea");
dojo.require("dojox.form.FileInput"); 
dojo.require("dijit.form._FormWidget");
dojo.require("dijit.Dialog");
dojo.require("dijit.form.ComboBox");
dojo.require("dijit.form.SimpleTextarea");
dojo.require("dijit.form.MultiSelect");
dojo.require("dojox.data.XmlStore");
dojo.require("dijit.form.FilteringSelect");
dojo.require("dojo.data.ItemFileReadStore");
dojo.require("dijit.ProgressBar");
dojo.require("dijit.Tree");
dojo.require("dojox.data.OpmlStore");
dojo.require("dijit.Dialog");
dojo.require("dijit.form.DateTextBox");
dojo.require("dijit.form.TimeTextBox");
dojo.require("dojox.validate.regexp");
dojo.require("dijit.form.NumberTextBox");
dojo.require("dojox.validate.web");
dojo.require("dijit.form.NumberSpinner");		
</script>


<script type="text/javascript" src="js/windows.js"></script>
<script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/common.js"></script>
<script type="text/javascript" src="js/sessionTimeOut.js"></script>
<script>
	function detectBrowser()
	{
		var browser=navigator.appName;
		var b_version=navigator.appVersion;
		var version=parseFloat(b_version);
		
		if ((browser=="Microsoft Internet Explorer")
		  && (version>=4))
		  {
			document.getElementById('txtareamedium_ie').disabled=false;
			document.getElementById('txtareamedium_mogilla').disabled=true;
		  }
		else
		  {
			document.getElementById('txtareamedium_ie').disabled=true;
			document.getElementById('txtareamedium_mogilla').disabled=false;
		  }
	}
	try{
		parent.setIFrameProperties(false);
	}catch(er){

	}
	// calling on load
	detectBrowser();
</script>

