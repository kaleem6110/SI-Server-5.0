package com.wfp.utils;


 
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.ecs.xhtml.em;

import com.enterprisehorizons.constants.CommonConstants;
import com.enterprisehorizons.exception.EHRuntimeException;
import com.enterprisehorizons.magma.datamashup.BaseGeoDataDriver;
import com.enterprisehorizons.magma.designtime.artifact.GeoArtifact;
import com.enterprisehorizons.magma.models.util.Coordinate;
import com.enterprisehorizons.magma.models.util.CoordinateUtils;
import com.enterprisehorizons.magma.server.util.Cache;
import com.enterprisehorizons.magma.server.util.IServerConstants;
import com.enterprisehorizons.magma.server.util.SearchUtils;
import com.enterprisehorizons.util.CastorUtils;
import com.enterprisehorizons.util.SearchCriteria;
import com.enterprisehorizons.util.StringUtils;
import com.spacetimeinsight.config.dashboard.model.Filtercriteria;
import com.spacetimeinsight.db.config.model.EcoexpmlGroupMap;
import com.spacetimeinsight.db.config.model.EcoexpmlModuleMap;
import com.spacetimeinsight.db.config.model.Rubberband;
import com.spacetimeinsight.db.model.util.DataModelsCache;
import com.spacetimeinsight.db.model.util.DataModelsCacheHelper;
import com.spacetimeinsight.filter.ICriteria;
import com.spacetimeinsight.rubberbandregions.Rubberbandregion;
import com.spacetimeinsight.rubberbandregions.Rubberbandregions;
import com.spacetimeinsight.security.bean.UserBean;
import com.wfp.db.platform.model.MessageTemplate;
import com.wfp.jobs.RestTrackingJob;
import com.wfp.offline.synchronize.ISynchronizationServiceConstants;
import com.wfp.security.form.DeviceBean;
import com.wfp.security.form.DeviceStatisticsBean;
import com.wfp.security.form.DeviceStatisticsBean.RegionStatsBean;
import com.wfp.synchronize.db.config.model.SynchronizationTrailLog;

import flex.messaging.FlexContext;
import flex.messaging.HttpFlexSession;
import flex.messaging.io.ArrayCollection;

/***
 * Utility class 
 * @author sti-user
 *
 */
@SuppressWarnings("unchecked")
public class RBRegionsUtils implements IEPICConstants {

	/**
	 * defined a global cache object holding the details of all devices w.r.t ecosystem 
	 * Details of device includes:
	 * 	1) Which region the device entered
	 * 	2) entered at what time
	 * 	3) whether is in the same region?
	 */
	static {
		//CacheController.getInstance().storeObject("$staff_tracking$", new HashMap<String, String>());
		if(Cache.retrieve(CACHE_STAFF_TRACKING) == null){
			Cache.store(CACHE_STAFF_TRACKING, Collections.synchronizedMap(new HashMap<String, Map<String, String>>()));
			
		}
		
	}
	
	/**
	 * 
	 * @return Map - holding all information of the devices
	 */
	@SuppressWarnings("unchecked")
	public synchronized static Map<String, Map<String, DeviceStatisticsBean>> getStaffTackingCache() {
		return (Map<String, Map<String, DeviceStatisticsBean>>)Cache.retrieve(CACHE_STAFF_TRACKING);
	}
	
	/**
	 * Checks whether the device is in the geo-fence or not
	 * @param rubberBandedRegions	list of rubberbandregions/geofence
	 * @param coord					device geo-coords
	 * @return boolean
	 */
	@SuppressWarnings("unused")
	public static  boolean isInDangerZone(Rubberbandregions rubberBandedRegions,
			com.enterprisehorizons.magma.models.util.Coordinate coord) {
		if(rubberBandedRegions != null ){
			Rubberbandregion rbRegion = null;
			for (int i=0;i <rubberBandedRegions.getRubberbandregionCount();i++){
				rbRegion =rubberBandedRegions.getRubberbandregion(i);
				if(CoordinateUtils.isInside(rbRegion.getCoordinates(), coord)) {
					return true;
				}
			}
		}
		
		return false;
		
	}
	
	/**
	 * Returns the dangerzone/geo-fence location name where the device is traced
	 * @param rubberBandedRegions  - list of geo-fences
	 * @param coord 	- device geo-coords
	 * @return	geo-fence region name
	 */
	public static  String getDanzerZoneName(Rubberbandregions rubberBandedRegions,
			com.enterprisehorizons.magma.models.util.Coordinate coord) {
		if(rubberBandedRegions != null ){
			Rubberbandregion rbRegion = null;
			for (int i=0;i <rubberBandedRegions.getRubberbandregionCount();i++){
				rbRegion =rubberBandedRegions.getRubberbandregion(i);
				//checking whether the region is inside or outside the region
				if(CoordinateUtils.isInside(rbRegion.getCoordinates(), coord)) {
					return rbRegion.getRegionName();
				}
			}
		}
		
		return null;
		
	}
	
