package com.wfp.jobs;

import java.io.IOException;
import java.util.Date;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;

import com.enterprisehorizons.util.StringUtils;
import com.spacetimeinsight.config.scheduler.Parameters;
import com.spacetimeinsight.magma.job.CustomJobTask;
import com.wfp.db.platform.model.AlertAcknowledgment;
import com.wfp.security.form.AlertAckForm;
import com.wfp.utils.InboxReaderUtils;

public class CustomInboxReaderJob implements CustomJobTask {
	

	public boolean executeCustomTask(Parameters parameters) {
	
		Message messages[] = InboxReaderUtils.getUnreadMessages(null, null, null);
		
		for(Message message:messages) {
			
			try {
				postAcknowledgeDtls(InboxReaderUtils.getContent((Multipart) message.getContent()));
				
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return true;
	}
	
	 
	 private void postAcknowledgeDtls(String content) {
		// TODO Auto-generated method stub
		 if(content != null && content.lastIndexOf("On") > 0){
			String actualMessage = content.substring(content.lastIndexOf("On"));
			String alertMessage = actualMessage.substring(actualMessage.indexOf("Source Name:"));
			
			if(StringUtils.isNull(alertMessage)){
				return;
			}
			String[] alertDtls = alertMessage.split("::");
			AlertAckForm alertForm = new AlertAckForm();
			for(int j=0;j<alertDtls.length; j++){
				String[] alertData = alertDtls[j].split(":");
				
				if("Source Name".equalsIgnoreCase(alertData[0])){
					alertForm.setSourceName(alertData[1]);
				}				
				if("Event Id".equalsIgnoreCase(alertData[0])){
					alertForm.setEventId(alertData[1]);								
				}				
				if("Event Date".equalsIgnoreCase(alertData[0])){
					alertForm.setEventDate(alertData[1]);
				}
				if("Priority".equalsIgnoreCase(alertData[0])){
					alertForm.setPriority(alertData[1]);
				}
				if("Message".equalsIgnoreCase(alertData[0])){
					alertForm.setMessage(alertData[1]);
				}
			}
			saveAcknowledgmentDtls(alertForm);	
				
		 }
	}


	private boolean  saveAcknowledgmentDtls(AlertAckForm alertForm) {
		// TODO Auto-generated method stub
		AlertAcknowledgment aAck = new AlertAcknowledgment();
		
		aAck.setComments(alertForm.getComments());
		aAck.setEventAckDate(new Date());
		aAck.setEventDate(new Date(StringUtils.getLong(alertForm.getEventDate())));
		aAck.setEventId(alertForm.getEventId());
		aAck.setMessage(alertForm.getMessage());
		aAck.setPriority(alertForm.getPriority());
		aAck.setSourceName(alertForm.getSourceName());
		aAck.setMessage(alertForm.getMessage());
		aAck.setAckBy(alertForm.getUserId());
		return aAck.insertData();
		
	}

	

}
