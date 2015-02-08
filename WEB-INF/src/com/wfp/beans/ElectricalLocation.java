/**
 * 
 */
package com.wfp.beans;

import java.util.Date;
import java.util.List;

/**
 * @author kaleem.mohammed
 *
 */
public class ElectricalLocation {

	//location
	private String name;
	private String timezone;
	
	private List<ElectricalDevice> deviceList;

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the timezone
	 */
	public String getTimezone() {
		return timezone;
	}

	/**
	 * @param timezone the timezone to set
	 */
	public void setTimezone(String timezone) {
		this.timezone = timezone;
	}

	/**
	 * @return the deviceList
	 */
	public List<ElectricalDevice> getDeviceList() {
		return deviceList;
	}

	/**
	 * @param deviceList the deviceList to set
	 */
	public void setDeviceList(List<ElectricalDevice> deviceList) {
		this.deviceList = deviceList;
	}
	
}