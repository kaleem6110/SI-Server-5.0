<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="java.util.*"%>
<%@ page import="org.owasp.esapi.ESAPI" %>
<%@ include file="/common/dojo.jsp" %>
<%List severityList = (List)request.getAttribute("severityList");%>
<html:html locale="true">
<head>
    <style>
   

        body .txtareamedium {
            width: 25em;
            height: 5em;
        }

    </style>
    <script>
     function hover(obj){
        obj.className='class_hover';
    }

    function unHover(obj, row_num){
        if (tr_selected != row_num) obj.className = 'class_no_hover bgcolor';

    }

    function previousPage(){
        var pageNo = document.getElementById("pageNo").value;

        if(parseInt(pageNo)>1){
            document.forms[0].pageNo.value = (parseInt(pageNo)-1);
            document.forms[0].operation.value='displayLogs';
            document.forms[0].action="./displayLogAction.do";
            document.forms[0].submit();
        }
    }


    function nextPage(){
        var pageNo = document.getElementById("pageNo").value;
        var totalNoOfPages = document.getElementById("totalNoOfPages").value;
        if(parseInt(pageNo)<totalNoOfPages){
            document.forms[0].pageNo.value = (parseInt(pageNo)+1);
            document.forms[0].operation.value='displayLogs';
            document.forms[0].action="./displayLogAction.do";
            document.forms[0].submit();
        }
    }

    function gotoPage(pageNo){
            document.forms[0].pageNo.value = pageNo;
            document.forms[0].operation.value='displayLogs';
            document.forms[0].action="./displayLogAction.do";
            document.forms[0].submit();
    }

    function onEnterGoToPage(){
        if(window.event.keyCode==13){ 
            var pageNo = document.getElementById("enteredPageNo").value;
            var totalNoOfPages = document.getElementById("totalNoOfPages").value;
            if(parseInt(pageNo)>=1 && parseInt(pageNo)<=totalNoOfPages){
                document.forms[0].pageNo.value = pageNo;
                document.forms[0].operation.value='displayLogs';
                document.forms[0].action="./displayLogAction.do";
                document.forms[0].submit();
            }       
        }
    }
    var tr_selected = '';
    </script>
    <script type="text/javascript" src="js/windows.js"></script>
    <script type="text/JavaScript">

        function goToDBHomePage(){
            window.location = "<%=ServerUtils.getContextName(request)%>/adminMain.do";
        }
    </script>
</head>

<body onLoad='' class="tundra bodybg">
<form name="logs" action="displayLogAction.do?operation=displayLogs" method="POST">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">

