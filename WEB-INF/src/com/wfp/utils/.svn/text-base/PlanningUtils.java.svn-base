package com.wfp.utils;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import au.com.bytecode.opencsv.CSVReader;

import com.enterprisehorizons.constants.CommonConstants;
import com.enterprisehorizons.excel.CSVFile;
import com.enterprisehorizons.magma.server.util.Cache;
import com.enterprisehorizons.util.Logger;
import com.enterprisehorizons.util.StringUtils;

@SuppressWarnings("unchecked")
public class PlanningUtils implements IEPICConstants{
	
	public PlanningUtils(){
		if(Cache.retrieve(KEY_WH_STOCK_MAP) == null){
			Cache.store(KEY_WH_STOCK_MAP, new HashMap<String, List>());
		}	
		
		if(Cache.retrieve(KEY_WH_WAYBILL_MAP) == null){
			Cache.store(KEY_WH_WAYBILL_MAP, new HashMap<String, List>());
		}
	}
	
	/**
	 * retrieves the warehouse stock information.
	 * @return
	 */
	public static Map<String, List> getWHStockCacheMap(){
		return (Map<String, List>) Cache.retrieve(KEY_WH_STOCK_MAP);
	}
	
	/**
	 * retrieves the warehouse stock information.
	 * @return
	 */
	public static void setWHStockCacheMap(Map<String, List> map){
		Cache.store(KEY_WH_STOCK_MAP, map);
	}

	/**
	 * retrieves the warehouse stock information.
	 * @return
	 */
	public static Map<String, List> getWaybillCacheMap(){
		return (Map<String, List>) Cache.retrieve(KEY_WH_WAYBILL_MAP);
	}
	
	/**
	 * retrieves the warehouse stock information.
	 * @return
	 */
	public static void setWaybillCacheMap(Map<String, List> map){
		Cache.store(KEY_WH_WAYBILL_MAP, map);
	}
	
	/**
	 * Reading the warehouse data
	 * @param whfilepath
	 * @return
	 */
	public static Map getWarehouseDtls(String whfilepath){
		Map warehouseMap = null;
		//cache all the warehouse with their warehouse names as key & value having all the data with coordinates
		if (!StringUtils.isNull(whfilepath)) {
			CSVFile whfile = new CSVFile(whfilepath, CommonConstants.COMMA_STRING, 0);
			if(whfile.getNoOfRecords() > 0){
				warehouseMap = new HashMap();
			}
			
			if(whfile == null){
				return null;
			}
			warehouseMap.put("headers", whfile.getHeaderNames());
			Object[] data = null;
			
			while (whfile.hasMoreElements()) {
				data = whfile.nextElement();
				//System.out.println(data.length);
				warehouseMap.put(data[1], data);
			}
			
		}
		return warehouseMap;
	}
	
	/**
	 * filepath from where we need to read stock items for a particular warehouse
	 * @param filepath
	 */
	/*public static Map   readStockItems(String filepath, String keyLocation){
		Map warehouseStocksMap = null;
		if (!StringUtils.isNull(filepath)) {
			//read the CSV file
			CSVFile whfile = new CSVFile(filepath, CommonConstants.COMMA_STRING, 0, CommonConstants.DOUBLE_QUOTE_STR);
			//if there are any warehouses then create the cache of them
			if(whfile.getNoOfRecords() > 0){
				warehouseStocksMap = new HashMap();
			}else{
				return null;
			}
			
			//placing all the headers with key as headers in a map
			List headersList = new ArrayList();
			headersList.add(whfile.getHeaderNames());
			warehouseStocksMap.put("headers", headersList);
			
			Object[] data = null;
			//read record by record all the stock items
			while (whfile.hasMoreElements()) {
				data = whfile.nextElement();
				List list = null;
				if(data != null && data.length >=2 ){
					//data[15] indicates the warehouse name
					list = (List) warehouseStocksMap.get(data[StringUtils.getInt(keyLocation)]);
					if(list == null ){
						list = new ArrayList();
					}
					if(data.length ==19){
						//System.out.println(data.length);
					}
					
					//place the data in the map with key as warehouse
					list.add(data);
					warehouseStocksMap.put((String) data[StringUtils.getInt(keyLocation)], list);
				}
				
				
				
			}
		}	
		
		return warehouseStocksMap;
	}*/
	
