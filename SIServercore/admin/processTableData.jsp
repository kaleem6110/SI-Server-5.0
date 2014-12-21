<%@ page import="java.util.*,com.enterprisehorizons.db.util.*,com.enterprisehorizons.util.*, com.enterprisehorizons.db.dao.*" %>
<%@ page import="org.owasp.esapi.ESAPI" %>
<%
  	    String modelName = request.getParameter("modelName");
  	    String query = request.getParameter("query");
  	    String mode = request.getParameter("mode");

  		String pageNoParam = request.getParameter("pageNo");
  		int pageNo = 1;
  		if (pageNoParam!=null)
  			pageNo = Integer.parseInt(pageNoParam);

  	    String noOfFieldsParam = request.getParameter("noOfFields");
  	    int noOfFields = 0;
  		if (noOfFieldsParam!=null)
  			noOfFields = Integer.parseInt(noOfFieldsParam);  	    
  	    
  	    String fieldNames[] = new String[noOfFields];
  	    String fields[] = new String[noOfFields];
  	    HashMap values = new HashMap();
  	    
  	    for(int i=0;i<noOfFields;i++){
  	    	fields[i]     = request.getParameter("txtField"+i);
  	    	fieldNames[i] = request.getParameter("txtFieldName"+i);
  	    	values.put(fieldNames[i],fields[i]);
  	    }
  	    
   		EntityManager eMgr = new EntityManager(modelName,query,15);
   		boolean success = false;
   		if(mode.equals("ADD")){
   			success = eMgr.createNewObject(values);
   		}else if(mode.equals("SAVE")){
   			success = eMgr.updateObject(values);
   		}if(mode.equals("DELETE")){
   			success = eMgr.deleteObject(values); 
   		}
   		
   		StringBuffer viewUrl = new StringBuffer("viewTableData.jsp").
   		                           append("?modelName=").append(modelName).
   		                           append("&query=").append(query).
   		                           append("&pageNo=").append(pageNo);
   		response.sendRedirect(StringUtils.replaceCRLFChars(viewUrl.toString()));
%>
<INPUT TYPE="text"   ID="pageNo"         NAME="pageNo"         VALUE="<%=pageNo%>" 		autocomplete="off">
<INPUT TYPE="text"   ID="modelName"      NAME="modelName"      VALUE="<%=ESAPI.encoder().encodeForHTML(modelName)%>"	autocomplete="off">
<INPUT TYPE="text"   ID="query"      	 NAME="query"      	   VALUE="<%=ESAPI.encoder().encodeForHTML(query)%>"		autocomplete="off">