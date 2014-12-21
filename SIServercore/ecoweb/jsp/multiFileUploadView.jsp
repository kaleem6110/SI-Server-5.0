
    
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>    

<html>
<jsp:include page="/common/stiSession.jsp"/>
<head>


<title>Insert title here</title>
</head>
<body>
  <table width="101.2%" cellspacing="0" cellpadding="0" align="center" >
            <tr>
                <td  class="pageTitle paddingTitle">     
                <bean:message key="upload.titleText" bundle="delete"/>
                
                </td>
            </tr>
            <tr>
               <td class="paddingTitleDesc bodytext">
                 <strong><bean:message key="upload.description" bundle="delete"/></strong>
                </td>  
            </tr>
        <td>
        <table><tr><td align="left`" style="padding-left:65px;padding-top:10px;">
            <jsp:include page="multiFileUpload.jsp?frommainpage=true"/> 
        </td></tr></table>                
       </td>        
  </tr>
  
   <tr>
   <td align="right" class="barColor" width="470">
    <button dojoType="dijit.form.Button"  type="button" onClick="window.location= '<%=ServerUtils.getContextName(request)%>/adminMain.do' ">
    <bean:message key="upload.home" bundle="delete"/>
    </button>
    </td> 
    </tr>
   </table>
        
</body>
</html>