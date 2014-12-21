/**
 * 
 */
define([
    'jquery',
    'jquery-ui',
    'kendo',
    'jquery.jscrollpane.min',
	'jquery.mousewheel',
],function($) {
	$si.uiUtils = {
			reSizeComboBoxToFitData: function(el)
			{
				var p = el.data("kendoComboBox").popup.element;
				var w = p.css("visibility","hidden").show().outerWidth();
				p.hide().css("visibility","visible");
				el.closest(".k-widget").width(w);
			},
			
			maxZindex : function(){
				var maxZ=-1;
				$('*').each(function(){
					if(parseInt($(this).css('zIndex')) > maxZ){
						maxZ = parseInt($(this).css('zIndex'));
					}
				});
				return maxZ;
			},
			
			getFooterDate : function(date){
				if(date){
					return moment(date).format("DD/MM/YYYY hh:mm:ss");
				}
			},

	};
	$.fn.customScrollbar = function(autoReinitialise,showArrows){
		$(this).jScrollPane({
		autoReinitialise: autoReinitialise,
		showArrows : showArrows,
		});
	};
});