	/**
	 * returns all the zone/geo-fence location names which matches the <pre>contains</pre> string & 
	 * If the region name matches the <pre>avoidRegionStartsWith</pre> then the resultant geo-fence location is null.
	 *  
	 * @param artifact		-	Source Artifact to check whether it is inside /outside the geofence
	 * @param userbean		- 	user details to get the geo-fence details		
	 * @param layerName		- 	may be used in future
	 * @param layerId		-	used to get the module id
	 * @param contains		- filter criteria for region names
	 * @param avoidRegionStartsWith	- skip the region names
	 * @return	array of zone names
	 */
	public static synchronized String[] getZoneNames(GeoArtifact artifact, UserBean userbean, String layerName, long layerId, String contains, String avoidRegionStartsWith){
		//get the module id  
		long moduleId = RBRegionsUtils.getModuleId(layerId);
		
		//retrieve the go-fence location details
		Rubberbandregions rubberbandregions = RBRegionsUtils.getUserModuleRubberbandregion(userbean.getDomainId(), userbean.getLanguageId(), 
					userbean.getUserId(), userbean.getUserUniqueId(), moduleId, contains);
		
		Rubberbandregions saferubberbandregions =  RBRegionsUtils.getUserModuleRubberbandregion(userbean.getDomainId(), userbean.getLanguageId(), 
				userbean.getUserId(), userbean.getUserUniqueId(), moduleId, "_SZ");
		
		if(saferubberbandregions != null){
			for(int i=0; i<saferubberbandregions.getRubberbandregionCount(); i++){
				rubberbandregions.addRubberbandregion(saferubberbandregions.getRubberbandregion(i));
			}
		}
		
		//validate the regions
		return getZoneNames(rubberbandregions, artifact!= null?artifact.getFirstPoint():null, avoidRegionStartsWith);
		//return null;
	}
	
	public static synchronized String[] getZoneNames(GeoArtifact artifact,String layerName, long layerId, String contains, String avoidRegionStartsWith){
		//get the module id  
		long moduleId = RBRegionsUtils.getModuleId(layerId);
		
		//retrieve the go-fence location details
		Rubberband rbregions =  new Rubberband();
		
		List<Rubberband> rubberbandregionsList = rbregions.searchData();
		
		Rubberbandregions rubberbandregions =null;
		if(rubberbandregionsList != null){
			rubberbandregions = new Rubberbandregions();
			for(int i=0; i<rubberbandregionsList.size(); i++){
				Rubberband userpreference = rubberbandregionsList.get(i);
				Rubberbandregions rbRegions = (Rubberbandregions) CastorUtils.unmarshalString(userpreference.getValueXML(), Rubberbandregions.class);
				if(rbRegions != null  ){
					for(int j=0; j< rbRegions.getRubberbandregionCount(); j++){
						if(rbRegions.getRubberbandregion(j).getRegionName().contains(contains+"_DZ") || 
								rbRegions.getRubberbandregion(j).getRegionName().contains(contains+"_SZ")){
							rubberbandregions.addRubberbandregion(rbRegions.getRubberbandregion(j));
						}
					}
				}
			}
		}
		
		//validate the regions
		return getZoneNames(rubberbandregions, artifact!= null?artifact.getFirstPoint():null, avoidRegionStartsWith);
		//return null;
	}

	/**
	 * returns all the zone/geo-fence location names which matches the <pre>contains</pre> string & 
	 * If the region name matches the <pre>avoidRegionStartsWith</pre> then the resultant geo-fence location is null.
	 *  
	 * @param artifact		-	Source Artifact to check whether it is inside /outside the geofence
	 * @param userbean		- 	user details to get the geo-fence details		
	 * @param layerName		- 	may be used in future
	 * @param layerId		-	used to get the module id
	 * @param contains		- filter criteria for region names
	 * @param avoidRegionStartsWith	- skip the region names
	 * @return	array of zone names
	 */
	public static Rubberbandregion[] getRBZones(GeoArtifact artifact, UserBean userbean, String layerName, int layerId, String contains, String avoidRegionStartsWith){
		//get the module id 
		long moduleId = RBRegionsUtils.getModuleId(layerId);
		
		//retrieve the go-fence location details
		Rubberbandregions rubberbandregions = RBRegionsUtils.getUserModuleRubberbandregion(userbean.getDomainId(), userbean.getLanguageId(), 
					userbean.getUserId(), userbean.getUserUniqueId(), moduleId, contains);
		
		Rubberbandregions saferubberbandregions =  RBRegionsUtils.getUserModuleRubberbandregion(userbean.getDomainId(), userbean.getLanguageId(), 
				userbean.getUserId(), userbean.getUserUniqueId(), moduleId, "_SZ");
		
		if(saferubberbandregions != null){
			for(int i=0; i<saferubberbandregions.getRubberbandregionCount(); i++){
				rubberbandregions.addRubberbandregion(saferubberbandregions.getRubberbandregion(i));
			}
		}
		
		//validate the regions
		return getZones(rubberbandregions, artifact!= null?artifact.getFirstPoint():null, avoidRegionStartsWith);
		//return null;
	}
	
