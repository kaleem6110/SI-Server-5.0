/**
 * Copyright © 2014 Space Time Insight, Inc.
	All rights reserved.

	This software is the confidential and proprietary information of Space Time Insight, Inc.
	and is solely for the use of Space Time Insight, Inc. personnel in confidence.
	The contents contained within this document carry an explicit and implicit understanding that no part of it
	will be circulated, quoted or reproduced for distribution outside Space Time Insight, Inc. without prior
	written approval from an authorized officer of Space Time Insight, Inc.

 */


define(['jquery','siViewerNamespace','siViewerLogger',],function($,$si) {

	$si.ajaxUtil = function(url,onMessageCallback,onErrorCallback,queryParams,pollInterval){
		 _poll();

		 function _poll(){
		 	var data = "";
		 	//cache buster
		 	if(queryParams)
		 		queryParams.bust = (new Date()).getTime();
		 	else
		 		queryParams = {bust:queryParams};
		 		
		 	$.ajaxSetup({ cache: false });
	 		$.post(url,queryParams).done(function(data) {
	 			if(data._errorCd && data._errorCd === 1 && data._errorDesc != null) {
					if(onErrorCallback) {
						onErrorCallback(data);
					}	 				
	 			} else {
	 				if(onMessageCallback) {
						onMessageCallback(data);
					}
	 			}
			}).fail(function(data) {
					if(onErrorCallback) {
						onErrorCallback(data);
					}
			}).complete(function() {
			$($si.sessionTimeOut).trigger("validateAndExtendSession",["ajax"]);
				if(pollInterval && pollInterval > 0) {
					setInterval(_poll,pollInterval);
				}
			}) ;
		};
	};

	$si.xmlUtil = function(url,onMessageCallback,onErrorCallback,queryParams){
		 $.ajax({
			    type: "GET",
			    url: url,
			    dataType: "xml",
			    data : queryParams,
			    success: function(xml) {
			    	onMessageCallback(xml);
			    },
			    fail : function(data){
			    	onErrorCallback(xml);
			    },
			  });
	};
});