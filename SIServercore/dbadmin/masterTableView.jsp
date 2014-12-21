<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="org.apache.commons.lang.StringEscapeUtils"%>
<%@page import="com.enterprisehorizons.util.StringUtils"%>
<%@ page import="java.util.*,java.util.Date,com.enterprisehorizons.db.util.*,com.enterprisehorizons.util.* , com.enterprisehorizons.magma.config.dbadmin.ModelConfigConstants" %>
<%@ page import="org.owasp.esapi.ESAPI" %>  
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/tags/struts-nested" prefix="nested"%>
<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>

<!-- Privileges imports  -->

<%@page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@page import="com.enterprisehorizons.magma.security.util.AccessHelper"%>
<%@page import="com.spacetimeinsight.db.privileges.model.RoleRightsMap"%>

<%!
	Boolean disableAction=false;
%>
<% 
   boolean fromHeader=false;
   if(request.getParameter("fromHeader")!=null && "true".equalsIgnoreCase(request.getParameter("fromHeader"))) {
	   fromHeader=Boolean.parseBoolean(request.getParameter("fromHeader"));

   }
%>

<% 

   boolean enableHist=false;
   if(request.getAttribute("enableHistory")!=null && request.getAttribute("enableHistory").equals(true)) { 
	   enableHist=true;
   }
%> 
<%
	// Changes for applying Privileges -- Start
	UserBean userBean          = (UserBean)session.getAttribute(ServerUtils.USER_BEAN_NAME);   
	String modelName           = (String) session.getAttribute(ModelConfigConstants.SESSION_MODEL_NAME); 
	String moduleId      =(String) session.getAttribute(ServerUtils.PARAM_MODULE_ID);
   
   //Get right or subright name from given model 
   String rightOrSubright     = AccessHelper.getRightOrSubRightNameFromModel(modelName);    
   //Get the access permissions for the given right or subright and accessType
   RoleRightsMap roleRightsMap	= AccessHelper.getRoleRightsMap(userBean,rightOrSubright,moduleId);  
	
   //Changes for applying Privileges -- End
  %>


<html:html>
<head>

<%@ include file="/common/dojo.jsp"%>

<title>View <bean:write property="displayModelName" name="masterTableViewForm" /></title>


<script type="text/JavaScript">

    function openPopupToViewRecord(idvalue){
        window.open ("./masterTableRecordViewAction.do?selectedId=" +idvalue , "viewTable","menubar=0,resizable=1,scrollbars=1,width=400,height=400");
        return true;
    }

var infoFrameWin=null;
Window.keepMultiModalWindow=true;

function infoFrameWinDestroy()
{
	if(infoFrameWin!=null)
		infoFrameWin.destroy();
}


function openInfoframe(idvalue, rowObject, clickedRadioId){
    
    var urlToOpen = "./masterTableRecordViewAction.do?selectedId=" +idvalue;
               
     if(infoFrameWin==null)
     {
          infoFrameWin = new Window({id: "infoFrameWin", className: "alphacube", width:(screen.width)/(3/2), height:(screen.height)/2,top:100,left:100, title:" <bean:write property="displayModelName" name="masterTableViewForm" />", closable:true, wiredDrag: true}); 
          infoFrameWin.setURL(urlToOpen); 
          infoFrameWin.show();
	 }
     else if(infoFrameWin!=null)
     {	
      	  infoFrameWin.setURL(urlToOpen);
     	  infoFrameWin.refresh();
     	  infoFrameWin.setLocation(100,100);
     	  
     	  if(infoFrameWin.isMinimized())
	   	  {
	       	  //use to restore the last maximized state
	       	  	infoFrameWin.setSize((screen.width)/(3/2),(screen.height)/2);
	      		infoFrameWin.minimized = false;
     	  }
     	  if(infoFrameWin.isMaximized())
     	  {
     	  //use to restore the last maximized state
     	  	infoFrameWin.maximize();
     	  }
     	  
     	  window.setTimeout('infoFrameWin.show()',400);
     }
     
    var totalRecords = document.forms[0].selectedRecordId.length;
    for(var i=0; i<totalRecords; i++){
		if(document.forms[0].selectedRecordId[i].disabled==false){		
			if(document.forms[0].selectedRecordId[i].value == clickedRadioId){
				document.forms[0].selectedRecordId[i].checked = true;				
			}
		}
    }

}
 function deleteDS(){
    document.forms[0].submit();   
}
    function previousPage(){
        var pageNo = document.getElementById("pageNo").value;

        if(parseInt(pageNo)>1){
            document.masterTableViewForm.pageNo.value = (parseInt(pageNo)-1);
            document.forms[0].action="./masterTableViewAction.do";
            <%if(request.getParameter("fromHeader")!=null && !(request.getParameter("fromHeader").toString().equalsIgnoreCase("null"))){ %>
	    document.forms[0].action=document.forms[0].action+"?fromHeader=<%=ESAPI.encoder().encodeForHTML(request.getParameter("fromHeader"))%>";
	    <%}%>
            document.forms[0].submit();
        }
    }


    function nextPage(){
        var pageNo = document.getElementById("pageNo").value;
        var totalNoOfPages = document.getElementById("totalNoOfPages").value;
        if(parseInt(pageNo)<totalNoOfPages){
            document.masterTableViewForm.pageNo.value = (parseInt(pageNo)+1);
            document.forms[0].action="./masterTableViewAction.do";
            <%if(request.getParameter("fromHeader")!=null && !(request.getParameter("fromHeader").toString().equalsIgnoreCase("null"))){ %>
	    document.forms[0].action=document.forms[0].action+"?fromHeader=<%=ESAPI.encoder().encodeForHTML(request.getParameter("fromHeader"))%>";
	    <%}%>
            document.forms[0].submit();
        }
    }

    function gotoPage(pageNo){
            document.masterTableViewForm.pageNo.value = pageNo;
            document.forms[0].action="./masterTableViewAction.do";
            <%if(request.getParameter("fromHeader")!=null && !(request.getParameter("fromHeader").toString().equalsIgnoreCase("null"))){ %>
	    document.forms[0].action=document.forms[0].action+"?fromHeader=<%=ESAPI.encoder().encodeForHTML(request.getParameter("fromHeader"))%>";
	    <%}%>
	    document.forms[0].submit();
    }

    function onEnterGoToPage(){
        if(window.event.keyCode==13){
            var pageNo = document.getElementById("enteredPageNo").value;
            var totalNoOfPages = document.getElementById("totalNoOfPages").value;
            if(parseInt(pageNo)>=1 && parseInt(pageNo)<=totalNoOfPages){
                document.masterTableViewForm.pageNo.value = pageNo;
                document.forms[0].action="./masterTableViewAction.do";
                <%if(request.getParameter("fromHeader")!=null && !(request.getParameter("fromHeader").toString().equalsIgnoreCase("null"))){ %>
		document.forms[0].action=document.forms[0].action+"?fromHeader=<%=ESAPI.encoder().encodeForHTML(request.getParameter("fromHeader"))%>";
		<%}%>
		

                document.forms[0].submit();
            }       
        }
    }

    function submitForm(btn) {
        if(listSize <= 1){
            if(btn.id == 'idDelete'){ 
                showEmptyDialog('<bean:message key="dbconfig.no.record.delete"/>','Alert');
                return false;
            }
            else {
                if(btn.id == 'idModify'){
                    showEmptyDialog('<bean:message key="dbconfig.no.record.update"/>','Alert');
                    return false;
                }
            }
            if(btn.id == 'idHistory'){ 
	                    showEmptyDialog('<bean:message key="dbconfig.no.record.history"/>','Alert');
	                    return false;
            }
        }
        else{
       	   if(btn.id == 'idDelete' || btn.id == 'idModify' || btn.id == 'idHistory'){
                if(!isAnyRecordSelected()){
                   showEmptyDialog('No records selected to perform action','Alert');
                    
                    return false;
                }
                else{
              
                    if(btn.id == 'idDelete'){
                        flag = confirmationDialog('Do you want to delete the record?');
                        if(!flag){
                        return false;
                        }
                    }
                }
            }
        }
        /* 
          adding this condition to clear the search in case if its exists for history button as its not required to carry forward 
        */
         if(btn.id == 'idHistory'){
         document.getElementById("searchCriteria").value="";
         }
         
         //ends the history button specifc actions here
         
        //document.forms[0].viewSubmitName.value=btn.value;
        
        
        
        document.forms[0].viewSubmitName.value=btn.name;
        
        document.forms[0].action="./masterTableViewAction.do";
       
	

        var flag = "true"
        if(flag){
            document.forms[0].submit();
        }
    }
    
    function isAnyRecordSelected(){
    
        var allRecords = document.forms[0].selectedRecordId;
        if(allRecords!=null && allRecords.length > 1){
            for(var count=0;count < allRecords.length;count++)      
            {
                if(allRecords[count].checked){
                    return true;
                }   
            }
        } else if(allRecords != null && allRecords.checked){
            return true;
        }
        return false;
    }

    function dodelete(){
    	
           document.forms[0].viewSubmitName.value="btnDelete";
            document.forms[0].action="./masterTableViewAction.do";
           
	    
        document.forms[0].submit();
        
    }

   
    var tr_selected = '';
    function hover(obj){
        obj.className='class_hover';
    }

    function unHover(obj, row_num){
        if (tr_selected != row_num) obj.className = 'class_no_hover bgcolor';

    }
