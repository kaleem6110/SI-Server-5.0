<%@ page import="java.util.*,com.enterprisehorizons.db.util.*,com.enterprisehorizons.util.*" %> 
<%@page import="org.owasp.esapi.ESAPI"%>
<HTML>
  <HEAD>
    <TITLE>MaintainData</TITLE>
    <STYLE>
    .dataTable      { border: black 1px solid; border-collapse:collapse; }
    .dataHeaderCell { background-color: lightSteelBlue; border:black 1px solid; padding:5px; font: small-caps bold 10pt verdana }
    .dataRowOdd     { background-color: mintCream; border:BLACK 1px solid; padding:5px; font:normal 10pt verdana; color:black}
    .dataRowEven    { background-color: white; border:BLACK 1px solid; padding:5px; font:normal 10pt verdana; color:black}
    .dataCell       { border:BLACK 1px solid; padding:5px;}
    .dataRowOver    { background-color: navy; border:BLACK 1px solid; padding:5px; font:bold 10pt verdana; color: white}
    </STYLE>
	<SCRIPT>
    function loadRecord(){
    	var trObj;
    	if(window.event.srcElement.tagName=="TD"){
			trObj = window.event.srcElement.parentElement;
    	}else if(window.event.srcElement.tagName=="TR"){
    		trObj = window.event.srcElement;
    	}
    	for(i=0;i<trObj.cells.length;i++){
			document.getElementById("txtField"+i).value = trObj.cells[i].innerText;
    	}
		document.getElementById("btnCreate").disabled = true;
		document.getElementById("btnModify").disabled = false;
		document.getElementById("btnDelete").disabled = false;    	
    }
    
    function editLongText(textFieldName,textFieldLabel){
    	txtField = document.getElementById(textFieldName);
	    var generator=window.open('','name','height=400,width=500');
  	    generator.document.write('<html><head><title>Edit Long Text</title>');
  	    generator.document.write('</head><body>');
	    generator.document.write('<p>'+textFieldLabel+':</p>');
	    generator.document.write('<TEXTAREA NAME="taLongText" COLS=55 ROWS=10>'+txtField.value+'</TEXTAREA>');
	    generator.document.write('<p><input type="button" value="Done" onclick="window.opener.setLongTextVal(taLongText.value,\''+txtField.id+'\');window.close();"></p>');
	    generator.document.write('</body></html>');
	    generator.document.close();
    }

	function setLongTextVal(txtVal,txtObjId){
		document.getElementById(txtObjId).value = txtVal;
	}
	
	function previousPage(){
		var pageNo = document.getElementById("pageNo").value;
		var modelName = document.getElementById("modelName").value;
		var query = document.getElementById("query").value;
		if(parseInt(pageNo)>1){
			window.location = "viewTableData.jsp?modelName="+modelName+"&query="+query+"&pageNo="+(parseInt(pageNo)-1);
		}
	}
	
	function nextPage(){
		var pageNo = document.getElementById("pageNo").value;
		var modelName = document.getElementById("modelName").value;
		var query = document.getElementById("query").value;
		var totalNoOfPages = document.getElementById("totalNoOfPages").value;
		if(parseInt(pageNo)<totalNoOfPages){
			window.location = "viewTableData.jsp?modelName="+modelName+"&query="+query+"&pageNo="+(parseInt(pageNo)+1);
		}
	}
	
	function onEnterGoToPage(){
	    if(window.event.keyCode==13){
			var pageNo = document.getElementById("pageNo").value;
			var modelName = document.getElementById("modelName").value;
			var query = document.getElementById("query").value;
			var totalNoOfPages = document.getElementById("totalNoOfPages").value;
			if(parseInt(pageNo)>=1 && parseInt(pageNo)<=totalNoOfPages){
				window.location = "viewTableData.jsp?modelName="+modelName+"&query="+query+"&pageNo="+pageNo;
			}		
		}
	}
	
	function gotoPage(pageNo){
		var modelName = document.getElementById("modelName").value;
		var query = document.getElementById("query").value;
		window.location = "viewTableData.jsp?modelName="+modelName+"&query="+query+"&pageNo="+pageNo;
	}
	
	function addNewRecord(){
		document.getElementById("mode").value = "ADD";
		document.viewTableForm.submit();
	}
	
	function saveRecord(){
		document.getElementById("mode").value = "SAVE";
		document.viewTableForm.submit();
	}
	
	function deleteRecord(){
		document.getElementById("mode").value = "DELETE";
		document.viewTableForm.submit();	
	}
	
	function clearFields(){
		document.getElementById("mode").value = "VIEW";
		noOfFields = parseInt(document.getElementById("noOfFields").value);
		for(i=0;i<noOfFields;i++){
			document.getElementById("txtField"+i).value = "";
		}
		document.getElementById("btnCreate").disabled = false;
		document.getElementById("btnModify").disabled = true;
		document.getElementById("btnDelete").disabled = true;
	}
	
	function init(){
		clearFields();
	}
    </SCRIPT>    
  </HEAD>
  <BODY onload="init();">
  <FORM NAME="viewTableForm" ACTION="processTableData.jsp" METHOD="POST">
	<input type="hidden" id="csrf" name="csrf" value="${csrf}">
  	<%
  		String pageNoParam = request.getParameter("pageNo");
  		int pageNo = 1;
  		if (pageNoParam!=null)
  			pageNo = Integer.parseInt(pageNoParam);
  	    String modelName = request.getParameter("modelName");
  	    String query = request.getParameter("query");
		EntityManager eMgr = new EntityManager(modelName,query,15);
		int totalNoOfPages = eMgr.getNoOfPages();
		GenericTable tableRows = eMgr.getPage(pageNo);
		String[] fields = tableRows.getFieldNames();
	%>
    <TABLE>
    	<% for(int i=0;i<fields.length;i++){%>
	  		<TR>
	  			<TD width="10">&nbsp;</TD>
	  			<TD><%=StringUtils.toSentenceCase(fields[i])%></TD>
	  			<TD width="10">&nbsp;</TD>
	  			<%if(eMgr.getIdName()!=null && eMgr.getIdName().equals(fields[i])){%>
		  			<TD><input type="text" name="txtField<%=i%>" id="txtField<%=i%>" autocomplete="off" READONLY="true"></TD>
		  			<TD></TD>
	  			<%}else{%>
	  		    	<TD><input type="text" name="txtField<%=i%>" autocomplete="off" id="txtField<%=i%>"></TD>
					<TD><input type="button" value="..." onclick="editLongText('txtField<%=i%>','<%=StringUtils.toSentenceCase(fields[i])%>')"></TD>	  		    	
	  		    <%}%>
	  		    
	  		<%if(i<fields.length-1){ i++;%>
	  			<TD width="10">&nbsp;</TD>
	  			<TD><%=StringUtils.toSentenceCase(fields[i])%></TD>
	  			<TD width="10">&nbsp;</TD>
	  		    <TD><input type="text" name="txtField<%=i%>" id="txtField<%=i%>" autocomplete="off"></TD>
	  		    <TD><input type="button" value="..." onclick="editLongText('txtField<%=i%>','<%=StringUtils.toSentenceCase(fields[i])%>')"></TD>
	  		<%}%>
	  		</TR>    	
    	<% }%>
    	<TR><TD COLSPAN="10">&nbsp;</TD></TR>
    	<TR><TD>&nbsp;</TD>
    	    <TD COLSPAN="9">
    		<INPUT TYPE="button" id="btnCreate" value="Create" onclick="addNewRecord();">
    		<INPUT TYPE="button" id="btnModify" value="Modify" onclick="saveRecord();">
    		<INPUT TYPE="button" id="btnDelete" value="Delete" onclick="deleteRecord();">
    		<INPUT TYPE="button" id="btnClear"  value="Clear"  onclick="clearFields();">
    	</TD></TR>
    	<TR><TD COLSPAN="10">&nbsp;</TD></TR>
  	</TABLE>	
    	<TABLE CLASS="dataTable">
		<TR><TD CLASS="dataCell" COLSPAN="<%=fields.length%>"> <%=ESAPI.encoder().encodeForHTML(modelName)%> </TD></TR>    	
		<TR>
	<%	for(int k=0;k<fields.length;k++){ %>
			<TD CLASS="dataHeaderCell"><%=StringUtils.toSentenceCase(fields[k])%></TD>
	<%	}	
		String oddEven = "Even";
	%>
		</TR>
	<%	for(int i=0;i<tableRows.getSize();i++){	
			oddEven = (i%2==0)?"Even":"Odd";
	%>
			<TR CLASS="dataRow<%=oddEven%>" onclick="loadRecord();">
	<%		for(int j=0;j<fields.length;j++){ %>
	     		<TD CLASS="dataCell">
	     		    <%=tableRows.getFieldValue(i,fields[j])%></TD>
	<%		} %>
			</TR>
	<%	} 
	%>
     	<TR>
     	    <TD CLASS="dataHeaderCell" COLSPAN="<%=fields.length%>">
       	    	<INPUT TYPE="button" id="btnFirstPage" value="<<" onclick="gotoPage(1);">&nbsp;
     	    	<INPUT TYPE="button" id="btnPreviousPage" value="<" onclick="previousPage();">&nbsp;
     	    	<INPUT TYPE="text"   ID="pageNo"  size="5" NAME="pageNo" value="<%=pageNo%>" onkeypress="onEnterGoToPage();" autocomplete="off">&nbsp;
     	    	of <%=totalNoOfPages%> &nbsp;
     	    	<INPUT TYPE="button" id="btnNextPage"     value=">" onclick="nextPage();">
     	    	<INPUT TYPE="button" id="btnLastPage"     value=">>" onclick="gotoPage(<%=totalNoOfPages%>);">
     	    </TD>
     	</TR>    
  		</TABLE>
  		<% for(int i=0;i<fields.length;i++){%>
	  		<INPUT TYPE="hidden" ID="txtFieldName<%=i%>" NAME="txtFieldName<%=i%>" VALUE=<%=fields[i]%>>
  		<%}%>
  		<INPUT TYPE="hidden" ID="noOfFields"     NAME="noOfFields"     VALUE="<%=fields.length%>">
  		<INPUT TYPE="hidden" ID="totalNoOfPages" NAME="totalNoOfPages" VALUE="<%=totalNoOfPages%>">
  		<INPUT TYPE="hidden" ID="modelName"      NAME="modelName"      VALUE="<%=ESAPI.encoder().encodeForHTML(modelName)%>">
  		<INPUT TYPE="hidden" ID="query"      	 NAME="query"      	   VALUE="<%=ESAPI.encoder().encodeForHTML(query)%>">
  		<INPUT TYPE="hidden" ID="mode"           NAME="mode"           VALUE="view">  		
  		<INPUT TYPE="hidden" ID="idFieldName"    NAME="idFieldName"    VALUE="<%=eMgr.getIdName()%>">
  		
  	</FORM>	
  </BODY>
</HTML>