	public static Map   readStockItems(String filepath, String keyLocation){
		Map warehouseStocksMap = null;
		if (!StringUtils.isNull(filepath)) {
			//read the CSV file
			try {
				CSVReader stockReader =  new CSVReader( new InputStreamReader(new FileInputStream(filepath), "unicode"), CommonConstants.TAB);
				Logger.info(" parsed the CSV Stock reader object ["+stockReader+"] from filepath ["+filepath+"]", PlanningUtils.class);
				String[] line;
				if(stockReader != null){
					//if there are any warehouses then create the cache of them
					warehouseStocksMap = new HashMap();
					try {
						boolean isHeadersParsed = false;
						while ((line = stockReader.readNext()) != null) {
							if(!isHeadersParsed){
								//placing all the headers with key as headers in a map
								List headersList = new ArrayList();
								headersList.add(line);
								warehouseStocksMap.put("headers", headersList);
								isHeadersParsed = true;
							}else {
								//read record by record all the stock items
									List list =null;
									if(line != null && line.length >= 2){
										//data[15] indicates the warehouse name
										list = (List) warehouseStocksMap.get(line[StringUtils.getInt(keyLocation)]);
										if(list == null ){
											list = new ArrayList();
										}
									
										
										//place the data in the map with key as warehouse
										Logger.info(" Stocks Recived for warehouse ["+(String) line[StringUtils.getInt(keyLocation)]+"] ", PlanningUtils.class);
										list.add(line);
										warehouseStocksMap.put((String) line[StringUtils.getInt(keyLocation)], list);
									}
									
								
							}
							
						}
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}else {
					return null;
				}
				
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return null;
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return null;
			}
		}	
		
		return warehouseStocksMap;
	}
	
	/**
	 * concatinates the data between the stocks & warehouses
	 * @param stocksMap
	 * @param whMap
	 * @return 
	 */
	public static Map<String, List> concatWHStocks( Map<String, Object[]> whMap, Map<String, List> stocksMap){
		if(whMap != null && whMap.size() > 0){
			//Object[] tempHeader = ArrayUtils.add(stocksMap.get("headers"), whMap.get("headers"));
			Map<String, List> map = new HashMap();
			//System.out.println(stocksMap);
			//Map.Entry<String, Object[]> entry = (Entry<String, Object[]>) whMap.entrySet();
			for (Map.Entry<String, Object[]> entry : whMap.entrySet())	{
				List<Object[]> stockList = stocksMap.get(entry.getKey());
				List<Object[]> dataList = null;
				if(stockList != null){
					dataList = new ArrayList<Object[]>();
					for(int i=0; i<stockList.size(); i++){
				    	Object[] data =add(stockList.get(i), entry.getValue());
				    	dataList.add(data);
				    }
					if(dataList  != null)
						map.put(entry.getKey(), dataList);
				}
			   
			}
			return map;
		}
		return null;
	}
	
	public static Map<String, List> concatLDAPWHStocks( Map<String, Map<String, String>> whMap, Map<String, List<Object[]>> stocksMap){
		Logger.info(" Concatinating the warehosue & stock information", PlanningUtils.class);
		if(whMap != null && whMap.size() > 0){
			Object[] tempHeader = null;
			Map<String, List> map = new HashMap();
			//System.out.println(stocksMap);
			//Map.Entry<String, Object[]> entry = (Entry<String, Object[]>) whMap.entrySet();
			for (Map.Entry<String, Map<String, String>> entry : whMap.entrySet())	{
				if(tempHeader == null){
					tempHeader =  add(stocksMap.get("headers").get(0), whMap.get(entry.getKey()).keySet().toArray());  //new Object[stocksMap.get("headers").toArray().length + whMap.get(entry.getKey()).values().toArray().length]; //ArrayUtils.add(stocksMap.get("headers"), whMap.get(entry.getKey()).values().toArray());
					//ArrayUtils.add(tempHeader, stocksMap.get("headers").toArray());
					//ArrayUtils.add(tempHeader, stocksMap.get("headers").toArray());
					map.put("headers", Arrays.asList(tempHeader));
				}
				Logger.info(" Retrieve the stock data for ["+entry.getKey()+"] ", PlanningUtils.class);
				List<Object[]> stockList = stocksMap.get(entry.getKey());
				List<Object[]> dataList = null;
				if(stockList != null){
					dataList = new ArrayList<Object[]>();
					for(int i=0; i<stockList.size(); i++){
				    	Object[] data =add(stockList.get(i), entry.getValue().values().toArray());
				    	dataList.add(data);
				    }
					if(dataList  != null){
						
						 Collections.sort(dataList, new Comparator(){
							 
					            public int compare(Object o1, Object o2) {
					            	Object[] p1 = (Object[]) o1;
					            	Object[] p2 = (Object[]) o2;
					               return ((String) p2[1]).compareToIgnoreCase((String) p1[1]);
					            }
					 
					        });
						 
						 map.put(entry.getKey(), dataList);
					}
				}
			   
			}
			Logger.info(" Parsed results succesfully  for warehouses ["+map.size()+"] ", PlanningUtils.class);
			return map;
		}
		return null;
	}
	
	private static Object[] add(Object[] objects, Object[] value) {
		Object[] data = new Object[objects.length+value.length];
		for(int i=0; i<objects.length;i++){
			data[i] = objects[i];
			
		}
		int count = objects.length;
		for(int j=0;j<value.length;j++){
			data[count++] = value[j];
		}
		
		return data;
	}
	
	public static void getWarehouseStocks(String stockFilepath, String keyLocation){
		Map stockMap = PlanningUtils.readStockItems(stockFilepath, keyLocation);
		Logger.info("Read all stocks from ["+stockFilepath+"] Data Object: ["+stockMap+"] ", PlanningUtils.class);
		//setWHStockCacheMap(concatWHStocks(PlanningUtils.getWarehouseDtls(whFilepath), stockMap));	
		setWHStockCacheMap(concatLDAPWHStocks(LDAPUtils.getAllPlaces(), stockMap));
		
	}
	
	public static void getWaybillDtls(String waybillFile){
		//setWaybillCacheMap(concatWHStocks(PlanningUtils.getWarehouseDtls(whFilepath), readWaybillDtls(waybillFile)));
		//setWaybillCacheMap(readWaybillDtls(waybillFile));
		setWaybillCacheMap(concatLDAPWHStocks(LDAPUtils.getAllPlaces(), readWaybillDtls(waybillFile)));
	}
	
	private static Map readWaybillDtls(String waybillFile) {

		Map waybillDtlsMap = null;
		if (!StringUtils.isNull(waybillFile)) {
			//read the CSV file
			try {
				CSVReader stockReader =  new CSVReader( new InputStreamReader(new FileInputStream(waybillFile), "unicode"), CommonConstants.TAB);
				String[] line;
				Logger.info("Waybill stock reader -- success", PlanningUtils.class);
				if(stockReader != null){
					//if there are any warehouses then create the cache of them
					waybillDtlsMap = new HashMap();
					try {
						boolean isHeadersParsed = false;
						while ((line = stockReader.readNext()) != null) {
							if(!isHeadersParsed){
								//placing all the headers with key as headers in a map
								List headersList = new ArrayList();
								headersList.add(line);
								waybillDtlsMap.put("headers", headersList);
								isHeadersParsed = true;
							}else {
								//read record by record all the stock items
								//data[15] indicates the warehouse name
								List list = (List) waybillDtlsMap.get(line[6]);
								if(list == null ){
									list = new ArrayList();
								}
								//place the data in the map with key as warehouse
								Logger.info("Waybill for warehouse  ["+(String) line[6]+"]", PlanningUtils.class);
								list.add(line);
								waybillDtlsMap.put((String) line[6], list);
							}
							
						}
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}else {
					return null;
				}
				
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return null;
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return null;
			}
		}	
		
			

		
		return waybillDtlsMap;
	
	}
	
	/*private static Map readWaybillDtls(String waybillFile) {

		Map waybillDtlsMap = null;
		if (!StringUtils.isNull(waybillFile)) {
			//read the CSV file
			CSVFile waybillDtls = new CSVFile(waybillFile, CommonConstants.COMMA_STRING, 0, CommonConstants.DOUBLE_QUOTE_STR);
			//if there are any warehouses then create the cache of them
			if(waybillDtls.getNoOfRecords() > 0){
				waybillDtlsMap = new HashMap();
			}else{
				return null;
			}
			
			//placing all the headers with key as headers in a map
			List headersList = new ArrayList();
			headersList.add(waybillDtls.getHeaderNames());
			waybillDtlsMap.put("headers", headersList);
			
			Object[] data = null;
			//read record by record all the stock items
			while (waybillDtls.hasMoreElements()) {
				data = waybillDtls.nextElement();
				//data[15] indicates the warehouse name
				List list = (List) waybillDtlsMap.get(data[6]);
				if(list == null ){
					list = new ArrayList();
				}
				//place the data in the map with key as warehouse
				list.add(data);
				waybillDtlsMap.put((String) data[6], list);
			}
		}	
		
		return waybillDtlsMap;
	
	}*/
	
}
