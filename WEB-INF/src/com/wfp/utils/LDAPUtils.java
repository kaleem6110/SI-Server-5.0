package com.wfp.utils;

import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;
import javax.naming.ldap.InitialLdapContext;
import javax.naming.ldap.LdapContext;

import sun.security.util.Cache.CacheVisitor;

import lu.hitec.pss.soap.ds.out._15_x.AuthenticationException;
import lu.hitec.pss.soap.ds.out._15_x.AuthorizationException;
import lu.hitec.pss.soap.ds.out._15_x.DirectoryServiceOutInterface_PortType;
import lu.hitec.pss.soap.ds.out._15_x.DtoMission;
import lu.hitec.pss.soap.ds.out._15_x.ResourceNotFoundException;
import lu.hitec.pss.soap.ds.out._15_x.UnitType;

import com.enterprisehorizons.magma.server.admin.LDAPConfigUtils;
import com.enterprisehorizons.magma.server.util.Cache;
import com.enterprisehorizons.util.Logger;
import com.enterprisehorizons.util.PropertyFilesFactory;
import com.enterprisehorizons.util.StringUtils;
import com.spacetimeinsight.admin.server.util.IPropertyFileConstants;
import com.spacetimeinsight.db.model.util.SecurityDBUtils;
import com.wfp.jobs.LDAPCacheJob;
import com.wfp.security.form.DeviceBean;
import com.wfp.security.form.LDAPUserBean;

/**
 * Utility class for connecting & retrieveing the groups/devices/user information  from the LDAP
 * @author kmohammed
 *
 */
/**
 * @author kaleem.mohammed
 *
 */
@SuppressWarnings("unchecked")
public class LDAPUtils implements IEPICConstants {

	public static String LDAP_PROPERTIES_FILE = IPropertyFileConstants.PROPERTY_DIRECTORY + "ldap.properties";;
	private static String tokenId;
	private static Map<String, String> orgMap;
	public static List<String> ldapDeviceList;
	public static Map<String,String> countriesMap = new HashMap();
	public static Map<String,String> missionsMap = new HashMap();
	
	public static Map<String, String> getMissionsMap() {
		return missionsMap;
	}

	public static void setMissionsMap(Map<String, String> missionsMap) {
		LDAPUtils.missionsMap = missionsMap;
	}

	public static Map<String, String> getCountriesMap() {
		return countriesMap;
	}

	public static void setCountriesMap(Map<String, String> countriesMap) {
		LDAPUtils.countriesMap = countriesMap;
	}

	/**
	 * @return the orgMap
	 */
	public static Map<String, String> getOrgMap() {
		return orgMap;
	}

	/**
	 * @param orgMap the orgMap to set
	 */
	public static void setOrgMap(Map<String, String> orgMap) {
		LDAPUtils.orgMap = orgMap;
	}

	/**
	 * @return the tokenId
	 */
	private static String getTokenId() {
		return tokenId;
	}

	/**
	 * @param tokenId the tokenId to set
	 */
	private static void setTokenId(String tokenId) {
		LDAPUtils.tokenId = tokenId;
	}
	public static Properties getLDAProperties() {
		Logger.info("Initializing the ldap properties from ["+LDAP_PROPERTIES_FILE+"]", LDAPUtils.class);
		return PropertyFilesFactory.getInstance().getProperties(LDAP_PROPERTIES_FILE);
	}

	public static String getLDAPConfigValue(String configName){
		return getLDAProperties().getProperty(configName);
	}

	/**
	 * Static initialization of cache
	 */
	static{
		if(getLDAPUserDtlsMap() == null){			
			Cache.store(CACHE_LDAPUSER_DTLS, new HashMap<String, LDAPUserBean>());
		}
	}

	/**
	 * retrieves the cached ldap user beans
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static Map<String, LDAPUserBean> getLDAPUserDtlsMap(){
		return (Map<String, LDAPUserBean>) Cache.retrieve(CACHE_LDAPUSER_DTLS);
	}

	/**
	 * Retrieves the user bean for a particular device id.
	 * This method, if found retrieves from the cache else it requests the LDAP. Finally, it returns null.
	 * @param deviceId
	 * @return
	 */
	public static LDAPUserBean getLDAPUserBean(String deviceId){
		//check whether the cache is initialized
		if(getLDAPUserDtlsMap() == null ){
			return null;
		}

		return  getLDAPUserDtlsMap().get(deviceId);
	}

	/**
	 * return ldap context 
	 * Host: <code>WFPConfigUtils</code>
	 * Admin Name: <code>WFPConfigUtils</code>
	 * Password: <code>WFPConfigUtils</code>
	 * @return
	 * @throws NamingException
	 */
	public static LdapContext getLDAPContext() throws NamingException{
		return getLDAPContext(LDAPConfigUtils.getProviderUrl(), 
			LDAPConfigUtils.getSecurityPrincipal(), SecurityDBUtils.getDecreptedPassword(LDAPConfigUtils.getSecurityCredentials()));
		
		//return getLDAPContext("ldaps://ldap-dev.globalepic.lu:636","cn=sti-read,ou=ldapAccess,dc=emergency,dc=lu", "Sti4Stas2Read?" );
	}
	
	/**
	 * @return
	 * @throws NamingException
	 */
	public static String getSSOToken()throws NamingException
	{
		//System.out.println("START - LDAPUtils.getSSOToken");
		if( getLDAPContext()!= null )
		{
			if(getTokenId()==null||getTokenId()==""){
				setTokenId( EventServiceUtils.getLDAPToken() );
				//setTokenId( java.util.UUID.randomUUID().toString() ); 
				//System.out.println("SETTING: LDAPUtils.getSSOToken :getTokenId: "+getTokenId() );
			}
		}
		//System.out.println("START - LDAPUtils.getSSOToken :getTokenId: "+getTokenId() );
		return getTokenId();
	}

	/**
	 * overloaded method to return the LDAP Context usinf user id & password
	 * @param adminName
	 * @param adminPassword
	 * @return
	 * @throws NamingException
	 */
	public static LdapContext getLDAPContext(String adminName, String adminPassword ) throws NamingException{
		return getLDAPContext(LDAPConfigUtils.getProviderUrl(), adminName, adminPassword);
	}

	/**
	 * Overloaded method for getting the LDAP COntext based on the host,username, password
	 * @param host
	 * @param adminName
	 * @param adminPassword
	 * @return
	 * @throws NamingException
	 */
	@SuppressWarnings("unchecked")
	public static LdapContext getLDAPContext(String host, String adminName, String adminPassword ) throws NamingException{
		//Logger.info("Creating LDAP Context", LDAPUtils.class);
		Hashtable props = System.getProperties();
		props.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory" );
		props.put(Context.SECURITY_AUTHENTICATION, LDAP_SECURITY_AUTHENTICATION);
		props.put(Context.SECURITY_PRINCIPAL, adminName);
		props.put(Context.SECURITY_CREDENTIALS, adminPassword);
		props.put(Context.PROVIDER_URL, host);
		if(!StringUtils.isNull(LDAPConfigUtils.getTrustStorePath())){
			System.setProperty("javax.net.ssl.trustStore",LDAPConfigUtils.getTrustStorePath() );
			props.put(Context.SECURITY_PROTOCOL,"ssl");
		}
		//Logger.info("Completed creating LDAP Context for host ["+host+"]", LDAPUtils.class);
		return (new InitialLdapContext(props, null));
	}


	/**
	 * Search the LDAP based on default inputs. This method searches for <b>memberOf </b>
	 * @return
	 * @throws NamingException
	 */
	@SuppressWarnings("unchecked")
	public static NamingEnumeration getSearchResults(){

		// Specify the attributes to return
		String returnedAtts[] = {PROPERTY_MEMBER_OF};
		// Specify the search scope
		SearchControls searchCtls = new SearchControls();
		searchCtls.setSearchScope(SearchControls.SUBTREE_SCOPE);
		searchCtls.setReturningAttributes(returnedAtts);
		// Search for objects using the filter
		try {
			return  getSearchResults(getLDAPContext(), searchCtls, SEARCH_FILTER, LDAP_BASE);
		} catch (NamingException e) {
			Logger.error("Error occured while searching results : 181: getSearchResults():["+e.getLocalizedMessage()+"]", LDAPUtils.class);
		}
		return null;
	}

	/**
	 * Overloaded method for searching the LDAP based on the searchfilter & searchbase with contraint as "cn"
	 * @param searchFilter
	 * @param searchBase
	 * @return
	 * @throws NamingException
	 */
	@SuppressWarnings("unchecked")
	public static NamingEnumeration getSearchResults(String searchFilter, String searchBase){

		// Specify the attributes to return
		String returnedAtts[] = {PROPERTY_CN};
		// Specify the search scope
		SearchControls searchCtls = new SearchControls();
		searchCtls.setSearchScope(SearchControls.SUBTREE_SCOPE);
		searchCtls.setReturningAttributes(returnedAtts);
		// Search for objects using the filter
		try {
			return  getSearchResults(getLDAPContext(), searchCtls, searchFilter, searchBase);
		} catch (NamingException e) {
			Logger.error(" Error occured while searching results 206: getSearchResults(String searchFilter, String searchBase):["+e.getLocalizedMessage()+"]", LDAPUtils.class);
		}
		return null;
	}

	/**
	 * Overloaded method used to search the ldap based on the search controls, search gfilter & search base 
	 * @param searchCtls
	 * @param searchFilter
	 * @param searchBase
	 * @return
	 * @throws NamingException
	 */
	@SuppressWarnings("unchecked")
	public static NamingEnumeration getSearchResults(SearchControls searchCtls, String searchFilter, String searchBase) {
		//Logger.info("Peforming search on LDAP =============", LDAPUtils.class);
		// Search for objects using the filter
		try {
			//Logger.info("Search Filter ["+searchFilter+"]", LDAPUtils.class);
			//Logger.info("Search Base ["+searchBase+"]", LDAPUtils.class);
			return  getSearchResults(getLDAPContext(), searchCtls, searchFilter, searchBase);
		} catch (NamingException e) {
			Logger.error("Error occured while searching results :228:getSearchResults(SearchControls searchCtls, String searchFilter, String searchBase): ["+e.getLocalizedMessage()+"]", LDAPUtils.class);
		}
		return null;		
	}

