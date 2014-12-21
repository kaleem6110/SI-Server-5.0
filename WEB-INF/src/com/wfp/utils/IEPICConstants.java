package com.wfp.utils;

import java.text.SimpleDateFormat;

public interface IEPICConstants {
	  
	public static final String PAKISTAN ="Pakistan";
	public static final String DUBAI ="Dubai";
	public static final String ROME ="Italy";
	public static final String KEY_PAKISTAN="ISL";
	public static final String KEY_DUBAI ="DXB";
	public static final String KEY_ROME ="ROM";
	 
	//model constants
	public static final String PARAM_ID ="id";
	public static final String PARAM_NAME ="name";
	public static final String PARAM_DEVICEID ="deviceId";
	
	//cache constants
	public static final String CACHE_STAFF_TRACKING ="$staff_tracking$";
	public static final String CACHE_REST_SERVICE = "$REST_Service$";
	//ecosystem properties
	public static final String PARAM_TIME ="time";
	public static final String PARAM_XPR = "/gpx/wpt";
	
	//date formatter
	public static final String EPIC_DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
	public static final String PORTAL_DATE_FORMAT = "MM/dd/yyyy'T'HH:mm:ss.SSS'Z'";	
	public static final String PORTAL_DATE_FORMAT_MM = "MM/dd/yyyy HH:mm:ss";
	public static final String NEW_PORTAL_DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
	
	public static final String SENSOR_WS_DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss'Z'";
	public static final String CALENDAR_DATE_FORMAT ="EEE MMM dd HH:mm:ss Z yyyy";
	//public static final String OLD_PORTAL_DATE_FORMAT = NEW_PORTAL_DATE_FORMAT;
	public static final SimpleDateFormat PORTAL_SIMPLE_FORMAT = new SimpleDateFormat(PORTAL_DATE_FORMAT);
	public static final SimpleDateFormat NEW_PORTAL_SIMPLE_FORMAT = new SimpleDateFormat(NEW_PORTAL_DATE_FORMAT);
	public static final SimpleDateFormat SENSOR_WS_SIMPLE_FORMAT = new SimpleDateFormat(SENSOR_WS_DATE_FORMAT);
	public static final SimpleDateFormat CALENDAR_DATE_SIMPLE_FORMAT = new SimpleDateFormat(CALENDAR_DATE_FORMAT);
	
	//data filtering
	public static final String LAYER_STAFF = "Staff";
	public static final String LAYER_VEHICLE = "Vehicle";
	public static final String LAYER_AIRPLANE= "Airplane";
	public static final String DEVICE_STAFF = "trackMe";
	public static final String DEVICE_VEHICLE = "EMS";
	
	//Export pakistan risk zones job
	public static final String DEFAULT_FILEPATH = "C:\\Magma\\data\\excel\\Pakistan risk zones.xls";
	public static final String DEFAULT_DATASOURCE = "wfp_datasource";
	public static final String SINGLE_QUOTE = "'";
	public static final String PARAM_FILEPATH = "filepath";
	public static final String PARAM_DATASOURCE = "datasource";
	public static final String PARAM_APPEND_DATE = "appendDate";
	
	//Warehouse & Stocks renderer
	public static final String WAREHOUSE_FILEPATH = "whfilepath";
	public static final String HEADER_ROW = "headerrowindex";
	public static final String PARAM_WAREHOUSE = "Warehouse";
	public static final String PARAM_WAYBILL = "waybillFile";
	public static final String PARAM_DATECORRECTION = "datecorrection";
	public static final String PARAM_LATITUDE = "latitude";
	public static final String PARAM_LONGITUDE = "longitude";
	public static final String PARAM_COORDINATES = "coordinates";
	
