<%@page import="com.enterprisehorizons.util.Logger"%>
<%@page import="com.enterprisehorizons.util.StringUtils"%>
<%@page import="com.enterprisehorizons.magma.server.admin.CacheUtils"%>


<%
	boolean flag = false;
	String errorMessage = null;
	try {
		String radioBtnValue = request.getParameter("btnRadioCache");
		if(radioBtnValue != null) {
			if(radioBtnValue.equalsIgnoreCase("clearAll")) {
				CacheUtils.clearAll();
				flag = true;
			} else if(radioBtnValue.equalsIgnoreCase("clearKey")) {
				String cacheKey = request.getParameter("cmbCacheKey");
				if(!StringUtils.isNull(cacheKey)) {
					CacheUtils.clear(cacheKey);
					flag = true;
				}
			}
		}
	} catch(Exception e) {
		Logger.error("Error occurred while clearing the cache ", "processcache.jsp", e);
		errorMessage = e.getLocalizedMessage();
	}
	
	response.sendRedirect("/admin/cache.jsp?success="+flag+"&=errorMessage"+errorMessage);
%>