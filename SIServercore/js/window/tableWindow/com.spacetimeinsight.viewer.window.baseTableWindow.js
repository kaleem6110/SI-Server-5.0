define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'siViewerNamespace',
    'window/com.spacetimeinsight.viewer.window.baseWindow',
],function($){

	$.widget('spacetimeinsight.siViewerBaseTableWindow', $.spacetimeinsight.siViewerBaseWindow,{
		options : {
			toolBarOptions 	: 	["INLINEFILTER","FREEZE"],
			id				:	"tableDashboard",
			populatedArray :[],
		},

		pluginName : "siViewerBaseTableWindow",
		DATE_FORMAT : "YYYY-MM-DDTHH:mm:ss.SSS",
		
		_create : function(){
			this._super();
		},

		_createControls : function(){
			this._super();
		},

		_bindControls : function(){
			this._super();
		},

		_onDrawerCreationComplete : function(e,data){
			var $this = this;
			this._super();
			$this.options.drawer[$this.options.drawerWidget]().bind($this.options.drawerWidget.toLowerCase()+"_applytabledrawersettings",function(event,data){
				console.log("_applytabledrawersettings");
			});
		},


		//TODO: need to discuss with suresh
		windowToolClicked : function(toolId){
			var $this = this;

			$this._super(toolId);
		},

		 _returnCriteriaObjectArray: function (nestedArray) {
	            var $this = this;


	            $.each(nestedArray, function (index, item) {
	                if (item.criterias) {
	                	if($.isArray(item.criterias)){
	                		$this._returnCriteriaObjectArray(item.criterias);
	                	}
	                } else {
	                    if ($this.options.populatedArray.indexOf(item) < 0) {
	                    	$this.options.populatedArray.push(item);
	                    }
	                }

	            });

	            return $this.options.populatedArray;

	        },




		refreshWindow : function() {
			var $this = this;
			this._super();
			var filterCols = [];
			$this.options.populatedArray = [];
			if(this.options.filterCriteria){
			var crierias = JSON.parse(this.options.filterCriteria).criterias;

			crierias = $this._returnCriteriaObjectArray(crierias);

			$.each(crierias,function(index,criteria){
				filterCols.push(criteria.fieldName);



			});


			}

			$this.addFilterIcons(filterCols);
		},



	});
});