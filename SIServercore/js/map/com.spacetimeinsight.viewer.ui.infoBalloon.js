/**
 * @author kartik.raina
 */
define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'common/com.spacetimeinsight.viewer.ui.window',
],function($,$si){
	$.widget('spacetimeinsight.siViewerInfoBalloon',$.spacetimeinsight.siViewerWindow,{
		options:{
				title:"Info Balloon",
				shimRequired : true,
				windowAttributes : {
					width 	: "270px",
					height 	: "200px",
					minWidth: "150px",
					minHeight:"150px",
					position: {
						top		: "150px",
						left	: "200px",
					},
				},
			},

			pluginName:"siViewerInfoBalloon",

			_create: function(){
				alert("On baloon load");
				var $this = this;
				var $options = this.options;
				this._super();
				$(this.element).append("<div id='testdiv'>Kartik Raina</div>");
			},
	});
});