package com.rrz.modules.sys.dao;

import com.rrz.common.persistence.CrudDao;
import com.rrz.common.persistence.annotation.MyBatisDao;
import com.rrz.modules.sys.entity.OpenAccount;

@MyBatisDao
public interface OpenAccountDao extends CrudDao<OpenAccount> {

	OpenAccount selectSingleOpenAccountByParams(OpenAccount openAccount);
	
}