	private static Rubberbandregion[] getZones(Rubberbandregions rubberbandregions,
			Coordinate firstPoint, String avoidRegionStartsWith) {
		List<Rubberbandregion> allZones = null;
		
		if(rubberbandregions != null && firstPoint != null ){
			Rubberbandregion rbRegion = null;
			//iterate all the rubberbandregions
			for (int i=0;i <rubberbandregions.getRubberbandregionCount();i++){
				rbRegion =rubberbandregions.getRubberbandregion(i);
				//validating whther the region is inside the rubberbandregion/geo-fence
				if(CoordinateUtils.isInside(rbRegion.getCoordinates(), firstPoint)) {
					if(allZones == null){
						allZones = new ArrayList<Rubberbandregion>();
					}
					
					
					//after all the preliminary validations, adding to the analysis basket
					allZones.add(rbRegion);
					//second validation whether the zone name is of type to be avoided/discarded
					/*for(Rubberbandregion tempZone:allZones){
						if(tempZone.getRegionName().contains(avoidRegionStartsWith)){
							return null;
						}
					}*/
				}
			}
		}
		//converting list to array of string
		if(allZones != null){
			Rubberbandregion[] strResult=new Rubberbandregion[allZones.size()];  
			return allZones.toArray(strResult);
		}
		 
		
		return  null;
	}
	
	
	/**
	 * return the array of zone names by validating based on the <pre>avoidRegionStartsWith</pre>
	 * @param rubberbandregions
	 * @param firstPoint
	 * @param avoidRegionStartsWith
	 * @return	String array of zones
	 */
	private synchronized static String[] getZoneNames(Rubberbandregions rubberbandregions,
			Coordinate firstPoint, String avoidRegionStartsWith) {
		List<String> allZones = null;
		
		if(rubberbandregions != null && firstPoint != null ){
			List<Rubberbandregion> allZonesObj = null;
			Rubberbandregion rbRegion = null;
			//iterate all the rubberbandregions
			for (int i=0;i <rubberbandregions.getRubberbandregionCount();i++){
				rbRegion =rubberbandregions.getRubberbandregion(i);
				//validating whther the region is inside the rubberbandregion/geo-fence
				if(CoordinateUtils.isInside(rbRegion.getCoordinates(), firstPoint)) {
					if(allZonesObj == null){
						allZonesObj = new ArrayList<Rubberbandregion>();
					}
					if(allZones == null){
						allZones = new ArrayList<String>();
					}
					
					
					
					//after all the preliminary validations, adding to the analysis basket
					if(!rbRegion.getRegionName().contains(avoidRegionStartsWith) && validateZoneByDateTime(rbRegion.getRegionName())){
						allZones.add(rbRegion.getRegionName());
					}
					
					allZonesObj.add(rbRegion);
					//second validation whether the zone name is of type to be avoided/discarded
					/*for(String tempZone:allZones){
						if(tempZone.contains(avoidRegionStartsWith)){
							return null;
						}
					}*/
					
			}
		}
		boolean isInSafeRegion = isSZWithinDangerZone(allZonesObj, avoidRegionStartsWith);
		if(isInSafeRegion){
			return null; 
		}
		
	
		//validateAllZonesDateTime(allZones);
			
		//converting list to array of string
		if(allZones != null && allZones.size() > 0){
			String[] strResult=new String[allZones.size()];  
			return allZones.toArray(strResult);
		}
		}
		return  null;
	}
	
	private static boolean validateZoneByDateTime(String regionName) {
		MessageTemplate mt = getMessageTemplate(regionName);
		Date curTime = new Date();
		if(mt!= null && mt.getStartDate() != null){
			if(mt.getStartDate() != null && mt.getEndDate()!= null){
				if(!(mt.getStartDate().compareTo(curTime) == -1 && ( mt.getEndDate()!= null && mt.getEndDate().compareTo(curTime) == 1))){
					return false;
				}
			}
			
			if(mt.getStartDate() != null && mt.getEndDate()== null){
				if(!(mt.getStartDate().compareTo(curTime) == -1 )){
					return false;
				}
			}
			
		}
		return true;
	}

	private synchronized static void validateAllZonesDateTime(List<String> allZones) {
		if(allZones != null){
			for(String zone:allZones){
				MessageTemplate mt = getMessageTemplate(zone);
				Date curTime = new Date();
				if(mt.getStartDateTime() != null){
					if(!(mt.getStartDate().compareTo(curTime) == -1 && mt.getEndDate().compareTo(curTime) == 1)){
						try{
							allZones.remove(zone);
						}catch(Exception e){
							//ignore
						}
					}
				}
				
			}
		}
		
	}

	private static boolean isSZWithinDangerZone(
			List<Rubberbandregion> allZonesObj, String safeZoneIndication) {
		if(allZonesObj == null){
			return false;
		}
		for(Rubberbandregion sourceZone:allZonesObj){
			for(Rubberbandregion tempZone:allZonesObj){
				//CoordinateUtils.i
				if(isInside(CoordinateUtils.getCoordinates(sourceZone.getCoordinates()), 
						CoordinateUtils.getCoordinates(tempZone.getCoordinates()))						
						&& !sourceZone.getRegionName().contains(safeZoneIndication)
						&& tempZone.getRegionName().contains(safeZoneIndication)){
					return true;
				}
			}
		}
		
			/*if(tempZone.getRegionName().contains(safeZoneIndication)){
				return null;
			}
		}*/
		return false;
	}
	
	public static  boolean isInside(Coordinate[] major, Coordinate[] minor){
		
		if(major != null && minor != null){
			for(Coordinate coord : minor){
				if(!CoordinateUtils.isInside(major, coord)){
					return false;
				}
			}
		}
		return true;
	}

