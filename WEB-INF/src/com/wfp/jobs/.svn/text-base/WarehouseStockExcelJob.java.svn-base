package com.wfp.jobs;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.enterprisehorizons.constants.CommonConstants;
import com.enterprisehorizons.magma.server.util.Cache;
import com.enterprisehorizons.util.DateUtils;
import com.enterprisehorizons.util.Logger;
import com.enterprisehorizons.util.NumberUtils;
import com.spacetimeinsight.config.scheduler.Parameter;
import com.spacetimeinsight.config.scheduler.Parameters;
import com.spacetimeinsight.magma.job.CustomJobTask;
import com.wfp.utils.CommonUtils;
import com.wfp.utils.IEPICConstants;
import com.wfp.utils.LDAPUtils;
import com.wfp.utils.PlanningUtils;

/**
 * Caches all the stocks for a particular warehouse.
 * @author sti-user
 *
 */
public class WarehouseStockExcelJob implements CustomJobTask, IEPICConstants {
	
	private static WarehouseStockExcelJob instance = null;
	private static String lastRefreshTime = null;
	
	public WarehouseStockExcelJob () {
			
	}
	
	
	private static synchronized void initializeInstance() {
		if (instance == null) {
			instance = new WarehouseStockExcelJob();
		}
	}

	public static WarehouseStockExcelJob getInstance() {
		if (instance == null) {
			initializeInstance();
		}
		return instance;
	}
	
	
	public static Map<String, List> getWarehouseStocksCache() {
		return PlanningUtils.getWHStockCacheMap();
	}

	
	
	
	
	public boolean executeCustomTask(Parameters parameters) {
		// TODO Auto-generated method stub
		Parameter[] params = parameters.getParameter();
		String filepath = null;
		long datecorrection = 0;
		String keyLocation = null;
		String waybillFile = null;
		
		for (int i=0; i< params.length ; i++){
			if(PARAM_DATECORRECTION.equalsIgnoreCase(params[i].getName())){
				datecorrection = NumberUtils.getLongValue(params[i].getValue());
			}
			
			if(PARAM_FILEPATH.equalsIgnoreCase(params[i].getName())){
				filepath = params[i].getValue();
			}
			
			if(KEY_STR.equalsIgnoreCase(params[i].getName())){
				keyLocation = params[i].getValue();
			}
			
			if(PARAM_WAYBILL.equalsIgnoreCase(params[i].getName())){
				waybillFile = params[i].getValue();
			}
		}
		filepath =  updateFilePath(filepath,datecorrection);
		waybillFile = updateFilePath(waybillFile,datecorrection);
		
		Cache.store(CACHE_WAREHOUSES_KEY, LDAPUtils.getAllPlaces());
		
		if(Cache.retrieve(CACHE_WAREHOUSES_KEY) != null){
			Map map = (Map) Cache.retrieve(CACHE_WAREHOUSES_KEY);
			Logger.perf("Total places objects from LDAP ["+((Map) Cache.retrieve(CACHE_WAREHOUSES_KEY)).size()+"]", WarehouseStockExcelJob.class);
		}
		//reading the stock items & cacheing all the items in map
		PlanningUtils.getWarehouseStocks(filepath, keyLocation);
		PlanningUtils.getWaybillDtls(waybillFile);
		lastRefreshTime = CommonUtils.getUTCdatetimeAsString();
		return true;
	}
	
	/**
	 * 
	 */
	private String updateFilePath(String path,long datecorrection){
		SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd");
		String currentDate = formatter.format(DateUtils.getFutureDate(datecorrection));
		String filename = path.substring(0, path.indexOf(CommonConstants.DOT));
		String fileExtension = path.substring(path.indexOf(CommonConstants.DOT),path.length());
		path = filename + "-" +currentDate + fileExtension;
		return path;
	}
	/**
	 * returns the map haivng the Quality as String & number of those as value
	 * @param whCode - warehouse code
	 * @return Map<String, Long>
	 */
	@SuppressWarnings("unchecked")
	public static Map<String, Long> getQualityStockCount(String whCode){
		//returns the list of data array for that warehouse
		List list = getWarehouseStocksCache().get(whCode);
		Map<String, Long> qualityStocksMap = new HashMap();
		if(list != null){
			for (int i=0;i < list.size(); i++){
				Object[] data = (Object[]) list.get(i);
				Long quantity = qualityStocksMap.get(data[9]);
				qualityStocksMap.put((String) data[9],quantity!=null?++quantity:0);
				
			}
		}
		
		
		return qualityStocksMap;
	}
	
	/**
	 * 
	 * @param whCode
	 * @return
	 */
	public static Map<String, Long> getStockItemsCount(String whCode){
		//returns the list of data array for that warehouse
		List list = getWarehouseStocksCache()!=null ? getWarehouseStocksCache().get(whCode):null;
		Map<String, Long> stockitemsMap = null;
		if(list != null){
			stockitemsMap = new HashMap();
			for (int i=0;i < list.size(); i++){
				Object[] data = (Object[]) list.get(i);
				Long itemCount = stockitemsMap.get(data[9]);
				stockitemsMap.put((String) data[9],itemCount!=null?++itemCount:0);
				
			}
		}
		
		
		return stockitemsMap;
	}
	
	public static String getLastRefreshTime() {
		return lastRefreshTime;
	}
	
}
