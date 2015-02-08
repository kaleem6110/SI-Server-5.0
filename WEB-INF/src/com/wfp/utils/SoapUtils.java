/**
 * 
 */
package com.wfp.utils;

import java.rmi.RemoteException;
import java.util.Calendar;

import lu.hitec.pss.soap.sensor.client._15_x.LocationRange;
import lu.hitec.pss.soap.sensor.client._15_x.LocationValue;
import lu.hitec.pss.soap.sensor.client._15_x.RangeLimit;
import lu.hitec.pss.soap.sensor.client._15_x.SubRangeType;
import lu.hitec.pss.soap.sensor.client._15_x.UnitId;
import lu.hitec.pss.soap.sensor.client._15_x.UnitType;

import com.enterprisehorizons.util.Logger;
import com.enterprisehorizons.util.StringUtils;
import com.wfp.jobs.SoapTrackingJob;

/**
 * @author kaleem.mohammed
 * 
 */
public class SoapUtils implements IEPICConstants {
	

	public static String getAllWaypointsCount(String unitId, String type,
			String mission, int lpCount,String deviceId) 
	{
		String count = "0";
		try 
		{    //System.out.println( SoapTrackingJob.getStartDateTime()+":"+SoapTrackingJob.getEndDateTime());

			RangeLimit rl = SensorServiceUtils.getRangeLimit( getStartDate().getTime(), getEndDate().getTime() ,
													SubRangeType.CONTINUOUS_LATEST, lpCount); 
			
			System.out.println(" rl : "+EventServiceUtils.getLDAPToken() );	
			LocationRange locationRange = null;
			if (type.equalsIgnoreCase( KEY_STAFF ) || type.equalsIgnoreCase( "USER"))
				locationRange = SensorServiceUtils.getServiceLocatorStub()
				.getUnitLocationRangeForDevice(EventServiceUtils.getLDAPToken(),new UnitId(unitId, UnitType.USER), mission,rl,  deviceId);
				
			else
				locationRange = SensorServiceUtils.getServiceLocatorStub()
				.getUnitLocationRangeForDevice(EventServiceUtils.getLDAPToken(),new UnitId(unitId, UnitType.VEHICLE), mission,rl, deviceId);
			
			System.out.println(  "location Range is NULL for unitId :"+unitId+":device : "+ deviceId +" locationRange :"+locationRange 
					+" getVal :"+locationRange.getVal() );
			if (locationRange != null && locationRange.getVal() != null) 
			{
				int i= locationRange.getVal().length;
				count = i + "";
				Calendar start = getStartEnd( locationRange.getVal(), true );
				Calendar end = getStartEnd( locationRange.getVal(), false );
				System.out.println( " ## start : "+start.getTime().toString() +" End : "+end.getTime().toString() );
				Double timeinMilli = Math.ceil((end.getTime().getTime() - start.getTime().getTime())/ (1000 * 60 * 60 * 24.0));

				return CommonUtils.formatDate(start.getTime())+"DELIM"+ count + "DELIM" + timeinMilli.intValue();
			}
			else
			Logger.error(" location Range is NULL for unitId :"+unitId+":device : "+ deviceId +" locationRange :"+locationRange 
					+" getVal :"+locationRange.getVal(),SoapUtils.class );

		} catch (RemoteException e) {
			// TODO Auto-generated catch block
			Logger.error (" Remote Exception : while fetching waypoints for deviceID :"+deviceId +"unitId : "+unitId , SoapUtils.class );
			Logger.error(" Remote Exception Message "+e.getMessage() , SoapUtils.class );
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block

			Logger.error (" IllegalArgument Exception : while fetching waypoints for deviceID :"+deviceId +"unitId : "+unitId , SoapUtils.class );
			Logger.error(" IllegalArgumentException Message "+e.getMessage() , SoapUtils.class );
		}
		catch(Exception e){ Logger.error ("  Exception : while fetching waypoints for deviceID :"+deviceId +"unitId : "+unitId , SoapUtils.class );
		Logger.error(" Exception Message "+e.getMessage() , SoapUtils.class );}
		return count;

	}
	public static String getAllWaypointsCount( RangeLimit rl, String unitId, String type,
			String mission, int lpCount,String deviceId , String token ) 
	{
		String count = "0";
		try 
		{    //System.out.println( SoapTrackingJob.getStartDateTime()+":"+SoapTrackingJob.getEndDateTime());

			 
			
			//System.out.println(" rl : "+EventServiceUtils.getLDAPToken() );	
			LocationRange locationRange = null;
			
			if (type.equalsIgnoreCase( KEY_STAFF )|| type.equalsIgnoreCase( "USER" )) 
				locationRange = SensorServiceUtils.getServiceLocatorStub()
						.getUnitLocationRangeForDevice( token ,new UnitId(unitId, UnitType.USER), mission,rl,  deviceId);
			else
				locationRange = SensorServiceUtils.getServiceLocatorStub()
						.getUnitLocationRangeForDevice( token,new UnitId(unitId, UnitType.VEHICLE), mission,rl, deviceId);
			if (locationRange != null && locationRange.getVal() != null) 
			{
				int i= locationRange.getVal().length;
				count = i + "";
				Calendar start = getStartEnd( locationRange.getVal(), true );
				Calendar end = getStartEnd( locationRange.getVal(), false );
				//System.out.println( " ## start : "+start +" End : "+end );
				Double timeinMilli = Math.ceil((end.getTime().getTime() - start.getTime().getTime())/ (1000 * 60 * 60 * 24.0));

				return CommonUtils.formatDate(start.getTime())+"DELIM"+ count + "DELIM" + timeinMilli.intValue();
			}

		}catch (RemoteException e) {
			// TODO Auto-generated catch block
			Logger.error (" Remote Exception : while fetching waypoints for deviceID :"+deviceId +"unitId : "+unitId , SoapUtils.class );
			Logger.error(" Remote Exception Message "+e.getMessage() , SoapUtils.class );
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block

			Logger.error (" IllegalArgument Exception : while fetching waypoints for deviceID :"+deviceId +"unitId : "+unitId , SoapUtils.class );
			Logger.error(" IllegalArgumentException Message "+e.getMessage() , SoapUtils.class );
		}
		catch(Exception e){ Logger.error ("  Exception : while fetching waypoints for deviceID :"+deviceId +"unitId : "+unitId , SoapUtils.class );
		Logger.error(" Exception Message "+e.getMessage() , SoapUtils.class );}
		return count;

	}
 public static Calendar getStartEnd( lu.hitec.pss.soap.sensor.client._15_x.LocationValue[] values, boolean isStart )
 {
	 Calendar c = values[0].getTime();
	 if( values!=null && values.length >1  )
	 {
		 c = values[0].getTime();
		 for( LocationValue v : values )
		 {
			 if( isStart)
			 {
				 if(  v.getTime().before( c ) ) 
				 {
					 c= v.getTime();
				 } 
			 }else
			 {
				 if(  v.getTime().after( c ) ) 
				 {
					 c= v.getTime();
				 } 
			 }
			
		 }
	 }
	 return c;
 }
	public static void main(String a[]) {
		System.out.println(getAllWaypointsCount("kmohammed", "USER",
				"AE", 10000, "trackMe-7"));
	}

	public static Calendar getStartDate(){
		Calendar startDate = Calendar.getInstance();
		startDate.add(Calendar.MONTH, -3 );
		startDate.set(Calendar.MINUTE, 0);
		startDate.set(Calendar.SECOND, 0);
		startDate.set(Calendar.HOUR, 0);
		return startDate;
	}
	
	public static Calendar getEndDate(){
		return Calendar.getInstance();
		
		
	}
	
}
