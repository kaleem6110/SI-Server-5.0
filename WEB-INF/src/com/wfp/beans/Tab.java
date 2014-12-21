/**
 * 
 */
package com.wfp.beans;
import java.util.List;
/**
 * @author kaleem.mohammed
 *
 */
public class Tab {
	public String name;
	public List<Legend> legendList;
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
	 * @return the legendList
	 */
	public List<Legend> getLegendList() {
		return legendList;
	}
	/**
	 * @param legendList the legendList to set
	 */
	public void setLegendList(List<Legend> legendList) {
		this.legendList = legendList;
	}
	
	

}