</script>


<script>
          
           var fieldList = {identifier:"label",items:[{attr:"",label:""}]};
           var fieldStore = new dojo.data.ItemFileReadStore({data: fieldList});

           var booleanValues = new Array();
           booleanValues.push({attr:"",label:""});
           booleanValues.push({attr:"true",label:"true"})
           booleanValues.push({attr:"false",label:"false"});
                                 
           var booleanList = {identifier:"attr",items:booleanValues};                                 
           var booleanStore = new dojo.data.ItemFileReadStore({data: booleanList});
                       
           var operatorList = {identifier:"label",items:[{attr:"",label:""}]};
           var operatorStore = new dojo.data.ItemFileReadStore({data: operatorList});
           
           var  count=1;

           function searchOption(fieldId,fieldType,operatorId,value) {
                 this.fieldId=fieldId;
                 this.fieldType=fieldType;
                 this.operatorId=operatorId;
                 this.value=value;
           }
                                                                                                           
           function field(name,type,display) {
                 this.name=name;
                 this.type=type;
                 this.display=display;
           }
                      
           var fields=new Array();
           var searchOptions=new Array();
                                 
           function operator(display,isString,isNum,isDate,isBln,value) {
                  this.display=display;
                  this.isString=isString;
                  this.isNum=isNum;
                  this.isDate=isDate;
                  this.isBln=isBln;
                  this.value=value;                  
              }
                                                                                         
              var operators=new Array();
              operators.push(new operator("=",true,true,true,true,"="));
              operators.push(new operator("!=",true,true,true,false,"!="));
              operators.push(new operator(">",false,true,true,false,">"));
              operators.push(new operator("<",false,true,true,false,"<"));
              operators.push(new operator(">=",false,true,true,false,">="));
              operators.push(new operator("<=",false,true,true,false,"<="));
              operators.push(new operator("starts with",true,false,false,false,"starts with"));
              operators.push(new operator("ends with",true,false,false,false,"ends with"));
              operators.push(new operator("contains",true,false,false,false,"contains"));
              operators.push(new operator("contains ignore case",true,false,false,false,"contains ignore case"));
              operators.push(new operator("does not contain",true,false,false,false,"does not contain"));
              operators.push(new operator("is empty",true,true,true,true,"is empty"));
                            
              function addSearchRow() {
                                                      
                                        var tbody = document.getElementById("searchTable").getElementsByTagName("TBODY")[0];   
                        count=count+1;      
                        var row = document.createElement("TR");     
                        var tmpRowId = 'searchRow' + count; 
                        row.setAttribute("id",tmpRowId);
                                                                                                                        
                        var fieldId="field"+count;
                        var operatorId="operator"+count;
                        
                        var searchDataId="searchData"+count;
                        var searchDataDateId="searchDataDate"+count;
                        var searchDataBlnId="searchDataBln"+count;
                                                
                        var td1 = document.createElement("TD");
                        var td2 = document.createElement("TD");
                        var td3 = document.createElement("TD");
                        var td4 = document.createElement("TD");
                                                

                        var strHtml = "<select name='"+fieldId+"'  id='"+fieldId+"'  dojoType='dijit.form.FilteringSelect' trim='value' class='selectbox'  autocomplete='off' store='fieldStore' searchAttr='label' onchange='loadOperator(this.id,this.value)'> <option value=''></option> </select>";
                        
                        td1.innerHTML = strHtml;

                        var strHtml1 = "<select name='"+operatorId+"'  id='"+operatorId+"'   trim='value' dojoType='dijit.form.FilteringSelect' class='selectbox' autocomplete='off' store='operatorStore'  searchAttr='label' onchange='displayField(this.id,this.value)'> <option value=''></option> </select>";
                                                
                        td2.innerHTML = strHtml1;

                        var userInput="<div id='searchDataDiv"+count+"' ><input type='text' id='"+searchDataId+"' name='"+searchDataId+"' autocomplete='off' dojoType='dijit.form.ValidationTextBox'  trim='true' ucfirst='true' /></div>";
                        userInput=userInput+"<div id='searchDataDateDiv"+count+"' style='display:none' > <input id='searchDataDate"+count+"' type='text' autocomplete='off' style='width:194px;height:1.7em;' dojoType='dijit.form.DateTextBox'   datePattern='MM/dd/yyyy' trim='true'  onChange='dojo.byId(\"calendarDiv"+count+"\").innertHTML=arguments[0];' invalidMessage='<bean:message key="dbconfig.search.calender.format"  />' /></div>";
                        userInput=userInput+"<div id='calendarDiv"+count+"' style='position:absolute;z-index:100;display:none; top:176px; left:600px; width:200; height:200; border:2px solid #EAEAEA;background-color:blue;opacity:1;'></div>";
                        userInput=userInput+"<div id='searchDataBlnDiv"+count+"' style='display:none'><select name='searchDataBln"+count+"' id='searchDataBln"+count+"' dojoType='dijit.form.FilteringSelect' autocomplete='off' class='selectbox' store='booleanStore' searchAttr='attr'></select></div>";
                        
                        td3.innerHTML=userInput;
                                                
                        var removeIcon="&nbsp;<a href='#'   onclick='javascript:deleteSearchRow(this.parentNode.parentNode);return false;'><img src='<%=ServerUtils.getContextName(request)%>/images/portal/icon_dash_1.png' style='cursor: hand;' /></a>&nbsp;";
                        td4.innerHTML=removeIcon;
                        
                        row.appendChild(td1);
                        row.appendChild(td2);      
                        row.appendChild(td3);
                        row.appendChild(td4);
                                                            
                        // append row to table
                        tbody.appendChild(row);
                         
                        var fieldFS = new dijit.form.FilteringSelect({id: fieldId,
                            name:fieldId,
                            store: fieldStore,
                            searchAttr: "label",
                            onChange:function(){
                                loadOperator(this.id,this.value)}
                            }, fieldId);

                        var validation = new dijit.form.ValidationTextBox({id: searchDataId,
                            name:searchDataId                            
                            },searchDataId);
                                                
                        var operatorFS = new dijit.form.FilteringSelect({id: operatorId,
                            name:operatorId,
                            store: operatorStore,
                            searchAttr: "label",
                            onChange:function(){
                            displayField(this.id,this.value)}
                            }, operatorId);

                        var booleanFS = new dijit.form.FilteringSelect({id: searchDataBlnId,
                            name:searchDataBlnId,
                            store: booleanStore,
                            searchAttr: "label"
                            }, searchDataBlnId);

                        var searchDateDateFS = new dijit.form.DateTextBox({id: searchDataDateId,
                            name:searchDataDateId                            
                            },searchDataDateId);
                                                                        
                        increaseFieldValue();
                        
              }

              function showMessage(msg,title) {
              		
                  showEmptyDialog(msg, title);
              }

              function setFieldFocus(fieldId) {
                  dijit.byId(fieldId).focus();
              }

              function getActiveControl(fieldType,id) {
                  var searchDataDateId="searchDataDate"+id;
                  var searchDataBlnId="searchDataBln"+id;
                  var searchDataId="searchData"+id;
                                              
                  if(fieldType=="string" || fieldType=="number") {
                     return searchDataId;               
                  } else if(fieldType=="boolean") {
                    return searchDataBlnId;                 
                  } else if(fieldType=="date") {
                    return searchDataDateId; 
                  }     
              }    
              function validateSearchData(activeControlId,fieldDisp,fieldType) {
                           
                          var searchData=getValueBasisDataType(activeControlId,fieldType);
                          
                          if(searchData=="") {
                               setFieldFocus(activeControlId);
                               showMessage("<bean:message key="dbconfig.search.criteria.empty"  /> '"+fieldDisp+"'","<bean:message key="dbconfig.search.validation.title"  />");
                               return false;          
                          }
                                                                                                                                                                                                                                                                                                                                                                                                      
                          if(fieldType=="number") {                               
                             var numFormat = /^(\d)*\.?\d*$/;     
                             if(!numFormat.test(searchData)) {
                                     setFieldFocus(activeControlId);
                                     showMessage("'"+fieldDisp+"' <bean:message key="dbconfig.search.validation.num"  />","<bean:message key="dbconfig.search.validation.title"  />");
                                     return false;
                             }
                          } else if(fieldType=="date") {

                              var dateFormat = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;

                                Date.prototype.toDDMMYYYYString = function () {return isNaN (this) ? 'NaN' : [ this.getMonth() > 8 ? this.getMonth() + 1 : '0' + (this.getMonth() + 1),this.getDate() > 9 ? this.getDate() : '0' + this.getDate(), this.getFullYear()].join('/')}

                            newdate=new Date(searchData).toDDMMYYYYString();
                             
                              if(!dateFormat.test(newdate)) {
                                 showMessage("'"+fieldDisp+"' <bean:message key="dbconfig.search.validation.date"  />","<bean:message key="dbconfig.search.validation.title"  />");
                                 //setFieldFocus(activeControlId);
                                 return false;
                               }                               
                          } else if(fieldType=="boolean") {
                              /*
                              if(false){
                                  setFieldFocus(activeControlId);
                                  showMessage("' "+fieldDisp+" ' field can not have empty search criteria","Search validation");
                                  return false;
                              }
                              */
                          }
                                                  
                  return true;                         
              }
                                                        
              function compileSearch() {
                                    
                   var searchCriteria="";                                                         
                   for(var index=1;index<=count;index++) {
                       
                       var row=document.getElementById("searchRow"+index);    
                                                                                     
                       if(row != null ) {
                                                      
                           var field=dijit.byId("field"+index);

                           if(field=="") {
                               setFieldFocus("field"+index);
                               showMessage("<bean:message key="dbconfig.search.field.empty"  />","<bean:message key="dbconfig.search.validation.title"  />");  
                               return ""; 
                           }
                                                   
                           var fieldInfo=getField(field.value);
                           var activeControlId=getActiveControl(fieldInfo.type,index);                                                 
                           var searchData=getValueBasisDataType(activeControlId,fieldInfo.type);
                                                                                                   
                           var operator=dijit.byId("operator"+index).value;

                           if(operator=="is empty") {
                               searchData="null";
                           }    
                                                                                                                                              
                           if(operator!="is empty" && operator=="") {
                               setFieldFocus("operator"+index);                               
                               showMessage("<bean:message key="dbconfig.search.operator.empty"  /> '"+fieldInfo.display+"'","<bean:message key="dbconfig.search.validation.title"  />");                               
                               return "";
                           }
                                                   
                           if(operator!="is empty" && !validateSearchData(activeControlId,fieldInfo.display,fieldInfo.type)) {
                               return "";
                           }
                                                                                                                           
                           searchCriteria = searchCriteria + field.value + ":" + fieldInfo.type+":";
                           searchCriteria = searchCriteria + operator + ":";
                           searchCriteria = searchCriteria + searchData + ";"
                       }
                   }                  
                    //alert(searchCriteria);
                   return searchCriteria;
              }

               
                                                                                    
              function  loadFields() {
                   attributesArray = [];                   
                   attributesArray.push({attr: "", label: ""});
                   var attr_id="";
                   var attr_disp="";
                   var attr_type="";
                   <%
                       Map map=(Map)request.getAttribute(ModelConfigConstants.FIELD_META);
                       if(map!=null) {
                           Map.Entry entry=null;
                           Iterator itr=map.entrySet().iterator();
                           String fieldName=null;
                           String fieldType=null;
                           String fieldInfo="";
                           String fieldDisplay=null;
                           while(itr.hasNext()) {
                             entry=(Map.Entry)itr.next();
                             fieldName=(String)entry.getKey();
                             fieldInfo=(String)entry.getValue();
                             fieldType=fieldInfo.split(";")[0];
                             fieldDisplay=fieldInfo.split(";")[1];
                             %>
                                    attr_id = "<%=fieldName%>"; 
                                    attr_disp = "<%=fieldDisplay%>";
                                    attr_type = "<%=fieldType%>";
                                    attributesArray.push({attr: attr_id, label:attr_disp});                                 
                                    fields.push(new field(attr_id,attr_type,attr_disp));
                             <%   
                           }
                       }
                   %>
                   fieldList = {identifier:"attr",items:attributesArray};
                   fieldStore = new dojo.data.ItemFileReadStore({data: fieldList});                   
              }
              
              loadFields();
              
              function getFieldType(fieldName) {
                  var fieldType="";
                  for(ind=0;ind<fields.length;ind++) {
                      var field=fields[ind];
                      if(field.name==fieldName) {
                          fieldType=field.type; 
                          break;
                      }   
                  }                      
                  return fieldType; 
              }

              function getField(fieldName) {
                  var fld="";
                  for(ind=0;ind<fields.length;ind++) {
                      var field=fields[ind];
                      if(field.name==fieldName) {
                          fld=field; 
                          break;
                      }   
                  }                      
                  return fld; 
              }
                                                          
              function  loadOperator(fieldId,fieldValue) {
                   var id=(fieldId).substring("field".length);                 
                   var operatorId="operator"+id;                                                                                               
                   var fieldType=getFieldType(fieldValue);                  
                   dijit.byId(operatorId).store=getStore(fieldType);
                   dijit.byId(operatorId).setValue("");
                   displaySearchFieldBasisDataType(fieldType,id);                                      
              }
              
              function displayField(operatorId,operatorValue) {
                  
                   var id=(operatorId).substring("operator".length);                   
                   var searchDataDateDivId="searchDataDateDiv"+id;
                   var searchDataBlnDivId="searchDataBlnDiv"+id;
                   var searchDataDivId="searchDataDiv"+id;  
                          
                   if(operatorValue=="is empty") {                                             
                         document.getElementById(searchDataDateDivId).style.display='none';
                         document.getElementById(searchDataBlnDivId).style.display='none';
                         document.getElementById(searchDataDivId).style.display='none';                                                 
                   } else {
                        var fieldValue=dijit.byId("field"+id).value;
                        var fieldType=getFieldType(fieldValue);
                        displaySearchFieldBasisDataType(fieldType,id);  
                   }                   
              }
                                                                                                                
              function getStore(fieldType) {
                  
                  var tempList = {identifier:"label",items:[{attr:"",label:""}]};
                  var tempStore = new dojo.data.ItemFileReadStore({data: tempList});

                  var attributesArray = [];
                  attributesArray.push({attr: "", label: ""});    

                  var attr_id = "";
                  var attr_name = "";
                      
                                                                                                                 
                  if(fieldType=="string") {
                      for(var index=0;index<operators.length;index++) {
                          var operator=operators[index];
                          if(operator.isString==true){
                           attr_id =  operator.value; // num
                               attr_name = operator.display; // text
                              attributesArray.push({attr: attr_id, label: attr_name});                               
                          }
                      }  
                  } else if (fieldType=="number") {
                      for(var index=0;index<operators.length;index++) {
                          var operator=operators[index];
                          if(operator.isNum==true){
                              attr_id =  operator.value; 
                              attr_name = operator.display;
                              attributesArray.push({attr: attr_id, label: attr_name});                               
                          }
                      } 
                  } else if (fieldType=="date") {
                      for(var index=0;index<operators.length;index++) {
                          var operator=operators[index];
                          if(operator.isDate==true){
                              attr_id =  operator.value; 
                              attr_name = operator.display;
                              attributesArray.push({attr: attr_id, label: attr_name});                               
                          }
                      } 
                  } else if (fieldType=="boolean") {
                      for(var index=0;index<operators.length;index++) {
                          var operator=operators[index];
                          if(operator.isBln==true){
                              attr_id =  operator.value; 
                              attr_name = operator.display;
                              attributesArray.push({attr: attr_id, label: attr_name});                               
                          }
                      } 
                  }
                                   
                  tempList = {identifier:"label",items:attributesArray};
                  tempStore = new dojo.data.ItemFileReadStore({data: tempList});
                  return tempStore;
              }
                                                                       
              function getMappingCountFieldValue() {
                  return document.getElementById("mappingCount").value;
              }

              function setMappingCountFieldValue(value){
                    document.getElementById("mappingCount").value=value;
                }

                function increaseFieldValue() {
                    setMappingCountFieldValue(parseInt(getMappingCountFieldValue())+1);
                }

                function decreaseFieldValue() {
                    setMappingCountFieldValue(parseInt(getMappingCountFieldValue())-1);
                }
                                              
               function deleteSearchRow(row) {
               
                  var table = document.getElementById("searchTable"); 
                  var rownum = row.rowIndex;
                  try
                  { 
                        table.deleteRow(rownum);
                        decreaseFieldValue(); 
                  } catch (ex) {
                  }   
              }
                                             
              function clearSearch() {
                  document.getElementById("searchCriteria").value="";
                  document.forms[0].action="./masterTableViewAction.do";
                  document.forms[0].submit();
              }
              
              function validateSearch() {
                                    
                var search=compileSearch();
                                
                if(search=="") {
                    return;
                }     
                                           
                document.getElementById("searchCriteria").value=search;
            
                document.masterTableViewForm.action="./masterTableViewAction.do";
                document.masterTableViewForm.submit();
              }
              
              function hideSearch(){
                  document.getElementById('searchDetail').style.display='none';
                  document.getElementById('searchDetailActions').style.display='none';
                  document.getElementById('minimize').style.display='none';
                  document.getElementById('maximize').style.display='';
              }
              
              function showSearch(){
                  document.getElementById('searchDetail').style.display='';
                  document.getElementById('searchDetailActions').style.display='';
                  document.getElementById('minimize').style.display='';
                  document.getElementById('maximize').style.display='none';
              }
 </script>          
