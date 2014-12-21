<%@ page import="org.owasp.esapi.ESAPI" %>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>


<%@ page import="com.enterprisehorizons.util.StringUtils" %>
<%
    //file extensions need to be sent as Label:Extensions separated by commas. For ex. "JPG:*.jpg,All Image files:*.jpg;*.png"
    String fileExtensionsStr = request.getParameter("fileExtensions");
    String[] extensions = StringUtils.split(fileExtensionsStr);
    /*for(int i=0; i< extensions.length; i++){
        out.println(extensions[i]+ " --" );
    }*/
    if(extensions == null || extensions.length == 0) {
        extensions = new String[]{"All files:*.*"};
    }
    int count = extensions == null ? 0 : extensions.length;

%> 
<html:html locale="true">
<head><title></title>
<link rel="stylesheet" href="js/demo.css">
<%@ include file="/common/dojo.jsp" %>
<script>
var xmlhttpGetMsg;
var validCharactersForFileName_Msg = "0-9,a-z,A-Z,_. ";
function GetXmlHttpObject(){
    var objXMLHttp = null;
    if (window.XMLHttpRequest){
        objXMLHttp=new XMLHttpRequest();
    }else if (window.ActiveXObject){
        objXMLHttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    return objXMLHttp;
}

function  ChkSession()
{
xmlhttpGetMsg = GetXmlHttpObject();
xmlhttpGetMsg.onreadystatechange = chkAjax;  
xmlhttpGetMsg.open("POST","multiUploadAction.do?flag=frmTestAjax",true);
xmlhttpGetMsg.send(null);   
}


function chkAjax()
{
	if (xmlhttpGetMsg.readyState == 4 || xmlhttpGetMsg.readyState == "COMPLETED")
	{
		if(xmlhttpGetMsg.responseText == "sessionInvalidate" )
		{
				
			try{
				parent.refreshSessionInvalid(); 
			}catch(err){
	
			}

		}
	}
}
var showOKDialog ;

function isValidFileName(fileName){
	
	if(fileName != null && fileName.length > 0){
		
		
	if(!validatefilename(fileName)){
		//dijit.byId('uploadBtn').setAttribute('disabled', true);
			showOKDialog = new dijit.Dialog({
            title: "<bean:message key='admin.common.dialog.loading' bundle='admin'/>",
            style: "width: 320px;height:150px"
        });       		
		   var data2Display = "<bean:message key='upload.check.filename.char' bundle='delete'/>";
		   showOKDialog.attr("title",  "<bean:message key='upload.file.alert.title' bundle='delete'/>");
		   showOKDialog.attr("content", "<center><table ><tr><td align=center></tr><tr><td align='center'>"+data2Display+"</td></tr><tr><td align='center'>    <button dojoType=dijit.form.Button type='submit'><bean:message key='admin.common.dialog.ok' bundle='admin'/></button></td></td></tr></table></center>");
		   //showOKDialog.show();
		return false;
		}else{
		return true;
		}
	}
	
	return false;	
}

</script>

<script type="text/javascript">
    dojo.require("dojo.data.ItemFileReadStore");            
    dojo.require("dojox.form.FileUploader");
    dojo.require("dojox.analytics.Urchin");
</script>
<script>
  var uploadUrl = "multiUploadAction.do?flag=frmUpload" ;
  var files2Remove=''; 
  
  dojo.addOnLoad(attachUploadEvent);
               
   function attachUploadEvent() {	   
    dojo.byId("fileToUpload").value = "";    
    var fileMask = [
    <%
       String[] fileMasks = null;
       for(int i = 0; i < count; i++) {
           fileMasks = StringUtils.split(extensions[i], ":");
           if(fileMasks == null || fileMasks.length == 2) {
               out.println("[\""+ESAPI.encoder().encodeForHTML(fileMasks[0])+"\",\""+ESAPI.encoder().encodeForHTML(fileMasks[1])+"\"]");
           }else{
                out.println("[\""+ESAPI.encoder().encodeForHTML(extensions[i])+"\",\"*"+ESAPI.encoder().encodeForHTML(extensions[i])+"\"]");
           }
           if(i != count-1) {
               out.println(",");
           }
            
       }
    %>
    ];
   

    doUpload = function(){
 
	dijit.byId('browseBtn').setAttribute('disabled', true);

	//showProgressDialog("Files are Uploading....","Multi File Upload");
	dijit.byId('uploadBtn').setAttribute('disabled', true);
	document.getElementById("uploadBtn").value="<bean:message key='upload.progress.label' bundle='delete'/>";
    fileUploaderObj.upload();
    }
        
    var fileUploaderObj = new dojox.form.FileUploader({
        button:dijit.byId("browseBtn"), 
        degradable:true,
        uploadUrl:uploadUrl, 
        uploadOnChange:false, 
        fileMask: fileMask,
        selectMultipleFiles:true
    });

        
    var i=0;
    var dataObj;
     
    dojo.connect(fileUploaderObj, "onChange", function(data){
	
        dojo.byId("fileToUpload").value = "";
        dojo.byId("uploadedFiles").value = "";
        dataObj = data;
        document.getElementById("uploadBtn").value="Upload";
        dojo.forEach(data, function(d){
            //dojo.byId("fileToUpload").options[i] = new Option(d.name,i,false,false);
            //if(isValidFileName(d.name)){
				dijit.byId('uploadBtn').setAttribute('disabled', false);
				dojo.byId("fileToUpload").value += d.name+" \n";
            //}
            i++;
        });
    });

    dojo.connect(fileUploaderObj, "onProgress", function(data){             
        //dojo.byId("fileToUpload").value = "uploading...";
        data = dataObj;
        dojo.byId("fileToUpload").value = "";
        dojo.forEach(data, function(d){//alert((d.percent + "")== "undefined");
           // dojo.byId("fileToUpload").value += "("+d.percent+"% uploaded) "+d.name+" \n";
            if(d.percent + "" == "undefined")
            {
                //dojo.byId("fileToUpload").value += "("+"uploaded) "+d.name+" \n";
                dojo.byId("fileToUpload").value += "("+"uploaded) "+d.name+" \n";          
            }
            else
            {
				dojo.byId("fileToUpload").value += "("+d.percent+"% uploaded) "+d.name+" \n";
            }

        });		
    });

    dojo.connect(fileUploaderObj, "onComplete", function(data){
	 
        data = dataObj;	
		var validFileCount = 0;
        dojo.forEach(data, function(d){
			if(isValidFileName(d.name)){
				dojo.byId("uploadedFiles").value += d.name +" (Passed) \n"; 				
			}else{
				dojo.byId("uploadedFiles").value += d.name +" (Failed) \n"; 	
				validFileCount++;
			}
         });
		 		        dijit.byId('browseBtn').setAttribute('disabled', false);

      //  hideProgressDialog();
	  if(validFileCount > 0){
		showOKDialog.show();
	  }
      document.getElementById("uploadBtn").value="<bean:message key='upload.progress.complete.label' bundle='delete'/>";
        dijit.byId('uploadBtn').setAttribute('disabled', true);
    });
    
    Destroy = function(){
       try{
      	 fileUploaderObj.destroyAll();
       }
		catch (e){}
    }               
}
   

function showStatus(val, totalSize, currentValue){
    dojo.byId("uploadedFiles").value += val+" \n";
    hideUploadDialog();
    if(totalSize == (parseInt(currentValue)+1)){    
        //showEmptyDialog('hi');                
    }
}


function removeImage(){
    var s = document.forms[0].fileToUpload;
    for(i=(s.options.length-1); i>=0; i--){
        var o = s.options[i];
        if (o.selected){
            var fileValue = s.options[i].value;
            var fileName = s.options[i].text;
            s.options[i].style.background ='gray';
            dojo.byId("fileToBeRemove").options[fileValue] = new Option(fileName,fileValue,false,false);
        //  alert(dijit.byId('uploadedfile0').attr('value'));
        }
    }
}

function addImage(selectedObject){
    var s = document.forms[0].fileToBeRemove;
    var s1 = document.forms[0].fileToUpload;
    for(i=(s.options.length-1); i>=0; i--){
        var o = s.options[i];
        if (o.selected){
            var fileValue = s.options[i].value;
            var fileName = s.options[i].text;
            s.options[i].style.background ='gray';
            s1.options[selectedObject.value].style.background ='white';
            dojo.byId("fileToBeRemove").remove(i);
        //  alert(dijit.byId('uploadedfile0').attr('value'));
        }
    }
}

function getFiles2Remove(){
    files2Remove='';
    var s = document.forms[0].fileToBeRemove;
    for(i=(s.options.length-1); i>=0; i--){
        var o = s.options[i];
        var fileValue = s.options[i].value;
        if(i == (s.options.length-1))
            files2Remove = fileValue;
        else if(i == 0)
            files2Remove += ','+fileValue;
        else
            files2Remove += ','+fileValue;      

        }
        return files2Remove;
}



</script>
</head>

<body class="tundra bodybg">
  <form  action="multiUploadAction.do?flag=upload" method="POST" enctype="multipart/form-data">
    <logic:present name="frommainpage" scope="request">
         <input type="hidden" name="frommainpage" value="true"/> 
    </logic:present>  
	<input type="hidden" id="csrf" name="csrf" value="${csrf}">

    <table  border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height="13px"></td>
        <td  class="error">
				<html:errors bundle="delete"/> 
	          </td>
      </tr> 

      <tr>
        <td align="right">
          <div id="browseBtn" class="browse" dojoType="dijit.form.Button" onclick="attachUploadEvent()"><bean:message key="upload.selectFiles" bundle="delete"/></div>
         </td>
      </tr>
      <tr>
         <td><strong><bean:message key="upload.files.select" bundle="delete"/></strong></td>
        <td height="13px"></td>
      </tr>
         <tr>
            <td style="padding-right:3px;">
                 <textarea cols="50" rows="4" name="fileToBeUploaded" id="fileToUpload" style="width:400px" readonly="readonly"></textarea>
            </td>   
          </tr>
           <tr>
        <td height="13px"></td>
      </tr>
          <tr>
            <td align="right">
                  <div id="uploadBtn" class="uploadBtn" onClick="ChkSession();doUpload();" dojoType="dijit.form.Button"><bean:message key="upload.upload" bundle="delete"/></div>             
            </td>
            </tr>
             <tr>
        <td height="13px"></td>
      </tr>
            <tr>
            <td style="padding-right:3px;">
          <div class="uploadedFilesLabel"><strong><bean:message key="upload.uploadedFiles" bundle="delete"/></strong></div>
          <textarea cols="50" rows="4" id="uploadedFiles" style="width:400px" readonly="readonly"></textarea>
        </td>
      </tr>
       <tr>
        <td height="30px"></td>
      </tr>
    </table>    
  </form> 
<script>
    dojo.addOnLoad(loadFormValues); 
        function loadFormValues(){
            dijit.byId('uploadBtn').setAttribute('disabled', true);
        }
		function validateSplChar(val){
	 if(val != "") {
var textength =  val.length;
		var textValue =  val;
var tChars = "\\'\"\(\)\{\}";
for (var i = 0; i < textength; i++) {
	
		if (tChars.indexOf(textValue.charAt(i)) != -1)
return false;
}
}

return true;
}
</script>

</body>
</html:html>