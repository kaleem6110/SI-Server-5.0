package com.wfp.utils;

import java.net.MalformedURLException;
import java.rmi.RemoteException;
import java.util.Calendar;

import javax.naming.AuthenticationException;
import javax.xml.rpc.ServiceException;

import lu.hitec.pss.soap.ds.out._15_x.CrudEnum;
import lu.hitec.pss.soap.ds.out._15_x.DirectoryServiceOutInterfacePortBindingStub;
import lu.hitec.pss.soap.ds.out._15_x.DirectoryServiceOutInterface_PortType;
import lu.hitec.pss.soap.ds.out._15_x.DirectoryServiceOutInterface_ServiceLocator;
import lu.hitec.pss.soap.ds.out._15_x.PssuDevice;
import lu.hitec.pss.soap.ds.out._15_x.PssuVehicle;
import lu.hitec.pss.soap.ds.out._15_x.UnitId;
import lu.hitec.pss.soap.ds.out._15_x.UnitType;
import lu.hitec.pss.soap.event.provider._21_x.Desc;
import lu.hitec.pss.soap.event.provider._21_x.EventSrvProviderPortBindingStub;
import lu.hitec.pss.soap.event.provider._21_x.EventSrvProvider_Service;
import lu.hitec.pss.soap.event.provider._21_x.EventSrvProvider_ServiceLocator;
import lu.hitec.pss.soap.event.provider._21_x.Logbook;
import lu.hitec.pss.soap.event.provider._21_x.NotificationStatusSummary;
import lu.hitec.pss.soap.event.provider._21_x.Recipient;
import lu.hitec.pss.soap.event.provider._21_x.Severity;
import lu.hitec.pss.soap.event.provider._21_x.Status;
import lu.hitec.pss.soap.event.provider._21_x.StatusSummary;


import org.apache.axis.AxisFault;

import com.enterprisehorizons.util.Logger;

//import lu.hitec.pss.soap.ds.out._7_x.DirectoryServiceOutInterfaceProxy;

public class EventServiceUtils {

	private static String token= IEPICConstants.TOKEN ; //TRN->"adulovic-20131114-2478b95c6e23404685af7edfde315724"; 
	
	
	//QA-token :adulovic-20131107-5984aab55c9d4176a4b24ba0d4635d0f";
	// private static DirectoryServiceOutInterfaceProxy directoryService = new
	// DirectoryServiceOutInterfaceProxy();

	/*
	 * public static List<DeviceBean> printEventDetails(){ try {
	 * EventSrvClientPortBindingStub stub = getEventSrvClienrStub(); DomStatus[]
	 * domStatus = stub.getDomainStatus();
	 * 
	 * EvtFilter evtFilter = new EvtFilter(); evtFilter.setSrc("trackMe9735");
	 * 
	 * DomUpdate[] domUpdate = stub.getEventUpdates(domStatus, evtFilter, 10);
	 * if(domUpdate != null){ for(int i=0;i<domUpdate.length;i++){ Event[] evt =
	 * domUpdate[i].getEvts(); if(evt != null){ for(int j=0;j<evt.length;j++){
	 * //System.out.println(evt); } }
	 * 
	 * //System.out.println(domUpdate[i].getEvts()); } }
	 * 
	 * return null;
	 *  } catch (Exception e) { // TODO Auto-generated catch block
	 * e.printStackTrace(); } return null; }
	 */

	/*
	 * public static String publishEvent(String deviceId, String refId, String
	 * subject, String source, String body){ try {
	 * EventSrvProviderPortBindingStub stub = getEventSrvProviderStub(); String
	 * evtRef = stub.publishEvent(getEvt(deviceId, subject, body, source),
	 * null); //System.out.println("Event reference Id"+ evtRef ); return
	 * evtRef;
	 *  } catch (Exception e) { // TODO Auto-generated catch block
	 * e.printStackTrace(); } return null; } public static String
	 * publishEvent(Evt evt){ try { EventSrvProviderPortBindingStub stub =
	 * getEventSrvProviderStub(); String evtRef = stub.publishEvent(evt, null);
	 * //System.out.println("Event reference Id"+ evtRef ); return evtRef;
	 *  } catch (Exception e) { // TODO Auto-generated catch block
	 * e.printStackTrace(); } return null; }
	 * 
	 * public static Evt getEvt(String deviceId, String subject, String body,
	 * String source ){ EventRelatedInfo eri = new EventRelatedInfo();
	 * //eri.setRelDeviceId("trackMe9735");
	 * //eri.setRelEventRef("Idmw-A1-service-3c2b5827-9410-4376-8c4e-5fbf7f6b8659");
	 * eri.setRelDeviceId(deviceId);
	 * 
	 * Evt tempEvt = retrieveEvt(deviceId); if(tempEvt != null){
	 * EventRelatedInfo temperi = tempEvt.getRelatedInfo();
	 * eri.setRelEventRef(temperi.getRelEventRef()); }
	 * 
	 * 
	 * EventDescription desc = new EventDescription();
	 * //desc.setShortDesc("Testing from STI Portal ..Device trackMe9245 is
	 * danger zone..please ignore this mail"); desc.setShortDesc(subject);
	 * desc.setLongDesc(body);
	 * 
	 * 
	 * 
	 * Evt evt = new Evt(); evt.setDesc(desc); evt.setRelatedInfo(eri);
	 * evt.setSeverity(Severity.WARNING); evt.setSrc(source);
	 * evt.setTime(Calendar.getInstance()); evt.setType("Unsafe Zone");
	 * 
	 * return evt; }
	 */

