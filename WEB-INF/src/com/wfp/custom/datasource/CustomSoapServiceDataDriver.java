package com.wfp.custom.datasource;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.enterprisehorizons.exception.EHRuntimeException;
import com.enterprisehorizons.magma.datamashup.BaseGeoDataDriver;
import com.enterprisehorizons.magma.datamashup.IScriptableDataDriver;
import com.enterprisehorizons.magma.designtime.artifact.IScripter;
import com.enterprisehorizons.util.CollectionUtils;
import com.enterprisehorizons.util.DateUtils;
import com.enterprisehorizons.util.Logger;
import com.enterprisehorizons.util.SearchCriteria;
import com.enterprisehorizons.util.SearchCriteriaHelper;
import com.enterprisehorizons.util.StringUtils;
import com.wfp.jobs.SoapTrackingJob;
import com.wfp.security.form.DeviceBean;
import com.wfp.utils.IEPICConstants;

/**
 * allows to retrieve information about sensor devices, and the location and/or
 * probe measurements which are known for them.
 * 
 * @author sti-user
 * 
 */
public class CustomSoapServiceDataDriver extends BaseGeoDataDriver implements
		IScriptableDataDriver, IEPICConstants {

	private CustomSoapServiceDataSource dataSource = null;
	// private Object dataList[][] = null;
	private IScripter scripter;
	private Object response = null;

	/*
	 * Constructor initializes datasource by invoking a local call to initialise
	 * method.
	 */
	public CustomSoapServiceDataDriver(CustomSoapServiceDataSource datasource) {
		super(datasource);
		this.dataSource = datasource;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.enterprisehorizons.magma.datamashup.IDataDriver#getData()
	 */
	@SuppressWarnings("unchecked")
	public List getData() {
		try {

			setCustomSearchCriteria();

			/*
			 * if(dataSource.getDeviceIds() != null){ return
			 * SensorServiceUtils.getEmergencySpotDtls(dataSource.getDeviceIds(),
			 * getStartTime(), getEndTime(), dataSource.getLayerName()); }
			 * return SensorServiceUtils.getEmergencySpotDtls(getStartTime(),
			 * getEndTime(),dataSource.getLayerName());
			 */
			if (dataSource.getLayerName().contains(LAYER_STAFF)) {
				// return
				return getList(SoapTrackingJob.getInstance()
						.getSoapServiceList(LAYER_STAFF), getStartTime(),
						getEndTime(), dataSource.getDeviceIds());
			} else if (dataSource.getLayerName().contains(LAYER_VEHICLE)) {
				// return
				return getList(SoapTrackingJob.getInstance()
						.getSoapServiceList(LAYER_VEHICLE), getStartTime(),
						getEndTime(), dataSource.getDeviceIds());
			} else if (dataSource.getLayerName().contains(LAYER_AIRPLANE)) {
				// return
				return getList(SoapTrackingJob.getInstance()
						.getSoapServiceList(LAYER_AIRPLANE), getStartTime(),
						getEndTime(), dataSource.getDeviceIds());
			}
			return null;

		} catch (Exception exception) {

			Logger.error("Exception during webservice invokation ",
					"WebServiceDataDriver", exception);
			throw new EHRuntimeException(
					"Exception during webservice invokation "
							+ exception.getMessage(), exception);
		}
	}

	@SuppressWarnings( { "deprecation", "unchecked" })
	private List getList(
			Map<String, Map<String, List<DeviceBean>>> soapServiceMap,
			Date startTime, Date endTime, String[] deviceIds) {
		Collection<DeviceBean> result = null;
		Logger.info("Actual number of objects before filtering for the layer ["
				+ dataSource.getLayerName() + "] are ["
				+ (soapServiceMap != null ? soapServiceMap.size() : 0) + "] ",
				CustomSoapServiceDataDriver.class);

		if (soapServiceMap != null) {
			result = new ArrayList<DeviceBean>();
			for (Map.Entry<String, Map<String, List<DeviceBean>>> tempMap : soapServiceMap
					.entrySet()) {
				Map<String, List<DeviceBean>> deviceMap = null;
				Calendar cal = Calendar.getInstance();
				if (startTime != null && endTime != null
						&& startTime.compareTo(endTime) == 0) {

					endTime.setHours(23);
					endTime.setMinutes(00);
					endTime.setSeconds(00);
					cal.setTime(endTime);

					startTime.setHours(00);
					startTime.setMinutes(0);
					startTime.setSeconds(0);
				}
					//System.out.println(" tempMap.getKey() : "+tempMap.getKey() );
				if (startTime != null
						&& endTime != null
						&& DateUtils.getDate(tempMap.getKey()).compareTo(
								startTime) >= 0
						&& DateUtils.getDate(tempMap.getKey()).compareTo(
								endTime) <= 0) {
					deviceMap = tempMap.getValue();
					// CollectionUtils.addAll(result, tempMap.getValue());
				} else if (endTime == null || startTime == null) {
					deviceMap = tempMap.getValue();
				} else if (startTime != null && endTime != null
						&& startTime.compareTo(endTime) == 0) {
					if (DateUtils.format(endTime).equalsIgnoreCase(
							tempMap.getKey()))
						deviceMap = tempMap.getValue();
				}

				if (deviceIds == null) {
					if (deviceMap != null) {
						for (Map.Entry<String, List<DeviceBean>> entry : deviceMap
								.entrySet()) {
							CollectionUtils.addAll(result, entry.getValue()
									.toArray());
						}
					}

				} else {
					for (String device : deviceIds) {
						if (deviceMap != null) {
							if (deviceMap.get(device) != null) {
								CollectionUtils.addAll(result, deviceMap.get(
										device).toArray());
							}
						}
					}

				}
			}
		}
		Logger.info("Actual number of objects after filtering for the layer ["
				+ dataSource.getLayerName() + "] are ["
				+ (result != null ? result.size() : 0) + "] ",
				CustomSoapServiceDataDriver.class);
		return (List) result;
	}

	/**
	 * functionality taking care for searching the data based on user inputs.
	 */
	void setCustomSearchCriteria() {
		// retrieve the search criteria
		SearchCriteria sc = null;//TODO getSearchCriteria();
		SearchCriteriaHelper sch = null;
		Object[][] timeSearch = null;
		Object[][] nameSearch = null;
		if (sc != null) {
			// get the search criteria for specified property
			sch = sc.getSearchCritera(PARAM_TIME);
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
			// get the search criteria for specified property
			sch = sc.getSearchCritera(PARAM_NAME);
			if (sch != null) {
				nameSearch = sch.getSearchConditions();
				if (nameSearch[0][2] instanceof String) {
					String[] str = new String[1];
					str[0] = (String) nameSearch[0][2];
					dataSource.setDeviceIds((String[]) str);
				} else {
					dataSource.setDeviceIds((String[]) nameSearch[0][2]);
				}
			}
		}
	}

	@Override
	public boolean supportsSearch() {
		// TODO Auto-generated method stub
		return true;
	}

	public IScripter getScripter() {
		return scripter;
	}

	public void setScripter(IScripter scripter) {
		this.scripter = scripter;
	}

	public Object getResponse() {
		return response;
	}

	public void setResponse(Object response) {
		this.response = response;
	}

	public static void main(String args[]) {

	}

}
