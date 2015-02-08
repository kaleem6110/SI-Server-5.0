/**
 * 
 */
package com.wfp.beans;

/**
 * @author kaleem.mohammed
 *
 */
public class WFPOffices {
	
	private String type;
	private long totalFeatures;
	private Features[] features;
	private CrsBean crs;
	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}
	/**
	 * @param type the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}
	/**
	 * @return the totalFeatures
	 */
	public long getTotalFeatures() {
		return totalFeatures;
	}
	/**
	 * @param totalFeatures the totalFeatures to set
	 */
	public void setTotalFeatures(long totalFeatures) {
		this.totalFeatures = totalFeatures;
	}
	/**
	 * @return the features
	 */
	public Features[] getFeatures() {
		return features;
	}
	/**
	 * @param features the features to set
	 */
	public void setFeatures(Features[] features) {
		this.features = features;
	}
	/**
	 * @return the crs
	 */
	public CrsBean getCrs() {
		return crs;
	}
	/**
	 * @param crs the crs to set
	 */
	public void setCrs(CrsBean crs) {
		this.crs = crs;
	}
	
	

}