	/**
	 * Used to search the LDAP based on the follwoing argumets
	 * @param ldapCtx
	 * @param searchCtls
	 * @param searchFilter
	 * @param searchBase
	 * @return
	 * @throws NamingException
	 */
	@SuppressWarnings("unchecked")
	public static NamingEnumeration getSearchResults(LdapContext ldapCtx, SearchControls searchCtls, String searchFilter, String searchBase){
		try{
			// Search for objects using the filter
			try {
				return  ldapCtx.search(searchBase, searchFilter, searchCtls);
			} catch (NamingException e) {
				Logger.error("Error occured while searching results : 249: getSearchResults(LdapContext ldapCtx, SearchControls searchCtls, String searchFilter, String searchBase)["+e.getLocalizedMessage()+"]", LDAPUtils.class);
			}
		}finally{
			if(ldapCtx != null){
				try {
					ldapCtx.close();
				} catch (NamingException e) {
					Logger.error("Error occured while closing the connection to LDAP ["+e.getLocalizedMessage()+"]", LDAPUtils.class);
				}
			}	
		}
		return null;
	}

	/**
	 * Overloaded method used to search the ldap based on the search constraints, search filter & search base 
	 * @param attrs
	 * @param searchFilter
	 * @param searchBase
	 * @return
	 * @throws NamingException
	 */
	@SuppressWarnings("unchecked")
	public static NamingEnumeration getSearchResults(String[] attrs, String searchFilter, String searchBase) {
		LdapContext ldapCtx = null;
		try{
			try {
				ldapCtx =  getLDAPContext();
			} catch (NamingException e) {
				Logger.error("Error occured while creating the connection to LDAP["+e.getLocalizedMessage()+"]", LDAPUtils.class);
			}
			if(ldapCtx == null){
				return null;
			}
			SearchControls searchCtls = getSimpleSearchControls(attrs);
			// Search for objects using the filter
			try {
				return  ldapCtx.search(searchBase, searchFilter, searchCtls);
			} catch (NamingException e) {
				Logger.error("Error occured while searching results :288: getSearchResults(String[] attrs, String searchFilter, String searchBase): ["+e.getLocalizedMessage()+"]", LDAPUtils.class);
			}
		}finally{
			if(ldapCtx != null){
				try {
					ldapCtx.close();
				} catch (NamingException e) {
					Logger.error("Error occured while closing connection to LDAP ["+e.getLocalizedMessage()+"]", LDAPUtils.class);
				}
			}	
		}
		return null;
	}

	/**
	 * returns the list of member(s) for which the device is mapped.
	 * @param deviceId
	 * @return
	 */
	public static List getGroupMembers(String deviceId){
		//Logger.info("Retrieving members from groups for a device id ["+deviceId+"]", LDAPUtils.class);
		return parseDataAsList(getSearchResults(CONSTRAINT_MEMBER,FILTER_GRP_NAMES.replace(REPLACE_DEVICE_TOKEN, deviceId), DOMAIN_GRP_NAMES));
	}
	//Kaleem-05/02/14
	public static List getDevicesForUser(String uid)
	{
		return parseDataAsList( getSearchResults( CONSTRAINT_DEVICE_MEMBER,FILTER_UID.replace(REPLACE_UID_TOKEN, uid ), LDAP_BASE ) );
    }
	public static List getDevicesForVehicle(String vehicleId)
	{
		return parseDataAsList( getSearchResults( CONSTRAINT_DEVICE_MEMBER,FILTER_CN.replace(REPLACE_CN_TOKEN, vehicleId ), VEHICLE_BASE ) );
    }
    public static List getUserDeviceMembers(String deviceId)
    {
    	return parseDataAsList( getSearchResults( CONSTRAINT_DEVICE_MEMBER,FILTER_GRP_NAMES.replace(REPLACE_DEVICE_TOKEN, deviceId ), LDAP_BASE ) );
    }
    public static List getUserByDevice(String deviceId)
    {
    	return parseDataAsList( getSearchResults( CONSTRAINT_UID,FILTER_DEVICE.replace(REPLACE_DEVICE_TOKEN, deviceId ), LDAP_BASE ) );
    }
    public static List getVehicleByDevice(String deviceId)
    {
    	//Logger.debug("Retrieving vehicles for a device id ["+deviceId+"]", LDAPUtils.class);    	
    	return parseDataAsList( getSearchResults( CONSTRAINT_CN,FILTER_DEVICE.replace(REPLACE_DEVICE_TOKEN, deviceId ), VEHICLE_BASE ) );
    }
    public static List getVehicleDeviceMembers(String deviceId)
    {
    	//Logger.debug("Retrieving members from users for a device id ["+deviceId+"]", LDAPUtils.class);    	
    	return parseDataAsList( getSearchResults( CONSTRAINT_DEVICE_MEMBER,FILETER_VEHICLE_UNIT_NAMES.replace(REPLACE_DEVICE_TOKEN, deviceId ), VEHICLE_BASE ) );
    }
    public static List getAirplaneDeviceMembers(String deviceId)
    {
    	//Logger.debug("Retrieving members from users for a device id ["+deviceId+"]", LDAPUtils.class);    	
    	return parseDataAsList( getSearchResults( CONSTRAINT_DEVICE_MEMBER,FILTER_AIRPLANE_UNIT.replace(REPLACE_DEVICE_TOKEN, deviceId ), VEHICLE_BASE ) );
    }
   
	
	
	/**
	 * @param deviceId
	 * @return
	 */
	public static String getUserDomain(String deviceId)
	{
		try
		{
			//Logger.info("Retrieving user for a device id ["+deviceId+"]", LDAPUtils.class);
			//List<String> userDeviceList = getGroupMembers(deviceId);
			List<String> userDeviceList = getUserByDevice(deviceId); 
			if(userDeviceList != null)
			{
				for(int i=0; i<userDeviceList.size();i++){ 
					if(userDeviceList.get(i)!=null){ //System.out.println( " :"+userDeviceList.get(i) );
						return FILTER_USER.replace(REPLACE_UID_TOKEN,userDeviceList.get(i) );
					}
				}
			}
		} catch (Exception e) {
			Logger.error("Error occured while retrieving the user domain for device id =  ["+deviceId+"] ["+e.getLocalizedMessage()+"]", LDAPUtils.class);
		}
		return null;
	}

	public static void main(String a[])
	{
	}
	/**
	 * returns all the devices
	 * @return
	 */
	public static List getDevices(){
		Logger.info("Retrieving all devices from LDAP", LDAPUtils.class);
		List<String> ldapDeviceList = parseDataAsList(getSearchResults(FILTER_MW_DEVICES, DEVICES_SEARCHBASE));
		setLdapDeviceList(ldapDeviceList);
		return ldapDeviceList;
	}
	public static List getAllStaffDevices(){
		Logger.info("Retrieving all staff devices from LDAP", LDAPUtils.class);
		List<String> ldapDeviceList = parseDataAsList(getSearchResults(CONSTRAINT_DEVICE_MEMBER, FILTER_ASSIGNED_DEVIES, LDAP_BASE));
		List<String> list = new ArrayList<String>();
		if(ldapDeviceList!=null&&ldapDeviceList.size()>0)
		{
			for(String device: ldapDeviceList )
			{
				device = device.replace(",ou=devices,dc=emergency,dc=lu", "" );
				device =device.replace("cn=","");
				list.add(device);
			}
		}
		return list;
	}
	public static List getAllVehicleDevices(){
		Logger.info("Retrieving all staff devices from LDAP", LDAPUtils.class);
		List<String> ldapDeviceList = parseDataAsList(getSearchResults(CONSTRAINT_DEVICE_MEMBER, FILTER_ASSIGNED_DEVIES_VEHICLE, VEHICLE_BASE ));		
		List<String> list = new ArrayList<String>();
		if(ldapDeviceList!=null&&ldapDeviceList.size()>0)
		{
			for(String device: ldapDeviceList )
			{
				device = device.replace(",ou=devices,dc=emergency,dc=lu", "" );
				device =device.replace("cn=","");
				list.add(device);
			}
		}
		return list;
	}
	public static List getAllAirplaneDevices(){
		Logger.info("Retrieving all staff devices from LDAP", LDAPUtils.class);
		List<String> ldapDeviceList = parseDataAsList(getSearchResults(CONSTRAINT_DEVICE_MEMBER, FILTER_ASSIGNED_DEVIES_AIRPLANE, VEHICLE_BASE ));		
		List<String> list = new ArrayList<String>();
		if(ldapDeviceList!=null&&ldapDeviceList.size()>0)
		{
			for(String device: ldapDeviceList )
			{
				device = device.replace(",ou=devices,dc=emergency,dc=lu", "" );
				device =device.replace("cn=","");
				list.add(device);
			}
		}
		return list;
	}

	/**
	 * returns all the users
	 * @return
	 */
	public static List getUsers(){
		Logger.info("Retrieving all users from LDAP", LDAPUtils.class);
		return parseDataAsList(getSearchResults(FILTER_LDAP_USERS, USERS_SEARCHBASE));
	}

