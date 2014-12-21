/**
 * 
 */
package com.wfp.renderer;

import java.rmi.RemoteException;
import java.util.Map;

import lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException;
import lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException;
import lu.hitec.pss.soap.sensor.client._15_x.LocationRange;
import lu.hitec.pss.soap.sensor.client._15_x.LocationValue;
import lu.hitec.pss.soap.sensor.client._15_x.RangeLimit;
import lu.hitec.pss.soap.sensor.client._15_x.SensorSrvClientPortBindingStub;
import lu.hitec.pss.soap.sensor.client._15_x.SubRangeType;
import lu.hitec.pss.soap.sensor.client._15_x.UnitId;
import lu.hitec.pss.soap.sensor.client._15_x.UnitType;

import org.apache.commons.lang.StringEscapeUtils;

import com.enterprisehorizons.magma.renderer.dashboard.BaseDashboardRenderer;
import com.wfp.jobs.SoapTrackingJob;
import com.wfp.security.form.LDAPUserBean;
import com.wfp.utils.EventServiceUtils;
import com.wfp.utils.IEPICConstants;
import com.wfp.utils.LDAPUtils;
import com.wfp.utils.SensorServiceUtils;

/**
 * @author kaleem.mohammed
 *
 */
public class StaffHistoricalRenderer extends BaseDashboardRenderer implements
		IEPICConstants {
	
	private static final String ROOT_NODE = "artifactdashboarddata";
	private static final String ELEMENT_ATTRIBUTES = "attributes";
	private static final String ELEMENT_ATTRIBUTE = "attribute";

	@Override
	protected String getRootNode() {
		return ROOT_NODE;
	}

	/* (non-Javadoc)
	 * @see com.enterprisehorizons.magma.renderer.BaseXMLTagRenderer#render(java.util.Map)
	 */
	@Override
	protected StringBuffer render(Map params) {
		System.out.println(" ####  START Staff HistoricalRenderer : ## "+ com.wfp.utils.CommonUtils.getUTCdatetimeAsString() );
		// TODO Auto-generated method stub
		StringBuffer buff = new StringBuffer();
		buff.append(XML_START_TAG + ELEMENT_ATTRIBUTES + XML_END_TAG);

		//headers
		//String[] headerNames = new String[]{"Name","Title","Device ID","Organization","Timestamp-GMT"};
		//Reading Parameters
		String userId = (String) params.get("userId");
		String deviceId = (String) params.get("deviceId");
		String mission = (String) params.get("mission");
		//Generating the token.
		String token = EventServiceUtils.getLDAPToken();
		//Creating the stub.
		SensorSrvClientPortBindingStub stub = SensorServiceUtils.getServiceLocatorStub();		
		try
		{
			System.out.println(" #### 1. userId:"+userId+" : deviceId" +deviceId +": mission :"+mission  +" : token :" +token );
			//UnitReport userReports[]= stub.getAllUsersReports( token , mission );

			RangeLimit rl = SensorServiceUtils.getRangeLimit(SoapTrackingJob.getStartDateTime(), SoapTrackingJob.getEndDateTime(),
					SubRangeType.CONTINUOUS_LATEST, 10000 ); 
			LocationRange locationRange = stub.getUnitLocationRange(token, 
					new UnitId( userId , UnitType.fromValue( UnitType._USER) ),mission, rl);
			if( locationRange!=null && locationRange.getVal()!=null && locationRange.getVal().length>0 )
			{
				LocationValue lv[] = locationRange.getVal();
				
				LDAPUserBean user = LDAPUtils.getLDAPUserBean( deviceId );
				for(LocationValue l : lv )
				{
					buff.append(XML_START_TAG);
					buff.append(ELEMENT_ATTRIBUTE);
					addAttribute( buff, "owner", StringEscapeUtils
							.escapeXml( user.getCn()+" " +user.getSn() ) );
					addAttribute( buff, "deviceId", StringEscapeUtils
							.escapeXml( deviceId ) );
					addAttribute( buff,"title", StringEscapeUtils.escapeXml( user.getTitle() ) );
					addAttribute( buff,"latitude", StringEscapeUtils.escapeXml( l.getLat()+"" ) );
					addAttribute( buff,"longitude", StringEscapeUtils.escapeXml( l.getLng()+"" ) );
					addAttribute( buff, "Organization", StringEscapeUtils
							.escapeXml(user.getOrganization() ) );
					addAttribute( buff, "time",StringEscapeUtils.escapeXml( com.wfp.utils.CommonUtils.formatDate( l.getTime().getTime()) ) );
					buff.append(XML_END_TAG_END);
				}				
			}	
			
		} catch (AuthorizationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (AuthenticationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (RemoteException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
		
		buff.append(XML_END_TAG_START + ELEMENT_ATTRIBUTES + XML_END_TAG);
		
		System.out.println(" ####  END Staff HistoricalRenderer : ## "+ com.wfp.utils.CommonUtils.getUTCdatetimeAsString() );
		return buff;
	}

}
