package com.wfp.utils;

import java.io.IOException;
import java.util.Calendar;
import java.util.Properties;

import javax.mail.FetchProfile;
import javax.mail.Folder;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.NoSuchProviderException;
import javax.mail.Session;
import javax.mail.Store;
import javax.mail.search.ComparisonTerm;
import javax.mail.search.SearchTerm;
import javax.mail.search.SentDateTerm;

import com.wfp.mail.Renderable;
import com.wfp.mail.RenderableMessage;
import com.wfp.mail.RenderablePlainText;

public class MailRetrieverUtils {

	public static Store getEmailStore(String emailServer, String user,
			String password, String provider) {
		Session session;
		Store store = null;
 
		Properties props = System.getProperties();
		props.setProperty("mail.pop3s.rsetbeforequit", "false");
		props.setProperty("mail.pop3.rsetbeforequit", "false");
		session = Session.getInstance(props, null);
		try {
			store = session.getStore(provider);
			store.connect(emailServer, user, password);

			return store;
		} catch (NoSuchProviderException ex) {
			ex.printStackTrace();
		} catch (MessagingException ex) {
			ex.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return store;
	}

	private static Folder getMailInbox(Store store) {

		Folder folder = null;
		Folder inboxfolder = null;

		try {
			folder = store.getDefaultFolder();
			if (folder == null)
				throw new Exception("No default folder");
			inboxfolder = folder.getFolder("INBOX");
			if (inboxfolder == null)
				throw new Exception("No INBOX");
			inboxfolder.open(Folder.READ_ONLY);

			Message[] msgs = inboxfolder.getMessages();

			FetchProfile fp = new FetchProfile();
			fp.add("Subject");
			inboxfolder.fetch(msgs, fp);
			return inboxfolder;

		} catch (NoSuchProviderException ex) {
			ex.printStackTrace();
		} catch (MessagingException ex) {
			ex.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {

		}

		return null;
	}

	public static Renderable[] getMessages(String emailServer, String user,
			String password, String provider) {
		Store store = null;
		Folder inboxfolder = null;

		Renderable[] renderedMsgs = null;
		try {
			store = getEmailStore(emailServer, user, password, provider);
			inboxfolder = getMailInbox(store);

			Calendar date = Calendar.getInstance();
			date.add(Calendar.HOUR, -10);
			SearchTerm newer = new SentDateTerm(ComparisonTerm.GE, date
					.getTime());
			try {
				Message[] msg = inboxfolder.search(newer, inboxfolder
						.getMessages());
				if (msg != null) {
					renderedMsgs = new Renderable[msg.length];
				} else {
					return null;
				}
				for (int j = msg.length - 1; j >= 0; j--) {
					renderedMsgs[j] = getMessage(msg[j]);
				}
			} catch (MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			/* for(int j=msgs.length-1;j>=0;j--) {
			     
			 }*/
		} finally {

			try {
				inboxfolder.close(false);
			} catch (MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			try {
				store.close();
			} catch (MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		return renderedMsgs;

	}

	private static Renderable getMessage(Message message) {
		
		if (message == null) {			
			return null;
		}

		try {
			if (message.getContentType().startsWith("text/plain")) {
				return  new RenderablePlainText(message);
			} else {
				return new RenderableMessage(message);
			}
			//printMsg(latestMessage);

		} catch (MessagingException ex) {
			ex.printStackTrace();
		} catch (IOException ex) {
			ex.printStackTrace();
		}

		return null;
	}

	public static void main(String args[]) {

		Renderable[] msg = getMessages("pop.service.emergency.lu", "sti",
				"gXx8eyJ6OO6DzJRlnZEz", "pop3");
		System.out.println(" msg "+msg.length);
		for (int i = 0; i < msg.length; i++) {
			System.out.println("Subject:" + msg[i].getSubject());
			System.out.println("Ref Id:" + msg[i].getReferenceId());
			System.out.println("Received On" + msg[i].getReveivedOn());
			System.out.println("Actual Message" + msg[i].getSubBody());			
		}
	}

}