	/**
	 * returns map of all user attributes
	 * @param userDomain
	 * @return
	 */
	public static Map<String, Object> getUserAttributes(String userDomain, String node)
	{		
		if(StringUtils.isNull(node)) node = FILTER_LDAP_USERS;
		//Logger.info("Retrieving User ["+userDomain+"] attributes from Node ["+node+"]", LDAPUtils.class);
		return parseDataAsMap(getSearchResults(CONSTRAINT_ATTR_USERS, node, userDomain), 
				"mail,communicationUri,otherPhones,personalTitle,o,ou,primaryMail");
	}
	public static Map<String, Object> getVehicleAttributes(String vehicleDomain, String node)
	{		
		if(StringUtils.isNull(node))node = FILTER_LDAP_VEHICLES;
		//Logger.info("Retrieving Vehicle ["+vehicleDomain+"] attributes from Node ["+node+"]", LDAPUtils.class);
		return parseDataAsMap(getSearchResults(CONSTRAINT_ATTR_VEHICLE, node, vehicleDomain), "communicationUri,o");
	}
	public static Map<String, Object> getFenceAttributes(String fenceDomain, String node)
	{		
		if(StringUtils.isNull(node)) node = FILTER_LDAP_FENCE;
		Logger.info("Retrieving Fence ["+fenceDomain+"] attributes from Node ["+node+"]", LDAPUtils.class);
		return parseDataAsMap(getSearchResults(CONSTRAINT_ATTR_FENCE, node, fenceDomain ), 
				"cn,listOfPoints,type,description,member");
	}
	/**
	 * setting the user bean details after requesting the LDAP
	 * @param deviceId
	 */
	public  static void setLDAPUserDtls(String deviceId, String type, String token , DirectoryServiceOutInterface_PortType stub )
	{
		List<String> missionsList = null;
		if(KEY_STAFF.equalsIgnoreCase(type))
		{
			String userDomain = getUserDomain(deviceId); 
			if(userDomain != null)
			{
				//Caching started for device
				cacheLDAPUserDtls(deviceId, getUserAttributes(userDomain, null), token, type ); 
				missionsList = getTrackMeMissionsList(deviceId, token, stub ); 
				//Logger.info("Available Mission from  ["+deviceId+"] are ["+missionsList+"]", LDAPUtils.class);
			}
		}
		else  if(KEY_VEHICLE.equalsIgnoreCase(type) || KEY_AIRPLANE.equalsIgnoreCase(type))
		{
			Logger.debug(" 1 :" , LDAPUtils.class );
			List<String> membersList = getVehicleByDevice(deviceId); 
			Logger.debug(" membersList :"+membersList , LDAPUtils.class );
			if(membersList != null)
			{				
				for(String member:membersList) 
				{
					Map<String,Object> map=getVehicleAttributes(FILTER_VEHICLES.replace(FILTER_VEHICLE_ID, member ), FILTER_LDAP_VEHICLES);
					cacheLDAPVehicleDtls( deviceId, map, token, type );	
				}	
			}
			missionsList = getVehiclesMissionsList( deviceId, token, stub );	
			
		}
		LDAPUserBean userbean = LDAPUtils.getLDAPUserBean(deviceId); 
		if(userbean != null)
		{
			userbean.setDeviceId(deviceId);	
			userbean.setAuthorizedGroupsList(missionsList);
		}
	}

	

	/**
	 * setting the user bean details after requesting the LDAP
	 * @param deviceId
	 */
	public static void setLDAPUserDtls(DeviceBean deviceBean, String type)
	{
		if(KEY_STAFF.equalsIgnoreCase(type)){
			String userDomain = getUserDomain(deviceBean.getName());
			if(userDomain != null){
				retrieveLDAPUserDtls(getUserAttributes(userDomain, null), deviceBean);
			}
		}else  if(KEY_VEHICLE.equalsIgnoreCase(type) || KEY_AIRPLANE.equalsIgnoreCase(type)){
			String allGroupNamesFilter = getLDAPConfigValue("device.search.base").replace("<replacestr>", deviceBean.getName());//"cn="+deviceBean.getName()+",ou=devices,dc=emergency,dc=lu";
			String allGroupsSearchBase = getLDAPConfigValue("groups.search.base");
			List<String> membersList = parseDataAsList(getSearchResults(new String[] {"member"},"(member="+allGroupNamesFilter+")", allGroupsSearchBase));

			if(membersList != null){				
				for(String member:membersList){					
					if(!allGroupNamesFilter.equalsIgnoreCase(member)){
						retrieveLDAPUserDtls(getUserAttributes(member, FILTER_LDAP_VEHICLES), deviceBean);
					}						
				}				
			}
		}
	}
	public static void populateDeviceBean(LDAPUserBean userbean, DeviceBean deviceBean)
	{
		if(userbean != null && deviceBean!=null)
		{
			deviceBean.setCn(userbean.getCn());
			deviceBean.setHomePhone(userbean.getHomePhone());
			deviceBean.setMail(userbean.getMail());
			deviceBean.setMobilesList(userbean.getMobilesList());
			deviceBean.setOrganization(userbean.getOrganization());
			deviceBean.setSkypePager(userbean.getSkypePager());
			deviceBean.setUid(userbean.getUid());
			deviceBean.setSn(userbean.getSn());
			deviceBean.setDescription(userbean.getDescription());
			deviceBean.setLicensePlate(userbean.getLicensePlate());
			deviceBean.setTitle(userbean.getTitle()); //()
			deviceBean.setPersonalTitle(userbean.getPersonalTitle());
			deviceBean.setDepartment(userbean.getDepartment());
			deviceBean.setPrimaryEmail(userbean.getPrimaryEmail());
			deviceBean.setPhotoString( userbean.getPhotoString() );
			deviceBean.setGender( userbean.getGender() );
			deviceBean.setShortOrganization(userbean.getShortOrganization());
			deviceBean.setUnit( userbean.getUnit() );
			deviceBean.setDeviceId( userbean.getDeviceId() );
			deviceBean.setStreet( userbean.getStreet());
			deviceBean.setLocality( userbean.getLocality() );
			deviceBean.setPostalCode( userbean.getPostalCode() );
			deviceBean.setCountry( userbean.getCountry() );
		}
	}
	/**
	 * @param deviceBean
	 */
	public static void setLDAPUserDtls(DeviceBean deviceBean)
	{
		if(deviceBean != null)
		{
			LDAPUserBean userbean = getLDAPUserBean(deviceBean.getName());			
			if(userbean != null)
			{
				deviceBean.setCn(userbean.getCn());
				deviceBean.setHomePhone(userbean.getHomePhone());
				deviceBean.setMail(userbean.getMail());
				deviceBean.setMobilesList(userbean.getMobilesList());
				deviceBean.setOrganization(userbean.getOrganization());
				deviceBean.setSkypePager(userbean.getSkypePager());
				deviceBean.setUid(userbean.getUid());
				deviceBean.setSn(userbean.getSn());
				deviceBean.setDescription(userbean.getDescription());
				deviceBean.setLicensePlate(userbean.getLicensePlate());
				deviceBean.setTitle(userbean.getTitle()); //()
				deviceBean.setPersonalTitle(userbean.getPersonalTitle());
				deviceBean.setDepartment(userbean.getDepartment());
				deviceBean.setPrimaryEmail(userbean.getPrimaryEmail());
				deviceBean.setPhotoString( userbean.getPhotoString() );
				deviceBean.setGender( userbean.getGender() );
				deviceBean.setShortOrganization(userbean.getShortOrganization());
				deviceBean.setStreet( userbean.getStreet());
				deviceBean.setLocality( userbean.getLocality() );
				deviceBean.setPostalCode( userbean.getPostalCode() );
				deviceBean.setCountry( userbean.getCountry() );
			} //System.out.println(" ### "+deviceBean.getCn()+" "+deviceBean.getSn()+" "+deviceBean.getPrimaryEmail() );
		}		
	}

