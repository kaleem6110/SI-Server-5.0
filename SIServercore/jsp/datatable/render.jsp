<%@page import="com.enterprisehorizons.magma.server.util.*, com.enterprisehorizons.magma.designtime.artifact.IGeoArtifact,com.enterprisehorizons.magma.models.util.Coordinate,java.util.*,com.enterprisehorizons.magma.designtime.artifact.IArtifact,java.text.SimpleDateFormat"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<link rel="shortcut icon" type="image/ico" href="http://www.datatables.net/media/images/favicon.ico" />
		<title>Tablet Datatable Rendering</title>
		<style type="text/css" media="screen">
			@import "../../css/datatablecss/demo_page.css";
			@import "../../css/datatablecss/demo_table.css";
			@import "../../css/datatablecss/demo_table_jui.css";
			@import "../../css/datatablecss/themes/base/jquery-ui.css";
			@import "../../css/datatablecss/themes/smoothness/jquery-ui-1.7.2.custom.css";
			@import "http://www.datatables.net/media/css/site_jui.ccss";

			/*
			 * Override styles needed due to the mix of three different CSS sources! For proper examples
			 * please see the themes example in the 'Examples' section of this site
			 */
			.dataTables_info { padding-top: 0; }
			.dataTables_paginate { padding-top: 0; }
			.css_right { float: right; }
			tfoot th input { width: 90% }
			#example_wrapper .fg-toolbar { font-size: 0.8em }
			#theme_links span { float: left; padding: 2px 10px; }
		</style>

		<script type="text/javascript" src="../../js/datatablesjs/complete.js"></script>
		<script type="text/javascript" src="../../js/datatablesjs/jquery-1.4.4.min.js"></script>
        	<script type="text/javascript" src="../../js/datatablesjs/jquery.dataTables.js"></script>
		<script type="text/javascript" src="../../js/datatablesjs/jquery.dataTables.columnFilter.js"></script>

		<script type="text/javascript" charset="utf-8">
			TiApp=null;
			function executeEventAttributeZoom1(latitude,longitude){
				TiApp.fireEvent('EVENT_ATTRIBUTE_ZOOM',{latitude:latitude,longitude:longitude});
			}
			$(document).ready(function(){
			     $('#datatableentries').dataTable({
					bJQueryUI: true,
					"sPaginationType": "full_numbers"
				}).columnFilter();
			});
		</script>
	</head>
	<body id="dt_example">
	<table cellpadding="0" cellspacing="0" border="0" class="display" id="datatableentries">
		<thead>
			<tr>
			<%
				String[] columnNames = ArtifactUtils.getAttributeNames(null,request.getParameter("ecoxmpl"),request.getParameter("artefactName"));
				if(columnNames==null){
					out.println("<h1>An error has occured. Please re-select the layer.</h1>");
				}
				else{
					for(int i = 0; i < columnNames.length; i++) {%>
					<th><%=columnNames[i]%></th>
		  		<%}%>
			</tr>
		</thead>
		<tbody>
		<%
			IArtifact artifact=null;
	 		SimpleDateFormat sdf = null;
			List <IArtifact> artifacts=ArtifactUtils.getArtefacts(request.getParameter("ecosid"),request.getParameter("artefactName"));
			Coordinate[] coords = null;
			String coordsStr=null;
			String[] tokens=null;
			/* Debugging Information
			 * out.println(artifacts.size());
			 */
			if(artifacts==null){
				out.println("<h1>An error has occured. Please re-select the layer.</h1>");
			}else{
				for (int i = 0; i < artifacts.size(); i++){%>
					<tr><% artifact = artifacts.get(i);
					if(artifact instanceof IGeoArtifact){
						coords = ((IGeoArtifact) artifact).getCoordinates();
			 			if(coords!=null){
			 				tokens=coords[0].toString().split(",");
			 				coordsStr = "'"+tokens[0]+"','"+tokens[1]+"'";
			 			}
					}else{
						coordsStr=null;
					}
		 		for(int j = 0; j < columnNames.length; j++) {%>
		  			<td><a href="javascript:void(executeEventAttributeZoom1(<%=coordsStr%>))"><%=ArtifactUtils.getAttributeValue(columnNames[j], artifact)%></a></td>
					<%}%>
					</tr>
				<%} /*end for loop */
			} /*if artifacts !=null*/
				} /*if columnNames!=null*/
		%>
	</tbody>
	<tfoot style="display:table-header-group" >
		<tr>
			<% for(int k = 0; k < columnNames.length; k++) {%>
				<th><%=columnNames[k]%></th>
			<%} /*end for loop */ %>
		</tr>
	</tfoot>
</table>


</body>
</html>