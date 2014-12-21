<%@page import="com.enterprisehorizons.magma.server.admin.Shp2DBMappingUtils"%>


<%		
		String[][] dbModels = Shp2DBMappingUtils.getDBModels();
		int noOfModels = dbModels == null ? 0 : dbModels.length;
				
%>

<jsp:include page="../common/header.jsp">
	<jsp:param name="title" value="MaintainData" />
</jsp:include>
<jsp:include page="../common/message.jsp"/>

<script language="javascript">

	function submitForm(btn) {
		var id = btn.id;

		if(id == "Maintain") {
			var modelName = document.frm.dbModelName.value;
			var query = "";
			if(modelName == "com.enterprisehorizons.db.grid.model.Substation") {
				query = "order by ownedBy, name";
			} else if(modelName == "com.enterprisehorizons.db.grid.model.TieLine") {
				query = "order by ownedBy, name";
			} else if(modelName == "com.enterprisehorizons.db.grid.model.SubstationPIData") {
				query = "order by piTag";
			} else if(modelName == "com.enterprisehorizons.db.grid.model.TieLinePIData") {
				query = "order by tieLineName";
			} else if(modelName == "com.enterprisehorizons.db.grid.model.WeatherStation") {
				query = "order by name";
			}
			window.open ("viewTableData.jsp?modelName="+modelName+"&query="+query, "viewTable","menubar=0,resizable=1,scrollbars=1,width=600,height=400");
			return true;
		} else {
			if(id == "Export") {
				frm.action = "excel2db.jsp";
			} else if(id == "Import") {
				frm.operation.value =  "import";
				frm.action="processmaintaindata.jsp"
			} else if(id == "Build") {
				frm.operation.value =  "build";
				frm.action="processmaintaindata.jsp"
			}
			frm.submit();
		}
	}

	function disableBtns() {
		var flag = false;
		if(frm.dbModelName.selectedIndex == 0) {
			flag = true;
		}
		
		if(frm.dbModelName.value == 'com.enterprisehorizons.db.grid.model.TieLine') {
			frm.btnBuild.disabled = true;
		} else {
			frm.btnBuild.disabled = false;
		}
		frm.btnImport.disabled = flag;
		frm.btnExport.disabled = flag;
		frm.btnMaintain.disabled = flag;
	}
	
</script>

<form name="frm" method="post">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">
	<table width="100%" border="0" cellpadding="2" cellspacing="2">
			<tr valign="top">
		<%
			if(noOfModels == 0) { 
		%>
			<td> <br><b>No models exist to Maintain</b>
			</td>
		<%
			} else { 
		%>
			<td> <br>DB Model
			</td>
			<td> <br>
				<select name="dbModelName" onChange="disableBtns();" autocomplete="off">
					<option value="" selected> </option>
			<%
				for(int i = 0; i < noOfModels; i++) {
			%>	
						<option value="<%=dbModels[i][1]%>"><%=dbModels[i][0]%></option>
			<%
				}
			%>			
				</select>
			</td>
		<%
			}
		%>			
		</tr>
	</table>
<jsp:include page="../common/buttons_maintaindata.jsp"/>
<script>disableBtns();</script>
<input type="hidden" name="operation"/>

</form>
<jsp:include page="../common/adminnavigation.jsp"/>
<jsp:include page="../common/footer.jsp"/>
