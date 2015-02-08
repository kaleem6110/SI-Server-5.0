/**
 * 
 */
package com.wfp.beans;

/**
 * @author kaleem.mohammed
 *
 */
public class Features {
	
	private String type;
	private String id;
	Geometry geometry;
	private String geometry_name;
	private Properties properties;
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
	 * @return the id
	 */
	public String getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}
	/**
	 * @return the geometry
	 */
	public Geometry getGeometry() {
		return geometry;
	}
	/**
	 * @param geometry the geometry to set
	 */
	public void setGeometry(Geometry geometry) {
		this.geometry = geometry;
	}
	/**
	 * @return the geometry_name
	 */
	public String getGeometry_name() {
		return geometry_name;
	}
	/**
	 * @param geometry_name the geometry_name to set
	 */
	public void setGeometry_name(String geometry_name) {
		this.geometry_name = geometry_name;
	}
	/**
	 * @return the properties
	 */
	public Properties getProperties() {
		return properties;
	}
	/**
	 * @param properties the properties to set
	 */
	public void setProperties(Properties properties) {
		this.properties = properties;
	}	

}