</head>

<% 
  boolean searchAvailable=false;
  if(!StringUtils.isNull(request.getParameter("searchCriteria"))) {
      searchAvailable=true;  
  } 
  
%>

<body class="tundra bodybg" onUnload="infoFrameWinDestroy();" style="overflow-x: hidden; overflow-y: auto; ">
<html:form action="/masterTableViewAction" method="POST" styleId="masterTableViewForm">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">
<html:hidden property="viewSubmitName"  value="" />
<%
    List[][] listArray = (List[][])session.getAttribute(ModelConfigConstants.SESSION_DISPLAY_ROWS);  
    
%>
  <script>
var listSize = '<%= listArray.length %>';

</script>
    <logic:present name="ecoDatasourceListData">
        <input type="hidden" name="mappingCount" value="1" />
    </logic:present>

    <logic:notPresent name="ecoDatasourceListData">
        <input type="hidden" name="mappingCount" value="1" />
    </logic:notPresent>

    <input type="hidden" name="searchCriteria" id="searchCriteria"
        value="<%=ESAPI.encoder().encodeForHTML(request.getParameter("searchCriteria")!=null? request.getParameter("searchCriteria"):"")%>" />
    <input type="hidden" name="selectedRecordParentId"/>
    <input type="hidden" name="fromHeader" value="<%=fromHeader%>">

