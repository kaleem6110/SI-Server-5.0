package com.wfp.utils;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

import com.enterprisehorizons.util.Logger;
import com.enterprisehorizons.util.StringUtils;

public class ValidateCertificateCall {

	public static String callSecureURI() {
		//System.setProperty("javax.net.debug", "SSL,handshake");
		String uri = WFPConfigUtils.getWFPConfigValue("restgps");
		//System.out.println("1uri:"+uri );
		if(StringUtils.isNull(uri)){
			uri = "http://middleware-qa.service.emergency.lu/sensorservice/out/rest/loc";
		}
		//System.out.println("uri:"+uri );
		/*System.setProperty("sun.security.ssl.allowUnsafeRenegotiation", "true");
		System.setProperty("javax.net.debug", "all");
		
		TrustManager[] trustAllCerts = new TrustManager[] { new X509TrustManager() {
			public java.security.cert.X509Certificate[] getAcceptedIssuers() {
				return null;
			}

			public void checkClientTrusted(
					java.security.cert.X509Certificate[] certs, String authType) {
			}

			public void checkServerTrusted(
					java.security.cert.X509Certificate[] certs, String authType) {
			}
		} };

		// Install the all-trusting trust manager

		try {
			SSLContext sc = SSLContext.getInstance("SSL");
			sc.init(null, trustAllCerts, new java.security.SecureRandom());
			HttpsURLConnection
					.setDefaultSSLSocketFactory(sc.getSocketFactory());
		} catch (Exception e) {
		}*/

		// Now you can access an https URL without having the certificate in the
		// truststore
		StringBuffer sb = new StringBuffer();
		try {
			
			URL hitechURI = new URL(uri);

			BufferedReader in = new BufferedReader(new InputStreamReader(
					hitechURI.openStream()));

			String inputLine;

			while ((inputLine = in.readLine()) != null){
				sb.append(inputLine);
				//System.out.println(inputLine);
			}
				

			in.close();

		} catch (MalformedURLException e) {
			Logger.error("Error ocurred ", ValidateCertificateCall.class, e);
		} catch (Exception exp) {
			Logger.error("Error ocurred ", ValidateCertificateCall.class, exp);
		}
		return sb.toString();
	}

	public static void main(String st[]) {
		
		// System.setProperty("java.security.debug", "all");
		// System
		// .setProperty("javax.net.ssl.trustStore",
		// "C:\\Program
		// Files\\SpaceTimeAwarenessServer\\jre\\lib\\security\\cacerts");PKCS
		// #12
		/*
		 * System.setProperty("javax.net.ssl.trustStore", "C:\\Program Files
		 * (x86)\\STAD\\jre\\bin\\stitruststore");
		 * System.setProperty("javax.net.ssl.trustStorePassword", "changeit");
		 * System.setProperty("javax.net.ssl.keyStoreType", "jks");
		 * System.setProperty("javax.net.ssl.keyStore", "mykey.p12");
		 * System.setProperty("javax.net.ssl.keyStorePassword", "sti");
		 */

		// System.setProperty("javax.net.ssl.keyStoreType", "jks");
		// System.setProperty("javax.net.ssl.keyStore",
		// "C:\\Program Files (x86)\\STAD\\jre\\bin\\stitruststore");
		// System.setProperty("javax.net.ssl.keyStorePassword", "changeit");
		
		//url = "http://middleware.service.emergency.lu/sensorservice/out/soap/SensorSrvClient?wsdl";
		callSecureURI();

		// System.out.println(URLConnectionUtils.readString(url, null, null));
	}

}
