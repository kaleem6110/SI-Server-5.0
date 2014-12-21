package com.wfp.jobs;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.enterprisehorizons.util.Logger;
import com.spacetimeinsight.config.scheduler.Parameter;
import com.spacetimeinsight.config.scheduler.Parameters;
import com.spacetimeinsight.magma.job.CustomJobTask;
import com.wfp.utils.CommonUtils;
import com.wfp.utils.IEPICConstants;
import com.wfp.utils.LDAPUtils;

/**
 * 
 * @author sti-user
 *
 */
@SuppressWarnings("unchecked")
public class LDAPServiceJob implements CustomJobTask, IEPICConstants {
	
	private static LDAPServiceJob instance = null;
	private static Map<String, Object> ldapServiceMap = new HashMap();
	private static Map<String, List<String>> userMisionsMap = new HashMap();
	private static String lastRefreshTime = null;
	private static Map<String, String> paramsMap = new HashMap();
	public LDAPServiceJob () {
			
	}
	
	
	private static synchronized void initializeInstance() {
		if (instance == null) {
			instance = new LDAPServiceJob();
		}
	}

	public static LDAPServiceJob getInstance() {
		if (instance == null) {
			initializeInstance();
		}
		return instance;
	}
	
	
	private static Map<String, Object> getLDAPServiceMapCache() {
		return ldapServiceMap;
	}

	public static Map<String, List<String>> getLDAPUsersMissionsList(){
		return userMisionsMap;
	}
	
	public static Object getLDAPCacheData(String key) {
		return getLDAPServiceMapCache().get(key);
	}

	

	
	public boolean executeCustomTask(Parameters parameters) {
		//ldapServiceMap.put("ldapGroups", allGroups);
		//LDAPUtils.getUserDomain(deviceId);
		Parameter[] params = parameters.getParameter();
		if(params!= null ){
			for (int i=0; i<  params.length ; i++){
				paramsMap.put(params[i].getName(), params[i].getValue());	
			} 
		}
		Logger.info("clearing the LDAP user details", LDAPUtils.class);
		if(paramsMap.get("clearcache") != null && "true".equalsIgnoreCase(paramsMap.get("clearcache"))){
			LDAPUtils.getLDAPUserDtlsMap().clear();
		}
		userMisionsMap.clear();
		@SuppressWarnings("unchecked")
		List<String> allDevices = LDAPUtils.getDevices();
		ldapServiceMap.put(PARAM_ALLGROUPS, allDevices);
		
		//LDAPUtils.getLDAPUserDtlsMap().clear();
		
		if(allDevices != null){
			for(String deviceId:allDevices){
				/*if("EMS-DST2931A3".equalsIgnoreCase(deviceId)){
					System.out.println("jj");
				}*/
				if(LDAPUtils.validateVehicles(deviceId, paramsMap.get("vehicleresourcetype") != null?paramsMap.get("vehicleresourcetype").split(","):null)){
					//addDevice(element, vehicleList, KEY_VEHICLE);
					LDAPUtils.setLDAPUserDtls(deviceId, KEY_VEHICLE);
				}else if(LDAPUtils.validateStaff(deviceId, paramsMap.get("staffresourcetype") != null?paramsMap.get("staffresourcetype").split(","):null)){
					//addDevice(element, staffList,KEY_STAFF);
					LDAPUtils.setLDAPUserDtls(deviceId, KEY_STAFF);
				}else if(LDAPUtils.validatePlanes(deviceId, paramsMap.get("airplaneresourcetype") != null?paramsMap.get("airplaneresourcetype").split(","):null)){
					//addDevice(element, airplaneList, KEY_AIRPLANE);
					LDAPUtils.setLDAPUserDtls(deviceId, KEY_AIRPLANE);
				}
				
				
				
			}
		}
		
		Map<String, List<String>> allDomainsOnMissionList = LDAPUtils.getAllDomainsOnMissionMap();
		ldapServiceMap.put("allDomainsOnMissionList", allDomainsOnMissionList);
		
		Map<String, List<String>> allDevicesDomainsMap = LDAPUtils.getAllDevicesOnDomainMap();
		ldapServiceMap.put("allDevicesDomains", allDevicesDomainsMap);
		
		lastRefreshTime = CommonUtils.getUTCdatetimeAsString();
		
		return true;
	}
	
	public static String getLastRefreshTime() {
		return lastRefreshTime;
	}
	
}
