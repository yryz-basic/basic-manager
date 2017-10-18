package com.rrz.modules.sys.entity;

import com.rrz.common.persistence.DataEntity;

public class OpenAccount extends DataEntity<OpenAccount>{

	private static final long serialVersionUID = -9103853699097619639L;
	
	private Long kid;
	private Long merchantId;
	private String merchantName;
	private String cardNo;
	private String merchantPhone;
	private String merchantMobile;
	private String merchantDesc;
	private String bankName;
	private String bankNo;
	private byte merchantType;
	private String currency;
	private String role;
	private Integer settlementInterval;
	
	public Long getKid() {
		return kid;
	}
	public void setKid(Long kid) {
		this.kid = kid;
	}
	public Long getMerchantId() {
		return merchantId;
	}
	public void setMerchantId(Long merchantId) {
		this.merchantId = merchantId;
	}
	public String getMerchantName() {
		return merchantName;
	}
	public void setMerchantName(String merchantName) {
		this.merchantName = merchantName;
	}
	public String getCardNo() {
		return cardNo;
	}
	public void setCardNo(String cardNo) {
		this.cardNo = cardNo;
	}
	public String getMerchantPhone() {
		return merchantPhone;
	}
	public void setMerchantPhone(String merchantPhone) {
		this.merchantPhone = merchantPhone;
	}
	public String getMerchantMobile() {
		return merchantMobile;
	}
	public void setMerchantMobile(String merchantMobile) {
		this.merchantMobile = merchantMobile;
	}
	public String getMerchantDesc() {
		return merchantDesc;
	}
	public void setMerchantDesc(String merchantDesc) {
		this.merchantDesc = merchantDesc;
	}
	public String getBankName() {
		return bankName;
	}
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}
	public String getBankNo() {
		return bankNo;
	}
	public void setBankNo(String bankNo) {
		this.bankNo = bankNo;
	}
	public byte getMerchantType() {
		return merchantType;
	}
	public void setMerchantType(byte merchantType) {
		this.merchantType = merchantType;
	}
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public Integer getSettlementInterval() {
		return settlementInterval;
	}
	public void setSettlementInterval(Integer settlementInterval) {
		this.settlementInterval = settlementInterval;
	}
	
	
}
