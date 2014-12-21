/**
 * 
 */
package com.wfp.security.form;

import org.apache.struts.action.ActionForm;

import com.spacetimeinsight.security.action.ILoginConstants;


public class AlertAckForm extends ActionForm implements ILoginConstants{

	private static final long serialVersionUID = 5682533211823033787L;

	
	private String sourceName = null;
	private String eventId;
	private String eventDate;
	private String message;
	private String priority;
	private String comments;
	private String userId;
	public String getSourceName() {
		return sourceName;
	}
	public void setSourceName(String sourceName) {
		this.sourceName = sourceName;
	}
	public String getEventId() {
		return eventId;
	}
	public void setEventId(String eventId) {
		this.eventId = eventId;
	}
	public String getEventDate() {
		return eventDate;
	}
	public void setEventDate(String eventDate) {
		this.eventDate = eventDate;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getPriority() {
		return priority;
	}
	public void setPriority(String priority) {
		this.priority = priority;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	
	

}
