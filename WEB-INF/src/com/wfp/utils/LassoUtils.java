/**
 * 
 */
package com.wfp.utils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.ObjectMapper;


import com.enterprisehorizons.exception.EHRuntimeException;
import com.enterprisehorizons.magma.models.util.Coordinate;
import com.enterprisehorizons.magma.models.util.CoordinateUtils;
import com.enterprisehorizons.magma.server.util.SearchUtils;
import com.enterprisehorizons.util.CastorUtils;
import com.enterprisehorizons.util.Logger;
import com.spacetimeinsight.config.dashboard.model.Filtercriteria;
import com.spacetimeinsight.db.lasso.model.Lasso;
import com.spacetimeinsight.db.model.util.DataModelsCache;
import com.spacetimeinsight.filter.ICriteria;
import com.spacetimeinsight.filter.SimpleCriteria;
import com.spacetimeinsight.filter.ISimpleCriteria.EOperator;
import com.spacetimeinsight.renderer.viewer.LassoRenderer;
import com.spacetimeinsight.rubberbandregions.Rubberbandregion;
import com.spacetimeinsight.rubberbandregions.Rubberbandregions;
import com.spacetimeinsight.security.bean.UserBean;
import com.spacetimeinsight.services.lasso.LassoServices;
import com.wfp.db.platform.model.LassoTemplate;
import com.wfp.db.platform.model.MessageTemplate;
import com.wfp.offline.synchronize.ISynchronizationServiceConstants;
import com.wfp.synchronize.db.config.model.SynchronizationTrailLog;

import flex.messaging.FlexContext;
import flex.messaging.HttpFlexSession;
import com.spacetimeinsight.services.lasso.LassoServices;
/**
 * @author kaleem.mohammed
 *
 */
public class LassoUtils implements IEPICConstants {
	
	@SuppressWarnings("unchecked")
	public static List<Lasso> getAllLassos( )
	{  	Logger.info("START  getAllLassos", LassoUtils.class );
		LassoServices s = new LassoServices(); 
			s.getLassosByUserAndAllShared("", 123L);//userid, moduleId
		List<Lasso> lassoList = new ArrayList<Lasso>();
		DataModelsCache.getInstance().refresh(Lasso.class.getName());
		lassoList = DataModelsCache.getInstance().retrieve(Lasso.class.getName());
		Logger.info("END  getAllLassos" , LassoUtils.class );		
		return lassoList;
	}
	@SuppressWarnings("unchecked")
	public static List<LassoTemplate> getAllLassoTemplates( )
	{  	Logger.info("START  getAllLassoTemplates", LassoUtils.class );
			
		List<LassoTemplate> lassoList = new ArrayList<LassoTemplate>();
		DataModelsCache.getInstance().refresh(LassoTemplate.class.getName()); 
		lassoList = DataModelsCache.getInstance().retrieve(LassoTemplate.class.getName());
		Logger.info("END  getAllLassoTemplates" , LassoUtils.class );		
		return lassoList;
	}
	
