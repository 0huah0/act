package com.abcdef.core.dao;

import java.io.Serializable;
import java.util.List;

import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.web.paging.PagingBean;

public interface GenericDao<T,PK extends Serializable> {
	public PK save(T entity);
	public T saveOrUpdate(T entity);
	public T merge(T entity);
	public T get(PK id);
	//public void remove(PK id);
	public void remove(T entity);
	public void evict(T entity);
	
	public List<T> getAll();
	public List<T> getAll(PagingBean pb);
	public List<T> getAll(QueryFilter filter);
	
	public List find(final String hql,final Object[] objs,PagingBean pb);
	
	public List<T> findByHql( String hql, Object[]objs);
	public List<T> findByHql( String hql, Object[]objs,PagingBean pb );
	public List<T> findByHql( String hql, Object[]objs, int firstResult, int pageSize );
	
	public void flush();
	
}
