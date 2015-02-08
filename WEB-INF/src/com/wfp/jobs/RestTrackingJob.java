package com.wfp.jobs;

import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lu.hitec.pss.soap.sensor.client._15_x.LocationValue;
import lu.hitec.pss.soap.sensor.client._15_x.RangeLimit;
import lu.hitec.pss.soap.sensor.client._15_x.SubRangeType;
import lu.hitec.pss.soap.sensor.client._15_x.UnitId;

import org.jdom.Element;

import com.enterprisehorizons.magma.ecosystem.model.Cache;
import com.enterprisehorizons.util.Logger;
import com.enterprisehorizons.util.StringUtils;
import com.enterprisehorizons.util.XMLUtils;
import com.primavera.a.c.a.u;
import com.primavera.integration.client.bo.enm.UnitType;
import com.spacetimeinsight.config.scheduler.Parameter;
import com.spacetimeinsight.config.scheduler.Parameters;
import com.spacetimeinsight.magma.job.CustomJobTask;

import com.wfp.security.form.DeviceBean;
import com.wfp.security.form.LDAPUserBean;
import com.wfp.utils.CommonUtils;
import com.wfp.utils.EventServiceUtils;
import com.wfp.utils.IEPICConstants;
import com.wfp.utils.LDAPUtils;
import com.wfp.utils.LDAPWSUtils;
import com.wfp.utils.SensorServiceUtils;
import com.wfp.utils.SoapUtils;
import com.wfp.utils.ValidateCertificateCall;
/**
 * 
 * @author sti-user
 *
 */
public class RestTrackingJob implements CustomJobTask,IEPICConstants 
{
	
	private static RestTrackingJob instance = null;
	@SuppressWarnings("unchecked")
	private static Map<String, List> restServiceMap = new HashMap<String, List>();
	private static String lastRefreshTime = null;
	private static Map<String, String> paramsMap = new HashMap();
	private static Map<String, String> deviceOffset = new HashMap();
	public RestTrackingJob () {}
	
	/* (non-Javadoc)
	 * @see com.spacetimeinsight.magma.job.CustomJobTask#executeCustomTask(com.spacetimeinsight.config.scheduler.Parameters)
	 */
	public boolean executeCustomTask(Parameters parameters) 
	{
		System.out.println("####### REST START - TimeStamp: "+ CommonUtils.getUTCdatetimeAsString());		
		//if( LDAPUtils.getOrgMap()==null ) LDAPUtils.getAllOrganizations();
		Parameter[] params = parameters.getParameter();
		for (int i=0; i< params.length ; i++) paramsMap.put(params[i].getName(), params[i].getValue());				
		getRestTrackingDtls();
		lastRefreshTime = CommonUtils.getUTCdatetimeAsString();		
		System.out.println("####### REST END - TimeStamp: "+ lastRefreshTime);
		return true;
	}

