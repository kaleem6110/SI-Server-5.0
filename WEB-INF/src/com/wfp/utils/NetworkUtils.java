/**
 * 
 */
package com.wfp.utils;

import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.JSONArray;
import org.json.JSONObject;
import org.python.modules.re;

import java.io.*;

import com.enterprisehorizons.magma.models.util.Coordinate;
import com.enterprisehorizons.magma.models.util.CoordinateUtils;
import com.wfp.beans.WFPOffices;
import com.wfp.beans.network.NetworkLink;

import java.util.*;

/**
 * @author kaleem.mohammed
 * 
 */
public class NetworkUtils {

	public static String ToGeographic(double mercatorX_lon, double mercatorY_lat)
	{
		//Map<String, String> map = new HashMap<String, String>();
	    if (Math.abs(mercatorX_lon) < 180 && Math.abs(mercatorY_lat) < 90)
	        return null;

	    if ((Math.abs(mercatorX_lon) > 20037508.3427892) || (Math.abs(mercatorY_lat) > 20037508.3427892))
	        return null;

	    double x = mercatorX_lon;
	    double y = mercatorY_lat;
	    double num3 = x / 6378137.0;
	    double num4 = num3 * 57.295779513082323;
	    double num5 = Math.floor((num4 + 180.0) / 360.0);
	    double num6 = num4 - (num5 * 360.0);
	    double num7 = 1.5707963267948966 - (2.0 * Math.atan(Math.exp((-1.0 * y) / 6378137.0)));
	    mercatorX_lon = num6;
	    mercatorY_lat = num7 * 57.295779513082323;
	   // System.out.println(mercatorY_lat + ":"+ mercatorX_lon );
	    //.put( );
	    
	    return ""+mercatorY_lat+ ","+ mercatorX_lon+",0 ";
	}

	
	public static void main(String[] a) 
	{
		System.out.println( ToGeographic(8742828.975515354,1961759.5331169567 ) );
		//[[[8742828.975515354,1961759.5331169567],[8742901.232393634,1961759.5331169567],[8742901.232393634,1961698.323777919],[8742828.975515354,1961698.323777919],[8742828.975515354,1961759.5331169567]]]
		String s="{\"geometry\":{\"rings\":[[[8742828.975515354,1961759.5331169567],[8742901.232393634,1961759.5331169567],[8742901.232393634,1961698.323777919],[8742828.975515354,1961698.323777919],[8742828.975515354,1961759.5331169567]]],\"spatialReference\":{\"wkid\":102100,\"latestWkid\":3857}},\"symbol\":{\"color\":[0,255,0,153],\"outline\":{\"color\":[0,255,0,153],\"width\":1.5,\"type\":\"esriSLS\",\"style\":\"esriSLSSolid\"},\"type\":\"esriSFS\",\"style\":\"esriSFSSolid\"}}";
		Coordinate c = new Coordinate(17.3511049, 78.5384707);
		System.out.println(LassoUtils.isInDangerZone( c, s ));
		// getAllWFPNetworkLinks( "http://10.11.40.46:31231/getmarkerdata");
	}

	public static List<NetworkLink> getAllWFPNetworkLinks(String uri) 
	{
		ObjectMapper mapper = new ObjectMapper();
		try 
		{
			URL url = new URL(uri);
			URLConnection conn = url.openConnection();
			BufferedReader in = new BufferedReader(new InputStreamReader( conn.getInputStream(), "UTF-8"));
			String json = in.readLine();
			byte[] bytes = json.getBytes("UTF-8");
			in.close();
			Map<String, Map<String, List<NetworkLink>>> map = mapper.readValue( bytes, HashMap.class );
			String region = "", country = "";
			List<NetworkLink> responseList = new ArrayList<NetworkLink>();
			for (Map.Entry<String, Map<String, List<NetworkLink>>> entry : map.entrySet())
			{
				Map<String, List<NetworkLink>> innerMap = entry.getValue();
				region = entry.getKey();
				for (Map.Entry<String, List<NetworkLink>> innerEntry : innerMap.entrySet()) 
				{
					country = innerEntry.getKey();
					if (innerEntry.getValue() instanceof List) 
					{
						List<NetworkLink> networkList = innerEntry.getValue();
						for (int i = 0; i < networkList.size(); i++) 
						{
							Object obj = networkList.get(i);
							Map mapp = (LinkedHashMap<String, String>) obj;
							NetworkLink link = new NetworkLink();
							link.setLoc((String) mapp.get("loc"));
							link.setCountry(country);
							link.setIpmonitor_id((String) mapp.get("ipmonitor_id"));
							link.setLatitude((String) mapp.get("latitude"));
							link.setLongitude((String) mapp.get("longitude"));
							link.setRegion(region);
							link.setSw_business_line((String) mapp.get("sw_business_line"));
							link.setSw_managed_address((String) mapp.get("sw_managed_address"));
							responseList.add(link);
							System.out.println(link.getSw_business_line());

						}
					} else {
						System.out.println("else:"+innerEntry.getValue());
					}
				}
			}
			System.out.println("size:"+responseList.size());
			return responseList;

		} catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

}
