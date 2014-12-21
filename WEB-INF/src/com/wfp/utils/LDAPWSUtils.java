/**
 * 
 */
package com.wfp.utils;

import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.rpc.ServiceException;

import lu.hitec.pss.soap.ds.out._15_x.AuthenticationException;
import lu.hitec.pss.soap.ds.out._15_x.AuthorizationException;
import lu.hitec.pss.soap.ds.out._15_x.CrudEnum;
import lu.hitec.pss.soap.ds.out._15_x.DirectoryServiceOutInterface_PortType;
import lu.hitec.pss.soap.ds.out._15_x.DirectoryServiceOutInterface_ServiceLocator;
import lu.hitec.pss.soap.ds.out._15_x.DtoMission;
import lu.hitec.pss.soap.ds.out._15_x.PssuFence;
import lu.hitec.pss.soap.ds.out._15_x.PssuPolygonalFence;
import lu.hitec.pss.soap.ds.out._15_x.PssuResourceType;
import lu.hitec.pss.soap.ds.out._15_x.PssuUnit;
import lu.hitec.pss.soap.ds.out._15_x.PssuUser;
import lu.hitec.pss.soap.ds.out._15_x.PssuVehicle;
import lu.hitec.pss.soap.ds.out._15_x.ResourceNotFoundException;
import lu.hitec.pss.soap.ds.out._15_x.ResourcesTypesEnum;
import lu.hitec.pss.soap.ds.out._15_x.UnitId;
import lu.hitec.pss.soap.ds.out._15_x.UnitType;
import lu.hitec.pss.soap.sensor.client._15_x.LocationRange;
import lu.hitec.pss.soap.sensor.client._15_x.LocationValue;
import lu.hitec.pss.soap.sensor.client._15_x.RangeLimit;
import lu.hitec.pss.soap.sensor.client._15_x.SensorSrvClient_PortType;
import lu.hitec.pss.soap.sensor.client._15_x.SensorSrvClient_ServiceLocator;
import lu.hitec.pss.soap.sensor.client._15_x.SubRangeType;

import com.enterprisehorizons.util.Logger;
import com.enterprisehorizons.util.StringUtils;
import com.wfp.jobs.EventServiceJob;
import com.wfp.jobs.RestTrackingJob;
import com.wfp.security.form.DeviceBean;
/**
 * @author kaleem.mohammed
 *
 */
public class LDAPWSUtils implements IEPICConstants {
	
	static DirectoryServiceOutInterface_PortType ldapStub;
	
	static SensorSrvClient_PortType sensorStub;
	
