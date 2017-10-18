package com.rrz.modules.common.entity;

/**
 * Long类型id主键基础接口
 *
 */
public abstract class GenericEntity extends BaseEntity implements Id {

	/**
	 * 
	 */
	private static final long serialVersionUID = -9166087599903341661L;
	
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
