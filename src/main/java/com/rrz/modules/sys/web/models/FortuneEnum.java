package com.rrz.modules.sys.web.models;

public enum FortuneEnum {

	TODAY(1, "today"),
	
	TOMORROW(2, "tomorrow"),
	 
	WEEK(3, "week"),
	
	NEXTWEEK(4, "nextweek"),
	
	MONTH(5, "month"),
	 
	YEAR(6, "year");
	
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
 
    FortuneEnum(int value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    public static void main(String[] args) {
    	for(ConstellationEnum constellationEnum : ConstellationEnum.values()){
    		for(FortuneEnum fortuneEnum : FortuneEnum.values()){
    			System.out.println(constellationEnum.getDesc()+" "+fortuneEnum.getDesc());
    		}
    	}
	
	}
}
