/**
 * 
 */
package com.wfp.utils;

import java.rmi.RemoteException;
import java.util.List;

import lu.hitec.pss.soap.ds.out._15_x.AuthenticationException;
import lu.hitec.pss.soap.ds.out._15_x.AuthorizationException;
import lu.hitec.pss.soap.ds.out._15_x.CrudEnum;
import lu.hitec.pss.soap.ds.out._15_x.PssuFence;
import lu.hitec.pss.soap.ds.out._15_x.ResourceNotFoundException;

import com.spacetimeinsight.db.config.model.Rubberband;

/**
 * @author kaleem.mohammed
 *
 */
public class GeofenceLDAPServiceImpl extends LDAPWSUtils{
	
	
	
   public List<Rubberband> getAllGeofencesFromLDAP()
   {
	   List<Rubberband> rbRegions = null;
	   String token = EventServiceUtils.getLDAPToken();
	   List<String> missionList = LDAPUtils.getAllMissions();
	   
	   if( missionList!=null && missionList.size()>0 )
	   {
		   for( String missionId: missionList )
		   {
			   try {
				   PssuFence[] fences=	getLDAPStub().getFencesAssignedToMissionForCrud( token, missionId, CrudEnum.fromValue(CrudEnum._READ ));
			} catch (AuthorizationException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (AuthenticationException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (ResourceNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (RemoteException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IllegalArgumentException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} 
		   }
	   }
	   
	   
	   return rbRegions;
   }
	
	
	
	

}
