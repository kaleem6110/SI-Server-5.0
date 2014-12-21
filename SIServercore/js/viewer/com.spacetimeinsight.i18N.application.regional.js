define(['siViewerNamespace','siViewerData','viewer/com.spacetimeinsight.i18N.application'],function($si) {
	$si.i18N = {};
	$si.i18N.Application={};
	$si.i18N.Application.regional={};
	$si.i18N.Application.regional['en'] =  {
		logout : "Logout",
		tooltip : {
			   settings: "Manage application settings",
			   help : "Access help system",
			   clone : "Clone application session",
			   time : "Edit time filter",
			   alert : "View  alerts",
			   favorite :"Show favorites",
			   speaker : "Turn off audio alarm",
			   acknowledge: "Acknowledge selected alert(s)",
			   exporttocsv : "Export To CSV",
			   filteralerts	: "Filter Alerts",
			},
			aboutWindow:{
				title:"SI Server For HTML",
				version: "Version :",
				versionvalue: "5.0.0.0",
				buildid: "Build Id :",
				currentbuildid: "201404211200748",
				copyright: "© Copyright 2008-2014 Space-Time Insight ®. All rights reserved.",
				},
		alertWindow : {
			title			: "Alerts",
			activeTab		: "Active",
			acknowledgedTab	: "Acknowledged",
			alertTypeColumn	: "Alert Types",
			messageIdColumn	: "Message ID",
			messageColumn	: "Message",
		   	priorityColumn	: "Priority",
		   	alertTimeColumn	: "Alert Time",
		   	ackByColumn		: "Acknowledged by",
		   	ackOnColumn		: "Acknowledged on",
		   	acknowledgementWindow	: {
		   		title				: "Alerts Acknowledgement",
		   		okButton			: "Ok",
		   		cancelButton		: "Cancel",
		   		ackCommentsLabel	: "Add a comment for the selected alerts.",
		   		ackCommentsPlaceholder	: "Enter comment...",
		   		ackCommentsMaxWords	: "* Maximum 1000 characters",
		   		suppressLabel		: "Suppress alert for :",
		   		remainingCharacters	: "Remaining Characters : ",
		   	},
		   	drawerLabels : {
		   		defaultSuppressTime	: "Default suppress time",
		   		ackAlertsSettings	: "Acknowledged Alerts",
		   		onlyShowLast		: "Only Show Last",
		   		alertCount			: "Only Show",
		   		alertsLabel			: "alerts",
		   	},
		   	timeFormats : {
		   		seconds	: "Seconds",
		   		minutes	: "Minutes",
		   		hours	: "Hours",
		   		days	: "Days",
		   		months	: "Months",
		   	},
		},
		exportLabels : {
			saveInfo	: "Save your data to a file",
			downloadButton	: "Download",
			closeButton		: "Close",
			alertExport : {
				alertToDownload : 'Alerts to download',
				activeAlerts 	: "Active alerts",
				ackAlerts 		: "Acknowledged alerts",
				allAlerts		: "All Alerts",
				allAlertsBetween : "Alerts",
				alertTime		: "Time",
				alertTypes		: 'Alert types',
				emptyDateError		: 'Date cannot be empty.',
				validDateTimeError	: 'You must enter correct date and time.',
				cmpError		: 'To date should be greater than from date.',
			},
		},
		HELP_MENU_DATA : {
	   		siViewerHelp	: "SI Viewer Help",
	   		applicationHelp : "Application Help",
	   		about			: "About",
	   	},
	   	preferencesLabels :{
	   		title 				: "Application Preferences",
	   		genSettInfo 		: 'General Settings',
	   		colorScheme			: "Color scheme",
	   		defaultApp			: "Default application for user<span class='mandatory'>*</span>",
	   		measurementSystem 	: "Measurement system",
	   		language			: "Language<span class='mandatory'>*</span>",
	   		errorSettInfo		: "Error and Information Messages",
	   		showMessages		: "Show messages",
	   		displayMax			: "Display a maximum of ",
	   		displayMaxInfo		: " message(s) at one time",
	   		timeInfo			: "Show message for ",
	   		seconds				: " second(s)",
	   		alertTickerSettInfo : "Alert Scrolling Ticker Settings",
	   		noOfAlerts			: "Repeat",
	   		scrollSpeed			: "Scrolling speed",
	   		zoomLabel			: "Zoom to altitude",
	   		ackAlerts			: "Acknowledged Alerts",
	   		showLast			: "Only show last",
	   		alertCount			: "Only Show",
		   	alertsLabel			: "alerts",
	   		applyAllButton		: "Apply to all users",
	   		restoreButton		: "Restore to system default",
	   		restoreAppButton	: "Restore to application default",
	   		applyButton			: "Apply",
	   		times				:" times",
	   		onClick				: " on click",
	   		closeButton			: "Cancel",
	   		measurementTypes 	: {
	   			imperial		: "Imperial",
	   			metric			: "Metric",
	   		},
	   		mandatoryFieldCondition : '* These settings require user to re-login.',
	   	},
	};


	$si.i18N.Application.setDefaults = function(regionalData) {
		$si.i18N.Application = regionalData;
	};

	$si.i18N.Application.setDefaults($si.i18N.Application.regional[$si.viewer.locale]);
});

