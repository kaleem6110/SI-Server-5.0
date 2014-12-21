<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@page import="com.enterprisehorizons.magma.ecoweb.upload.common.Constants"%>
<html:html locale="true">
<head>
<body>
     
    <%
        String headerOption[]= (String[])request.getAttribute(Constants.KEY_HEADER_LIST);
		
		 
    %>
 <script type="text/javascript" src="js/dojo/dojo.js"
	djConfig="isDebug: false, parseOnLoad: true"></script>

<script type="text/javascript" src="js/dojox/form/FileInput.js"></script>
<script type="text/javascript"
	src="js/dojox/form/FileInputAuto.js"></script>

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

		
</script> 
 <script>
 
     function setHeaderNameHTML() {
  
       var options1=new Array(); //
       var excelIds = [];
	  
	   
       //excelIds.push({value:  "", label: "-- select --"});
       
            
         parent.showStatus('File Uploading....');
      <%
          for(int index=0;index<headerOption.length;index++) {
		  
       %>
         var excelData = '<%=headerOption[index]%>';
	  
         excelIds.push({value: excelData+"" , label: excelData});

       <%
       }
     %>      
		   var excellist = {identifier:"value",items:[{value:"",label:""}]};
		  var excelstore=  new dojo.data.ItemFileReadStore({data: excellist});
                excellist = {identifier:"value",items:excelIds};
                excelstore=  new dojo.data.ItemFileReadStore({data: excellist});
                  parent.dijit.byId("excelName").store = excelstore;
				   parent.dijit.byId("excelLatitude").store = excelstore; 
				   parent.dijit.byId("excelLongitude").store = excelstore;
				    parent.dijit.byId("excelCoordinates").store = excelstore;
      //parent.fillDropDown(options1);    
      parent.showStatus('<font color=red><b><bean:message key="datasource.excelfile.upload.successful" bundle="ecoweb"/></b></font>');
     
          
    }                         
    <%if(headerOption != null && headerOption.length != 0){%>

		     
			 parent.dijit.byId('excelName').setAttribute('disabled', false);
		 parent.dijit.byId('excelLongitude').setAttribute('disabled', false);
			 parent.dijit.byId('excelLatitude').setAttribute('disabled', false);
			 parent.dijit.byId('excelCoordinates').setAttribute('disabled', false);

 <%
	}%>
    setHeaderNameHTML();

 </script>
  
 </body>
 </html:html>
