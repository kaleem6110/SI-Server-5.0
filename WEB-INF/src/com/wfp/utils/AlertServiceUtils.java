package com.wfp.utils;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.enterprisehorizons.db.util.HibernateUtils;
import com.enterprisehorizons.util.Logger;
import com.enterprisehorizons.util.SearchCriteria;
import com.spacetimeinsight.alerts.config.beans.AlertBean;
import com.spacetimeinsight.alerts.utils.AlertUtils;
import com.spacetimeinsight.db.config.alerts.model.AlertPriority;
import com.spacetimeinsight.db.model.util.DataModelsCache;
import com.spacetimeinsight.db.model.util.SecurityDBUtils;
import com.spacetimeinsight.filter.CompositeCriteria;
import com.spacetimeinsight.filter.ICriteria;
import com.spacetimeinsight.filter.SimpleCriteria;
import com.spacetimeinsight.filter.ICriteria.EType;
import com.spacetimeinsight.filter.ISimpleCriteria.EOperator;
import com.wfp.db.platform.model.AlertService;
import com.wfp.db.platform.model.MessageTemplate;
import com.wfp.db.util.PostgresSearchCriteriaDateFormatter;
import com.wfp.mail.Renderable;
import com.wfp.security.form.DeviceBean;
import com.wfp.security.form.LDAPUserBean;
import java.util.ArrayList;
public class AlertServiceUtils implements IEPICConstants {
 
