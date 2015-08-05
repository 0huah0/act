package com.abcdef.core.service.impl;
import java.io.Serializable;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.dao.GenericDao;
import com.abcdef.core.service.GenericService;
import com.abcdef.core.web.paging.PagingBean;

public class GenericServiceImpl<T,PK extends Serializable> implements GenericService<T, PK> {
	
	protected Log logger=LogFactory.getLog(getClass());
	
	protected GenericDao<T, Serializable> dao=null;

	public void setDao(GenericDao dao) {
		this.dao = dao;
	}
	
	public GenericServiceImpl(GenericDao dao) {
		this.dao=dao;
	}
	@Override
	public T get(PK id) {
		return (T)dao.get(id);
	}
	
	@Override
	public T save(T entity) throws Exception {
		return dao.saveOrUpdate(entity);
	}
	
	@Override
	public T merge(T entity){
		return (T)dao.merge(entity);
	}
	
	public void evict(T entity){
		dao.evict(entity);
	}
	
	@Override
	public List<T> getAll(){
		return dao.getAll();
	}
	@Override
	public List<T> getAll(PagingBean pb){
		return dao.getAll(pb);
	}
	@Override
	public List<T> getAll(QueryFilter filter){
		return dao.getAll(filter);
	}
	@Override
	public Boolean remove(PK id) throws Exception {
		dao.remove(get(id));
		return null==get(id);
	}
	
	public void remove(T entity) {
		dao.remove(entity);
	}
	
	@Override
	public void flush() {
		dao.flush();
	}
	
}