	//LDAP Utilities
	public static final String INITIAL_LDAP_CONNECTION_FACTORY = "com.sun.jndi.ldap.LdapCtxFactory";
	public static final String LDAP_SECURITY_AUTHENTICATION = "simple";
	public static String LDAP_HOST_PROPERTY = "ldap.service.emergency.lu:389";
	public static String LDAP_ADMIN_NAME_PROPERTY = "cn=ldapadmin,dc=emergency,dc=lu";
	public static String LDAP_ADMIN_PASSWORD = "TargeTc0mf0rt";
	public static String LDAP_BASE = "ou=users,ou=people,dc=emergency,dc=lu";
	public static String SEARCH_FILTER = "(&(objectClass=user)(CN=ldapadmin))";
	public static String VEHICLE_BASE = "ou=vehicles,ou=resources,dc=emergency,dc=lu";
	public static String ACL_PROFILES_BASE = "ou=acl_profiles,ou=people,dc=emergency,dc=lu";
	public static String STR_LDAP_PROTOCOL = "ldaps://";
	public static final String CACHE_LDAPUSER_DTLS = "$LDAPUSER_DTLS$";
	public static final String FILTER_GRP_NAMES = "(member=cn=<deviceId>,ou=devices,dc=emergency,dc=lu)";
	public static final String FILTER_VEHICLES = "cn=<vehicleId>,ou=vehicles,ou=resources,dc=emergency,dc=lu";
	public static final String FILTER_DEVICE = "(deviceMember=cn=<deviceId>,ou=devices,dc=emergency,dc=lu)";
	public static final String FILTER_USER ="uid=<uid>,ou=users,ou=people,dc=emergency,dc=lu";
	public static final String FILTER_FENCE ="cn=<cn>,ou=fences,dc=emergency,dc=lu";
	public static final String FILTER_UID ="(uid=<uid>)";
	public static final String FILTER_CN ="(cn=<cn>)";
	public static final String REPLACE_UID_TOKEN="<uid>";
	public static final String REPLACE_CN_TOKEN="<cn>";
	public static final String FILTER_VEHICLE_ID ="<vehicleId>";
	public static final String FILETER_VEHICLE_UNIT_NAMES = "(&(type=cn=car,ou=vehicleTypes,ou=resourcesTypes,dc=emergency,dc=lu)(deviceMember=cn=<deviceId>,ou=devices,dc=emergency,dc=lu))";
	public static final String FILTER_AIRPLANE_UNIT = "(&(type=cn=airplane,ou=vehicleTypes,ou=resourcesTypes,dc=emergency,dc=lu)(deviceMember=cn=<deviceId>,ou=devices,dc=emergency,dc=lu))";
	
	public static final String FILTER_ACL_PROFILE = "(&(objectClass=aclProfile)(member=uid=<uid>,ou=users,ou=people,dc=emergency,dc=lu))";
	