	public static void publishAlert(String deviceId, String dangerZoneName,  Double lat, Double lng, List<String> emailList){
		System.out.println("## START AlertServiceUtils.publishAlert :deviceId : "+deviceId +" :dangerZoneName :"+dangerZoneName +" :lat :"+lat+": long :"+lng );
	
		com.wfp.db.platform.model.MessageTemplate mt = com.wfp.utils.RBRegionsUtils.getMessageTemplate(dangerZoneName);
		//System.out.println(" mt "+mt );
		if(mt == null){
			return;
		}
		
		LDAPUserBean userBean = LDAPUtils.getLDAPUserBean(deviceId);
		
		
		//.LDAPUserBean userBean = LDAPUtils.cacheLDAPUserDtls(deviceId, null);
		String uid = null;
		if(userBean != null){
			uid = userBean.getUid(); //Mail();
			if(uid != null){
				try {
					long templateId = getTemplateId(dangerZoneName);
					Date date = new Date();
					boolean isDuplicate = validateAlert(templateId, uid, mt,   new Date());//System.out.println(" isDuplicate "+ isDuplicate );
					if(!isDuplicate ){
					//if( 2>1){
					
						long refId = insertUpdateAlert(templateId, uid,  mt.getBody(), mt.getSubject(), date);
						if(refId > 0)
						{ 
							boolean isExcluded = false;
							if( mt.getExclusionEmail()!=null && mt.getExclusionEmail()!="")
							{
								//if( mt.getExclusionEmail().indexOf(userBean.getPrimaryEmail())> -1 ) isExcluded = true;								
							}
							//STAS sending email directly to user	& Security Officer
							List<String> toEmailAddress = new ArrayList<String>();
							toEmailAddress.add( userBean.getPrimaryEmail() );	
							if(emailList!=null&&emailList.size()>0)
							{
								for(String e : emailList) toEmailAddress.add(e);
							}
							//if(!isExcluded){
							//Event sent to middleware for sending emails to user
							String eventRefId = "";
							String msgBody = formatEmailBody( deviceId.trim(), eventRefId, userBean.getPrimaryEmail(),mt.getSubject(), mt.getBody() );
							//TODO
							MailSender.sendHTMLEmail( toEmailAddress , mt.getSubject(), msgBody );
							
							//sending email to Radio
							sendEmailToRadio( deviceId.trim(),mt.getSubject(),mt.getBody() );
							eventRefId=EventServiceUtils.publishEventService(userBean.getUid(), mt.getSubject(), mt.getBody());							
							 msgBody = formatEmailBody( deviceId.trim(), eventRefId, userBean.getPrimaryEmail(),mt.getSubject(), mt.getBody() );
							System.out.println("WS : eventRefId "+ eventRefId );
							
							//sending email to security officer.
							/*String securityOfficerEmail = LDAPUtils.getSecurityOfficerEmail( userBean.getShortOrganization(),SECURITY_FILTER.replace("Organization", userBean.getOrganization() ) );
							if(securityOfficerEmail!=null&&securityOfficerEmail!="") toEmailAddress.add( securityOfficerEmail );*/						
							//System.out.println(" toEmailAddress "+ toEmailAddress );
							MailSender.sendHTMLEmail( toEmailAddress , mt.getSubject(), msgBody );
														
							//sending email to Radio
							sendEmailToRadio( deviceId.trim(),mt.getSubject(),mt.getBody() );
							
							Logger.error("Event Successfully published to server ["+userBean.getUid()+"]["+eventRefId+"]",AlertServiceUtils.class.getName());
							insertEventRefId(refId, eventRefId);
							if(eventRefId != null){							
								processAlertMessage(mt.getBody(), "iPadAlert", mt.getSubject(), "0", lat, lng);
							}
							
						}
						
						//EMailUtils.getInstance().sendMail("sti@emergency.lu", mailId, null, mt.getBody()+" Event Reference:: ["+SecurityDBUtils.getEncryptedPassword(refId+"")+"]", mt.getSubject());
					}
					
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		System.out.println("## END AlertServiceUtils.publishAlert");
	}
	public static String formatEmailBody(String deviceId,String eventRef, String toEmail ,String subject, String body)
	{
		String messageBody="";			
		//messageBody+="To : "+toEmail+"<br/>";
		//messageBody+="From : "+EMAIL_FROM_+"<br/>";
		messageBody+="Subject : "+subject+"<br/>";
		messageBody+="Body : "+body+"<br/>";
		messageBody+="----------------------------------------<br/>";
		messageBody+="Device : "+deviceId+"<br/>";
		messageBody+="Source : "+STAS_Engine+"<br/>";
		messageBody+="Severity : "+lu.hitec.pss.soap.event.provider._21_x.Severity._CRITICAL+"<br/>";
		messageBody+="Timestamp : "+ CommonUtils.formatDate(Calendar.getInstance().getTime() )+"<br/>";
		messageBody+="Event ref : "+eventRef+"<br/>";		
		messageBody+="----------------------------------------<br/>";	
		//System.out.println( messageBody );
		return messageBody;
	}
	public static Boolean sendEmailToRadio(String deviceId, String subject, String messageBody )
	{
		boolean emailSent = false;
		subject="";
		if(deviceId!=null&& deviceId.startsWith("trackMe-")&& deviceId.length()==16 )
		{
			Logger.info("Sending email to radio........", AlertServiceUtils.class );
			//For dev,qa,prd
			//String toEmail = "dmr-"+deviceId.substring(8, 12)+"@globalepic.lu";
			List<String> toEmailAddress = new ArrayList<String>();
			//for TRN
			String toEmail = LDAPUtils.getRadioServerEmail( deviceId.substring(8, 12) );//
			Logger.info("132: toEmail : "+toEmail, AlertServiceUtils.class );
			if( toEmail==null || toEmail.isEmpty() ) toEmail = "dmr-comm@globalepic.lu";
			else if( toEmail.indexOf(",")==-1 ) toEmailAddress.add( toEmail );
			else{
				String s[] = toEmail.split(",");
				for(String t: s )toEmailAddress.add( t);
			}
			Logger.info(" toEmail "+ toEmail , AlertServiceUtils.class );
			String messageBodyPrefix= ":"+deviceId.substring(12,16)+" "; //subject prefixed to message.
			messageBody =  messageBodyPrefix+ subject + messageBody;
			
			
			MailSender.sendEmail(toEmailAddress, subject, messageBody );
			Logger.info(" Email sent to Radio VHF Callsign: "+deviceId.substring(8,16) +": @ address :"+toEmail , AlertServiceUtils.class );
			Logger.info(": subject: "+subject+": body : "+messageBody , AlertServiceUtils.class ); emailSent=true;
		}
		
		return emailSent;
	}
	public static void publishAlert(DeviceBean device, String dangerZoneName,  Double lat, Double lng){
		com.wfp.db.platform.model.MessageTemplate mt = com.wfp.utils.RBRegionsUtils.getMessageTemplate(dangerZoneName);
		if(mt == null){
			return;
		}
		
		//LDAPUserBean userBean = LDAPUtils.getLDAPUserBean(device.getName());
		//.LDAPUserBean userBean = LDAPUtils.cacheLDAPUserDtls(deviceId, null);
		String deviceId = null;
		//if(userBean != null){
			deviceId = device.getName();
			if(deviceId != null){
				try {
					long templateId = getTemplateId(dangerZoneName);
					Date date = new Date();
					boolean isDuplicate = validateAlert(templateId, deviceId, mt,   new Date());
					if(!isDuplicate){
						long refId = insertUpdateAlert(templateId, deviceId,  mt.getBody(), mt.getSubject(), date);
						if(refId > 0){
							String eventRefId = EventServiceUtils.publishEventService(deviceId, mt.getSubject(), mt.getBody());
							Logger.error("Event Successfully published to server ["+device.getUid()+"]["+eventRefId+"]",AlertServiceUtils.class.getName());
							insertEventRefId(refId, eventRefId);
							if(eventRefId != null){							
								processAlertMessage(mt.getBody(), "iPadAlert", mt.getSubject(), "0", lat, lng);
							}
						}
						
						//EMailUtils.getInstance().sendMail("sti@emergency.lu", mailId, null, mt.getBody()+" Event Reference:: ["+SecurityDBUtils.getEncryptedPassword(refId+"")+"]", mt.getSubject());
					}
					
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		//}
		
	}
	
	
	public static void publishAlertByUID(String uid, String dangerZoneName,  Double lat, Double lng){
		com.wfp.db.platform.model.MessageTemplate mt = com.wfp.utils.RBRegionsUtils.getMessageTemplate(dangerZoneName);
		if(mt == null){
			return;
		}
		
		//LDAPUserBean userBean = LDAPUtils.getLDAPUserBean(deviceId);
		//.LDAPUserBean userBean = LDAPUtils.cacheLDAPUserDtls(deviceId, null);
		String mailId = uid;
		//if(userBean != null){
			//mailId = userBean.getMail();
			//if(mailId != null){
				try {
					long templateId = mt.getId();
					Date date = new Date();
					boolean isDuplicate = validateAlert(templateId, mailId, mt,   new Date());
					if(!isDuplicate){
						long refId = insertUpdateAlert(templateId, mailId,  mt.getBody(), mt.getSubject(), date);
						if(refId > 0){
							String eventRefId = EventServiceUtils.publishEventService("avelala", mt.getSubject(), mt.getBody());
							Logger.error("Event Successfully published to server ["+uid+"]["+eventRefId+"]",AlertServiceUtils.class.getName());
							insertEventRefId(refId, eventRefId);
							if(eventRefId != null){							
								processAlertMessage(mt.getBody(), "iPadAlert", mt.getSubject(), "0", lat, lng);
							}
						}
						
						//EMailUtils.getInstance().sendMail("sti@emergency.lu", mailId, null, mt.getBody()+" Event Reference:: ["+SecurityDBUtils.getEncryptedPassword(refId+"")+"]", mt.getSubject());
					}
					
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			//}
		//}
		
	}
	
	
	
	
	/**
	 * This method to allow to display message in ticker panel from given parameters.
	 * @param message It is message information to display in Ticker.
	 * @param alertName It is name of Default alert.
	 * @param desc it is description of default alert.
	 * @param alertSourceType It is alert source type used for default alert.
	 */
	public static void processAlertMessage(String message,String alertName,String desc,String alertSourceType, Double lat, Double lng){
		HibernateUtils.getSessionFactory().getCurrentSession().beginTransaction();
		String hql="from AlertPriority ap,AlertMaster am where am.id = ap.alertId and am.name='"+alertName+"'";
		org.hibernate.Query query = HibernateUtils.getSessionFactory().getCurrentSession().createQuery(hql);
		List<Object[]> results =query.list();
//		System.out.println(results.size());
		HibernateUtils.getSessionFactory().getCurrentSession().getTransaction().rollback();
		if(results!=null && results.size()>0){
		for (int i=0;i<results.size();i++) {
			Object[] objects = results.get(i);
			if(objects!=null && objects.length>0){
				if(objects[0] instanceof AlertPriority){
				AlertPriority alertPriority = (AlertPriority)objects[0];
				Long priorityId= alertPriority.getId();
				Long alertId= alertPriority.getAlertId();
				AlertUtils.processAlertMessage(null, alertId, priorityId, message,desc, new Date().toString(), alertSourceType, null, null, null, null, null, null, lat, lng);
				}
			}
		}
		}

	}
	
	/**
	 * The method returns the alert id for a given alert name.
	 * 
	 * @param alertName The alert name for which the id needs to be returned.
	 * @return It returns the alert id for for a given alert name.
	 */
	public static Long getAlertId(String alertName){
		List<AlertBean> allAlerts = AlertUtils.getAllDefinedAlerts();
		for(int i=0; i < allAlerts.size(); i++){
			if(allAlerts.get(i).getName().equalsIgnoreCase(alertName)){
				return allAlerts.get(i).getId();
			}
		}
		return null;
	}
	

	private static boolean validateAlert(long templateId, String mailId, MessageTemplate mt, Date date) {
		// TODO Auto-generated method stub
		AlertService alertService = new AlertService();
		
		List<ICriteria> criteriaList = new ArrayList<ICriteria>();
		
		//TODO Kaleem
		
		CompositeCriteria compositeCriteria = new CompositeCriteria (EType.All );
		
		SimpleCriteria simpleCriteria1 = new SimpleCriteria();
		simpleCriteria1.setFieldName( PROPERTY_TEMPLATE_ID );
		simpleCriteria1.setOperator(EOperator.Equals);
		simpleCriteria1.setValue(templateId );
		criteriaList.add( simpleCriteria1 );
		
		SimpleCriteria simpleCriteria2 = new SimpleCriteria();
		simpleCriteria2.setFieldName( PROPERTY_MSG_TO );
		simpleCriteria2.setOperator(EOperator.Equals);
		simpleCriteria2.setValue(mailId );
		criteriaList.add( simpleCriteria2 );
		
		SimpleCriteria simpleCriteria3 = new SimpleCriteria();
		simpleCriteria3.setFieldName( PROPERTY_SEND_ON );
		simpleCriteria3.setOperator(EOperator.Equals);
		simpleCriteria3.setValue( date );
		criteriaList.add( simpleCriteria3 );
		
		compositeCriteria.setCriterias( criteriaList );
		
		List list  = alertService.searchData( compositeCriteria );
		if(list != null && list.size()> 0){
			return true;
		}
		criteriaList.remove( simpleCriteria3 );
		
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		simpleCriteria3 = new SimpleCriteria();
		simpleCriteria3.setFieldName( PROPERTY_SEND_ON );
		simpleCriteria3.setOperator(EOperator.GreaterThanEquals);
		simpleCriteria3.setValue( date );
		criteriaList.add( simpleCriteria3 );
		
		compositeCriteria.setCriterias( criteriaList );
		
		
		
		List msgperDayFilterList  = alertService.searchData( compositeCriteria );
		if(msgperDayFilterList != null && msgperDayFilterList.size()> 0 && ((mt.getRecurPerDay()!= null &&  mt.getRecurPerDay().intValue() != 0) 
				&& mt.getRecurPerDay() < msgperDayFilterList.size())){
			return true;
		}
		
		return false;
	}
	
	public static AlertService isValidAlert(long id) {
		// TODO Auto-generated method stub
		AlertService alertService = new AlertService();
		SearchCriteria criteria = new SearchCriteria();
		
		criteria.addCritirea("id", SearchCriteria.EQUALS, id);
		
		//TODO Kaleem
//		List list  = alertService.searchData(criteria);
//		if(list != null && list.size()> 0){
//			return (AlertService) list.get(0);
//		}
//		
		return null;
	}
	
	public static boolean insertEventRefId(long id, String eventRefId) {
		// TODO Auto-generated method stub
		AlertService alertService = new AlertService();
		SearchCriteria criteria = new SearchCriteria();
		
		criteria.addCritirea("id", SearchCriteria.EQUALS, id);
		
		//TODO Kaleem
		/*List list  = alertService.searchData(criteria);
		if(list != null && list.size()> 0){
			alertService =  (AlertService) list.get(0);
			alertService.setEventRefId(eventRefId);
			alertService.updateData();
		}*/
		
		return false;
	}
	public static boolean updateAlert(Renderable message, AlertService alertService){
		
		alertService.setReceivedMsg(message.getSubBody());
		alertService.setReceivedOn(message.getReveivedOn() == null ? new Date():message.getReveivedOn());		
		alertService.setId(Long.valueOf(SecurityDBUtils.getDecreptedPassword(message.getReferenceId())));
		return alertService.updateData();
	}
	
	private static long insertUpdateAlert(long templateId, String mailId, String body,
			String subject, Date date) {
		// TODO Auto-generated method stub
		AlertService alertService = new AlertService();
		alertService.setUserId(mailId);
		alertService.setSendOn(date);
		if(templateId >0){
			alertService.setTemplateId(templateId);
		}else {
			return 0L;
		}
		alertService.insertOrUpdateData();
		
		return alertService.getId();
	}
	
	private static long getTemplateId(String dangerZoneName){
		
		List<MessageTemplate> regionDtls = DataModelsCache.getInstance().retrieve(MessageTemplate.class.getName());
		if(regionDtls != null){
			for (MessageTemplate mt:regionDtls){
				if(mt != null && mt.getName()!=null&& mt.getName().equalsIgnoreCase(dangerZoneName)){
					return mt.getId();   
				}
			}
		}
		
		return -1;
	}
	
	
}
