package com.rrz.modules.sys.web.error;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "${adminPath}/sys/error")
public class ErrorController {

	@RequestMapping(value = "info")
	public String info(Model model) {
		model.addAttribute("info", "不能重复提交");
		return "modules/sys/error";
	}
}
