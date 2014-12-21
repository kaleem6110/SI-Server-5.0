package com.spacetimeinsght.webservice.ssl.factory;



import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.KeyStore;
import java.security.SecureRandom;
import java.util.Hashtable;

import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import org.apache.axis.components.net.JSSESocketFactory;
import org.apache.axis.components.net.SecureSocketFactory;

import com.spacetimeinsight.webservice.ssl.EasyX509TrustManager;


/**
 * 	Custom SSL socket factory to use integrated keystore
 */

public class CertSSLSocketFactory extends JSSESocketFactory implements
		SecureSocketFactory {

    private SSLContext sslcontext = null;
	
	/**
	 * Constructor MyCustomSSLSocketFactory
	 * 
	 * @param attributes
	 */
	@SuppressWarnings("unchecked")
	public CertSSLSocketFactory(Hashtable attributes) {
		super(attributes);
	}

	/**
	 * Read the keystore, init the SSL socket factory
	 * 
	 * This overrides the parent class to provide our SocketFactory
	 * implementation.
	 * 
	 * @throws IOException
	 */
	protected void initFactory() throws IOException {

		try {
			SSLContext context = getSSLContext();
			sslFactory = context.getSocketFactory();
		} catch (Exception e) {
			if (e instanceof IOException) {
				throw (IOException) e;
			}
			throw new IOException(e.getMessage());
		}
	}

	private SSLContext getSSLContext() {
        if (this.sslcontext == null) {
            this.sslcontext = createSSLContext();
        }

        return this.sslcontext;
    }

	
	 private SSLContext createSSLContext(){
		  File pKeyFile = new File("C:\\Users\\sti-user\\workspace\\test\\src\\STI_clientMiddleware.p12");
		  String pKeyPassword = "lJaV8hP2eU2xaM3e6Rea";
		 try{ 
		  KeyManagerFactory keyManagerFactory = KeyManagerFactory.getInstance("SunX509");
		  KeyStore keyStore = KeyStore.getInstance("PKCS12");

		  InputStream keyInput = new FileInputStream(pKeyFile);
		  keyStore.load(keyInput, pKeyPassword.toCharArray());
		  keyInput.close();

		  keyManagerFactory.init(keyStore, pKeyPassword.toCharArray());
		  
		  TrustManager[] trustAllCerts = new TrustManager[] { (X509TrustManager) new EasyX509TrustManager(keyStore)};

		  SSLContext context = SSLContext.getInstance("SSL");
		  context.init(keyManagerFactory.getKeyManagers(), trustAllCerts, new SecureRandom());
		  return context;
		 }catch(Exception e){
			 e.printStackTrace();
		 }
		  
	return null;
	 }
	 

}