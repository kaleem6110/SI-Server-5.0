package com.wfp.jobs;

import java.util.Collections;
import java.util.Map;

import com.enterprisehorizons.magma.server.Session;
import com.enterprisehorizons.magma.server.SessionManager;
import com.spacetimeinsight.config.scheduler.Parameters;
import com.spacetimeinsight.magma.job.CustomJobTask;
import com.wfp.security.form.DeviceStatisticsBean;
import com.wfp.utils.RBRegionsUtils;

/**
 * 
 * @author sti-user
 * 
 */
public class CacheClearJob implements CustomJobTask {

	public CacheClearJob() {

	}

	public boolean executeCustomTask(Parameters parameters) {

		Map<String, Map<String, DeviceStatisticsBean>> map = Collections
				.synchronizedMap(RBRegionsUtils.getStaffTackingCache());

		if (map != null) {
			for (Map.Entry<String, Map<String, DeviceStatisticsBean>> entry : map
					.entrySet()) {

				Session sessionVar = SessionManager.getInstance().getSession(
						entry.getKey());
				if (sessionVar == null) {
					map.remove(entry.getKey());
				}
			}
		}

		return true;
	}

}
