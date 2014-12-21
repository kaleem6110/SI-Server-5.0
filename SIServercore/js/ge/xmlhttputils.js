
function createXMLHttpRequest() {
   if (window.XMLHttpRequest) {
	  return new XMLHttpRequest();
   } else if (window.ActiveXObject) {
	 return new ActiveXObject('Microsoft.XMLHTTP')
   } else {
	 alert("Could not create XMLHttpRequest on this browser");
	 return null;
   }
 }

 function parseXmlString(txt) {
	var xmlDoc;

	if (window.DOMParser) {
	  var parser=new DOMParser();
	  xmlDoc=parser.parseFromString(txt,"text/xml");
	} else {
	  // Internet Explorer                          
	  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	  xmlDoc.async="false";
	  xmlDoc.loadXML(txt); 
	}
	return xmlDoc;
}