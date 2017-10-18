package com.rrz.modules.sys.web.vo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

public class DataBaseInfoVo extends DataBaseInfo {

	private List<String> mimas;

	public List<String> getMimas() {
		return mimas;
	}

	public void setMimas(List<String> mimas) {
		this.mimas = mimas;
	}
	
	public static void main(String[] args) {
		DataBaseInfoVo vo = new DataBaseInfoVo();
		List<String> list = new ArrayList();
		list.add("11");
		list.add("22");
		list.add("33");
		
		String json = JSONObject.toJSON(list).toString();
		DataBaseInfo info = new DataBaseInfo();
		info.setCompositeIndex("星座1");
		info.setYearMima(json);
		BeanUtils.copyProperties(info, vo);
		
		System.out.println(json);
		
		JSONArray object = JSONObject.parseArray(info.getYearMima());
		list = object.toJavaList(String.class);
		vo.setMimas(list);
		for(String ss: vo.getMimas()){
			System.out.println(ss);
		}
	}
}
