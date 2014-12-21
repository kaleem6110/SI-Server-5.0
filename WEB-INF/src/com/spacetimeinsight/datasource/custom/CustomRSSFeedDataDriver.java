package com.spacetimeinsight.datasource.custom;

import java.util.Date;
import java.util.List;

import com.enterprisehorizons.conversion.rss.RSSFeed;
import com.enterprisehorizons.conversion.rss.RSSFeedRecord;
import com.enterprisehorizons.magma.datamashup.BaseGeoDataDriver;
import com.enterprisehorizons.magma.datamashup.IDataSource;
import com.enterprisehorizons.util.SearchCriteria;
import com.enterprisehorizons.util.SearchCriteriaHelper;
import com.enterprisehorizons.util.StringUtils;

public class CustomRSSFeedDataDriver extends BaseGeoDataDriver {

	private RSSFeed feed = null;

	public CustomRSSFeedDataDriver(CustomRSSFeedDataSource datasource) {
		super(datasource);
	}

	public void initialize(IDataSource datasource) {
		if (datasource == null) {
			datasource = getDataSource();
		}
		if (datasource != null) {
			CustomRSSFeedDataSource rssFeedDatasource = (CustomRSSFeedDataSource) datasource;
			feed = new RSSFeed(rssFeedDatasource.getFeedUrl(),
					rssFeedDatasource.getUserId(), rssFeedDatasource
							.getPassword(), rssFeedDatasource
							.getAuthenticationType());
			setDataMetaData(getDataMetaData(feed.getAttributeNames(), feed
					.getAttributeTypes()));
		}
		super.initialize(datasource);
	}

	@Override
	public Object getDataElementValue(String dataElementName, Object dataRow) {
		if (dataRow != null && dataElementName != null) {
			if (dataRow instanceof RSSFeedRecord) {
				if (CustomRSSFeedDataSource.COORDINATES_DATAELEMENT
						.equals(dataElementName)) {
					return ((RSSFeedRecord) dataRow).getCoordinates();
				}
				return ((RSSFeedRecord) dataRow)
						.getAttributeValue(dataElementName);
			}
		}

		return null;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.enterprisehorizons.magma.data.IDataDriver#getData()
	 */
	@SuppressWarnings("unchecked")
	public List getData() {
		setCustomSearchCriteria();

		return feed != null ? feed.getRecordsAsList() : null;
	}

	/**
	 * functionality taking care for searching the data based on user inputs.
	 */
	void setCustomSearchCriteria() {
		// retrieve the search criteria
		SearchCriteria sc = null;//TODO getSearchCriteria();
		SearchCriteriaHelper sch = null;
		Object[][] timeSearch = null;
		if (sc != null) {
			// get the search criteria for specified property
			sch = sc.getSearchCritera("Updated_Date");
			if (sch != null) {
				timeSearch = sch.getSearchConditions();
				if (timeSearch != null && timeSearch.length == 1) {
					if (StringUtils.getInt(timeSearch[0][1]) == 0) {
						setTimeSpan((Date) timeSearch[0][2],
								(Date) timeSearch[0][2]);
					} else if (StringUtils.getInt(timeSearch[0][1]) == 4) {
						Date date = (Date) timeSearch[0][2];
						if (date != null) {
							long time = date.getTime();
							// add 1 second in case of greater than.
							time = time + 1;
							date.setTime(time);
						}
						setTimeSpan(date, null);
					} else if (StringUtils.getInt(timeSearch[0][1]) == 5) {
						Date date = (Date) timeSearch[0][2];
						if (date != null) {
							long time = date.getTime();
							// subtract 1 second in case of less than.
							time = time - 1;
							date.setTime(time);
						}
						setTimeSpan(null, date);
					} else if (StringUtils.getInt(timeSearch[0][1]) == 6) {
						setTimeSpan((Date) timeSearch[0][2], null);
					} else if (StringUtils.getInt(timeSearch[0][1]) == 7) {
						setTimeSpan(null, (Date) timeSearch[0][2]);
					}
				} else if (timeSearch != null && timeSearch.length == 2) {
					Date startDate = null;
					Date endDate = null;
					for (int i = 0; i < 2; i++) {
						if (StringUtils.getInt(timeSearch[i][1]) == 4) {
							startDate = (Date) timeSearch[i][2];
							if (startDate != null) {
								long time = startDate.getTime();
								// add 1 second in case of greater than.
								time = time + 1;
								startDate.setTime(time);
							}
						} else if (StringUtils.getInt(timeSearch[i][1]) == 6) {
							startDate = (Date) timeSearch[i][2];
						} else if (StringUtils.getInt(timeSearch[i][1]) == 5) {
							endDate = (Date) timeSearch[i][2];
							if (endDate != null) {
								long time = endDate.getTime();
								// subtract 1 second in case of less than.
								time = time - 1;
								endDate.setTime(time);
							}
						} else if (StringUtils.getInt(timeSearch[i][1]) == 7) {
							endDate = (Date) timeSearch[i][2];
						}
					}
					setTimeSpan(startDate, endDate);
				}
			}
		}
	}

	@Override
	public boolean supportsSearch() {
		// TODO Auto-generated method stub
		return true;
	}
}