	/**
	 * Caching the user bean details based on the device id
	 * @param deviceId
	 * @param userAttributes
	 */
	public static void retrieveLDAPUserDtls(Map<String, Object> userAttributes,
			DeviceBean deviceBean) 
	{
		if(userAttributes != null)
		{
			deviceBean.setCn(userAttributes.get(PROPERTY_CN) == null?"":userAttributes.get(PROPERTY_CN).toString());
			deviceBean.setHomePhone(userAttributes.get(PROPERTY_HOME_PHONE) == null?"":userAttributes.get(PROPERTY_HOME_PHONE).toString());
			deviceBean.setMail((userAttributes.get(PROPERTY_MAIL) == null?null: (List<String>) userAttributes.get(PROPERTY_MAIL)));
			deviceBean.setMobilesList(userAttributes.get(PROPERTY_MOBILE) == null?null: (List<String>) userAttributes.get(PROPERTY_MOBILE) );
			deviceBean.setOrganization(userAttributes.get(PROPERTY_ORGANIZATION)== null?"":userAttributes.get(PROPERTY_ORGANIZATION).toString());
			deviceBean.setSkypePager(userAttributes.get(PROPERTY_PAGER)== null?null:(List<String>) userAttributes.get(PROPERTY_PAGER)); 
			//System.out.println(" userAttributes.get(PROPERTY_vehicleID ) : "+ userAttributes.get(PROPERTY_vehicleID ) );
			deviceBean.setVehicleID(userAttributes.get(PROPERTY_vehicleID)== null?null:(List<String>) userAttributes.get(PROPERTY_vehicleID ));
			deviceBean.setUid(userAttributes.get(PROPERTY_UID)== null?"":userAttributes.get(PROPERTY_UID).toString());
			deviceBean.setSn(userAttributes.get(PROPERTY_SN)== null?"":userAttributes.get(PROPERTY_SN).toString());
			deviceBean.setStreet( userAttributes.get(PROPERTY_STREET) == null?"":userAttributes.get(PROPERTY_STREET ).toString());
			deviceBean.setLocality( userAttributes.get(PROPERTY_L) == null?"":userAttributes.get(PROPERTY_L ).toString());
			deviceBean.setPostalCode(userAttributes.get(PROPERTY_ZIP ) == null?"":userAttributes.get(PROPERTY_ZIP ).toString());
			deviceBean.setCountry( userAttributes.get(PROPERTY_COUNTRY)== null?"":userAttributes.get(PROPERTY_COUNTRY).toString()); 
			deviceBean.setDescription(userAttributes.get(PROPERTY_DESCRIPTION)== null?"":userAttributes.get(PROPERTY_DESCRIPTION).toString());
			deviceBean.setLicensePlate( getLicensePlate( (String) (userAttributes.get(PROPERTY_vehicleID)== null?null: userAttributes.get(PROPERTY_vehicleID)) ));
			deviceBean.setTitle(userAttributes.get(PROPERTY_TITLE)== null?"":userAttributes.get(PROPERTY_TITLE).toString());
			deviceBean.setPersonalTitle(userAttributes.get(PROPERTY_PERSONAL_TITLE)== null?"":userAttributes.get(PROPERTY_PERSONAL_TITLE).toString());
			deviceBean.setDepartment(userAttributes.get(PROPERTY_DEPT)== null?"":userAttributes.get(PROPERTY_DEPT).toString());		}
			deviceBean.setPrimaryEmail(userAttributes.get(PROPERTY_PRIMARY_MAIL)== null?"":userAttributes.get(PROPERTY_PRIMARY_MAIL).toString());	
			deviceBean.setPhotoString( getUserImageAsString( deviceBean.getUid()) );
			deviceBean.setGender(userAttributes.get(PROPERTY_GENDER)== null?"":userAttributes.get(PROPERTY_GENDER).toString() );
			deviceBean.setShortOrganization(deviceBean.getOrganization() );
	}
	public static void retrieveFences( Map<String,Object> fenceAttributes)
	{
		if( fenceAttributes!=null )
		{
			
		}
	}
 public static String getLicensePlate(String str)
 {
	if( str!=null&& !str.isEmpty()){
		
		if(str.indexOf(PROPERTY_VEHICLE_REG_PLATE)>-1)
			return str.replace(PROPERTY_VEHICLE_REG_PLATE+":", "");
	}
	 return "";
 }
	/**
	 * Caching the user bean details based on the device id
	 * @param deviceId
	 * @param userAttributes
	 */
	public  static void cacheLDAPUserDtls(String deviceId,
			Map<String, Object> userAttributes, String token , String type ) 
	{
		Logger.debug(" START of cacheLDAPUserDtls ", LDAPUtils.class );
		Logger.debug("DEBUG LDAP User Details: ["+deviceId+"]  ["+userAttributes+"]", LDAPUtils.class);
		if( deviceId!=null && !deviceId.isEmpty() )
		{		
			try
			{		
				Logger.debug("DEBUG678 before getting the UserBean object from LDAP userAttributes ", LDAPUtils.class );
				LDAPUserBean userBean = getLDAPUserBean(userAttributes);
				userBean.setDeviceId( deviceId );		
				userBean.setUnit( type );
				Logger.debug("DEBUG OUtput : deviceId "+deviceId+" :uid :"+ userBean.getUid() + " :cn:" + userBean.getCn()+
						": unit:"+userBean.getUnit() +":userBean.getDeviceId() :"+userBean.getDeviceId() ,LDAPUtils.class );				
				//if( isUniqueDevice(getLDAPUserDtlsMap(), userBean ) );				
				getLDAPUserDtlsMap().put(deviceId, userBean );				
				Logger.debug("DEBUG Added "+deviceId +" to cache map" ,LDAPUtils.class );
			}
			catch(Exception e){ e.printStackTrace(); System.out.println(" 683 : "+e.getMessage() );}
		}

		Logger.debug(" End of cacheLDAPUserDtls ", LDAPUtils.class );
	}
	public static boolean isUniqueDevice( Map<String, LDAPUserBean> map, LDAPUserBean currentBean )
	{
		for (Map.Entry<String, LDAPUserBean> entry : map.entrySet()) 
		{
			//System.out.println("Key : " + entry.getKey() + " Value : "+ entry.getValue());			
			LDAPUserBean userBean = entry.getValue();
			if( userBean.getPrimaryEmail().equals( currentBean.getPrimaryEmail() ) ) 
			{   
				userBean.setDeviceId( userBean.getDeviceId()+" "+ currentBean.getDeviceId() );
				return false;
			}
		}
		return true;
	}
	public synchronized static void cacheLDAPVehicleDtls(String deviceId,
			Map<String, Object> vehicleAttributes ,String token , String type ) 
	{		
		Logger.debug(" START of cacheLDAPVehicleDtls " , LDAPUtils.class);
		Logger.debug("DEBUGLDAP Vehicle Details: ["+deviceId+"]  ["+vehicleAttributes+"]", LDAPUtils.class);
		if( deviceId!=null && !deviceId.isEmpty() )
		{
			LDAPUserBean userBean = getLDAPUserBean(vehicleAttributes);//System.out.println(" vehicleAttributes :"+ vehicleAttributes );
			userBean.setUnit( type );
			userBean.setDeviceId(deviceId);
			getLDAPUserDtlsMap().put(deviceId, userBean );
		}
		
		Logger.debug(" END of cacheLDAPVehicleDtls " , LDAPUtils.class);
		
	}


	/**
	 * populates the user bean
	 * @param map
	 * @return
	 */
	private static LDAPUserBean getLDAPUserBean(Map<String, Object> userAttributes){
		LDAPUserBean userBean = null; 
		if(userAttributes != null){

			userBean = new LDAPUserBean();
			userBean.setCn(userAttributes.get(PROPERTY_CN) == null?"":userAttributes.get(PROPERTY_CN).toString());
			userBean.setStreet( userAttributes.get(PROPERTY_STREET) == null?"":userAttributes.get(PROPERTY_STREET ).toString());
			userBean.setLocality( userAttributes.get(PROPERTY_L) == null?"":userAttributes.get(PROPERTY_L ).toString());
			userBean.setPostalCode(userAttributes.get(PROPERTY_ZIP ) == null?"":userAttributes.get(PROPERTY_ZIP ).toString());
			userBean.setCountry( userAttributes.get(PROPERTY_COUNTRY)== null?"":userAttributes.get(PROPERTY_COUNTRY).toString()); 
			
			userBean.setHomePhone(userAttributes.get(PROPERTY_HOME_PHONE) == null?"":userAttributes.get(PROPERTY_HOME_PHONE).toString());
			userBean.setMail( (userAttributes.get(PROPERTY_MAIL) == null?null:(List<String>)userAttributes.get(PROPERTY_MAIL)));
			userBean.setMobilesList(userAttributes.get(PROPERTY_MOBILE) == null?null:(List<String>)userAttributes.get(PROPERTY_MOBILE) );
			if(userAttributes.get(PROPERTY_ORGANIZATION)!= null && userAttributes.get(PROPERTY_ORGANIZATION) instanceof List){
				userBean.setOrganization(userAttributes.get(PROPERTY_ORGANIZATION)== null?"":((List<String>)userAttributes.get(PROPERTY_ORGANIZATION)).get(0));
				//Kaleem - 
				//System.out.println("b4 userbean.getOrg"+userBean.getOrganization() + "getOrgMap() "+getOrgMap() );
				userBean.setShortOrganization(userBean.getOrganization());
				if( getOrgMap()==null)  LDAPUtils.getAllOrganizations(); 
				else  userBean.setOrganization(getOrgMap().get(userBean.getOrganization() ) );
				
			}else if(userAttributes.get(PROPERTY_ORGANIZATION)!= null) {
				userBean.setOrganization(userAttributes.get(PROPERTY_ORGANIZATION).toString());
			}
			//System.out.println("after userbean.getOrg"+userBean.getOrganization() );
			//System.out.println(" userAttributes.get(PROPERTY_vehicleID ) : "+ userAttributes.get(PROPERTY_vehicleID ) );
			//userBean.setVehicleID(userAttributes.get(PROPERTY_vehicleID)== null?null:userAttributes.get(PROPERTY_vehicleID ));
			
			userBean.setSkypePager(userAttributes.get(PROPERTY_PAGER)== null?null:(List<String>)userAttributes.get(PROPERTY_PAGER));
			userBean.setUid(userAttributes.get(PROPERTY_UID)== null?"":userAttributes.get(PROPERTY_UID).toString());
			userBean.setSn(userAttributes.get(PROPERTY_SN)== null?"":userAttributes.get(PROPERTY_SN).toString());
			userBean.setDescription(userAttributes.get(PROPERTY_DESCRIPTION)== null?"":userAttributes.get(PROPERTY_DESCRIPTION).toString());
			userBean.setLicensePlate(getLicensePlate ( (String) userAttributes.get(PROPERTY_vehicleID ) ) );
			userBean.setTitle(userAttributes.get(PROPERTY_TITLE)== null?"":userAttributes.get(PROPERTY_TITLE).toString());
			userBean.setPersonalTitle(userAttributes.get(PROPERTY_PERSONAL_TITLE)== null?"":userAttributes.get(PROPERTY_PERSONAL_TITLE).toString().replace("[","").replace("]","") );
			userBean.setPrimaryEmail(userAttributes.get(PROPERTY_PRIMARY_MAIL)== null?"":userAttributes.get(PROPERTY_PRIMARY_MAIL).toString().replace("[","").replace("]",""));
			userBean.setDepartment(userAttributes.get(PROPERTY_DEPT)== null?"":userAttributes.get(PROPERTY_DEPT).toString().replace("[","").replace("]","") );
			//System.out.println(" Pager: "+userBean.getSkypePager()   );
			userBean.setGender( userAttributes.get(PROPERTY_GENDER)== null?"":userAttributes.get(PROPERTY_GENDER).toString() );
			userBean.setPhotoString( getUserImageAsString( userBean.getUid()) );
			userBean.setInternalID( userAttributes.get(PROPERTY_INTERNAL_ID)== null?"":userAttributes.get(PROPERTY_INTERNAL_ID).toString() );
			
			return userBean;
		}
		return null;
	}