	/**
	 * Method used to validate whether the device is in the same geo-fence / it moved to another place. 
	 * Based on the validate input, it may fire the alert based on the zone specific time to trigger
	 * 
	 * @param artifact
	 * @param allZones
	 * @param sessionid
	 * @param deviceId
	 * @return
	 */
	public synchronized static boolean isDeviceTraced(GeoArtifact artifact, String[] allZones, String sessionid, String deviceId){
		if(allZones == null ){
			return false; 
		} 
		if(allZones.length <= 0){
			return false; 
		}
		//if we are having zones that indicates that the asset is in the target geo-fence location
		//hence, its in unsafe zone
		boolean isInUnsafeZone =  (!StringUtils.isNull(allZones));
		//retrieving the staff tracking cache 
		if(getStaffTackingCache().get(sessionid) == null){
			getStaffTackingCache().put(sessionid, new HashMap<String,DeviceStatisticsBean>());
		}
		
		//getting the Map having the device/asset statistics for that ecosystem session
		Map<String, DeviceStatisticsBean> cache = getStaffTackingCache().get(sessionid);
		
		//getting the asset statistics bean 
		DeviceStatisticsBean statisticsBean = cache.get(deviceId);
		//if its the first time, then create the object & cache it for future
		if(statisticsBean == null){
			statisticsBean = new DeviceStatisticsBean();
			cache.put(deviceId, statisticsBean);
		}
		
		//getting the Map having the region name & its statistics holding the enterAt, is in same place  or not...etc.,
		Map<String, DeviceStatisticsBean.RegionStatsBean> regionStatsMap = statisticsBean.getStatsBean();
		boolean isInSamePlace = false;
		if(regionStatsMap != null){
			//iterate for all the zones/geo-fence/target locations
			for(int i =0; i< allZones.length ;i++){
				//get the Region Stas Bean for that particular zone
				DeviceStatisticsBean.RegionStatsBean regionBean = regionStatsMap.get(allZones[i]);
				//System.out.println(" allZones[i] :"+allZones[i] + " :regionBean:  "+regionBean );
				//if its for the first timme.....cache it ....
				if(regionBean == null){
					regionBean =  new DeviceStatisticsBean.RegionStatsBean();
					regionStatsMap.put(allZones[i], regionBean);
				}
				//note the statistics
				regionBean = regionStatsMap.get(allZones[i]);
				regionBean.setDeviceId(deviceId);
				regionBean.setZoneName(allZones[i]);
				
				//checking whether its in the same place
				isInSamePlace = (isInUnsafeZone == regionBean.isInSameZone()); 
				
				//update the property which indicates whther its in the same region
				regionBean.setInSameZone(isInSamePlace?isInSamePlace:(!isInSamePlace && isInUnsafeZone));
				if((!isInSamePlace )){ //not in the same place.... 
					
					//logic to avoid overwriting the map with the changes if there is no updates from the device
					//if(!(isInUnsafeZone?"Y":"N").equalsIgnoreCase(cache.get(deviceId))){
					regionBean.setEnteredAt(new Date());
					//indicates whether the event is fired or not
					regionBean.setEventFired(false);
					cache.put(deviceId, statisticsBean);
					boolean isTraced = (!isInSamePlace && isInUnsafeZone);
					//if( isTraced ) validateFireEvent(allZones, deviceId, sessionid, regionBean, artifact);
					return isTraced;
					/*if(isSendMail)	{
						for(String zone:allZones){
							//com.wfp.utils.EventServiceUtils.publishEvent(zone, deviceId);	
							//com.wfp.utils.AlertServiceUtils.publishAlert(deviceId, zone);
						}
						
					}	*/
					//return (!isInSamePlace && isInUnsafeZone);
				}else if(isInSamePlace && !regionBean.isEventFired()) {	 //if its in the same place but the alert is not send to the user
					
					validateFireEvent(allZones, deviceId, sessionid, regionBean, artifact);
				}
				
			}
			
			
			
		}
		//isInSamePlace = (isInUnsafeZone?"Y-":"N-").startsWith(regionStatsBean != null? regionStatsBean.get(deviceId):"");
		return false;
	}

	/**
	 * Validator is responsible for firing the alert.
	 * @param allZones
	 * @param deviceId
	 * @param sessionId
	 * @param regionBean
	 * @param artifact 
	 */
	public static void validateFireEvent(String[] allZones, String deviceId, String sessionId, RegionStatsBean regionBean, GeoArtifact artifact){
		//System.out.println(" START validateFireEvent ");
		if(allZones != null){
			for (String zoneName: allZones){ //System.out.println( " 500: zoneName "+ zoneName );
				//getting the message template 
				com.wfp.db.platform.model.MessageTemplate mt = com.wfp.utils.RBRegionsUtils.getMessageTemplate(zoneName);
				
				Map<String, DeviceStatisticsBean> cache = getStaffTackingCache().get(sessionId);
				if(cache != null && mt != null){
					//retrieve the statistics of the device in this <pre>zoneName</pre>
					Date enteredAt = cache.get(deviceId)!= null && cache.get(deviceId).getStatsBean() != null && cache.get(deviceId).getStatsBean().get(zoneName) !=null?cache.get(deviceId).getStatsBean().get(zoneName).getEnteredAt():null;
					Calendar cal = Calendar.getInstance();
					if(enteredAt!= null){
						cal.setTime(enteredAt);
					}
					
					//add the Trigger time interval to the data object which 
					cal.add(Calendar.SECOND, mt.getTriggerTime().intValue());
					
					//validate whether this is the right time to trigger the alert
					int timeDiff = new Date().compareTo(cal.getTime()); 
					if(timeDiff > 0){
						//yup...now, i can trigger/publish the alert /email  
						com.wfp.utils.AlertServiceUtils.publishAlert(deviceId, zoneName, artifact.getFirstPoint().x, artifact.getFirstPoint().y,parseEmails(mt.getEmail() ));
						
						//set updates to the statistics
						regionBean.setEventFired(true);
						
						if(mt.getRecurPerDay() > 1 && regionBean.getCurrentAlertCount() < mt.getRecurPerDay() ){
							long count = regionBean.getCurrentAlertCount();
							regionBean.setCurrentAlertCount(++count);
							regionBean.setNTimes(mt.getRecurPerDay());
							regionBean.setEventFired(false);
							//add the Trigger time interval to the data object which 
							cal.add(Calendar.HOUR, (int) ((24/mt.getRecurPerDay())));
							cal.add(Calendar.SECOND,  mt.getTriggerTime().intValue());
							regionBean.setEnteredAt(cal.getTime());
						}
					}
				}
				
			}
		}
		return ;
	}
	