	/*
	 * public static List<DeviceBean> checkEventStatus(String id){ try {
	 * EventSrvProviderPortBindingStub stub = getEventSrvProviderStub();
	 * 
	 * 
	 * EventStatus es = stub.getEventStatus(id); if(es != null){
	 * //System.out.println("Event reference Id"+ es.getValue() ); }
	 * 
	 * return null;
	 *  } catch (Exception e) { // TODO Auto-generated catch block
	 * e.printStackTrace(); } return null; }
	 */

	/*
	 * public static EventSrvClientPortBindingStub getEventSrvClienrStub(){
	 * EventSrvClient_Service service = new EventSrvClient_ServiceLocator();
	 * //http://middleware.service.emergency.lu/eventservice/admin/rest/events
	 * try { return new EventSrvClientPortBindingStub( new
	 * java.net.URL("http://middleware.service.emergency.lu/eventservice/out/soap/EventSrvClient"),service) ; }
	 * catch (AxisFault e) { // TODO Auto-generated catch block
	 * e.printStackTrace(); } catch (MalformedURLException e) { // TODO
	 * Auto-generated catch block e.printStackTrace(); } return null; }
	 */

	/*
	 * public static EventSrvProviderPortBindingStub getEventSrvProviderStub(){
	 * EventSrvProvider_Service service = new EventSrvProvider_ServiceLocator();
	 * 
	 * try { return new EventSrvProviderPortBindingStub( new
	 * java.net.URL("http://middleware.service.emergency.lu/eventservice/in/soap/EventSrvProvider"),service) ; }
	 * catch (AxisFault e) { // TODO Auto-generated catch block
	 * e.printStackTrace(); } catch (MalformedURLException e) { // TODO
	 * Auto-generated catch block e.printStackTrace(); } return null;
	 *  }
	 * 
	 * public static void storeEvt(String deviceId, Evt evt){
	 * if(getAlertServiceCache() != null){ getAlertServiceCache().put(deviceId,
	 * evt); } }
	 * 
	 * public static Evt retrieveEvt(String deviceId){ if(getAlertServiceCache() !=
	 * null){ getAlertServiceCache().get(deviceId); }
	 * 
	 * return null; }
	 */

	/*
	 * public static Map<String, Object> getAlertServiceCache() { return (Map<String,
	 * Object>) Cache.retrieve("$ALERT_SERVICE$"); }
	 * 
	 * public static void publishEvent(String dangerZoneName, String deviceId ){
	 * com.wfp.db.platform.model.MessageTemplate mt =
	 * com.wfp.utils.RBRegionsUtils.getMessageTemplate(dangerZoneName); if(mt ==
	 * null){ return; } Evt tempEvt =
	 * com.wfp.utils.EventServiceUtils.getEvt(deviceId, mt.getSubject(),
	 * deviceId, mt.getBody() ); String refId =
	 * com.wfp.utils.EventServiceUtils.publishEvent(tempEvt );
	 * tempEvt.getRelatedInfo().setRelEventRef(refId);
	 * com.wfp.utils.EventServiceUtils.storeEvt(deviceId, tempEvt); }
	 */
	public static DirectoryServiceOutInterface_PortType getLDAPStub() throws ServiceException{
		return  new DirectoryServiceOutInterface_ServiceLocator().getDirectoryServiceOutInterfacePort( );
	}

	public static String getLDAPToken() {
		try 
		{
			
			token=  getLDAPStub().authenticate(IEPICConstants.LDAP_USER_ID, 
					com.spacetimeinsight.db.model.util.SecurityDBUtils.getDecreptedPassword( IEPICConstants.LDAP_USER_PWD_ENCRYPTED), "");
			//stub.getMissionIdsAssignedToUnitForCrud(token, UnitId, crud)
			
	    	//PssuVehicle v = stub.getVehicle(token, "5Y-BNH");
		}catch(lu.hitec.pss.soap.ds.out._15_x.AuthenticationException e){
			System.out.println(" Authentication Error :167: "+e.getMessage1() );
		} catch (RemoteException e) {
			System.out.println("RemoteException :168: "+e.getMessage() );
		}catch (javax.xml.rpc.ServiceException e) {
			System.out.println("ServiceException :171: "+e.getMessage() );
		}
		
		return token;
	}

	public static void setToken(String token) {
		EventServiceUtils.token = token;
	}