<logic:present name="stiUser" >
		<input type="hidden" id="userId" name="userId" value="<bean:write name='stiUser' property='userId' />" /> 
</logic:present>

<table width="101.2%" cellspacing="0" cellpadding="0" align="center"  >
<tr>
<td>  
 <table cellspacing="0" cellpadding="0">
    <tr>
    <td class="pageTitle paddingTitle">
         <table>         
          <tr>
              <td height="60px" align="left" valign="top"  class="redtitle"><strong class="pageTitle" style="padding-left:0px"><bean:message key="dbconfig.view"/> <bean:write property="displayModelName" name="masterTableViewForm" /><br />
                 <span class="paddingTitleDesc bodytext" style="padding-left:0px"><bean:message key="dbconfig.view.action.description"/> <bean:write property="displayModelName" name="masterTableViewForm" /></span></strong>
                 
              </td>
              <td width="67px">&nbsp;</td>   
         </tr>
         <tr>   

              <td colspan=2 >              
                 <span id="ctl00_mainbody_lblError" class="error"><label class="success">
                 
            
                 
                 <html:messages id="msg" message="true" property="message.update.success"> <bean:write name="msg"/></html:messages>
                 <html:messages id="msg2" message="true" property="message.delete.success"> <bean:write name="msg2"/></html:messages>
                 <html:messages id="msg3" message="true" property="message.create.success"> <bean:write name="msg3"/></html:messages>
                 </label>
                <label class="error"><html:errors/></label>
                 </span>
             </td>
                
              <td >&nbsp;</td>      
         </tr>       

                        
                        <tr class="tableBgColor">
                           <td>
                             <table width="650px">
                              <tr>
                                      <td width="50%" align="left"> <strong class="pageTitle" >&nbsp;Search </strong> </td>
                                      <td width="50%" align="right">
									 
									 <% if(searchAvailable) { %>
									  <span id="minimize" class="label" style="display:''"> Minimize <img  onClick="hideSearch()" style="cursor: pointer"  src="<%=ServerUtils.getContextName(request)%>/images/portal/uparrow.gif" width="7" height="11" align="absmiddle" /></span>
									 <span id="maximize"  class="label" style="display:none"> Maximize <img style="cursor: pointer" onClick="showSearch()" src="<%=ServerUtils.getContextName(request)%>/images/portal/downarrow.gif" width="7" height="11" align="absmiddle" /></span>
									 <% } else { %>						  
									<span id="minimize" class="label" style="display:none"> Minimize <img  onClick="hideSearch()" style="cursor: pointer"  src="<%=ServerUtils.getContextName(request)%>/images/portal/uparrow.gif" width="7" height="11" align="absmiddle" /></span>
									 <span id="maximize"  class="label" style="display:''"> Maximize <img style="cursor: pointer" onClick="showSearch()" src="<%=ServerUtils.getContextName(request)%>/images/portal/downarrow.gif" width="7" height="11" align="absmiddle" /></span>
									 <% } %>
									 </td>
                              </tr>
                             </table> 
                           </td>      
                        </tr>

                         <% if(searchAvailable) { %>                                                
                        	<tr id="searchDetail" class="tableBgColor" style="display:''"> 
						<% } else { %>
							<tr id="searchDetail" class="tableBgColor" style="display:none"> 
						<% }  %>	
                           <td align="left">
                           <table id="searchTable">
                           
                               <tr>
                                    <td class="label">&nbsp;</td>
                                    <td class="label">&nbsp;</td>
                                    <td class="label">&nbsp;</td>
                                    <td class="label">&nbsp;</td>
                                </tr>
                           
                                <tr>
                                    <td class="label">&nbsp;<bean:message key="dbconfig.search.field.label"  /><label class="error">*</label></td>
                                    <td class="label">&nbsp;<bean:message key="dbconfig.search.operator.label"  /><label class="error">*</label></td>
                                    <td class="label">&nbsp;<bean:message key="dbconfig.search.value.label"  /><label class="error">*</label></td>
                                    <td class="label">&nbsp;</td>  
                                </tr>                               
                        <%
                        
                         String searchCriteria=(String)request.getAttribute("searchCriteria");
                         if(!StringUtils.isNull(searchCriteria)) {
                           String[] searchFields=searchCriteria.split(";");
                           String[] params=null;
                           String fieldName=null;
                           String dataType=null;
                           String operator=null;
                           String searchData=null;
                           Object crtData=null;
                           
                           int count=1;
                           
                           for (String searchField : searchFields) {
                               params=searchField.split(":");
                               fieldName=params[0];
                               dataType=params[1];
                               operator=params[2];
                               searchData=params[3];               
                             %>
                                <tr id="searchRow<%=count%>">
                                    <td><select name="field<%=count%>" id="field<%=count%>" autocomplete="off" 
                                        dojoType="dijit.form.FilteringSelect" class="selectbox"
                                        store="fieldStore" searchAttr="label"
                                        onchange="loadOperator(this.id,this.value)">
                                    </select></td>
                                    <td><select name="operator<%=count%>" autocomplete="off" 
                                        id="operator<%=count%>" dojoType="dijit.form.FilteringSelect"
                                        class="selectbox" store="operatorStore" searchAttr="label" onChange="displayField(this.id,this.value)"></select>
                                    </td>
                                    <td>
                                    
                                      <div id="searchDataDiv<%=count%>" style="display:<%=(dataType.equals("string") || dataType.equals("number"))?"''":"'none'"%>">
                                            <input type="text" id="searchData<%=count%>" autocomplete="off"
                                            name="searchData<%=count%>"
                                            dojoType="dijit.form.ValidationTextBox" required="true"
                                            trim="true" ucfirst="true" />
                                      </div>     
                                        
                                        <div id="searchDataDateDiv<%=count%>" style="display:<%=dataType.equals("date")?"''":"'none'" %>" >
                                          <input id="searchDataDate<%=count%>" type="text" style="width:194px;height:1.7em;" autocomplete="off" dojoType="dijit.form.DateTextBox" datePattern="MM/dd/yyyy" trim="true"  onChange="dojo.byId('calendarDiv<%=count%>').innertHTML=arguments[0];"   invalidMessage="<bean:message key="dbconfig.search.calender.format"  />" />
                                        </div>
                                        
                                        <div id="calendarDiv<%=count%>" style="position:absolute;z-index:100;display:none; top:176px; left:600px; width:200; height:200; border:2px solid #EAEAEA;background-color:blue;opacity:1;">
                                        </div>
                                                                                                                                                                                                                                                
                                        <div id="searchDataBlnDiv<%=count%>" style="display:<%=dataType.equals("boolean")?"''":"'none'" %>" >
                                                <select name="searchDataBln<%=count%>" id="searchDataBln<%=count%>" autocomplete="off" 
                                                dojoType="dijit.form.FilteringSelect" class="selectbox"
                                                store="booleanStore" searchAttr="attr"></select>
                                        </div>
                                                                                                                        
                                        </td>
                                    <td>
                                    <%
                                      if(count==1)
                                      {        
                                    %> &nbsp;<a href="#"
                                        onclick="javascript:addSearchRow();return false;"><img
                                        src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_plus_1.png" /></a>&nbsp;
                                    <%
                                      } else { 
                                     %>  &nbsp;<a href="#"
                                        onclick='javascript:deleteSearchRow(this.parentNode.parentNode);return false;'><img
                                        src='<%=ServerUtils.getContextName(request)%>/images/portal/icon_dash_1.png'
                                        style='cursor: hand;' /></a>&nbsp; <%
                                      } 
                                     %>
                                    </td>
                                </tr>
                                <script>
                             
                                 searchOptions.push(new searchOption('<%=ESAPI.encoder().encodeForHTML(fieldName)%>','<%=ESAPI.encoder().encodeForHTML(dataType)%>','<%=StringEscapeUtils.escapeHtml(operator)%>','<%=ESAPI.encoder().encodeForHTML(searchData)%>'));
                                 //dijit.byId('searchData<%=count%>').setValue('<%=ESAPI.encoder().encodeForHTML(searchData)%>');
                             </script>
                                <%
                           count++;
                           } // end of if - true part
                           %>
                                <script>
                                 count=<%=count%>;
                              </script>
                                <%
                         } else {
                             %>
                                <tr id="searchRow1">
                                    <td><select name="field1" id="field1" autocomplete="off" 
                                        dojoType="dijit.form.FilteringSelect" class="selectbox"
                                        store="fieldStore" searchAttr="label"
                                        onchange="loadOperator(this.id,this.value)">
                                    </select></td>
                                    <td><select name="operator1" id="operator1" autocomplete="off" 
                                        dojoType="dijit.form.FilteringSelect" class="selectbox"
                                        store="operatorStore" searchAttr="label" onChange="displayField(this.id,this.value)">
                                    </select></td>
                                    <td>
                                    
                                      <div id="searchDataDiv1"  >
                                            <input type="text" id="searchData1" name="searchData1"
                                            dojoType="dijit.form.ValidationTextBox" required="true"
                                            trim="true" ucfirst="true" autocomplete="off"/>
                                      </div>    
                                                                                
                                        <div id="searchDataDateDiv1" style="display:none">
                                          <input id="searchDataDate1" type="text" style="width:194px;height:1.7em;" autocomplete="off" dojoType="dijit.form.DateTextBox" trim="true" datePattern="MM/dd/yyyy" onChange="dojo.byId('calendarDiv1').innertHTML=arguments[0];"   invalidMessage="<bean:message key="dbconfig.search.calender.format"  />" />
                                        </div>
                                                                                
                                        <div id="calendarDiv1" style="position:absolute;z-index:100;display:none; top:176px; left:600px; width:200; height:200; border:2px solid #EAEAEA;background-color:blue;opacity:1;">
                                        </div> 
                                                                                                                                                                                                        
                                        <div id="searchDataBlnDiv1"  style="display:none">
                                                <select name="searchDataBln1" id="searchDataBln1" autocomplete="off" 
                                                dojoType="dijit.form.FilteringSelect" class="selectbox"
                                                store="booleanStore" searchAttr="attr"></select>
                                        </div>
                                                                                                                                                                                                                                                    
                                        </td>
                                        
                                    <td> &nbsp;<a href="#"
                                        onclick="javascript:addSearchRow();return false;"><img
                                        src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_plus_1.png" /></a>&nbsp;
                                    </td>
                                </tr>
                                <% 
                         }
                      %>
                                                              
          </table>     </td>                         
                        </tr>

                            
                             <%
							 
								if(searchAvailable) {
									%>
                                    <tr id="searchDetailActions" class="tableBgColor"  style="display:''">
                           <td align="right"><button dojoType="dijit.form.Button"  onclick="clearSearch()"><bean:message key="dbconfig.search.button.clear"  /></button> <button value="Search" dojoType="dijit.form.Button"  onclick="validateSearch()"><bean:message key="dbconfig.search.button.search"  /></td>
                        <tr>
                                    <%
									
								}
								else {
									%>
                                     <tr id="searchDetailActions" class="tableBgColor" style="display:none">
                           <td align="right"><button dojoType="dijit.form.Button"  onclick="clearSearch()"><bean:message key="dbconfig.search.button.clear"  /></button> <button value="Search" dojoType="dijit.form.Button"  onclick="validateSearch()"><bean:message key="dbconfig.search.button.search"  /></td>
                        <tr>
                                    <%
								}
								%>
									
    </table>
    
            
    <table width="101.2%" cellspacing="0" cellpadding="0" align="center">
        <tr>
        
        <td>        
        <table  width="500" id="table2" height="54"   border=0>
            <tr>
                <td height="30" align="left" style="width: 227px"> 
                    <table>
                        <tbody>                        
                           
                            <tr>
      							<td height="30" valign="top" align="right">
            						<table class="htmlPagination">
                						<tr>
                                            <td><img src="<%=ServerUtils.getContextName(request)%>/images/portal/btn_remove_all_on.png" id="start_on" style="display:none;cursor:pointer" onClick="gotoPage(1);"/> <img src="<%=ServerUtils.getContextName(request)%>/images/portal/btn_remove_all_off.png" id="start_off" style="display:none;cursor:pointer"/></td>
                                            <td align="center"><img src="<%=ServerUtils.getContextName(request)%>/images/portal/btn_remove_one_on.png" id="previous_on" style="display:none;cursor:pointer" onClick="previousPage();"/> <img src="<%=ServerUtils.getContextName(request)%>/images/portal/btn_remove_one_off.png" id="previous_off" style="display:none;cursor:pointer"/></td>
                                            <td valign="top"><input type="text" id="enteredPageNo" size="5" name="enteredPageNo" style="height:28;width:50; text-align:center; vertical-align:middle" autocomplete="off" onKeyPress="onEnterGoToPage();" value="<bean:write name="masterTableViewForm" property="pageNo"/> of <bean:write name="masterTableViewForm" property="totalNoOfPages"/>" disabled="true"/></td>
                                            <td align="center"><img src="<%=ServerUtils.getContextName(request)%>/images/portal/btn_add_one_on.png" id="next_on" style="display:none;cursor:pointer" onClick="nextPage()"/> <img src="<%=ServerUtils.getContextName(request)%>/images/portal/btn_add_one_off.png" id="next_off" style="display:none;cursor:pointer"/></td>
                                            <td align="center"><img src="<%=ServerUtils.getContextName(request)%>/images/portal/btn_add_all_on.png" id="end_on" style="display:none;cursor:pointer" onClick="gotoPage('<bean:write name="masterTableViewForm" property="totalNoOfPages"/>')" /> <img src="<%=ServerUtils.getContextName(request)%>/images/portal/btn_add_all_off.png" id="end_off" style="display:none;cursor:pointer"/></td>
                    					</tr>
               						</table>
      							</td>   
             				</tr>
                             
                            <tr><td>

                        
                            <table width="500"  >
                                 
                            
                            <% 
                                for(int outIndex = 0 ; outIndex < listArray.length ; outIndex++)
                                {
                                    List innnerList = null;
                                    if(outIndex == 0) {
                                        innnerList = listArray[outIndex][0];
                            %>
                                    <TR class="subHeaddings">
                                    <Td  class="textnormal12 panelColor" align="left" valign="middle">&nbsp;&nbsp;Action </Td>
                                    <html:hidden name="masterTableViewForm" property="compositeFiledNames" value="<%=(String)innnerList.get(0)%>"/>
                            <%          
                                        for(int inIndex = 1; inIndex < innnerList.size() ; inIndex++){
                            %>
                                            <td class="textnormal12 panelColor" align="left" valign="middle">&nbsp;&nbsp;<% String columnName = (String) innnerList.get(inIndex);
                                                if(columnName != null) { columnName = columnName.replaceAll(" ","&nbsp;"); } out.println(columnName); %></td>
                            <%
                                        }
                            %>
                                    </TR>

                                    <% if(listArray.length <= 1) {%>
                                            
                                    <tr>
                                        <td class="redtitle" align="center" colspan="7"> No Records Found </td>
                                    </tr>
                                    <%   } %>


                            <%
                                    } else {
                                    innnerList = listArray[outIndex][0];								
									List readOnlyDataIDList = listArray[outIndex][1];
									if(readOnlyDataIDList!=null && readOnlyDataIDList.size()>0){
										 disableAction= (Boolean)readOnlyDataIDList.get(0);										
									}else{
									disableAction=false;
									}
									

                            %>
                              <!-- Commented By Aditya     <tr  class="bgcolor" onMouseOver="hover(this);" onMouseOut="unHover(this, 1);" ondblclick="openInfoframe(<%=outIndex-1%>); return false"> -->
                              <tr  class="bgcolor" onMouseOver="hover(this);" onMouseOut="unHover(this, 1);" onDblClick="openInfoframe(<%=outIndex-1%>, this, '<%=(innnerList.get(0))%>')">
                                    <td class="textnormal12" align="center" ><html:radio disabled="<%=disableAction%>"  property="selectedRecordId" name="masterTableViewForm"  
                                    value= "<%=\"\" + (innnerList.get(0))%>"/></TD>


                            <%
                                        for(int inIndex = 1; inIndex < innnerList.size() ; inIndex++){
                            %>
                                            <td  class="textnormal12"  align="left" style="word-wrap: break-word;vertical-align: middle;" width="200">
                                            <% try{         
                                                    out.println(((String)innnerList.get(inIndex)) == null ? "" : ((String)innnerList.get(inIndex)).replaceAll("<","&lt;").replaceAll(">","&gt;"));
                                                }catch(Exception e){
                                                    out.println(innnerList.get(inIndex));
                                                }
                                            %>
                                            </td>
                            <%
                                        }
                            %>
                                    </TR>

                            <%
                                    } 
                            }//Outer Loop
                            %>




                            </TR>
                                
                            </table>
                            
                            </td>
                            </tr>
                            
                            

                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>


                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            
                            <html:hidden name="masterTableViewForm" property="totalNoOfPages" styleId="totalNoOfPages"/>
                            <html:hidden name="masterTableViewForm" property="pageNo" styleId="pageNo"/>
                            <html:hidden name="masterTableViewForm" property="screenCategory"/>

                        </tbody>
                    </table>
                </td>
            </tr>
        </table>
        <td>&nbsp;</td>
        </td>
        <tr>
        
    </td>
    </tr>