	/**
	 * Prints all users in LDAP
	 */
	public static void getAllUsersData(){
		String allUserFilter = "(objectClass=person)";
		// Specify the Base for the search
		String allPersonsSearchBase = getLDAPConfigValue("users.search.base");//"ou=users,ou=people,dc=emergency,dc=lu";
		parseData(getSearchResults(allUserFilter, allPersonsSearchBase));
	}

	/**
	 * prints all devices in LDAP
	 */
	public static void getAllDevicesData(){
		String allMWDevicesFilter = "(objectClass=mwdevice)";
		// Specify the Base for the search
		String allDevicesSearhBase = getLDAPConfigValue("devices.search.base");//"ou=devices,dc=emergency,dc=lu";
		parseData(getSearchResults(allMWDevicesFilter, allDevicesSearhBase));
	}

	/**
	 * Prints user assigned to a device
	 */
	public static void getUser4rDevice(){
		String allGroupNamesFilter = "(member=cn=trackMe9750,ou=devices,dc=emergency,dc=lu)";
		String allGroupsSearchBase = "ou=groups,dc=emergency,dc=lu";
		parseData(getSearchResults(new String[] {"member"},allGroupNamesFilter, allGroupsSearchBase));
	}

	/**
	 * prints all groups in LDAP
	 */
	public static void getAllGroupData(){
		String allUserFilter = "(objectClass=groupOfNames)";
		// Specify the Base for the search
		String allPersonsSearchBase = getLDAPConfigValue("profiles.search.base");//"ou=acl_profiles,ou=people,dc=emergency,dc=lu";
		parseData(getSearchResults(allUserFilter, allPersonsSearchBase));
	}

	/**
	 * Prints all groups for a user
	 */
	public static void getAllGroups4rUser(){
		String allGroupNamesFilter = "(member=uid=sti-user,ou=users,ou=people,dc=emergency,dc=lu)";
		String allGroupsSearchBase = "ou=acl_profiles,ou=people,dc=emergency,dc=lu";
		parseData(getSearchResults(new String[] {"cn"},allGroupNamesFilter, allGroupsSearchBase));
	}

	/**
	 * prints all missions in LDAP
	 */
	public static List<String> getAllMissions(){
		String allGroupNamesFilter = "(objectClass=mission)";
		String allGroupsSearchBase = getLDAPConfigValue("missions.search.base");//"ou=missions,dc=emergency,dc=lu";
		Logger.info("Retrieve all missions from ldap with Search Filter = ["+allGroupNamesFilter+"] " +
				"and Search Base = ["+allGroupsSearchBase+"] on Constraint = [uniqueId]", LDAPUtils.class);
		return  parseDataAsList(getSearchResults(new String[] {"uniqueId"},allGroupNamesFilter, allGroupsSearchBase));
	}

	/**
	 * Retrieves all the missions as List <String> from LDAP
	 * @return
	 */
	public static List<String> getAllMissionsAsList(){
		String allGroupNamesFilter = "(objectClass=mission)";
		String allGroupsSearchBase = getLDAPConfigValue("missions.search.base");//"ou=missions,dc=emergency,dc=lu";
		Logger.info("Retrieve all taskforces for missions from ldap with Search Filter = ["+allGroupNamesFilter+"] " +
				"and Search Base = ["+allGroupsSearchBase+"] on Constraint = [tfMember]", LDAPUtils.class);
		return parseDataAsList(getSearchResults(new String[] {"tfMember"},allGroupNamesFilter, allGroupsSearchBase));
	}

	/**
	 * Prints all the task forces for a User in  LDAP
	 */
	public static void getAllTaskForces4rUser(){
		String allGroupNamesFilter = "(member=uid=avelala,ou=users,ou=people,dc=emergency,dc=lu)";
		String allGroupsSearchBase = getLDAPConfigValue("missions.search.base");//"ou=missions,dc=emergency,dc=lu";
		parseData(getSearchResults(new String[] {"uniqueId"},allGroupNamesFilter, allGroupsSearchBase));
	}

	/**
	 * Retrieves all the task forces as List <String> for an User in LDAP
	 * @return
	 */
	public static List<String> getAllTaskForces4rUser(String userId){
		String allGroupNamesFilter = getLDAPConfigValue("user.member.identifier").replace("<replacestr>", userId);//"(member=uid="+userId+",ou=users,ou=people,dc=emergency,dc=lu)";
		String allGroupsSearchBase = getLDAPConfigValue("missions.search.base");//"ou=missions,dc=emergency,dc=lu";
		Logger.info("Retrieve all taskforces for a user ["+userId+"] from ldap with Search Filter = ["+allGroupNamesFilter+"] " +
				"and Search Base = ["+allGroupsSearchBase+"] on Constraint = [tfMember]", LDAPUtils.class);
		return  parseDataAsList(getSearchResults(new String[] {"tfMember"},allGroupNamesFilter, allGroupsSearchBase));
	}

	/**
	 * Prints all the domains for a User in  LDAP
	 */
	public static void getAllDomainsOnTaskForces4rUser(){
		String allGroupNamesFilter = "(uniqueID=Pakistan_support)";
		String allGroupsSearchBase = "ou=taskForces,dc=emergency,dc=lu";
		parseData(getSearchResults(new String[] {"member"},allGroupNamesFilter, allGroupsSearchBase));
	}

	/**
	 * Retrieves all the task forces as List <String> for an Task Force in LDAP
	 * @return
	 */
	public static List<String>  getAllDomainsOnTaskForces(String taskForceId){
		taskForceId = taskForceId.substring(taskForceId.indexOf("=")+1, taskForceId.indexOf(","));
		String allGroupNamesFilter = "(uniqueID="+taskForceId+")";
		String allGroupsSearchBase = getLDAPConfigValue("taskforces.search.base");//"ou=taskForces,dc=emergency,dc=lu";
		Logger.info("Retrieve all domains for a taskforce ["+taskForceId+"] from ldap with Search Filter = ["+allGroupNamesFilter+"] " +
				"and Search Base = ["+allGroupsSearchBase+"] on Constraint = [member]", LDAPUtils.class);
		return parseDataAsList(getSearchResults(new String[] {"member"},allGroupNamesFilter, allGroupsSearchBase));
	}

	/**
	 * prints  all the devices for a domain  in LDAP
	 * @return
	 */
	public static void getAllDeviceInDomain(){
		String allGroupNamesFilter = "(domain=cn=default,cn=mw-A1-service,ou=middlewares,dc=emergency,dc=lu)";
		String allGroupsSearchBase =  getLDAPConfigValue("devices.search.base");//"ou=devices,dc=emergency,dc=lu";
		parseData(getSearchResults(new String[] {"cn"},allGroupNamesFilter, allGroupsSearchBase));
	}

	/**
	 * Retrieves all the devices in a domain  as List <String> for an domain id in LDAP
	 * @return
	 */
	public static List<String>  getAllDeviceInDomain(String domainId){
		String allGroupNamesFilter = "(domain="+domainId+")";
		String allGroupsSearchBase = getLDAPConfigValue("devices.search.base");//"ou=devices,dc=emergency,dc=lu";
		Logger.info("Retrieve all devices for a domain ["+domainId+"] from ldap with Search Filter = ["+allGroupNamesFilter+"] " +
				"and Search Base = ["+allGroupsSearchBase+"] on Constraint = [cn]", LDAPUtils.class);
		return parseDataAsList(getSearchResults(new String[] {"cn"},allGroupNamesFilter, allGroupsSearchBase));
	}


	/**
	 * Map<taskforceId, List<domainIds>>
	 * @return
	 */
	public static Map<String, List<String>> getAllDomainsOnMissionMap(){
		Map<String, List<String>> allMissionDevicesMap = null;
		List<String> allMissionsList = getAllMissionsAsList();
		if(allMissionsList != null){
			allMissionDevicesMap = new HashMap();
			for (String taskforceId:allMissionsList){
				if(!StringUtils.isNull(taskforceId)){
					List<String> allDomainsList = getAllDomainsOnTaskForces(taskforceId);
					if(allDomainsList != null){
						allMissionDevicesMap.put(taskforceId, allDomainsList);
						//System.out.println("Mission Name: " + taskforceId + " Total Devices: "+allDomainsList.size());
					}
				}
			}
			return allMissionDevicesMap;
		}
		return null;
	}

	/**
	 * Map<domainId, List<deviceId>>
	 * @return
	 */
	public static Map<String, List<String>> getAllDevicesOnDomainMap(){
		Map<String, List<String>> allDomainsOnMissionList = getAllDomainsOnMissionMap();
		Map<String, List<String>> allDevicesOnDomainMap = null;
		if(allDomainsOnMissionList != null){
			allDevicesOnDomainMap = new HashMap<String, List<String>>();
			for(Map.Entry<String, List<String>> entry: allDomainsOnMissionList.entrySet()){
				List<String> allDomains = entry.getValue();
				if(allDomains != null){
					for(String domainId:allDomains){
						if(allDevicesOnDomainMap.get(domainId) == null){
							List<String> allDevicesList = getAllDeviceInDomain(domainId);
							allDevicesOnDomainMap.put(domainId, allDevicesList);
						}
					}
				}
			}
		}
		return allDevicesOnDomainMap;
	}

	/**
	 * Map<placeid, Map<attrName, attrValue>>
	 * @return
	 */
	public static Map getAllPlaces()
	{
		String allGroupNamesFilter = "(objectClass=place)";
		String allGroupsSearchBase = getLDAPConfigValue("places.search.base");//"ou=places,ou=resources,dc=emergency,dc=lu";
		String[] attrArray = new String[] {"cn","externalID", "description", "street", "type", "coord-latitude","coord-longitude", "ocs", "skype" ,"displayName","o","c","locality","mail","otherPhones"};
		Logger.info("Retrieve all places from ldap with Search Filter = ["+allGroupNamesFilter+"] " +
				"and Search Base = ["+allGroupsSearchBase+"] on Constraint = [cn,externalID, description, street, type, coord-latitude,coord-longitude, ocs, skype ]", LDAPUtils.class);
		return  parseDataAsMap(getSearchResults(attrArray,allGroupNamesFilter, allGroupsSearchBase), "externalID", "cn", attrArray);	
	}
	
