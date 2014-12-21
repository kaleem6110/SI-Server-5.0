define(['siViewerData',],function($si) {
	$si.i18N.Common = {
		sessionExpireDialogTitle:"Session Expiration",
		sessionTobeExpire:"Your login session will expire in ",
		sessionTobeExpireConfirm:" (min:sec). Would you like to extend your session?",
		sessionExpired:"Your session has expired as per defined period of inactivity. Any unsaved data has been lost. Click OK to login again.",
		

			setDefaults : function(regionalData) {
				$si.i18N.Common.sessionTobeExpire = regionalData.sessionTobeExpire;
				$si.i18N.Common.sessionTobeExpireConfirm = regionalData.sessionTobeExpireConfirm;
				$si.i18N.Common.sessionExpired = regionalData.sessionExpired;
				$si.i18N.Common.sessionExpireDialogTitle = regionalData.sessionExpireDialogTitle;
				$si.i18N.Common.sessionExtendDialogTitle = regionalData.sessionExtendDialogTitle;
			},
	};

	$si.i18N.Common.regional = [];
});