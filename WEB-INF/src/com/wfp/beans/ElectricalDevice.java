package com.wfp.beans;

import java.util.Date;
import java.util.List;

public class ElectricalDevice {
	
	private String deviceName;
	private Date updated;
	private String coordinates;
	private String ipAddress;
	//items
	private List<ElectricalItem> itemList;
	/**
	 * @return the deviceName
	 */
	public String getDeviceName() {
		return deviceName;
	}
	/**
	 * @param deviceName the deviceName to set
	 */
	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}
	/**
	 * @return the updated
	 */
	public Date getUpdated() {
		return updated;
	}
	/**
	 * @param updated the updated to set
	 */
	public void setUpdated(Date updated) {
		this.updated = updated;
	}
	/**
	 * @return the coordinates
	 */
	public String getCoordinates() {
		return coordinates;
	}
	/**
	 * @param coordinates the coordinates to set
	 */
	public void setCoordinates(String coordinates) {
		this.coordinates = coordinates;
	}
	/**
	 * @return the ipAddress
	 */
	public String getIpAddress() {
		return ipAddress;
	}
	/**
	 * @param ipAddress the ipAddress to set
	 */
	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}
	/**
	 * @return the itemList
	 */
	public List<ElectricalItem> getItemList() {
		return itemList;
	}
	/**
	 * @param itemList the itemList to set
	 */
	public void setItemList(List<ElectricalItem> itemList) {
		this.itemList = itemList;
	}

}
