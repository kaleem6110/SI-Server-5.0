<%@page import="com.enterprisehorizons.util.StringUtils"%>
<%@ page import="org.owasp.esapi.ESAPI" %>
<%
    String searchString = request.getParameter("searchstring");
    if(searchString == null) {
        searchString = "Space Time Insight";
    }

    String latitude = request.getParameter("latitude");
    String longitude = request.getParameter("longitude");
    String address = request.getParameter("address");
    String geKey = request.getParameter("gekey");
%>
<jsp:include page="/common/commonheader.jsp"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <title>STI Google Search Component</title>

    <style type="text/css">

    body {
      background-color: white;
      color: black;
      font-family: Arial, sans-serif;
      font-size : 13px;
      margin: 15px;
    }

    #searchcontrol .gsc-control { width : 100%; }


    </style>
    <%
         if(!StringUtils.isNull(geKey)) {
    %>
        <script src="http://www.google.com/jsapi?key=<%=ESAPI.encoder().encodeForHTML(geKey)%>" type="text/javascript"></script>
    <%
        } else {
    %>
        <script src="http://www.google.com/jsapi" type="text/javascript"></script>
    <%
        }
    %>
    <script type="text/javascript">
    //<![CDATA[

    google.load('search', '1.0');
    google.load('maps', '2.x');

    function OnLoad() {
      // Create a search control
      var searchControl = new google.search.SearchControl();

      // Add in a full set of searchers
      var localSearch = new google.search.LocalSearch();
      searchControl.addSearcher(new google.search.WebSearch());
      searchControl.addSearcher(localSearch);
      searchControl.addSearcher(new google.search.VideoSearch());
      searchControl.addSearcher(new google.search.BlogSearch());
      searchControl.addSearcher(new google.search.NewsSearch());
      searchControl.addSearcher(new google.search.ImageSearch());
      //searchControl.addSearcher(new google.search.BookSearch());
      //searchControl.addSearcher(new google.search.PatentSearch());

    <%
        if(!StringUtils.isNull(latitude) && StringUtils.isNull(longitude)) {
    %>
      // Set the Local Search center point
      localSearch.setCenterPoint(new google.maps.LatLng(<%=ESAPI.encoder().encodeForHTML(latitude)%>,<%=ESAPI.encoder().encodeForHTML(longitude)%>));
    <%
        } else if(!StringUtils.isNull(address)) {
    %>
        localSearch.setCenterPoint("<%=ESAPI.encoder().encodeForHTML(address)%>");
    <%
        }
    %>

      var drawOptions = new google.search.DrawOptions();
      drawOptions.setDrawMode(GSearchControl.DRAW_MODE_TABBED);
     // tell the searcher to draw itself and tell it where to attach
      searchControl.draw(document.getElementById("searchcontrol"), drawOptions);

      // execute an inital search
      searchControl.execute("<%=ESAPI.encoder().encodeForHTML(searchString)%>");
    }

    google.setOnLoadCallback(OnLoad, true);

    //]]>
    </script>
  </head>
  <body>
    <div id="searchcontrol">Loading</div>
  </body>
</html>