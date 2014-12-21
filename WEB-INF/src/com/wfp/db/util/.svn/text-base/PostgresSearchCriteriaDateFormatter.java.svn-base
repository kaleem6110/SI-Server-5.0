package com.wfp.db.util;

import java.util.Date;

import com.enterprisehorizons.db.util.BaseDBSearchCriteriaDateFormatter;

public class PostgresSearchCriteriaDateFormatter extends
		BaseDBSearchCriteriaDateFormatter {
	public static final String DEFAULT_DATE_FORMAT = "MM/dd/yyyy HH:mm:ss";
		
	public PostgresSearchCriteriaDateFormatter() {
		super.setDateFormat(DEFAULT_DATE_FORMAT);
	}

	public String toDatabaseString(Date date) {
		return " '" + format(date) + "'";
	}
	
	@Override
	public void setDateFormat(String dateFormat) {
		// TODO Auto-generated method stub
		super.setDateFormat(DEFAULT_DATE_FORMAT);
	}



}