	public static Map getAllFences()
	{
		String allGroupsSearchBase = getLDAPConfigValue("fence.search.base");//"ou=places,ou=resources,dc=emergency,dc=lu";
		Logger.info("Retrieve all fences from ldap with Search Filter = ["+FILTER_LDAP_FENCE+"] " +
				"and Search Base = ["+allGroupsSearchBase+"] on Constraint = [ ]", LDAPUtils.class);
		return  parseDataAsMap(getSearchResults(CONSTRAINT_ATTR_FENCE,FILTER_LDAP_FENCE, allGroupsSearchBase), null, "cn", CONSTRAINT_ATTR_FENCE );	
	}
	
	public static void getAllOrganizations()
	{
		System.out.println(" # START getAllOrganizations : ");
		Map<String, String> map = new HashMap<String, String>();	
		List list = parseDataAsList(getSearchResults( new String[] {PROPERTY_CN,PROPERTY_DESCRIPTION }, FILTER_ORGANIZATIONS, "ou=organizationTypes,ou=resourcesTypes,dc=emergency,dc=lu" ));
		if(list!=null&& list.size()>1)
		{
			for(int i=0;i <list.size();i=i+2)map.put((String) list.get(i+1),(String)list.get(i) );		
			setOrgMap(map);	
		}
		System.out.println(" # END getAllOrganizations : ");
	}

	public static boolean validatePlanes_deprecated(String planeId, String[] types)
	{
		String allGroupNamesFilter = getLDAPConfigValue("planes.search.base").replace("<replacestr>", planeId);//"cn="+planeId+",ou=devices,dc=emergency,dc=lu";
		String allGroupsSearchBase = getLDAPConfigValue("groups.search.base");//"ou=groups,dc=emergency,dc=lu";
		Logger.info("Validating Planes with Search Filter = ["+allGroupNamesFilter+"] " +
				"and Search Base = ["+allGroupsSearchBase+"] on Constraint = [member ]", LDAPUtils.class);
		List<String> membersList = parseDataAsList(getSearchResults(new String[] {"member"},"(member="+allGroupNamesFilter+")", allGroupsSearchBase));
		if(membersList != null)
		{
			if(types != null )
			{
				for(String member:membersList)
				{
					for(String type:types)
					{
						String allVehiclesNamesFilter = getLDAPConfigValue("vehicle.type.identifier").replace("<replacestr>", type);//"(type=cn="+type+",ou=vehicleTypes,ou=resourcesType,dc=emergency,dc=lu)";
						Logger.info("Validating on each member with Search Filter = ["+allVehiclesNamesFilter+"] " +
								"and Search Base = ["+member+"] on Constraint = [type ]", LDAPUtils.class);						
						List placeDtls = parseDataAsList(getSearchResults(new String[] {"type"},allVehiclesNamesFilter, member));
						if(placeDtls != null && placeDtls.size() > 0){
							return true;
						}
					}
				}				
			}
		}
		return false;
	}

	public static boolean validateVehicles_deprecated(String vehicleId, String[] types)
	{
		String allGroupNamesFilter = getLDAPConfigValue("device.search.base").replace("<replacestr>", vehicleId);;//"cn="+vehicleId+",ou=devices,dc=emergency,dc=lu";
		String allGroupsSearchBase = getLDAPConfigValue("groups.search.base");//"ou=groups,dc=emergency,dc=lu";
		Logger.info("Validating Vehicles with Search Filter = ["+allGroupNamesFilter+"] " +
				"and Search Base = ["+allGroupsSearchBase+"] on Constraint = [member ]", LDAPUtils.class);		
		List<String> membersList = parseDataAsList(getSearchResults(new String[] {"member"},"(member="+allGroupNamesFilter+")", allGroupsSearchBase));
		Logger.info("Valid memebers List ["+membersList+"]", LDAPUtils.class);
		if(membersList != null){
			if(types != null ){
				for(String member:membersList){
					for(String type:types){
						if(!allGroupNamesFilter.equalsIgnoreCase(type)){
							String allVehiclesNamesFilter = getLDAPConfigValue("vehicle.type.identifier").replace("<replacestr>", type);//"(type=cn="+type+",ou=vehicleTypes,ou=resourcesType,dc=emergency,dc=lu)";
							Logger.info("Validating on each member with Search Filter = ["+allVehiclesNamesFilter+"] " +
									"and Search Base = ["+member+"] on Constraint = [type ]", LDAPUtils.class);						

							List placeDtls = parseDataAsList(getSearchResults(new String[] {"type"},allVehiclesNamesFilter, member));
							if(placeDtls != null && placeDtls.size() > 0){
								return true;
							}
						}						
					}
				}				
			}
		}

		return false;
	}

	public static boolean validateStaff(String deviceId )
	{
		@SuppressWarnings("unused")
		//List<String> groupMembers = getGroupMembers(deviceId);
		List<String> deviceMembers = getUserDeviceMembers( deviceId );
		//System.out.println("Valid memebers List ["+deviceMembers+"]");
		if( deviceMembers != null ){			
				for(String member:deviceMembers ){
					if(member.indexOf(deviceId) > -1){
						Logger.info("Valid memebers List ["+deviceMembers+"]", LDAPUtils.class);
						return true;
				}
			}
		}
		return false;
	}
	public static boolean validateVehicle(String deviceId ){
		@SuppressWarnings("unused")
		//List<String> groupMembers = getGroupMembers(deviceId);
		List<String> deviceMembers = getVehicleDeviceMembers( deviceId );
		//Logger.info("Valid memebers List ["+deviceMembers+"]", LDAPUtils.class);
		if(deviceMembers!=null&&deviceMembers.size()>0)
			{for(String member:deviceMembers ){
			if(member.indexOf(deviceId ) > -1){
				Logger.info("Valid memebers List ["+deviceMembers+"]", LDAPUtils.class);
				return true;						
			}
			}
		}
		return false;
	}
	public static boolean validatePlane(String deviceId){
		@SuppressWarnings("unused")
		//List<String> groupMembers = getGroupMembers(deviceId);
		List<String> deviceMembers = getAirplaneDeviceMembers( deviceId );
		if( deviceMembers != null){
			
				for(String member:deviceMembers ){
					if(member.indexOf( deviceId ) > -1){ 
						Logger.info("Valid memebers List ["+deviceMembers+"]", LDAPUtils.class);					
						return true;						
					}
				
			}
		}
		return false;
	}

	@SuppressWarnings("unchecked")
	public static Map<String, Map<String,String>>  parseDataAsMap(NamingEnumeration searchResults, String optionalKey,
			String uniqueKey, String[] attrArray )
	{
		Logger.debug("Formatting the data as MAP", LDAPUtils.class);
		
		Map<String, Map<String,String>> resultMap = null;
		
		int totalResultLogger = 0;
		if(searchResults == null){ 	return null; 	}
		
		// Loop through the search results
		while (searchResults.hasMoreElements()) 
		{
			SearchResult sr = null;
			try
			{
				sr = (SearchResult) searchResults.next();
			} 
			catch (NamingException e1) {
				Logger.error("No Search results on LDAP ", LDAPUtils.class);
			}
			if(sr == null ){
				Logger.error("No Search results on LDAP ", LDAPUtils.class);
				return null;
			}

			Attributes attrs = sr.getAttributes();
			if (attrs != null) 
			{
				if(resultMap == null){
					resultMap = new HashMap<String, Map<String, String>>();
				}
				try 
				{
					Map<String, String> resultAttrMap = new HashMap();
					for(String attr:attrArray)
					{
						if(resultAttrMap.get(attr) == null)
						{
							attrs.get(attr);
							resultAttrMap.put(attr, "");
						}
					}
					for (NamingEnumeration ae = attrs.getAll(); ae.hasMore();) 
					{
						Attribute attr = (Attribute) ae.next();
						for (NamingEnumeration e = attr.getAll(); e.hasMore(); totalResultLogger++)
						{
							String attrValue = (String) e.next();
							//if it is external id
							if( attr.getID().equals( EXTERNAL_ID )  )
							{
								if( attrValue.contains( COMPASS_ID )){ resultAttrMap.put(attr.getID(), attrValue.replace(COMPASS_ID, "")); break;}
								else resultAttrMap.put(attr.getID(), "inValidFormat" );
							}
							resultAttrMap.put(attr.getID(), attrValue);
						}
					}
					if(optionalKey!=null&&!StringUtils.isNull(resultAttrMap.get( optionalKey ))){
						resultMap.put(resultAttrMap.get( optionalKey ), resultAttrMap);
					}else {
						resultAttrMap.put("compasId", "");
						resultMap.put(resultAttrMap.get(uniqueKey), resultAttrMap);
					}

				} catch (NamingException e) {
					Logger.error("Error ocuring while reading the attributes ", LDAPUtils.class, e);
				}

			}else {
				Logger.info("No attributes found on LDAP", LDAPUtils.class);
			}
		}

		return resultMap;
	}
	/*public static String getSecurityOfficerEmail(String organizationName, String searchFilter )
	{
		System.out.println(" ## START getSecurityOfficerEmail organizationName: "+organizationName +": searchFilter :"+searchFilter );
		String email =null;		
		String attrIDS []= {PROPERTY_MAIL};		
		List<String> list = parseDataAsList( getSearchResults( attrIDS,searchFilter, LDAP_BASE ) );
		if(list!=null &&list.size()>0 ) email= list.get(0);		
		System.out.println(" END getSecurityOfficerEmail : Email sent to Security  @ : "+email );
		return email;
	}*/
	public static SearchControls getSimpleSearchControls(String[] attrIDS) {
	    SearchControls searchControls = new SearchControls();
	    searchControls.setSearchScope(SearchControls.SUBTREE_SCOPE);
	    searchControls.setTimeLimit(30000);
	    if(attrIDS != null){
	 	    searchControls.setReturningAttributes(attrIDS);
	    }

	    return searchControls;
	}

