package com.rrz.modules.common.entity;

import org.apache.commons.lang3.StringUtils;

import java.io.Serializable;

public class ResultEntity implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -1526746661250437725L;
	
	private String code = "200";
	
	private String msg = "success";
	
	private Object data;
	
	public ResultEntity(String msg , Object data){
		this("200" , msg , data);
	}
	
	public ResultEntity(String code , String msg , Object data){
		this.code = code;
		if(!StringUtils.isBlank(msg)){
			this.msg = msg;
		}
		this.data = data;
	}
	
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}
	
}
