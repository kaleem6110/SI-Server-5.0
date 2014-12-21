package com.wfp.offline.synchronize;

import java.util.Date;
import java.util.List;

import com.wfp.synchronize.db.config.model.SynchronizationTrailLog;

public interface ISynchronizationService extends ISynchronizationServiceConstants {

	public long getDomainId();
	public boolean isTraceById();
	public long getLanguageId();
	public String synchronizeData(); 
	public String getTerminalServerName();
	public String getCentralServerName();
	public boolean isTerminalServer(); 
	public Date getTerminalRequestTime();
	public void setTerminalRequestTime(Date date);
	public List<SynchronizationTrailLog> getTraceLogs();
	public void addTraceLogs(SynchronizationTrailLog newTraceLog);
}
