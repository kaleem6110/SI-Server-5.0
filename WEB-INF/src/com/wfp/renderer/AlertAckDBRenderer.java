package com.wfp.renderer;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import org.apache.commons.lang.StringEscapeUtils;

import com.enterprisehorizons.constants.CommonConstants;
import com.enterprisehorizons.dbutils.DBAccess;
import com.enterprisehorizons.dbutils.DBResults;
import com.enterprisehorizons.exception.EHRuntimeException;
import com.enterprisehorizons.magma.designtime.artifact.ArtefictSearchCriteria;
import com.enterprisehorizons.magma.renderer.dashboard.BaseDashboardRenderer;
import com.enterprisehorizons.magma.server.util.IServerConstants;
import com.enterprisehorizons.magma.server.util.SearchUtils;
import com.enterprisehorizons.util.CastorUtils;
import com.enterprisehorizons.util.Logger;
import com.enterprisehorizons.util.StringUtils;
import com.enterprisehorizons.util.URLUtils;
import com.spacetimeinsight.config.dashboard.model.*;
import com.spacetimeinsight.db.model.util.DBDatasourceUtils;
import com.wfp.db.util.PostgresSearchCriteriaDateFormatter;

/**
 * Main class to read the data ldap & integrate with Tracking ecosystems
 * @author sti-user
 *
 */
public class AlertAckDBRenderer extends BaseDashboardRenderer {
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
		String datasource = (String) params.get("datasource");
		String coordinatesColumn = (String) params.get("coordinatesColumn");
		String query = (String) params.get("query");
		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
		//String dateFormat = (String)params.get("dateFormat");
		if (StringUtils.isNull(datasource)) {
			throw new EHRuntimeException(
					"Parameter [datasource ] can not be null");
		}
		if (StringUtils.isNull(query)) {
			throw new EHRuntimeException("Parameter [query] can not be null");
		}
		
		String searchcriteria = (String) params.get("searchcriteria");
		Filtercriteria filtercriteria = null;
		ArtefictSearchCriteria criteria = null;
		String filterwhereClause = null;
		if(!StringUtils.isNull(searchcriteria)){
			filtercriteria = (Filtercriteria) CastorUtils.unmarshalString(searchcriteria, Filtercriteria.class);
			criteria =(ArtefictSearchCriteria)  SearchUtils.buildSearchCriteria((String) params.get(IServerConstants.PARAM_DASHBOARD_SEARCH_ECOSID), (String) params
					.get(IServerConstants.PARAM_DASHBOARD_SEARCH_ARTIFACT_NAME), filtercriteria);
			//criteria.setSearchCriteriaFormatter(new PostgresSearchCriteriaDateFormatter());
			//filterwhereClause = criteria.getDBWhereClause().replace("where", "and ");
			
		}
		query = URLUtils.decode(query)+ (StringUtils.isNull(filterwhereClause)?"":filterwhereClause);
		Logger.info("Query Executed for Acknowledgment ["+query+"]" , AlertAckDBRenderer.class);
		if (Logger.isInfoEnabled(AlertAckDBRenderer.class)) {
			Logger.info("Query = [" + query + "]", AlertAckDBRenderer.class);
		}
		if (!StringUtils.isNull(datasource)) {
			DBAccess dbAccess = DBDatasourceUtils.getDBAccess(datasource);
			DBResults dbResults = dbAccess.executeQuery(query, false);
			try {
				String[] headerNames = null;

				Object[] data = null;
				buff.append(XML_START_TAG + ELEMENT_ATTRIBUTES + XML_END_TAG);
				int count = 0;
				while (dbResults.getNextRow()) {
					if (headerNames == null) {
						headerNames = dbResults.getColNames();
						count = headerNames == null ? 0 : headerNames.length;
						for (int i = 0; i < count; i++) {
							if(coordinatesColumn!=null && coordinatesColumn.equals(headerNames[i]))
								headerNames[i] = "coordinates";
							headerNames[i] = StringUtils
									.toXMLAttribute(headerNames[i]);
						}
					}
					data = dbResults.nextElement();
					buff.append(XML_START_TAG);
					buff.append(ELEMENT_ATTRIBUTE);
					for (int i = 0; i < count; i++) {
						if(data[i]!=null && data[i] instanceof Date){
							data[i] = sdf.format(data[i]);
						}
						addAttribute(
								buff,
								headerNames[i],
								StringEscapeUtils
										.escapeXml(data[i] == null ? CommonConstants.EMPTY_STRING
												: data[i].toString().trim()));
					}
					buff.append(XML_END_TAG_END);
				}
				buff.append(XML_END_TAG_START + ELEMENT_ATTRIBUTES
						+ XML_END_TAG);
			} finally {
				dbAccess.close();
			}
		}
		return buff;
	}
}
