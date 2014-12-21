/**
 * 
 */
package com.wfp.utils;

import java.util.Hashtable;
import java.util.LinkedList;

import javax.naming.Context;
import javax.naming.NameNotFoundException;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;

import com.enterprisehorizons.util.Logger;

/**
 * @author kaleem.mohammed
 * 
 */
public class TestLDAP implements IEPICConstants{

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Hashtable<String, Object> env = new Hashtable<String, Object>();

		env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
		env.put(Context.PROVIDER_URL, "ldaps://ldap-dev.globalepic.lu:636/uid=rgnaga,ou=users,ou=people,dc=emergency,dc=lu");
		env.put(Context.SECURITY_AUTHENTICATION, "simple");
		env.put(Context.SECURITY_PRINCIPAL, "uid=rgnaga,ou=users,ou=people,dc=emergency,dc=lu");
		env.put(Context.SECURITY_CREDENTIALS, "123456");

		try {
			DirContext ctx = new InitialDirContext(env);
			System.out.println(ctx );

			ctx.close();
		} catch (NamingException e) {
			e.printStackTrace();
		}
	}
	

}
