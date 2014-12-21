package com.wfp.security.form;

import java.util.List;


public class LDAPUserBean {

	private List<String> mail = null;
	private String homePhone = "";
	private List<String> mobilesList = null;
	private String deviceId = "";
	private String uid= "";
	private String cn = ""; //common name
	private List<String> skypePager = null;
	private String sn = "";
	private String organization = "";
	private String fleet = "";
	private String unit = "";
	private String callSign = "";
	private String vehicleType= "";
	private String vehicleReg = "";
	private String description = "";
	private String licensePlate = "";
	private String title ="";
	private List<String> authorizedGroupsList = null;
	private String personalTitle =null;
	private String primaryEmail;
    private String department;
    private String photoString;
    private String gender;
    private String shortOrganization;
    private List<String> vehicleID = null;
    private String internalID;
    private String locality;
    private String country;
    private String street;
    private String postalCode;
    
    
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	/**
	 * @return the internalID
	 */
	public String getInternalID() {
		return internalID;
	}
	/**
	 * @param internalID the internalID to set
	 */
	public void setInternalID(String internalID) {
		this.internalID = internalID;
	}
	/**
	 * @return the shortOrganization
	 */
	public String getShortOrganization() {
		return shortOrganization;
	}
	/**
	 * @param shortOrganization the shortOrganization to set
	 */
	public void setShortOrganization(String shortOrganization) {
		this.shortOrganization = shortOrganization;
	}
	public String getLocality() {
		return locality;
	}
	public void setLocality(String locality) {
		this.locality = locality;
	}
	/**
	 * @return the gender
	 */
	public String getGender() {
		return gender;
	}
	/**
	 * @param gender the gender to set
	 */
	public void setGender(String gender) {
		this.gender = gender;
	}
	/**
	 * @return the primaryEmail
	 */
	public String getPrimaryEmail() {
		return primaryEmail;
	}
	/**
	 * @param primaryEmail the primaryEmail to set
	 */
	public void setPrimaryEmail(String primaryEmail) {
		this.primaryEmail = primaryEmail;
	}
	/**
	 * @return the department
	 */
	public String getDepartment() {
		return department;
	}
	/**
	 * @param department the department to set
	 */
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getOrganization() {
		return organization;
	}
	public void setOrganization(String organization) {
		this.organization = organization;
	}
	
	public String getHomePhone() {
		return homePhone;
	}
	public void setHomePhone(String homePhone) {
		this.homePhone = homePhone;
	}

	public List<String> getMobilesList() {
		return mobilesList;
	}
	public void setMobilesList(List<String> mobilesList) {
		this.mobilesList = mobilesList;
	}
	public String getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public String getCn() {
		return cn;
	}
	public void setCn(String cn) {
		this.cn = cn;
	}

	public List<String> getMail() {
		return mail;
	}
	public void setMail(List<String> mail) {
		this.mail = mail;
	}
	public List<String> getSkypePager() {
		return skypePager;
	}
	public void setSkypePager(List<String> skypePager) {
		this.skypePager = skypePager;
	}
	public String getSn() {
		return sn;
	}
	public void setSn(String sn) {
		this.sn = sn;
	}
	public String getFleet() {
		return fleet;
	}
	public void setFleet(String fleet) {
		this.fleet = fleet;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getCallSign() {
		return callSign;
	}
	public void setCallSign(String callSign) {
		this.callSign = callSign;
	}
	public String getVehicleType() {
		return vehicleType;
	}
	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}
	public String getVehicleReg() {
		return vehicleReg;
	}
	public void setVehicleReg(String vehicleReg) {
		this.vehicleReg = vehicleReg;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getLicensePlate() {
		return licensePlate;
	}
	public void setLicensePlate(String licensePlate) {
		this.licensePlate = licensePlate;
	}
	public List<String> getAuthorizedGroupsList() {
		return authorizedGroupsList;
	}
	public void setAuthorizedGroupsList(List<String> authorizedGroupsList) {
		this.authorizedGroupsList = authorizedGroupsList;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	/**
	 * @return the personalTitle
	 */
	public String getPersonalTitle() {
		return personalTitle;
	}
	/**
	 * @param personalTitle the personalTitle to set
	 */
	public void setPersonalTitle(String personalTitle) {
		this.personalTitle = personalTitle;
	}
	/**
	 * @return the photoString
	 */
	public String getPhotoString() {
		return photoString;
	}
	/**
	 * @param photoString the photoString to set
	 */
	public void setPhotoString(String photoString) {
		this.photoString = photoString;
	}
	/**
	 * @return the vehicleID
	 */
	public List<String> getVehicleID() {
		return vehicleID;
	}
	/**
	 * @param vehicleID the vehicleID to set
	 */
	public void setVehicleID(List<String> vehicleID) {
		this.vehicleID = vehicleID;
	}
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getPostalCode() {
		return postalCode;
	}
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}
	
	
	
	
	
}
