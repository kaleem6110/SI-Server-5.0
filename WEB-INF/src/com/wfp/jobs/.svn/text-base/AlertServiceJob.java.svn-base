package com.wfp.jobs;

import com.enterprisehorizons.util.StringUtils;
import com.spacetimeinsight.config.scheduler.Parameters;
import com.spacetimeinsight.db.model.util.SecurityDBUtils;
import com.spacetimeinsight.magma.job.CustomJobTask;
import com.wfp.db.platform.model.AlertService;
import com.wfp.mail.Renderable;
import com.wfp.utils.AlertServiceUtils;
import com.wfp.utils.MailRetrieverUtils;

/**
 * 
 * @author sti-user
 *
 */
public class AlertServiceJob implements CustomJobTask {
	
	public AlertServiceJob () {
			
	}
	
	public boolean executeCustomTask(Parameters parameters) {
		readMails();
		return true;
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
