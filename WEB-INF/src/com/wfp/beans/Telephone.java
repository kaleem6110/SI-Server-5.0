/**
 * 
 */
package com.wfp.beans;
import java.util.List;
/**
 * @author kaleem.mohammed
 *
 */
public class Telephone {
private List<String> mobileList;
private String radio;
private String wave;
private String office;
private String foodsat;
private String fax;
/**
 * @return the foodsat
 */
public String getFoodsat() {
	return foodsat;
}
/**
 * @param foodsat the foodsat to set
 */
public void setFoodsat(String foodsat) {
	this.foodsat = foodsat;
}
/**
 * @return the mobileList
 */
public List<String> getMobileList() {
	return mobileList;
}
/**
 * @param mobileList the mobileList to set
 */
public void setMobileList(List<String> mobileList) {
	this.mobileList = mobileList;
}
/**
 * @return the radio
 */
public String getRadio() {
	return radio;
}
/**
 * @param radio the radio to set
 */
public void setRadio(String radio) {
	this.radio = radio;
}
/**
 * @return the wave
 */
public String getWave() {
	return wave;
}
/**
 * @param wave the wave to set
 */
public void setWave(String wave) {
	this.wave = wave;
}
/**
 * @return the office
 */
public String getOffice() {
	return office;
}
/**
 * @param office the office to set
 */
public void setOffice(String office) {
	this.office = office;
}
/**
 * @return the fax
 */
public String getFax() {
	return fax;
}
/**
 * @param fax the fax to set
 */
public void setFax(String fax) {
	this.fax = fax;
}

}
