<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<script>
			dojo.require("dijit.Tree");
			dojo.require("dojox.data.OpmlStore");
	function onClick(item){
		try{
		selectedItem = item;
		
		var selectedValue = item ? opmlGeoStore.getValue(item, "value") : "";
			if(selectedValue  != null){
				dojo.byId('projectionData').innerHTML = selectedValue;
				document.getElementById('srcPrjDefinition').value = selectedValue;
			}else{
				dojo.byId('projectionData').innerHTML = '';
				document.getElementById('srcPrjDefinition').value = '';
			}
		}catch(err){}
	}
		
	function hidePrj(){
	 	document.getElementById('projectionDtls').style.display='none';
		document.getElementById('minimizeLabel').style.display='none';
		document.getElementById('maximizeLabel').style.display='';
		collapseAllNodes();
	}
	
	function showPrj(){
		collapseAllNodes();
		document.getElementById('projectionDtls').style.display='';
		document.getElementById('minimizeLabel').style.display='';
		document.getElementById('maximizeLabel').style.display='none';
	}
	//remove below methods if it is not in use. Renamed the method name to above as it was giving issue with Firefox.
	/*function hide(){
	 	document.getElementById('projectionDtls').style.display='none';
		document.getElementById('minimizeLabel').style.display='none';
		document.getElementById('maximizeLabel').style.display='';
	}
	*/
	function show(){
		document.getElementById('projectionDtls').style.display='';
		document.getElementById('minimizeLabel').style.display='';
		document.getElementById('maximizeLabel').style.display='none';
	}	
</script>
			<div dojoType="dojox.data.OpmlStore"        url="ecoweb/config/projections.xml"  label="text" jsId="opmlGeoStore"></div>
<body class="tundra panelbg">			
			
			
				<input name="srcPrjDefinition" id="srcPrjDefinition" type="hidden" />
<table width="100%" cellspacing="0" cellpadding="0" class="tableBgColor">
                  <tr>
                    <td width="119" class="redtitle" style="padding-top:13px; padding-left:13px;"><strong class="pageTitle paddingTitle" style="padding-left:0px"><bean:message key="datasource.projectionFieldset" bundle="ds" /></strong></td>
                    <td width="759" style="padding-top:13px; padding-left:13px;" align="right"><strong><span id="minimizeLabel" onClick="hidePrj();" style="display:none; cursor:pointer"><u><bean:message key='admin.projection.minimise' bundle='admin'/></u> <img src="<%=ServerUtils.getContextName(request)%>/images/portal/uparrow.gif" width="7" height="11" align="absmiddle" /></span> <span id="maximizeLabel" onClick="showPrj();" style="cursor:pointer"><u><bean:message key='admin.projection.maximise' bundle='admin'/></u> <img src="<%=ServerUtils.getContextName(request)%>/images/portal/downarrow.gif" width="7" height="11" align="absmiddle" /> </span></strong></td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding-top:0px; padding-left:13px;"></td>
                  </tr>
                  <tr>
                    <td height="13" colspan="2" style="padding-top:0px; padding-left:0px;"></td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding-top:13px; padding-left:13px; display: none;" id="projectionDtls"><table width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="left" valign="top"><div id='buttonWin' class="projectionTree">
						<div dojoType="dijit.Tree" id="projections" label="" store="opmlGeoStore" onClick="onClick" labelAttr="type"></div>
						</div></td>
                        <td  align="left" valign="top"><textarea dojoType="dijit.form.SimpleTextarea" id="projectionData"  	name="projectionData"  style="width:22em;height:13em" readonly="readonly"></textarea></td>
                        <td  valign="top"><strong><bean:message key="datasource.projectionUnits" bundle="ds" />:</strong> <br />
                          <select id="srcPrjUnits"  name="srcPrjUnits" autocomplete="off"
						dojoType="dijit.form.FilteringSelect"  >
						<option value=""><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
						<option value="deg"><bean:message key="datasource.degree" bundle="ds" /></option>
						<option value="red"><bean:message key="datasource.radians" bundle="ds" /></option>
						<option value="min"><bean:message key="datasource.minutes" bundle="ds" /></option>
						<option value="sec"><bean:message key="datasource.seconds" bundle="ds" /></option>
						<option value="km"><bean:message key="datasource.kilometers" bundle="ds" /></option>
						<option value="m"><bean:message key="datasource.meters" bundle="ds" /></option>
						<option value="dm"><bean:message key="datasource.decimeters" bundle="ds" /></option>
						<option value="cm"><bean:message key="datasource.centimeters" bundle="ds" /></option>
						<option value="mm"><bean:message key="datasource.millimeters" bundle="ds" /></option>
						<option value="kmi"><bean:message key="datasource.nauticalMiles" bundle="ds" /></option>
						<option value="mi"><bean:message key="datasource.miles" bundle="ds" /></option>
						<option value="ch"><bean:message key="datasource.chains" bundle="ds" /></option>
						<option value="yd"><bean:message key="datasource.yards" bundle="ds" /></option>
						<option value="ft"><bean:message key="datasource.feet" bundle="ds" /></option>
						<option value="in"><bean:message key="datasource.inches" bundle="ds" /></option>
						<option value="us-mi"><bean:message key="datasource.usMiles" bundle="ds" /></option>
						<option value="us-ch"><bean:message key="datasource.usChains" bundle="ds" /></option>
						<option value="us-yd"><bean:message key="datasource.usYards" bundle="ds" /></option>
						<option value="us-ft"><bean:message key="datasource.usFeet" bundle="ds" /></option>
						<option value="us-in"><bean:message key="datasource.usInches" bundle="ds" /></option>
						<option value="fath"><bean:message key="datasource.fathoms" bundle="ds" /></option>
						<option value="link"><bean:message key="datasource.links" bundle="ds" /></option>
						<option value="point"><bean:message key="datasource.points" bundle="ds" /></option>
					</select></td>
                      </tr>
                    </table></td>
                  </tr>
                 
</table>
								
		<script>
			dojo.addOnLoad(collapseAllNodes);	
			function collapseAllNodes(){
				try{ dijit.byId('srcPrjUnits').setValue('');
					var tree = dijit.byId('projections');
					var treeRootNode = tree.rootNode.getChildren()[0];
					treeRootNode.collapse();
					var treeChildren = treeRootNode.getChildren();
					var childrenLength = treeChildren.length;
					for(h=0; h<childrenLength; h++){
						treeChildren[h].collapse();
						//alert(treeChildren[h].label)
						var treeSubChildren = treeChildren[h].getChildren();
						var treeSubChildrenLength = treeSubChildren.length;
						for(g=0; g<treeSubChildrenLength; g++){
							var treeSubChildrenSiblings = treeSubChildren[g].getChildren();
							/*var treeSubChildrenSiblingsLength = treeSubChildrenSiblings.length;
							for(a=0; a<treeSubChildrenSiblingsLength; a++){
								alert(treeSubChildrenSiblings[a].domNode)
								alert(opmlGeoStore.getValue(dijit.byId(treeSubChildrenSiblings[a]), "value"));

							} */
							treeSubChildren[g].collapse();
							
						}
					}
				}catch(er){}
			}

		</script>
				
</body>			