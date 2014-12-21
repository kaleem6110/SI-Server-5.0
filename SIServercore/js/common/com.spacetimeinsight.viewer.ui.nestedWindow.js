define([
    'jquery',
    'jquery-ui',
    'kendo',
],function($){
	$.widget('spacetimeinsight.siViewerNestedWindow',{
		options :{
			title:"Nested Window",
			windowAttributes : {
				width : "250px",
				height : "auto",
				minHeight : "30px",
				position: {
					top: "4px",
					left: "4px"
				}
			},
			actions:["Minimize"],
			isCheckBox:true,
			position : "",
			expand : "true",
			display : "true",
			shimRequired : false,
		},
		pluginName:"siViewerNestedWindow",
		IFRAME_CONTAINER : kendo.template("<iframe id='#= id #_shim' src='about:blank' style='z-index: -100000;top: 0px;position: absolute;height: 100%;width: 100%;left:0px;'></iframe>"),
		_create : function(){
			var $this= this;
			//used in event handling. Each event is prefix by plugin name
			this.widgetEventPrefix = this.pluginName + "_";

			this.options.elementId = $(this.element).attr("id");


			var draggableDiv = $(this.element);

			// defining DIV attributes

			$(this.element).css({
				border : "1px solid #c7c7c7",
				width :  this.options.windowAttributes.width,
				height :this.options.windowAttributes.height,
				top : this.options.windowAttributes.position.top ,
				minHeight: this.options.windowAttributes.minHeight ,
				position : this.options.position,
			}).addClass("ui-widget-content ui-draggable");

			$(this.element).css('border-radius' ,'10px');
			if(this.options.shimRequired){
				$(this.element).prepend(this.IFRAME_CONTAINER({"id":this.options.id}));
			}


		// to make div draggable
			draggableDiv.draggable({
				cursor : "move",
				containment : "parent",
				stop: function(event) {
							$this.stopWindow(event);
			      	}
			});
		},
		
		stopWindow : function(event){
			$($si.viewer).trigger("stopEvent", event);
		},
				
		setCheckedState : function(checked){
			if(this.options.isCheckBox){
				$("#"+this.options.elementId+"_checkbox").prop("checked", checked );
			}
		},

		setIndeterminateState : function(checked){
			if(this.options.isCheckBox){
				$("#"+this.options.elementId+"_checkbox").prop("indeterminate", checked );
			}
		},

		destroy: function(){
			$(this.element).remove();
		},
		
		getNestedWindowStyles :function(){
 			var nestedWindowStyles = [];
 			var width = this.element.css("width");
 			var height = this.element.css("height");
 			var top = this.element.css("top");
 			
 			left =this.element.css("left");
 			nestedWindowStyles.push({"windowAttributes":{"width":width,"height":height,position:{"top":top,"left":left}}});
 			return nestedWindowStyles;
 		},



	});
});
