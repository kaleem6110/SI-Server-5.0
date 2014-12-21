<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
 
<html>
<head>
	<%@ include file="/common/dojo.jsp"%>
	 
<script type="text/javascript">	
	 
   	
</script>
</head>
<body class="tundra bodybg">
<form name="" method="post" action="">
	<input type="hidden" id="csrf" name="csrf" value="${csrf}">	 
</form>


<table  width="100%" cellspacing="0" cellpadding="0" align="center"  border="0" >
    <tr align="center" >
        <td  align="center" >
         <p>
           <font size="2" face="Arial, Helvetica, sans-serif">
               <font size="2">&nbsp;&nbsp;
                 <bean:message key="admin.print.preview.pagenotfound" bundle="admin" />
              </font> 
           </font>
         </p>
        </td>
    </tr>
  	 
</table>



</body>
 
</html>