	/**
	 * returns the message template 
	 * @param regionName
	 * @return
	 */
	public static MessageTemplate getMessageTemplate(String regionName){
		SearchCriteria sc = new SearchCriteria();
		sc.addCritirea("name", SearchCriteria.EQUALS, regionName);
		
		String searchcriteria = regionName;
		Filtercriteria filtercriteria = (Filtercriteria) CastorUtils.unmarshalString( searchcriteria, Filtercriteria.class);
		
		
		ICriteria criteria = SearchUtils.buildSearchCriteria("name",regionName, filtercriteria );
		
		MessageTemplate mt = new MessageTemplate();
		
		List list = mt.searchData( criteria );
		if(list != null && list.size() > 0){
			return (MessageTemplate) list.get(0);
		}
		
		return null;
	}
	
	/**
	 * List of <code>UserPreferences</code> 
	 * @param domainId
	 * @param languageId
	 * @param userId
	 * @param userUniqueIdStr
	 * @param moduleId
	 * @return List of user preferences
	 */
	public static Rubberband[] getUserModulePreferences(long domainId, long languageId, long userId, String userUniqueIdStr, long moduleId) {
		if(userUniqueIdStr == null){
	        userUniqueIdStr = CommonConstants.EMPTY_STRING;
		}
		List<Rubberband> rubberbandList = new ArrayList<Rubberband>();
		DataModelsCache.getInstance().refresh(Rubberband.class.getName());
		List userRubberbandList = DataModelsCache.getInstance().retrieve(Rubberband.class.getName());
		int count = userRubberbandList == null ? 0 : userRubberbandList.size();
		Rubberband rubberband = null;
		if (userId == 0)
			userId = -1;
		for (int i = 0; i < count; i++) {
			rubberband = (Rubberband) userRubberbandList.get(i);
			//System.out.println("userUniqueIdStr"+userUniqueIdStr+":rubberband.getUserUniqueId() "+rubberband.getUserUniqueId()+":"+rubberband.getListType());
			if (domainId == rubberband.getDomainId() && languageId == rubberband.getLanguageId()
					//kmohammed commented: && (userUniqueIdStr.equals(rubberband.getUserUniqueId()))
					&& moduleId == rubberband.getModuleId() && 
					( rubberband.getListType().equalsIgnoreCase(MODULE_LIST_TYPE) || userUniqueIdStr.equals(rubberband.getUserUniqueId() ) ) ) {
				rubberbandList.add(rubberband);
			}
			
			if (domainId == rubberband.getDomainId() && languageId == rubberband.getLanguageId()
					&& (StringUtils.isNull(rubberband.getUserUniqueId())  )
					&& moduleId == rubberband.getModuleId()) {
				rubberbandList.add(rubberband);
			}
		}
		Rubberband[] list = new Rubberband[rubberbandList.size()];
		for(int i=0;i<rubberbandList.size();i++){
			list[i] = rubberbandList.get(i);
		}
		return list;
	}
	
	/**
	 * returns all rubberband regions
	 * @param domainId
	 * @param languageId
	 * @param userId
	 * @param userUniqueIdStr
	 * @param moduleId
	 * @param regionPrefix
	 * @return
	 */
	public static  Rubberbandregions getUserModuleRubberbandregion(long domainId, long languageId, long userId,String userUniqueIdStr,long moduleId, String regionPrefix) {
		DataModelsCache.getInstance().refresh(Rubberband.class.getName());
		Rubberband[] userPreferences = getUserModulePreferences(domainId, languageId, userId,userUniqueIdStr, moduleId);
		Rubberbandregions rubberbandregions = new Rubberbandregions();
		for (int i = 0; i < userPreferences.length; i++) {
			if(userPreferences[i] != null){
				if(userPreferences[i].getRubberbandregion().getRegionName().contains(regionPrefix))
				rubberbandregions.addRubberbandregion(userPreferences[i].getRubberbandregion());
			}
		}
		return rubberbandregions;
	}
	
	public static ArrayCollection getUserModuleRubberbandregionArray(long domainId, long languageId, long userId,String userUniqueIdStr,long moduleId, String regionPrefix) {
		Rubberbandregions rbRegions = getUserModuleRubberbandregion(domainId, languageId, userId, userUniqueIdStr,moduleId, regionPrefix );
		if(rbRegions != null ){
			ArrayCollection ac= new ArrayCollection();
			ac.add(null);
			for(int i=0; i<rbRegions.getRubberbandregionCount(); i++){
				ac.add(rbRegions.getRubberbandregion(i));
			}
			return ac;
			
		}
		return null;
	}
	
	public static final ArrayCollection getUserModuleRegionNames(long domainId, long languageId, long userId,String userUniqueIdStr,long moduleId, String regionPrefix) {
		ArrayCollection rbRegionNames = null;
		Rubberbandregions rbRegions = getUserModuleRubberbandregion(domainId, languageId, userId, userUniqueIdStr, moduleId, regionPrefix);
		if(rbRegions != null ){
			rbRegionNames = new ArrayCollection();
			for(int i=0; i<rbRegions.getRubberbandregionCount();i++){
				rbRegionNames.add(rbRegions.getRubberbandregion(i).getRegionName());
			}
		}
		return rbRegionNames;
	}
	
	public static  ArrayCollection getAllUserModuleRegionMessages(long domainId, long languageId, long userId,String userUniqueIdStr,long moduleId, String regionPrefix){
		ArrayCollection rbRegionNames =  getUserModuleRegionNames(domainId, languageId, userId, userUniqueIdStr, moduleId, regionPrefix);
		ArrayCollection rbArrayCollection = null;
		if(rbRegionNames != null){
			rbArrayCollection = new ArrayCollection();
			MessageTemplate temp = new MessageTemplate();
			temp.setName(CommonConstants.EMPTY_STRING);
			rbArrayCollection.add(temp);
			for (int i=0;i<rbRegionNames.size(); i++){
				getRegionMessage(rbArrayCollection, (String) rbRegionNames.get(i)); 
			}
		}
		
		return rbArrayCollection;
	}
	
	
/**
 * Blaze DS Server started for configuring the messaging template
 */	
	public static void getRegionMessage(ArrayCollection rbArrayCollection, String rbRegionName){
		if(rbArrayCollection != null){
			MessageTemplate rbMessage = getRegionMessage(rbRegionName);
			rbArrayCollection.add(rbMessage);
		}
	}
	
