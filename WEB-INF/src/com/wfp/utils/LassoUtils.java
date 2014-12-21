/**
 * 
 */
package com.wfp.utils;

import java.util.ArrayList;
import java.util.List;


import com.enterprisehorizons.exception.EHRuntimeException;
import com.enterprisehorizons.util.Logger;
import com.spacetimeinsight.db.lasso.model.Lasso;
import com.spacetimeinsight.db.model.util.DataModelsCache;
import com.spacetimeinsight.renderer.viewer.LassoRenderer;
import com.spacetimeinsight.security.bean.UserBean;
import com.spacetimeinsight.services.lasso.LassoServices;
import com.wfp.db.platform.model.LassoTemplate;
import com.wfp.db.platform.model.MessageTemplate;
import com.wfp.offline.synchronize.ISynchronizationServiceConstants;
import com.wfp.synchronize.db.config.model.SynchronizationTrailLog;

import flex.messaging.FlexContext;
import flex.messaging.HttpFlexSession;

/**
 * @author kaleem.mohammed
 *
 */
public class LassoUtils implements IEPICConstants {
	
	@SuppressWarnings("unchecked")
	public static List<Lasso> getAllLassos( )
	{  	Logger.info("START  getAllLassos", LassoUtils.class );
		List<Lasso> lassoList = new ArrayList<Lasso>();
		DataModelsCache.getInstance().refresh(Lasso.class.getName());
		lassoList = DataModelsCache.getInstance().retrieve(Lasso.class.getName());
		Logger.info("END  getAllLassos" , LassoUtils.class );		
		return lassoList;
	}
	
	public static boolean saveFenceMessage(LassoTemplate mt, String moduleId){
		LassoTemplate crud = new LassoTemplate();
		
		crud.setName(mt.getName());
		crud.setMessage( mt.getMessage());
		crud.setSubject(mt.getSubject());
		crud.setRecurrence( mt.getRecurrence() );
		crud.setInterval( mt.getInterval());
		//System.out.println("mt.getStartDateTime()"+mt.getStartDateTime()+"mt.getEndDateTime():"+mt.getEndDateTime()+":mt.getExclusionEmail()"+mt.getExclusionEmail() );
		
		crud.setStartDate( mt.getStartDate() );
		crud.setEndDate(mt.getEndDate());
		crud.setModifiedDate(CommonUtils.getUTCdatetimeAsDate() );
		
		crud.setIncludeEmail( mt.getIncludeEmail());
		crud.setExcludeEmail( mt.getExcludeEmail() );
		long syncTypeId = ISynchronizationServiceConstants.SYNC_TYPE_ADD;
		boolean isInserted = false;
		if(mt.getId() > 0){
			crud.setId(mt.getId());
			syncTypeId = ISynchronizationServiceConstants.SYNC_TYPE_UPDATE;
			System.out.println(" updating.......");
			crud.updateData();
		}else
		{
			crud.setCreatedDate(CommonUtils.getUTCdatetimeAsDate() );
			System.out.println("b4 inserting  :"+mt.getId());
			 isInserted =  crud.insertData();
			}
		
		 ;
		System.out.println(" isInserted : "+isInserted );
		if(isInserted){
			HttpFlexSession httpFlexSession = (HttpFlexSession) FlexContext.getFlexSession();
			if(httpFlexSession != null){
				DataModelsCache.getInstance().refresh(LassoTemplate.class.getName());
				UserBean userBean = (UserBean)httpFlexSession.getAttribute("stiUser");
				return true;
				//temporary comment
				/*return SynchronizationDBUtils.syncTraceLog(ISynchronizationServiceConstants.SYNC_DATA_TYPE_GEOFENCE_RULES,
						crud.getName(), syncTypeId,
						ISynchronizationServiceConstants.SYNC_STATUS_NEW, ServerUtils.getSystemServerName()+"_"+AdminConfigUtils.getHttpServerPort(), (long)userBean.getUserId(),
						userBean.getUserUniqueId(), StringUtils.getLong(moduleId));*/
			}	
			
		}else {System.out.println("*** Exception");
			throw new EHRuntimeException("Failed to save the region.");
		}
		
		return false;
	}
	public static void main( String a[])
	{
		
		
	}

}
