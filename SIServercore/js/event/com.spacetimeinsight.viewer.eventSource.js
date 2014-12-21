define(['siViewerNamespace','kendo'],function($si) {
    var eventSource = $si.createNameSpace("spacetimeinsight.eventSource");

	/**
	* All business view related events will be fired against this object
	*/
	eventSource.businessView = kendo.observable({});

	/**
	* All map related events will be fired against this object
	*/
	eventSource.map = kendo.observable({});

	/**
	* All lasso related events will be fired against this object
	*/
	eventSource.lasso = kendo.observable({});

	/**
	* All global events events that are sent from the server
	*/
	eventSource.globalEvents = kendo.observable({});
	
	/**
	* All module level events events that are sent from the server or user or both directions
	*/
	eventSource.moduleLevelEvents = kendo.observable({});
	/**
	 * window drag events
	 */
	eventSource.windowEvents = kendo.observable({});
	
	eventSource.notifications = kendo.observable({});

    return $si;
});