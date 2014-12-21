<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ page import="com.spacetimeinsight.stas.config.GenericConfigurationManager,com.enterprisehorizons.magma.config.dbadmin.ModelConfigConstants" %>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>

<html>
<head>
<%@ include file="/common/dojo.jsp"%>

<script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/dojo/dojo.js" djConfig="isDebug: false, parseOnLoad: true"></script>

<script type="text/javascript" src="js/jobs.js"></script>
<script type="text/javascript" src="js/windows.js"></script>
<script type="text/javascript" src="js/ecoweb.js"></script>
<script type="text/javascript">
            dojo.require("dijit.layout.ContentPane");
            dojo.require("dijit.form.Button");
            dojo.require("dojox.xml.parser");  
			 var divarray=[];
</script>
<script>
function submitHandler(){
	callselectAll('combobox2');
}

var actionsubmit ;
 function submitForm(btn) {
	 if(btn.name=="btnBack")
		 		actionsubmit="<%=ServerUtils.getContextName(request)%>/dbaAdminSecurity.do";
             else
			actionsubmit="<%=ServerUtils.getContextName(request)%>/adminMain.do";


	if(checkMultiBoxValue())
		dodelete();
    }


function dodelete(){
	document.forms[0].action = actionsubmit;
 document.forms[0].submit();
}

	function checkMultiBoxValue(){
		 var  flag= false;
	     var LstRight = document.getElementById("combobox2");        
           
            if(LstRight.length != divarray.length)
				{
	        confirmationDialog("<bean:message key='dbconfig.msg.alert'/>");
		        return false;
                 }
else{
	 for (i=0; i<divarray.length; i++){
		   for (j=0; j<LstRight.length; j++){
			  // alert(divarray[i].divlist +".............."+LstRight.options[j].value+"....i"+i+"....j"+j)
		        if(divarray[i].divlist == LstRight.options[j].value){
		          flag = true;
		           break;
		            }
		   }
		    if(!flag){
	         confirmationDialog("<bean:message key='dbconfig.msg.alert'/>");
            return false;
		    }
       flag = false;
	 }

}
 return true;
	}


  </script>
<script type="text/javascript">

  var searchInputPressed=false;
  
  function onEnterKey(event) { 
    if (event.keyCode == 13) {   
       search();
	   searchInputPressed=true;
    }
}
 
function search()
{ 
 loadData("searchGroup",document.getElementById("searchString"),loadCombo,null);
}
function loadCombo()
{ if(xmlhttpGetMsg.readyState ==4 && xmlhttpGetMsg.status == 200){
 var errorDiv = document.getElementById("statusMessage");
 errorDiv.style.display="none";
  var index=0; 
        var groupCombo=document.getElementById("combobox1");
	groupCombo.options.length=0;
        dojo.query("group", xmlhttpGetMsg.responseXML).forEach(function(node, index, nodeList) {
	groupCombo.options[index]=new Option(node.firstChild.nodeValue,node.firstChild.nodeValue);
        index++;
});

} 
}

function onFormSubmit( ) {
  var flag=false;
  if(searchInputPressed==false) {
    flag=true; 
  } else {
	flag=false;
	searchInputPressed=false;
  }
  
  return flag;
}

</script>
 </head>     