<table width="97%" cellspacing="0" cellpadding="0" align="center"  border="0">        
        <tr>
            <td style="padding-left:67px;padding-top:37px;" class="pageTitle paddingTitle">      
                <bean:message key="staslog.staslogs" bundle="staslog"/>
            </td>
        </tr>
              
        <tr>
            <td class="paddingTitleDesc" style="width:700px">
                <strong> <bean:message key="staslog.description" bundle="staslog"/> </strong>                 
            </td>  
        </tr>
        <tr>
            <td style="padding-left:65px;padding-top:40px">
                <table id="table2" height="54" cellspacing="0" cellpadding="0">
                    <tr>
                        <td>                    
                            <table  border="0">
                                    <tr>
                                        <td style="width:140px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <label class="label"><bean:message key="staslog.startdate" bundle="staslog"/></label>
                                            <label class="error"><bean:message key="staslog.star" bundle="staslog"/></label>
                                            <label class="label"><bean:message key="staslog.colon" bundle="staslog"/></label>
                                        </td>
                                        <td style="padding-left:10px;align:left;valign:middle;" style="width:90px;" valign="middle">
                                            <div id="dateDiv" >
                                                <input id="startDate" type="text" name="startDate" autocomplete="off" style="width:194px;height:1.7em;" dojoType="dijit.form.DateTextBox" trim="true"  promptMessage="mm/dd/yyyy" onChange="dojo.byId('calendarDiv').innertHTML=arguments[0];" invalidMessage="Invalid date. Use mm/dd/yyyy format."  value="<logic:present name="resultset" scope="request" ><bean:write name="resultBean" property="startDate"/></logic:present>"/>
                                                <font size="1">&nbsp;<label><bean:message key="staslog.dateformat" bundle="staslog"/></label></font>
                                            </div>
                                            <div id="calendarDiv"  style="position:absolute;z-index:100;display:none; top:176px; left:600px; width:200; height:200; border:2px solid #EAEAEA;background-color:blue;opacity:1;">
                                            </div>
                                        </td>
                                        
                                        <td style="width:140px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <label class="label"><bean:message key="staslog.enddate" bundle="staslog"/></label>
                                            <label class="error"><bean:message key="staslog.star" bundle="staslog"/></label>
                                            <label class="label"><bean:message key="staslog.colon" bundle="staslog"/></label>
                                        </td>
                                        <td style="padding-left:10px;align:left;valign:middle;" style="width:90px;" valign="middle">
                                            <div id="dateDiv" >
                                            <input id="endDate" type="text" name="endDate" autocomplete="off" style="width:194px;height:1.7em;" dojoType="dijit.form.DateTextBox" trim="true"  promptMessage="mm/dd/yyyy" onChange="dojo.byId('calendarDiv').innertHTML=arguments[0];" invalidMessage="Invalid date. Use mm/dd/yyyy format." value="<logic:present name="resultset" scope="request" ><bean:write name="resultBean" property="endDate"/></logic:present>"/>
                                            <font size="1">&nbsp;<label><bean:message key="staslog.dateformat" bundle="staslog"/></label></font>
                                            </div>
                                            <div id="calendarDiv"  style="position:absolute;z-index:100;display:none; top:176px; left:600px; width:200; height:200; border:2px solid #EAEAEA;background-color:blue;opacity:1;">
                                            </div>
                                        </td>

                                        <td style="width:140px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <label class="label"><bean:message key="staslog.severity" bundle="staslog"/></label>
                                            <label class="error"><bean:message key="staslog.star" bundle="staslog"/></label>
                                            <label class="label"><bean:message key="staslog.colon" bundle="staslog"/></label>
                                        </td>
                                        <td>
                                         <select id="severity"  dojoType="dijit.form.FilteringSelect" name="severity" autocomplete="off" value="<logic:present name="resultset" scope="request" ><bean:write name="resultBean" property="severity"/></logic:present>"" >
                                                      <option value=""><bean:message key="admin.common.dropdown.select" bundle="admin"/></option>
                                                       
                                                       
                                                       <logic:iterate name="severityList" scope="request" id="cols">
                                                      <option value="<%=ESAPI.encoder().encodeForHTML(cols)%>"><%=ESAPI.encoder().encodeForHTML(cols)%></option>
                                           
                                          
                                    </logic:iterate>



                                            </select>
                                        </td>

                                        <td style="width:140px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <button dojoType="dijit.form.Button" id="idGo" name="btnGo" onClick="performSubmit();"><bean:message key="admin.common.go" bundle="admin"/>
                                            </button>
                                        </td>
    
                            </table> 
                                                                  <tr>

             <logic:present name="resultset" scope="request" >
      <td style="padding-left:65px;padding-top:40px" height="10" valign="top" class="redtitle" align="right"><img src="<%=ServerUtils.getContextName(request)%>/images/portal/btn_remove_all_on.png" id="start_on" style="display:none;cursor:pointer" onClick="gotoPage(1);"/> <img src="<%=ServerUtils.getContextName(request)%>/images/portal/btn_remove_all_off.png" id="start_off" style="display:none;cursor:pointer"/> <img src="<%=ServerUtils.getContextName(request)%>/images/portal/btn_remove_one_on.png" id="previous_on" style="display:none;cursor:pointer" onClick="previousPage();"/> <img src="<%=ServerUtils.getContextName(request)%>/images/portal/btn_remove_one_off.png" id="previous_off" style="display:none;cursor:pointer"/>
        <span style="valign=top"><input type="text" id="enteredPageNo" autocomplete="off" size="5" name="enteredPageNo" style="height:30;width:70"
                    onkeypress="onEnterGoToPage();"  
                    value="<bean:write name="resultBean" property="pageNo"/> of <bean:write name="resultBean" property="totalNoOfPages"/>"  disabled="false"/></span> <img src="<%=ServerUtils.getContextName(request)%>/images/portal/btn_add_one_on.png" id="next_on" style="display:none;cursor:pointer" onClick="nextPage()"/> <img src="<%=ServerUtils.getContextName(request)%>/images/portal/btn_add_one_off.png" id="next_off" style="display:none;cursor:pointer"/> <img src="<%=ServerUtils.getContextName(request)%>/images/portal/btn_add_all_on.png" id="end_on" style="display:none;cursor:pointer" onClick="gotoPage('<bean:write name="resultBean" property="totalNoOfPages"/>')" /> <img src="<%=ServerUtils.getContextName(request)%>/images/portal/btn_add_all_off.png" id="end_off" style="display:none;cursor:pointer"/></td>
     </logic:present>
    
    </tr>
    

                            <table id="myTable" class=bgcolorReports cellSpacing=1 cellPadding=0 width="92.5%" border="0">
                               
                             
                               
                               
                               
                               
                               
                               
                                <tr class="subHeaddings">

                                    <logic:notEmpty name="resultset" scope="request">
                                        <tr>
                                            <td valign="middle" class="panelColor">&nbsp;<bean:message key="staslog.severity" bundle="staslog"/></td>
                                            <td valign="middle" class="panelColor">&nbsp;<bean:message key="staslog.datetime" bundle="staslog"/></td>
                                            <td valign="middle" class="panelColor">&nbsp;<bean:message key="staslog.message" bundle="staslog"/></td> 
                                        </tr>                       <tr>&nbsp;</tr><tr>&nbsp;</tr>
                                    <logic:iterate name="resultset" scope="request" id="logsDtls">
                                        <tr  class="bgcolor" onMouseOver="hover(this);" onMouseOut="unHover(this, 1);" >
                                            <td width="7%" ><bean:write name="logsDtls" property="severity" />
                                            </td>
                                            <td width="8%" ><bean:write name="logsDtls" property="date" />
                                            </td>
                                            <td width="85%" ><bean:write name="logsDtls" property="message" />
                                            </td>
                                        </tr>
                                    </logic:iterate>
                                    </logic:notEmpty>
                                    
                                    <logic:present name="resultset" scope="request">
                                    <logic:empty name="resultset" scope="request">
                                    <tr>&nbsp;</tr><tr>&nbsp;</tr>
                                        <tr>
                                            <td style="padding-left:10px;" class="redtitle1" ><bean:message key="staslog.norecord" bundle="staslog"/>
                                            </td>
                                        </tr>
                                    </logic:empty>
                                    </logic:present>
                                    
                                    
                        <input type="hidden" name="totalNoOfPages" id="totalNoOfPages" value="<logic:present name="resultset" scope="request" ><bean:write name="resultBean" property="totalNoOfPages"/></logic:present>"/>
                        <input type="hidden" name="pageNo" id="pageNo" value="<logic:present name="resultset" scope="request" ><bean:write name="resultBean" property="pageNo"/></logic:present>" />
                        <input type="hidden" name="operation" id="operation" value="displayLogs" />
                                    
                              
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
</table>



                            <table id= "buttonTbl" width = "101.2%">
                                <tr>
                                    <td style="padding-left:0px;padding-top:150px">
                                        <table border="0" width="100%" id="" cellspacing="0" cellpadding="0" align="left">
                                            <tr class="barColor">
                                                <td colspan="7" align="center">
                                                    <button dojoType="dijit.form.Button" type="button" id="idHome" name="btnHome" 
                                                    onClick="window.location= '<%=ServerUtils.getContextName(request)%>/adminMain.do' "><bean:message key="admin.common.home" bundle="admin"/>
                                                    </button>
                                                    <button dojoType="dijit.form.Button" id="idReset" name="btnReset" onClick="performReset();" ><bean:message key="admin.common.reset" bundle="admin"/>
                                                    </button>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
