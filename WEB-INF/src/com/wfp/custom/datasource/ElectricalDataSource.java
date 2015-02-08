/**
 * 
 */
package com.wfp.custom.datasource;

import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.wfp.beans.ElectricalDevice;
import com.wfp.beans.ElectricalItem;
import com.wfp.beans.ElectricalLocation;
import com.wfp.utils.CommonUtils;
import com.wfp.utils.IEPICConstants;

/**
 * @author kaleem.mohammed
 *
 */
public class ElectricalDataSource {
	
	public static List<ElectricalLocation> getElectricalLocations() {
		List<ElectricalLocation> list = new ArrayList<ElectricalLocation>();
	    try 
	    {
	 
	    	Document doc = getDocument( IEPICConstants.ELECTRICAL_URL_1 );
	    	Document doc2 = getDocument( IEPICConstants.ELECTRICAL_URL_2 );
			
			NamedNodeMap map = doc.getElementsByTagName("location").item(0).getAttributes();
			
			ElectricalLocation location = new ElectricalLocation();
			
			location.setName(  map.getNamedItem("name" ).getTextContent() );
			location.setTimezone( map.getNamedItem("timezone").getTextContent() );
			
	        List<ElectricalDevice> dList = new ArrayList<ElectricalDevice>();
	        dList.add( getElectrical( doc.getElementsByTagName("device"), location ).get(0) ); 
	        dList.add ( getElectrical(doc2.getElementsByTagName("device") , location ).get(0) );
	        
	        location.setDeviceList( dList );
	        list.add( location );
	        
			System.out.println("----------------------------" +location.getDeviceList().size());
			
	
	    } catch (Exception e) {
		e.printStackTrace();
	    }
	    return list;
	  }
	private static Document getDocument( String uri ) throws IOException, ParserConfigurationException, SAXException 
	{
		URL url = new URL( uri );
    	URLConnection conn = url.openConnection();

    	DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
    	DocumentBuilder builder = factory.newDocumentBuilder();
    	Document doc = builder.parse(conn.getInputStream());
	
		doc.getDocumentElement().normalize();
		return doc;
	}

	private static List<ElectricalDevice> getElectrical(NodeList nList, ElectricalLocation location) {
		// TODO Auto-generated method stub
		List<ElectricalDevice> deviceList = new ArrayList<ElectricalDevice>();
		for (int temp = 0; temp < nList.getLength(); temp++)
		{
			Node nNode = nList.item(temp);
			ElectricalDevice device = new ElectricalDevice();
			System.out.println("\nCurrent Element :" + nNode.getNodeName());
	 
			if (nNode.getNodeType() == Node.ELEMENT_NODE) 
			{
				Element eElement = (Element) nNode;
	 			device.setDeviceName(  eElement.getAttribute("name") );
				device.setCoordinates( eElement.getAttribute("coordinates") );
				device.setIpAddress( eElement.getAttribute("ipaddress") );
				device.setUpdated( CommonUtils.parseDate( eElement.getAttribute("updated"), IEPICConstants.NEW_PORTAL_DATE_FORMAT )); 
					
				NodeList itemNodeList = eElement.getElementsByTagName("item");
				List<ElectricalItem> itemList = new ArrayList<ElectricalItem>();
				
				for( int i=0;i<itemNodeList.getLength(); i++ )
				{
					   Node itemNode = itemNodeList.item( i );
					   if (itemNode.getNodeType() == Node.ELEMENT_NODE) 
					   {	 
							Element e = (Element) itemNode;
							ElectricalItem item = new ElectricalItem();
							item.setSocket(e.getAttribute("socket")  );
							item.setName( e.getAttribute("name"));
							item.setValue( e.getAttribute("value") );
							item.setMeasure( e.getAttribute( "measure"));
							itemList.add( item );							
					   }
				 }
				
				device.setItemList( itemList );
				
				deviceList.add( device );
	 
			}
		}
		return deviceList;
	}
	public static void main(String a[]){
		
		System.out.println(getElectricalLocations().size() ) ;
	}

}
