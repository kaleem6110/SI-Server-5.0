

<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>

<%@ include file="/common/liferay.jsp" %>

<html>
<head>
	<title><tiles:getAsString name="title"/></title>


</head>

<body  bgcolor="#ffffff">
	<table cellpadding="1" cellspacing="0" bgcolor="#ffffff" border="0" align="center" border=1>
		<tr>
	        <td align="center" >
			<!-- Header 
			<tiles:get name="header"/>-->
			</td>
		</tr>
		
		<tr>
		    <td height="50%">
				<!-- Body -->



<table width="100" border="0" align="center" cellpadding="0" cellspacing="2" bgcolor="#FFFFFF">
 
  <tr>
    <td><table width="100%" border="0" cellspacing="2" cellpadding="2">
      <tr>
        <td width="100%" align="left"><table class="clsTDForLabel2" cellspacing="2" cellpadding="2" width="100%" 
      align="center" border="0">
         
          </table>
          <table width="100%" border="0" cellspacing="2" cellpadding="2">
            <tr>
              <td align="center" valign="top"><table width="100%" border="0" cellpadding="0" cellspacing="0">
                
                <tr>
                  <td><table border="0" cellpadding="0" cellspacing="0" width="868">
                    <!-- fwtable fwsrc="Untitled" fwpage="Page 1" fwbase="rr.jpg" fwstyle="Dreamweaver" fwdocid = "302053684" fwnested="0" -->
                 
                  
                    <tr>
                      <td height="500" >&nbsp;</td>
                      <td align="center" valign="top" bgcolor="#ffffff"><table  cellspacing="2" cellpadding="2" width="100%" 
      align="center" border="0">
                         
                          <caption class="text4">
                            <b><I><tiles:getAsString name="bodyTitle" ignore="true"/></I></b>
                          </caption>
                        <tbody>
                        	
                          <tr>
                          	 	<td colspan="6" align="left">
                          	 		<tiles:get name="body"/>
                          		</td>
	                      </tr>
                          
                          </tbody>
                        </table>
                          <p style="margin:0px"></p></td>
                      <td height="404" background="ecoweb/images/rr_r2_c3.jpg">&nbsp;</td>
                      <td><img src="ecoweb/images/spacer.gif" width="1" height="404" border="0" alt="" /></td>
                    </tr>
                    
                  </table></td>
                </tr>
              </table></td>
            </tr>
          </table>
          </td>
        </tr>

     
    </table></td>
  </tr>
  
</table>

				
				
			</td>
		</tr>
		<tr>
		      <td>
				<!-- footer 
				<tiles:get name="footer"/>-->
			 </td>
		</tr>
	</table>
</body>
</html>
