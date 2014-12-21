<%@ page import=" com.enterprisehorizons.magma.config.dbadmin.*" %>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ page import="org.owasp.esapi.ESAPI" %>  
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>

<%@ taglib uri="/WEB-INF/Model.tld" prefix="model"%>
<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>

 <% 
   boolean fromHeader=false;
   if(request.getParameter("fromHeader")!=null && "true".equalsIgnoreCase(request.getParameter("fromHeader"))) {
       fromHeader=true;
   }
%>

<html:html locale="true">

<head>
<%@ include file="/common/dojo.jsp" %>


<style>
   
    @import "<%=ServerUtils.getContextName(request)%>/js/dojo/resources/dojo.css";
            @import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/tundra/tundra.css";
            @import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/tundra/tundra_rtl.css";
            @import "<%=ServerUtils.getContextName(request)%>/js/dijit/tests/css/dijitTests.css";
            @import "<%=ServerUtils.getContextName(request)%>/js/dojox/form/resources/FileInput.css"; 
            @import "<%=ServerUtils.getContextName(request)%>/css/style.css";

       body .txtareamedium {
        width: 15em;
        height: 5em;
       }
        
        .bgcolor {
              BACKGROUND-COLOR:  
        }

</style>
 

<title><bean:message key="dbconfig.model.update.title"/></title>


   <script type="text/javascript">
    var selectObjectArray = [];
   var textBoxArray = [];
   
function loadFormValues(){

                //  dijit.byId('submitBtn').setAttribute('disabled', true);
                }


                function submitHdlr()
                {  
                    if(!dijit.byId("modelForm").validate())
                      return false;

                  var obj = dojo.byId("submitBtn");
                   if(obj != null)
                  {
                   if(!validateForm(obj))
                   {   
                   return false;
                   }
                }
                
        
    if(dijit.byId("modelForm").validate()){
        document.forms[0].submit();
    }
     //dijit.byId("modelForm").submit();

}
 
   function resetHdlr(){
      dijit.byId("modelForm").reset();            
   }
    
   function loader(){
     dojo.connect(dojo.byId("resetBtn"), 'onclick', resetHdlr);  
      dojo.connect(dojo.byId("submitBtn"), 'onclick', submitHdlr);   
        
   }
     
   dojo.addOnLoad(loader); // Execute on load      
      
   </script>
        
   <script>
   function submitForm(btn) {    
               if(btn.id == 'idBack'){ 
                   document.forms[0].viewSubmitName.value=btn.name;
		          document.forms[0].action="./masterTableHistoryAction.do";
		          var flag = "true"
		          if(flag){
		              document.forms[0].submit();
        
               	}	}       
   }
        function closeWindow(){
            window.close();
        }

        function gotoBack() {
            //document.forms[0].action="./masterMaintenanceHomeAction.do";
           
            document.forms[0].action="./masterTableHistoryAction.do";
            document.forms[0].submit();
        }
var allObjects = new Array();
var i=0;
        function imposeMaxLength(Object, MaxLen){
            
			var str=Object.name;
			var substr1=str.substr(0,1);
			var substr2=str.substr(1,str.length-1);
			substr1= substr1.toUpperCase();
			substr2= substr2.toLowerCase();
			str=substr1+substr2; 
				
            if(Object.attr('value').length > MaxLen ){
                 allObjects[i++] = Object;
                 dijit.byId('submitBtn').setAttribute('disabled', true);
                 document.getElementById('validateResult').innerHTML = str+ " <bean:message key="dbconfig.check.chr.len"/> "+ MaxLen;
            }else{
                dijit.byId('submitBtn').setAttribute('disabled', false);
                document.getElementById('validateResult').innerHTML = "&nbsp;";
            }
            
            return (Object.value.length <= MaxLen);

        }           </script>
</head>

