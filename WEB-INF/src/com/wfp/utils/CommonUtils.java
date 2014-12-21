package com.wfp.utils;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.lang.reflect.Array;
import java.net.URL;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.CharacterData;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.xml.sax.InputSource;

import com.enterprisehorizons.magma.designtime.artifact.IGeoArtifact;
import com.enterprisehorizons.magma.server.util.ServerUtils;
import com.enterprisehorizons.util.Logger;
import com.enterprisehorizons.util.StringUtils;
import com.wfp.jobs.RestTrackingJob;
import com.wfp.beans.*;
/**
 * Common Utility class 
 * @author kaleem.mohammed
 *
 */
public class CommonUtils implements IEPICConstants{

	/**
	 * format the middle ware date to generic format. <code>EPIC_DATE_FORMAT</code> to <code>PORTAL_DATE_FORMAT</code>
	 * @param datetime
	 * @return
	 */
	public static String formatDate(String datetime){
		if(StringUtils.isNull(datetime)){
			return null;
		}
		
		SimpleDateFormat formatter = new SimpleDateFormat(EPIC_DATE_FORMAT);  
		Date date;
        try {
			date = formatter.parse(datetime);
			return NEW_PORTAL_SIMPLE_FORMAT.format(date);
			//return PORTAL_SIMPLE_FORMAT.format(date);
		} catch (ParseException e) {
			Logger.error("Error ocurred while formatting date ["+datetime+"]", CommonUtils.class, e);
		}  
          
       return null;
	}
	
	/**
	 * @param datetime
	 * @param timeformat
	 * @return
	 */
	public static String formatDate(String datetime, String timeformat){
		if(StringUtils.isNull(datetime)){
			return null;
		}		
		SimpleDateFormat  formatter = new SimpleDateFormat(timeformat);  
		Date date;
        try {
			date = formatter.parse(datetime);
			return PORTAL_SIMPLE_FORMAT.format(date);
		} catch (ParseException e) {
			Logger.error("Error ocurred while formatting date ["+datetime+"]", CommonUtils.class, e);
		}  
          
       return null;
	}
	/**
	 * @param datetime
	 * @param inputTimeformat
	 * @param outputTimeFormat
	 * @return
	 */
	public static String formatDate(String datetime, String inputTimeformat, String outputTimeFormat){
		if(StringUtils.isNull(datetime)){
			return null;
		}		
		SimpleDateFormat  formatter = new SimpleDateFormat(inputTimeformat);  
		Date date;
        try {
			date = formatter.parse(datetime);
			return new SimpleDateFormat(outputTimeFormat).format(date);
		} catch (ParseException e) {
			Logger.error("Error ocurred while formatting date ["+datetime+"]", CommonUtils.class, e);
		}  
          
       return null;
	}
	
