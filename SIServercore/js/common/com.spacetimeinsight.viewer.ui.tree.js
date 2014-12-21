define([
    'jquery',
    'jquery-ui',
    'kendo',
    'common/com.spacetimeinsight.viewer.ui.nestedWindow',
    'uiUtils',
],function($){
	$.widget('spacetimeinsight.siViewerTree',{
			MODE :{
						WITHOUT_CHECKBOX : "WITHOUT_CHECKBOX",
						WITH_CHECKBOX :"WITH_CHECKBOX",
						PARTIAL_CHECKBOX :"PARTIAL_CHECKBOX",
				},
				//create variable only in options otherwise they are static.
			options :{
						data : [],
						mode : "PARTIAL_CHECKBOX",
						nodeIcon:{},
						selectedNodes:{},
				 },
		   //private static variable
		   pluginName:"siViewerTree",

		   NODE_TEXT : 	"<span  #= item.hide ? 'style=display:none;' :''# title='#= item.hasOwnProperty('items') && item.description ? item.description : item.text #' id ='#= item.id #' class='layer-text'> #= item.text # </span>" +
	   					" #if(!item.hasOwnProperty('items')){#" +
	   						"<span #= item.hide ? 'style=display:none;' :''# class='layer-datafilter'><span id='#= item.id #-layer-datafilter-icon'></span></span>" +
	   						"<span #= item.hide ? 'style=display:none;' :''# class='layer-error-notification'><span id='#= item.id #-notification-icon' ></span></span>" +
	   					 "#}#",
		   				

			_create : function(){
						var $this = this,isBusinessViewSelected;
						//used in event handling. Each event is prefix by plugin name
						this.widgetEventPrefix = this.pluginName + "_";

						var ds = new kendo.data.HierarchicalDataSource({
							data: (this.options.data) ? this.options.data : [],
						});

						var template = "";
						if(this.options.mode == this.MODE.WITHOUT_CHECKBOX){
							template = "# if(!item.hide){# <img id='#= item.id#_layer_status' src='images/blank_transparent.png' class='layer-status-unloaded'></img> <input type='checkbox' id='#= item.id#_node' style='display:none'/>#}#";
						}else if(this.options.mode == this.MODE.PARTIAL_CHECKBOX){
							template = "# if(item.hasOwnProperty('items')){#<input type='checkbox' id='#= item.id #_parentnode' class='category-checkbox' #= item.selectable ? '' : 'disabled' #  /><label title='#=item.text#' class='blank-label'></label>#}else if(item.hide == false){# <img id='#= item.id#_layer_status' src='images/blank_transparent.png' class='layer-status-unloaded'></img> <input type='checkbox' id='#= item.id#_node' style='display:none'/> #}#";
						}else if(this.options.mode == this.MODE.WITH_CHECKBOX){
							template = "# if(!item.hide){#<input type='checkbox' id='#= item.id #_parentnode'/><label title='#=item.text#' class='blank-label'></label>#}#";
						}

						var treeDiv = $(this.element);
						treeDiv.kendoTreeView({
							 loadOnDemand: false,
							 template : this.NODE_TEXT,
							 animation: false,
							 checkboxes: {
								checkChildren: false,
								template: template,
							},
							dataSource: ds,
							select: function(e)
							{
								e.preventDefault();
							},
						});
						
						treeDiv.find(".category-checkbox").parents("li").addClass("sub-category");
						
						treeDiv.on("click",function(e,manualTrigger){
							var isBusinessViewSelected = manualTrigger ? manualTrigger.isSelected: undefined;
							var disableNodeHideCheck = (manualTrigger && manualTrigger.disableNodeHideCheck)? true : false;
							$this._onSelectUnSelect(e,isBusinessViewSelected,disableNodeHideCheck);
						});

                       treeDiv.on("mousedown",function(e){
                    	   setTimeout(function(){
                        			if(e.which==3){
                        				//right click
                        				var tree = $('#' +e.currentTarget.id).data('kendoTreeView');
                        				var item = $(e.target).closest('.k-item');
                        				//open the right click menu only if layer is loaded
                        				if(!(tree && item) || $(e.target).hasClass('k-icon') ||$(e.target).hasClass("notification-icon") ){ //|| !(item.find(".k-checkbox img").hasClass("layer-status-loaded"))
                        					//this prevent the arrow click call
                        					return;
                        				}
                        				var dataItem = tree.dataItem(item);
                        				if(!dataItem){
                        					return;
                        				}
                        				$this._trigger("onLayerRightClick",null,{
                        											layer : dataItem,
                        											event : e,
                        											domElement:item,
                        											isSelected : $this.options.selectedNodes[dataItem.id],
                        											breadCrum : dataItem.breadCrum,
                        							});
			                       }
                        		},500);

						});
			},
			
			//Layer select handler
			_onSelectUnSelect : function(e,isSelected,disableNodeHideCheck) {
				var tree = $('#' +e.currentTarget.id).data('kendoTreeView');
				var item = $(e.target).closest('.k-item');
				var hasLayerText = $(e.target).hasClass("layer-text");
				if(!(hasLayerText || $(e.target).hasClass('k-image') || $(e.target).hasClass("category-checkbox") || $(e.target).hasClass('b-layer-icon'))){ 
					return;
				}
				if($(e.target).closest("div").find('.k-icon').length == 1 && hasLayerText){
					return;
				}
					
				var dataItem = tree.dataItem(item);
				if(!dataItem){
					return;
				}
				
				/** prevent click if it is in loading state **/
				if($(item).find(".layer-status-loading").length > 0){
					e.preventDefault();
					return;
				}
				
				//set check box state
				var checkbox = $(item).find(':checkbox :first');
				if(typeof isSelected == "undefined"){
					if(typeof $(e.target).prop("checked") == "undefined"){
						/** layer selected **/
						isSelected = !checkbox.prop("checked");
					}else{
						/** category checked **/
						isSelected = $(e.target).prop("checked");
					}
				}
				
				this._onParentSelectUnSelect(item,dataItem,isSelected,disableNodeHideCheck);
				var treeview = $(item).parents('.k-treeview');
				treeview.data('kendoTreeView').updateIndeterminate();

				this._trigger("onSelectionComplete",null,{treeview:treeview});

			},
			
			
			_onCategorySelectDeSelect : function(item,dataItem,isSelected,disableNodeHideCheck){
				var categoryCheckBox = $(item).find(':checkbox :first');
				categoryCheckBox.prop("checked",isSelected);
				
				if(isSelected){
					categoryCheckBox.parent().parent().find(".layer-text").addClass("bold");
   			 	}else{
   			 		categoryCheckBox.parent().parent().find(".layer-text").removeClass("bold");
   			 	}
				
				var items = $(item).children('ul').children('li');
				for(var i=0;i< dataItem.items.length;i++){
					this._onParentSelectUnSelect(items[i],dataItem.items[i],isSelected,disableNodeHideCheck);
				}
			},

			//Handle sub Parent Node select/Unselect

			_onParentSelectUnSelect : function(item,dataItem,isSelected,disableNodeHideCheck){
				if(this._isParent(dataItem)){
					this._onCategorySelectDeSelect(item,dataItem,isSelected,disableNodeHideCheck);
				}else{
					this._trigger("preNodeSelect",null,{
											element:dataItem,
											ui_element:item,
											nodeSelected:this.options.selectedNodes[dataItem.id],
											});
					this._onNodeSelectUnSelect(item,dataItem,isSelected,disableNodeHideCheck);
					this._trigger("postNodeSelect",null,{
											element:dataItem,
											ui_element:item,
											nodeSelected:this.options.selectedNodes[dataItem.id],
											});
				}

			},


			//return whether data item is Parent or not
			_isParent : function(dataItem){
				return dataItem ? dataItem.hasChildren : false;
			},


			//Perform layer select action (Label change and icon change)
			_onNodeSelectUnSelect : function(item,node,isSelected,disableNodeHideCheck) {
				/** layer selection and de-selection code moved down in a function **/
				if(node.hide && !disableNodeHideCheck) return;
				//if state is already applied
				if(typeof isSelected == 'undefined'){
					isSelected = !this.options.selectedNodes[node.id];
				}
				else if(/**isSelected == this.options.selectedNodes[node.id] ||**/ (isSelected === false && !this.options.selectedNodes[node.id])){
					/** already de-selected **/
					return;
				}

				var nodeLabel = $(item).find('.k-in');
				var nodeImage = nodeLabel.children('.k-image');
				var imgUrl = "";
				if(nodeImage.length > 0){
					imgUrl =nodeImage.prop("src");
				}
				if(isSelected){
					nodeLabel.addClass("node-selected");
					nodeLabel.removeClass("node-unselected");
					imgUrl=	imgUrl.replace(node.deselectedIconUrl,node.selectedIconUrl);
				}else{
					nodeLabel.removeClass("node-selected");
					nodeLabel.addClass("node-unselected");
					imgUrl=	imgUrl.replace(node.selectedIconUrl,node.deselectedIconUrl);
				}
				nodeImage.prop("src",imgUrl);
				this.options.nodeIcon[node.id] = imgUrl;
				
				$(item).find(":checkbox :first").prop("checked",isSelected);
				//if(triggerSelect == true){
					this._trigger("onNodeSelect",null,{
														nodeId:node.id,
														nodeUrl:node.nodeUrl,
														nodeSelected:isSelected,
														element:node,
														ui_element:item});
				//}
				this.options.selectedNodes[node.id] = isSelected;
			},

			setData : function(data,io){
				try{
					this.options.data = data;
					$(this.element).data("kendoTreeView").setDataSource(new kendo.data.HierarchicalDataSource({
							data: (this.options.data) ? this.options.data : [],
						}));
					this._trigger("onDataLoaded",null,{data:data,io:io,error:error});
				}catch(error){
					this.setError(data,io,error);
				}
			},

			//Dispatch error event if some issue occur while setting data
			setError : function(data,io,error){
				this._trigger("onSetDataFailure",null,{data:data,io:io,error:error});
			},

			//Return plugin Name
			getPluginName : function(){
				return this.pluginName;
			},

			isExpanded: function(){
				var isExpanded = $(this.element).find('.k-first.k-item').attr('data-expanded');
				return isExpanded != undefined ? isExpanded : false;
			},

	});
});
