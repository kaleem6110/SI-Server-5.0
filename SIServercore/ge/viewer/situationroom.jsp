<html>
<head>
<title>Situation Room</title>
    <style type="text/css">
        @import "../js/dijit/themes/tundra/tundra.css";
        @import "../js/dojo/resources/dojo.css"
    </style>
  <link href="../js/windowsjs/themes/default.css" rel="stylesheet" type="text/css"/>	
  <link href="../js/windowsjs/themes/alphacube.css" rel="stylesheet" type="text/css"/>
  <link href="../js/windowsjs/themes/pwc-os.css" rel="stylesheet" type="text/css"/>


  <script type="text/javascript" src="../js/windowsjs/javascripts/prototype.js"> </script>
  <script type="text/javascript" src="../js/windowsjs/javascripts/effects.js"> </script>
  <script type="text/javascript" src="../js/windowsjs/javascripts/window.js"> </script>
  <script type="text/javascript" src="../js/windowsjs/javascripts/window_effects.js"> </script>
  <script type="text/javascript" src="../js/windowsjs/javascripts/debug.js"> </script>
  <script type="text/javascript" src="../js/windowsjs/javascripts/pwc-os.js"> </script>

    <script type="text/javascript" src="../js/dojo/dojo.js" djConfig="parseOnLoad: true"></script>
    <script type="text/javascript">
       dojo.require("dojo.parser");
       dojo.require("dijit.layout.SplitContainer");
       dojo.require("dijit.layout.ContentPane");
     </script>
<!----                                 -->
<script>
var urlToOpen1 = "/magmage/viewer/standAloneGE.jsp?ecoFiles=substations_highkv.ecoexpml,tielines_highkv.ecoexpml&lookAtLat=32.62801429883827&lookAtLon=-116.4187222805936&lookAtRange=2311424.2155735956&lookAtTilt=23.14108089926603&lookAtHeading=-0.04959503965309445&gewidth=100&geheight=100&isPercentage=true";

var urlToOpen2 = "/magmage/viewer/standAloneGE.jsp?ecoFiles=48NAM.ecoexpml&lookAtLat=32.62801429883827&lookAtLon=-116.4187222805936&lookAtRange=4311424.2155735956&lookAtTilt=23.14108089926603&lookAtHeading=-0.04959503965309445&gewidth=100&geheight=100&isPercentage=true";

var urlToOpen3 = "/magmage/viewer/standAloneGE.jsp?ecoFiles=NationalRadar.ecoexpml,Weather Observations.kml&lookAtLat=32.62801429883827&lookAtLon=-116.4187222805936&lookAtRange=311424.2155735956&lookAtTilt=23.14108089926603&lookAtHeading=-0.04959503965309445&gewidth=100&geheight=100&isPercentage=true";

var urlToOpen4 = "/magmage/viewer/standAloneGE.jsp?ecoFiles=TielineModel.kmz&lookAtLat=32.83959863718972&lookAtLon=-116.8838415323924&lookAtRange=118.859752456017&lookAtTilt=50.20996082365364&lookAtHeading=9.302013799392044e-005&gewidth=100&geheight=100&isPercentage=true";


function standAloneWin1(){
	standAloneWin1 = new Window({id: "standAloneWin1", className: "alphacube", title: "", width:615, height:400,top:0,left:0, url: urlToOpen1}); 
	standAloneWin1.setDestroyOnClose(); 
	standAloneWin1.show();
	standAloneWin1.toFront();	
}

function standAloneWin2(){
	standAloneWin2 = new Window({id: "standAloneWin2", className: "alphacube", title: "", width:615, height:400,top:435,left:0, url: urlToOpen2}); 
	standAloneWin2.setDestroyOnClose(); 
	standAloneWin2.show();
	standAloneWin2.toFront();	
}

function standAloneWin3(){
	standAloneWin3 = new Window({id: "standAloneWin3", className: "alphacube", title: "", width:615, height:400,top:0,right:0, url: urlToOpen3}); 
	standAloneWin3.setDestroyOnClose(); 
	standAloneWin3.show();
	standAloneWin3.toFront();	
}

function standAloneWin4(){
	standAloneWin4 = new Window({id: "standAloneWin4", className: "alphacube", title: "", width:615, height:400,top:435,right:0, url: urlToOpen4}); 
	standAloneWin4.setDestroyOnClose(); 
	standAloneWin4.show();
	standAloneWin4.toFront();	
}
</script>
<!----                                 -->	 
</head>
<body class="tundra">
	
<script>
standAloneWin1();
standAloneWin2();
standAloneWin3();
standAloneWin4();
</script>	

</body>

</html> 