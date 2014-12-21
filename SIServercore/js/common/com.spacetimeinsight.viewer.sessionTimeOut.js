define(['siViewerData','siAjaxUtil','jquery-xml2json','siRouter','common/com.spacetimeinsight.i18N.common','common/com.spacetimeinsight.i18N.common.regional'],function($si) {

	$si.sessionTimeOut = {

		initialize : function() {
			var $this =this;
			$si.sessionTimeOut._initSessionValidators();
			$si.sessionTimeOut.validateSession();

		},
		_initSessionValidators:function(){
			var $this =this;
			$($si.sessionTimeOut).bind("validateAndExtendSession", function(event,src){
					if($si.Logger('sessionTimeOut').isDebugEnabled()){
						$si.Logger('sessionTimeOut').debug(' validateAndExtendSession trigger src:'+src);
					}
					$this.validateSession();
				});
				/* -- commented out
				document.onclick = function() {
					if($si.Logger('sessionTimeOut').isDebugEnabled()){
						$si.Logger('sessionTimeOut').debug(' validateAndExtendSession trigger src:document.onclick');
					}
					$this.validateSession();
				};
				document.onmousemove = function() {
					//TODO commenting out as its crashing the browser
					//$si.Logger('init').debug('validateAndExtendSession trigger src:document.onmousemove');
				  //$this.validateSession();
				};
				document.onkeypress = function() {
					if($si.Logger('sessionTimeOut').isDebugEnabled()){
						$si.Logger('sessionTimeOut').debug('validateAndExtendSession trigger src:document.onkeypress');
					}
					$this.validateSession();
			};
			*/
		},





		validateSession :function(){
			var $this = this;
			$si.routes.getSessionDetails($this.onSessionSuccess,$this.onSessionFailure);
		},

		onSessionSuccess :function(data){
			var $this = this;
			var obj = $.xml2json(data);


			var sessionAlertTime = 0;

			var sessionAlert = obj.sessionAlert;
	    	var sessionAlertTime = obj.sessionAlertTime;
	    	var currentUser = obj.currentUser;
	    	var sessionMaxInterval = obj.sessionMaxInterval;
	    	var sessionMaxDiff = sessionMaxInterval - sessionAlertTime ;
	    	var winAttr = {
									height : 300,
									modal : true,
									position : {
										left : (window.innerWidth/2)-100,
									}
								};
			  if($si.viewer.userModel.userInfo.isSSO){
			         clearTimeout($this.sessionTimer);
					 $this.sessionTimer = 0 ;
					 $this.sessionTimer = setTimeout($this.validateSession(),sessionMaxInterval*1000-sessionAlertTime*1000);
			  }else{
				  if(sessionAlert == 'true'){

					clearTimeout($this.sessionTimer);
					 $this.sessionTimer = 0 ;
					 $this.sessionTimer = setTimeout(function() {
						var minutes = parseInt( sessionAlertTime / 60 ) % 60;
						var seconds = sessionAlertTime % 60;
						if(seconds<10){
							seconds = '0'+seconds;
						}
						var message =  $si.DialogBox.confirm($si.i18N.Common.sessionExtendDialogTitle,$si.i18N.Common.sessionTobeExpire +minutes+':'+seconds+ $si.i18N.Common.sessionTobeExpireConfirm,"css/images/info_window.png","htmlViewer",winAttr);
					   $('#htmlViewer_dialog').bind("confirmdialogbuttonclicked", function(e, data){
						    if (data){
						    	//validateSession();
						    	$($si.sessionTimeOut).trigger("validateAndExtendSession",["User confirmed to extend"]);
						    }
							else{
								$this.sessionTimer = setTimeout(function() {
									// releasing websockets
									$si.routes.closeAllWebsockets();
									$si.DialogBox.show($si.i18N.Common.sessionExpireDialogTitle,$si.i18N.Common.sessionExpired,"css/images/info_window.png","OK","htmlViewer",winAttr);
										$($si.viewer).bind("dialogbuttonclicked", function(e, data){
											if($.trim($(data).parent().find(".k-window-titlebar")[0].innerText) == $si.i18N.Common.sessionExpireDialogTitle)
												window.location = $si.viewer.serverUrl+'logout.do?isSessionExpired=yes';
										});
									}, sessionAlertTime*1000);

						    }
					    });
					}, sessionMaxDiff*1000);
				}else{
					clearTimeout($this.sessionTimer);
						$this.sessionTimer = 0 ;

						$this.sessionTimer = setTimeout(function() {
							//releasing websockets
							$si.routes.closeAllWebsockets();
							$si.DialogBox.show($si.i18N.Common.sessionExpireDialogTitle,$si.i18N.Common.sessionExpired,"css/images/info_window.png","OK","htmlViewer",winAttr);
							$($si.viewer).bind("dialogbuttonclicked", function(e, data){
								if($.trim($(data).parent().find(".k-window-titlebar")[0].innerText) == $si.i18N.Common.sessionExpireDialogTitle)
											window.location = $si.viewer.serverUrl+'logout.do?isSessionExpired=yes';
							});
						 }, sessionMaxInterval*1000);

					}

		  }



		},
		onSessionFailure : function(data){
			alert('session error');
		},

		 invalidateSession :function(){
			alert('session timeout !');
				 window.location = $si.viewer.serverUrl+'/logout.do?isSessionExpired=yes';

	    },

	};




});