</form>
<logic:present name="resultset" scope="request" >
  <script>
    dojo.addOnLoad(loadFormValues); 
        function loadFormValues(){
                
                if(<bean:write name="resultBean" property="totalNoOfPages"/>  <= 1 && <bean:write name="resultBean" property="pageNo"/> <= 1){
                        document.getElementById('start_on').style.display='none';
                        document.getElementById('start_off').style.display='';
                        document.getElementById('previous_on').style.display='none';
                        document.getElementById('previous_off').style.display='';
                        document.getElementById('next_on').style.display='none';
                        document.getElementById('next_off').style.display='';
                        document.getElementById('end_on').style.display='none';
                        document.getElementById('end_off').style.display='';                        
                }else if(<bean:write name="resultBean" property="totalNoOfPages"/>  > 1 && <bean:write name="resultBean" property="pageNo"/> <= 1){
                         document.getElementById('start_on').style.display='none';
                        document.getElementById('start_off').style.display='';
                        document.getElementById('previous_on').style.display='none';
                        document.getElementById('previous_off').style.display='';
                        document.getElementById('next_on').style.display='';
                        document.getElementById('next_off').style.display='none';
                        document.getElementById('end_on').style.display='';
                        document.getElementById('end_off').style.display='none';
                }else if(<bean:write name="resultBean" property="totalNoOfPages"/>  > 1 && (<bean:write name="resultBean" property="pageNo"/> > 1 && (<bean:write name="resultBean" property="pageNo"/> != <bean:write name="resultBean" property="totalNoOfPages"/>))){
                        document.getElementById('start_on').style.display='';
                        document.getElementById('start_off').style.display='none';
                        document.getElementById('previous_on').style.display='';
                        document.getElementById('previous_off').style.display='none';
                        document.getElementById('next_on').style.display='';
                        document.getElementById('next_off').style.display='none';
                        document.getElementById('end_on').style.display='';
                        document.getElementById('end_off').style.display='none';
                }else if((<bean:write name="resultBean" property="totalNoOfPages"/>  > 1) && (<bean:write name="resultBean" property="pageNo"/> == <bean:write name="resultBean" property="totalNoOfPages"/>)){                     
                        document.getElementById('start_on').style.display='';
                        document.getElementById('start_off').style.display='none';
                        document.getElementById('previous_on').style.display='';
                        document.getElementById('previous_off').style.display='none';
                        document.getElementById('next_on').style.display='none';
                        document.getElementById('next_off').style.display='';
                        document.getElementById('end_on').style.display='none';
                        document.getElementById('end_off').style.display='';        
                }
                document.forms[0].pageNo.value  = 1; 
        }
                



    function performReset(){
        logs.reset();
        dijit.byId('severity').setValue('');
    }

   
