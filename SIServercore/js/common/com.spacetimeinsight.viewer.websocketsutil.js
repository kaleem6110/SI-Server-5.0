/**
 * Copyright © 2014 Space Time Insight, Inc.
	All rights reserved.

	This software is the confidential and proprietary information of Space Time Insight, Inc.
	and is solely for the use of Space Time Insight, Inc. personnel in confidence.
	The contents contained within this document carry an explicit and implicit understanding that no part of it
	will be circulated, quoted or reproduced for distribution outside Space Time Insight, Inc. without prior
	written approval from an authorized officer of Space Time Insight, Inc.

 */

 /**
	*  	This WebSocketService is the constructor used to initialize atmosphere jquery API and create web socket
    *	connection and register the onMessageCallback and the onErrorCallback call back methods with request.
	*	@param urlSuffix  			for which topic we will be creating the websocket
	*	@param onMessageCallback  	method which will be called when the response will come from the server
	*	@param onErrorCallback		method which will be called when there is some error while getting the response
	* 	@param queryParams			the parameters that we want to send as request headers
	* 	@param atmosphereRequest	atmosphere request that we will pass when will make the instance of WebSocketService
	*
	*	Example1: new WebSocketService("ws/alerts",onMessageAlerts, onErrorAlerts, modeSpecificQueryStr, null);
	*
	* 	Example2: var req = {url:serverUrl+"ws/alerts",
						logLevel:'debug',
						share:false,
						trackMessageLength:true,
						transport:'websocket',
						fallbackTransport:'streaming',
						headers: header
						};
	*	wsAlerts = new WebSocketService("ws/alerts",onMessageAlerts, onErrorAlerts,modeSpecificQueryStr,req);
	*
*/
define(['siViewerNamespace','siViewerLogger','atmosphere'],function($si) {

	$si.WebSocketService = function(urlSuffix,onMessageCallback,onErrorCallback,queryParams,atmosphereRequest){
			var serverUrl = $si.viewer.serverUrl;
			this.str = {selector:queryParams};
			if(atmosphereRequest != null){
				this.request = atmosphereRequest;
			}else{
				this.request =  {url:serverUrl+urlSuffix,
								logLevel:'debug',
								share:false,
								trackMessageLength:true,
								transport:'streaming',
								fallbackTransport:'streaming',
								headers: this.str
								};
			}
			this.onMessageCallback=onMessageCallback;
			this.onErrorCallback=onErrorCallback;

			this.request.onMessage = function(response){
					if (response.status == 200)
					{
							if (typeof onMessageCallback === "function") {
							// Call it, since we have confirmed it is callable
								onMessageCallback(response.responseBody);
							}else{
								alert(" error :"+this.wsUri +" onMessage found as not a function :"+onMessageCallback);
							}

					}else{//
						//alert(" error :"+this.wsUri +" response status is not 200:"+response.status);
							if (typeof onErrorCallback === "function") {
												// Call it, since we have confirmed it is callable
								onErrorCallback(response.reasonPhrase);
							}else{
								alert(" error :"+this.wsUri +" onError found as not a function :"+onErrorCallback);
							}
					}
				};

			this.request.onError = function(response){
			$($si.sessionTimeOut).trigger("validateAndExtendSession",["websocket onError"]);
					//alert(" error :"+this.wsUri +" failed with response :"+response.reasonPhrase +" status: "+response.status +' timestamps :'+new Date());
					if (typeof onErrorCallback === "function") {
											// Call it, since we have confirmed it is callable
							onErrorCallback(response.reasonPhrase);
					}else{
							alert(" error :"+this.wsUri +" onError found as not a function :"+onErrorCallback);
					}
				};
			// subscribe to websocket service on the url
			this.socketRef=$.atmosphere.subscribe(this.request);

	}

	$si.WebSocketService.prototype={
		constructor:$si.WebSocketService,
		/**
		*	When we have to send the message from the client to the server, we will use the send message API
		*/
		sendMessage:function(msg){
			try{
				$($si.sessionTimeOut).trigger("validateAndExtendSession" ,["websocket sendMessage"]);
				this.socketRef.push(msg);
			}catch(e){
				alert(" warn :"+this.wsUri +" failed to push message to server root cause:"+e.message);
			}
		},
		/**
		*	When we want to reconnect the websocket and register the consumer, we will use the reconnect API.
		*/
		reconnect:function(){
			var isClosed = this.socketRef.request.closed;
			$($si.sessionTimeOut).trigger("validateAndExtendSession",["websocket reconnect"]);
			if(isClosed){
				this.socketRef=$.atmosphere.subscribe(this.request);
			}
		},
		/**
		*	When we want to disconnect the websocket and unregister the consumer, we will use the disconnect API.
		*/
		disconnect:function(){
			try{
			$($si.sessionTimeOut).trigger("validateAndExtendSession",["websocket disconnect"]);
				this.socketRef.close();
			}catch(e){
				alert(" warn :"+this.wsUri +" failed to disconnect socket and the root cause :"+e.message);
			}
		}

	}
});