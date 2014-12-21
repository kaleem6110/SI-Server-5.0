/*
 * @(#) ClusteredDataDriver.java
 *
 * Copyright (c) Space Time Insight Inc.
 * 45680 Northport Loop East, Fremont, CA - 94538
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Space Time
 * Insight Inc and is solely for the use of Space Time Insight Inc personnel.
 * The contents contained within this document carry an explicit and implicit
 * understanding that no part of it will be circulated, quoted or reproduced for
 * distribution outside the Space Time Insight Inc without prior written
 * approval from an authorized officer of the Space Time Insight Inc.
 *
 */
package com.spacetimeinsight.datasource.custom;

import java.util.ArrayList;
import java.util.List;

import com.enterprisehorizons.magma.datamashup.BaseGeoDataDriver;
import com.enterprisehorizons.magma.models.util.Coordinate;
import com.enterprisehorizons.magma.nature.Camera;
import com.enterprisehorizons.util.StringUtils;
import com.tomgibara.cluster.gvm.dbl.DblClusters;
import com.tomgibara.cluster.gvm.dbl.DblListKeyer;
import com.tomgibara.cluster.gvm.dbl.DblResult;
import com.wfp.jobs.RestTrackingJob;
import com.wfp.security.form.DeviceBean;
import com.wfp.utils.IEPICConstants;

/**
 * @author jagadeesh.macherla
 * 
 */
public class ClusterDataDriver extends BaseGeoDataDriver {

	public ClusterDataDriver(ClusterDataSource datasource) {
		super(datasource);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.enterprisehorizons.magma.datamashup.IDataDriver#getData()
	 */
	@SuppressWarnings("unchecked")
	public List getData() {
		ClusterDataSource datasource = (ClusterDataSource) getDataSource();

		List<DeviceBean> artifactsList = (List) RestTrackingJob.getInstance()
				.getRestServiceList(IEPICConstants.KEY_VEHICLE);// Cache.retrieve(datasource.getCacheKey());
		int count = artifactsList == null ? 0 : artifactsList.size();
		DeviceBean geoArtifact = null;

		DblClusters<List<DeviceBean>> clusters = new DblClusters<List<DeviceBean>>(
				2, datasource.getMaxClusters() == 0 ? 10 : datasource
						.getMaxClusters());
		clusters.setKeyer(new DblListKeyer<DeviceBean>());
		double[] xs = new double[2];
		double m = 1;
		Camera camera = getCamera();
		Coordinate coord = null;
		for (int i = 0; i < count; i++) {
			geoArtifact = (DeviceBean) artifactsList.get(i);
			coord = new Coordinate(StringUtils.getDouble(geoArtifact
					.getLongitude()), StringUtils.getDouble(geoArtifact
					.getLatitude()));// Coordinates()[0];
			if (camera.contains(coord)) {
				xs[0] = coord.x;
				xs[1] = coord.y;
				m = Math.random(); // StringUtils.getDouble((String)
									// geoArtifact.getAttribute("time"));
				ArrayList<DeviceBean> list = new ArrayList<DeviceBean>();
				list.add(geoArtifact);
				clusters.add(m, xs, list);
			}
		}

		List<DblResult<List<DeviceBean>>> results = clusters.results();
		return results;
	}

	@SuppressWarnings("unchecked")
	public Object getDataElementValue(String dataElementName, Object dataRow) {
		if (dataRow != null && dataElementName != null) {
			if (dataRow instanceof DblResult) {
				DblResult<List<DeviceBean>> dataElement = ((DblResult<List<DeviceBean>>) dataRow);

				if ("coordinates".equals(dataElementName)) {
					double[] coords = dataElement.getCoords();
					return new Coordinate(coords[0], coords[1]);
				}
				if ("count".equals(dataElementName)) {
					return dataElement.getCount();
				}
			}
		}

		return null;
	}

}
