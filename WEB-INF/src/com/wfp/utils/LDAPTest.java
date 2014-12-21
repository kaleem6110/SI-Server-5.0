/**
 * 
 */
package com.wfp.utils;

import java.util.Hashtable;
import java.util.List;

import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;
import javax.naming.ldap.InitialLdapContext;
import javax.naming.ldap.LdapContext;
/**
 * @author kaleem.mohammed
 *
 */
public class LDAPTest implements IEPICConstants
{
	public static LdapContext getLDAPContextt() throws NamingException
	{
		
			 Hashtable props = new Hashtable();
		     props.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
		     props.put(Context.SECURITY_AUTHENTICATION, LDAP_SECURITY_AUTHENTICATION);
		     props.put(Context.PROVIDER_URL, "ldaps://ldap.globalepic.lu");
		     props.put(Context.SECURITY_PROTOCOL,"ssl");
		     props.put(Context.REFERRAL, "ignore");
		     props.put(Context.SECURITY_PRINCIPAL, "cn=sti-read,ou=ldapAccess,dc=emergency,dc=lu");
		     props.put(Context.SECURITY_CREDENTIALS, "Sti4Stas2Read?");

		     LdapContext context = new InitialLdapContext(props,null);
		   return context;
			
		
	}
	
 public static void main(String a[])
 {
	try{
		LdapContext context = getLDAPContextt(); System.out.println(context);
		 java.io.FileWriter writer = new  java.io.FileWriter("c:\\pakistan_users.csv");
		// Specify the attributes to return
		String returnedAtts[] = { PROPERTY_PRIMARY_MAIL,PROPERTY_CN, PROPERTY_SN, PROPERTY_UID, PROPERTY_TITLE,"userPassword" ,"l" };
		// Specify the search scope
		SearchControls searchCtls = new SearchControls();
		//searchCtls.setSearchScope(SearchControls.SUBTREE_SCOPE);
		searchCtls.setReturningAttributes(returnedAtts);
		// Search for objects using the filter
		 NamingEnumeration results=  LDAPUtils.getSearchResults(context , searchCtls, FILTER_LDAP_USERS, LDAP_BASE);
		 int count=0;

 	  		writer.append("USERID");
		    writer.append(',');
		    writer.append("FIRSTNAME");
		    writer.append(',');
		    writer.append("LASTNAME");
		    writer.append(',');
		    writer.append("LOCATION");
		    writer.append(',');
		    writer.append("EMAIL");
		    writer.append(',');
		    writer.append("JOBTITLE");
		    writer.append(',');
		    writer.append("IS ADMIN");
		    writer.append(',');
		    writer.append("PROFILES");
		    writer.append('\n'); 
		 while (results.hasMore()) {  
				SearchResult searchResult = (SearchResult) results.next(); 
				Attributes attributes = searchResult.getAttributes();
				Attribute attr = attributes.get(PROPERTY_UID);
			      // System.out.println( attr.get() );
			      List<String>  missionList = LDAPUtils.getAllMisisons4rUser(attr.get().toString() );
			      List<String>  profileList = LDAPUtils.getAllProfiles4rUser(attr.get().toString() ); System.out.println( "profileList "+profileList );
			      if(missionList!=null&& missionList.size()>0)
			      {
			    	  for(String mission:missionList)
			    	  {
			    		 if( mission.equalsIgnoreCase("Pakistan_support") )
			    		 {
			    			 if(profileList!=null&&profileList.size()>0&& ( profileList.indexOf("user")>=0 || profileList.indexOf("admin")>=0 ||profileList.indexOf("superadmin")>=0)  )
			    			 {
			    			 	writer.append(attr.get().toString());
				    		    writer.append(',');
				    		    writer.append(attributes.get(PROPERTY_CN).get().toString());
				    		    writer.append(',');
				    		    writer.append(attributes.get(PROPERTY_SN).get().toString() );
				    		    writer.append(','); 
				    		    writer.append(attributes.get("l")!=null?attributes.get("l").get().toString():"-");
				    		    writer.append(',');
				    		    writer.append(attributes.get(PROPERTY_PRIMARY_MAIL)!=null?attributes.get(PROPERTY_PRIMARY_MAIL).get().toString():"-");
				    		    writer.append(',');
				    		    writer.append(attributes.get(PROPERTY_TITLE)!=null?attributes.get(PROPERTY_TITLE).get().toString():"-");				    		   
				    		    writer.append(',');
				    		    writer.append(profileList.indexOf("admin")>=0?"Yes":"No" );
				    		    writer.append(','); String profileStr="";
				    		    for(String profile:profileList  ){profileStr+=profile+";";}
				    		    writer.append(profileStr);
				    		    writer.append('\n');count++;
			    			 }
			    		 }
			    			System.out.print(".");  
			    			
			    	  }
			    	 
			      }
				
			}  System.out.println("COMPLETE : Found "+count +" records ");
			 writer.flush();
			    writer.close();
		
	}catch(Exception e){ e.printStackTrace(); }
	}

}
