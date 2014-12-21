define([
    'jquery',
    'jquery-ui',
    'kendo',
    'siDropDownList',
],function($){

	$.widget('spacetimeinsight.siCheckBoxList',$.spacetimeinsight.siViewerBaseWidget,{
		options : {
				data 			: [],
			 	defaultChecked  : true, 
			 	visible			: true,
		},
		pluginName:"siCheckBoxList",
		
		CLOSE_LIST_TEMPLATE : kendo.template("<div class='dropdown-footer-btn'></div>"),
		DASHBOARD_TEMPLATE : kendo.template("<div id='#= id #_filter_dashboard' class='filter-dashboard'>" +
									"<span><input id='#= id #' type='checkbox' class='filter-dashboard-checkbox' #= defaultChecked ? 'checked' : '' #  /></span>" +
									"<span><img src='#= dashboardIcon #' class='filter-dashboard-img'></span>" +
									"<span class='filter-dashboard-text'>#= dashboardTitle #</span></div>"),
		
		_create : function(){
			this._super();
		},
		
		_createControls : function(){
			this._super();
			this._createCheckBoxList();
		},
		
		_bindControls : function(){
			this._super();
			//do nothing
		},
		
		
		/** unit test pending for this method **/
		updateCheckBoxList : function(data){
			if(data){
				var dataSource = new kendo.data.DataSource({
					  						data: data,
								});
				$(this.element).data("kendoDropDownList").setDataSource(dataSource);
			}
		},
		
		_createCheckBoxList : function(data){
			var $this = this;
			if(!data){
				data = this.options.data;
			}
			
			$(this.element).siDropDownList({
							dataSource : data,
						    shimRequired  : true,
						    index : -1,
						    select : function(e){
						    	if(event && event.target && $(event.target).hasClass("filter-dashboard-checkbox")){
						    		//on check Box check
						    		var dataItem = this.dataItem(e.item.index());
						    		dataItem.checked = event.target.checked;
						    		var checkedNode = {
											id 		: dataItem.id,
											text	: e.item.text(),
											checked : dataItem.checked,
						    		};
						    		$this._trigger("onCheck",null,checkedNode);
						    	}
			        	 		e.preventDefault();
			         		},
						    template : function(item){
						    	return $this.DASHBOARD_TEMPLATE({
						    								id 				: item.id,
						    								dashboardTitle	: item.title ? item.title : item.id,
						    								dashboardIcon 	: item.iconUrl,
						    								defaultChecked  : item.checked,
						    						});
						    },
			});
			
			this._triggerDefaultCheckedNode(data);
			
			this.showHideList(this.options.visible);
			/** adding and binding close button **/
			$(this.element).data("kendoDropDownList").list.attr("list-type","siCheckBoxList");
			$(this.element).data("kendoDropDownList").list.append($this.CLOSE_LIST_TEMPLATE({}));
			$(this.element).data("kendoDropDownList").list.find(".dropdown-footer-btn").bind("click",function(e){
				$this.showHideList(false);
			});
		},
		
		_triggerDefaultCheckedNode : function(data){
			var $this = this;
			if(data){
				var checkedNode;
				$.each(data,function(index,item){
					checkedNode = {
									id 		: item.id,
									text	: item.title ? item.title : item.id,
									checked : item.checked,
								};
					if(item){
						$this._trigger("onCheck",null,checkedNode);
					}
				});
			}
		},
		
		showHideList : function(isShow){
			if(isShow){
				$(this.element).data("kendoDropDownList").open();
			}else{
				$(this.element).data("kendoDropDownList").close();
			}
		},

	});

});