package com.abcdef.core.service;
import java.io.Serializable;
import java.util.List;
import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.web.paging.PagingBean;

public interface GenericService<T,PK extends Serializable> {
	/**
	 * 
	 * @param entity
	 * @return
	 */
	public T save(T entity) throws Exception;
	/**
	 * merge the object
	 * @param entity
	 * @return
	 */
	public T merge(T entity);
	
	/**
	 * evict the object
	 * @param entity
	 */
	public void evict(T entity);
	/**
	 * 
	 * @param id
	 * @return
	 */
	public T get(PK id);
	
	/**
	 * 
	 * @return
	 */
	public List<T> getAll();
	
	/**
	 * 
	 * @param pb
	 * @return
	 */
	public List<T> getAll(PagingBean pb);
	
	/**
	 * 
	 * @param filter
	 * @return
	 */
	public List<T> getAll(QueryFilter filter);
	
	
	public Boolean remove(PK id) throws Exception;
	
	public void remove(T entity);
	
	/**
	 * flush the session
	 */
	public void flush();

	
}