	public static final String REPLACE_DEVICE_TOKEN = "<deviceId>";
	public static final String DOMAIN_GRP_NAMES = "ou=groups,dc=emergency,dc=lu";
	public static final String[] CONSTRAINT_MEMBER = new String[] {"member"};
	public static final String[] CONSTRAINT_DEVICE_MEMBER = new String[] {"deviceMember"};
	public static final String[] CONSTRAINT_UID = new String[] {"uid"};
	public static final String[] CONSTRAINT_CN = new String[] {"cn"};
	public static final String PARAM_UID = "uid=";
	public static final String FILTER_MW_DEVICES =  "(objectClass=mwdevice)";
	public static final String FILTER_ASSIGNED_DEVIES =  "(deviceMember=*)";
	public static final String FILTER_ASSIGNED_DEVIES_VEHICLE =  "(&(|(type=cn=car,ou=vehicleTypes,ou=resourcesTypes,dc=emergency,dc=lu)(type=cn=nosacorapid,ou=vehicleTypes,ou=resourcesTypes,dc=emergency,dc=lu)(type=cn=nosacoregular,ou=vehicleTypes,ou=resourcesTypes,dc=emergency,dc=lu))(deviceMember=*))";
	public static final String FILTER_ASSIGNED_DEVIES_AIRPLANE =  "(&(type=cn=airplane,ou=vehicleTypes,ou=resourcesTypes,dc=emergency,dc=lu)(deviceMember=*))";
	public static final String DEVICES_SEARCHBASE =  "ou=devices,dc=emergency,dc=lu";
	public static final String FILTER_LDAP_USERS =  "(objectClass=person)";
	public static final String FILTER_LDAP_VEHICLES =  "(objectClass=vehicle)";
	public static final String FILTER_ORGANIZATIONS =  "(objectClass=resourcestype)";
	public static final String FILTER_LDAP_FENCE =  "(objectClass=fence)";
	public static final String USERS_SEARCHBASE =  "ou=users,ou=people,dc=emergency,dc=lu";
	public static final String ORGANIZATION_SEARCHBASE =  "organization.search.base";
	public static final String GROUP_SEARCHBASE =  "groups.search.base";
	public static final String FENCE_SEARCHBASE =  "fence.search.base";
	public static final String[] CONSTRAINT_ATTR_USERS= new String[] {"mail", "l", "postalCode","street",/*"homePhone", "mobile",*/ "uid", "cn","c", "communicationUri", "sn", "description", "licencePlate", "o","ou","primaryMail", "communicationURI", "title", /*"telephoneNumber",*/"personalTitle","gender","otherPhones","vehicleID","deviceMember","internalID"};
	public static final String[] CONSTRAINT_ATTR_VEHICLE= new String[] {"cn","c", "displayName","o","type","communicationUri","description","deviceMember","vehicleID" };
	public static final String[] CONSTRAINT_ATTR_FENCE= new String[] {"cn","listOfPoints","type","description","member"};
	public static final String PROPERTY_CN =  "cn";
	public static final String PROPERTY_COUNTRY =  "c";
	public static final String PROPERTY_STREET =  "street";
	public static final String PROPERTY_ZIP =  "postalCode";
	public static final String PROPERTY_HOME_PHONE =  "homePhone";
	public static final String PROPERTY_MAIL =  "mail";
	public static final String PROPERTY_PRIMARY_MAIL =  "primaryMail";
	public static final String PROPERTY_MOBILE =  "otherPhones";
	public static final String PROPERTY_PAGER =  "communicationUri";
	public static final String PROPERTY_ORGANIZATION =  "o";
	public static final String PROPERTY_DEPT =  "ou";
	public static final String PROPERTY_IMAGE =  "jpegPhoto";
	public static final String PROPERTY_GENDER =  "gender";
	public static final String PROPERTY_INTERNAL_ID =  "internalID";
	public static final String PROPERTY_DESCRIPTION =  "description";
	public static final String PROPERTY_LICENSE_PLATE =  "licencePlate";
	public static final String PROPERTY_vehicleID =  "vehicleID";
	public static final String PROPERTY_VEHICLE_REG_PLATE =  "Vehicle_registration_plate";
	public static final String PROPERTY_VIN =  "VIN";
	public static final String PROPERTY_UID =  "uid";
	public static final String PROPERTY_SN =  "sn";
	public static final String PROPERTY_L =  "l";
	public static final String PROPERTY_TITLE = "title";
	public static final String PROPERTY_MEMBER_OF = "memberOf";
	public static final String PARAM_ALLGROUPS=  "ldapGroups";
	public static final String EXTERNAL_ID=  "externalID";
	public static final String COMPASS_ID=  "compasID:";
	public static final String PROPERTY_PERSONAL_TITLE =  "personalTitle";
	public static final String ORG_SEARCH_IDENTIFIER =  "organization.identifier";
	public static final String ORG_SEARCH_BASE =  "organization.search.base";
	
	
	
	//WFP Config Utils
	public static final String LDAP = "ldap";
	public static final String LDAP_CONTEXT_FACTORY = "LDAPContextFactory";
	public static final String LDAP_SERVER_NAME = "LDAPServerName";
	public static final String LDAP_SERVER_PORT = "LDAPServerPort";
	public static final String LDAP_DOMAIN_NAME = "LDAPDomainName";
	public static final String LDAP_USER_LOGIN = "LDAPSuperUserLogin";
	public static final String LDAP_USER_PWD = "LDAPSuperUserPassword";
	
