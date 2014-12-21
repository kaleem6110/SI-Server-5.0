/**
 * 
 */
package com.wfp.synchronize.db.config.model;

import com.spacetimeinsight.db.model.BaseAuditModel;
import com.spacetimeinsight.db.model.ICacheableModel;


public class SynchronizationDataTypeMaster  extends BaseAuditModel implements ICacheableModel{


	private static final long serialVersionUID = -7327644437374197588L;
	private String name = null;
	private String description = null;
	

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

	
}
