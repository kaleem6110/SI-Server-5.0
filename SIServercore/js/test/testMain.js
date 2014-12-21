// Load modules and use them
require(['jquery', 'si.viewer','si.ui.dataFilter',], function($,$si){
    // do something with the loaded modules
    $('#test').dataFilter({
				windowAttributes:$si.viewer.components["dataFilter"].windowAttributes
		 	});
});