	/**
	 * @param datetime
	 * @param timeformat
	 * @return
	 */
	public static Date parseDate(String datetime, String timeformat){
		if(StringUtils.isNull(datetime)){
			return null;
		}		
		SimpleDateFormat  formatter = new SimpleDateFormat(timeformat);  
		try {
			return formatter.parse(datetime);
			//return PORTAL_SIMPLE_FORMAT.format(date);
		} catch (ParseException e) {
			Logger.error("Error ocurred while formatting date ["+datetime+"]", CommonUtils.class, e);
		}  
          
       return null;
	}
	
	
	/**
	 * @param datetime
	 * @param timeformat
	 * @return
	 */
	public static String getUTCDateString(String datetime, String timeformat)
	{
		if(datetime.contains("PST") || datetime.contains("PDT"))
		{
			datetime = datetime.replaceAll("PDT", "UTC");
			datetime = datetime.replaceAll("PST", "UTC");
		}
		else 	return datetime;		
		
		return getUTCdatetime(parseDate(datetime, timeformat)); 
	}
	
	
	//EEE MMM dd HH:mm:ss z yyyy	
	/**
	 * @param String datetime ( EPIC_DATE_FORMAT )
	 * @return Date
	 */
	public static Date parseDate(String datetime){
		if(StringUtils.isNull(datetime)){
			return null;
		}
		
		SimpleDateFormat  formatter = new SimpleDateFormat(EPIC_DATE_FORMAT);  
		try {
			return formatter.parse(datetime);
		} catch (ParseException e) {
			Logger.error("Error ocurred while formatting date ["+datetime+"]", CommonUtils.class, e);
		}  
          
       return null;
	}
	public static Date parseSensorDate(String datetime){
		if(StringUtils.isNull(datetime)){
			return null;
		}
		
		SimpleDateFormat  formatter = new SimpleDateFormat(CALENDAR_DATE_FORMAT);  
		try {
			return formatter.parse(datetime);
		} catch (ParseException e) {
			Logger.error("Error ocurred while formatting date ["+datetime+"]", CommonUtils.class, e);
		}  
          
       return null;
	}
	public static void main(String a[]){
		
		Date d = parseSensorDate("Fri Jul 04 23:05:34 GMT+00:00 2014");
		System.out.println(d.getTimezoneOffset() );
		//Testing LocalTime
		System.out.println ( getLocalTime("4" ,"Fri Jul 04 23:05:34 GMT+00:00 2014",IEPICConstants.CALENDAR_DATE_FORMAT)  ) ;
	}
	/**
	 * @param datetime
	 * @return
	 */
	public static Date parseDatePortalFormat(String datetime){
		if(StringUtils.isNull(datetime)){
			return null;
		}
		SimpleDateFormat  formatter = new SimpleDateFormat(PORTAL_DATE_FORMAT);  
		try {
			return formatter.parse(datetime);
		} catch (ParseException e) {
			Logger.error("Error ocurred while formatting date ["+datetime+"]", CommonUtils.class, e);
		}  
          
       return null;
	}
	
	/**
	 * @param datetime
	 * @return
	 */
	public static String formatDate(Date datetime){
		if(datetime == null){
			return null;
		}
		try {
			
			//return PORTAL_SIMPLE_FORMAT.format(datetime);
			return NEW_PORTAL_SIMPLE_FORMAT.format(datetime);
		} catch (Exception e) {
			Logger.error("Error ocurred while formatting date ["+datetime+"]", CommonUtils.class, e);
		}  
          
       return null;
	}
	public static String formatWSDate(Date datetime){
		if(datetime == null){
			return null;
		}
		try {
			
			//return PORTAL_SIMPLE_FORMAT.format(datetime);
			return CALENDAR_DATE_SIMPLE_FORMAT.format(datetime);
		} catch (Exception e) {
			Logger.error("Error ocurred while formatting date ["+datetime+"]", CommonUtils.class, e);
		}  
          
       return null;
	}
	
	
	/**
	 * @param ldapUserBean
	 * @param artefact
	 * @param layerName
	 */
	public static  void addDeviceDtls(com.wfp.security.form.LDAPUserBean ldapUserBean, IGeoArtifact artefact, String layerName){
		if(layerName.startsWith(LAYER_STAFF))
		{	
			if(!StringUtils.isNull(ldapUserBean.getOrganization())) artefact.addAttribute(ATTR_ORGANIZATION, ldapUserBean.getOrganization());		
			if(!StringUtils.isNull(ldapUserBean.getCallSign())) artefact.addAttribute(ATTR_CALL_SIGN, ldapUserBean.getCallSign());		
			
		}
		else if(layerName.startsWith(LAYER_VEHICLE))
		{			
			if(!StringUtils.isNull(ldapUserBean.getFleet()))    artefact.addAttribute(ATTR_UNIT, ldapUserBean.getFleet());			
			if(!StringUtils.isNull(ldapUserBean.getUnit()))	    artefact.addAttribute(ATTR_FLEET, ldapUserBean.getFleet());				
			if(!StringUtils.isNull(ldapUserBean.getCallSign()))	artefact.addAttribute(ATTR_CALL_SIGN, ldapUserBean.getCallSign());
			
		}
		//else if(layerName.startsWith(LAYER_AIRPLANE)) return;
		
		
	}
	
	/**
	 * @param artefact
	 * @param skypeId
	 * @param ocsId
	 * @param sipId
	 * @return
	 */
	public static  String getContactDtls(IGeoArtifact artefact, String skypeId, String ocsId, String sipId){		
		return getContactDtls(skypeId, ocsId, sipId);
		
	}

