
<%@page import=" java.util.*"%><html>

<head>
<body>
     
    <%
        List list= (ArrayList)request.getAttribute("files");
    %>
 
 <script>
 
	<%
		for(int i=0;i<list.size(); i++){ %>
				parent.showStatus('<%= list.get(i) %>', '<%= list.size() %>', '<%=i%>');
<%		}
	%>



   
 </script>
  
 </body>
 </html>