<body class="tundra bodybg" >
<form method="post"  id='modelForm' dojoType="dijit.form.Form"  name='modelForm' onSubmit="return onFormSubmit()" action="<%=ServerUtils.getContextName(request)%>/manageADGroup.do" >
	<input type="hidden" id="csrf" name="csrf" value="${csrf}">
	<table width="100%" cellspacing="0" cellpadding="0" border="0" >
    	<tr>
        	<td>
            	<table width="100%" border="0">
               		<tr height="20">
                		<td>&nbsp;</td>
                	</tr>
					<tr>
                		<td class="pageTitle" style="padding-left:30px;">
                   			<bean:message key="dbconfig.title.label.impGroup"/>
                		</td>
            		</tr>
            		<tr>
               			<td class="paddingTitleDesc;" style="padding-left:30px;">
                 			<strong><bean:message key="dbconfig.msg.label.grpSync"/></strong>
                		</td>
            		</tr>
           			<tr height="20">
                		<td>&nbsp;</td>
                	</tr>
					<tr>
                 		<td style="padding-left:30px; width:800px;">
                        	<div id="statusMessage">
                            	<font color="blue" style="font-family: Tahoma; font-size:12px;">
                                	<b>
                                    	<html:messages id="saveStatus" message="true"><bean:write name="saveStatus" /></html:messages>
                                    </b>
                             	</font>
                              	<font color="red" style="font-family: Tahoma;font-size: 12px;"><b><html:errors /></b></font>
							</div>
                		</td>
            		</tr>
					<tr>
                    	<td style="padding-left:30px" align="left">
							<table cellspacing="0" cellpadding="0" border="0" align="left">
								<tr>
									<td align="left" colspan="3">
                                    	<table>
                                        	<tr>
                                            	<td><input type="text"  id="searchString" name="searchString" class="medium" style="height:1.7em;width=240px;" ucfirst="true" autocomplete="off" onKeyDown="onEnterKey(event)" /></td>
                                                <td valign="middle" align="left"><img alt="" src="<%=ServerUtils.getContextName(request)%>/images/portal/search.png"  onclick="search()"  id="shift2" style="display:block;cursor:pointer" /></td>
                                            </tr>
                                        </table>         
                     				</td>
                            	</tr>
								<tr>	
                                    <td align="left">
                                        <table width="100%" cellpadding="0" cellspacing="" border="0" style="padding-top:10px" >
                                            <tr><td align="left" width="100%"><label class="label"><label class="label"><bean:message key="dbconfig.msg.label.avlgrp"/></label></label><font style="font-weight: normal;" ><b>:</b></font></td>
                                            </tr>
                                                
                                            <tr>
                                            	<td align="left" nowrap="nowrap" >
                                                	
                                                    <select id="combobox1" multiple name="combobox1" autocomplete="off" size="10" ondblclick="return MoveItems('R', 0);" style="width:400px">
                                                 		<logic:present name="groupList" scope="request">
                                                        <logic:iterate name="groupList" id="groupList">
                                                        <option value='<bean:write name="groupList"/>'><bean:write name="groupList" /></option>
                                                        </logic:iterate>
                                                        </logic:present>
                                             		</select>
                                            	</td>
                              				</tr>
                                		</table>
									</td>
									<td valign="middle">
                                    	<table>
                                        	<tr>
                                            	<td><img alt="" src="<%=ServerUtils.getContextName(request)%>/images/portal/btn_move_right_one.png"  onclick="return MoveItems('R', 0);"  id="shift2" style="display:block;cursor:pointer" /></td>
											</tr>
                                            <tr>
                                            	<td><img alt="" src="<%=ServerUtils.getContextName(request)%>/images/portal/btn_move_left_one.png"  onclick="MoveItems('L', 0);"  id="shift2" style="display:block;cursor:pointer" /></td>
                                         	</tr>
										</table>
                                	</td>
                                    <td align="left">
                                    	<table width="100%" cellpadding="0" cellspacing="" border="0" style="padding-top:10px" >
                                            <tr><td><label class="label"><label class="label"><bean:message key="dbconfig.msg.label.selgrp"/></label></label><font style="font-weight: normal;" ><b>:</b></font></td><tr>
                                            <tr>
                                                <td align="left" nowrap="nowrap" >
                                                    <select id="combobox2" multiple name="combobox2" autocomplete="off" size="10" ondblclick="return MoveItems('L', 0);" style="width:400px">
                                                        <logic:present name="selLdapGroupList" scope="request">
                                                        <logic:iterate name="selLdapGroupList" id="selLdapGroupList">
                                                        <script>
                                                                var value = '<bean:write name="selLdapGroupList"/>';
                                                                divarray.push({divlist: value});
                                                        </script>
                                                        <option value='<bean:write name="selLdapGroupList"/>'>
                                                        <bean:write name="selLdapGroupList" /></option>
                                                        </logic:iterate>
                                                        </logic:present>
                                                    </select>
                                                </td>
                                            </tr>
                                        </table> 		
									</td>
								</tr>
							</table>
						</td>
                 	</tr>
					<tr height="30px">
						<td>&nbsp;</td>
					</tr>
					<tr class="barColor">
						<td align="center">
                            <button dojoType="dijit.form.Button" type="button" onClick="return submitForm(this)"><bean:message key="dbconfig.home" /> </button>
                            <button dojoType="dijit.form.Button"  id="idBack" name="btnBack" type="button" onClick="return submitForm(this)"> <bean:message key="dbconfig.back" /> </button>
                            <button dojoType="dijit.form.Button" type="submit" id='submitBtn' onClick="submitHandler()" > <bean:message key="dbconfig.save" /> </button>
                            <button dojoType="dijit.form.Button" type="reset" id='resetBtn' onClick= "resetHandler()"> <bean:message key="dbconfig.reset" />  </button>
						</td>
					</tr>
					<input type="hidden" name="fromto" id="fromto" value="ldapgroups"/>
                    <input type="hidden" name="operation" id="operation" value=""/>
				</table>
			</td>
		</tr>
   	</table>
</form>

<script>
 function resetHandler(){
	window.location='<%=ServerUtils.getContextName(request)%>/manageADGroup.do'; 
	//resetComboBoxes();
 }



</script>
         

</body>
</html>