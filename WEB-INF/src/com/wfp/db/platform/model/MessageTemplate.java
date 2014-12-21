package com.wfp.db.platform.model;

import java.util.Date;

import com.enterprisehorizons.db.model.BaseModel;
import com.spacetimeinsight.db.model.ICacheableModel;

public class MessageTemplate extends BaseModel implements ICacheableModel {
	/**
		 * 
		 */
	private static final long serialVersionUID = -7177004961908518897L;
	private String subject;
	private String body;
	private String name;
	private Long recurPerDay;
	private Long triggerTime;
	private String startDateTime;
	private String endDateTime;
	private String flag;
	private Date createdDate;
	private Date modifiedDate;
	private String updatedBy;
	private Date startDate;
	private Date endDate;
	private String email;
	private String exclusionEmail;
	
	
	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public Long getRecurPerDay() {
		return recurPerDay;
	}

	public void setRecurPerDay(Long recurPerDay) {
		this.recurPerDay = recurPerDay;
	}

	public Long getTriggerTime() {
		return triggerTime;
	}

	public void setTriggerTime(Long triggerTime) {
		this.triggerTime = triggerTime;
	}

	

	public String getStartDateTime() {
		return startDateTime;
	}

	public void setStartDateTime(String startDateTime) {
		this.startDateTime = startDateTime;
	}

	public String getEndDateTime() {
		return endDateTime;
	}

	public void setEndDateTime(String endDateTime) {
		this.endDateTime = endDateTime;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	public String getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	/**
	 * @return the exclusionEmail
	 */
	public String getExclusionEmail() {
		return exclusionEmail;
	}

	/**
	 * @param exclusionEmail the exclusionEmail to set
	 */
	public void setExclusionEmail(String exclusionEmail) {
		this.exclusionEmail = exclusionEmail;
	}

	
}
