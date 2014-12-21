 <%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="java.util.List"%>
<%@page import="com.enterprisehorizons.magma.config.utils.MagmaDBUtils"%>
<%@page import="com.spacetimeinsight.db.config.model.EcoexpmlCategory"%>
<%@page import="java.util.Iterator"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.io.PrintWriter"%>
<html:html locale="true">

<%
        response.setHeader("Cache-Control", "no-cache"); // HTTP 1.1
		response.setHeader("Pragma", "no-cache"); // HTTP 1.0
		response.setDateHeader("Expires", 0); // prevents caching at the proxy
%>



<head>
<meta http-equiv="Cache-Control" content="no-cache">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
<link href="css/style.css" rel="stylesheet" type="text/css" />
<%@ include file="/common/dojo.jsp" %>

<script language="JavaScript" type="text/javascript">
  dojo.require("dojo.data.ItemFileReadStore");
  dojo.require("dijit.Tree");   
  dojo.require("dijit.Menu");
  dojo.require("dijit.Dialog");
  dojo.require("dijit.form.Button");
  dojo.require("dijit.form.TextBox");
  dojo.require("dojo.parser");  // scan page for widgets and instantiate them
</script>

 <script>
 
    var globalSelectedId=null;	
	var selectedItem=null;
	
	function getSelectedNode() {
	  var selectedId=null;
	  if(selectedItem!=null) {
		  var selectedId=categoryStore.getValues(selectedItem.item,"idValue");		  
	  } 
	  return selectedId;
	}
	
     function addCategory() {
          	
	   if(isValidSelection()==false) {
	      showEmptyDialog('Please select parent Category !!','Alert');		 
		  return;
       }
	   
	   var selectedId=getSelectedNode();
	   
       if(selectedId==null) {
	      showEmptyDialog("No node is selected","Alert");
	   } else {
	      dijit.byId('catDialog').show();  
	   }
	}
	
	function trimText(txt) {
	  if(txt!=null) {
	    return txt.replace(" ","");
	  }
	  return "";
	}
	
	function validateCategory(e) 
    {
        var keynum;        
		var numcheck;
		
		if(window.event) // IE
		  {
		     keynum = e.keyCode;
		  }
		else if(e.which) // Netscape/Firefox/Opera
		  {
		     keynum = e.which;
		  }
		  
	    if(keynum==13) {
		   addNewCategory();
		   return false;
        } else {
           return true; 
        }			
    }

	
    function addNewCategory() {		  
	   var categoryName=document.getElementById("ecoCategory").value;
	   if(trimText(categoryName)=="") {
	       showEmptyDialog('Please enter category first !!','Alert');		   
		   return false;
	   }	
	   re = /^[A-Za-z0-9 ]{1,100}$/;

	   if(!re.test(categoryName)){
		   showEmptyDialog('Please enter valid values','Alert');		   
		   return false;
	   }
	   document.forms[0].operation.value="addCategory";	
	   document.forms[0].domainId.value=parent.getDomainIdValue();
	   document.forms[0].groupId.value=parent.getDropDownSelected("selectedRole");
	   document.forms[0].moduleId.value=parent.getDropDownSelected("mapModule");	   
	   document.forms[0].pId.value=categoryStore.getValues(selectedItem.item,"idValue");	   
       document.forms[0].submit();	   	    	    
    }
	
	function cancelAddCategory() {
	    dijit.byId('catDialog').hide();
	}
	
	function selectCategory() {
	    if(isValidSelection()==false) { 
	      showEmptyDialog('Please select a Category !!','Alert');		 
		  return;
        }
        
	    var id=categoryStore.getValues(selectedItem.item,"idValue");
	    
	    if(id=='0')	{
		  showEmptyDialog('This parent node cannot be selected !!','Alert');		 
		  return;
		}
		
		var value=categoryStore.getValues(selectedItem.item,"name");		 
        parent.setCategory(id,value);
        parent.hideManager();  		
	}
	
	function isValidSelection() {
	  return selectedItem.item!=null;
	}
	
	function deleteCategory() {
	   if(isValidSelection()==false) {
	      showEmptyDialog('Please select a Category !!','Alert');		 
		  return;
       }
	   document.forms[0].operation.value="deleteCategory";		  
	   document.forms[0].pId.value=categoryStore.getValues(selectedItem.item,"idValue");	
	   document.forms[0].submit();
    }
    	
	function showConfirmationBox(){	 
      if(isValidSelection()==false) {
	      showEmptyDialog('Please select a category for deletion!!','Alert');		 
		  return;
      }		
      var id=categoryStore.getValues(selectedItem.item,"idValue");
	   if(id=='0') {	
		  showEmptyDialog('This parent node not be deleted !!','Alert');		 
		  return;
	   }	 
	  document.getElementById("selectedCategory").innerHTML=categoryStore.getValues(selectedItem.item,"name");
      dijit.byId('confirmDialog').show(); 		
	}
	
 </script>
 