	/**
	 * @param skypeId
	 * @param ocsId
	 * @param sipId
	 * @return
	 */
	public static  String getContactDtls(String skypeId, String ocsId, String sipId) {
		StringBuffer contact = new StringBuffer();
		String serverRootUrl = ""; //TODO;
		if(!com.enterprisehorizons.util.StringUtils.isNull(skypeId)){			
			contact.append( "<a href=\"skype:"+skypeId+"?call\">  <img src='"+serverRootUrl+SKYPE_CALL_IMG+"' width='16px' height='16px' title='Call on skype'>  </a>");
		}
		
		if(!com.enterprisehorizons.util.StringUtils.isNull(ocsId)){
		
			contact.append( " "+"<a href=\"tel:"+ocsId+"\">  <img src='"+serverRootUrl+MOBILE_IMG+"'   title='Call on Lync'>  </a>" );
		}
		
		if(!com.enterprisehorizons.util.StringUtils.isNull(sipId) && !com.enterprisehorizons.util.StringUtils.isNull(StringUtils.replaceAll(sipId, "\"NULL\" ", "")) && !com.enterprisehorizons.util.StringUtils.isNull(StringUtils.replaceAll(sipId, "\"\" ", ""))){
			
			if(NULL_STR.equalsIgnoreCase(sipId)){
				return contact.toString();
			}
			
			contact.append( " "+"<a href=\"sip:"+sipId+"\">  <img src='"+serverRootUrl+SIP_CALL_IMG+"' width='16' height='16' title='Send me IM'>  </a>");
		}
		
		return contact.toString();
	}
	
	/**
	 * @param pagersList
	 * @param emailsList
	 * @param mobilesList
	 * @param fullName
	 * @return
	 */
	public static  String getContactDtls(List<String> pagersList, List<String> emailsList, List<String> mobilesList,String fullName) {
		StringBuffer contact = new StringBuffer();
		String serverRootUrl = "";//TODO ServerUtils.getServerBaseUrl();
		if(pagersList != null && pagersList.size() > 0){
			contact.append("<fieldset><legend>Pager</legend>");
			for(String pager:pagersList){
				if(pager.indexOf("skype") == 0)
					contact.append( "<a href=\""+pager+"\">  <img src='"+serverRootUrl+SKYPE_CALL_IMG+"' width='16px' height='16px' title='"+pager+"'>  </a>");
				else if(pager.indexOf("msn") == 0){
					contact.append( "<a href=\""+pager+"\">  <img src='"+serverRootUrl+MSN_IM+"' width='16px' height='16px' title='"+pager+"'>  </a>");
				}else if(pager.indexOf("gtalk") == 0){
					contact.append( "<a href=\""+pager+"\">  <img src='"+serverRootUrl+GTALK_IM+"' width='16px' height='16px' title='"+pager+"'>  </a>");
				}else {
					contact.append( "<a href=\""+pager+"\">  <img src='"+serverRootUrl+CONTACT+"' width='16px' height='16px' title='"+pager+"'>  </a>");
				}
				
			}
			contact.append("</fieldset>");
		}
		contact.append("<br>");
		
		if(emailsList != null && emailsList.size() > 0){
			contact.append("<fieldset><legend>Mail</legend>");
			for(String email:emailsList){
				if(email.indexOf("gmail") >= 0){
					contact.append( " "+"<a href=\"mailto:"+email+"\">  <img src='"+serverRootUrl+GTALK_IM+"' width='16' height='16' title='Send IM to "+fullName+" '>  </a>");
				}else {
					
					contact.append( " "+"<a href=\"mailto:"+email+"\">  <img src='"+serverRootUrl+CONTACT+"' width='16' height='16' title='Send IM to "+fullName+" '>  </a>");
				}
				
			}
			contact.append("</fieldset>");
		}
		contact.append("<br>");
		if(mobilesList != null && mobilesList.size() >0){
			contact.append("<fieldset><legend>Telephone</legend>");
			for(String mobile:mobilesList){
				contact.append( " "+"<a href=\"javascript:"+mobile+"\">  <img src='"+serverRootUrl+MOBILE_IMG+"' width='16' height='16' title='Call "+fullName+" '>  </a>");
			}
			contact.append("</fieldset>");
		}
		
		return contact.toString();
	}
	
