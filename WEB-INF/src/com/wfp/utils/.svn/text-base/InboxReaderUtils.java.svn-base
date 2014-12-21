package com.wfp.utils;

import java.util.Properties;

import javax.mail.Flags;
import javax.mail.Folder;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.NoSuchProviderException;
import javax.mail.Session;
import javax.mail.Store;
import javax.mail.Flags.Flag;
import javax.mail.search.FlagTerm;
import javax.mail.search.SearchTerm;

public class InboxReaderUtils {

	private static Properties props = System.getProperties();
	private static String MAIL_STORE_PROPERTY = "mail.store.protocol";
	
	static{
		props.setProperty(MAIL_STORE_PROPERTY, "imaps");
	}
	
	
	public static Message[] getUnreadMessages(String host, String user, String password){
		try {			
			Session session = Session.getDefaultInstance(props, null);
			Store store = session.getStore("imaps");
			
			store.connect("imap.gmail.com", "mailme.sti", "mailmesti");
			//store.connect("mail.startupfarms.com", "aditya.velala", "");
			

			Folder inbox = store.getFolder("Inbox");
			
			inbox.open(Folder.READ_ONLY);
			SearchTerm ft = new FlagTerm(new Flags(Flags.Flag.SEEN), false);
	    	
	    	return inbox.search(ft);
	         
			/*//Message messages[] = inbox.getMessages();
			System.out.println(messages.length);
			for(Message message:messages) {
				System.out.println(message.isSet(Flag.SEEN)+" " + message.getSubject());
			}*/
		} catch (NoSuchProviderException e) {
			e.printStackTrace();
			//System.exit(1);
		} catch (MessagingException e) {
			e.printStackTrace();
			//System.exit(2);
		}
		
		return null;
	}
	
	public static Message[] getUnreadMessagesContent(String host, String user, String password){
		try {
			props.setProperty("mail.store.protocol", "imaps");
			Session session = Session.getDefaultInstance(props, null);
			Store store = session.getStore("imaps");
			
			//store.connect("imap.gmail.com", "veladitya", "gan.62121");
			store.connect("mail.startupfarms.com", "aditya.velala", "#dubai123");
			

			Folder inbox = store.getFolder("Inbox");
			
			inbox.open(Folder.READ_ONLY);
			Message messages[] = inbox.getMessages();
			for(Message message:messages) {
				
				System.out.println(message.isSet(Flag.SEEN)+" " + message.getSubject());
			}
		} catch (NoSuchProviderException e) {
			e.printStackTrace();
			System.exit(1);
		} catch (MessagingException e) {
			e.printStackTrace();
			System.exit(2);
		}
		
		return null;
	}
	
	 public static String getContent(Multipart p) throws Exception {

		for (int i = 0; i < p.getCount(); i++) {
			Object obj = p.getBodyPart(i).getContent();
			if (obj instanceof String) {
				return (String) obj;
			}
		}

		return null;
	}
	 
	 
	 
	 public static void main(String args[]) {
			
			try {
				props.setProperty("mail.store.protocol", "imaps");
				Session session = Session.getDefaultInstance(props, null);
				Store store = session.getStore("imaps");
				//store.connect("imap.gmail.com", "veladitya", "gan.62121");
				store.connect("mail.startupfarms.com", "aditya.velala", "#dubai123");
				System.out.println(store);

				Folder inbox = store.getFolder("Inbox");
				
				inbox.open(Folder.READ_ONLY);
				SearchTerm ft = new FlagTerm(new Flags(Flags.Flag.SEEN), false);
		    	
		    	Message messages[] = inbox.search(ft);
		         
				//Message messages[] = inbox.getMessages();
				System.out.println(messages.length);
				for(Message message:messages) {
				System.out.println(message.isSet(Flag.SEEN)+" " + message.getSubject());
			}
		} catch (NoSuchProviderException e) {
			e.printStackTrace();
			System.exit(1);
		} catch (MessagingException e) {
			e.printStackTrace();
			System.exit(2);
		}

	}

}