<%@page import="com.enterprisehorizons.util.Logger"%>
<%@page import="com.enterprisehorizons.util.StringUtils"%>
<%@page import="com.enterprisehorizons.magma.server.admin.Excel2DBUtils"%>


<%
	boolean flag = false;
	String errorMessage = null;
	
	String operation = request.getParameter("operation");
	String dbModelName = request.getParameter("dbModelName");
	try {
		if(operation != null && operation.equalsIgnoreCase("import")) {
			String fileName = dbModelName;
			int index = dbModelName.lastIndexOf(".");
			if(index > 0) {
				fileName = dbModelName.substring(index+1);
			}
			
			//response.setContentType("application/vnd.ms-excel");
			response.setContentType("application/download");
			response.setHeader("Content-disposition", "attachment;filename=" + fileName + ".xls");			
			Excel2DBUtils.exportToExcel(response.getOutputStream(), dbModelName);
		} else if(operation != null && operation.equalsIgnoreCase("build")) {
			MasterDataUtils.build(dbModelName);
			flag = true;
		} else {
			Excel2DBUtils.updateDBFromExcel(request, "dbModelName");
			flag = true;
		}
		
	} catch(Exception e) {
		Logger.error("Error occurred while performing "+operation+" for DBModel = ["+dbModelName+"]", "processmaintaindata.jsp", e);
		errorMessage = e.getLocalizedMessage();
	}
	
	if(operation == null || !operation.equalsIgnoreCase("import")) {
		response.sendRedirect("maintaindata.jsp?success="+flag+"&errorMessage="+errorMessage);
	}
	
%>