	public static DirectoryServiceOutInterface_PortType getLDAPStub()
	{
		if( ldapStub==null  )
			try {
				ldapStub= new DirectoryServiceOutInterface_ServiceLocator().getDirectoryServiceOutInterfacePort( );
				
			} catch (ServiceException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		return ldapStub;
	}
	
	public static SensorSrvClient_PortType getSensorStub()
	{
		if( sensorStub==null  )
			try {
				sensorStub= new SensorSrvClient_ServiceLocator().getSensorSrvClientPort( );
			} catch (ServiceException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		return sensorStub;
	}
	

	
	public static PssuUnit getUnitByDeviceId(String token , String deviceId ) throws AuthorizationException, AuthenticationException, RemoteException, IllegalArgumentException
	{
		return getLDAPStub().getUnitAssignedToDeviceForCrud(token, deviceId, CrudEnum.fromString("READ") );	
	}
	public static PssuUser getUserFromDevice(String token, String deviceId) throws AuthorizationException, AuthenticationException, RemoteException, IllegalArgumentException, ServiceException
	{	
		PssuUnit  unit = getUnitByDeviceId(token, deviceId  );	 
		PssuUser user = null;
		if( unit!=null) user= getLDAPStub().getUser(token, unit.getUid() ); 
		
		return user;
	}
	public static PssuVehicle getVehicleFromDevice(String token, String deviceId ) throws AuthorizationException, AuthenticationException, RemoteException, IllegalArgumentException, ServiceException
	{	
		PssuUnit  unit = getUnitByDeviceId(token, deviceId  );	 
		PssuVehicle vehicle = null;
		if( unit!=null) vehicle= getLDAPStub().getVehicle(token,  unit.getUid() ); 
		
		return vehicle;
	}
	//unitType - USER, VEHICLE
	public static DtoMission[] getMissionsForPlace(String token, String placeId,   UnitType unitType) throws AuthorizationException, AuthenticationException, ResourceNotFoundException, RemoteException, IllegalArgumentException
	{
		 return getLDAPStub().getMissionsAssignedToUnitForCrud(token, new UnitId( placeId, unitType )
				, CrudEnum.fromString("READ") );
	}
	public static DtoMission[] getMissionsForDevice(String token, String deviceId,   UnitType unitType) throws AuthorizationException, AuthenticationException, ResourceNotFoundException, RemoteException, IllegalArgumentException
	{
		 return getLDAPStub().getMissionsAssignedToUnitForCrud(token, 
				new UnitId( getUnitByDeviceId(token, deviceId).getUid(), unitType ), CrudEnum.fromString("READ") );
	}
	public static DtoMission[] getMissionsForUser(String token, String uid,   UnitType unitType) throws AuthorizationException, AuthenticationException, ResourceNotFoundException, RemoteException, IllegalArgumentException
	{
		 return getLDAPStub().getMissionsAssignedToUnitForCrud(token, new UnitId( uid, UnitType.fromValue(UnitType._USER)), CrudEnum.fromString("READ") );
	}
	public static void getUserByUID(String token, String uid ,  DeviceBean deviceBean ) throws AuthorizationException, AuthenticationException, RemoteException, IllegalArgumentException
	{
		PssuUser user =  getLDAPStub().getUser(token, uid ) ;
		deviceBean.setPersonalTitle( user.getPersonalTitle() );
		deviceBean.setOrganization( user.getOrganizationalUnitName() );
		deviceBean.setCn( user.getFirstname() );
		deviceBean.setSn( user.getLastname() );
		
	}
	public static String getDeviceByUID( String token, String unitId, String unitType ) throws AuthorizationException, AuthenticationException, ResourceNotFoundException, RemoteException, IllegalArgumentException
	{
			String[] deviceId = getLDAPStub().getDeviceIdsAssignedToUnitForCrud(token, new UnitId(  unitId, UnitType.fromString(unitType  ) ),
					CrudEnum.fromValue( CrudEnum._READ ) );			
			return deviceId!=null?deviceId[0]:null;
	}
	public static String[] getUserProfilesByUid(  String uid  ) throws AuthorizationException, AuthenticationException, RemoteException, IllegalArgumentException 
	{	
			return getLDAPStub().getProfileIdsAssignedToUserForCrud( EventServiceUtils.getLDAPToken(), uid, CrudEnum.fromValue( CrudEnum._READ ) );	
	}
	public static DtoMission[] getMissionAssignedToPlace( String token, String placeId  ) throws AuthorizationException, AuthenticationException, RemoteException, IllegalArgumentException 
	{	if( token==null ) token = EventServiceUtils.getLDAPToken();
			return getLDAPStub().getMissionsAssignedToUnitForCrud( token, new UnitId(  placeId, UnitType.fromString(UnitType._PLACE )  ), CrudEnum.fromValue( CrudEnum._READ ) );	
	}
	public static boolean validatePlaceByUserMissions(String placeId, List<String> userMissionList)
	{
		Logger.info("Validating Places ["+placeId+"] by user missionsList ["+userMissionList+"]", LDAPWSUtils.class);
		boolean isValid = false;
		try
		{
			if(userMissionList != null&&userMissionList.size()>0 )
			{
				DtoMission[] missionArray = getMissionAssignedToPlace(null, placeId);
				if(missionArray != null && missionArray.length > 0)
				{
					for( DtoMission dto : missionArray )
					{
						if( userMissionList.contains( dto.getUniqueId() )  ) return true;
					}
				}
			}
		}catch(Exception e) { Logger.error(" Exception in validatePlaceByUserMissions()", LDAPWSUtils.class ); }
		
		return isValid;
	}
	
	public static List<String>  getUserPlacesList(  List<String> userMissionList )
	{
		List<String> userPlacesList =null;
		try
		{	
			if( userMissionList!=null&& userMissionList.size()>0 )
			{	String token = EventServiceUtils.getLDAPToken();
				userPlacesList = new ArrayList<String>();
				for(String missionId: userMissionList )
				{
					PssuUnit[] pssunit = getLDAPStub().getUnitsAssignedToMissionForCrud( token, missionId, UnitType.fromValue(UnitType._PLACE),
							CrudEnum.fromValue( CrudEnum._READ ) );
					if(pssunit!=null&&pssunit.length>0)
					{
						for(PssuUnit unit: pssunit)
						{
							userPlacesList.add( unit.getUid() );
						}
					}
				}			
			}
		}catch(Exception e){}
		return userPlacesList;
		
	}
	public static DtoMission[] getAllMissions( String token ) throws AuthorizationException, AuthenticationException, RemoteException, IllegalArgumentException
	{
		return getLDAPStub().getMissionsForCrud(token, CrudEnum.fromValue( CrudEnum._READ ) );
		
	}
	public static MissionFenceWrapper getAllFencesWrapper( String token ) throws AuthorizationException, AuthenticationException, RemoteException, IllegalArgumentException
	{
		MissionFenceWrapper wrapper = new MissionFenceWrapper();
		DtoMission[] missions = getAllMissions(token);
		if(missions!=null)
		{
			for( DtoMission mission: missions )
			{
				PssuFence[]  fences =getLDAPStub().getFencesAssignedToMissionForCrud(token, mission.getUniqueId(),  CrudEnum.fromValue( CrudEnum._READ ) );
				if( fences!=null )
					{
						wrapper.setMission( mission.getUniqueId() );
						wrapper.setFences(fences);
					}
				
			}
		}
		return wrapper;
		
	}
	public static List<PssuFence> getAllFences( String token ){
		List<PssuFence> wrapper = new ArrayList<PssuFence>();
		try{
		DtoMission[] missions = getAllMissions(token);
		if(missions!=null)
		{
			for( DtoMission mission: missions )
			{
				PssuFence[]  fences =getLDAPStub().getFencesAssignedToMissionForCrud(token, mission.getUniqueId(),  CrudEnum.fromValue( CrudEnum._READ ) );
				if( fences!=null )
					{
						for(PssuFence f : fences )
						{
							wrapper.add(f  );
						}
					}
				
			}
		}
		}catch(Exception e){ e.printStackTrace() ; }
		return wrapper;
		
	}
	public static List<PssuPolygonalFence> getAllPolygonFences( String token ){
		List<PssuPolygonalFence> wrapper = new ArrayList<PssuPolygonalFence>();
		try{		
				PssuPolygonalFence[]  fences =getLDAPStub().getPolygonalFencesForCrud( token,  CrudEnum.fromValue( CrudEnum._READ ) );
				if(fences!=null && fences.length >0 ){
					for( PssuPolygonalFence p : fences )
					{
						wrapper.add( p );
					}
				}				
		}catch(Exception e){ e.printStackTrace() ; }
		return wrapper;
		
	}
	public static List<PssuPolygonalFence> getAllFencesByMission( String token, List<String> missions){
		List<PssuPolygonalFence> wrapper = new ArrayList<PssuPolygonalFence>();
		try{
			List<PssuPolygonalFence> polyList = getAllPolygonFences(token );
		if(missions!=null)
		{
			for( String mission: missions )
			{
				PssuFence[]  fences =getLDAPStub().getFencesAssignedToMissionForCrud(token, mission,  CrudEnum.fromValue( CrudEnum._READ ) );
				if( fences!=null )
					{
						for(PssuFence f : fences )
						{
							if( polyList!=null && polyList.size() > 0 )
							{
								for( PssuPolygonalFence p : polyList )
								{
									if( p.getUid().equalsIgnoreCase( f.getUid()))
									{
										wrapper.add( p   );
									}
								}
							}
							
						}
					}
				
			}
		}
		}catch(Exception e){ e.printStackTrace() ; }
		return wrapper;
		
	}
	public static String[]  getUnitIdsByMission(String token,String missionId) throws AuthorizationException, AuthenticationException, ResourceNotFoundException, RemoteException, IllegalArgumentException
	{
		return  getLDAPStub().getUnitIdsAssignedToMissionForCrud(token, missionId, UnitType.fromValue(UnitType._PLACE ), CrudEnum.fromValue( CrudEnum._READ ) );
		
	}
	public static Map<String, String> getAllMissionsMap(String token )throws AuthorizationException, AuthenticationException, ResourceNotFoundException, RemoteException, IllegalArgumentException
	{
		Map<String, String> map = new HashMap<String, String>();
		DtoMission[] missions = getLDAPStub().getMissionsForCrud(token,  CrudEnum.READ ); 
		if( missions!=null && missions.length>0 )
		{
			for( DtoMission mission: missions )
			{
				map.put( mission.getUniqueId(), mission.getDescription() );
			}
		}		
		return map;
	}
	public static String getMissionNameById(String token,String missionId )throws AuthorizationException, AuthenticationException, ResourceNotFoundException, RemoteException, IllegalArgumentException
	{
		DtoMission mission = getLDAPStub().getMission(token, missionId ); 
		if( mission!=null && mission.getDescription()!="" )return mission.getDescription();
		return null;
	}
	public static String getCountryNameById(String token,String resourceTypeId )throws AuthorizationException, AuthenticationException, ResourceNotFoundException, RemoteException, IllegalArgumentException
	{
		PssuResourceType resourceType = getLDAPStub().getResourceType(token, ResourcesTypesEnum.COUNTRY_TYPES , resourceTypeId); 
		if( resourceType!=null && resourceType.getDescription()!="" )return resourceType.getDescription();
		return null;
	}
	public static String getOrganizationById(String token,String resourceTypeId )throws AuthorizationException, AuthenticationException, ResourceNotFoundException, RemoteException, IllegalArgumentException
	{
		PssuResourceType resourceType = getLDAPStub().getResourceType(token, ResourcesTypesEnum.ORGANIZATION_TYPES , resourceTypeId); 
		if( resourceType!=null && resourceType.getDescription()!="" )return resourceType.getDescription();
		return null;
	}
	public static Map<String,String> getCountriesMap(String token )throws AuthorizationException, AuthenticationException, ResourceNotFoundException, RemoteException, IllegalArgumentException
	{
		Map<String, String> map = null;
		
		PssuResourceType[] resourceTypes = getLDAPStub().getResourceTypesForCrud(token, ResourcesTypesEnum.COUNTRY_TYPES, CrudEnum.READ );
		if( resourceTypes!=null && resourceTypes.length>0 )
		{
			map = new HashMap<String, String>();
			for( PssuResourceType country : resourceTypes )
			{
				map.put(country.getUid(), country.getDescription() );
			}
		}
		return map;
	}
	public static void main(String a[])
	{		
		
		 try {String token = EventServiceUtils.getLDAPToken() ;
			//System.out.println( getMissionUnitsMap(token ) );
		 List<PssuFence> fences = getAllFences(token);
		 if(fences!=null && fences.size() >0 )
		 {
			 for( PssuFence f : fences )
			 {
				 System.out.println( f.getUid() + " : "+f.getDescription() +" :" + f.getSeverity() );
			 }
		 }
			
		}  catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	public static Map<DtoMission, List<String>> getMissionUnitsMap( String token) throws AuthorizationException, AuthenticationException, RemoteException, IllegalArgumentException
	{
		Map<DtoMission, List<String>> missionUnitsMap = new HashMap<DtoMission, List<String>>();
		
		DtoMission[] allMissions = getAllMissions( token );
		
		//System.out.println(" allMissions length: "+allMissions.length );
		if( allMissions!=null && allMissions.length>0 )
		{
			for(DtoMission m: allMissions)
			{ 
				//System.out.println(" m: "+m.getUniqueId() + CommonUtils.getUTCdatetimeAsString() );
				String[] unitIds = getUnitIdsByMission(token, m.getUniqueId() );	
				//System.out.println(m.getCn()+":  unitIds : "+unitIds );
				if( unitIds!=null &&  unitIds.length>0 )
				{
					List<String> unitsList = new ArrayList<String>();
					for(String unit : unitIds )
					{
						unitsList.add( unit );
					}
					missionUnitsMap.put( m , unitsList );
				}
			}			
		}				
		return missionUnitsMap;
		
	}
	public static void setMissionToPlaces( Map placesMap )
	{
		Logger.debug( " ## START LDAPWSUtils.setMissionToPlaces :"+CommonUtils.getUTCdatetimeAsString(), LDAPWSUtils.class );
		// TODO Auto-generated method stub	
		String token = EventServiceUtils.getLDAPToken();
	
		Map<DtoMission, List<String>> missionUnitsMap=null;
		try {
			missionUnitsMap = getMissionUnitsMap(  token);
		} catch (AuthorizationException e1) {
			// TODO Auto-generated catch block
			System.out.println( e1.getMessage() );
		} catch (AuthenticationException e1) {
			// TODO Auto-generated catch block
			System.out.println( e1.getMessage() );
		} catch (RemoteException e1) {
			// TODO Auto-generated catch block
			System.out.println( e1.getMessage() );
		} catch (IllegalArgumentException e1) {
			// TODO Auto-generated catch block
			System.out.println( e1.getMessage() );
		}		
		for (Object entry : placesMap.entrySet()) 
		{
			Map.Entry<String, Map<String,String>>	e = (Map.Entry<String, Map<String,String>>)entry;
			if( missionUnitsMap!=null )
			{
				for (Object entry2 : missionUnitsMap.entrySet()) 
				{ 
					Map.Entry<DtoMission, List<String>>	e2 = (Map.Entry<DtoMission, List<String>>)entry2;					
					if( e2.getValue().contains( e.getKey() ) )
					{
						if( e.getValue().get("mission" )==null )
							e.getValue().put("mission", e2.getKey().getUniqueId()  );//TODO KAleem
						else e.getValue().put("mission",e.getValue().get("mission" )+"|"+ e2.getKey().getUniqueId() );//TODO
						//Logger.info( "inner :" +e.getKey() +": "+e2.getKey(), LDAPWSUtils.class );
					}
				}				
			}
		}
		Logger.debug( " ## END LDAPWSUtils.setMissionToPlaces :"+CommonUtils.getUTCdatetimeAsString(), LDAPWSUtils.class );
		
	}
	public static LocationValue getUnitLastLocation( String unitId, String token, String missionId, 
			lu.hitec.pss.soap.sensor.client._15_x.UnitType unitType  ) throws RemoteException
	{  // System.out.println(" 320 : unitId "+unitId+" unitType " + unitType );
		lu.hitec.pss.soap.sensor.client._15_x.UnitId unitIdObj = new lu.hitec.pss.soap.sensor.client._15_x.UnitId(unitId, unitType );
		//System.out.println(" unitIdObj "+unitIdObj + " mission :" + missionId );  
		return getSensorStub().getUnitLastLocation(token, unitIdObj, missionId  );
	}
	public static PssuFence[] getAllMiddlewareFencesForMission(String token, String missionId)
	{
		PssuFence[] fences =null;
		try {
			 fences =ldapStub.getFencesAssignedToMissionForCrud(token, missionId, CrudEnum.fromValue( CrudEnum._READ ));
		} catch (AuthorizationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (AuthenticationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ResourceNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (RemoteException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return fences;
	}
	public static List<DeviceBean> getUnitHistorical( String collectingDeviceId  )
	{
		String token = EventServiceUtils.getLDAPToken();
		 List<String> mList = LDAPUtils.getLDAPUserDtlsMap().get( collectingDeviceId ).getAuthorizedGroupsList();	
		 String missionId ="AE";
		 if(mList!=null&& mList.size()>0 )missionId= mList.get( 0 );
		 
		 lu.hitec.pss.soap.sensor.client._15_x.UnitId unitId = new lu.hitec.pss.soap.sensor.client._15_x.UnitId();
		 try {
			PssuUnit userUnit = getUnitByDeviceId(token, collectingDeviceId  );
			unitId.setUid( userUnit.getUid() );
		} catch (AuthorizationException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (AuthenticationException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (RemoteException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (IllegalArgumentException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		 
		 unitId.setUnitType(  lu.hitec.pss.soap.sensor.client._15_x.UnitType.fromString( "USER" )  );
		 
		List<DeviceBean> allStaffDevices = new ArrayList<DeviceBean>();
		RangeLimit rl = SensorServiceUtils.getRangeLimit( getStartDate().getTime(), getEndDate().getTime(), SubRangeType.CONTINUOUS_LATEST	, 10000 );
		try {
			LocationRange lr = getSensorStub().getUnitLocationRangeForDevice( token,
					unitId, missionId , rl, collectingDeviceId );
			SensorServiceUtils.setAllEmergencyHotspots(  token, unitId.getUid() ,
					lr, allStaffDevices , UnitType._USER );
		} catch (RemoteException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return allStaffDevices;
	}
	static Calendar getEndDate(){
		Calendar endDate = Calendar.getInstance();
		
		return endDate;
	}
	
	static Calendar getStartDate(){
		Calendar startDate = Calendar.getInstance();
		startDate.add(Calendar.MONTH, -3 );
		startDate.set(Calendar.MINUTE, 0);
		startDate.set(Calendar.SECOND, 0);
		startDate.set(Calendar.HOUR, 0);
		return startDate;
	}
		
}

