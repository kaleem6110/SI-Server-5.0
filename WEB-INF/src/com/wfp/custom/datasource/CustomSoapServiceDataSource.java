package com.wfp.custom.datasource;

import com.enterprisehorizons.magma.datamashup.BaseGeoDataSource;

/**
 * Soap Datasource having name & time properties
 * 
 * @author sti-user
 * 
 */
public class CustomSoapServiceDataSource extends BaseGeoDataSource {

	private static final long serialVersionUID = 0L;

	private String time = null;
	private String[] name = null;
	private String[] deviceId = null;
	private String layerName = null;
	private String dataScript = null;

	public CustomSoapServiceDataSource() {
	}

	public String getDataScript() {
		return dataScript;
	}

	public void setDataScript(String dataScript) {
		this.dataScript = dataScript;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String[] getName() {
		return name;
	}

	public void setName(String[] name) {
		this.name = name;
	}

	public String getLayerName() {
		return layerName;
	}

	public void setLayerName(String layerName) {
		this.layerName = layerName;
	}

	public String[] getDeviceIds() {
		return deviceId;
	}

	public void setDeviceIds(String[] deviceIds) {
		this.deviceId = deviceIds;
	}

}
