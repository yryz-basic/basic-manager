package com.rrz.modules.commonUpload;

public class UploadResultDetail {

private String msg="文件不能为空";  //上传结果通知
	
	private String resouceUrl; //上传的资源地址
	
	private String videoResouceUrl; //视频资源地址

    /**  
    * @Fields durationTime : 音频时长   upload服务返回为s，业务需要统一转换为 ms
    */
    private Integer durationTime; 
    
	/**  
	* 资源文件大小 单位 B
	*/
	private Long fileSize;

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getResouceUrl() {
		return resouceUrl;
	}

	public void setResouceUrl(String resouceUrl) {
		this.resouceUrl = resouceUrl;
	}

	public String getVideoResouceUrl() {
		return videoResouceUrl;
	}

	public void setVideoResouceUrl(String videoResouceUrl) {
		this.videoResouceUrl = videoResouceUrl;
	}

	public Integer getDurationTime() {
		return durationTime;
	}

	public void setDurationTime(Integer durationTime) {
		this.durationTime = durationTime;
	}

	public Long getFileSize() {
		return fileSize;
	}

	public void setFileSize(Long fileSize) {
		this.fileSize = fileSize;
	}
}
