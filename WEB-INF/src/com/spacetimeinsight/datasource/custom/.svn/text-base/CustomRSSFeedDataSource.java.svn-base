package com.spacetimeinsight.datasource.custom;

import java.util.Date;

import com.enterprisehorizons.magma.datamashup.BaseAuthGeoDatasource;

public class CustomRSSFeedDataSource extends BaseAuthGeoDatasource {

	/**
	 *
	 */
	private static final long serialVersionUID = 7480370567266635153L;
	public static final String COORDINATES_DATAELEMENT = "coordinates";
	private String feedUrl;
	private Date Updated_Date = null; 
	
	public CustomRSSFeedDataSource() {

	}

	public String getFeedUrl() {
		return feedUrl;
	}

	public void setFeedUrl(String feedUrl) {
		this.feedUrl = feedUrl;
	}

	
	public Date getUpdated_Date() {
		return Updated_Date;
	}

	public void setUpdated_Date(Date updatedDate) {
		Updated_Date = updatedDate;
	}

	@Override
	public String getCoordinatesDataElement() {
		return COORDINATES_DATAELEMENT;
	}
}