	/**
	 * @param pagersList
	 * @return
	 */
	public static  String getPagerDtls(List<String> pagersList) {
		StringBuffer contact = new StringBuffer();
		String serverRootUrl ="";//TODO ServerUtils.getServerBaseUrl();
		if(pagersList != null && pagersList.size() > 0){
			//contact.append("<fieldset><legend>Pager</legend>");
			for(String pager:pagersList){
				if(pager.indexOf("skype") == 0)
					contact.append( "<a href=\""+pager+"\">  <img src='"+serverRootUrl+SKYPE_CALL_IMG+"' width='16px' height='16px' title='"+pager+"'>  </a>");
				else if(pager.indexOf("msn") == 0){
					contact.append( "<a href=\""+pager+"\">  <img src='"+serverRootUrl+MSN_IM+"' width='16px' height='16px' title='"+pager+"'>  </a>");
				}else if(pager.indexOf("gtalk") == 0){
					contact.append( "<a href=\""+pager+"\">  <img src='"+serverRootUrl+GTALK_IM+"' width='16px' height='16px' title='"+pager+"'>  </a>");
				}else {
					contact.append( "<a href=\""+pager+"\">  <img src='"+serverRootUrl+CONTACT+"' width='16px' height='16px' title='"+pager+"'>  </a>");
				}
				
			}
		}
		
		return contact.toString();
	}
	/**
	 * @param pagersList
	 * @return
	 */
	public static  Messaging getMessaging(List<String> pagersList) {
		Messaging mbean = new Messaging();
		String serverRootUrl ="";//TODO  ServerUtils.getServerBaseUrl();
		if(pagersList != null && pagersList.size() > 0){
			//contact.append("<fieldset><legend>Pager</legend>");
			for(String pager:pagersList){
				if(pager.indexOf("skype") == 0) mbean.setSkype( pager.replace("skype:","") );					
				else if(pager.indexOf("msn") == 0)mbean.setMsn(pager.replace("msnim:chat?contact=","") );					
				else if(pager.indexOf("gtalk") == 0) mbean.setGtalk(pager.replace("gtalk:chat?jid=","") );
				else mbean.setOther( pager );
			}
		}
		
		return mbean;
	}
	public static  String getMessaging(List<String> pagersList, String type ) {
		
		if(pagersList != null && pagersList.size() > 0){
			//contact.append("<fieldset><legend>Pager</legend>");
			for(String pager:pagersList){
				if(pager.indexOf(type) == 0) return  pager;			
				
			}
		}
		
		return null;
	}
	
	/**
	 * @param emailsList
	 * @return
	 */
	public static  String getMailDtls(List<String> emailsList) {
		StringBuffer contact = new StringBuffer();
		if(emailsList != null && emailsList.size() > 0){			
			for(String email:emailsList){
				
				contact.append(  "<a href='mailto:"+email+"' > "+email+"</a><br>");				
			}			
		}
		
		return contact.toString();
	}
	
