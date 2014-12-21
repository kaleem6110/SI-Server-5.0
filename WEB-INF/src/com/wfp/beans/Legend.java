/**
 * 
 */
package com.wfp.beans;
import java.util.List;
import java.util.Map;
/**
 * @author kaleem.mohammed
 *
 */
public class Legend {
	
	public String name;
	public Map<String, String> attribMap;
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
	 * @return the attribMap
	 */
	public Map<String, String> getAttribMap() {
		return attribMap;
	}
	/**
	 * @param attribMap the attribMap to set
	 */
	public void setAttribMap(Map<String, String> attribMap) {
		this.attribMap = attribMap;
	}

}