	public static SearchControls getSimpleSearchControls() {
	    SearchControls searchControls = new SearchControls();
	    searchControls.setSearchScope(SearchControls.SUBTREE_SCOPE);
	    searchControls.setTimeLimit(30000);
	    return searchControls;
	}

	@SuppressWarnings("unchecked")
	public static void parseData(NamingEnumeration searchResults){

		int totalResultLogger = 0;
		if(searchResults == null){
			return;
		}
		// Loop through the search results
		while (searchResults.hasMoreElements()) {
			SearchResult sr = null;
			try {
				sr = (SearchResult) searchResults.next();
			} catch (NamingException e1) {
				Logger.error("No Search results on LDAP ", LDAPUtils.class);
			}
			if(sr == null ){
				Logger.error("No Search results on LDAP ", LDAPUtils.class);
				return;
			}

			Attributes attrs = sr.getAttributes();
			if (attrs != null) {

				try {
					for (NamingEnumeration ae = attrs.getAll(); ae
							.hasMore();) {
						Attribute attr = (Attribute) ae.next();
						for (NamingEnumeration e = attr.getAll(); e
								.hasMore(); totalResultLogger++) {
						}
					}
				} catch (NamingException e) {
					Logger.error("Error ocuring while reading the attributes ", LDAPUtils.class, e);
				}

			}else {
				Logger.info("No attributes found on LDAP", LDAPUtils.class);
			}
		}
	}


	@SuppressWarnings("unchecked")
	public static List parseDataAsList(NamingEnumeration searchResults){
		//Logger.info("Formatting the data as List", LDAPUtils.class	);
		List<String> resultAttr = null;
		int totalResultLogger = 0;
		if(searchResults == null){
			return null;
		}
		// Loop through the search results
		while (searchResults.hasMoreElements()) {

			SearchResult sr = null;
			try {
				sr = (SearchResult) searchResults.next();
			} catch (NamingException e1) {
				Logger.error("No Search results on LDAP ", LDAPUtils.class);
			}
			if(sr == null ){
				Logger.error("No Search results on LDAP ", LDAPUtils.class);
				return null;
			}

			Attributes attrs = sr.getAttributes();
			if (attrs != null) {
				if(resultAttr == null){
					resultAttr = new ArrayList();
				}
				try {
					for (NamingEnumeration ae = attrs.getAll(); ae
							.hasMore();) {
						Attribute attr = (Attribute) ae.next();
						for (NamingEnumeration e = attr.getAll(); e
								.hasMore(); totalResultLogger++) {
							String attrValue = (String) e.next();

							resultAttr.add(attrValue);
						}
					}
				} catch (NamingException e) {
					Logger.error("Error ocuring while reading the attributes ", LDAPUtils.class, e);
				}

			}else {
				Logger.info("No attributes found on LDAP", LDAPUtils.class);
			}
		}

		return resultAttr;
	}

	@SuppressWarnings("unchecked")
	public static Map<String, String>  parseDataAsMap(NamingEnumeration searchResults){
		Map<String, String> resultAttrMap = null;
		int totalResultLogger = 0;
		if(searchResults == null){
			return null;
		}
		// Loop through the search results
		while (searchResults.hasMoreElements()) {

			SearchResult sr = null;
			try {
				sr = (SearchResult) searchResults.next();
			} catch (NamingException e1) {
				Logger.error("No Search results on LDAP ", LDAPUtils.class);
			}
			if(sr == null ){
				Logger.error("No Search results on LDAP ", LDAPUtils.class);
				return null;
			}

			Attributes attrs = sr.getAttributes();
			if (attrs != null) {
				if(resultAttrMap == null){
					resultAttrMap = new HashMap<String, String>();
				}
				try {
					for (NamingEnumeration ae = attrs.getAll(); ae
							.hasMore();) {
						Attribute attr = (Attribute) ae.next();
						for (NamingEnumeration e = attr.getAll(); e
								.hasMore(); totalResultLogger++) {
							String attrValue = (String) e.next();

							resultAttrMap.put(attr.getID(), attrValue);
						}
					}
				} catch (NamingException e) {
					Logger.error("Error ocuring while reading the attributes ", LDAPUtils.class, e);
				}

			}else {
				Logger.info("No attributes found on LDAP", LDAPUtils.class);
			}
		}

		return resultAttrMap;
	}
	public static Map<String, Object>  parseDataAsMap(NamingEnumeration searchResults, String listValues){
		//Logger.info("Formatting the data as MAP", LDAPUtils.class);
		Map<String, Object> resultAttrMap = null;
		int totalResultLogger = 0;
		if(searchResults == null){
			return null;
		}
		// Loop through the search results
		while (searchResults.hasMoreElements()) {

			SearchResult sr = null;
			try {
				sr = (SearchResult) searchResults.next();
			} catch (NamingException e1) {
				Logger.error("No Search results on LDAP ", LDAPUtils.class);
			}
			if(sr == null ){
				Logger.error("No Search results on LDAP ", LDAPUtils.class);
				return null;
			}

			Attributes attrs = sr.getAttributes();
			if (attrs != null) {
				if(resultAttrMap == null){
					resultAttrMap = new HashMap<String, Object>();
				}
				try {
					for (NamingEnumeration ae = attrs.getAll(); ae
							.hasMore();) {
						Attribute attr = (Attribute) ae.next();
						for (NamingEnumeration e = attr.getAll(); e
								.hasMore(); totalResultLogger++) {
							String attrValue = (String) e.next();
							List<String> attrValuesList = null;
							if(listValues.indexOf(attr.getID()) >=0){
								attrValuesList =  resultAttrMap.get(attr.getID())== null?null:(List<String>) resultAttrMap.get(attr.getID());
								if(attrValuesList == null){
									attrValuesList = new ArrayList<String>();
								}
								attrValuesList.add(attrValue);
								resultAttrMap.put(attr.getID(), attrValuesList);
							}else {
								resultAttrMap.put(attr.getID(), attrValue);
							}
						}
					}
				} catch (NamingException e) {
					Logger.error("Error ocuring while reading the attributes ", LDAPUtils.class, e);
				}
			}else {
				Logger.info("No attributes found on LDAP", LDAPUtils.class);
			}
		}

		return resultAttrMap;
	}

	public static boolean validatePlaceByUser(String placeId, String userId){
		Logger.info("Validating Places ["+placeId+"] by user Id ["+userId+"]", LDAPUtils.class);
		boolean isValid = false;
		@SuppressWarnings("unused")
		List<String> missionsList = getAllMisisons4rUser(userId);
		String allGroupNamesFilter = getLDAPConfigValue("place.member.identifier").replace("<replacestr>", placeId);//"(placeMember=cn="+placeId+",ou=places,ou=resources,dc=emergency,dc=lu)";
		if(missionsList != null){
			for(String mission:missionsList){
				String allGroupsSearchBase = getLDAPConfigValue("mission.unique.identifier").replace("<replacestr>", mission);//"uniqueId="+mission+",ou=missions,dc=emergency,dc=lu";
				//parseData(getSearchResults(new String[] {"mail"},allUserFilter1, allGroupsSearchBase));	
				List placeDtls = parseDataAsList(getSearchResults(new String[] {"placeMember"},allGroupNamesFilter, allGroupsSearchBase));
				if(placeDtls != null && placeDtls.size() > 0){
					isValid= true;
				}
			}
		}
		//System.out.println("validatePlaceByUser : placeId : "+placeId +userId +isValid );
		return isValid;
	}
 
