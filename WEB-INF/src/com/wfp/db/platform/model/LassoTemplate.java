/**
 * 
 */
package com.wfp.db.platform.model;

import com.enterprisehorizons.db.model.BaseModel;
import com.spacetimeinsight.db.model.ICacheableModel;
import java.util.Date;
/**
 * @author kaleem.mohammed
 *
 */
public class LassoTemplate extends BaseModel implements ICacheableModel {
	
	private static final long serialVersionUID = -7177004961908518897L;
	private String name;
	private String label;
	private String description;
	private String listType;
	private String owner;
	private String createdBy;
	private Date createdDate;
	private String modifiedBy;
	private Date modifiedDate;
	private String subject;
	private String message;
	private Integer recurrence;
	private Integer interval;
	private String includeEmail;
	private String excludeEmail;
	private Integer moduleId;
	private Integer languageId;
	private Integer domainId;
	private String userUniqueId;
	private Date startDate;
	private Date endDate;
	
	
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
	 * @return the label
	 */
	public String getLabel() {
		return label;
	}
	/**
	 * @param label the label to set
	 */
	public void setLabel(String label) {
		this.label = label;
	}
	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}
	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}
	/**
	 * @return the listType
	 */
	public String getListType() {
		return listType;
	}
	/**
	 * @param listType the listType to set
	 */
	public void setListType(String listType) {
		this.listType = listType;
	}
	/**
	 * @return the owner
	 */
	public String getOwner() {
		return owner;
	}
	/**
	 * @param owner the owner to set
	 */
	public void setOwner(String owner) {
		this.owner = owner;
	}
	/**
	 * @return the createdBy
	 */
	public String getCreatedBy() {
		return createdBy;
	}
	/**
	 * @param createdBy the createdBy to set
	 */
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	/**
	 * @return the createdDate
	 */
	public Date getCreatedDate() {
		return createdDate;
	}
	/**
	 * @param createdDate the createdDate to set
	 */
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	/**
	 * @return the modifiedBy
	 */
	public String getModifiedBy() {
		return modifiedBy;
	}
	/**
	 * @param modifiedBy the modifiedBy to set
	 */
	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}
	/**
	 * @return the modifiedDate
	 */
	public Date getModifiedDate() {
		return modifiedDate;
	}
	/**
	 * @param modifiedDate the modifiedDate to set
	 */
	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}
	/**
	 * @return the subject
	 */
	public String getSubject() {
		return subject;
	}
	/**
	 * @param subject the subject to set
	 */
	public void setSubject(String subject) {
		this.subject = subject;
	}
	/**
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}
	/**
	 * @param message the message to set
	 */
	public void setMessage(String message) {
		this.message = message;
	}
	/**
	 * @return the recurrence
	 */
	public Integer getRecurrence() {
		return recurrence;
	}
	/**
	 * @param recurrence the recurrence to set
	 */
	public void setRecurrence(Integer recurrence) {
		this.recurrence = recurrence;
	}
	/**
	 * @return the interval
	 */
	public Integer getInterval() {
		return interval;
	}
	/**
	 * @param interval the interval to set
	 */
	public void setInterval(Integer interval) {
		this.interval = interval;
	}
	/**
	 * @return the includeEmail
	 */
	public String getIncludeEmail() {
		return includeEmail;
	}
	/**
	 * @param includeEmail the includeEmail to set
	 */
	public void setIncludeEmail(String includeEmail) {
		this.includeEmail = includeEmail;
	}
	/**
	 * @return the excludeEmail
	 */
	public String getExcludeEmail() {
		return excludeEmail;
	}
	/**
	 * @param excludeEmail the excludeEmail to set
	 */
	public void setExcludeEmail(String excludeEmail) {
		this.excludeEmail = excludeEmail;
	}
	/**
	 * @return the moduleId
	 */
	public Integer getModuleId() {
		return moduleId;
	}
	/**
	 * @param moduleId the moduleId to set
	 */
	public void setModuleId(Integer moduleId) {
		this.moduleId = moduleId;
	}
	/**
	 * @return the languageId
	 */
	public Integer getLanguageId() {
		return languageId;
	}
	/**
	 * @param languageId the languageId to set
	 */
	public void setLanguageId(Integer languageId) {
		this.languageId = languageId;
	}
	/**
	 * @return the domainId
	 */
	public Integer getDomainId() {
		return domainId;
	}
	/**
	 * @param domainId the domainId to set
	 */
	public void setDomainId(Integer domainId) {
		this.domainId = domainId;
	}
	/**
	 * @return the userUniqueId
	 */
	public String getUserUniqueId() {
		return userUniqueId;
	}
	/**
	 * @param userUniqueId the userUniqueId to set
	 */
	public void setUserUniqueId(String userUniqueId) {
		this.userUniqueId = userUniqueId;
	}
	/**
	 * @return the startDate
	 */
	public Date getStartDate() {
		return startDate;
	}
	/**
	 * @param startDate the startDate to set
	 */
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	/**
	 * @return the endDate
	 */
	public Date getEndDate() {
		return endDate;
	}
	/**
	 * @param endDate the endDate to set
	 */
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	

}
