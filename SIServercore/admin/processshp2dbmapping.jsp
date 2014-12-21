<%@page import="com.enterprisehorizons.util.Logger"%>
<%@page import="com.enterprisehorizons.util.StringUtils"%>
<%@page import="com.enterprisehorizons.magma.server.admin.Shp2DBMappingUtils"%>
<%@page import="com.enterprisehorizons.magma.server.admin.Shp2DBExportUtils"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="com.enterprisehorizons.magma.ecoweb.constants.IWebSessionContants,javax.servlet.http.HttpSession,com.spacetimeinsight.security.bean.UserBean"%>

<%
	boolean flag = false;
	String errorMessage = null;
	HttpSession httpSession = request.getSession(false);
	String operation = request.getParameter("operation");
	String shapeFileName = request.getParameter("shapeFileName");
	String dbModelName = request.getParameter("dbModelName");
	String loginId = ServerUtils.getUserLoginIdFromRequest(request);
		
	try {
		if(!StringUtils.isNull(operation)) {
			if(operation.equalsIgnoreCase("add") || operation.equalsIgnoreCase("update")) {
				String[] dbModelFields = Shp2DBMappingUtils.getModelFields(dbModelName,"mapping");
				int noOfModelFields  =  dbModelFields == null ? 0 : dbModelFields.length;
				String[][] mappingValues = new String[noOfModelFields][2];
				String mappedValue = null;
				String collatorType = request.getParameter("cmbCollator");
				String[][] collatorParameters = null;
				if(collatorType != null && collatorType.indexOf("MergingTieLineCollator") > 0) {
					collatorParameters = new String[2][2];
					collatorParameters[0][0] = "java.lang.Double";
					collatorParameters[0][1] = request.getParameter("txtRadius");
					collatorParameters[1][0] = "java.lang.Integer";
					collatorParameters[1][1] = request.getParameter("cmbCollateBy");
				}
				
				for(int i = 0; i < noOfModelFields; i++) {
					mappingValues[i][0] = dbModelFields[i];
					mappedValue = request.getParameter(dbModelFields[i]);
					if(!StringUtils.isNull(mappedValue) && mappedValue.equalsIgnoreCase("custom")) {
						mappedValue = request.getParameter("txt"+dbModelFields[i]);
						if(!StringUtils.isNull(mappedValue)) {
							mappingValues[i][1] = Shp2DBMappingUtils.CUSTOM_VALUE_PREFIX+mappedValue.trim();
						}
					} else {
						mappingValues[i][1] = mappedValue;
					}
				}
				if(operation.equalsIgnoreCase("add")) {	
					flag = Shp2DBMappingUtils.addMappingDefinition(dbModelName,shapeFileName,mappingValues,collatorType,collatorParameters, (UserBean) httpSession.getAttribute(IWebSessionContants.SECURITY_USER_BEAN));
				} else {
					flag = Shp2DBMappingUtils.updateMappingDefinition(dbModelName,shapeFileName,mappingValues,collatorType,collatorParameters, (UserBean) httpSession.getAttribute(IWebSessionContants.SECURITY_USER_BEAN));
				}
			} else if(operation.equalsIgnoreCase("delete")) {
				flag = Shp2DBMappingUtils.deleteMappingDefinition(shapeFileName, loginId);
			} else if(operation.equalsIgnoreCase("export")) {
				flag = Shp2DBExportUtils.exportToDB(dbModelName, true);
			}
		}
	} catch(Exception e) {
		Logger.error("Error occurred while performing "+operation+" for ShapeFile = ["+shapeFileName+"] & DBModel = ["+dbModelName+"]", "processshp2dbmapping.jsp", e);
		errorMessage = e.getLocalizedMessage();
	}
	if(operation.equalsIgnoreCase("export")) {
		response.sendRedirect(ServerUtils.getContextName(request)+"/admin/shp2dbmappingexport.jsp?success="+flag+"&errorMessage="+errorMessage);
	} else {
		response.sendRedirect(ServerUtils.getContextName(request)+"/shapedbMapping.do?success="+flag+"&errorMessage="+errorMessage);
	}
	
%>