</table>
</td>
</tr>

</table>

<tr class="barColor">
                <td colspan='<bean:write name="masterTableViewForm" property="size"/>' width="100%" align="center">
                    <%if(request.getParameter("fromHeader")==null || "false".equalsIgnoreCase(request.getParameter("fromHeader"))){ %>

                      <button dojoType="dijit.form.Button" type="button" onClick="window.location ='<%=ServerUtils.getContextName(request)%>/adminMain.do'"> <bean:message key="dbconfig.home" /> </button>
                      
                    <%} %>
                    <button dojoType="dijit.form.Button"   id="idBack" name="btnBack" type="button" onClick="return submitForm(this)"> <bean:message key="dbconfig.back" /> </button>
                    <button dojoType="dijit.form.Button" <%if(!roleRightsMap.getHasCreateAccess()) { %> disabled="true" <%}%> id="idCreate" name="btnCreate" type="button" onClick="return submitForm(this)"> <bean:message key="dbconfig.create" /> </button>
                    <button dojoType="dijit.form.Button" <%if(!roleRightsMap.getHasUpdateAccess()) { %> disabled="true" <%}%> id="idModify" name="btnModify" type="button" onClick="return submitForm(this)" > <bean:message key="dbconfig.modify" /></button>
                    <button dojoType="dijit.form.Button" <%if(!roleRightsMap.getHasDeleteAccess()) { %> disabled="true" <%}%>  id="idDelete" name="btnDelete" type="button" onClick="return submitForm(this);"> <bean:message key="dbconfig.delete" /> </button>
                    <%if(enableHist){%>
                    <button dojoType="dijit.form.Button"  <%if(!roleRightsMap.getHasReadAccess()) { %> disabled="true" <%}%> id="idHistory" name="btnHistory" type="button" onClick="return submitForm(this);"> <bean:message key="dbconfig.history" /></button>
                    <%} %>
                </td>