</script>
</logic:present>
<script>
 function performSubmit(){
        
        if(dijit.byId('startDate') == '' && dijit.byId('endDate') == ''){
            showEmptyDialog('<bean:message key="staslog.plsenterdate" bundle="staslog"/>', "<bean:message key='admin.common.alert.title' bundle='admin'/>");
            return false;
        }else{
            if(dijit.byId('severity') == ''){
                showEmptyDialog('<bean:message key="staslog.plsenterseverity" bundle="staslog"/>', "<bean:message key='admin.common.alert.title' bundle='admin'/>");
                return false;
            }
        }
        if(dijit.byId('startDate') != '' && dijit.byId('endDate') != ''){
            if (dijit.byId('startDate').value > dijit.byId('endDate').value){
                showEmptyDialog('<bean:message key="staslog.startlessend" bundle="staslog"/>', "<bean:message key='admin.common.alert.title' bundle='admin'/>");
                return false;
            }
        }
        

        var curdate=new Date()
        var start=dojo.byId('startDate').value
        var startarray =start.split('/');
        var end=dojo.byId('endDate').value
        var endarray =end.split('/');
        startarray[0]= startarray[0]-1;
        endarray[0]= endarray[0]-1;

        var myStartDate=new Date(startarray[2],startarray[0],startarray[1]);
        if (myStartDate > curdate){
            showEmptyDialog('<bean:message key="staslog.startlesscurrent" bundle="staslog"/>', "<bean:message key='admin.common.alert.title' bundle='admin'/>");
            return false;
        }
        var myendDate=new Date(endarray[2],endarray[0],endarray[1]);
        if (myendDate > curdate){
            showEmptyDialog('<bean:message key="staslog.endlesscurrent" bundle="staslog"/>', "<bean:message key='admin.common.alert.title' bundle='admin'/>");
            return false;
        }
        if(document.forms[0].pageNo.value <=0){
            document.forms[0].pageNo.value  = 1;    
        }

        logs.submit();
    }
</script>
</body>
</html:html>