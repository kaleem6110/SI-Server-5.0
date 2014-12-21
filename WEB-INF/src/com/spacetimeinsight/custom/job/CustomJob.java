package com.spacetimeinsight.custom.job;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.KeyManagementException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;

import com.spacetimeinsight.config.scheduler.Parameters;
import com.spacetimeinsight.magma.job.CustomJobTask;
import com.wfp.utils.WFPConfigUtils;





public class CustomJob implements CustomJobTask{

	
	public static void main(String args[]){
		//getEmergencySpotDtls();
	}

	public boolean executeCustomTask(Parameters arg0) {
		callSecureURI();
		return true;
	}
	
	public static String callSecureURI() {
		System.setProperty("javax.net.debug", "SSL,handshake");
		String uri = WFPConfigUtils.getWFPConfigValue("restgps");
		
		uri = "https://middleware.service.emergency.lu/sensorservice/out/rest/loc";
			
		System.setProperty("sun.security.ssl.allowUnsafeRenegotiation", "true");
		System.setProperty("javax.net.debug", "all");
		
		KeyStore keyStore = null;
		try {
			keyStore = KeyStore.getInstance("jks");
		} catch (KeyStoreException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		}
	       try {
			keyStore.load(new FileInputStream(new File("C:\\openssl\\bin\\my_key_trust.jks")), 
			             new String("changeit").toCharArray());
		} catch (NoSuchAlgorithmException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		} catch (CertificateException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		} catch (FileNotFoundException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		} catch (IOException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		}
	        TrustManagerFactory trustFactory = null;
			try {
				trustFactory = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
			} catch (NoSuchAlgorithmException e2) {
				// TODO Auto-generated catch block
				e2.printStackTrace();
			}
	        try {
				trustFactory.init(keyStore);
			} catch (KeyStoreException e2) {
				// TODO Auto-generated catch block
				e2.printStackTrace();
			}
	        //SSLContext context = SSLContext.getInstance("SSL");
	        SSLContext context = null;
			try {
				context = SSLContext.getInstance("SSLv3");
			} catch (NoSuchAlgorithmException e2) {
				// TODO Auto-generated catch block
				e2.printStackTrace();
			}
	        try {
				context.init(null, trustFactory.getTrustManagers(), null);
			} catch (KeyManagementException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			
		try {
			//SSLContext sc = SSLContext.getInstance("SSL");
			//context.init(null, trustAllCerts, new java.security.SecureRandom());
			HttpsURLConnection
					.setDefaultSSLSocketFactory(context.getSocketFactory());
		} catch (Exception e) {
		}

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
			e.printStackTrace();
		} catch (Exception exp) {
			exp.printStackTrace();
		}
		return sb.toString();
	}
}
