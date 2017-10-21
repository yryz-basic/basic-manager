package com.rrz.modules.email.web;

import com.rrz.common.persistence.Page;
import com.rrz.common.web.BaseController;
import com.yryz.basic.common.entity.PageList;
import com.yryz.basic.modules.email.api.EmailConfigApi;
import com.yryz.basic.modules.email.dto.EmailConfigDto;
import com.yryz.basic.modules.email.entity.EmailConfig;
import com.yryz.basic.modules.email.vo.EmailConfigVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("${adminPath}/email")
public class EmailController extends BaseController {

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
        return "modules/message/email/emailList";
    }

    @RequestMapping(value="/add")
    public String add(EmailConfig emailConfig, Model model) {

        model.addAttribute("emailConfigDto", new EmailConfigVo());
        return "modules/message/email/emailDetail";
    }

    @RequestMapping(value="/submit")
    public Integer submit() {
        return 1;
    }

}
