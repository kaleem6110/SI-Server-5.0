<%@ page import="java.util.*,com.spacetimeinsight.monitor.action.*" %> 
<%@page import="java.util.Map" %>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/tags/struts-nested" prefix="nested"%>

<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>

<html>
<head>
<%@ include file="/common/dojo.jsp" %>

<title>View Details</title>

    <script>
try{
parent.parent.updateCSRFToken('<%=request.getAttribute("csrf")%>');
}catch(e){
//as the parent.parent might be null or fuction might not be able to find
}
        function closeWindow(){
            window.close();
        }
    </script>
</head>
<body class="tundra bodybg">

<form  method="POST">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">

<%
Object obj= request.getAttribute("REQ_SET_ATTRIBUTE_TAB_NAME");
Object listObj= request.getAttribute("REQ_SET_ATTRIBUTE_COL_DETAILS");

 String tableName 					= obj != null ? (String)request.getAttribute("REQ_SET_ATTRIBUTE_TAB_NAME"):"";
 List<ColumnPropertiesDetails> list  = listObj != null ? (List<ColumnPropertiesDetails>)listObj : null;
%>

<div style="padding:10px;">
	
	<table width="90%" height="90%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td class="bigtext"><strong><bean:message key="admin.monitor.db.tablename" bundle="admin" /> : &nbsp;<%=ESAPI.encoder().encodeForHTML(tableName)%></strong></td>
		</tr>
		<tr><td>&nbsp;</td></tr>
		<tr>
			<td><span id="ctl00_mainbody_lblError" class="error"></span></td>
		</tr>	
		<tr>
			<td>
					<table width="100%" id="table_prop" cellSpacing="5" cellPadding="3" border="0" >
                                
                                <%
                                  if(list != null &&  list.size() > 0)
                                  {
								  
								  %>
								  
								         <tr>
                                           <td height="16" class="tab panelColor" valign="middle" align="left" ><strong><bean:message key="admin.monitor.db.record.view.srno" bundle="admin" /></strong> </td>
										   
										   <td class="tab panelColor" valign="middle" align="left"><strong><bean:message key="admin.monitor.db.record.view.label" bundle="admin" /></strong></td>
										    
											<td class="tab panelColor" valign="middle" align="left"><strong><bean:message key="admin.monitor.db.record.view.type" bundle="admin" /></strong></td>
											 
											<td class="tab panelColor" valign="middle" align="left"><strong><bean:message key="admin.monitor.db.record.view.null" bundle="admin" /></strong></td>
											
										   
                                        </tr>
								  <%
                                	  int SIZE = list.size();                                   
                                	  for(int colIndex=0; colIndex <SIZE ; colIndex++) 
                                	    {
                                		  ColumnPropertiesDetails colProDetails = (ColumnPropertiesDetails)list.get(colIndex);
                                %>
								
								 

                                   
                                        <tr>
										  <td class="textnormal12" align="left" ><%=(colIndex+1)%>  </td>
										 
                                           <td class="textnormal12" align="left" ><%=colProDetails.getColumnName()%>  </td>
										    
										   
										   <td class="textnormal12" align="left"> <%=colProDetails.getColumnType()%> (<%=colProDetails.getPrecision()%>)</td>
										    
										   
										   <td class="textnormal12" align="left"> <%=colProDetails.isNullable()%></td>
                                        </tr>
										
                                <%
                                	    }
                                  }
                                %>         
                                        
                                        
                                </table>
			</td>
		</tr>
	</table>
	
</div>

  
</form>


</body>
</html>
