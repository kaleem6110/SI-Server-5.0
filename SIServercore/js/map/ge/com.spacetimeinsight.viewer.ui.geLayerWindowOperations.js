/**
 * Google Earth layer Dashboard operations are written in it.
 */
define([
    'jquery',
    'jquery-ui',
    'map/ge/com.spacetimeinsight.viewer.ui.geMap',
],function($){
	
	$.extend($.spacetimeinsight.siViewerGoogleEarth.prototype, {
		
		getLayerWindows : function(layerId, url){
	    	var $this = this;
	    	if(url != null) {
				if(url.indexOf("rendertype=kml")==-1){
					url = url + "&rendertype=json";
				}
				if(url.indexOf("renderpolicy=dashboards")==-1){
					url = url + "&renderpolicy=dashboards";
				}			
			}
	    	
	    	$si.init.getLayerWindows(layerId, url,function(data){
														$this.onLayerWindowsSuccess(layerId,data);
													},this.onLayerWindowsFailure);
	    },
	    
	    
	    //move below code to windoUtils if it is not spwcidic to ge
	    
	    onLayerWindowsSuccess : function(layerId,data){
			if(data){
				var windows = data.windows;
				if(!windows){
					windows = data.models;
				}
				var currLayer = $si.businessViewUtil.getBusinessViewById(layerId);
				if(currLayer){
					currLayer.windows =  windows ? windows : [];
					currLayer.layerProperties = data.properties;
					this._setDataFilterAttributes(windows,currLayer);
					
					this._openDefaultWindows(windows,layerId);
				}
			}
			$si.Logger('geLayerOperations').info("Dashboards are loaded for layer " + layerId);
		},

		onLayerWindowsFailure : function(error){
			$si.Logger('geLayerOperations').fatal("Layer Dashboard fetch error");
		},
		
		_setDataFilterAttributes : function(windows,currLayer){
			var dataFilterWindow;
			currLayer.needDataFilter   = false;
			currLayer.filterAttributes = [];
	    	if(windows){
	    		$(windows).each(function(index,window){
	    			if(window && window.windowType == "DataFilter"){
	    				dataFilterWindow = window;
	    				return false;
	    			}
	    		});
	    		
	    		if(dataFilterWindow){
	    			var metaData = dataFilterWindow.metadata;
	    			currLayer.needDataFilter = true;
	    			currLayer.dataFilterWindow = dataFilterWindow;
	    			if(metaData && dataFilterWindow.filterProperties && dataFilterWindow.filterProperties.fields && dataFilterWindow.filterProperties.fields.length >0){
	    				if(dataFilterWindow.filterProperties.inputDatasource){
	    					currLayer.filterInputRenderer = dataFilterWindow.filterProperties.inputDatasource.dataFetcherClass;
	    					currLayer.filterDataSourceType = dataFilterWindow.filterProperties.inputDatasource.datasourceType;
	    				}
						var fields = dataFilterWindow.filterProperties.fields;
						$.each(fields,function(index,attribute){
							currLayer.filterAttributes.push({
																fieldName   : metaData[attribute.name].name,
																displayName : metaData[attribute.name].displayName,
																dataType    : metaData[attribute.name].type,
																displayType : attribute.type,
																options		: attribute.options,
																
																
														});
						});
					}else if(metaData){
					    //if there is no filter field then metadata is displayed in data filter window
						$.each(metaData,function(index,attribute){
							currLayer.filterAttributes.push({
																fieldName   : attribute.name,
																displayName : attribute.displayName,
																dataType    : attribute.type,
																displayType : "autoComplete",
																options		: [],
														});
						});
					}
	    		}
	    	}
		},
		
		_openDefaultWindows : function(windows,layerId){
			if(windows){
				$(windows).each(function(index,window){
					if(window){
						window.layerId = layerId;
						if(window.loadByDefault){
							$si.businessViewUtil.openBusinessViewWindowByWindowObj(window);
						}
					}
				});
			}
		},
	});
});