</tr>
</table>
 <script>
    dojo.addOnLoad(loadFormValues); 
        function loadFormValues(){
        
                if(<bean:write name="masterTableViewForm" property="totalNoOfPages"/>  <= 1 && <bean:write name="masterTableViewForm" property="pageNo"/> <= 1){
                        document.getElementById('start_on').style.display='none';
                        document.getElementById('start_off').style.display='';
                        document.getElementById('previous_on').style.display='none';
                        document.getElementById('previous_off').style.display='';
                        document.getElementById('next_on').style.display='none';
                        document.getElementById('next_off').style.display='';
                        document.getElementById('end_on').style.display='none';
                        document.getElementById('end_off').style.display='';                        
                }else if(<bean:write name="masterTableViewForm" property="totalNoOfPages"/>  > 1 && <bean:write name="masterTableViewForm" property="pageNo"/> <= 1){
                         document.getElementById('start_on').style.display='none';
                        document.getElementById('start_off').style.display='';
                        document.getElementById('previous_on').style.display='none';
                        document.getElementById('previous_off').style.display='';
                        document.getElementById('next_on').style.display='';
                        document.getElementById('next_off').style.display='none';
                        document.getElementById('end_on').style.display='';
                        document.getElementById('end_off').style.display='none';
                }else if(<bean:write name="masterTableViewForm" property="totalNoOfPages"/>  > 1 && (<bean:write name="masterTableViewForm" property="pageNo"/> > 1 && (<bean:write name="masterTableViewForm" property="pageNo"/> != <bean:write name="masterTableViewForm" property="totalNoOfPages"/>))){
                        document.getElementById('start_on').style.display='';
                        document.getElementById('start_off').style.display='none';
                        document.getElementById('previous_on').style.display='';
                        document.getElementById('previous_off').style.display='none';
                        document.getElementById('next_on').style.display='';
                        document.getElementById('next_off').style.display='none';
                        document.getElementById('end_on').style.display='';
                        document.getElementById('end_off').style.display='none';
                }else if((<bean:write name="masterTableViewForm" property="totalNoOfPages"/>  > 1) && (<bean:write name="masterTableViewForm" property="pageNo"/> == <bean:write name="masterTableViewForm" property="totalNoOfPages"/>)){                     
                        document.getElementById('start_on').style.display='';
                        document.getElementById('start_off').style.display='none';
                        document.getElementById('previous_on').style.display='';
                        document.getElementById('previous_off').style.display='none';
                        document.getElementById('next_on').style.display='none';
                        document.getElementById('next_off').style.display='';
                        document.getElementById('end_on').style.display='none';
                        document.getElementById('end_off').style.display='';
                        
                }

                loadSearchOptions();

                <%
                   // if(request.getParameter("searchCriteria")!=null && request.getParameter("searchCriteria")!="") {
                        %>
                           // showSearch();
                        <%
                 //   } else {
                        %>
      //                    hideSearch();
                        <%
               //     }
                %>
      }

        
      function getValueBasisDataType(activeControlId,fieldType) {
          
            if(fieldType=="string" || fieldType=="number") {
                returnValue=dijit.byId(activeControlId).value;   
            } else if(fieldType=="boolean") {
                returnValue=dijit.byId(activeControlId).value;              
            } else if(fieldType=="date") {
                returnValue=dojo.byId(activeControlId).value;                
            }
            return returnValue;
      }
        
      function setValueBasisDataType(fieldType,id,value) { 
          
          var activeControlId=getActiveControl(fieldType,id);
          if(fieldType=="string" || fieldType=="number") {
            dijit.byId(activeControlId).setValue(value);  
          } else if(fieldType=="boolean") {
              dijit.byId(activeControlId).setValue(value);              
          } else if(fieldType=="date") {
              dijit.byId(activeControlId).setDisplayedValue(value);              
          }
                  
                       
      }
      
      function displaySearchFieldBasisDataType(dataType,id) {
          
            var searchDataDateDivId="searchDataDateDiv"+id;
            var searchDataBlnDivId="searchDataBlnDiv"+id;
            var searchDataDivId="searchDataDiv"+id;
                                                                                                                                                                                                                          
            if(dataType=="string" || dataType=="number") {
                document.getElementById(searchDataDateDivId).style.display='none';
                document.getElementById(searchDataBlnDivId).style.display='none';
                document.getElementById(searchDataDivId).style.display='';
            } else if(dataType=="boolean") {
                document.getElementById(searchDataDateDivId).style.display='none';
                document.getElementById(searchDataBlnDivId).style.display='';
                document.getElementById(searchDataDivId).style.display='none';
            } else if(dataType=="date") {
                document.getElementById(searchDataDateDivId).style.display='';
                document.getElementById(searchDataBlnDivId).style.display='none';
                document.getElementById(searchDataDivId).style.display='none';
            }
      }
                                                                  
      function loadSearchOptions() {
                              
         for(var indx=1;indx<=searchOptions.length;indx++) {
                var searchOption=searchOptions[indx-1];
                                                              
                dijit.byId("field"+indx).setValue(searchOption.fieldId);
                                                                                
                var store=getStore(searchOption.fieldType);
                dijit.byId("operator"+indx).store=store;                                                                                                        
                dijit.byId("operator"+indx).setValue(searchOption.operatorId);
                                                
                var field=getField(searchOption.fieldId);  
                if(searchOption.value=='null') {
                    searchOption.value='';
                }                              
                setValueBasisDataType(field.type,indx,searchOption.value);                                                
                
         }  
		 
        }
		function disableDeleteButton(obj)
			  {
			 	document.getElementById("selectedRecordParentId").value = obj.value;
				 if(document.getElementById('userId').value == obj.value){
					 dijit.byId("idDelete").setAttribute('disabled', true);
				}
				else {
					 dijit.byId("idDelete").setAttribute('disabled', false);
					
				}
			  }
</script>

</html:form>
</body>
</html:html>