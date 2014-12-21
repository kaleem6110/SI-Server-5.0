<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
      <tr  height="30" colspan="2" class="barColor" >
       <td height="30" colspan="2" class="barColor" align="center">	 
            <button dojoType="dijit.form.Button"  type="button" onClick="window.location= '<%=ServerUtils.getContextName(request)%>/shapedbMapping.do'"><bean:message key="shpDbMap.back" bundle="shpDbMap"/> </button>&nbsp;&nbsp;&nbsp;
            <button dojoType="dijit.form.Button"  id="idSubmit" name="btnSubmit" type="submit" > <bean:message key="shpDbMap.submit" bundle="shpDbMap"/>  </button>&nbsp;&nbsp;&nbsp;
            <button dojoType="dijit.form.Button"  id="idSReset" name="btnReset" type="reset" onclick="performReset();"/> <bean:message key="shpDbMap.reset" bundle="shpDbMap"/>    </button>
            </td>
        </tr>