	/**
	 * 
	 */
	@SuppressWarnings("unchecked")
	private void getRestTrackingDtls()
	{	
		List<DeviceBean> staffList =new ArrayList<DeviceBean>();;
		List<DeviceBean> vehicleList =new ArrayList<DeviceBean>();
		List<DeviceBean> terminalList =new ArrayList<DeviceBean>();
		List<DeviceBean> airplaneList =new ArrayList<DeviceBean>();
		//Getting the middleware token.
		String token = EventServiceUtils.getLDAPToken();
		int devices=0,staff=0,vehicle=0,airplane=0,nosaco=0;
		
		RangeLimit rl = SensorServiceUtils.getRangeLimit( SoapUtils.getStartDate().getTime(), SoapUtils.getEndDate().getTime() ,
				SubRangeType.CONTINUOUS_LATEST, 30000 );
		
		//Getting all the ldap devices from the Cache.
		List<String> ldapDeviceList =( List<String>)LDAPCacheJob.getLDAPCacheData(PARAM_ALLGROUPS);	
		Logger.info( " ldapDeviceList : "+ldapDeviceList.size() , RestTrackingJob.class );
		
		Map<String, LDAPUserBean> ldapUserMap = LDAPUtils.getLDAPUserDtlsMap();
		
		Logger.info( " ldapUserMap : "+ldapUserMap.size() , RestTrackingJob.class );
		
		if( ldapUserMap!=null && ldapUserMap.size() >0 )
		{
			for (Map.Entry<String, LDAPUserBean> entry : ldapUserMap.entrySet()) 
			{	devices++;
				
				LDAPUserBean userBean = entry.getValue();
				List<String> deviceMissionList = LDAPUtils.getLDAPUserDtlsMap().get( userBean.getDeviceId() ).getAuthorizedGroupsList();
				if( deviceMissionList!=null&& userBean!=null && userBean.getUnit().equals( KEY_STAFF )&&
						userBean.getDeviceId()!=null&& !userBean.getDeviceId().isEmpty())
				{			
					staff++;
					addLocalization( rl, userBean, staffList,KEY_STAFF , token,
							deviceMissionList.size()>0?deviceMissionList.get(0):"AE" ,lu.hitec.pss.soap.sensor.client._15_x.UnitType.USER );				
				}
				else if( userBean!=null && userBean.getUnit().equals( KEY_NOSACO_TERMINALS )&& userBean.getDeviceId()!=null&& !userBean.getDeviceId().isEmpty())
				{
					nosaco++;
					//Logger.info(userBean.getCn()+" : ### userBean.getDeviceId() "+ userBean.getDeviceId() +" deviceMissionList :  "+deviceMissionList , RestTrackingJob.class );
					
					addLocalization(rl, userBean, terminalList ,KEY_NOSACO_TERMINALS , token, 
							deviceMissionList.size()>0?deviceMissionList.get(0):"AE", lu.hitec.pss.soap.sensor.client._15_x.UnitType.VEHICLE );
				}
				else if( userBean!=null && userBean.getUnit().equals( KEY_VEHICLE )&& userBean.getDeviceId()!=null&& !userBean.getDeviceId().isEmpty())
				{	
					vehicle++;
						addLocalization( rl, userBean, vehicleList ,KEY_VEHICLE , token, 
								deviceMissionList.size()>0?deviceMissionList.get(0):"AE", lu.hitec.pss.soap.sensor.client._15_x.UnitType.VEHICLE );
					
				}
				
				else if( userBean!=null && userBean.getUnit().equals( KEY_AIRPLANE )&& userBean.getDeviceId()!=null&& !userBean.getDeviceId().isEmpty())
				{	airplane++;
					addLocalization(rl,  userBean, airplaneList,KEY_AIRPLANE , token, 
							deviceMissionList.size()>0?deviceMissionList.get(0):"AE", lu.hitec.pss.soap.sensor.client._15_x.UnitType.VEHICLE );
				}
			}			
		}
		
		
		
		//Retreiving the parameter value from JOB Parameters
		String getAllDevices = paramsMap.get("getAllVehicleDevices") ;	
		
		//TODO clearing cache
		getRestServiceMapCache().clear();
		
		//Storing Staff, Vehicle and Airplane list to cache.
		//Removing secondary devices if GETALLDEVICES property is set FALSE in job config.
		if(getAllDevices!=null&&getAllDevices.equals("false"))
		{
			Logger.debug("Before putting Vehicles to Cache : vehicleList : "+vehicleList.size() ,RestTrackingJob.class );
			getRestServiceMapCache().put(KEY_VEHICLE,  removeSecondaryDevices( vehicleList ) );	
			Logger.debug("After putting Vehicles to Cache : " ,RestTrackingJob.class );
			
		}
					
		else
		{	Logger.debug("Before putting Vehicles to Cache : vehicleList : "+vehicleList.size() ,RestTrackingJob.class );
			getRestServiceMapCache().put(KEY_VEHICLE, vehicleList);
			Logger.debug("After putting Vehicles to Cache : " ,RestTrackingJob.class );
			 
		}
		Logger.debug("Before putting Staff to Cache :staffList : "+staffList.size() ,RestTrackingJob.class );	
		getRestServiceMapCache().put(KEY_STAFF, staffList);
		
		getRestServiceMapCache().put(KEY_NOSACO_TERMINALS, terminalList );
		
		Logger.debug("Before putting Airplanes to Cache : airplaneList :"+airplaneList.size() ,RestTrackingJob.class );
		getRestServiceMapCache().put(KEY_AIRPLANE, airplaneList);	
		
		if( ! (LDAPCacheJob.getDeviceOffsetMap().size() >0 ) )		
				LDAPCacheJob.setDeviceOffsetMap( deviceOffset  );
		
		Logger.info( " Count :Devices "+devices+" : Staff :"+staff+": Vehicles :"+vehicle+" :Airplanes :"+airplane +" terminals :"+terminalList.size()+" : nosaco :"+nosaco, RestTrackingJob.class );
		
	}
	
	
	private void addLocalization( RangeLimit rl ,LDAPUserBean userBean, List<DeviceBean> indigoList, String type, String token ,String missionId,
			lu.hitec.pss.soap.sensor.client._15_x.UnitType unitType )
	{
		
		try 
		{
			DeviceBean is = new DeviceBean(); 
			String id = type.equals(KEY_STAFF)?userBean.getUid():userBean.getCn();
			LDAPUtils.populateDeviceBean( userBean , is ); 
			//TODO Kaleem7
			//LocationValue lv = LDAPWSUtils.getUnitLastLocation(id , token, missionId, unitType);
			LocationValue lv = LDAPWSUtils.getSensorStub().getUnitLastLocationForDevice(token, new UnitId( id, unitType) , missionId, 
					userBean.getDeviceId() );
			//if( userBean.getCn().contains("nreg")|| userBean.getCn().contains("nrap"))
				//Logger.info(" lv :"+lv +" : missionId :"+missionId +" : deviceId :"+userBean.getDeviceId() , RestTrackingJob.class );
			if( lv!=null )
			{
				is.setLatitude( ""+lv.getLat() );
				is.setLongitude( lv.getLng()+"" );
				is.setTime( CommonUtils.formatDate( lv.getTime().getTime() )  );
				is.setName( userBean.getDeviceId() );
				String offset=null;	
				String p = SoapUtils.getAllWaypointsCount(rl,  id , type, missionId, 30000, is.getName(), token );
				is.setTotalWaypoints( "1" );
				is.setNoOfDays( "1" );
				is.setFirstReported( is.getTime() );				
				if(p!=null&& !p.isEmpty())
				{
					if(p.contains("DELIM")) 
					{
						String s[] =p.split("DELIM");
						is.setTotalWaypoints( s[1] );
						is.setNoOfDays(s[2] );
						String d = s[2];
						if(d=="0") is.setNoOfDays("1" );
						
						is.setFirstReported( s[0] );
					}
				}				
				//System.out.println( missionId + " : "+ userBean.getDeviceId()+" "+ is.getTime() );
				if( LDAPCacheJob.getDeviceOffsetMap().size() >0 && LDAPCacheJob.getDeviceOffsetMap().containsKey(is.getName() ) )
				{
					offset= LDAPCacheJob.getDeviceOffsetMap().get( is.getName() ); //System.out.println("time : "+ is.getTime()  );
					is.setDeviceLocalTime( CommonUtils.getLocalTime(offset ,is.getTime(),NEW_PORTAL_DATE_FORMAT) ) ;
				}
				else
				{   
					if(is.getLatitude()!=null &&is.getLongitude()!=null)
					{	//calculating the device offset.
						offset = CommonUtils.getOffsetByLatLong(is.getLatitude(),is.getLongitude() );
						is.setDeviceLocalTime( CommonUtils.getLocalTime( offset,is.getTime(),NEW_PORTAL_DATE_FORMAT) );
					}				
				}
				if(is.getCn()!=null&&!is.getCn().isEmpty() && is.getName()!="" ) indigoList.add(is);
				//Storing the offset for each device as Map.
				if( is.getName()!=null )deviceOffset.put(is.getName(), offset );
			}//else System.out.println(" deviceID : "+is.getName() +" : lv :"+lv  +": type : "+ type +" : "+is.getCn());
			
			
		} catch (RemoteException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/**
	 * @param vehicleList
	 * @return
	 */
	public List<DeviceBean> removeSecondaryDevices(List<DeviceBean> vehicleList)
	{Logger.info(" START removeSecondaryDevices :", RestTrackingJob.class );
		List<DeviceBean> list = null;
		if( vehicleList!=null&&vehicleList.size()>0)
		{
			 list = new ArrayList<DeviceBean>();
			 int ok=0;			 
			 for( DeviceBean bean: vehicleList )
			 {
				 ok=0;
				 for( DeviceBean bean2:vehicleList )
				 {
					 if( bean.getName()!= bean2.getName() && bean.getCn().equals( bean2.getCn() ))
					 {
						 	ok=1;
							System.out.println(" ** Found : "+bean.getCn() +" has multiple devices ****");
							System.out.println(bean.getTime() + ":****: " +bean2.getTime() );
							if( CommonUtils.parseDate(bean.getTime(), EPIC_DATE_FORMAT).after(CommonUtils.parseDate(bean2.getTime() ) ) )
								list.add( bean );
							else  list.add( bean2 );
							break;	 
					 }
				 }
				 if(ok==0)list.add( bean );
			 }
			
		} Logger.info(" END removeSecondaryDevices : list : size : "+list.size(), RestTrackingJob.class );
		return list;
	}
	public static String getLastRefreshTime() {
		return lastRefreshTime;
	}
	
	private static synchronized void initializeInstance() {
		if (instance == null) {
			instance = new RestTrackingJob();
		}
	}
	public static RestTrackingJob getInstance() 
	{
		if (instance == null) {
			initializeInstance();
		}
		return instance;
	}	
	
	public  Map<String, List> getRestServiceMapCache() {
		return restServiceMap;
	}
	
	public  List<DeviceBean> getRestServiceList(String key){
		return getRestServiceMapCache().get(key);
	}
	
}
