package com.wfp.jobs;

import java.rmi.RemoteException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.rpc.ServiceException;

import lu.hitec.pss.soap.ds.out._15_x.DirectoryServiceOutInterface_PortType;
import lu.hitec.pss.soap.ds.out._15_x.DtoMission;
import lu.hitec.pss.soap.ds.out._15_x.ResourceNotFoundException;

import com.enterprisehorizons.util.Logger;
import com.spacetimeinsight.config.scheduler.Parameter;
import com.spacetimeinsight.config.scheduler.Parameters;
import com.spacetimeinsight.db.lasso.model.Lasso;
import com.spacetimeinsight.magma.job.CustomJobTask;
import com.wfp.utils.CommonUtils;
import com.wfp.utils.EventServiceUtils;
import com.wfp.utils.IEPICConstants;
import com.wfp.utils.LDAPUtils;
import com.wfp.utils.LDAPWSUtils;
import com.wfp.utils.LassoUtils;
import com.wfp.utils.RBRegionsUtils;

/**
 * 
 * @author sti-user
 *
 */
@SuppressWarnings("unchecked")
public class LDAPCacheJob implements CustomJobTask, IEPICConstants {
	
	private static LDAPCacheJob instance = null;
	private static Map<String, Object> ldapServiceMap = new HashMap();
	private static Map<String, List<String>> userMisionsMap = new HashMap();
	private static String lastRefreshTime = null;
	private static Map<String, String> paramsMap = new HashMap();
	public static Map<String,String> deviceOffsetMap = new HashMap();
	private static Map<String,DtoMission[]> placeMissionMap = new HashMap<String,DtoMission[]>();
	
	
	public LDAPCacheJob(){ }
	
	private static synchronized void initializeInstance() 
	{
		if (instance == null) {
			instance = new LDAPCacheJob();
		}
	}
	public static LDAPCacheJob getInstance() {
		if (instance == null) {
			initializeInstance();
		}
		return instance;
	}	
	
	/* (non-Javadoc)
	 * @see com.spacetimeinsight.magma.job.CustomJobTask#executeCustomTask(com.spacetimeinsight.config.scheduler.Parameters)
	 */
	public boolean executeCustomTask(Parameters parameters)
	//public static boolean executeCustomTask()
	{
		Logger.info("### START LDAP service Job: "+CommonUtils.getUTCdatetimeAsString(), LDAPCacheJob.class );
		int staff=0,vehicle=0,plane=0;
		String token = EventServiceUtils.getLDAPToken();
		DirectoryServiceOutInterface_PortType stub=null;
		try {
			  List<Lasso> lassoList = LassoUtils.getAllLassos();
			 // Logger.info( " lassoList : "+ lassoList, LDAPCacheJob.class  );
			  if( lassoList!=null) Logger.info(" Lasso Size : "+lassoList.size() , LDAPCacheJob.class );
			  
			 stub= EventServiceUtils.getLDAPStub();
			 LDAPUtils.setCountriesMap(  LDAPWSUtils.getCountriesMap( token ));
			 LDAPUtils.setMissionsMap( LDAPWSUtils.getAllMissionsMap(token));
		} catch (ServiceException e) { 	e.printStackTrace(); }
		catch (ResourceNotFoundException e) { 	e.printStackTrace(); }
		catch (RemoteException e) { 	e.printStackTrace(); }
		
		//SensorSrvClientPortBindingStub stub = SensorServiceUtils.getServiceLocatorStub();
		if( LDAPUtils.getOrgMap()==null ) LDAPUtils.getAllOrganizations();		
		
		Parameter[] params = parameters.getParameter();
		if(params!= null )
		{
			for (int i=0; i<  params.length ; i++) 
				paramsMap.put(params[i].getName(), params[i].getValue());	
		}
		//"### Cache Cleared: clearing the LDAP user details service Job
		if(paramsMap.get("clearcache") != null && "true".equalsIgnoreCase(paramsMap.get("clearcache")))
		{
			LDAPUtils.getLDAPUserDtlsMap().clear();			
		}
		userMisionsMap.clear();
		@SuppressWarnings("unchecked")
		List<String> allDevices = LDAPUtils.getDevices();		
		List<String> allStaffDevices = LDAPUtils.getAllStaffDevices();
		List<String> allVehicleDevices = LDAPUtils.getAllVehicleDevices();
		List<String> allAirplaneDevices = LDAPUtils.getAllAirplaneDevices();
		
		ldapServiceMap.put(PARAM_ALLGROUPS, allDevices);	
		Logger.debug( " allDevices : "+allDevices.size() +" : allStaffDevices : "+
				allStaffDevices.size()+"allVehicleDevices : "+
				allVehicleDevices.size()+"allAirplaneDevices : "+allAirplaneDevices.size(), RestTrackingJob.class );
		
		if( allStaffDevices!=null && allStaffDevices.size()>0)
		{	String temp="";
			try
			{
				for(String device: allStaffDevices ){staff++;temp=device;
					if(!device.equals("4a2fb4c5b22c42c7" ) )LDAPUtils.setLDAPUserDtls( device , KEY_STAFF , token, stub );			
				}
			}catch(Exception e){ e.printStackTrace(); }
		}
		if( allVehicleDevices!=null && allVehicleDevices.size()>0)
		{	
			try
			{
				for(String device: allVehicleDevices ){vehicle++;
				LDAPUtils.setLDAPUserDtls( device , KEY_VEHICLE , token, stub );				
				}
			}
			catch(Exception e){ e.printStackTrace();  }
		}
		if( allAirplaneDevices!=null && allAirplaneDevices.size()>0)
		{	try
			{
				for(String device: allAirplaneDevices )
				{
					plane++;
					LDAPUtils.setLDAPUserDtls( device , KEY_AIRPLANE , token, stub );	
				}
			}catch(Exception e){ e.printStackTrace(); }			
		}
		Map<String, List<String>> allDomainsOnMissionList = LDAPUtils.getAllDomainsOnMissionMap();
		ldapServiceMap.put("allDomainsOnMissionList", allDomainsOnMissionList);
		
		Map<String, List<String>> allDevicesDomainsMap = LDAPUtils.getAllDevicesOnDomainMap();
		ldapServiceMap.put("allDevicesDomains", allDevicesDomainsMap);
		
		lastRefreshTime = CommonUtils.getUTCdatetimeAsString();
		if(allDevices!=null )Logger.info("### , LDAPCacheJob.class LDAP Devices count :"+ allDevices.size(), LDAPCacheJob.class );
		Logger.info("### , LDAPCacheJob.classStaff : "+staff+": Vehicle: "+vehicle+" : Plane :"+plane , LDAPCacheJob.class );
		Logger.info("### , LDAPCacheJob.class END LDAP service Job : "+lastRefreshTime, LDAPCacheJob.class );
		return true;
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
	public static String getLastRefreshTime() {
		return lastRefreshTime;
	}

	/**
	 * @return the deviceOffsetMap
	 */
	public static Map<String, String> getDeviceOffsetMap() {
		return deviceOffsetMap;
	}


	/**
	 * @param deviceOffsetMap the deviceOffsetMap to set
	 */
	public static void setDeviceOffsetMap(Map<String, String> deviceOffsetMap) {
		LDAPCacheJob.deviceOffsetMap = deviceOffsetMap;
	}

/**
	 * @return the placeMissionMap
	 */
	public static Map<String, DtoMission[]> getPlaceMissionMap() {
		return placeMissionMap;
	}

	
	
}
