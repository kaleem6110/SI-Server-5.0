package com.wfp.offline.synchronize;

import com.wfp.db.helper.SyncDataModelsCacheHelper;


public interface ISynchronizationServiceConstants {

	public static final String HB_PROP_LOGIN_ID = "loginId";
	public static final String HB_PROP_ID = "id";
	public static final String HB_PROP_CREATED_DATE = "createdDate";
	public static final String HB_PROP_MODIFIED_DATE = "modifiedDate";
	public static final String HB_PROP_STATUS = "status";
	public static final String HB_PROP_ACK_ID = "ackId"; 
	public static final String HB_PROP_USER_UNIQUE_ID = "userUniqueId";
	public static final String HB_PROP_MODULE_ID = "moduleId";
	public static final String HB_PROP_USER_ID = "userId";
	public static final String HB_PROP_SYNC_UNIQUE_ID = "syncUniqueId";
	public static final String HB_PROP_SYNC_DATA_TYPE_ID = "syncDataTypeId";
	public static final String HB_PROP_SYNC_TYPE_ID = "syncTypeId";
	public static final String HB_PROP_CREATED_AT = "createdAt";
	public static final String HB_PROP_HOSTNAME = "hostname";
	public static final String OPERATION_DELETE = "Delete";
	public static final String OPERATION_UPDATE = "Update";
	public static final String OPERATION_ADD = "Add";
	public static final String OPERATION_OVERWRITE = "Overwrite";
	public static final String STATUS_CONFLICT= "Conflict";
	public static final String STATUS_SUCCESS= "Success";
	public static final String STATUS_NEW= "New";
	public static final String HB_PROP_PREFERENCE_TYPE_ID = "preferenceTypeId";
	

	//Synchronization data type master constants
	public static final long SYNC_DATA_TYPE_RBREGION = Long.valueOf(SyncDataModelsCacheHelper.getSyncDataTypeId("RB Regions"))  ; //"Geo-fence";
	public static final long SYNC_DATA_TYPE_RISKZONES = 	Long.valueOf(SyncDataModelsCacheHelper.getSyncDataTypeId("Risk Zones"))  ; //"Risk Zones";
	public static final long SYNC_DATA_TYPE_GEOFENCE_RULES = Long.valueOf(SyncDataModelsCacheHelper.getSyncDataTypeId("Geofence Rules"))  ; //"Geo-fence";
	
	//Synchronization Sync type master constants\
	public static final long SYNC_TYPE_ADD = Long.valueOf(SyncDataModelsCacheHelper.getSyncOprTypeId(OPERATION_ADD))  ; //"Add";
	public static final long SYNC_TYPE_DELETE = Long.valueOf(SyncDataModelsCacheHelper.getSyncOprTypeId(OPERATION_DELETE)) ; //"Delete";
	public static final long SYNC_TYPE_UPDATE = Long.valueOf(SyncDataModelsCacheHelper.getSyncOprTypeId(OPERATION_UPDATE))  ; //"Update";
	public static final long SYNC_TYPE_OVERWRITE = Long.valueOf(SyncDataModelsCacheHelper.getSyncOprTypeId(OPERATION_OVERWRITE)) ; //"Delete";
	//Synchronization Sync status master constants\
	public static final long SYNC_STATUS_NEW = Long.valueOf(SyncDataModelsCacheHelper.getSyncStatusId("New"))  ; //"Add";
	public static final long SYNC_STATUS_PROCESS = Long.valueOf(SyncDataModelsCacheHelper.getSyncStatusId("Process"))  ; //"Delete";
	public static final long SYNC_STATUS_SUCCESS = Long.valueOf(SyncDataModelsCacheHelper.getSyncStatusId("Success"))  ; //"Update";
	public static final long SYNC_STATUS_FAILED = Long.valueOf(SyncDataModelsCacheHelper.getSyncStatusId("Failed")); //"Update";
	public static final long SYNC_STATUS_CONFLICT = Long.valueOf(SyncDataModelsCacheHelper.getSyncStatusId("Conflict")); //"Update";
	public static final long SYNC_STATUS_IGNORED = Long.valueOf(SyncDataModelsCacheHelper.getSyncStatusId("Ignored")); //"Update";

}
