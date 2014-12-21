/**
 * 
 */
package com.spacetimeinsight.performance.filters;

/**
 * @author aditya.velala
 *
 */
import java.io.IOException;
import java.util.concurrent.TimeUnit;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.apache.log4j.xml.DOMConfigurator;


 
/**
 * A simple filter to log the time taken to execute a request. Logging is
 * carried out via log4j to give the flexibility to add other data (such as
 * current time) and format the log as required.
 * */

public class PerformanceLogFilter implements Filter {

	static {
		 DOMConfigurator.configure("log4j.xml");
	}
	/**
	 * An optional regular expression to use as a filter for the servlet patch.
	 * Gives more flexibility than the standard servlet url-filter. All requests
	 * are logged if not specified.
	 * */
	private static final String URL_FILTER_PARAM = "url-filter";

	/**
	 * An optional log4j category to use. The fully qualified class name of the
	 * filter will be used if not specified.
	 */
	private static final String LOG_CATEGORY_PARAM = "log-category";

	private Logger perfLogger;
	public void init(FilterConfig config) throws ServletException {
		String logCategory = config.getInitParameter(LOG_CATEGORY_PARAM);
		if (logCategory == null) {
			this.getClass().getName();
		}
		perfLogger = Logger.getLogger(logCategory);
		config.getInitParameter(URL_FILTER_PARAM);
		perfLogger.info("Time, Request Path, Layer Name, Time Taken to Execute(ms)");
	}
	
	 
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {

		long startTime;
		long endTime;
		String path = ((HttpServletRequest) request).getServletPath();
			
			
		
		if (path.matches("/.*.do") || path.matches("/.*.jsp") || path.matches("/MAGMARequestHandler")  ) {
			
			startTime = System.nanoTime(); //currentTimeMillis();
			
			
			chain.doFilter(request, response);
			
			//io.
			endTime = System.nanoTime();

			// Log the servlet path and time taken
			if( path.matches("/MAGMARequestHandler") ){
				perfLogger.info(  path +", "+request.getParameter("layername")+ ", " + TimeUnit.NANOSECONDS.toMillis(endTime - startTime));
			}else {
				perfLogger.info( path  +",  STAS Engine , "+ TimeUnit.NANOSECONDS.toMillis(endTime - startTime));
			}
		
		} else {
			chain.doFilter(request, response);
		}
	}

	public void destroy() {
		// Nothing to see here
	}

}