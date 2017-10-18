/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.rrz.modules.sys.entity;

import org.hibernate.validator.constraints.Length;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

import com.rrz.common.persistence.DataEntity;

/**
 * 维护日志Entity
 * @author zx
 * @version 2016-02-19
 */
public class SysMaintenanceLog extends DataEntity<SysMaintenanceLog> {
	
	private static final long serialVersionUID = 1L;
	private String maintenanceTitle;		// 维护标题
	private String maintenanceContent;		// 维护内容
	private Date maintenanceDate;		// 维护日期
	private String maintenanceFloor;		// 维护平台 : 0--Pc1--Android2--Ios
	private Integer maintenanceVersion;		// 维护版本
	private String appUrl; //app下载路径
	private String isUpdate;    //是否强制更新
	private Date createTime;		// 创建时间
	private String createUser;		// 创建人
	private Date updateTime;		// 修改时间
	private String updateUser;		// 修改人
	
	public SysMaintenanceLog() {
		super();
	}

	public SysMaintenanceLog(String id){
		super(id);
	}

	@Length(min=0, max=200, message="维护标题长度必须介于 0 和 200 之间")
	public String getMaintenanceTitle() {
		return maintenanceTitle;
	}

	public void setMaintenanceTitle(String maintenanceTitle) {
		this.maintenanceTitle = maintenanceTitle;
	}
	
	@Length(min=0, max=800, message="维护内容长度必须介于 0 和 800 之间")
	public String getMaintenanceContent() {
		return maintenanceContent;
	}

	public void setMaintenanceContent(String maintenanceContent) {
		this.maintenanceContent = maintenanceContent;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getMaintenanceDate() {
		return maintenanceDate;
	}

	public void setMaintenanceDate(Date maintenanceDate) {
		this.maintenanceDate = maintenanceDate;
	}
	
	@Length(min=0, max=2, message="维护平台 : 0--Pc1--Android2--Ios长度必须介于 0 和 2 之间")
	public String getMaintenanceFloor() {
		return maintenanceFloor;
	}

	public void setMaintenanceFloor(String maintenanceFloor) {
		this.maintenanceFloor = maintenanceFloor;
	}
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
	@Length(min=0, max=64, message="创建人长度必须介于 0 和 64 之间")
	public String getCreateUser() {
		return createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	
	@Length(min=0, max=64, message="修改人长度必须介于 0 和 64 之间")
	public String getUpdateUser() {
		return updateUser;
	}

	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}

	public String getAppUrl() {
		return appUrl;
	}

	public void setAppUrl(String appUrl) {
		this.appUrl = appUrl;
	}

	public String getIsUpdate() {
		return isUpdate;
	}

	public void setIsUpdate(String isUpdate) {
		this.isUpdate = isUpdate;
	}

	public Integer getMaintenanceVersion() {
		return maintenanceVersion;
	}

	public void setMaintenanceVersion(Integer maintenanceVersion) {
		this.maintenanceVersion = maintenanceVersion;
	}
	
}