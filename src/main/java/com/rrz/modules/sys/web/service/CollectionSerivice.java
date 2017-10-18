package com.rrz.modules.sys.web.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.rrz.modules.sys.web.models.ConstellationEnum;
import com.rrz.modules.sys.web.models.FortuneEnum;
import com.rrz.modules.sys.web.vo.DataBaseInfo;

@Service
public class CollectionSerivice {

	private static Log log = LogFactory.getLog(CollectionSerivice.class);

	// 配置您申请的KEY
	public static final String APPKEY = "6d458751aafa86bb232ac5c85947a60d";

	public static void main(String[] args) {
		CollectionSerivice ss = new CollectionSerivice();
		ss.insert();
	}

	public void insert() {
		List<DataBaseInfo> list = new ArrayList<DataBaseInfo>();
		Map<String, Object> params = new HashMap<String, Object>();
		String result = "";
		for (ConstellationEnum constellationEnum : ConstellationEnum.values()) {
			for (FortuneEnum fortuneEnum : FortuneEnum.values()) {
				String type = fortuneEnum.getDesc();
				String consName = constellationEnum.getDesc();
				params.put("key", APPKEY);
				params.put("consName", consName);
				params.put("type", type);
				try {
					result = JuheHttpUtils.getRequest(params);
					if (StringUtils.isNotEmpty(result)) {
						JSONObject object = JSONObject.parseObject(result);
						if (object.getIntValue("error_code") == 0) {
							DataBaseInfo dataBase = new DataBaseInfo();
							dataBase.setConsName(consName);
							dataBase.setConsType(type);
							if (type.equals(FortuneEnum.TODAY.getDesc())) {
								parseDay(object, dataBase);
							} else if (type.equals(FortuneEnum.TOMORROW.getDesc())) {
								parseDay(object, dataBase);
							} else if (type.equals(FortuneEnum.NEXTWEEK.getDesc())) {
								parseWeekOrMonth(object, dataBase);
							} else if (type.equals(FortuneEnum.MONTH.getDesc())) {
								parseWeekOrMonth(object, dataBase);
							} else if (type.equals(FortuneEnum.WEEK.getDesc())) {
								parseWeekOrMonth(object, dataBase);
							} else if (type.equals(FortuneEnum.YEAR.getDesc())) {
								parseYear(object, dataBase);
							}
							list.add(dataBase);
						} else {
							log.info(object.get("error_code") + ":" + object.get("reason"));
						}
					}
				} catch (Exception e) {
					log.error("get collections fail:" + e);
				}
			}
		}
		System.out.println(list.size());
		System.out.println(list);
	}

	// paseDay
	public void parseDay(JSONObject object, DataBaseInfo dataBase) {
		// 综合指数
		dataBase.setCompositeIndex(object.getString("all"));
		// 幸运色
		dataBase.setLuckyColor(object.getString("color"));
		// 爱情指数
		dataBase.setLoveIndex(object.getString("love"));
		// 财运指数
		dataBase.setMoneyIndex(object.getString("money"));
		// 幸运数字
		dataBase.setLuckyNumber(object.getString("number"));
		// 速配星座
		dataBase.setFriend(object.getString("QFriend"));
		// 整体运势
		dataBase.setWholeFortune(object.getString("summary"));
	}

	// parseWeekOrMonth
	public void parseWeekOrMonth(JSONObject object, DataBaseInfo dataBase) {
		// 健康
		dataBase.setHealth(object.getString("health"));
		// 爱情指数
		dataBase.setLove(object.getString("love"));
		// 财运指数
		dataBase.setMoney(object.getString("money"));
		// 工作
		dataBase.setWorkInfo(object.getString("work"));

	}

	// parseYear
	public void parseYear(JSONObject object, DataBaseInfo dataBase) {
		object = JSON.parseObject(object.get("mima").toString());
		JSONArray noArr = (JSONArray) JSON.parse(object.get("text").toString());
		// 年度密码
		dataBase.setYearMima(noArr.toJSONString());
	}

}
