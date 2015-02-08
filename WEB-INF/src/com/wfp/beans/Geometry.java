/**
 * 
 */
package com.wfp.beans;

/**
 * @author kaleem.mohammed
 *
 */
public class Geometry {
	
	private String type;
	private long[] coordinates;
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
	 * @return the coordinates
	 */
	public long[] getCoordinates() {
		return coordinates;
	}
	/**
	 * @param coordinates the coordinates to set
	 */
	public void setCoordinates(long[] coordinates) {
		this.coordinates = coordinates;
	}

}