	public static boolean validateVehiclesByUser(String vehicleId, String userId){
		
		List<String> membersList = getVehicleDeviceMembers(vehicleId);
		List<String> missionsList = getAllMisisons4rUser(userId);

		if(missionsList != null){
			if(membersList != null){
				for(String member:membersList){
					for(String mission:missionsList){
						String allVehiclesSearchBase = getLDAPConfigValue("mission.unique.identifier").replace("<replacestr>", mission);//"uniqueId="+mission+",ou=missions,dc=emergency,dc=lu";
						List vehicleDtls = parseDataAsList(getSearchResults(new String[] {"vehicleMember"},"vehicleMember="+member, allVehiclesSearchBase));
						if(vehicleDtls != null && vehicleDtls.size() > 0){
							return true;
						}
					}
				}
			}
		}
		return false;
	}
	public static boolean validateAirplanesByUser(String deviceId, List<String> missionsList )
	{
		try
		{
			DtoMission[] deviceMissionList = LDAPWSUtils.getMissionsForDevice(EventServiceUtils.getLDAPToken(), deviceId, 
					 UnitType.VEHICLE );
			if( deviceMissionList!=null&&missionsList!=null)
			{
				for( DtoMission mission : deviceMissionList )
				{
					if( missionsList.contains( mission.getUniqueId() ) ) return true;						
				}
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
		return false;
	}

	public static List  getAllMisisons4rUser(String userId)
	{
		String allGroupNamesFilter = getLDAPConfigValue("user.member.identifier").replace("<replacestr>", userId);//"(member=uid="+userId+",ou=users,ou=people,dc=emergency,dc=lu)";
		String allGroupsSearchBase = getLDAPConfigValue("missions.search.base");//"ou=missions,dc=emergency,dc=lu";
		return parseDataAsList(getSearchResults(new String[] {"uniqueId"},allGroupNamesFilter, allGroupsSearchBase));
		//TODO Kaleem //return parseDataAsList(getSearchResults(new String[] {"description"},allGroupNamesFilter, allGroupsSearchBase));
	}
	
	
	public static List getAllProfiles4rUser( String userId)
	{
		String allGroupNamesFilter = "(member=uid="+userId+",ou=users,ou=people,dc=emergency,dc=lu)";
		String allGroupsSearchBase = "ou=acl_profiles,ou=people,dc=emergency,dc=lu";
		return parseDataAsList(getSearchResults(new String[] {"cn"},allGroupNamesFilter, allGroupsSearchBase));
	}
	public static Map<String,Object> getAllFencesByType( String type )
	{
		String allGroupNamesFilter = "(description=Islamabad Warden Zone - F8)";
		String allGroupsSearchBase = "ou=fences,dc=emergency,dc=lu";
		return parseDataAsMap(getSearchResults(new String[] {"cn","listOfPoints"},allGroupNamesFilter, allGroupsSearchBase), "cn");		
	}

	public static boolean validateDeviceByUser(String deviceId, String userId)
	{
		if(StringUtils.isNull(deviceId)){ return false; }

		String allGroupNamesFilter =  getLDAPConfigValue("device.member.identifier").replace("<replacestr>", deviceId);// "(member=cn="+deviceId+",ou=devices,dc=emergency,dc=lu)";
		String allGroupsSearchBase = getLDAPConfigValue("groups.search.base");// "ou=groups,dc=emergency,dc=lu";
		List<String> membersList = parseDataAsList(getSearchResults(new String[] {"member"},allGroupNamesFilter, allGroupsSearchBase));

		List<String> missionsList = getAllMisisons4rUser(userId);

		if(missionsList != null){
			if(membersList != null){
				for(String member:membersList){
					for(String mission:missionsList){
						String allStaffSearchBase = getLDAPConfigValue("mission.unique.identifier").replace("<replacestr>", mission);//"uniqueId="+mission+",ou=missions,dc=emergency,dc=lu";
						List staffDtls = parseDataAsList(getSearchResults(new String[] {"member"},"member="+member, allStaffSearchBase));
						if(staffDtls != null && staffDtls.size() > 0){
							return true;
						}
					}
				}
			}
		}
		return false;
	}
    
	public static List<String> getTrackMeMissionsList(String deviceId, String token , DirectoryServiceOutInterface_PortType stub)
	{	List<String> allMissionsList = new ArrayList<String>();
		/*if(StringUtils.isNull(deviceId))return null;				
		String member =getUserDomain(deviceId); 
		List<String> missionsList = getAllMissions();
		
		if(member != null)
		{
			allMissionsList = new ArrayList<String>();		
			for(String mission:missionsList)
			{
				String allStaffSearchBase = getLDAPConfigValue("mission.unique.identifier").replace("<replacestr>", mission); 
				List staffDtls = parseDataAsList(getSearchResults(new String[] {"member"},"member="+member, allStaffSearchBase));
				if(staffDtls != null && staffDtls.size() > 0){
					allMissionsList.add(mission);
				}
			}
	}*/
			try 
			{
				DtoMission[] missionList = LDAPWSUtils.getMissionsForDevice(token, deviceId,  UnitType.USER ); 
				if(missionList!=null )
				{
					for( DtoMission mission: missionList )  allMissionsList.add( mission.getUniqueId() );//TODO Kaleem
						
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
		return allMissionsList;
	}
  
	public static List<String> getVehiclesMissionsList(String deviceId, String token , DirectoryServiceOutInterface_PortType stub){
		List<String> allMissionsList = new ArrayList<String>();
//		List<String> memberList = getVehicleByDevice( deviceId );
//		List<String> missionsList = getAllMissions();
//		List<String> allMissionsList = null;
//
//		if(missionsList != null&&memberList!=null)
//		{		
//			allMissionsList = new ArrayList<String>();	
//			for(String member : memberList)
//			{ 	member = FILTER_VEHICLES.replace(FILTER_VEHICLE_ID, member ); System.out.println( member );
//				for(String mission:missionsList)
//				{
//					String allVehiclesSearchBase = getLDAPConfigValue("mission.unique.identifier").replace("<replacestr>", mission);
//					List vehicleDtls = parseDataAsList(getSearchResults(new String[] {"vehicleMember"},member, allVehiclesSearchBase));
//					if(vehicleDtls != null && vehicleDtls.size() > 0){
//						allMissionsList.add(mission);
//					}
//				}
//			}
//			
//		}

		try {
			DtoMission[] missionList = LDAPWSUtils.getMissionsForDevice(token, deviceId, UnitType.VEHICLE );
			if(missionList!=null )
			{
				for( DtoMission mission: missionList ) allMissionsList.add( mission.getUniqueId()  );//TODO Kaleem
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
		return allMissionsList;
	}

	@SuppressWarnings("static-access")
	public static boolean authorizeDevices(String deviceId, String userId){
		if(getLDAPUserDtlsMap() != null ){
			LDAPUserBean ldapUserBean = getLDAPUserDtlsMap().get(deviceId);			
			Map map  = LDAPCacheJob.getInstance().getLDAPUsersMissionsList();
			List<String> missionsList = null; 
			if(map != null ){	
				missionsList =  (List<String>) map.get(userId);
				if(missionsList == null){
					LDAPCacheJob.getInstance().getLDAPUsersMissionsList().put(userId, getAllMisisons4rUser( userId )  );
					missionsList = (List<String>) map.get(userId);
				}
			} 
			//Logger.info("Got the userbean for device ["+deviceId+"] as ["+ldapUserBean+"]", LDAPUtils.class);
			List<String> deviceMissionsList = ldapUserBean.getAuthorizedGroupsList();
			if(deviceMissionsList != null){
				if(missionsList != null){
					for(String member:missionsList){
						if(deviceMissionsList.contains(member)){
							return true;
						}
					}
				}
			}
		}
		return false;
	}
	public static Map<String, String>  parseAsMap(NamingEnumeration searchResults, String keyAttribute, String valueAttribute){
		Logger.debug("# START parseAsMap : Formatting the data as MAP", LDAPUtils.class);
		//System.out.println("# START parseAsMap : Formatting the data as MAP: "+searchResults );
		Map<String, String> resultMap = new HashMap<String, String>();		
		if(searchResults == null){
			return null;
		}
		// Loop through the search results
		while (searchResults.hasMoreElements()) {
			SearchResult sr = null;
			List<String> strList = new ArrayList<String>();
			try {
				sr = (SearchResult) searchResults.next();

			} catch (NamingException e1) {
				Logger.error("No Search results on LDAP ", LDAPUtils.class);
			}
			if(sr == null ){
				Logger.error("No Search results on LDAP ", LDAPUtils.class);
				return null;
			}			
			Attributes attrs = sr.getAttributes();		
			if (attrs != null) 
			{
				try{
					for (NamingEnumeration ae = attrs.getAll(); ae.hasMore();) {
						 Attribute attr = (Attribute) ae.next();        


						  for (NamingEnumeration e = attr.getAll(); e.hasMore(); e.next());

						//System.out.println(" attrs : "+attrs.get(keyAttribute) + ": "+ attrs.get(valueAttribute));
						//if(attrs.get(keyAttribute)!=null && attrs.get(keyAttribute)!=null)
						resultMap.put(attrs.get(keyAttribute).toString(),attrs.get(valueAttribute).toString() );
				}
			}catch(NamingException ne){ne.printStackTrace(); }

			}
			else 
			{
				Logger.info("No attributes found on LDAP", LDAPUtils.class);
			}
		}
		//Logger.debug("# END parseAsMap : Formatting the data as MAP", LDAPUtils.class );
		return resultMap;
	}
	public static String getUserImageAsString(String uid )
	{
		String base64String=null;
		if(uid!=null&&uid!=""){
		// Specify the attributes to return
		String searchFilter = "(&"+FILTER_LDAP_USERS+"((uid="+uid+")))";
		String searchBase = LDAP_FILTER_URL +"uid="+ uid + ","+LDAP_BASE;
		
		String returnedAtts[] = {""+PROPERTY_IMAGE };
		// Specify the search scope
		SearchControls searchCtls = new SearchControls();
		searchCtls.setSearchScope(SearchControls.SUBTREE_SCOPE);
		searchCtls.setReturningAttributes(returnedAtts);
		// Search for objects using the filter
		try {
			NamingEnumeration results=  getSearchResults(getLDAPContext(), searchCtls, searchFilter, searchBase);
			while (results.hasMore()) {
				SearchResult searchResult = (SearchResult) results.next();
				Attributes attributes = searchResult.getAttributes();
				Attribute attr = attributes.get(PROPERTY_IMAGE);
				if( attr!=null ) base64String = new String( org.apache.commons.codec.binary.Base64.encodeBase64( (byte[])attr.get() ) );
				
			}
		} catch (NamingException e) {
			Logger.error(" Error occured while fetching user image 1334: getUserImageBytes(String uid):["+e.getLocalizedMessage()+"]", LDAPUtils.class);
		}
		}
		return base64String;
	}
	public static String getRadioServerEmail(String value)
	{
		
		return getLDAPConfigValue("radio.server.email."+value );
		
	}
	 public static List getUserProfilesList( String uid )
	    {
	    	//Logger.info("Retrieving user profiles from users for a user id ["+uid+"]", LDAPUtils.class);    	
	    	return parseDataAsList( getSearchResults( CONSTRAINT_CN,FILTER_ACL_PROFILE.replace(REPLACE_UID_TOKEN, uid ), ACL_PROFILES_BASE ) );
	}
	public static List<String> getLdapDeviceList() {
		if(ldapDeviceList==null ) return getDevices();
		else return ldapDeviceList;
	}

	public static void setLdapDeviceList(List<String> ldapDeviceList) {
		LDAPUtils.ldapDeviceList = ldapDeviceList;
	}
	
	
	 
 }
 
