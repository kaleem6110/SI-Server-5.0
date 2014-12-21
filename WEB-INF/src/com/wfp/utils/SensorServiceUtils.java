package com.wfp.utils;

import java.net.MalformedURLException;
import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.rpc.ServiceException;

import lu.hitec.pss.soap.ds.out._15_x.AuthenticationException;
import lu.hitec.pss.soap.ds.out._15_x.AuthorizationException;
import lu.hitec.pss.soap.ds.out._15_x.DirectoryServiceOutInterface_PortType;
import lu.hitec.pss.soap.ds.out._15_x.ResourceNotFoundException;
import lu.hitec.pss.soap.sensor.client._15_x.DeviceLocationsForMission;
import lu.hitec.pss.soap.sensor.client._15_x.DeviceMission;
import lu.hitec.pss.soap.sensor.client._15_x.DeviceMissionWrapper;
import lu.hitec.pss.soap.sensor.client._15_x.DeviceTypeMission;
import lu.hitec.pss.soap.sensor.client._15_x.LocationRange;
import lu.hitec.pss.soap.sensor.client._15_x.LocationValue;
import lu.hitec.pss.soap.sensor.client._15_x.RangeLimit;
import lu.hitec.pss.soap.sensor.client._15_x.SensorSrvClientPortBindingStub;
import lu.hitec.pss.soap.sensor.client._15_x.SensorSrvClient_Service;
import lu.hitec.pss.soap.sensor.client._15_x.SensorSrvClient_ServiceLocator;
import lu.hitec.pss.soap.sensor.client._15_x.SubRangeType;
import lu.hitec.pss.soap.sensor.client._15_x.TimeRange;
import lu.hitec.pss.soap.sensor.client._15_x.UnitId;
import lu.hitec.pss.soap.sensor.client._15_x.UnitReport;
import lu.hitec.pss.soap.sensor.client._15_x.UnitType;
import lu.hitec.pss.soap.sensor.client._15_x.UnitsReports;
import lu.hitec.pss.soap.sensor.client._15_x.DeviceStatus;

import org.apache.axis.AxisFault;

import com.enterprisehorizons.constants.CommonConstants;
import com.enterprisehorizons.exception.EHRuntimeException;
import com.enterprisehorizons.util.Logger;
import com.wfp.security.form.DeviceBean;



public class SensorServiceUtils implements IEPICConstants {

