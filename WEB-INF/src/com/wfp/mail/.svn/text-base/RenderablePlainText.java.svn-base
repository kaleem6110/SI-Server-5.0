/*
 * RenderablePlainText.java
 *
 * Created on 10 November 2005, 10:49
 *
 * To change this template, choose Tools | Template Manager
 * and open the template in the editor.
 */

package com.wfp.mail;

import java.io.IOException;
import java.util.Date;

import javax.mail.Message;
import javax.mail.MessagingException;

import com.enterprisehorizons.util.StringUtils;

/**
 *
 * @author Dj
 */
public class RenderablePlainText implements Renderable {
    
    String bodytext;
    String subject;
    String subBody;
    Date receivedOn;
    
    /** Creates a new instance of RenderablePlainText */
    public RenderablePlainText(Message message) throws MessagingException, IOException {
        subject=message.getSubject();
        bodytext=(String)message.getContent();
        receivedOn = message.getReceivedDate();
        if(!StringUtils.isNull(bodytext) ){
        	if(bodytext.indexOf("Original Message") > -1){
        		subBody = bodytext.substring(0, bodytext.indexOf("Original Message"));
        	}
        	if(!StringUtils.isNull(bodytext) && bodytext.indexOf(", \"sti@emergency.lu\" <sti@emergency.lu> wrote:") > -1){
            	String tempstr = bodytext.substring(0, bodytext.indexOf(", \"sti@emergency.lu\" <sti@emergency.lu> wrote:")) ;
            	subBody = tempstr.substring(0, tempstr.lastIndexOf("On"));
            }
        }
        
    }
    
    public Attachment getAttachment(int i) {
        return null;
    }
    
    public int getAttachmentCount() {
        return 0;
    }
    
    public String getBodytext() {
        return "<PRE>"+bodytext+"</PRE>";
    }
    
    public String getSubject() {
        return subject;
    }

    public String getReferenceId() {
		String eventRefStartPoint = null;
		if(!StringUtils.isNull(bodytext ) && bodytext.lastIndexOf("Event Reference:: [") > -1){
			eventRefStartPoint = bodytext.substring(bodytext.lastIndexOf("Event Reference:: ["));
			eventRefStartPoint = eventRefStartPoint!= null && eventRefStartPoint.length() > 19?eventRefStartPoint.substring(19, eventRefStartPoint.indexOf("]")):null;
		}
		return eventRefStartPoint;
	}

	public Date getReveivedOn() {
		// TODO Auto-generated method stub
		return receivedOn;
	}

	public String getSubBody() {
		// TODO Auto-generated method stub
		return subBody;
	}
    
}
