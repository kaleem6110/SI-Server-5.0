<%
 response.setHeader("Cache-Control","no-cache"); //HTTP 1.1
 response.setHeader("Pragma","no-cache"); //HTTP 1.0
 response.setDateHeader ("Expires", 0); //prevents caching at the proxy server
 out.println("Server Ping"+new java.util.Date());
 out.println(session.getId());
%>
 