	public static Map<String,String> userDeviceMap = new HashMap<String, String>();
	@SuppressWarnings("unchecked")
	public static Map<String, List<DeviceBean>> getEmergencySpotDtls(
			Date startDate, Date endDate, int lpCount, 	Map<String, String> paramsMap ) 
	{
		System.out.println(CommonUtils.getUTCdatetimeAsString()+ ": START : SensorServiceUtils.getEmergencySpotDtls  " );
		SensorSrvClientPortBindingStub stub = null;
		Map<String, List<DeviceBean>> map = new HashMap<String, List<DeviceBean>>();
		try 
		{
			stub = getServiceLocatorStub();
			List<DeviceBean> allStaffDevices = new ArrayList<DeviceBean>();
			List<DeviceBean> allVehicleDevices = new ArrayList<DeviceBean>();
			List<DeviceBean> allAirplaneDevices = new ArrayList<DeviceBean>();
			String token = EventServiceUtils.getLDAPToken();System.out.println("61 token :"+token );
			List<String> allMissions = LDAPUtils.getAllMissions();
			System.out.println(" allMissions : "+ allMissions );
			//LDAPUtils.getAllDeviceInDomain();
		
			if (allMissions != null) 
			{
				map = new HashMap<String, List<DeviceBean>>();
				for (String mission : allMissions)
				{	System.out.println(" mission : "+ mission );
					UnitsReports unitReports= stub.getAllUnitsReports( token , mission );	
					
					//System.out.println(" unitReports : "+ unitReports );
					if(unitReports!=null)
					{
						UnitReport[] userReports = unitReports.getUsersReports();
						UnitReport[] vehicleReports = unitReports.getVehiclesReports();					
						SubRangeType subRangetype = null;
						if (paramsMap.get("subrangetype") != null) 
						{
							subRangetype = SubRangeType.fromString( paramsMap.get("subrangetype") );
						}		
						RangeLimit rl = getRangeLimit(startDate, endDate,
								subRangetype == null ? SubRangeType.CONTINUOUS_LATEST
										: subRangetype, lpCount);	
						if(userReports!=null)
						{
							for(UnitReport userReport: userReports)						
							{  
								 String deviceId = LDAPWSUtils.getDeviceByUID(token, userReport.getUnitId().getUid(), UnitType._USER );
								 if( deviceId!=null && ! deviceId.trim().isEmpty())
								 {
									 LocationRange locationRange = stub.getUnitLocationRangeForDevice(token, 
												new UnitId( userReport.getUnitId().getUid(), UnitType.fromValue( UnitType._USER) ),mission, rl, deviceId );						
										setAllEmergencyHotspots(  token, userReport.getUnitId().getUid() ,
												locationRange, allStaffDevices , UnitType._USER );
								 }
								
								
								
							}
						}
						if(vehicleReports!=null)
						{
							for(UnitReport vehicleReport: vehicleReports)
							{
								UnitType t = null;
								UnitId unitId = new UnitId(   );
								unitId.setUid( vehicleReport.getUnitId().getUid() );
								LocationRange locationRange =  null;
								String deviceId = LDAPWSUtils.getDeviceByUID(token, vehicleReport.getUnitId().getUid(), UnitType._VEHICLE );
								 if( deviceId!=null && ! deviceId.trim().isEmpty())
								 {
									 locationRange = stub.getUnitLocationRangeForDevice(token, 
												new UnitId( vehicleReport.getUnitId().getUid(), UnitType.fromValue( UnitType._VEHICLE) ),mission, rl, deviceId );	
								 }
								
										
										//new UnitId( vehicleReport.getUnitId(), UnitType.fromValue( UnitType._VEHICLE ) ), mission, rl );	
								 if(locationRange!=null && locationRange.getVal()!=null )
								 {
										if(vehicleReport.getUnitId().getUid().length()==6)
											 setAllEmergencyHotspots(  token, vehicleReport.getUnitId().getUid() , 
													 locationRange, allAirplaneDevices , UnitType._VEHICLE );
										else setAllEmergencyHotspots(   token, vehicleReport.getUnitId().getUid() ,
												locationRange, allVehicleDevices,  UnitType._VEHICLE );
								 }
							
							}	
						}
										
					}
					
				}				
			}
			map.put(LAYER_STAFF, allStaffDevices);
			map.put(LAYER_VEHICLE, allVehicleDevices);
			map.put(LAYER_AIRPLANE, allAirplaneDevices);

		} catch (Exception e) {
			Logger.error(" 122 :Error occured while retrieving devices data points ["
					+ e.getMessage() + "]", SensorServiceUtils.class);
			e.printStackTrace();
			throw new EHRuntimeException(
					"Error occured while retrieving device data points ["
							+ e.getMessage() + "]");
		} finally {
			stub = null;
		}
		System.out.println(CommonUtils.getUTCdatetimeAsString()+ ": END : SensorServiceUtils.getEmergencySpotDtls  " );
		return map;
	}


