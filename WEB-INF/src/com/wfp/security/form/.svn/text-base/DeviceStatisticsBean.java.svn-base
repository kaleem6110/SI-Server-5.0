package com.wfp.security.form;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@SuppressWarnings("unchecked")
public class DeviceStatisticsBean implements Serializable{

	private static final long serialVersionUID = 0L;

	private String deviceName;
	private Map<String, RegionStatsBean> statsBean = new HashMap();
	
	
	
	public static class RegionStatsBean {
		
		private boolean inSameZone = false;
		private Date enteredAt = null;
		private Date leftAt = null;
		private String deviceId = null;
		private String zoneName = null;
		private boolean eventFired = false;
		private long nTimes = 0;
		private long currentAlertCount = 1; 
		public Date getEnteredAt() {
			return enteredAt;
		}
		public void setEnteredAt(Date enteredAt) {
			this.enteredAt = enteredAt;
		}
		public Date getLeftAt() {
			return leftAt;
		}
		public void setLeftAt(Date leftAt) {
			this.leftAt = leftAt;
		}
		public String getDeviceId() {
			return deviceId;
		}
		public void setDeviceId(String deviceId) {
			this.deviceId = deviceId;
		}
		public boolean isInSameZone() {
			return inSameZone;
		}
		public void setInSameZone(boolean inSafeZone) {
			this.inSameZone = inSafeZone;
		}
		public String getZoneName() {
			return zoneName;
		}
		public void setZoneName(String zoneName) {
			this.zoneName = zoneName;
		}
		public boolean isEventFired() {
			return eventFired;
		}
		public void setEventFired(boolean eventFired) {
			this.eventFired = eventFired;
		}
		public long getNTimes() {
			return nTimes;
		}
		public void setNTimes(long times) {
			nTimes = times;
		}
		public long getCurrentAlertCount() {
			return currentAlertCount;
		}
		public void setCurrentAlertCount(long currentAlertCount) {
			this.currentAlertCount = currentAlertCount;
		}
		
		
		
		
	}



	public String getDeviceName() {
		return deviceName;
	}



	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}



	public Map<String, RegionStatsBean> getStatsBean() {
		return statsBean;
	}



	public void setStatsBean(Map<String, RegionStatsBean> statsBean) {
		this.statsBean = statsBean;
	}



	
	
	
}
