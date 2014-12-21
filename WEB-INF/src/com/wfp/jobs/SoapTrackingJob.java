package com.wfp.jobs;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.enterprisehorizons.util.DateUtils;
import com.enterprisehorizons.util.Logger;
import com.enterprisehorizons.util.StringUtils;
import com.spacetimeinsight.config.scheduler.Parameter;
import com.spacetimeinsight.config.scheduler.Parameters;
import com.spacetimeinsight.magma.job.CustomJobTask;
import com.wfp.security.form.DeviceBean;
import com.wfp.utils.CommonUtils;
import com.wfp.utils.IEPICConstants;
import com.wfp.utils.SensorServiceUtils;

/**
 * 
 * @author sti-user
 *
 */
public class SoapTrackingJob implements CustomJobTask,IEPICConstants {
	
	private static SoapTrackingJob instance = null;
	@SuppressWarnings("unchecked")
	private static Map<String, Map<String, Map<String, List<DeviceBean>>>> soapServiceMap = new HashMap<String, Map<String, Map<String, List<DeviceBean>>>>();
	private static String lastRefreshTime = null;
	private static Map<String, String> paramsMap = new HashMap<String, String>();
	private static Date startDateTime = null;
	private static Date endDateTime = null;
	public SoapTrackingJob () {
			
	}
	
	
	private static synchronized void initializeInstance() {
		if (instance == null) {
			instance = new SoapTrackingJob();
		}
	}

	public static SoapTrackingJob getInstance() {
		if (instance == null) {
			initializeInstance();
		}
		return instance;
	}
	
	
	public  Map<String, Map<String, Map<String, List<DeviceBean>>>>  getSoapServiceMapCache() {
		return soapServiceMap;
	}

	
	public  Map<String, Map<String, List<DeviceBean>>> getSoapServiceList(String key){
		return getSoapServiceMapCache().get(key);
	}
	
	public boolean executeCustomTask(Parameters parameters) {
		Logger.info(" #### START SoapTrackingJob #######" +CommonUtils.getUTCdatetimeAsString(), SoapTrackingJob.class );
		Parameter[] params = parameters.getParameter();
		
		if(params != null){
			for (int i=0; i< params.length ; i++){
					paramsMap.put(params[i].getName(), params[i].getValue());	
			}
		}
		getSoapTrackingDtls(StringUtils.getInt(paramsMap.get("lpCount")));
		
		
		lastRefreshTime = CommonUtils.getUTCdatetimeAsString();
		Logger.info(" #### END SoapTrackingJob #######" +lastRefreshTime, SoapTrackingJob.class );
		
		
		return true;
	}
	  
	
	public static Date getStartDateTime() {
		return startDateTime;
	}


	public static Date getEndDateTime() {
		return endDateTime;
	}


	@SuppressWarnings("unchecked")
	private synchronized boolean getSoapTrackingDtls(int lpCount){
		
		Map<String, List<DeviceBean>> map = SensorServiceUtils.getEmergencySpotDtls(getStartDate().getTime(), getEndDate().getTime(), lpCount, paramsMap);
		startDateTime = getStartDate().getTime();
		endDateTime = getEndDate().getTime();
		//System.out.println("Soap Tracking "+map.size());
		if(map != null){
			for (Map.Entry<String, List<DeviceBean>> entry : map.entrySet())	{
				Map<String, Map<String, List<DeviceBean>>> deviceDayDtlsMap = null;
				if(entry != null && entry.getValue() != null){
					deviceDayDtlsMap =  new HashMap();
					Calendar startDate = getStartDate();
					while(startDate.getTime().before(getEndDate().getTime())){
						for(DeviceBean tempBean: entry.getValue()){
							if(tempBean.getDatetime().after(startDate.getTime()) 
									&& tempBean.getDatetime().before(getTempEndDate(startDate))){
								//System.out.println( " SOAP JOB :108: startDate.getTime() :"+startDate.getTime());
								String key = DateUtils.format(startDate.getTime());
								
								Map<String, List<DeviceBean>> deviceDayMap = deviceDayDtlsMap.get(key);
								if(deviceDayDtlsMap.get(key) == null){
									deviceDayMap =  new HashMap<String, List<DeviceBean>>();
								}
								
								List<DeviceBean> deviceList = deviceDayMap.get(tempBean.getName());
								if(deviceList == null){
									deviceList = new ArrayList<DeviceBean>();									
								}
								
								deviceList.add(tempBean);
								Collections.sort(deviceList, new Comparator(){
									 
						            public int compare(Object o1, Object o2) {
						                DeviceBean d1 = (DeviceBean) o1;
						                DeviceBean d2 = (DeviceBean) o2;
						               return d1.getDatetime().compareTo(d2.getDatetime());
						            }
						 
						        });
								deviceDayMap.put(tempBean.getName(), deviceList);
								deviceDayDtlsMap.put(key, deviceDayMap);
							}
						}	
						
						startDate = incrementStartDate(startDate);
						
					}
					
					
				}
				if(getSoapServiceMapCache() != null){
					getSoapServiceMapCache().put(entry.getKey(), deviceDayDtlsMap);
				}
				
			}
		}
		return true;

	}
	

	Calendar getEndDate(){
		Calendar endDate = Calendar.getInstance();
		
		return endDate;
	}
	
	Calendar getStartDate(){
		Calendar startDate = Calendar.getInstance();
		startDate.add(Calendar.MONTH, StringUtils.getInt(paramsMap.get("monthhistory")));
		startDate.set(Calendar.MINUTE, 0);
		startDate.set(Calendar.SECOND, 0);
		startDate.set(Calendar.HOUR, 0);
		return startDate;
	}
	
	Date getTempEndDate(){
		Calendar tempEndDate = Calendar.getInstance();
		tempEndDate.setTime(getStartDate().getTime());
		tempEndDate.set(Calendar.MINUTE, 59);
		tempEndDate.set(Calendar.SECOND, 59);
		tempEndDate.set(Calendar.HOUR, 23);
		return tempEndDate.getTime();
	}

	Date getTempEndDate(Calendar startDate){
		Calendar tempEndDate = Calendar.getInstance();
		tempEndDate.setTime(startDate.getTime());
		tempEndDate.set(Calendar.MINUTE, 59);
		tempEndDate.set(Calendar.SECOND, 59);
		tempEndDate.set(Calendar.HOUR, 23);
		return tempEndDate.getTime();
	}
	
	
	Calendar incrementStartDate(Calendar curday){
		
		curday.add(Calendar.HOUR, 24);
		return curday;
	}


	public static String getLastRefreshTime() {
		return lastRefreshTime;
	}
	
	
}