	public static EventSrvProviderPortBindingStub getServiceLocatorStub() {
		EventSrvProvider_Service service = new EventSrvProvider_ServiceLocator();

		try {
			// System.out.println(", EventServiceUtils.class :Getting
			// notification summary Service locator
			// ["+WFPConfigUtils.getWFPConfigValue("alertservice")+" ]");
			return new EventSrvProviderPortBindingStub(
					new java.net.URL(
							WFPConfigUtils.getWFPConfigValue("alertservice") == null ? "http://middleware.globalepic.lu/eventservice/in/soap/EventService?wsdl"
									: WFPConfigUtils
											.getWFPConfigValue("alertservice")),
					service);
		} catch (AxisFault e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;

	}

	/*
	 * public static void publishEvent(){ EventSrvProviderPortBindingStub stub =
	 * getServiceLocatorStub(); Evt evt = new Evt(); evt.setType("alerting");
	 * 
	 * EventDescription desc = new EventDescription();
	 * //desc.setShortDesc("Testing from STI Portal ..Device trackMe9245 is
	 * danger zone..please ignore this mail"); desc.setShortDesc("Testing Alert
	 * Service"); desc.setLongDesc("Hi ... Testing the Alert Service from EPIC
	 * Portal....");
	 * 
	 * evt.setDesc(desc); EventRecipient er = new EventRecipient();
	 * er.setType("alerting"); er.setUserOrGroupUID("");
	 * evt.setEventRecipient(er);
	 * 
	 * try { String evtRef = stub.publishEvent(evt, null);
	 * 
	 * EventStatusSummary summary = stub.getEventStatusSummary(evtRef);
	 * //summary.g } catch (RemoteException e) { // TODO Auto-generated catch
	 * block e.printStackTrace(); } }
	 */

	public static String publishEventService(String userUniqueId,
			String subject, String body) {
		System.out.println("#### START publishEventService : userUniqueId"
				+ userUniqueId + " : subject :" + subject + ":body: " + body);
		EventSrvProviderPortBindingStub stub = getServiceLocatorStub();

		EventRecipient er = new EventRecipient();
		er.setType("USER");
		er.setUserOrGroupUID(userUniqueId);

		//EventDescription desc = new EventDescription(); 
		//desc.setShortDesc(subject);
		//desc.setLongDesc(body);
		// TimeZone.setDefault(TimeZone.getTimeZone("Rome"));
		lu.hitec.pss.soap.event.provider._21_x.Event evt = new lu.hitec.pss.soap.event.provider._21_x.Event();
		evt.setType(IEPICConstants.STAS_EVENT_TYPE);
		evt.setDesc( new Desc( subject, body) );
		evt.setLogbook( new Logbook());
		evt.setSrc(IEPICConstants.STAS_Engine);// STAS_Engine-dev,STAS_Engine-trn,
												// STAS_Engine-qa
		evt.setRecipient(new Recipient("USER", userUniqueId ));
		//evt.setMissionName("");
		Calendar cal = Calendar.getInstance();
		evt.setDate(cal);
		evt.setSeverity(Severity.CRITICAL);
	
		evt.setStatus( Status.OPEN );

		try {
			return stub.publishEvent(getLDAPToken(), evt);
		} catch (RemoteException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return null;
	}

	public static String getEventStatus(String eventRef) {
		EventSrvProviderPortBindingStub stub = getServiceLocatorStub();
		try {// FIXIT -
			StatusSummary eventStatusSummary = stub.getEventStatusSummary(
					getLDAPToken(), eventRef);
			NotificationStatusSummary[] statusSummary = eventStatusSummary
					.getNotificationStatusSummaries();
			if (statusSummary != null) {
				return statusSummary[0].getNotificationStatus().getValue();
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			System.out.println(" Exception occured :263:"+e.getMessage() );
		}
		return null;
	}

	public static NotificationStatusSummary getNotificationStatusSummary(
			String eventRef) {
		Logger.info("Getting notification summary  [" + eventRef + " ]",
				EventServiceUtils.class);
		EventSrvProviderPortBindingStub stub = getServiceLocatorStub();
		try {
			// System.out.println(" getNotificationStatusSummary **** :
			// "+getLDAPToken() + ":"+ eventRef );
			StatusSummary eventStatusSummary = stub.getEventStatusSummary(
					getLDAPToken(), eventRef);
			Logger.info("Got notification summary  [" + eventStatusSummary
					+ " ]", EventServiceUtils.class);
			NotificationStatusSummary[] statusSummary = eventStatusSummary != null ? eventStatusSummary
					.getNotificationStatusSummaries()
					: null;
			if (statusSummary != null) {
				for (NotificationStatusSummary tempSummary : statusSummary) {
					if (tempSummary.getNotificationStatus().getValue()
							.equalsIgnoreCase("ACKNOWLEDGED")) {
						return tempSummary;
					}
				}
			}
		} catch (RemoteException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			System.out.println(" Exception occured :294:"+e.getMessage() +": eventRef :"+ eventRef  );
			
		} catch (java.lang.NullPointerException exp) {
			System.out.println("£ NullPointerException $$$ "+exp.getMessage() );
			//exp.printStackTrace();
		}
		return null;
	}

	public static void main(String args[]) {
		// printEventDetails();
		// publishEvent();
		// checkEventStatus(publishEvent());
		getLDAPToken();
	}
}
