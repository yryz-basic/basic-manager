package com.rrz.modules.email.web;

import com.rrz.common.persistence.Page;
import com.rrz.common.web.BaseController;
import com.rrz.modules.sys.utils.UserUtils;
import com.yryz.basic.common.entity.PageList;
import com.yryz.basic.modules.email.api.EmailSendApi;
import com.yryz.basic.modules.email.dto.EmailSendDto;
import com.yryz.basic.modules.email.entity.EmailSend;
import com.yryz.basic.modules.email.vo.EmailSendVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.util.Collection;
import java.util.List;

@Controller
@RequestMapping("${adminPath}/email/send")
public class EmailSendController extends BaseController {

    @Autowired
    EmailSendApi emailSendApi;

    @RequestMapping(value="/list")
    public String list(EmailSendDto emailSendDto, HttpServletResponse response, Model model) {
        Page<EmailSendVo> dataPage = new Page<EmailSendVo>(request, response);
        PageList<EmailSendVo> emailSendList = emailSendApi.list(emailSendDto);
        if(emailSendList != null){
            dataPage.build(emailSendList);
        }

        model.addAttribute("emailSendDto", emailSendDto);
        model.addAttribute("page", dataPage);
        return "modules/message/email/emailSendList";
    }

    @RequestMapping(value="/add")
    public String add(Long id, Integer operateId, Model model) {
        EmailSendVo emailSend = new EmailSendVo();
        if(id != null){
            emailSend = emailSendApi.detail(id);
        }

        model.addAttribute("emailSendDto", emailSend);
        model.addAttribute("operateId", operateId);
        return "modules/message/email/emailSendDetail";
    }

    @ResponseBody
    @RequestMapping(value="/submit")
    public String submit(EmailSend record) {
        if(record == null){
            return "0";
        }
        String userId = UserUtils.getUser().getId();
        if(record.getId() == null){
            Boolean flag = emailSendApi.accountExist(record.getAccount());
            if(!flag){
                return "账号已存在，请重新输入";
            }
            record.setCreateUserId(userId);
            emailSendApi.insert(record);
        }else{
            record.setLastUpdateUserId(userId);
            emailSendApi.update(record);
        }

        return "1";
    }

    @ResponseBody
    @RequestMapping(value="/del")
    public String del(Long id) {
        if(id == null){
            return "0";
        }

        emailSendApi.delete(id);
        return "1";
    }

    @ResponseBody
    @RequestMapping(value="/accountExist")
    public Boolean accountExist(String account, Long id) {
        if(id != null){
            return true;
        }

        return emailSendApi.accountExist(account);
    }

    @ResponseBody
    @RequestMapping(value="/accountSelect")
    public Collection<EmailSendVo> accountSelect(String account) {
        EmailSendDto emailSend = new EmailSendDto();
        emailSend.setAccountSearch(account);
        PageList<EmailSendVo> emailSendList = emailSendApi.list(emailSend);
        if(emailSendList != null){
            return emailSendList.getEntities();
        }

        return null;
    }

}
