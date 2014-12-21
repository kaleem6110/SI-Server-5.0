package com.wfp.renderer;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringEscapeUtils;

import com.enterprisehorizons.constants.CommonConstants;
import com.enterprisehorizons.magma.designtime.artifact.ArtefictSearchCriteria;
import com.enterprisehorizons.magma.renderer.dashboard.BaseDashboardRenderer;
import com.enterprisehorizons.magma.server.util.IServerConstants;
import com.enterprisehorizons.magma.server.util.SearchUtils;
import com.enterprisehorizons.util.ArrayUtils;
import com.enterprisehorizons.util.CastorUtils;
import com.enterprisehorizons.util.DateUtils;
import com.enterprisehorizons.util.SearchCriteria;
import com.enterprisehorizons.util.StringUtils;

import com.spacetimeinsight.config.dashboard.model.Filterbean;
import com.spacetimeinsight.config.dashboard.model.Filtercriteria;
import com.spacetimeinsight.filter.ICriteria;
import com.wfp.utils.IEPICConstants;
import com.wfp.utils.PlanningUtils;

/**
 * Renderer for generating a report which is used to show all the stocks for a
 * particular warehouse
 * 
 * @author sti-user
 * 
 */
public class WarehouseStockExcelRenderer extends BaseDashboardRenderer
		implements IEPICConstants {
	private static final String ROOT_NODE = "artifactdashboarddata";
	private static final String ELEMENT_ATTRIBUTES = "attributes";
	private static final String ELEMENT_ATTRIBUTE = "attribute";
	@Override
	protected String getRootNode() {
		return ROOT_NODE;
	}

	@SuppressWarnings("unchecked")
	@Override
	protected StringBuffer render(Map params) {
		StringBuffer buff = new StringBuffer();
		SimpleDateFormat sdf = new SimpleDateFormat(PORTAL_DATE_FORMAT);
		Map<String, List> datasource = null;
		if("waybillInfo".equalsIgnoreCase((String) params.get("key"))){
			datasource =  PlanningUtils.getWaybillCacheMap();
		}else {
			 datasource = PlanningUtils.getWHStockCacheMap();
		}
		//System.out.println(" WarehouseStockExceljob: 53 :datasource: "+datasource+ "params.get(key) "+params.get("key") );
		String longitude = (String) params.get("longitude");
		String latitude = (String) params.get("latitude");
		String warehouseNameIndex = (String) params.get("warehousenameindex");
		String filterBy = (String) params.get(PARAM_DASHBOARD_ID);
		String byPassId = (String) params.get(PARAM_BYPASS_ID);
		String userId = (String) params.get("userId");
		System.out.println("byPassId"+byPassId);
		if(filterBy.startsWith(SUB_KEY_FILTER_BY)){
			filterBy = filterBy.substring(9);
		}
		buff.append(XML_START_TAG + ELEMENT_ATTRIBUTES + XML_END_TAG);
		
		String searchcriteria = (String) params.get("searchcriteria");
		Filtercriteria filtercriteria = null;
		Filterbean[] filterbeans = null;
		ICriteria criteria = null;
		if(!StringUtils.isNull(searchcriteria)){
			filtercriteria = (Filtercriteria) CastorUtils.unmarshalString(searchcriteria, Filtercriteria.class);
			criteria = SearchUtils.buildSearchCriteria((String) params.get(IServerConstants.PARAM_DASHBOARD_SEARCH_ECOSID), (String) params
					.get(IServerConstants.PARAM_DASHBOARD_SEARCH_ARTIFACT_NAME), filtercriteria);
			getArtifactLayer().setSearchCriteria(criteria);
			filterbeans = filtercriteria.getFilterbean();
		}
		
		if (datasource != null && datasource.size() > 0) {
			// reading the stock items files
		
			Object[] headerNamesObjects =  (Object[]) datasource.get("headers").toArray(); 
					//.get(0);
			String[] headerNames = new String[headerNamesObjects.length]; 
			
			int count = headerNamesObjects == null ? 0 : headerNamesObjects.length;
			// placing all the header properties to XML Attributes
			for (int i = 0; i < count; i++) {
				headerNames[i] = StringUtils.toXMLAttribute((String) headerNamesObjects[i]);
			}
			for (Map.Entry<String, List> entry : datasource.entrySet()) {
				
				if("headers".equalsIgnoreCase(entry.getKey())  ){
					continue;
				}
				
				if(StringUtils.isNull(entry.getKey()) ){					
					continue;
				}
				
				if(!StringUtils.isNull(filterBy) && !filterBy.equals(byPassId) && !filterBy.equalsIgnoreCase(entry.getKey()) ){
					continue;
				}				
				List<Object[]> stockItems = entry.getValue();
				if (stockItems != null) {
					Object[] stockdata = null;System.out.println("stockItems.size:"+stockItems.size());
					for (int i = 0; i < stockItems.size(); i++) {
					//for (int i = (stockItems.size()-1); i >=0; i--) {
						stockdata = stockItems.get(i);
						
						/*
						 * if(StringUtils.getInt(data[11]) <= 0){ continue; }
						 */
						if(filterbeans != null){
							boolean valid = filterData(filterbeans, headerNames, stockdata);
							if(!valid){
								continue;
							}
						}
						//System.out.println("119"+com.wfp.utils.LDAPUtils.validatePlaceByUser((String) stockdata[StringUtils.getInt(warehouseNameIndex)], userId));
						//if(!StringUtils.isNull(entry.getKey() )) continue;								
						//Kaleem Commented below line.						
						/*if(!(!StringUtils.isNull(entry.getKey()) && com.wfp.utils.LDAPUtils.validatePlaceByUser((String) stockdata[StringUtils.getInt(warehouseNameIndex)], userId)) ){					
							continue;
						}*/
						
						buff.append(XML_START_TAG);
						buff.append(ELEMENT_ATTRIBUTE);
						for(int j=0;j<stockdata.length; j++){
							
							/*if (!RBRegionsUtils.validateLocation(
									(String) stockdata[21], userbean.getGroupIds())) {
								continue;
							}*/
							
							if (stockdata[j] != null
									&& stockdata[j] instanceof Date) { 
								stockdata[j] = sdf.format(stockdata[j]);
							}
							
							if(j == (StringUtils.getInt(longitude)) || j==(StringUtils.getInt(latitude))){
								if(!(j == (StringUtils.getInt(longitude)))){
									try{ 
										addAttribute(buff, (String)StringUtils.toXMLAttribute(PARAM_COORDINATES), StringEscapeUtils.escapeXml(stockdata[StringUtils.getInt(latitude)] == null ? 
												CommonConstants.EMPTY_STRING : stockdata[StringUtils.getInt(longitude)]+CommonConstants.COMMA_STRING+stockdata[StringUtils.getInt(latitude)]+",0"));
										
									}catch(Exception e){
										e.printStackTrace();
									}
								
								}
							}else {
								addAttribute(
										buff,
										(String) headerNames[j],
										StringEscapeUtils
												.escapeXml(stockdata[j] == null ? CommonConstants.EMPTY_STRING
														: stockdata[j].toString()));
							}
						}
						buff.append(XML_END_TAG_END);
					}
					
				}
			}
			
			
		}
		buff.append(XML_END_TAG_START + ELEMENT_ATTRIBUTES + XML_END_TAG);

		// System.out.println("buff "+buff);
		return buff;
	}
	
	private boolean filterData(Filterbean[] filterbeans, Object[] headerNames,
			Object[] valueArray) {
		if (filterbeans == null || headerNames == null)
	   		return true;  
		String _propertyValue = null;
		boolean  showThisItem = true;             
     	for(Filterbean filterDataBean: filterbeans){
     		if(ArrayUtils.getMatchedIndex((String[]) headerNames, filterDataBean.getPropertyname()) == -1){
     			continue;
     		}
     		_propertyValue = (String) valueArray[ArrayUtils.getMatchedIndex((String[]) headerNames, filterDataBean.getPropertyname())];
     		String _comparatorValue1 = filterDataBean.getComparatorvalue();
     		String _operator = filterDataBean.getOperator();
     		int operator = 0;
     		if (_operator.equals(IServerConstants.EQUALS)) {
     			operator = SearchCriteria.EQUALS;

			} else if (_operator.equals(IServerConstants.LIKE)) {
				
				operator = SearchCriteria.LIKE;
			} else if (_operator.equals(IServerConstants.GREATER_THAN_EQUALS)) {
				
				operator = SearchCriteria.GREATER_THAN_EQUALS;
			} else if (_operator.equals(IServerConstants.GREATER_THAN)) {
				
				operator = SearchCriteria.GREATER_THAN;
			} else if (_operator.equals(IServerConstants.LESSER_THAN)) {
				
				operator = SearchCriteria.LESSER_THAN;
			} else if (_operator.equals(IServerConstants.LESSER_THAN_EQUALS)) {
				
				operator = SearchCriteria.LESSER_THAN_EQUALS;
			} else if (_operator.equals(IServerConstants.NOT_EQUALS)) {
				
				operator = SearchCriteria.NOT_EQUALS;
			}	
     		
     		String _propertyType = filterDataBean.getPropertytype();
     		if(String.class.getName().equalsIgnoreCase(_propertyType)){
     			switch(operator) {   
	        		case SearchCriteria.EQUALS:	 
	        				if(!StringUtils.isNull(_propertyValue) && _propertyValue.equalsIgnoreCase(_comparatorValue1)){
	        					showThisItem = true;
	        				}else if(!StringUtils.isNull(_comparatorValue1) && _comparatorValue1.equalsIgnoreCase(_propertyValue)){
	        					showThisItem = true;
	        				}else {
	        					showThisItem = false;
	        				}
	        		;
	                       		break;
	        		case SearchCriteria.LIKE:	
	        			if(!StringUtils.isNull(_propertyValue) && _propertyValue.equalsIgnoreCase(_comparatorValue1)){
    					showThisItem = true;
    				}else if(!StringUtils.isNull(_comparatorValue1) && _comparatorValue1.equalsIgnoreCase(_propertyValue)){
    					showThisItem = true;
    				}else if(!StringUtils.isNull(_propertyValue) && !StringUtils.isNull(_comparatorValue1) && _propertyValue.toUpperCase().contains(_comparatorValue1.toUpperCase())){
    					showThisItem  =  true;
    				}else {
    					showThisItem = false;
    				}
    		;
                   		break;
	            } 
	            if (!showThisItem)// If one is false, we can short circuit.
	            	break;
	     	}else {
	     		long gridItemNum  = 0;
	        	long fromRangeNum   = 0;
	     		if (Date.class.getName().equalsIgnoreCase(_propertyType) ){
	     			Date gridItemDate = DateUtils.getDate(_propertyValue, "yyyy-MM-dd"); //CommonUtils.parseDate(_propertyValue);
		     		Date fromDate  =  DateUtils.getDate(_comparatorValue1, "MM/dd/yyyy"); //CommonUtils.parseDate(_comparatorValue1);
		        	gridItemNum  = gridItemDate.getTime ();
		        	fromRangeNum   = fromDate.getTime ();
	     		}else {
	     			gridItemNum = StringUtils.getInt(_propertyValue);
            		fromRangeNum   = StringUtils.getInt(_comparatorValue1);
	     		}
	     		
	        	long result = gridItemNum - fromRangeNum;   
                
                switch(operator) {
	            	case SearchCriteria.LIKE:  showThisItem  = (result!= 0)?true:false;
	                            break; 
	                case SearchCriteria.GREATER_THAN_EQUALS:  showThisItem  = (result<= 0)?true:false;  
	                            break;
	                case SearchCriteria.LESSER_THAN_EQUALS: showThisItem  = (result>= 0)?true:false;  
	                           break;
                    case SearchCriteria.EQUALS:  showThisItem  = (result == 0)?true:false; 
	                           break; 
                    case SearchCriteria.GREATER_THAN:  showThisItem  = (result> 0)?true:false;  
                   				break;
                    case SearchCriteria.LESSER_THAN: showThisItem  = (result< 0)?true:false;  
                    			break;
	                /*case "BETWEEN":  
	                		var toRangeNum : Number =0;
	                		
	                		if(Util.DATE_TYPES.indexOf(propertyType,0) > -1){
			            		var toDate :Date =  obtainDate(_comparatorValue2);
			            		toRangeNum = toDate.getTime ();
			            	}
			            	
			            	if(Util.DOUBLE_TYPES.indexOf(propertyType, 0) > -1 || Util.NUMBER_TYPES.indexOf(propertyType, 0) > -1 ){					            		
			            		toRangeNum   = parseFloat(_comparatorValue2)
			            	}
		                    
		                    var resultRange :Number = toRangeNum - fromRangeNum;
		                    if(resultRange > 0){
					        	showThisItem  = (gridItemNum > fromRangeNum && gridItemNum< toRangeNum) ;
                            }else{				                                   
                            	showThisItem  = (gridItemNum > toRangeNum && gridItemNum < fromRangeNum) ;          
                     		}	                         		 
                     		break; */
                  } 
                 if (!showThisItem)
               		 { break; }
	     		
	     	}
     	}
     	 return showThisItem; 
	}

	
	
}
