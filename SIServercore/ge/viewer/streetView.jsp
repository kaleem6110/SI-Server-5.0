<%@page import="com.enterprisehorizons.util.StringUtils"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="com.enterprisehorizons.magma.server.admin.AdminConfigUtils" %>
<%@page import="org.owasp.esapi.ESAPI"%>

<%
	String geKey = request.getParameter(ServerUtils.PARAM_GE_KEY);
    if(StringUtils.isNull(geKey)) {
        geKey = AdminConfigUtils.getConfigValue(ServerUtils.PARAM_GE_KEY);
    }
	String coordsStr = request.getParameter("coords");
    if(StringUtils.isNull(coordsStr)){
		out.println("Should have a parameter coords");
		return;
	}

%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <title>Google Earth Streetview</title>
    <script src="http://maps.google.com/maps?file=api&v=2.x&key=<%=ESAPI.encoder().encodeForHTML(geKey)%>" type="text/javascript"></script>
    <script type="text/javascript">
	var myPano;

    function initialize() {
      myPano = new GStreetviewPanorama(document.getElementById("pano"));
	  setStreetViewLocation('<%=ESAPI.encoder().encodeForHTML(coordsStr)%>');
      GEvent.addListener(myPano, "error", handleNoFlash);
    }
	
	function setStreetViewLocation(coordsStr) {
		try
		{		
			var coordsArr = coordsStr.split(',');
			if(coordsArr.length > 1) {			
				var fenwayPark = new GLatLng(parseFloat(coordsArr[1]),parseFloat(coordsArr[0]));
				var myPOV = {yaw:370.64659986187695,pitch:-20};
				myPano.setLocationAndPOV(fenwayPark, myPOV);
			}	
		}
		catch (e)
		{
			alert('Street View not availble for the selected location');
		}
	}

    function handleNoFlash(errorCode) {
      if (errorCode == 603) {
        alert("Error: Flash doesn't appear to be supported by your browser");
        return;
      }
    }  
    </script>
  </head>
  <body onload="initialize()" onunload="GUnload()">
    <div name="pano" id="pano" style="width: 100%; height: 100%;"></div>
  </body>
</html>
