package com.rrz.modules.sys.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.rrz.common.web.BaseController;
import com.rrz.modules.sys.entity.OpenAccount;
import com.rrz.modules.sys.service.OpenAccountService;
import com.rrz.modules.sys.utils.UserUtils;

@Controller
@RequestMapping(value = "${adminPath}/sys/account")
public class OpenAccountController extends BaseController{

	@Autowired
	private OpenAccountService openAccountService;
	
	@RequestMapping(value = {"single"})
	public String single(HttpServletRequest request, HttpServletResponse response, Model model){
		OpenAccount openAccountNew=new OpenAccount();
		Long merchantId=UserUtils.getUser().getMerchantId();
		openAccountNew.setMerchantId(merchantId);
		OpenAccount openAccount=openAccountService.getSingleOpenAccount(openAccountNew);
		String merchantPhone=openAccount.getMerchantPhone();
		if(!merchantPhone.substring(0, 1).equals("1")){
			merchantPhone="0"+merchantPhone;
		}
		openAccount.setMerchantPhone(merchantPhone);
		model.addAttribute("openAccount", openAccount);
		model.addAttribute("merchantId", merchantId);
		return "modules/sys/openAccount";
	}
}
