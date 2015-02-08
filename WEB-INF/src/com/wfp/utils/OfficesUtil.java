/**
 * 
 */
package com.wfp.utils;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.JSONObject;

import com.wfp.beans.ElectricalDevice;
import com.wfp.beans.WFPOffices;

/**
 * @author kaleem.mohammed
 *
 */
public class OfficesUtil implements IEPICConstants {
	
	public static void main(String[] a)
	{
		
		ObjectMapper mapper = new ObjectMapper();
		//mapper.
	      try
	      {
	    	  URL url = new URL( "http://geonode.wfp.org/geoserver/wfs?srsName=EPSG:4326&typename=geonode:wld_poi_facilities_wfp&outputFormat=json&version=1.0.0&service=WFS&request=GetFeature" );
	      	  URLConnection conn = url.openConnection();
	      	
	      	WFPOffices  officeList =  mapper.readValue(conn.getInputStream(), WFPOffices.class);
	      	System.out.println(officeList.getFeatures()[0].getGeometry().getCoordinates()[0] );
	      } catch (JsonGenerationException e)
	      {
	         e.printStackTrace();
	      } catch (JsonMappingException e)
	      {
	         e.printStackTrace();
	      } catch (IOException e)
	      {
	         e.printStackTrace();
	      }
	}

}
