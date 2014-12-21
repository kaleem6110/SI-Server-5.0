package com.wfp.jobs;

import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.List;

import com.enterprisehorizons.util.Logger;
import com.spacetimeinsight.config.scheduler.Parameter;
import com.spacetimeinsight.config.scheduler.Parameters;
import com.spacetimeinsight.magma.job.CustomJobTask;
import com.wfp.db.platform.model.MessageTemplate;

public class GeoFenceFlagJob implements CustomJobTask {

	private static final String PARAM_GEOFENCE_NAME = "geofence";
	private static final String PARAM_FLAG = "flag";


	SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
	SimpleDateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");	

	/* (non-Javadoc)
	 * @see com.spacetimeinsight.magma.job.CustomJobTask#executeCustomTask(com.spacetimeinsight.config.scheduler.Parameters)
	 * Parameters : geofence and flag are to be passed while configurign the job
	 */
	public boolean executeCustomTask(Parameters params) {
		String geoFenceParam = null;
		String flagParam = null;
		/*Looking for parameters*/
		int count = params == null ? 0 : params.getParameterCount();
		Parameter parameter = null;
		if (params != null && count > 0) {
			for (int i = 0; i < count; i++) {
				parameter = params.getParameter(i);			
				if (PARAM_GEOFENCE_NAME.equalsIgnoreCase(parameter.getName())) {
					geoFenceParam = parameter.getValue();
					continue;
				}					
				if (PARAM_FLAG.equalsIgnoreCase(parameter.getName())) {
					flagParam = parameter.getValue();
					continue;
				}
			}
		}
		/*end of looking params*/
		/*Log if parameters for geofence or flag is null*/

		if(geoFenceParam == null || flagParam == null) {
			Logger.warn("Parameters for geofence or flag cannot be empty", GeoFenceFlagJob.class);
		}		
		/*end of logging params*/

		
		//If there are multiple records for the same name need to check to update the only one with the latest record
		
		Collection<MessageTemplate> records = null;
		records = (List<MessageTemplate>) getGeoFenceResults();	

		if(records == null || records.size()== 0) {
			Logger.warn("Does not contain any records", GeoFenceFlagJob.class);
		}
		String geoFenceVal = null;
		if(records != null && records.size() > 0) {
			for(MessageTemplate geofenceRuleModel : records) {
				geoFenceVal = geofenceRuleModel.getName();
				if(flagParam != null) {
					if(geoFenceParam != null && geoFenceParam.equalsIgnoreCase(geoFenceVal) && flagParam.equalsIgnoreCase("TRUE")) {
						geofenceRuleModel.setFlag("TRUE");
						geofenceRuleModel.updateData();
						continue;
					}
					if(geoFenceParam != null && geoFenceParam.equalsIgnoreCase(geoFenceVal) && flagParam.equalsIgnoreCase("FALSE")) {
						geofenceRuleModel.setFlag("FALSE");
						geofenceRuleModel.updateData();
						continue;
					}
				}
			}
			return true;
		}
		return false;
	}

	public List getGeoFenceResults() {
		MessageTemplate geofence = new MessageTemplate();
		return geofence.retrieveAll();		
	}	
}
