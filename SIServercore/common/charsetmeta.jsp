
 <%@page import="com.spacetimeinsight.web.common.constants.WebConstants"%> 
 <%@page import="com.spacetimeinsight.db.config.model.LanguageMaster"%>
 <%@page import="java.util.Locale"%>
 <%@page import="java.util.List"%>
 <%@page import="com.spacetimeinsight.db.model.util.DataModelsCacheHelper"%>
  <%
  
     Locale locale = (Locale)request.getSession(false).getAttribute(WebConstants.LOCALE_SESSION_CLASS_NAME);
     String charset=DataModelsCacheHelper.getLanguageCharset(locale);     
  %>
  
  <!--
 <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=<%=charset%>">
   -->

<META HTTP-EQUIV="X-UA-Compatible" CONTENT="IE=EmulateIE10; charset=<%=charset%>">
  