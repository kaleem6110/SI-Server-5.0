<%@taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
 <%@ page import="java.util.*" %>

<html>
 <head>
	 
<script type="text/javascript">	
</script>
</head>
 
 <title> <bean:message key="admin.print.preview.title" bundle="admin" /></title>
 <body class="tundra bodybg">
   <form>   
	 <input type="hidden" id="csrf" name="csrf" value="${csrf}">	 
 
     <table  width="100%" cellspacing="0" cellpadding="0" align="center"  border="0" > 

	<logic:present name="imagesURLArr">	
		<logic:notEmpty name="imagesURLArr">
			<logic:iterate name="imagesURLArr" id="urlofImage" indexId="index" >
				<bean:define id="tmpMod" value="<%= String.valueOf(index.intValue())%>"/>
			       <logic:notEmpty name="urlofImage">
						<logic:present name="titleArr">
							<%int i=0;%>	 
							<logic:notEmpty name="titleArr">
								<logic:iterate name="titleArr" id="urlTitle" >
									<logic:notEmpty name="urlTitle"  >
										<logic:equal name="tmpMod" value="<%=String.valueOf(i)%>">
											<tr>
												<td>
													<div style="font-family:tahoma; font-size:12px; padding-top:15px; padding-bottom:15px"><strong><bean:write name="urlTitle" /></strong></div>
												</td>	
											</tr>
										</logic:equal>
										<%++i;%>
									</logic:notEmpty>
					
								</logic:iterate>
							</logic:notEmpty>				
						</logic:present>
						<tr align="left">
							<td style="margin-bottom:20px">
								<img src="<bean:write name="urlofImage"/>" /><br>
							</td>	
						</tr>	
					</logic:notEmpty>
			</logic:iterate>
		</logic:notEmpty>				
	</logic:present>
	 
	 </table>
	 <logic:empty name="imagesURLArr">
		<table  width="100%" cellspacing="0" cellpadding="0" align="center"  border="0" >
		   <tr align="center" >
			<td  align="center" >
			 <p>
			   <font size="2" face="Arial, Helvetica, sans-serif">
				   <font size="2">&nbsp;&nbsp;
					 <bean:message key="admin.print.preview.please.retry" bundle="admin" /><br>
				  </font> 
			   </font>
			 </p>
			</td>
		   </tr>  	 
		</table>
  </logic:empty>
    </form>
   </body>
</html>