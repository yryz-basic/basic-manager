package com.rrz.modules.sys.web.models;

public enum ConstellationEnum {


	
	AQUARIUS(1, "水瓶座"),
	
	PISCES(2, "双鱼座"),
	 
	ARIES(3, "白羊座"),
	
	TAURUS(4, "金牛座"),
	
	GEMINI(5, "双子座"),
	 
	CANCER(6, "巨蟹座"),
	
	LEO(7, "狮子座"),
	
	VIRGIN(8, "处女座"),
	 
	LIBRA(9, "天秤座"),
	
	SCORPIO(10, "天蝎座"),
	
	SAGITTARIUS(11, "射手座"),
	 
	CAPRICORNUS(12, "摩羯座");
	
	
	
    private int value;
    private String desc;
 
    public int getValue() {
        return value;
    }
 
    public void setValue(int value) {
        this.value = value;
    }
 
    public String getDesc() {
        return desc;
    }
 
    public void setDesc(String desc) {
        this.desc = desc;
    }
 
     ConstellationEnum(int value, String desc) {
        this.value = value;
        this.desc = desc;
    }
}
