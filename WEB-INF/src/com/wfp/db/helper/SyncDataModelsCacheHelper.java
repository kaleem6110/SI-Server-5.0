package com.wfp.db.helper;

import java.util.ArrayList;
import java.util.List;

import com.enterprisehorizons.util.StringUtils;
import com.spacetimeinsight.cache.ICacheConstants;
import com.spacetimeinsight.db.config.model.UserPreferences;
import com.spacetimeinsight.db.model.util.DataModelsCache;
import com.wfp.synchronize.db.config.model.SynchronizationDataTypeMaster;
import com.wfp.synchronize.db.config.model.SynchronizationOprTypesMaster;
import com.wfp.synchronize.db.config.model.SynchronizationStatusMaster;
import com.wfp.synchronize.db.config.model.SynchronizationTrailLog;

public final class SyncDataModelsCacheHelper implements ICacheConstants {

	@SuppressWarnings("unchecked")
	public static final List<SynchronizationStatusMaster> getSyncStatusCodes() {
		return DataModelsCache.getInstance().retrieve(SynchronizationStatusMaster.class.getName());
	}

	@SuppressWarnings("unchecked")
	public static final List<SynchronizationDataTypeMaster> getSyncDataTypes() {
		return DataModelsCache.getInstance().retrieve(SynchronizationDataTypeMaster.class.getName());

	}

	@SuppressWarnings("unchecked")
	public static final List<SynchronizationOprTypesMaster> getSyncOprTypes() {
		return DataModelsCache.getInstance().retrieve(SynchronizationOprTypesMaster.class.getName());
	}

	@SuppressWarnings("unchecked")
	public static final List getTerminalList() {
		SynchronizationTrailLog trailLog = new SynchronizationTrailLog();
		return trailLog.retrieve("select distinct createdAt from SynchronizationTrailLog");
	}

	public static final Object[][] getAllSyncMasterData() {
		Object[][] obj = new Object[4][2];

		obj[0][0] = "Sync Status";
		obj[0][1] =  getSyncStatusCodes();
		obj[1][0] = "Data Types";
		obj[1][1] = getSyncDataTypes();
		obj[2][0] = "Operation Types";
		obj[2][1] = getSyncOprTypes();
		obj[3][0] = "Terminal Names";
		obj[3][1] = getTerminalList();

		return obj;
	}

	@SuppressWarnings("unchecked")
	public static final int getSyncStatusId(String syncStatus) {
		if (!StringUtils.isNull(syncStatus)) {
			List syncStatusTypesList = DataModelsCache.getInstance().retrieve(SynchronizationStatusMaster.class.getName());
			int count = syncStatusTypesList == null ? 0 : syncStatusTypesList.size();
			SynchronizationStatusMaster syncStatusTypeMaster = null;
			for (int i = 0; i < count; i++) {
				syncStatusTypeMaster = (SynchronizationStatusMaster) syncStatusTypesList.get(i);
				if (syncStatusTypeMaster.getName().equals(syncStatus)) {
					return syncStatusTypeMaster.getId().intValue();
				}
			}
		}
		return -1;
	}

	@SuppressWarnings("unchecked")
	public static final int getSyncDataTypeId(String syncType) {
		if (!StringUtils.isNull(syncType)) {
			List syncDataTypesList = DataModelsCache.getInstance().retrieve(SynchronizationDataTypeMaster.class.getName());
			int count = syncDataTypesList == null ? 0 : syncDataTypesList.size();
			SynchronizationDataTypeMaster syncDataTypeMaster = null;
			for (int i = 0; i < count; i++) {
				syncDataTypeMaster = (SynchronizationDataTypeMaster) syncDataTypesList.get(i);
				if (syncDataTypeMaster.getName().equals(syncType)) {
					return syncDataTypeMaster.getId().intValue();
				}
			}
		}
		return -1;
	}

