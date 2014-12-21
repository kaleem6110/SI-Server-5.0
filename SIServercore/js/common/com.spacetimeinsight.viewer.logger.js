/**
 * Copyright © 2014 Space Time Insight, Inc.
	All rights reserved.

	This software is the confidential and proprietary information of Space Time Insight, Inc.
	and is solely for the use of Space Time Insight, Inc. personnel in confidence.
	The contents contained within this document carry an explicit and implicit understanding that no part of it
	will be circulated, quoted or reproduced for distribution outside Space Time Insight, Inc. without prior
	written approval from an authorized officer of Space Time Insight, Inc.

 */
/*This javascript file  provides the functionality to log errors, warnings or information  which could be used for tracking.
 Logging  It uses the log4javascript framwork basic loging method
 */
define(['siViewerNamespace','logger'],function($si) {

	$si.Logger = function (parameter){
			if(parameter==undefined || parameter==''){
					this.logger = log4javascript.getLogger();
			}else{
					this.logger = log4javascript.getLogger(parameter);
			}
			this.logger.addAppender(_addBrowsserApp());
			return this.logger;
		};

		// section of private method
		/* _addBrowsserApp this private method is used create BrowserConsoleAppender
			and add this appander to logger object
		*/
		function _addBrowsserApp(){
				var appender = new log4javascript.BrowserConsoleAppender();
				appender.setLayout(_appendersetLayout());
				//appender.setLevel(log4javascript.Level.ALL);
				return appender;
				}
				function _appendersetLayout(){

				//var layout = new log4javascript.PatternLayout("[%-5p] %m %d %p %c");
				var layout = new log4javascript.PatternLayout("[%-5p] %c %d %m");

				return layout;
		}

	// section of public method
	$si.Logger.prototype={
		constructor:$si.Logger,

		isInfoEnabled: function () {
			if(this.logger!=null){
			 return  (this.logger.isInfoEnabled());
		 	}
		 	return false;

		   },
			info: function (msg,e) {
			if(this.logger!=null && isInfoEnabled())
				if(e && e.stack){
			   		this.logger.info(msg,e.stack);
			   	}else{
			   		this.logger.info(msg);
			   	}

			},

			isDebugEnabled: function () {
				if(this.logger!=null){
				 return  (this.logger.isDebugEnabled());
				}
				return false;
		   },
			debug: function (msg,e) {
			if(this.logger!=null && isDebugEnabled())
			   if(e && e.stack){
			   		this.logger.debug(msg,e.stack);
			   	}else{
			   		this.logger.debug(msg);
			   	}

			},
			isWarnEnabled: function () {
				if(this.logger!=null){
				 return  (this.logger.isWarnEnabled());
			 }
			 return false;

		   },
			warn: function (msg,e) {
			if(this.logger!=null && isWarnEnabled())
			   if(e && e.stack){
			   		this.logger.warn(msg,e.stack);
			   	}else{
			   		this.logger.warn(msg);
			   	}

			},
			isErrorEnabled: function () {
			if(this.logger!=null){
			 	return  (this.logger.isErrorEnabled());
			}
			return false;

		   },
			error: function (msg,e) {
			if(this.logger!=null && isErrorEnabled())
			   if(e && e.stack){
			   		this.logger.error(msg,e.stack);
			   	}else{
			   		this.logger.error(msg);
			   	}

			},
			isFatalEnabled: function () {
				if(this.logger!=null){
				 	return  (this.logger.isFatalEnabled());
				}
				return false;

		   },
			fatal: function (msg,e) {
			if(this.logger!=null && isFatalEnabled())
			   if(e && e.stack){
			   		this.logger.fatal(msg,e.stack);
			   	}else{
			   		this.logger.fatal(msg);
			   	}

			},
			/*isTraceEnabled: function (loggerName) {

			 return  (this.logger.isTraceEnabled());

		   },
			trace: function (loggerName,msg) {
			if(this.logger!=null)
			   if(e && e.stack){
			   		this.logger.trace(msg,e.stack);
			   	}else{
			   		this.logger.trace(msg);
			   	}

			}, */

				/*

		log4javascript.Level.ALL
		log4javascript.Level.TRACE
		log4javascript.Level.DEBUG
		log4javascript.Level.INFO
		log4javascript.Level.WARN
		log4javascript.Level.ERROR
		log4javascript.Level.FATAL
		log4javascript.Level.OFF

	*/
	/*  with setEnabled method loging can be disabled	by sending true and false value of flag
	If flag is true it allow to log the message in browser console window if it is false then logging method will not
	Display any log message on browser console
	*/

		setEnabled: function (flag){
			 log4javascript.setEnabled(flag);
		},

		//setLevel with this method different log level can be set
		setLevel: function (level){
				if(this.logger!=null){
				this.logger.setLevel(log4javascript.Level.ALL);
				//this.logger.setLevel(log4javascript.Level.ERROR);
				}

		} ,


	};
});