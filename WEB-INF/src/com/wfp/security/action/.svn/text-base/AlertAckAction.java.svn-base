package com.wfp.security.action;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.enterprisehorizons.util.StringUtils;
import com.spacetimeinsight.security.action.ILoginConstants;
import com.spacetimeinsight.web.common.action.BaseAction;
import com.wfp.db.platform.model.AlertAcknowledgment;
import com.wfp.security.form.AlertAckForm;

public class AlertAckAction extends BaseAction implements ILoginConstants {

	public ActionForward load(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
	
		request.setAttribute("curdStatus", "load");

		return mapping.findForward("alertAck");
	}
	
	public ActionForward saveAcknowledgment(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
	
		AlertAckForm alertForm = (AlertAckForm) form;
		
		boolean isSaved = saveAcknowledgmentDtls(alertForm);

		if(isSaved){
			request.setAttribute("curdStatus", "saved");
		}else {
			request.setAttribute("curdStatus", "not saved");
		}
		return mapping.findForward("alertAck");
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
