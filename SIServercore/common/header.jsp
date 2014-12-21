<%@ page import="org.owasp.esapi.ESAPI" %>
<%
response.setHeader("Cache-Control","no-cache"); //HTTP 1.1
response.setHeader("Pragma","no-cache"); //HTTP 1.0
response.setDateHeader ("Expires", 0); //prevents caching at the proxy server
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<title><%=ESAPI.encoder().encodeForHTML(request.getParameter("title"))%></title>
<meta http-equiv="content-type" content="text/html; charset=iso-8859-1">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" contet="no-store">
<style type="text/css">
html,body{margin:0;padding:0}
body{font: 76% arial,sans-serif;text-align:center}
p{margin:0 10px 10px}
a{display:block;color: #981793;padding:10px}
div#header h1{height:60px;line-height:60px;margin:0;
  padding-left:10px;background: #EEE;color: #79B30B}
div#container{text-align:left}
div#content p{line-height:1.4}
div#navigation p{line-height:0.4}
div#container{background:#B9CAFF}
div#footer{background: #333;color: #FFF}
div#footer p{margin:0;padding:5px 10px}
div#container{width:800px;margin:0 auto}
div#content{float:right;width:600px;height:auto}
div#navigation{float:left;width:200px}
div#navigation{background:#AFCAFF}
div#extra{clear:both;width:100%}
</style>
</head>
<body>
<div id="container">
<div id="header"><h1><%=ESAPI.encoder().encodeForHTML(request.getParameter("title"))%></h1></div>
<div id="wrapper">
<div id="content">