	public static MessageTemplate getRegionMessage(String rbRegionName){
		MessageTemplate rbMessage = null;
		SearchCriteria sc = new SearchCriteria();
		sc.addCritirea(PARAM_NAME, SearchCriteria.EQUALS, rbRegionName);
		
		MessageTemplate mt = new MessageTemplate();
		
		String searchcriteria = rbRegionName;
		Filtercriteria filtercriteria = (Filtercriteria) CastorUtils.unmarshalString( searchcriteria, Filtercriteria.class);
		
		
		ICriteria criteria = SearchUtils.buildSearchCriteria( PARAM_NAME ,rbRegionName, filtercriteria );
		
		List result = mt.searchData( criteria );
		if(result != null && result.size() > 0){
			rbMessage = (MessageTemplate) result.get(0);
			rbMessage.setStartDateTime(CommonUtils.formatDate(rbMessage.getStartDate()));
			rbMessage.setEndDateTime(CommonUtils.formatDate(rbMessage.getEndDate()));
			rbMessage.setEmail(rbMessage.getEmail());
			//System.out.println("rbMessage.getEmail()"+rbMessage.getEmail());
		}else {
			rbMessage = new MessageTemplate();
			rbMessage.setName(rbRegionName);
		}
		
		return rbMessage;
	}
	
	public static SynchronizationTrailLog saveRegionMessage(MessageTemplate mt, String moduleId){
		MessageTemplate crud = new MessageTemplate(); 
		crud.setName(mt.getName());
		crud.setBody(mt.getBody());
		crud.setSubject(mt.getSubject());
		crud.setRecurPerDay(mt.getRecurPerDay());
		crud.setTriggerTime(mt.getTriggerTime());
		//System.out.println("mt.getStartDateTime()"+mt.getStartDateTime()+"mt.getEndDateTime():"+mt.getEndDateTime()+":mt.getExclusionEmail()"+mt.getExclusionEmail() );
		
		crud.setStartDate(CommonUtils.stringDateToDate(mt.getStartDateTime(),PORTAL_DATE_FORMAT_MM ));
		crud.setEndDate(CommonUtils.stringDateToDate(mt.getEndDateTime(), PORTAL_DATE_FORMAT_MM ));
		crud.setModifiedDate(CommonUtils.getUTCdatetimeAsDate() );
		
		crud.setEmail(mt.getEmail());
		crud.setExclusionEmail(mt.getExclusionEmail());
		long syncTypeId = ISynchronizationServiceConstants.SYNC_TYPE_ADD;
		if(mt.getId() > 0){
			crud.setId(mt.getId());
			syncTypeId = ISynchronizationServiceConstants.SYNC_TYPE_UPDATE;
		}else crud.setCreatedDate(CommonUtils.getUTCdatetimeAsDate() );
		//System.out.println("b4 insertorupdate:"+mt.getId());
		boolean isInserted =  crud.insertOrUpdateData();
		//System.out.println(" isInserted : "+isInserted );
		if(isInserted){
			HttpFlexSession httpFlexSession = (HttpFlexSession) FlexContext.getFlexSession();
			if(httpFlexSession != null){
				DataModelsCache.getInstance().refresh(MessageTemplate.class.getName());
				UserBean userBean = (UserBean)httpFlexSession.getAttribute("stiUser");
				//temporary comment
				/*return SynchronizationDBUtils.syncTraceLog(ISynchronizationServiceConstants.SYNC_DATA_TYPE_GEOFENCE_RULES,
						crud.getName(), syncTypeId,
						ISynchronizationServiceConstants.SYNC_STATUS_NEW, ServerUtils.getSystemServerName()+"_"+AdminConfigUtils.getHttpServerPort(), (long)userBean.getUserId(),
						userBean.getUserUniqueId(), StringUtils.getLong(moduleId));*/
			}	
			
		}else {System.out.println("*** Exception");
			throw new EHRuntimeException("Failed to save the region.");
		}
		
		return null;
	}
	
	public static SynchronizationTrailLog deleteRegionMessage(String rbRegionName, String moduleId){
		MessageTemplate map = new MessageTemplate();
		
		SearchCriteria criteria = new SearchCriteria();
		criteria.addCritirea(PARAM_NAME, SearchCriteria.EQUALS, rbRegionName);
		
		String searchcriteria = rbRegionName;
		Filtercriteria filtercriteria = (Filtercriteria) CastorUtils.unmarshalString( searchcriteria, Filtercriteria.class);
		
		
		ICriteria icriteria = SearchUtils.buildSearchCriteria( PARAM_NAME ,rbRegionName, filtercriteria );
		
		
		boolean isDeleted =  map.deleteData( icriteria );
		
		if(isDeleted){
			HttpFlexSession httpFlexSession = (HttpFlexSession) FlexContext.getFlexSession();
			if(httpFlexSession != null){
				UserBean userBean = (UserBean)httpFlexSession.getAttribute("stiUser");
				//temporary comment
				/*return SynchronizationDBUtils.syncTraceLog(ISynchronizationServiceConstants.SYNC_DATA_TYPE_GEOFENCE_RULES,
						rbRegionName, ISynchronizationServiceConstants.SYNC_TYPE_DELETE,
						ISynchronizationServiceConstants.SYNC_STATUS_NEW, ServerUtils.getSystemServerName()+"_"+AdminConfigUtils.getHttpServerPort(), (long)userBean.getUserId(),
						userBean.getUserUniqueId(), StringUtils.getLong(moduleId));*/
			}		
		}
		
		return null;
	}
	
	
	