	public static void setAllEmergencyHotspots(String token, String unitId,
			LocationRange lr, List<DeviceBean> allEmergencyDtls , String unitType ) {
		// TODO Auto-generated method stub
		LocationValue[] lv = lr != null ? lr.getVal() : null;
		// String offset = "0";
		if (lv != null) {
			for (int j = 0; j < lv.length; j++) {
				DeviceBean in = new DeviceBean();
				LocationValue loc1 = lv[j];

				if (j == 0) in.setStartPoint(true);
				else if (j == (lv.length - 1)) in.setEndPoint(true);
					
				
				in.setLatitude(String.valueOf(lv[j].getLat()));
				in.setLongitude(String.valueOf(lv[j].getLng()));

				if (j < lv.length - 1) {
					in.setCoordStr(in.getLongitude()
							+ CommonConstants.COMMA_STRING + in.getLatitude()
							+ CommonConstants.COMMA_STRING + "0 "
							+ String.valueOf(lv[j + 1].getLng()) + ","
							+ String.valueOf(lv[j + 1].getLat() + ",0"));
				} else {
					in.setCoordStr(in.getLongitude()
							+ CommonConstants.COMMA_STRING + in.getLatitude()
							+ CommonConstants.COMMA_STRING + "0");
				}
				String deviceId=null;
				try 
				{
					deviceId = userDeviceMap.get( unitId );
					if( deviceId==null|| unitId.isEmpty() )
						{
							deviceId= LDAPWSUtils.getDeviceByUID( token,unitId, unitType ); 
							userDeviceMap.put( unitId, deviceId );
						}
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
				in.setName(  deviceId );
				in.setDatetime(loc1.getTime().getTime());
				String datetime = CommonUtils.formatDate(loc1.getTime()
						.getTime());
				in.setTime(datetime);
				// in.setDeviceLocalTime( CommonUtils.getLocalTime(offset,
				// datetime, NEW_PORTAL_DATE_FORMAT ) );
				in.setDeviceLocalTime(datetime);
				in.setLocationValue(loc1);

				LDAPUtils.setLDAPUserDtls(in);
				
				allEmergencyDtls.add(in);

			}
		}
	}

//	public static void addDevicesToMap(Date startDate, Date endDate,
//			int lpCount, Map<String, String> paramsMap, Map map,
//			DeviceStatus[] devices, SensorSrvClientPortBindingStub stub,
//			List<DeviceBean> allStaffDevices,
//			List<DeviceBean> allVehicleDevices,
//			List<DeviceBean> allAirplaneDevices) 
//	{
//		if (devices != null) 
//		{
//			DeviceLocationsForMission[] deviceLocationsForMissions = null;
//			LocationRange lr = null;
//			SubRangeType subRangetype = null;
//			if (paramsMap.get("subrangetype") != null) 
//			{
//				subRangetype = SubRangeType.fromString(paramsMap
//						.get("subrangetype"));
//			}			
//			try
//			{
//				RangeLimit rl = getRangeLimit(startDate, endDate,
//						subRangetype == null ? SubRangeType.CONTINUOUS_LATEST
//								: subRangetype, lpCount);
//
//				DeviceMissionWrapper deviceMissionWrapper = getDeviceMissionList(
//						devices, paramsMap);
//
//				if (deviceMissionWrapper != null)
//					deviceLocationsForMissions = stub.getLocationRanges( LDAPUtils.getSSOToken(), deviceMissionWrapper
//									.getDeviceMissionList(), rl);
//
//				if (deviceLocationsForMissions != null
//						&& deviceMissionWrapper.getDeviceTypeMissionList() != null) 
//				{
//					for (DeviceTypeMission deviceType : deviceMissionWrapper
//							.getDeviceTypeMissionList()) 
//					{
//						if (deviceType.getDeviceType().equalsIgnoreCase(
//								LAYER_STAFF))
//						{
//							setAllEmergencyHotspots(deviceType.getDeviceId(),
//									getLocationRange(deviceType.getDeviceId(),
//											deviceLocationsForMissions),
//									allStaffDevices );
//						} else if (deviceType.getDeviceType().equalsIgnoreCase(
//								LAYER_VEHICLE)) {
//
//							setAllEmergencyHotspots(deviceType.getDeviceId(),
//									getLocationRange(deviceType.getDeviceId(),
//											deviceLocationsForMissions),
//									allVehicleDevices );
//						} else if (deviceType.getDeviceType().equalsIgnoreCase(
//								LAYER_AIRPLANE)) {
//
//							setAllEmergencyHotspots(deviceType.getDeviceId(),
//									getLocationRange(deviceType.getDeviceId(),
//											deviceLocationsForMissions),
//									allAirplaneDevices );
//						}
//
//					}
//
//				}
//
//			} catch (RemoteException e) {
//				Logger
//						.error(
//								"Error in (getLocationRanges) retrieving device details ",
//								SensorServiceUtils.class.getName(), e);
//			} catch (javax.naming.NamingException e) {
//				Logger.error("Error in (getSSOToken)retrieving token details ",
//						SensorServiceUtils.class.getName(), e);
//			}
//		}
//
//	}

	public static boolean addUniqueDeviceToMap(
			Map<String, DeviceStatus> deviceMap, DeviceStatus[] dList) {
		boolean isDuplicate = false;
		if (deviceMap != null && dList != null && dList.length > 0) {
			for (DeviceStatus d : dList) {
				isDuplicate = false;
				for (Map.Entry<String, DeviceStatus> entry : deviceMap
						.entrySet()) {
					if (entry.getKey().equalsIgnoreCase(d.getId()))
						isDuplicate = true;
				}
				// Adding DeviceStatus to Map if not found.
				if (!isDuplicate)
					deviceMap.put(d.getId(), d);
			}
		}
		return isDuplicate;
	}

	public static DeviceMissionWrapper getDeviceMissionList(
			DeviceStatus[] devicesList, Map<String, String> paramsMap) {
		DeviceMissionWrapper deviceMissionWrapper = new DeviceMissionWrapper();
		DeviceMission[] deviceMissionList = new DeviceMission[devicesList.length];
		DeviceTypeMission[] deviceTypeMissionList = new DeviceTypeMission[devicesList.length];
		DeviceMission deviceMission = null;
		DeviceTypeMission deviceTypeMission = null;
		String deviceType = null;
		List<String> missionList = null;
		String token = EventServiceUtils.getLDAPToken();
		DirectoryServiceOutInterface_PortType stub=null;
		try {
			 stub= EventServiceUtils.getLDAPStub();
		} catch (ServiceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		int i = 0;
		for (DeviceStatus device : devicesList) {
			deviceMission = new DeviceMission();
			deviceTypeMission = new DeviceTypeMission();
			Object[] objArray = new Object[1];

			if (device.getId().contains("nrap")
					|| device.getId().contains("nreg"))
				continue;

			else if (LDAPUtils.validateStaff(device.getId() ) ) {
				missionList = LDAPUtils.getTrackMeMissionsList(device.getId(),token,stub );
				//System.out.println(" : missionList :" + missionList);
				if (missionList != null)
					objArray = missionList.toArray();
				deviceType = LAYER_STAFF;

			} else if (LDAPUtils.validateVehicle(device.getId())) {
				missionList = LDAPUtils.getVehiclesMissionsList(device.getId(),token,stub );
				if (missionList != null)
					objArray = missionList.toArray();
				deviceType = LAYER_VEHICLE;
			} else if (LDAPUtils.validatePlane(device.getId())) {
				missionList = LDAPUtils.getTrackMeMissionsList(device.getId(),token,stub );
				if (missionList != null)
					objArray = missionList.toArray();
				deviceType = LAYER_AIRPLANE;
			}
			deviceMission.setDeviceId(device.getId());
			deviceMission.setMissionIds(java.util.Arrays.copyOf(objArray,
					objArray.length, String[].class));
			deviceMissionList[i] = deviceMission;

			deviceTypeMission.setDeviceId(device.getId());
			deviceTypeMission.setMissionIds( deviceMission.getMissionIds() );
			deviceTypeMission.setDeviceType(deviceType);
			deviceTypeMissionList[i] = deviceTypeMission;

			i++;
		}
		deviceMissionWrapper.setDeviceMissionList(deviceMissionList);
		deviceMissionWrapper.setDeviceTypeMissionList(deviceTypeMissionList);

		return deviceMissionWrapper;
	}

	public static LocationRange getLocationRange(String deviceId,
			DeviceLocationsForMission[] deviceLocationsForMissions) {
		if (deviceLocationsForMissions != null
				&& deviceLocationsForMissions.length > 0 && deviceId != null) {
			for (DeviceLocationsForMission d : deviceLocationsForMissions) {
				if (d.getDeviceId().equalsIgnoreCase(deviceId))
					return d.getDtoLocationRange();
			}
		}
		return null;
	}

	public static RangeLimit getRangeLimit(Date startDate, Date endDate,
			SubRangeType subRangeType, int lpCount) {
		TimeRange tr = new TimeRange();
		if (startDate != null) {
			Calendar cal = Calendar.getInstance();
			cal.setTime(startDate);
			// cal.add(Calendar.MONTH, -1);
			tr.setOldest( cal);
		}

		if (endDate != null) {
			Calendar cal1 = Calendar.getInstance();
			cal1.setTime(endDate);
			tr.setLatest( cal1);
		}

		RangeLimit rl = new RangeLimit();
		rl.setTimeRange(tr);
		rl.setMaxValues(lpCount);
		return rl;
	}

	public static SensorSrvClientPortBindingStub getServiceLocatorStub() {
		Logger.error("START - SensorServiceUtils.getServiceLocatorStub",
				SensorServiceUtils.class);
		System.out.println("START - SensorServiceUtils.getServiceLocatorStub"
				+ WFPConfigUtils.getWFPConfigValue("soapgps"));
		// AxisProperties.setProperty("axis.socketSecureFactory","com.spacetimeinsght.webservice.ssl.factory.CertSSLSocketFactory");
		SensorSrvClient_Service service = new SensorSrvClient_ServiceLocator();
		System.out.println("service : " + service);
		SensorSrvClientPortBindingStub sensorSrvClientPortBindingStub = null;
		try {
			sensorSrvClientPortBindingStub = new SensorSrvClientPortBindingStub(
					new java.net.URL(
							WFPConfigUtils.getWFPConfigValue("soapgps") == null ? "http://middleware-dev.service.emergency.lu/sensorservice/out/soap/SensorService"
									: WFPConfigUtils
											.getWFPConfigValue("soapgps")),
					service);
		} catch (AxisFault e) {
			Logger.error("Error occured while creating stub [" + e.getMessage()
					+ "]", SensorServiceUtils.class);
			e.printStackTrace();
		} catch (MalformedURLException e) {
			Logger.error("Error occured while creating stub [" + e.getMessage()
					+ "]", SensorServiceUtils.class);
			e.printStackTrace();
		}
		System.out.println("sensorSrvClientPortBindingStub : "
				+ sensorSrvClientPortBindingStub);
		return sensorSrvClientPortBindingStub;

	}

}
