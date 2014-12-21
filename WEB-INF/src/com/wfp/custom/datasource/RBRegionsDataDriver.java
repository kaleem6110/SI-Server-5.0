package com.wfp.custom.datasource;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import com.enterprisehorizons.exception.EHRuntimeException;
import com.enterprisehorizons.magma.datamashup.BaseGeoDataDriver;
import com.enterprisehorizons.magma.datamashup.IScriptableDataDriver;
import com.enterprisehorizons.magma.designtime.artifact.IScripter;
import com.enterprisehorizons.util.Logger;
import com.enterprisehorizons.util.StringUtils;
import com.spacetimeinsight.db.config.model.Rubberband;
import com.wfp.utils.IEPICConstants;
import com.wfp.utils.RBRegionsUtils;

/**
 * allows to retrieve information about sensor devices, and the location and/or
 * probe measurements which are known for them.
 * 
 * @author sti-user
 * 
 */
public class RBRegionsDataDriver extends BaseGeoDataDriver implements
		IScriptableDataDriver, IEPICConstants {

	private RBRegionsDataSource dataSource = null;
	// private Object dataList[][] = null;
	private IScripter scripter;
	private Object response = null;

	/*
	 * Constructor initializes datasource by invoking a local call to initialise
	 * method.
	 */
	public RBRegionsDataDriver(RBRegionsDataSource datasource) {
		super(datasource);
		this.dataSource = datasource;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.enterprisehorizons.magma.datamashup.IDataDriver#getData()
	 */
	@SuppressWarnings("unchecked")
	public List getData() {
		try { 
			List<Rubberband> rbRegions = null;
			//setCustomSearchCriteria();
			String[] allModules = dataSource.getModuleId() != null ? dataSource
					.getModuleId().split(",") : null;
					
					
			if (allModules != null) {
			
				rbRegions = new ArrayList<Rubberband>();
				for (String module : allModules) {
					System.out.println(" dataSource.getDomainId() :" +dataSource.getDomainId()+"module:"+module +" dataSource.getUserId(): "+dataSource.getUserId() + " : dataSource.getUserUniqueId():"+dataSource.getUserUniqueId());
					Rubberband[] rubberbandregions = RBRegionsUtils.getUserModulePreferences(dataSource.getDomainId(), dataSource.getLanguageId()
							, dataSource.getUserId(),dataSource.getUserUniqueId(), StringUtils
							.getLong(module));
					rbRegions.addAll(Arrays.asList(rubberbandregions));
				}
			}
			Rubberband dummyBand = new Rubberband();
			dummyBand.setCreatedBy("kmohammed");
			dummyBand.setCreatedDate(new Date() );
			dummyBand.setDescription("dummy Geofence");
			dummyBand.setLabel("Staff Tracking_DZ_IHC01");
			dummyBand.setName("Staff Tracking_DZ_IHC01");
			dummyBand.setId(0L);
			dummyBand.setListType("moduleList");
			dummyBand.setUserId(-1L);
			dummyBand.setValueXML("");
			
			
			
			return rbRegions;

		} catch (Exception exception) {

			Logger.error("Exception during webservice invokation ",
					"WebServiceDataDriver", exception);
			throw new EHRuntimeException(
					"Exception during webservice invokation "
							+ exception.getMessage(), exception);
		}

	}

	@Override
	public boolean supportsSearch() {
		// TODO Auto-generated method stub
		return true;
	}

	public IScripter getScripter() {
		return scripter;
	}

	public void setScripter(IScripter scripter) {
		this.scripter = scripter;
	}

	public Object getResponse() {
		return response;
	}

	public void setResponse(Object response) {
		this.response = response;
	}

	public static void main(String args[]) {

	}

}