	public static long getModuleId(long layerId){
		EcoexpmlModuleMap map = new EcoexpmlModuleMap();
		
		SearchCriteria criteria = new SearchCriteria();
		criteria.addCritirea(PARAM_ID, SearchCriteria.EQUALS, layerId);
		
		String searchcriteria = layerId+"";
		Filtercriteria filtercriteria = (Filtercriteria) CastorUtils.unmarshalString( searchcriteria, Filtercriteria.class);
		
		
		ICriteria icriteria = SearchUtils.buildSearchCriteria( PARAM_ID ,layerId+"", filtercriteria );
		
		
		List<EcoexpmlModuleMap> list = map.searchData( icriteria );
		
		if(list != null && list.size()>0){
			return list.get(0).getModuleId();
		}
		
		
		return 0L;
	}
	
	public static long getModuleId(String name){
		EcoexpmlGroupMap map = new EcoexpmlGroupMap();
		
		SearchCriteria criteria = new SearchCriteria();
		criteria.addCritirea("ecoDisplayName", SearchCriteria.EQUALS, name);
		
		String searchcriteria = name;
		Filtercriteria filtercriteria = (Filtercriteria) CastorUtils.unmarshalString( searchcriteria, Filtercriteria.class);
		
		
		ICriteria icriteria = SearchUtils.buildSearchCriteria( PARAM_ID ,name, filtercriteria );
		
		List<EcoexpmlGroupMap> list = map.searchData( icriteria );
		
		if(list != null){
			return list.get(0).getModuleId();
		}
		
		
		return 0L;
	}
	
	public static boolean validateLocation(String country, Long[] allGroups){
		Map<String, Long> map = DataModelsCacheHelper.getAllGroups();
		 Iterator it = map.entrySet().iterator();
		    while (it.hasNext()) {
		        Map.Entry<String, Long> pairs = (Map.Entry)it.next();
		        
		        
		        for(int i=0; i<allGroups.length; i++){
		        	if(!pairs.getKey().startsWith(KEY_PAKISTAN) && !pairs.getKey().startsWith(KEY_DUBAI) && !pairs.getKey().startsWith(KEY_ROME) &&
		        			pairs.getValue().intValue() == allGroups[i].intValue()){
			        	return true;
			        }
		        	
		        	if(pairs.getValue().intValue() == allGroups[i].intValue() &&
		        			pairs.getKey().startsWith(KEY_PAKISTAN) && PAKISTAN.equalsIgnoreCase(country)){
			        	return true;
			        }else if(pairs.getValue().intValue() == allGroups[i].intValue() &&
		        			pairs.getKey().startsWith(KEY_DUBAI) && DUBAI.equalsIgnoreCase(country)){
			        	return true;
			        }else if(pairs.getValue().intValue() == allGroups[i].intValue() &&
		        			pairs.getKey().startsWith(KEY_ROME) && ROME.equalsIgnoreCase(country)){
			        	return true;
			        }
			       
		        }
		        
		    }
		    return false;
	}
	
	public static List  getGeometry(com.spacetimeinsight.rubberbandregions.Rubberbandregion[] allZones){
		List<com.vividsolutions.jts.geom.Geometry> geometryList = new java.util.ArrayList();		
		if(allZones != null){
			for(com.spacetimeinsight.rubberbandregions.Rubberbandregion rb : allZones){
				geometryList.add(com.enterprisehorizons.magma.artifact.util.GeometryBuilder.toGeometry(com.enterprisehorizons.magma.models.util.CoordinateUtils.getCoordinates(rb.getCoordinates())));
			} 
		}
		
		//System.out.println(geometryList.get(0).disjoint(geometryList.get(1)));		
		return geometryList;
	}
	
	public static ArrayCollection getAllDevicesInRegionCache(String regionName,
			String layerNameKey, String rubberbandCoords) {
		List<GeoArtifact> deviceBeanList = (List<GeoArtifact>) Cache
				.retrieve(layerNameKey); // RestTrackingJob.getInstance().getRestServiceList(KEY_STAFF);
		ArrayCollection targetList = null;
		if (deviceBeanList != null) {
			targetList = new ArrayCollection();
			// targetList.add(new DeviceBean());
			DeviceBean dBean = null;
			for (GeoArtifact deviceBean : deviceBeanList) {
				if (!StringUtils.isNull(rubberbandCoords)) {
					if (CoordinateUtils.isInside(rubberbandCoords,
							new Coordinate(deviceBean.getCoordinates()[0].x,
									deviceBean.getCoordinates()[0].y))) {
						

						if (regionName.startsWith("Staff")) {
							if (deviceBean
									.getAttributeValueAsString("deviceId")
									.startsWith("trackMe")) {
								dBean = new DeviceBean();
								dBean.setTime(deviceBean
										.getAttributeValueAsString("time"));
								dBean.setName(deviceBean
										.getAttributeValueAsString("deviceId"));
								
								targetList.add(dBean);
							}
						} else if (regionName.startsWith("Vehicle")) {
							if (deviceBean
									.getAttributeValueAsString("deviceId")
									.startsWith("EMS")) {
								dBean = new DeviceBean();
								dBean.setTime(deviceBean
										.getAttributeValueAsString("time"));
								dBean.setName(deviceBean
										.getAttributeValueAsString("deviceId"));
								targetList.add(dBean);
							}
						} else {
							if (!(dBean.getName().startsWith("EMS") && deviceBean
									.getAttributeValueAsString("deviceId")
									.startsWith("trackMe"))) {
								dBean = new DeviceBean();
								dBean.setTime(deviceBean
										.getAttributeValueAsString("time"));
								dBean.setName(deviceBean
										.getAttributeValueAsString("deviceId"));
								targetList.add(dBean);
							}

						}

					}

				}
			}
		}
		return targetList;
	}
	
