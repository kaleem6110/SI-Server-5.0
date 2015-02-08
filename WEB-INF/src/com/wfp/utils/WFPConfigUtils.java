package com.wfp.utils;

import com.enterprisehorizons.magma.server.admin.AdminConfigUtils;
import com.enterprisehorizons.magma.server.util.ServerUtils;
import com.enterprisehorizons.util.Logger;
import com.enterprisehorizons.util.StringUtils;
import com.spacetimeinsight.db.model.util.SecurityDBUtils;
import com.spacetimeinsight.magma.server.security.util.CryptoUtils;
import com.spacetimeinsight.stas.config.GenericConfigurationManager;
/**
 * Configuration Utility class for WFP.
 * @author sti-user
 *
 */
public class WFPConfigUtils implements IEPICConstants{

	public static final String TYPE_UNWFP = "UN-WFP";
	/**
	 * Provide the config property name whihc returns the value
	 * @param configName
	 * @return
	 */
	public static String getConfigValue(String configName) { 
		return GenericConfigurationManager.getInstance().getProperty( LDAP, configName);
	}

	/**
	 * Return LDAP Context Factory
	 * @return
	 */
	public static String getLDAPContextFactory() {
		return getConfigValue(LDAP_CONTEXT_FACTORY);
	}

	public static String getWFPConfigValue(String configName) {
		return GenericConfigurationManager.getInstance().getProperty(TYPE_UNWFP, configName);
	}


	/**
	 * returns LDAP Server Name
	 * @return
	 */
	public static String getLDAPServerName() {
		return getConfigValue(LDAP_SERVER_NAME);
	}

	/**
	 * returns the LDAP Server Port
	 * @return
	 */
	public static String getLDAPServerPort() {
		return getConfigValue(LDAP_SERVER_PORT);
	}

	/**
	 * returns the LDAP domain Name
	 * @return
	 */
	public static String getLDAPDomainName() {
		return getConfigValue(LDAP_DOMAIN_NAME);
	}

	/**
	 * returns the LDAP Super User Login
	 * @return
	 */

	public static String getLDAPSuperUserLogin() {
		return getConfigValue(LDAP_USER_LOGIN);
	}

	/**
	 * Returns the LDAP Super user Password
	 * @return
	 */
	public static String getLDAPSuperUserPassword() {
		if (!StringUtils.isNull(getConfigValue(LDAP_USER_PWD))) {
			return SecurityDBUtils.getDecreptedPassword(getConfigValue(LDAP_USER_PWD));
		}

		return null;
	}

	private static String terminalServerName =  ServerUtils.getSystemServerName()+"_"+AdminConfigUtils.getHttpServerPort();



	public static String getCentralServerUrl() {
		return GenericConfigurationManager.getInstance().getProperty(TYPE_UNWFP, "centralServer");
	}

	public static String getRefreshInterval() {
		return GenericConfigurationManager.getInstance().getProperty(TYPE_UNWFP, "refreshInterval");
	}

	public static String getFailOverJobInterval() {
		return GenericConfigurationManager.getInstance().getProperty(TYPE_UNWFP, "failOverInterval");
	}

	public static String getLoginId() {
		return GenericConfigurationManager.getInstance().getProperty(TYPE_UNWFP, "loginId");
	}

	public static String getEncryptedPassword() {
		return GenericConfigurationManager.getInstance().getProperty(TYPE_UNWFP, "encryptedPassword");
	}

	public static boolean isCentralServer() {
		return Boolean.valueOf(GenericConfigurationManager.getInstance().getProperty(TYPE_UNWFP, "isCentralServer")).booleanValue();
	}

	public static boolean isRequestValid(String encryptedLoginId, String encryptedPassword) {
		try {
			String requestorLoginId = CryptoUtils.decrypt(null, encryptedLoginId);
			return (requestorLoginId.equals(getLoginId()) && encryptedPassword.equals(getEncryptedPassword()));
		}catch(Exception ex){
			Logger.error("Error while setting isCentralServer value", WFPConfigUtils.class, ex);
		}

		return false;
	}


}