<body class="tundra bodybg">
<form name="frmCache" id='modelForm' name='modelForm' dojoType='dijit.form.Form' method="post" action="<%=ServerUtils.getContextName(request)%>/modelModifyRestoreAction.do">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">
<input type="hidden" name="fromHeader" value="<%=fromHeader%>"> </input>
<html:hidden property="viewSubmitName"  value="" />
<table width="101.2%" cellspacing="0" cellpadding="0" align="center"   >
<tr>
<td class="pageTitle paddingTitle">
   <table width="100%" >          
    <tr>     
           <td height="60px" align="left" valign="top"  class="redtitle"><strong class="pageTitle paddingTitle" style="padding-left:0px"><bean:message key="dbconfig.update.header"/> <%= session.getAttribute(ModelConfigConstants.DISPLAY_MODEL_NAME) %><br />
                 <span class="paddingTextDesc bodytext"><bean:message key="dbconfig.createupdate.description"/>
                 <bean:message key="dbconfig.update.header.lower"/>
                 <%= ( ( session.getAttribute(ModelConfigConstants.DISPLAY_MODEL_NAME)  != null ) ? ( (String)session.getAttribute(ModelConfigConstants.DISPLAY_MODEL_NAME) ).toLowerCase() : "" ) %></span></strong>
            </td>    
            <td >&nbsp;</td>                 
    </tr>   
    <tr>
    
    <td>
         <span id="ctl00_mainbody_lblError" class="error"><html:errors/></span><br/><div id="validateResult" class="error">&nbsp;</div><br/>
    
        <table  id="table2" height="54" cellspacing="2" cellpadding="2">
            <tr>
                <td height="27" align="left" style="width: 227px">
                    <table width="500" class="lfr-table">
                        <tbody>

                            
                            <tr>
                                <td   class="error" align="left" height="13" id="validateResult">&nbsp;      
                                     
                                </td>
                            </tr>

                            <tr>
                                <td  >
                                <model:Render renderMode="Update" requestScopedModelName="model" themeName="classic" 
                                createAction=" <%=ServerUtils.getContextName(request)%>/modelModifyRestoreAction.do" />
                                </td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            


                        </tbody>
                    </table>
                </td>
            </tr>
        </table>
    </td>
    <td>&nbsp;</td>
    </tr>      
</table>
</td>
</tr>
<tr align = "right" class="barColor"> 
        <td width="600">
            <%if(request.getParameter("fromHeader")==null || "false".equalsIgnoreCase(request.getParameter("fromHeader"))){%>
               <button dojoType="dijit.form.Button" type="button" onClick="window.location ='<%=ServerUtils.getContextName(request)%>/adminMain.do'"> <bean:message key="dbconfig.home" /> </button>
            <%}else{%>
	       <button dojoType="dijit.form.Button" type="button" onClick="window.location ='<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/masterMaintenanceHomeAction.do?fromHeader=<%=ESAPI.encoder().encodeForHTML(request.getParameter("fromHeader"))%>'"> <bean:message key="dbconfig.home" /> </button>
            <%} %>
            <button dojoType="dijit.form.Button" type="button" id="idBack" name="btnBackHist" onClick="return submitForm(this)">  <bean:message key="dbconfig.back" /> </button>
            <button dojoType="dijit.form.Button" type="button" id='submitBtn' > <bean:message key="dbconfig.save" /> </button>
            <button dojoType="dijit.form.Button" type="reset" id='resetBtn' onClick="doreset()"> <bean:message key="dbconfig.reset" /> </button>
            <% if("Users".equals((String)session.getAttribute(ModelConfigConstants.DISPLAY_MODEL_NAME) )) { %>
             <button dojoType="dijit.form.Button" type="chpwd" id='chpwd' onClick="doChangePassword()"> <bean:message key="dbconfig.update.changepassword"/></button>
       <%}%>
        </td>
</tr>
</table>