	public static  String getPhoneDtls(List<String> mobilesList) {
		Logger.info(" START getPhoneDtls : "+ mobilesList ,CommonUtils.class );
		StringBuffer contact = new StringBuffer();
		if(mobilesList != null && mobilesList.size() >0){			
			for(String mobile:mobilesList){
				contact.append(mobile+ " <br>");
			}			
		}
		Logger.info(" END getPhoneDtls : "+ contact  ,CommonUtils.class );
		return contact.toString();
	}
	public static  String getPhoneNumber(List<String> mobilesList, String name) {
		Logger.info(" START getPhoneNumber : "+ mobilesList ,CommonUtils.class );
		String contact = "-NOT AVAILABLE-";
		if(mobilesList != null && mobilesList.size() >0){			
			for(String mobile:mobilesList){
				//contact.append(mobile+ " <br>");
				if( mobile.indexOf(name)>=0){
					contact= mobile;
					contact=contact.replace( name+":" ,"" ).replaceAll("|", "");
				}
			}			
		}
		Logger.info(" END getPhoneNumber : "+ contact  ,CommonUtils.class );
		return contact;
	}
	/**
	 * @param mobilesList
	 * @return
	 */
	public static  Telephone getTelephones(List<String> mobilesList) {
		Telephone telephone = new Telephone();
		List<String> mobileList =new ArrayList<String>();
		if(mobilesList != null && mobilesList.size() >0){			
			for(String mobile:mobilesList){
				mobile = mobile.toLowerCase();			
				if( mobile.endsWith("|mobile"))mobileList.add(mobile.replace("|mobile",""));
				else if(mobile.endsWith("|foodsat") )telephone.setFoodsat(mobile.replace("|foodsat","") );
				else if(mobile.endsWith("|office") ) telephone.setOffice( mobile.replace("|office",""));
				else if(mobile.endsWith("|wave") ) telephone.setWave( mobile.replace("|wave","") );
				else if(mobile.endsWith("|fax") ) telephone.setFax( mobile.replace("|fax","") );		
			}	
			telephone.setMobileList(mobileList);
		}
		
		return telephone;
	}
	
	/**
	 * @param skypeId
	 * @param skypeImg
	 * @param ocsId
	 * @param ocsImg
	 * @param sipId
	 * @param sipImg
	 * @return
	 */
	public static  String getContactDtls(String skypeId, String skypeImg, String ocsId, String ocsImg,  String sipId, String sipImg) {
		StringBuffer contact = new StringBuffer();
		String serverRootUrl = "";//TODO ServerUtils.getServerBaseUrl();
		if(!com.enterprisehorizons.util.StringUtils.isNull(skypeId)){			
			contact.append( "<a href=\""+skypeId+"\">  <img src='"+serverRootUrl+skypeImg+"' width='16px' height='16px' title='Call on skype'>  </a>");
		}
		
		if(!com.enterprisehorizons.util.StringUtils.isNull(ocsId)){
		
			contact.append( " "+"<a href=\"tel:"+ocsId+"\">  <img src='"+serverRootUrl+ocsImg+"'   title='Call on Lync'>  </a>" );
		}
		
		if(!com.enterprisehorizons.util.StringUtils.isNull(sipId) && !com.enterprisehorizons.util.StringUtils.isNull(StringUtils.replaceAll(sipId, "\"NULL\" ", "")) && !com.enterprisehorizons.util.StringUtils.isNull(StringUtils.replaceAll(sipId, "\"\" ", ""))){
			
			if(NULL_STR.equalsIgnoreCase(sipId)){
				return contact.toString();
			}
			
			contact.append( " "+"<a href=\"sip:"+sipId+"\">  <img src='"+serverRootUrl+sipImg+"' width='16' height='16' title='Send me IM'>  </a>");
		}
		
		return contact.toString();
	}

	public static String[] getHttpUrls(String desc){
		
		return null;
	}
	
	@SuppressWarnings("unchecked")
	public static List pullLinks(String text) {
		if(!StringUtils.isNull(text)){			
			List links = new ArrayList();
	
			String regex = "\\(?\\b(http://|www[.])[-A-Za-z0-9+&@#/%?=~_()|!:,.;]*[-A-Za-z0-9+&@#/%=~_()|]";
			Pattern p = Pattern.compile(regex);
			Matcher m = p.matcher(text);
			while (m.find()) {
				String urlStr = m.group();
				if (urlStr.startsWith("(") && urlStr.endsWith(")")) {
					urlStr = urlStr.substring(1, urlStr.length() - 1);
				}
				links.add(urlStr);
			}
			return links;
		}
		   
		
		return null;
	}

	public static Date getUTCdatetimeAsDate() 
	{ 
	    // note: doesn't check for null
	    return stringDateToDate(getUTCdatetimeAsString()); 
	} 
	 
	/**
	 * @return
	 */
	public static String getUTCdatetimeAsString() 
	{ 
	    final SimpleDateFormat sdf = new SimpleDateFormat(NEW_PORTAL_DATE_FORMAT); 
	    sdf.setTimeZone(TimeZone.getTimeZone("UTC")); 
	    final String utcTime = sdf.format(new Date()); 
	 
	    return utcTime;
	} 
	
