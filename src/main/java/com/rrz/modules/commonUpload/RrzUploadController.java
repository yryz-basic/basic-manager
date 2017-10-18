/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.rrz.modules.commonUpload;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.rrz.common.config.Global;
import com.rrz.common.utils.JsonUtils;
import com.rrz.common.web.BaseController;

/**
 * 通用上传Controller
 *
 * @author wangsenyong
 * @version 2017-04-12
 */
@Controller
@RequestMapping(value = "${adminPath}/upload/rrzUploadInfo")
public class RrzUploadController extends BaseController {

    public static final String CACHE_APP_ENGNAME = "appEngName";
    private static final Log logger = LogFactory.getLog(RrzUploadController.class);

    /**
     * 得到oss压缩标识
     * @return
     */
    public boolean getOssZipFlag(){
        return true;
    }
    
    /**
     * 上传图片(pic)
     *
     * @return
     * @throws IOException
     */
    @RequestMapping(value = "uploadImg")
    @ResponseBody
    public Object uploadImg(@RequestParam(value = "fileUpload", required = false) MultipartFile file, boolean checkUnzip, Long size) {
        String result;
        UploadResultDetail uploadResult = null;
        try {
            if (null != size && size > 0) {
                long realSize = file.getSize();
                if (realSize > size * 1024) {
                    uploadResult = new UploadResultDetail();
                    uploadResult.setMsg("上传图片不能大于" + size + "k");
                    return uploadResult;
                }
            }
            //ossUnzip为true,走oss压缩
            boolean ossUnzip = getOssZipFlag();
            String loc = UploadConstans.loc;
            result = UploadUtil.uploadFile(file, "fileUpload",
                    Global.getConfig("uploadUrl") + "/oss/uploadImage?ossUnzip="+ossUnzip+"&checkUnzip=" + checkUnzip + "&loc=" + loc,
                    null);
            uploadResult = JsonUtils.fromJson(result, UploadResultDetail.class);
            uploadResult.setFileSize(file.getSize());
        } catch (Exception e) {
            logger.error("调用上传图片接口报错：" + e);
        }
        return uploadResult;
    }

    /**
     * 上传头像(headImg)
     *
     * @return
     */
    @RequestMapping(value = "uploadHeadImg", method = {RequestMethod.POST})
    @ResponseBody
    public Object uploadHeadImg(@RequestParam(value = "fileUpload", required = false) MultipartFile file, boolean checkUnzip) {
        String result;
        UploadResultDetail uploadResult = null;
        try {
        	 //ossUnzip为true,走oss压缩
            boolean ossUnzip = getOssZipFlag();
            String loc = UploadConstans.loc;
            result = UploadUtil.uploadFile(file, "fileUpload",
                    Global.getConfig("uploadUrl") + "/oss/uploadHeadImage?ossUnzip="+ossUnzip+"&checkUnzip=" + checkUnzip + "&loc=" + loc,
                    null);
            uploadResult = JsonUtils.fromJson(result, UploadResultDetail.class);
            uploadResult.setFileSize(file.getSize());
        } catch (Exception e) {
            logger.error("调用上传图片接口报错：" + e);
        }
        return uploadResult;
    }

    /**
     * 上传音频(uploadAudio)
     *
     * @return
     */
    @RequestMapping(value = "uploadAudio", method = {RequestMethod.POST})
    @ResponseBody
    public Object uploadAudio(@RequestParam(value = "fileUpload", required = false) MultipartFile file, boolean checkUnzip) {
        String result;
        UploadResultDetail uploadResult = null;
		try {
			String loc = UploadConstans.loc;
			result = UploadUtil.uploadFile(file, "fileUpload",
					Global.getConfig("uploadUrl") + "/oss/uploadAudio?checkUnzip=" + checkUnzip + "&loc=" + loc, null);
			uploadResult = JsonUtils.fromJson(result, UploadResultDetail.class);
			uploadResult.setFileSize(file.getSize());
			// 上传音频 时长 s转为 ms
			uploadResult.setDurationTime(uploadResult.getDurationTime() * 1000);
		} catch (Exception e) {
			logger.error("调用上传音频接口报错：" + e);
		}
        return uploadResult;
    }

    /**
     * 上传视频(uploadVideo)
     *
     * @return
     */
    @RequestMapping(value = "uploadVideo", method = {RequestMethod.POST})
    @ResponseBody
    public Object uploadVideo(@RequestParam(value = "fileUpload", required = false) MultipartFile file, boolean checkUnzip) {
        String result;
        UploadResultDetail uploadResult = null;
        try {
        	String loc = UploadConstans.loc;
            result = UploadUtil.uploadFile(file, "fileUpload",
                    Global.getConfig("uploadUrl") + "/oss/uploadVideo?checkUnzip=" + checkUnzip + "&loc=" + loc, null);
            uploadResult = JsonUtils.fromJson(result, UploadResultDetail.class);
            uploadResult.setFileSize(file.getSize());
        } catch (Exception e) {
            logger.error("调用上传图片接口报错：" + e);
        }
        return uploadResult;
    }

    // 验证文件大小
    public static String checkFileSize(InputStream in) {
        int size;
        String msg = "";
        try {
            size = in.available() / 1024;
            if (size > 100) {
                msg = "文件不能超过200K";
            }
            BufferedImage bufferedImg = ImageIO.read(in);
            int imgHeight = bufferedImg.getHeight();
            if (imgHeight > 200) {
                msg = "高度不能超过200px";
            }
        } catch (Exception e) {
            msg = "文件格式不合法";
        }
        return msg;
    }

    public static void main(String[] args) throws FileNotFoundException {
        File file = new File("C:\\Users\\rzw5\\Desktop\\jpg\\11.jpg");
        System.out.println(checkFileSize(new FileInputStream(file)));
    }

}