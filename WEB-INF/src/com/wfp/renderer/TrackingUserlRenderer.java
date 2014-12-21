package com.wfp.renderer;

import java.util.Map;

import org.apache.commons.lang.StringEscapeUtils;

import com.enterprisehorizons.constants.CommonConstants;
import com.enterprisehorizons.excel.CSVFile;
import com.enterprisehorizons.magma.renderer.dashboard.BaseDashboardRenderer;
import com.enterprisehorizons.util.StringUtils;
import com.wfp.utils.IEPICConstants;

/**
 * Renderer for generating a report which is used to show all the stocks for a
 * particular warehouse
 * 
 * @author sti-user
 * 
 */
public class TrackingUserlRenderer extends BaseDashboardRenderer
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
		// warehouse file location

		String destFile = ((String) params.get(PARAM_FILENAME));
		
		if(destFile != null && destFile.contains(KEY_STAFF)){			
		}else {
		}
		
		CSVFile deviceInfo = new CSVFile(destFile, CommonConstants.COMMA_STRING, 0);
		if(deviceInfo.getNoOfRecords() > 0){
			//deviceDtlsMap = new HashMap();
		}
		
		if(deviceInfo == null){
			return null;
		}
		Object[] headerNames =  (Object[]) deviceInfo.getHeaderNames();

		int count = headerNames == null ? 0 : headerNames.length;
		// placing all the header properties to XML Attributes
		for (int i = 0; i < count; i++) {
			headerNames[i] = StringUtils.toXMLAttribute((String) headerNames[i]);
		}

		
		Object[] data = null;
		buff.append(XML_START_TAG + ELEMENT_ATTRIBUTES + XML_END_TAG);
		while (deviceInfo.hasMoreElements()) {
			
			data = deviceInfo.nextElement();
			
			
			if(!StringUtils.isNull(data[6])){
				data[6] = StringUtils.replaceAll((String) data[6], CommonConstants.DOUBLE_QUOTE_STR, CommonConstants.DOUBLE_QUOTE_STR);
			}
			
			if(!StringUtils.isNull(data[7])){
				data[7] = StringUtils.replaceAll((String) data[7], CommonConstants.DOUBLE_QUOTE_STR, CommonConstants.DOUBLE_QUOTE_STR);
			}
			
			if(!StringUtils.isNull(data[8])){
				data[8] = StringUtils.replaceAll((String) data[8], CommonConstants.DOUBLE_QUOTE_STR, CommonConstants.DOUBLE_QUOTE_STR);
			}
			
			if(!StringUtils.isNull(data[12])){
				data[12] = StringUtils.replaceAll((String) data[12], CommonConstants.DOUBLE_QUOTE_STR, CommonConstants.DOUBLE_QUOTE_STR);
			}
			buff.append(XML_START_TAG);
			buff.append(ELEMENT_ATTRIBUTE);
			for(int i=0;i<data.length;i++){

				/*if (data[i] != null
						&& data[i] instanceof Date) {
					data[i] = sdf.format(data[i]);
				}*/
				
				{
					addAttribute(
							buff,
							(String) headerNames[i],
							StringEscapeUtils
									.escapeXml(data[i] == null ? CommonConstants.EMPTY_STRING
											: data[i].toString()));
				}
			}
			buff.append(XML_END_TAG_END);
			
		}
		
		buff.append(XML_END_TAG_START + ELEMENT_ATTRIBUTES + XML_END_TAG);

		// System.out.println(buff);
		return buff;
	}

}
