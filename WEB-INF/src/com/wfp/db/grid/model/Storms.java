package com.wfp.db.grid.model;

import com.enterprisehorizons.db.model.GeoModel;

public class Storms extends GeoModel {
	/**
	 * 
	 */
	private static final long serialVersionUID = -345899719807128593L;

	private String name = null;
	private Double area = null;
	private String perimeter = null;
	private Long storm_dd_0 = null;
	private Long storm_dd_1 = null;
	private Long storm_zone = null;
	private String updatedBy = null;
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getArea() {
		return area;
	}

	public void setArea(Double area) {
		this.area = area;
	}

	public String getPerimeter() {
		return perimeter;
	}

	public void setPerimeter(String perimeter) {
		this.perimeter = perimeter;
	}

	public Long getStorm_dd_0() {
		return storm_dd_0;
	}

	public void setStorm_dd_0(Long stormDd_0) {
		storm_dd_0 = stormDd_0;
	}

	public Long getStorm_dd_1() {
		return storm_dd_1;
	}

	public void setStorm_dd_1(Long stormDd_1) {
		storm_dd_1 = stormDd_1;
	}

	public Long getStorm_zone() {
		return storm_zone;
	}

	public void setStorm_zone(Long stormZone) {
		storm_zone = stormZone;
	}

	public String getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	
	

}