	@SuppressWarnings("unchecked")
	public static final String getSyncStatus(long syncStatusId) {
		if (syncStatusId > 0) {
			List syncStatusTypesList = DataModelsCache.getInstance().retrieve(SynchronizationStatusMaster.class.getName());
			int count = syncStatusTypesList == null ? 0 : syncStatusTypesList.size();
			SynchronizationStatusMaster syncStatusTypeMaster = null;
			for (int i = 0; i < count; i++) {
				syncStatusTypeMaster = (SynchronizationStatusMaster) syncStatusTypesList.get(i);
				if (syncStatusTypeMaster.getId().intValue() == syncStatusId) {
					return syncStatusTypeMaster.getName();
				}
			}
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	public static final String getSyncDataType(long syncDataTypeId) {
		if (syncDataTypeId > 0) {
			List syncDataTypesList = DataModelsCache.getInstance().retrieve(SynchronizationDataTypeMaster.class.getName());
			int count = syncDataTypesList == null ? 0 : syncDataTypesList.size();
			SynchronizationDataTypeMaster syncDataTypeMaster = null;
			for (int i = 0; i < count; i++) {
				syncDataTypeMaster = (SynchronizationDataTypeMaster) syncDataTypesList.get(i);
				if (syncDataTypeMaster.getId().intValue() == syncDataTypeId) {
					return syncDataTypeMaster.getName();
				}
			}
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	public static final int getSyncOprTypeId(String syncOpr) {
		if (!StringUtils.isNull(syncOpr)) {
			List syncStatusTypesList = DataModelsCache.getInstance().retrieve(SynchronizationOprTypesMaster.class.getName());
			int count = syncStatusTypesList == null ? 0 : syncStatusTypesList.size();
			SynchronizationOprTypesMaster syncStatusTypeMaster = null;
			for (int i = 0; i < count; i++) {
				syncStatusTypeMaster = (SynchronizationOprTypesMaster) syncStatusTypesList.get(i);
				if (syncStatusTypeMaster.getName().equals(syncOpr)) {
					return syncStatusTypeMaster.getId().intValue();
				}
			}
		}
		return -1;
	}

	@SuppressWarnings("unchecked")
	public static final String getSyncOprType(long syncOprTypeId) {
		if (syncOprTypeId > 0) {
			List syncOprTypesList = DataModelsCache.getInstance().retrieve(SynchronizationOprTypesMaster.class.getName());
			int count = syncOprTypesList == null ? 0 : syncOprTypesList.size();
			SynchronizationOprTypesMaster syncOprTypeMaster = null;
			for (int i = 0; i < count; i++) {
				syncOprTypeMaster = (SynchronizationOprTypesMaster) syncOprTypesList.get(i);
				if (syncOprTypeMaster.getId().intValue() == syncOprTypeId) {
					return syncOprTypeMaster.getName();
				}
			}
		}
		return null;
	}
	
	@SuppressWarnings("unchecked")
	public static List<UserPreferences> getSpecificUserPreferences(int domainId, int languageId, int userId, String userUniqueIdStr, int moduleId) {
		List<UserPreferences> userPreferenceList = new ArrayList<UserPreferences>();
		List userFavoritesList = DataModelsCache.getInstance().retrieve(UserPreferences.class.getName());
		int count = userFavoritesList == null ? 0 : userFavoritesList.size();
		UserPreferences userPrefrences = null;
		/*if (userId == 0)
			userId = -1;*/
		for (int i = 0; i < count; i++) {
			userPrefrences = (UserPreferences) userFavoritesList.get(i);

			if (domainId == userPrefrences.getDomainId() && languageId == userPrefrences.getLanguageId()
					&& (userId == userPrefrences.getUserId() || userUniqueIdStr.equals(userPrefrences.getUserUniqueId()))
					&& moduleId == userPrefrences.getModuleId()) {
				userPreferenceList.add(userPrefrences);
			}
		}
		return userPreferenceList;
	}
	
	@SuppressWarnings("unchecked")
	public static UserPreferences getSpecificUserPreferences(long domainId, long languageId, long userId, String userUniqueIdStr, long moduleId, int preferTypeId) {
		
		List userFavoritesList = DataModelsCache.getInstance().retrieve(UserPreferences.class.getName());
		int count = userFavoritesList == null ? 0 : userFavoritesList.size();
		UserPreferences userPrefrences = null;
		/*if (userId == 0)
			userId = -1;*/
		for (int i = 0; i < count; i++) {
			userPrefrences = (UserPreferences) userFavoritesList.get(i);

			if (domainId == userPrefrences.getDomainId() && languageId == userPrefrences.getLanguageId()
					&& (userId == userPrefrences.getUserId() || userUniqueIdStr.equals(userPrefrences.getUserUniqueId()))
					&& moduleId == userPrefrences.getModuleId() && preferTypeId == userPrefrences.getPreferenceTypeId()) {
				return userPrefrences;
			}
		}
		return null;
	}
}