	public static boolean deleteLassoTemplateByName( String name )
	{ Logger.info("START  deleteLassoTemplateByName:"+name , LassoUtils.class );
		boolean isDeleted=false;
		List<LassoTemplate> templateList = new ArrayList<LassoTemplate>();
		templateList = DataModelsCache.getInstance().retrieve(LassoTemplate.class.getName());
		if( templateList!=null && templateList.size()>0 && name!=null &name!="")
		{
			for( LassoTemplate t : templateList )
			{
				if( t.getName().equalsIgnoreCase( name ) )
				{
					isDeleted= t.deleteData();
				}
			}
		}Logger.info("END  deleteLassoTemplateByName:"+isDeleted , LassoUtils.class );		
		return isDeleted;		
	}
	public static boolean deleteLassoTemplate( String name )
	{ Logger.info("START  deleteLassoTemplateByName:"+name , LassoUtils.class );
		boolean isDeleted=false;
		LassoTemplate template = new LassoTemplate();
		Filtercriteria filtercriteria = (Filtercriteria) CastorUtils.unmarshalString( name, Filtercriteria.class);
		ICriteria criteria = SearchUtils.buildSearchCriteria("name",name, filtercriteria );		
		List list = template.searchData( criteria );
		if(list != null && list.size() > 0){
			template = (LassoTemplate) list.get(0);
			isDeleted=	template.deleteData();
		}
		Logger.info("END  deleteLassoTemplateByName:"+isDeleted , LassoUtils.class );		
		return isDeleted;		
	}
	public static LassoTemplate getLassoTemplateByName(String name )
	{
		LassoTemplate template = null;
		List<LassoTemplate> templateList =getAllLassoTemplates();		
		if( templateList!=null && templateList.size()>0 && name!=null &name!="")
		{
			for( LassoTemplate t : templateList )
			{
				if( t.getName().equalsIgnoreCase( name ) )
				{
					template=t;
				}
			}
		}
		return template;
	}
	public static boolean saveFenceMessage(LassoTemplate mt, String moduleId){
		LassoTemplate crud = new LassoTemplate();
		
		crud.setName(mt.getName());
		crud.setMessage( mt.getMessage());
		crud.setSubject(mt.getSubject());
		crud.setRecurrence( mt.getRecurrence() );
		crud.setInterval( mt.getInterval());
		//System.out.println("mt.getStartDateTime()"+mt.getStartDateTime()+"mt.getEndDateTime():"+mt.getEndDateTime()+":mt.getExclusionEmail()"+mt.getExclusionEmail() );
		
		crud.setStartDate( mt.getStartDate() );
		crud.setEndDate(mt.getEndDate());
		crud.setModifiedDate(CommonUtils.getUTCdatetimeAsDate() ); 
		crud.setOrganization( mt.getOrganization() );
		crud.setMission( mt.getMission() );
		crud.setLayers( mt.getLayers() );
		crud.setIncludeEmail( mt.getIncludeEmail());
		crud.setExcludeEmail( mt.getExcludeEmail() );
		long syncTypeId = ISynchronizationServiceConstants.SYNC_TYPE_ADD;
		boolean isInserted = false;
		if(mt.getId() > 0){
			crud.setId(mt.getId());
			syncTypeId = ISynchronizationServiceConstants.SYNC_TYPE_UPDATE;
			System.out.println(" updating.......");
			isInserted=crud.updateData();
		}else
		{
			crud.setCreatedDate(CommonUtils.getUTCdatetimeAsDate() );
			//System.out.println("b4 inserting  :"+mt.getId());
			 isInserted =  crud.insertData();
			}
		
		 ;
		//System.out.println(" isInserted : "+isInserted );
		if(isInserted){
			//HttpFlexSession httpFlexSession = (HttpFlexSession) FlexContext.getFlexSession();
			//if(httpFlexSession != null){
				//DataModelsCache.getInstance().refresh(LassoTemplate.class.getName());
				//UserBean userBean = (UserBean)httpFlexSession.getAttribute("stiUser");
				return true;
				//temporary comment
				/*return SynchronizationDBUtils.syncTraceLog(ISynchronizationServiceConstants.SYNC_DATA_TYPE_GEOFENCE_RULES,
						crud.getName(), syncTypeId,
						ISynchronizationServiceConstants.SYNC_STATUS_NEW, ServerUtils.getSystemServerName()+"_"+AdminConfigUtils.getHttpServerPort(), (long)userBean.getUserId(),
						userBean.getUserUniqueId(), StringUtils.getLong(moduleId));*/
			//}	
			
		}else {System.out.println("*** Exception");
			Logger.error("Failed to save the region.", LassoUtils.class );
			return false;
		}
	}
	public static  boolean isInDangerZone(Coordinate c , String lassoData )
	{
		String coordinateString="";
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			JsonNode rootNode = objectMapper.readTree(lassoData.getBytes());
			JsonNode idNode = rootNode.path("geometry");
			JsonNode ringsNode = idNode.path("rings");
			
			Iterator<JsonNode> elements = ringsNode.getElements();
			 
			while(elements.hasNext())
			{
			    JsonNode phone = elements.next();
			     String mercator=phone.toString().replace("],["," ").replace("[","").replace("]","");
			     String mArray[]= mercator.split(" ");
			    
			     for(String m: mArray)
			     {
			    	 String m1[]= m.split(",");
			    	 coordinateString+= Double.parseDouble( m1[1] )+","+ Double.parseDouble( m1[0] )+",0 " ;
			     }
			   }
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			Logger.error(" "+ e.getMessage() , LassoUtils.class );
		}// Logger.info(" coordinateString : "+coordinateString , LassoUtils.class );
		//System.out.println(coordinateString);
		Coordinate coordinates[] = CoordinateUtils.getCoordinates( coordinateString );
		//System.out.println( ":kaleem: "+coordinates.length );
		return CoordinateUtils.isInside(coordinates, c);
		
	}
	public static  boolean isInDangerZone(double latitude, double longitude, String lassoData )
	{
		Coordinate c = new Coordinate(latitude, longitude );
		return isInDangerZone( c, lassoData );		
	}
	
	
	@SuppressWarnings("unused")
	public static  boolean isInDangerZone(List<LassoTemplate> lassoTemplates,List<Lasso> lassoList,
			com.enterprisehorizons.magma.models.util.Coordinate coord, Date d , String deviceId, String layer ) {
		
		List<String> deviceMissionList = LDAPUtils.getLDAPUserDtlsMap().get(deviceId).getAuthorizedGroupsList();
		
		if(lassoTemplates != null && lassoTemplates.size()>0 )
		{
			for (LassoTemplate t : lassoTemplates )
			{
				//if( d.after( t.getStartDate()) && d.before( t.getEndDate() ))
				//{
					if( lassoList!=null && lassoList.size() >0 )
					{	for( Lasso l : lassoList )
						{
							if( l.getName().equalsIgnoreCase( t.getName() ) )
							{	
								//Logger.info(" Lasso : name :"+ l.getName() +": "+ l.getLassoData(), LassoUtils.class );
								if( deviceMissionList!=null&& deviceMissionList.size()>0 )
								{
									for( String mission: deviceMissionList )
									{
										if(  t.getStartDate().before( d) && t.getEndDate().after( d )
												/*&& t.getLayers().indexOf( layer )>=0 */ )
										{
											if( isInDangerZone( coord, l.getLassoData() )) {
												return true;
											}
										}
									}
									
								}
								
							}
						}
					}else Logger.info(" lassoList is empty or null", LassoUtils.class );					
				//}
			}
		}//else Logger.info(" Lassotemplate is empty or null", LassoUtils.class );
		return false;
	}
	public static void main( String a[])
	{	
		Coordinate coord = new Coordinate(24.9077,55.081985 );
		System.out.println(isInDangerZone( coord, "{\"geometry\":{\"rings\":[[[55.0701922235115,24.898905186089202],[55.06590068908768,24.91898960047178],[55.089761620484126,24.921324785285307],[55.0967997369392,24.897659533360493],[55.070020562134545,24.898905186089202],[55.0701922235115,24.898905186089202]]],\"spatialReference\":{\"wkid\":4326}},\"symbol\":{\"color\":[0,88,248,64],\"outline\":{\"color\":[0,88,248,255],\"width\":1.5,\"type\":\"esriSLS\",\"style\":\"esriSLSSolid\"},\"type\":\"esriSFS\",\"style\":\"esriSFSSolid\"}}" )); 
	}

}