	//image constants
	public static final String SKYPE_CALL_IMG = "serverresources/epic/s.png";
	public static final String MOBILE_IMG = "serverresources/epic/p.png";
	public static final String GTALK_IM = "serverresources/epic/g.png";
	public static final String MSN_IM = "serverresources/epic/m.png";
	public static final String CONTACT = "serverresources/epic/co.png";
	public static final String EMAIL= "serverresources/epic/e.png";
	public static final String SIP_CALL_IMG = "serverresources/icons/comm.jpg";
	
	//Rest response reading constants
	public static final String ATTR_LAT = "lat";
	public static final String ATTR_LNG = "lon";
	
	//Rest Tracking Keys
	public static final String KEY_STAFF = "staff";
	public static final String KEY_VEHICLE = "vehicle";
	public static final String KEY_AIRPLANE = "airplane";
	public static final String KEY_NOSACO_TERMINALS = "nosaco";
	public static final String KEY_NOSACO_RAPID="nosacorapid";
	public static final String KEY_NOSACO_REGULAR="nosacoregular";
	
	//Tracking User Renderer constants
	public static final String PARAM_FILENAME = "filename";
	public static final String ATTR_ORGANIZATION = "Organization";
	public static final String ATTR_CALL_SIGN = "Call Sign";
	public static final String ATTR_UNIT= "Unit";
	public static final String ATTR_FLEET = "Fleet";
	public static final String NULL_STR = "NULL";

	//Warehouse waybill & stock  Renderer constants
	public static final String PARAM_DASHBOARD_ID = "dashboardid";
	public static final String PARAM_BYPASS_ID = "bypassid";
	public static final String SUB_KEY_FILTER_BY = "Waybill::";
	public static final String KEY_WH_STOCK_MAP = "$WH_STOCK_MAP$";
	public static final String KEY_WH_WAYBILL_MAP = "$WH_WAYBILL_MAP$";
	public static final String KEY_STR = "key";
	
	//Alert Service Utils constants
	public static final String PROPERTY_TEMPLATE_ID = "templateId";
	public static final String PROPERTY_MSG_TO= "userId";
	public static final String PROPERTY_SEND_ON = "sendOn";
	
	public static final String CACHE_WAREHOUSES_KEY = "$warehouses$";
	
	public static final String DEV_TOKEN="aleksandar-20140114-34ad3ed490b943c895457210ed87f959";
	public static final String QA_TOKEN="adulovic-20131107-5984aab55c9d4176a4b24ba0d4635d0f";
	public static final String TRN_TOKEN="adulovic-20131114-2478b95c6e23404685af7edfde315724";
	
	//kmohammed
	public static final String LDAP_FILTER_URL =  "ldaps://ldap-dev.globalepic.lu:636/";
	public static final String LDAP_USER_ID = "aleksandar.dulovic";
	public static final String LDAP_USER_PWD_ENCRYPTED = "CCvmkG2dxAM=";
	public static final String TOKEN=DEV_TOKEN;	
	public static final String STAS_Engine ="STAS_Engine-dev";
	public static final String MIDDLEWARE_ID="mw-a1";
	
	public static final String STAS_EVENT_TYPE ="Alert WARNING!!";
	public static final String EARTH_TOOLS_URL ="http://www.earthtools.org/timezone/";
	public static final String EARTH_TOOLS_PARAM_XPR = "/timezone/offset";
	public static final String OFFSET_NODE = "offset";
	public static final String TIME_ZONE_NODE ="timezone";
	
	public static final String MAIL_HOST ="mail.service.emergency.lu";
	public static final String MAIL_FROM ="portal";
	public static final String EMAIL_FROM_ ="portal@globalepic.lu";
	public static final String MAIL_PWD ="JrTIrv52YYV4iK9Ddcqh";
	public static final String MAIL_CONTENT_TYPE ="multipart/alternative";	
	public static final String MODULE_LIST_TYPE ="moduleList";
	
	//Waypoints
	public static final String UNIT_ID ="unitId";
	public static final String TYPE ="type";
	public static final String MISSION ="mission";
	
	
	
	
	
	
	

	
}