	public static ArrayCollection getAllDevicesInRegion(String regionName, String layerNameKey, String rubberbandCoords){
		List<DeviceBean> deviceBeanList = RestTrackingJob.getInstance().getRestServiceList(layerNameKey);
		ArrayCollection targetList = null;
		if(deviceBeanList != null){
			HttpFlexSession httpFlexSession = (HttpFlexSession) FlexContext.getFlexSession();
			UserBean userBean = (UserBean)httpFlexSession.getAttribute("stiUser");
			if(httpFlexSession == null){
				return null;
			}
			targetList = new ArrayCollection();
			for(DeviceBean deviceBean: deviceBeanList){
				if(!com.wfp.utils.LDAPUtils.validateDeviceByUser(deviceBean.getName(), userBean.getUserUniqueId())){
					continue;
				}
				
				if(!StringUtils.isNull(rubberbandCoords)){
					if( CoordinateUtils.isInside(rubberbandCoords, 
							new Coordinate(StringUtils.getDouble(deviceBean.getLongitude()),StringUtils.getDouble(deviceBean.getLatitude()) ))){
						targetList.add(deviceBean);
					}
					
				}
			}
		}
		return targetList;
	}
	
	public static ArrayCollection sendAlerts(ArrayCollection allDevicesList, String regionName, String subject, String message){
			
			if(allDevicesList != null){
				
				MessageTemplate mt =getRegionMessage(regionName);
				
				mt.setSubject(subject);
				mt.setBody(message);
				
				mt.insertOrUpdateData();
				DataModelsCache.getInstance().refresh(MessageTemplate.class.getName());
				boolean isDeviceSelected = false;
				for(Object db:allDevicesList){
					if(db instanceof HashMap){
						Map device = (HashMap) db;
						if(StringUtils.getBoolean(device.get("isSelected")+"")){
							if(!isDeviceSelected ){
								isDeviceSelected = true;
							}
							com.wfp.utils.AlertServiceUtils.publishAlert(device.get("name")+"", regionName, StringUtils.getDouble(device.get("latitude")+""),
									StringUtils.getDouble(device.get("longitude")+""),parseEmails( mt.getEmail()) );
						}					
					}
				}
				if(!isDeviceSelected){
					throw new EHRuntimeException("Please select the devices to send an alert");
				}
			}
			return null;
		}
	public static List<String> parseEmails(String email)
	{ System.out.println("##parseEmails : "+email );
		List<String> emailList = null;
		if(email!=null&&email!="")
		{ emailList = new ArrayList<String>();
			if(email.indexOf(';')>0)
			{
				String e[] = email.split(";");
				for(String emailStr : e ) emailList.add(emailStr);					
			}
			else emailList.add(email);
		}
		//System.out.println("emailList"+emailList.size() );
		return emailList;
	}
	public static ArrayCollection sendAlertsByUID(ArrayCollection allDevicesList, String regionName, String subject, String message){
		
		if(allDevicesList != null){
			
			MessageTemplate mt =getRegionMessage(regionName);
			
			mt.setSubject(subject);
			mt.setBody(message);
			
			mt.insertOrUpdateData();
			
			for(Object db:allDevicesList){
				if(db instanceof HashMap){
					Map device = (HashMap) db;
					if(StringUtils.getBoolean(device.get("isSelected")+"")){
						com.wfp.utils.AlertServiceUtils.publishAlertByUID(device.get("name")+"", regionName, StringUtils.getDouble(device.get("latitude")+""),
								StringUtils.getDouble(device.get("longitude")+""));
					}					
				}
			}
		}
		return null;
	}
	public boolean hasGeofenceProfile(String userId)
	{ System.out.println("### START hasGeofenceProfile :userId: "+userId );
		boolean hasGeofenceProfile= false;
		if(userId!=null&&!userId.isEmpty()){
			List<String> profileList = LDAPUtils.getAllProfiles4rUser(userId);
			if(profileList!=null&&profileList.size()>0)
			{	for(String profile:profileList)
				{
					if(profile.equalsIgnoreCase("STI_Geo-fence")) 
					 { hasGeofenceProfile =true; break; }
				}
			}
		}	
		System.out.println(" ### END hasGeofenceProfile :hasGeofenceProfile: "+hasGeofenceProfile );
		return hasGeofenceProfile;
	}
	public boolean hasACLProfile(String userId,String aclProfile)
	{ System.out.println("### START hasAclProfile :userId: "+userId );
		boolean hasAclProfile= false;
		if(userId!=null&&!userId.isEmpty()){
			List<String> profileList = LDAPUtils.getAllProfiles4rUser(userId);
			if(profileList!=null&&profileList.size()>0)
			{	for(String profile:profileList)
				{
					if(profile.equalsIgnoreCase(aclProfile)) 
					 { hasAclProfile =true; break; }
				}
			}
		}	
		System.out.println(" ### END hasAclProfile :hasAclProfile: "+hasAclProfile );
		return hasAclProfile;
	}
	
	public static String getRubberBandValueXML( Rubberband rubberBand, String coordinates )
	{
		return "<rubberbandregions><rubberbandregion regionTypeId='0' regionName='"+rubberBand.getName()+"' " +
		"label='"+rubberBand.getName()+"' regionColor='ff0000' coordinates='"+coordinates+"' " +
		"viewPort='0gr-3E06lwKAw2nDw8G2EA' ecoexpmlIds='' refreshInterval='0' listType='moduleList'/></rubberbandregions>";	
		
	}
}


