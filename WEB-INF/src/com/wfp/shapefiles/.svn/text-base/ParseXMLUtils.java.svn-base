/**
 * 
 */
package com.wfp.shapefiles;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Vector;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import org.jdom.Element;

import com.enterprisehorizons.magma.server.admin.AdminConfigUtils;
import com.enterprisehorizons.util.FileUtils;
import com.enterprisehorizons.util.Logger;
import com.enterprisehorizons.util.StringUtils;
import com.enterprisehorizons.util.XMLUtils;
import com.spacetimeinsight.config.scheduler.Parameters;
import com.spacetimeinsight.magma.job.CustomJobTask;
import com.spacetimeinsight.magma.job.URLExtractorHandler;
import com.spacetimeinsight.magma.job.URLExtractorJob;

import flex.messaging.io.ArrayList;

/**
 * @author aditya.velala
 * 
 */
public class ParseXMLUtils implements CustomJobTask, IConstants {

	private static int URL_CONNECTION_TIMEOUT = 5;
	/**
	 * 
	 */
	public ParseXMLUtils() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		getShapefileContent(getAllFeatureUrls());
		//System.out.println();
	}
	
	@SuppressWarnings("unchecked")
	public static void getShapefileContent(List<String> featureNameList){
		try {
			Vector vecLinks = new Vector();
			ExecutorService threadExecutor = Executors
					.newFixedThreadPool(featureNameList.size());
			URLExtractorHandler urlExtractorHandler = null;
			String distDir = "E:\\stas\\data\\epic\\shapefiles\\";
			FileUtils.createDirectory(distDir);
			for (int i = 0; i < featureNameList.size(); i++) {
				//System.out.println(url);
				/*urlExtractorHandler = new URLExtractorHandler(url,
						null, null, featureNameList.get(i)+".zip", distDir,
						true, false,
						true,false);*/
				vecLinks.add(urlExtractorHandler);
				threadExecutor.submit(urlExtractorHandler);
			}

			threadExecutor.shutdown(); // shutdown worker threads

			long timeout = URL_CONNECTION_TIMEOUT;
			
			String urlTimeOut = AdminConfigUtils.getURLTimeOut();
			
			if(!StringUtils.isNull(urlTimeOut)){
				try{
					timeout = Long.valueOf(urlTimeOut);							
				}catch(Exception e){
					timeout = URL_CONNECTION_TIMEOUT;
				}
			}
			
			
			threadExecutor.awaitTermination(timeout,
			TimeUnit.SECONDS);

			for (int i = 0; i < featureNameList.size(); i++) {
				if (vecLinks.size() > 0) {
					int isDownloadSuccess = ((URLExtractorHandler) vecLinks
							.get(i)).getExecutionStatus();
					//if (isDownloadSuccess != 2)
						//isURLExtractionSuccess = false;

				}
			}
		} catch (Exception exp) {
			Logger.error("Error while invoking URLExtractor  ",
					URLExtractorJob.class);
			//isURLExtractionSuccess = false;
		}
	}

	public static String getResponse() {

		StringBuffer sb = new StringBuffer();
		try {

			URL hitechURI = new URL(URL_GEPITHACA);

			BufferedReader in = new BufferedReader(new InputStreamReader(
					hitechURI.openStream()));

			String inputLine;

			while ((inputLine = in.readLine()) != null) {
				sb.append(inputLine);
				// System.out.println(inputLine);
			}

			in.close();

		} catch (MalformedURLException e) {
			Logger.error("Error ocurred ", ParseXMLUtils.class, e);
		} catch (Exception exp) {
			Logger.error("Error ocurred ", ParseXMLUtils.class, exp);
		}
		return sb.toString();
	}

	public static List<Element> getFeatureTypeElements() {
		String xmlString = getResponse();
		Element rootNode = null;

		if (StringUtils.isNull(xmlString)) {
			return null;
		}
		rootNode = XMLUtils.getRootNode(xmlString, true);

		return XMLUtils.evaluate(rootNode, PARAM_EXP);
	}
	
	public static List<String> getAllFeatureUrls(){
		List<Element> featureList =  getFeatureTypeElements();
		List<String> featureNamesList = null;
		if(featureList != null){
			featureNamesList = new ArrayList();
			for(Element element:featureList){
				List<Element> childElementList =  element.getChildren();
				for(Element childElemnt:childElementList){
					if("Name".equalsIgnoreCase(childElemnt.getName())){
						featureNamesList.add(childElemnt.getValue());
					}					
				}				
			}
		}
		
		return featureNamesList;
	}

	public boolean executeCustomTask(Parameters parameters) {
		getShapefileContent(getAllFeatureUrls());
		return true;
	}

}
