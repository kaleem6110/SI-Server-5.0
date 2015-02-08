package com.wfp.custom.datasource;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.enterprisehorizons.exception.EHRuntimeException;
import com.enterprisehorizons.magma.datamashup.BaseGeoDataDriver;
import com.enterprisehorizons.magma.datamashup.IScriptableDataDriver;
import com.enterprisehorizons.magma.designtime.artifact.IScripter;
import com.enterprisehorizons.util.Logger;
import com.enterprisehorizons.util.SearchCriteria;
import com.enterprisehorizons.util.SearchCriteriaHelper;
import com.enterprisehorizons.util.StringUtils;
import com.wfp.jobs.RestTrackingJob;
import com.wfp.security.form.DeviceBean;
import com.wfp.utils.CommonUtils;
import com.wfp.utils.IEPICConstants;

/**
 * Rest Service handler which fetch & saves the details of all the known devices
 * in cache. This acts as a main datasource for STAFF/Vehicle/Airplane tracking
 * ecosystems. This class stores all the data of devices in cache with Key
 * "$REST_Service$"
 * 
 * @author sti-user
 * 
 */
public class CustomWebServiceDataDriver extends BaseGeoDataDriver implements
		IScriptableDataDriver, IEPICConstants {

	private CustomWebServiceDataSource dataSource = null;
	private IScripter scripter;
	private Object response = null;

	/*
	 * Constructor initializes datasource by invoking a local call to initialise
	 * method.
	 */
	public CustomWebServiceDataDriver(CustomWebServiceDataSource datasource) {
		super(datasource);
		this.dataSource = datasource;
		/*
		 * if(getRestServiceCacheMap() == null){ Cache.store(CACHE_REST_SERVICE,
		 * new HashMap<String, DeviceBean>()); }
		 */

	}

	/*
	 * private Map<String, DeviceBean> getRestServiceCacheMap(){ return (Map<String,
	 * DeviceBean>) Cache.retrieve(CACHE_REST_SERVICE); }
	 */

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.enterprisehorizons.magma.datamashup.IDataDriver#getData()
	 */
	@SuppressWarnings("unchecked")
	public List getData() {
		try {
			List<DeviceBean> indigoList = new ArrayList();
			List<DeviceBean> currentDeviceList = null;
			setCustomSearchCriteria();
			currentDeviceList = getList();
			if(currentDeviceList!=null ) System.out.println(" currentDeviceList : "+ currentDeviceList.size() );
			Logger.info(
					"Actual number of objects before filtering for the layer ["
							+ dataSource.getLayerName()
							+ "] are ["
							+ (currentDeviceList != null ? currentDeviceList
									.size() : 0) + "] ",
					CustomWebServiceDataDriver.class);

			if (currentDeviceList != null) {
				for (DeviceBean device : currentDeviceList) {
					addDevice(device, indigoList);
				}
			}
			Logger.perf(
					"Actual number of objects after filtering for the layer ["
							+ dataSource.getLayerName() + "] are ["
							+ (indigoList != null ? indigoList.size() : 0)
							+ "] ", CustomWebServiceDataDriver.class);

			return indigoList;

			/*
			 * List<DeviceBean> indigoList = new ArrayList(); Element rootNode =
			 * null; String expression = null;
			 * 
			 * String xmlString = ValidateCertificateCall.callSecureURI();
			 * if(StringUtils.isNull(xmlString)){ return null; }
			 * 
			 * rootNode = XMLUtils.getRootNode(xmlString,true); expression =
			 * PARAM_XPR; List<Element> list = XMLUtils.evaluate(rootNode,
			 * expression); setCustomSearchCriteria(); //Object lists =
			 * getDataInput(); for (int i=0;i <list.size(); i++){ Element
			 * element = list.get(i);
			 * 
			 * addDevice(element, indigoList);
			 *  }
			 * 
			 * //return (List)
			 * Arrays.asList(getRestServiceCacheMap().values().toArray());
			 * return indigoList;
			 */

		} catch (Exception exception) {

			Logger.error("Exception during webservice invokation ",
					"WebServiceDataDriver", exception);
			throw new EHRuntimeException(
					"Exception during webservice invokation "
							+ exception.getMessage(), exception);
		}

	}
	
	@SuppressWarnings("unchecked")
	private List<DeviceBean> getList()
	{
		List<DeviceBean> currentDeviceList = null;
		
		if (dataSource.getLayerName().toLowerCase().contains(KEY_STAFF))
		{
 			currentDeviceList = RestTrackingJob.getInstance().getRestServiceMapCache().get(KEY_STAFF);
		} 
		else if (dataSource.getLayerName().toLowerCase().contains( KEY_VEHICLE)) 
		{
			currentDeviceList = RestTrackingJob.getInstance().getRestServiceList(KEY_VEHICLE);
		} 
		else if (dataSource.getLayerName().toLowerCase().contains( KEY_AIRPLANE))
		{
			currentDeviceList = RestTrackingJob.getInstance().getRestServiceList(KEY_AIRPLANE);
		}
		else if (dataSource.getLayerName().toLowerCase().contains( 	KEY_NOSACO_RAPID)) 
		{
			currentDeviceList = RestTrackingJob.getInstance().getRestServiceList(KEY_NOSACO_RAPID);
		} 
		else if (dataSource.getLayerName().toLowerCase().contains( 	KEY_NOSACO_REGULAR )) 
		{
			currentDeviceList = RestTrackingJob.getInstance().getRestServiceList(KEY_NOSACO_REGULAR);
		}
		else if (dataSource.getLayerName().toLowerCase().contains( KEY_NOSACO_TERMINALS ) )
		{	
			currentDeviceList = RestTrackingJob.getInstance().getRestServiceList(KEY_NOSACO_TERMINALS);
			Logger.info(" Inside : nosaco : currentDeviceList: "+ currentDeviceList, CustomWebServiceDataDriver.class ) ;
			
		}
 		if( currentDeviceList!=null) Logger.info(" currentDeviceList :"+currentDeviceList.size(), CustomWebServiceDataDriver.class );
 		
 		return currentDeviceList;
	}

	private void addDevice(DeviceBean device, List<DeviceBean> indigoList) 
	{
		if (dataSource.getDeviceIds() != null) 
		{
			boolean isValid = false;
			for (String deviceId : dataSource.getDeviceIds()) {
				Date date = CommonUtils.parseDate(device.getTime(), IEPICConstants.NEW_PORTAL_DATE_FORMAT );
				if (deviceId.equalsIgnoreCase(device.getName()) && date
						.compareTo(getStartTime() != null? getStartTime() :date) >= 0 && date
						.compareTo(getEndTime() != null ? getEndTime() : date) <= 0) {
					isValid = true;
					break;
				}
			}

			if (!isValid) {
				return;
			}
		}else{
			boolean isValid = false; //System.out.println(" 162 : time : "+device.getTime() );
			Date date = CommonUtils.parseDate(device.getTime(), IEPICConstants.NEW_PORTAL_DATE_FORMAT );
			//System.out.println(" 164 : date : "+date  );
			if (date!=null && date.compareTo(getStartTime() != null? getStartTime() : date) >= 0 && date
					.compareTo(getEndTime() != null ? getEndTime() : date) <= 0) {
				isValid = true;
			}

			if (!isValid) {
				return;
			}
		}

		indigoList.add(device);
	}

	/**
	 * Cache the device statistics.
	 * 
	 * @param element
	 */
	/*
	 * private void addDevice( Element element) {
	 * 
	 * DeviceBean is = new DeviceBean();
	 * is.setLatitude(element.getAttribute("lat").getValue());
	 * is.setLongitude(element.getAttribute("lon").getValue()); is.setTime(
	 * CommonUtils.formatDate(element.getContent(0).getValue()));
	 * is.setName(element.getContent(1).getValue());
	 * 
	 * getRestServiceCacheMap().put(is.getName(), is); }
	 */

	void setCustomSearchCriteria() {
		// retrieve the search criteria
		SearchCriteria sc =null;// TODO  getSearchCriteria();
		SearchCriteriaHelper sch = null;
		Object[][] timeSearch = null;
		Object[][] deviceSearch = null;
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
			sch = sc.getSearchCritera(PARAM_DEVICEID);
			if (sch != null) {
				List<DeviceBean> list = getList();
				deviceSearch = sch.getSearchConditions();
				List<DeviceBean> finalList = new ArrayList<DeviceBean>();
				String[] choosenDevices;
				if (deviceSearch[0][2] instanceof String) {
					choosenDevices = new String[1];
					choosenDevices[0] = (String)deviceSearch[0][2];
				}else{
					choosenDevices = (String[])deviceSearch[0][2];
				}
				for(String name : choosenDevices){
					for(DeviceBean device : list){
						if(device.getName().equalsIgnoreCase(name) &&
								(StringUtils.getInt(deviceSearch[0][1]) == 0 || StringUtils.getInt(deviceSearch[0][1]) == 2 ||
								StringUtils.getInt(deviceSearch[0][1]) == 3)){
							//in case of equals/LIKE/IN operation
							finalList.add(device);
						}else if(StringUtils.getInt(deviceSearch[0][1]) == 8){
							//in case of not equals operation
							finalList.add(device);
						}
					}
				}
				String[] devicesArray = new String[finalList.size()];
				for(int i=0;i<finalList.size();i++){
					devicesArray[i] = finalList.get(i).getName();
				}
				dataSource.setDeviceIds(devicesArray);
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
