define(['siViewerData','common/com.spacetimeinsight.i18N.common'],function($si) {
	$si.i18N.Common.regional['en'] =  {
		sessionExpireDialogTitle:"Session Expiration",
		sessionTobeExpire:"Your login session will expire in ",
		sessionTobeExpireConfirm:" (min:sec). Would you like to extend your session?",
		sessionExpired:"Your session has expired due to an extended period of inactivity. \n Any unsaved data would be lost. Please login again to access the requested information.",
		sessionExtendDialogTitle : "Extend Session",
	};
	
	$si.i18N.Common.regional['fr'] =  {
		sessionExpireDialogTitle:"Session Expiration",
		sessionTobeExpire:"Your login session will expire in ",
		sessionTobeExpireConfirm:" (min:sec). Would you like to extend your session?",
		sessionExpired:"Your session has expired due to an extended period of inactivity. \n Any unsaved data would be lost. Please login again to access the requested information.",
		sessionExtendDialogTitle : "Extend Session",
	};	

	$si.i18N.Common.setDefaults($si.i18N.Common.regional[$si.viewer.locale]);

});