package com.abcdef.core.service.impl;
import com.abcdef.core.dao.GenericDao;
import com.abcdef.core.service.BaseService;

public class BaseServiceImpl<T> extends GenericServiceImpl<T, Long> implements BaseService<T>{
	
	public BaseServiceImpl(GenericDao dao) {
		super(dao);
	}
	
}