<script>
      function validateForm(Object){
                for(k=0; k<textBoxArray.length;k++){

                    if(document.getElementById(textBoxArray[k].name).name == 'loginId'){

                    var  isValidLogin = validateUserId(document.getElementById('loginId').value);
                      if(!isValidLogin){
                         return false; 
                            }

                if(!validatepasswordsplChar()){
                showEmptyDialog("Password should not contain  special character like ~ atleast one character should be different", "<%= session.getAttribute(ModelConfigConstants.DISPLAY_MODEL_NAME) %>");
                return false;  
                }
				
				if(dojo.byId('confPass')!=null){
	                if(dojo.byId('password').value != dojo.byId('confPass').value){
	                showEmptyDialog("<bean:message key="dbconfig.check.passconf"/>", "<%= session.getAttribute(ModelConfigConstants.DISPLAY_MODEL_NAME) %>");
	                return false;
	                }
                }
                if(!validatepasswordLen()) {
                showEmptyDialog("<bean:message key="dbconfig.check.passlen"/>", "<%= session.getAttribute(ModelConfigConstants.DISPLAY_MODEL_NAME) %>");
                return false;
                }


                if(!validatePhoneNum()){
                showEmptyDialog("<bean:message key="dbcofig.check.phone"/>", "<%= session.getAttribute(ModelConfigConstants.DISPLAY_MODEL_NAME) %>");
                return false;  
                }

                if(!validatezipCode()){
                    return false;  
                }

                
                }
                else{
                    if(document.getElementById(textBoxArray[k].name).name == 'serverPort'){
                        if(!validateIP())
                        {   showEmptyDialog("Server IP should contain integers and . only", "<%= session.getAttribute(ModelConfigConstants.DISPLAY_MODEL_NAME) %>");
                            return false; 
                        }
                        if(!validateIPFormat())
                        {   showEmptyDialog("Server IP should have value between 0.0.0.0 and 255.255.255.255", "<%= session.getAttribute(ModelConfigConstants.DISPLAY_MODEL_NAME) %>");
                            return false; 
                        }
                        if(!validateName()){
                         showEmptyDialog("Server name should contain alphabets, numbers and underscore( _ ) only", "<%= session.getAttribute(ModelConfigConstants.DISPLAY_MODEL_NAME) %>");
                            return false;  
                            }
                        
                        if(!validatePort() || !validatePortLen()){
                            showEmptyDialog("Server port should contain 0-4 digit numeric value only", "<%= session.getAttribute(ModelConfigConstants.DISPLAY_MODEL_NAME) %>");
                            return false;  
                            }
                        
                    }
                    else {
                        if(document.getElementById(textBoxArray[k].name).name == 'zipCode'){ 
                            if(!validatezipCode()){
                            return false;  
                            }
                        }
                else{           

                /*if(!validateSplOnTxtBox(dijit.byId(textBoxArray[k].name).attr('value'))){
                return false; 
                }
                */
                }
                }
                }
                }     
                
                for(m=0; m<selectObjectArray.length;m++){
                fieldName = selectObjectArray[m].displayLabel;
                if(dijit.byId(selectObjectArray[m].name).attr('value') != 'undefined' && dijit.byId(selectObjectArray[m].name).attr('value') == "" )
                 {
                showEmptyDialog("<bean:message key="dbconfig.validation.msg.emptyfield"/>", "<%= session.getAttribute(ModelConfigConstants.DISPLAY_MODEL_NAME) %>");
                return false;
                }               
                }
                
                return true;
                }
            
    
    function doChangePassword(){
        var password = dijit.byId('password').value ;
        var confPass = dijit.byId('confPass').value;
        dijit.byId('confPass').setAttribute('value',"");
        dijit.byId('password').setAttribute('value', "");
        dijit.byId('confPass').setAttribute("readOnly", "");
        dijit.byId('password').setAttribute('readOnly', '');
        dijit.byId('password').focus();


    }
    function doreset(){
        <% if("Users".equals((String)session.getAttribute(ModelConfigConstants.DISPLAY_MODEL_NAME) )){  %>

        dijit.byId('confPass').setAttribute("readOnly", "readOnly");
        dijit.byId('password').setAttribute('readOnly', 'readOnly');
        <%}%>
		dijit.byId('submitBtn').setAttribute('disabled', false);
        document.getElementById('validateResult').innerHTML = "&nbsp;";
    }
      
function validatepasswordLen() {
                if(dojo.byId('password')==null) {
                return true;
                }
                var passLength =  dojo.byId('password').value.length;
                if(PASS_MINIMUM !="" && PASS_MAX !=""){
                if(passLength<6 || passLength >20)
                return false;
                else 
                return true;
                }
                return true;
                }
  

  
function validatepasswordsplChar() {
    
    if(!checkValidPassword(dijit.byId('password').value,dojo.byId('virtualPassword').value,false,true)){        
        return false;
    }



return validatePassword(dojo.byId('password').value,dojo.byId('password').value.length);


} 

function isSplCharInLogin(str){

  return true;             }

  
    function validatePhoneNum() {
    if(dijit.byId('phoneNo').value != ''){
    

    if(!validatePhoneNumber(dijit.byId('phoneNo').value)){

    return false;
    }
    }
    return true;
    }

    function validatezipCode() {
        
        if(dijit.byId('zipCode').value != ''){
            if(!validateZipCode(dijit.byId('zipCode').value)){
                return false;
            }
        }
        return true;
    }

                function validateName() {
                    if(dijit.byId('serverName').value != ''){


                    if(!validateServerName(dijit.byId('serverName').value)){

                    return false;
                    }
                    
                    return true;
                    }}
                    
                function validatePort() {
                    if(dijit.byId('serverPort').value != ''){


                    if(!validateServerPort(dijit.byId('serverPort').value)){

                    return false;
                    }
                   
                    return true;
                    }
                }
                    
                    
                function validateIP() {
                    if(dijit.byId('serverIP').value != ''){


                    if(!validateServerIP(dijit.byId('serverIP').value)){

                    return false;
                    }
                    
                    return true;
                    }}

                function validateIPFormat() {
                    if(dijit.byId('serverIP').value != ''){
                        var ip= dijit.byId('serverIP').value;
                        var iparr = new Array();
                        iparr = ip.split('.');
                        if(iparr.length == 4){
                            for(var i =0;i<4;i++){ 
                                if(iparr[i] != '')
                                { 
                                    if (iparr[i]<0 || iparr[i]>255){
                                        return false;
                                    }
                                }
                                else{
                                    return false;
                                }
                            }
                            return true;
                        }
                        else{   
                            return false;
                        }

                    }
                    return false;
                    }

                    function validatePortLen(){
                        if(dijit.byId('serverPort').value < 0  || dijit.byId('serverPort').value > 9999)
                        {   
                            return false;
                        }
                        return true;
                    }


</script>
</body>
</html:html>