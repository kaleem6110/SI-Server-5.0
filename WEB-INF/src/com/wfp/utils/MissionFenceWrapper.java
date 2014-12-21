/**
 * 
 */
package com.wfp.utils;

import lu.hitec.pss.soap.ds.out._15_x.PssuFence;

/**
 * @author kaleem.mohammed
 *
 */
public class MissionFenceWrapper {
	
	private String mission;
	
	private PssuFence[] fences;

	/**
	 * @return the mission
	 */
	public String getMission() {
		return mission;
	}

	/**
	 * @param mission the mission to set
	 */
	public void setMission(String mission) {
		this.mission = mission;
	}

	/**
	 * @return the fences
	 */
	public PssuFence[] getFences() {
		return fences;
	}

	/**
	 * @param fences the fences to set
	 */
	public void setFences(PssuFence[] fences) {
		this.fences = fences;
	}

}
