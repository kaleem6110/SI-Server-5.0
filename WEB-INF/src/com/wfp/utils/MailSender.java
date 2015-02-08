/**
 * 
 */
package com.wfp.utils;

import java.util.List;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.ArrayList;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeBodyPart;

import com.enterprisehorizons.util.Logger;

/**
 * @author kaleem.mohammed
 * 
 */
public class MailSender implements IEPICConstants {
	public static void main(String args[]) {
		List<String> toAddressList = new ArrayList<String>();
		toAddressList.add("kaleem6110@gmail.com");
		// toAddressList.add("kaleem6110@gmail.com"); //
		sendEmail(toAddressList, "",
				":9080 testing from Java Mailprogram-sent multipart mimetype sent" );
		sendHTMLEmail(toAddressList, "hi", "This is message body");
	}

	public static void sendEmail(List<String> toAddressList,
			String subject, String messageBody) {
		System.out
				.println("@@@@@@@@@  START MailSender.sendEmail @@@@@@@@@@@@@@@@@@@@ ");

		Properties props = System.getProperties();
		props.put("mail.smtp.host", MAIL_HOST);
		props.put("mail.smtp.user", MAIL_FROM);
		props.put("mail.smtp.password", MAIL_PWD);
		props.put("mail.smtp.port", "25");
		props.put("mail.smtp.auth", "true");
		String[] toEmailAddress = null;
		try 
		{
			toEmailAddress = new String[toAddressList.size()];
			toEmailAddress = toAddressList.toArray(toEmailAddress);
			Session session = Session.getDefaultInstance(props, null);
			MimeMultipart content = new MimeMultipart("alternative");
			MimeMessage message = new MimeMessage(session);
			message.setFrom(new InternetAddress(EMAIL_FROM_));

			MimeBodyPart messageBodyPart = new MimeBodyPart();
			messageBodyPart.setText(messageBody);
			content.addBodyPart(messageBodyPart);
			
			InternetAddress[] toAddress = new InternetAddress[toEmailAddress.length];

			// To get the array of addresses
			for (int i = 0; i < toEmailAddress.length; i++) { // changed from
				// a while loop
				toAddress[i] = new InternetAddress(toEmailAddress[i]);
			}
			System.out.println(Message.RecipientType.TO);

			for (int i = 0; i < toAddress.length; i++) { // changed from a
				// while loop
				message.addRecipient(Message.RecipientType.TO, toAddress[i]);
			}
			message.setContent(content );
			
			Transport transport = session.getTransport("smtp");
			transport.connect(MAIL_HOST, MAIL_FROM, MAIL_PWD);
			transport.sendMessage(message, message.getAllRecipients());
			transport.close();
		} catch (Exception e) {
			System.out.println(" Failed to send email to  : "
					+ messageBody);
			e.printStackTrace();
		}

		System.out
				.println("@@@@@@@@@  END MailSender.sendEmail @@@@@@@@@@@@@@@@@@@@ "+toEmailAddress );
	}
	public static void sendHTMLEmail(List<String> toAddressList, String subject, String messageBody ) 
	{
		Logger.info("@@@@@@@@@  START MailSender.sendHTMLEmail @@@@@@@@@@@@@@@@@@@@ ", MailSender.class);

		
		Properties props = System.getProperties();
		props.put("mail.smtp.host", MAIL_HOST);
		props.put("mail.smtp.user", MAIL_FROM);
		props.put("mail.smtp.password", MAIL_PWD);
		props.put("mail.smtp.port", "25");
		props.put("mail.smtp.auth", "true");
	    try
	    {
		    Session session = Session.getDefaultInstance(props, null);
		    MimeMessage message = new MimeMessage(session);
		    message.setFrom(new InternetAddress(EMAIL_FROM_));
		    for( String addr : toAddressList ) message.addRecipient(Message.RecipientType.TO, new InternetAddress( addr ) );
		    message.setSubject( subject );
		    message.setContent( messageBody, "text/html" );
		    Transport transport = session.getTransport("smtp");
		    transport.connect(MAIL_HOST, MAIL_FROM, MAIL_PWD);
		    transport.sendMessage(message, message.getAllRecipients());
		    transport.close();
	    }
	    catch(Exception e){ e.printStackTrace(); };

		Logger.info("@@@@@@@@@  END MailSender.sendHTMLEmail @@@@@@@@@@@@@@@@@@@@ ", MailSender.class );
	}

}
