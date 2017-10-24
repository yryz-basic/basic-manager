package com.rrz.modules.email.web;

import com.rrz.common.persistence.Page;
import com.rrz.common.web.BaseController;
import com.rrz.modules.sys.utils.UserUtils;
import com.yryz.basic.common.entity.PageList;
import com.yryz.basic.modules.email.api.EmailConfigApi;
import com.yryz.basic.modules.email.dto.EmailConfigDto;
import com.yryz.basic.modules.email.entity.EmailConfig;
import com.yryz.basic.modules.email.entity.EmailSend;
import com.yryz.basic.modules.email.vo.EmailConfigVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("${adminPath}/email/config")
public class EmailConfigController extends BaseController {

    @Autowired
    EmailConfigApi emailConfigApi;

    @RequestMapping(value="/list")
    public String list(EmailConfigDto emailConfigDto, HttpServletResponse response, Model model) {
        Page<EmailConfigVo> dataPage = new Page<EmailConfigVo>(request, response);
        PageList<EmailConfigVo> emailConfigList = emailConfigApi.list(emailConfigDto);
        if(emailConfigList != null){
            dataPage.build(emailConfigList);
        }

        model.addAttribute("emailConfigDto", emailConfigDto);
        model.addAttribute("page", dataPage);
        return "modules/message/email/emailConfigList";
    }

    @RequestMapping(value="/add")
    public String add(Long id, Integer operateId, Model model) {
        EmailConfigVo config = new EmailConfigVo();
        if(id != null){
            config = emailConfigApi.detail(id);
        }

        model.addAttribute("emailConfigDto", config);
        model.addAttribute("operateId", operateId);
        return "modules/message/email/emailConfigDetail";
    }

    @ResponseBody
    @RequestMapping(value="/submit")
    public String submit(EmailConfig record) {
        if(record == null){
            return "0";
        }
        String userId = UserUtils.getUser().getId();
        if(record.getId() == null){
            Boolean flag = emailConfigApi.emailCodeExist(record.getEmailCode());
            if(!flag){
                return "邮件编码已存在，请重新输入";
            }
            record.setCreateUserId(userId);
            emailConfigApi.insert(record);
        }else{
            record.setLastUpdateUserId(userId);
            emailConfigApi.update(record);
        }

        return "1";
    }

    @ResponseBody
    @RequestMapping(value="/emailCodeExist")
    public Boolean emailCodeExist(String emailCode, Long id) {
        if(id != null){
            return true;
        }

        return emailConfigApi.emailCodeExist(emailCode);
    }

}
