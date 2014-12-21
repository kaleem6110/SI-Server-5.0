<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
		"http://www.w3.org/TR/html4/strict.dtd">
<%@ taglib uri="/tags/struts-bean" prefix="bean" %>
<%@ taglib uri="/tags/struts-logic" prefix="logic" %>
<%@ taglib uri="/tags/struts-html" prefix="html" %>
<%@ taglib uri="/tags/struts-nested" prefix="nested" %>
<html>
	<head>
		<title></title>

		<style type="text/css">
			@import "jsdojo/resources/dojo.css";
			@import "jsdijit/themes/tundra/tundra.css";
			@import "jsdijit/themes/tundra/tundra_rtl.css";
			@import "jsdijit/tests/css/dijitTests.css";
			@import "js/dojox/widget/FileInput/FileInput.css"; 
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
			.pageSubContentTitle {
					color:#8e8e8e;
					font-size:1em;
					font-family:Verdana, Arial, sans-serif;
					margin-bottom:0.75em;
			}
			body .short {
				width: 5em;
			}
			body .medium {
				width: 10em;
			}
			body .selectbox {
				width: 10em;
			}
			body .textareamedium {
				width: 20em;
				height: 10em;
			}
			body .long {
				width: 20em;
			}
			.firstLabel {
				display: inline-block;
				display: -moz-inline-box;
				width: 10em;
				min-width: 10em;
			}
			.secondLabel {
				width: auto;
				margin-left: 5em;
				margin-right: 1em;
			}
			fieldset label {
				margin-right: 1em;
			}
			.noticeMessage {
				display: block;
				float: right;
				font-weight: normal;
				font-family:Arial, Verdana, sans-serif;
				color:#663;
				font-size:0.9em;
			}
			.dj_ie .dijitSlider .dijitRuleContainer {
			        z-index: 1;
			}
		</style>
		
		
		<script type="text/javascript" src="js/dojo/dojo.js"
			djConfig="isDebug: false, parseOnLoad: true"></script>
	
		<script type="text/javascript" src="js/dojox/widget/FileInput.js"></script>
		<script type="text/javascript" src="js/dojox/widget/FileInputAuto.js"></script>
	
		<script type="text/javascript">
			dojo.require("dijit.form.Form");
			dojo.require("dijit.form.CheckBox");
			dojo.require("dijit.form.Button");
			dojo.require("dijit.form.ValidationTextBox");
			dojo.require("dijit.form.ComboBox");
			dojo.require("dojox.form.DropDownSelect");
			dojo.require("dojo.parser");	// scan page for widgets and instantiate them
			dojo.require("dijit.form.Textarea");
			dojo.require("dojox.widget.FileInput"); 
			
			
		</script>
		
		
	</head>
	<body class="tundra">
			<table align="left" width="100%">
			<tr>
					<td colspan="7">
						<center>
							Edit EcoModel --- SIServer
						</center>
					</td>
				</tr>
				<tr>
					<td colspan="7">
						<center>
							<button dojoType="dijit.form.Button"  type=submit>
								OK
							</button>
						</center>
					</td>
				</tr>
			</table>			
	</body>
</html>

