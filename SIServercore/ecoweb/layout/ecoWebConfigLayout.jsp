

<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>

<% 
response.setHeader("Cache-Control","no-cache"); // HTTP 1.1
response.setDateHeader ("Expires", -1); // Prevents caching at the proxy server
%>
<html>
<head>
	<title><tiles:getAsString name="title"/></title>
	
<link href="css/style.css" rel="stylesheet" type="text/css" />
<style>
TR.class_hover{
    text-align: left;
    font-size: 12px;
    font-weight:bold;
    vertical-align: middle;
    background-color: #B1CFF5;
    cursor: pointer; /* hand-shaped cursor */
    cursor: hand; /* for IE 5.x */

}
TR.class_no_hover{
    font-size: 12px;
    font-weight:bold;
    vertical-align: middle;
    /* background-color: #D0E4F8; */
    text-align: left;
}
</style>

<script language="javascript">

	function openPopupToViewRecord(idvalue){
		window.open ("./masterTableRecordViewAction.do?selectedId=" +idvalue , "viewTable","menubar=0,resizable=1,scrollbars=1,width=400,height=400");
		return true;
	}

	function previousPage(){
		var pageNo = document.getElementById("pageNo").value;

		if(parseInt(pageNo)>1){
			document.masterTableViewForm.pageNo.value = (parseInt(pageNo)-1);
			document.forms[0].action="./masterTableViewAction.do";
			document.forms[0].submit();
		}
	}


	function nextPage(){
		var pageNo = document.getElementById("pageNo").value;
		var totalNoOfPages = document.getElementById("totalNoOfPages").value;
		if(parseInt(pageNo)<totalNoOfPages){
			document.masterTableViewForm.pageNo.value = (parseInt(pageNo)+1);
			document.forms[0].action="./masterTableViewAction.do";
			document.forms[0].submit();
		}
	}

	function gotoPage(pageNo){
			document.masterTableViewForm.pageNo.value = pageNo;
			document.forms[0].action="./masterTableViewAction.do";
			document.forms[0].submit();
	}

	function onEnterGoToPage(){
	    if(window.event.keyCode==13){
			var pageNo = document.getElementById("enteredPageNo").value;
			var totalNoOfPages = document.getElementById("totalNoOfPages").value;
			if(parseInt(pageNo)>=1 && parseInt(pageNo)<=totalNoOfPages){
				document.masterTableViewForm.pageNo.value = pageNo;
				document.forms[0].action="./masterTableViewAction.do";
				document.forms[0].submit();
			}		
		}
	}


	function submitForm(btn) {
			document.forms[0].viewSubmitName.value=btn.value;
			document.forms[0].action="./masterTableViewAction.do";
			var flag = "true"
			if(btn.value == "Delete"){
				flag = confirmDelete();
			}
			if(flag){
				document.forms[0].submit();
			}
	}

	function confirmDelete(){
		return confirm("Are you sure to delete");
		
	}

	function disableButtons() {
			document.getElementById("btnModify").disabled = true;
			document.getElementById("btnDelete").disabled = true;
	}

	function enableButtons() {
		document.getElementById("btnModify").disabled = false;
		document.getElementById("btnDelete").disabled = false;
	}
	 var tr_selected = '';
	  function hover(obj){
        obj.className='class_hover';
    }

    function unHover(obj, row_num){
        if (tr_selected != row_num) obj.className = 'class_no_hover';
    }

</script>


</head>

<body>
	<table cellpadding="0" cellspacing="0" bgcolor="#ffffff" border="0" align="center">
		<tr >
	        <td align="center" >
			<!-- Header 
			<tiles:get name="header"/>-->
			</td>
		</tr>
		<tr>
	        <td align="left" class="visiontxt" >
			<!-- Header 
				
			-->	
				
			</td>
		</tr>
		<tr>
		    <td height="50%">
				<!-- Body -->



<table width="100" border="0" align="center" cellpadding="0" cellspacing="2" bgcolor="#FFFFFF">
 
  <tr>
    <td><table width="100%" border="0" cellspacing="2" cellpadding="2">
      <tr>
        <td width="100%" align="left"><table class="clsTDForLabel2" cellspacing="2" cellpadding="2" width="100%" 
      align="center" border="0">
         
          </table>
          <table width="100%" border="0" cellspacing="2" cellpadding="2">
            <tr>
              <td align="center" valign="top"><table width="100%" border="0" cellpadding="0" cellspacing="0">
                
                <tr>
                  <td><table border="0" cellpadding="0" cellspacing="0" width="868">
                    <!-- fwtable fwsrc="Untitled" fwpage="Page 1" fwbase="rr.jpg" fwstyle="Dreamweaver" fwdocid = "302053684" fwnested="0" -->
                   
                   
                    <tr>
                      <td height="500" >&nbsp;</td>
                      <td align="center" valign="top" bgcolor="#ffffff"><table  cellspacing="2" cellpadding="2" width="100%" 
      align="center" border="0">
                          
                            
                            
                  
                          <caption class="text4" >
                            <b><I><tiles:getAsString name="bodyTitle" ignore="true"/></I></b>
                          </caption>
                        <tbody>
                        	
                          <tr>
                          	 	<td colspan="6" align="left">
                          	 		<tiles:get name="body"/>
                          		</td>
	                      </tr>
                          
                          </tbody>
                        </table>
                          <p style="margin:0px"></p></td>
                      <td height="404" background="ecoweb/images/rr_r2_c3.jpg">&nbsp;</td>
                      <td><img src="ecoweb/images/spacer.gif" width="1" height="404" border="0" alt="" /></td>
                    </tr>
                    
                  </table></td>
                </tr>
              </table></td>
            </tr>
          </table>
          </td>
        </tr>

     
    </table></td>
  </tr>
  
</table>

				
				
			</td>
		</tr>
		<tr>
		      <td>
				<!-- footer 
				<tiles:get name="footer"/> -->
			 </td>
		</tr>
	</table>
</body>
</html>