	/**
	 * @param datetime
	 * @return
	 */
	
	public static String getUTCdatetime(Date datetime) 
	{ 
	    //Kaleem final SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss z");
		final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd HH:mm:ss z");
	    sdf.setTimeZone(TimeZone.getTimeZone("UTC")); 
	    final String utcTime = sdf.format(datetime); 	 
	    return utcTime; 
	}
	/**
	 * @param datetime
	 * @return
	 */
	public static String getUTCdatetime(String datetime) 
	{ 
	    final SimpleDateFormat sdf = new SimpleDateFormat(PORTAL_DATE_FORMAT); 
	    sdf.setTimeZone(TimeZone.getTimeZone("UTC")); 
	    final String utcTime = sdf.format(datetime); 
	    
	    return utcTime; 
	}
	 
	/**
	 * @param StrDate
	 * @return
	 */
	public static Date stringDateToDate(String StrDate) 
	{ 
	    Date dateToReturn = null; 
	    SimpleDateFormat dateFormat = new SimpleDateFormat(NEW_PORTAL_DATE_FORMAT);	 
	    try 
	    { 
	        dateToReturn = (Date)dateFormat.parse(StrDate); 
	    } 
	    catch (ParseException e) 
	    { 
	        e.printStackTrace(); 
	    } 
	 
	    return dateToReturn; 
	} 
	/**
	 * @param StrDate
	 * @param dateTimeFormat
	 * @return
	 */
	public static Date stringDateToDate(String StrDate, String dateTimeFormat) 
	{ 
	    Date dateToReturn = null; 
	    SimpleDateFormat dateFormat = new SimpleDateFormat(dateTimeFormat); 
	 
	    try 
	    { 
	        dateToReturn = (Date)dateFormat.parse(StrDate); 
	    } 
	    catch (ParseException e) 
	    { 
	        e.printStackTrace(); 
	    } 
	 
	    return dateToReturn; 
	} 
	/**
	 * @param StrDate
	 * @return
	 */
	public static Date stringDateToISODate(String StrDate) 
	{ 
	    Date dateToReturn = null; 
	    try 
	    { 
	    	SimpleDateFormat sdf = new SimpleDateFormat(NEW_PORTAL_DATE_FORMAT); 
	        dateToReturn = (Date)sdf.parse(StrDate); 
	    } 
	    catch (ParseException e) 
	    { 
	        e.printStackTrace(); 
	    } 
	 
	    return dateToReturn; 
	} 
	/**
	 * @param latitude
	 * @param longitude
	 * @return
	 */
	public static String getOffsetByLatLong(String latitude, String longitude)
	{
		String offset= "0";
		StringBuffer sb = new StringBuffer();
		String uri =EARTH_TOOLS_URL+latitude+"/"+longitude;
		try 
		{	
			URL earthURI = new URL(uri);
			BufferedReader in = new BufferedReader(new InputStreamReader(
					earthURI.openStream()));
			String inputLine;
			
			while ((inputLine = in.readLine()) != null) sb.append(inputLine);
			in.close();
			
			DocumentBuilder db = DocumentBuilderFactory.newInstance().newDocumentBuilder();
			InputSource is = new InputSource();
			is.setCharacterStream(new StringReader(sb.toString()));

			Document doc = db.parse(is);	
			org.w3c.dom.NodeList nList = doc.getElementsByTagName(TIME_ZONE_NODE);
			
			if(nList != null)
			{
				for (int temp = 0; temp < nList.getLength(); temp++)
				{
					Node nNode = nList.item(temp);					
					if (nNode.getNodeType() == Node.ELEMENT_NODE)
					{	 
						org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
						org.w3c.dom.NodeList offsetList = eElement.getElementsByTagName(OFFSET_NODE);						
						org.w3c.dom.Element offsetElement = (org.w3c.dom.Element) offsetList.item(0);
						offset= getCharacterDataFromElement(offsetElement);	
					}
				}
			}			
		}
		catch (Exception exp) {
			Logger.error("CommonUtils.getTimeZoneByLatLong : Error ocurred @ :", CommonUtils.class, exp );
		}
		return offset;
		
	}
	/**
	 * @param latitude
	 * @param longitude
	 * @param zuluTime
	 * @param inputDateFormat
	 * @return
	 */
	public static String getTimeZoneByLatLong(String latitude, String longitude, String zuluTime, String inputDateFormat)
	{						
		String	offset = getOffsetByLatLong( latitude, longitude );		
		if( offset!=null&& offset!="" ) offset = getLocalTime( offset,zuluTime, inputDateFormat );
		
		return getOffsetByLatLong( latitude, longitude );	
	}
	/**
	 * @param offset
	 * @param zuluTime
	 * @param inputDateFormat
	 * @return
	 */
	public static String getLocalTime(String offset, String zuluTime, String inputDateFormat)
	{
		String localTime="";
		try 
		{
			boolean decimal= false;	
			DateFormat formatter = new SimpleDateFormat(inputDateFormat);			
			Date zuluDate =  formatter.parse(zuluTime);
			
			if( !inputDateFormat.equals(NEW_PORTAL_DATE_FORMAT))formatter = new SimpleDateFormat(NEW_PORTAL_DATE_FORMAT);
			
			if(offset!=null )
			{ 
				if(offset.trim().indexOf(".")>-1)			
				{
					offset = offset.substring(0, offset.indexOf("."));
					decimal=true;
				}
				zuluDate.setHours(zuluDate.getHours()+Integer.parseInt(offset)) ;
				if(Integer.valueOf(offset).intValue()>0)
				{ 					
					if(decimal)zuluDate.setMinutes(zuluDate.getMinutes()+30);
				}
				else if(decimal)zuluDate.setMinutes(zuluDate.getMinutes()-30);
				
			}
			localTime = formatter.format( zuluDate );
		}
		catch (Exception exp) {
			Logger.error("CommonUtils.getLocalTime : Error ocurred @ :", RestTrackingJob.class, exp );
		}
		return localTime;
		
	}
	 /**
	 * @param element
	 * @return
	 */
	public static String getCharacterDataFromElement(org.w3c.dom.Element element)
	 {
		    Node child = element.getFirstChild();
		    if (child instanceof CharacterData) {
		      CharacterData cd = (CharacterData) child;
		      return cd.getData();
		    }
		    return "";
	 }	
	 /**
	 * @param tabList
	 * @return
	 */
	public static String parseJsonString( List<Tab> tabList )
	 {
		 String jsonString="";
		 if( tabList!=null && tabList.size()>0)
		 {
			 jsonString ="DELIM&#123;";
			 int tabSize = tabList.size();
			 for(Tab tab: tabList)
			 {				
				 jsonString+="&quot;"+tab.getName()+"&quot; : &#091;&#123;";
				 List<Legend> legendList = tab.getLegendList();
				 if( legendList!=null && legendList.size()>0)
				 {
					 int legendSize = legendList.size();
					 for(Legend legend :legendList)
					 {
						 jsonString+="&quot;"+legend.getName()+"&quot; : &#123;";
						 Map<String, String> attribMap = legend.getAttribMap();
						 int mapSize = attribMap.size();
						 for (Map.Entry<String, String> entry : attribMap.entrySet()) {
							   	    jsonString+="&quot;"+entry.getKey()+"&quot;:&quot;"+entry.getValue()+"&quot;";	
							   	    if( mapSize>1) jsonString+=",";
							   	    mapSize--;							   	 
							   	 
							}
						 jsonString+="&#125;";
						 if(legendSize>1) jsonString+=",";
						 legendSize--;
					 }
				 }
				 jsonString+="&#125;&#093;";
				 if(tabSize>1) jsonString+=",";
				 tabSize--;
				 
			 }
			 jsonString+="&#125;DELIM";
		 }
		return jsonString;
	 }
	 /**
	 * @param gender
	 * @return
	 */
	public static String getPersonalTitle(String gender)
	 {
		 String title ="Mr/Ms";
		 if( gender!=null && gender!="" )
		 {
			 if( gender.equalsIgnoreCase("male")) title ="Mr"; 
			 else if(gender.equalsIgnoreCase("female")) title ="Miss"; 
		 } 
		 return title;
	 }
	
	
}