</head>
  
<body  class="tundra" height='500px' width='500px' >

<b>&nbsp; Right click on a node to manage categories. </b> <br>  

<!--
  Define the data source that reads from a JSON file.
-->
<div dojoType="dojo.data.ItemFileReadStore" jsId="categoryStore" 

  url="<%=ServerUtils.getContextName(request)%>/categoryManagerAction.do?operation=getTree"> </div>

<!--
  Define the menu that will pop up
-->

<ul dojoType="dijit.Menu" id="tree_menu" style="display: none;">
  <li dojoType="dijit.MenuItem" iconClass="dijitEditorIcon dijitEditorIconPaste"
    onClick="addCategory()"><bean:message key='category.menu.add' bundle='GroupMapping'/></li> 
  <li dojoType="dijit.MenuItem" iconClass="dijitEditorIcon dijitEditorIconCut"
    onClick="showConfirmationBox()"><bean:message key='category.menu.delete' bundle='GroupMapping'/></li> 
  <li dojoType="dijit.MenuItem" iconClass="dijitEditorIcon dijitEditorIconCopy"
    onClick="selectCategory()"><bean:message key='category.menu.select' bundle='GroupMapping'/></li>	
</ul>
 
<!--
  Define the tree, tell it to populate itself from the data store 'categoryStore'
-->

<div dojoType="dijit.Tree" id="categoryTree" store="categoryStore" style="width:430px; height:360px; overflow:auto;" query="{type:'level0'}">
  <script type="dojo/connect">
    var menu = dijit.byId("tree_menu");
    // when we right-click anywhere on the tree, make sure we open the menu
    menu.bindDomNode(this.domNode);
    dojo.connect(menu, "_openMyself", this, function(e){
      // get a hold of, and log out, the tree node that was the source of this open event
      var tn =  dijit.getEnclosingWidget(e.target); 
      console.debug(tn);
      // now inspect the data store item that backs the tree node:
      console.debug(tn.item);
      // contrived condition: if this tree node doesn't have any children, disable all of the menu items
      // menu.getChildren().forEach(function(i){ i.setDisabled(!tn.item.children); });      	 
      selectedItem=tn;        
    });
	dojo.byId("catDialog").style.display="" ;
  </script>
</div>
  <br>  
 <table  width="100%"	><tr><td align="right">
 <button  dojoType="dijit.form.Button" onClick="parent.resetCategory()" type="button">Reset</button>
 <button  dojoType="dijit.form.Button" onClick="parent.hideManager()" type="button"><bean:message key='category.dialog.close' bundle='GroupMapping'/></button>
</td></tr></table>
 <div dojoType="dijit.Dialog" id="catDialog" title="<bean:message key='category.button.add' bundle='GroupMapping'/>" style="display:none">
 <form action="<%=ServerUtils.getContextName(request)%>/categoryManagerAction.do" method="post">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">
 
 <input type="hidden" name="operation"/>  
 <input type="hidden" name="pId" />
 <input type="hidden" name="groupId"/>
 <input type="hidden" name="moduleId"/>
 <input type="hidden" name="domainId"/>
 
<table>
 <tr>
 <td>Category Name</td>
  <td><input type="text" name="ecoCategory" id="ecoCategory" autocomplete="off" onkeyPress="return validateCategory(event)"/></td>
 </tr>
 <tr>
 <td>&nbsp;</td>
 <td align="left">
     <button dojoType="dijit.form.Button" onClick="addNewCategory()" type="button"><bean:message key='category.button.add' bundle='GroupMapping'/></button>
	 <button dojoType="dijit.form.Button" onClick="cancelAddCategory()" type="button"><bean:message key='category.button.cancel' bundle='GroupMapping'/></button>  
	 </td>
 </tr>
 </table>
 </form>  
</div>

 <div dojoType="dijit.Dialog" id="confirmDialog" title="<bean:message key='category.deletion.header' bundle='GroupMapping'/>" style="display:none">
 <table>
 <tr align="left">
 <td>&nbsp;</td>
 <td>Category Name : </td>
  <td ><b><span id="selectedCategory"/></b></td>
 </tr>
 <tr>
 <td>&nbsp;</td>
 <td>&nbsp;</td>
 </tr>
 
 <tr>
 <td>&nbsp;</td>
 <td align="left">
     <button dojoType="dijit.form.Button" onClick="deleteCategory()" type="button"><bean:message key='category.button.delete' bundle='GroupMapping'/> </button>
	 <button dojoType="dijit.form.Button" onClick="dijit.byId('confirmDialog').hide()" type="button"><bean:message key='category.button.cancel' bundle='GroupMapping'/></button>  
	 </td>
 </tr>
 </table>
 </form>  
</div>


</body>

  
</html:html>