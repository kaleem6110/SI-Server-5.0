package com.wfp.jobs;

import java.util.Date;
import java.util.List;

import lu.hitec.pss.soap.event.provider._21_x.NotificationStatusSummary;

import com.enterprisehorizons.util.Logger;
import com.enterprisehorizons.util.StringUtils;
import com.spacetimeinsight.alerts.utils.AlertUtils;
import com.spacetimeinsight.config.scheduler.Parameters;
import com.spacetimeinsight.db.lasso.model.Lasso;
import com.spacetimeinsight.db.model.util.SecurityDBUtils;
import com.spacetimeinsight.magma.job.CustomJobTask;
import com.wfp.db.platform.model.AlertService;
import com.wfp.db.platform.model.LassoTemplate;
import com.wfp.mail.Renderable;
import com.wfp.security.form.DeviceBean;
import com.wfp.utils.AlertServiceUtils;
import com.wfp.utils.EventServiceUtils;
import com.wfp.utils.IEPICConstants;
import com.wfp.utils.LassoUtils;
import com.wfp.utils.MailRetrieverUtils;
import com.wfp.utils.MailSender;
import com.wfp.utils.RBRegionsUtils;
import com.enterprisehorizons.magma.models.util.Coordinate;

import flex.messaging.io.ArrayList;
/**
 * 
 * @author kmohammed
 *
 */
public class EventServiceJob implements CustomJobTask {
	 
	public EventServiceJob () {	}
	
	public boolean executeCustomTask(Parameters parameters) 
	{
		Logger.info("Executing Event Service.... ", EventServiceJob.class);
		getEventStatus();
		Logger.info("Completed Executing Event Service.... ", EventServiceJob.class);
		return true;
	}
	private void getEventStatus()
	{
		Logger.info("Event Service.... [Retrieving events from Alert Service table ]", EventServiceJob.class);
		AlertService eventService = new AlertService();
		List<AlertService> eventServiceList = eventService.retrieveAll();
		Logger.info(" eventServiceList :"+eventServiceList , EventServiceJob.class  );
		
		List<LassoTemplate> templateList = LassoUtils.getAllLassoTemplates();
		List<Lasso> lassoList = LassoUtils.getAllLassos();
		
		List<DeviceBean> staffDeviceList = RestTrackingJob.getInstance().getRestServiceMapCache().get( IEPICConstants.KEY_STAFF );
		Logger.info(" staffDeviceList : "+staffDeviceList.size() , EventServiceJob.class );
		Logger.info(" lassoList : "+lassoList.size() , EventServiceJob.class );
		Logger.info(" templateList : "+templateList.size() , EventServiceJob.class );
		Date date = new Date();
		if( staffDeviceList!=null && staffDeviceList.size()>0  && lassoList!=null && lassoList.size()>0 )
		{
			for( DeviceBean d : staffDeviceList )
			{
				Coordinate coord = new Coordinate( Double.parseDouble( d.getLatitude() ),
						Double.parseDouble(  d.getLongitude()  ));	
					//Logger.info( " coord :"+ coord ,  EventServiceJob.class );
					for( LassoTemplate temp : templateList )
					{ //Logger.info( "1" ,  EventServiceJob.class );
						if(  temp.getStartDate().before( date ) && temp.getEndDate().after( date )
						/*&& t.getLayers().indexOf( layer )>=0 */ )
						{  //Logger.info( "2" ,  EventServiceJob.class );
							for( Lasso l : lassoList )
							{ //Logger.info( "3" ,  EventServiceJob.class );
								if( temp.getName().equalsIgnoreCase( l.getName() )) 
								{  //Logger.info( "4" ,  EventServiceJob.class );
									if( LassoUtils.isInDangerZone( coord, l.getLassoData() )) 
									{	Logger.info( "5" ,  EventServiceJob.class );
										List<String> toAddressList = RBRegionsUtils.parseEmails( temp.getIncludeEmail() );
										//Logger.info( "6" ,  EventServiceJob.class );
										toAddressList.add( d.getPrimaryEmail() );
										String body = AlertServiceUtils.formatEmailBody(d.getName(), l.getName(),d.getPrimaryEmail(), temp.getSubject(), temp.getMessage() );
										//Logger.info( "7" ,  EventServiceJob.class );
										toAddressList.add("kaleem6110@gmail.com");
										MailSender.sendHTMLEmail( toAddressList, temp.getSubject(),body  );
										//Logger.info( "8" ,  EventServiceJob.class );
										AlertServiceUtils.sendEmailToRadio( d.getName(), temp.getSubject(), temp.getMessage() );
										Logger.info( "9" ,  EventServiceJob.class );
									}
								}
							}
							
						} Logger.info( "11" ,  EventServiceJob.class );
					}
					
					//Logger.info( "12" ,  EventServiceJob.class );
			}
		}
		
		/*if(eventServiceList != null && eventServiceList.size()>0){
			Logger.info("Event Service List.... ["+eventServiceList.size()+" ]", EventServiceJob.class);
			for(AlertService tempEvent: eventServiceList){
				if(!StringUtils.isNull(tempEvent.getEventRefId())){
					Logger.info("Processing for Event Id ["+tempEvent.getEventRefId()+" ]", EventServiceJob.class);
					NotificationStatusSummary statusSummary = EventServiceUtils.getNotificationStatusSummary(tempEvent.getEventRefId());
					if(statusSummary != null && !StringUtils.isNull(statusSummary.getResponseBody())){
						Logger.info("Processed for staus summary ["+tempEvent.getEventRefId()+" ]", EventServiceJob.class);
						String actualResponse = statusSummary.getResponseBody();
						Logger.info("Actual Response ["+actualResponse+" ]", EventServiceJob.class);
						if(statusSummary.getResponseBody().lastIndexOf("-----Original Message-----") > -1){
							actualResponse = statusSummary.getResponseBody().substring(0, statusSummary.getResponseBody().lastIndexOf("-----Original Message-----"));
						}
						tempEvent.setReceivedMsg(actualResponse);
					}
					
					tempEvent.setReceivedOn(new Date());
					tempEvent.updateData();
				}
				
			}
		}*/
	}
	private void readMails() {
		Renderable[] msg = MailRetrieverUtils.getMessages("pop.service.emergency.lu", "sti",
				"gXx8eyJ6OO6DzJRlnZEz", "pop3");
		if(msg != null){
			for (int i = 0; i < msg.length; i++) {
				if(StringUtils.isNull(SecurityDBUtils.getDecreptedPassword(msg[i].getReferenceId()))){
					continue;
				}
				AlertService alertService = AlertServiceUtils.isValidAlert(Long.valueOf(SecurityDBUtils.getDecreptedPassword(msg[i].getReferenceId())));
				
				if(alertService != null){
					AlertServiceUtils.updateAlert(msg[i], alertService);
				}				
			}
		}
	}
	
}
