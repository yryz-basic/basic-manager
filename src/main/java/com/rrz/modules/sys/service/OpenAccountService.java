package com.rrz.modules.sys.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rrz.common.service.CrudService;
import com.rrz.modules.sys.dao.OpenAccountDao;
import com.rrz.modules.sys.entity.OpenAccount;

@Service
@Transactional(readOnly = true)
public class OpenAccountService extends CrudService<OpenAccountDao, OpenAccount> {

	/**
	 * 查询单个基本信息
	 * @param openAccount
	 * @return
	 */
	public OpenAccount getSingleOpenAccount(OpenAccount openAccount){
		return dao.selectSingleOpenAccountByParams(openAccount);
	}
	
}
