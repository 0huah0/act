package com.abcdef.frm.dao.system;
/*
 *  
 * 
*/
import java.util.List;

import com.abcdef.core.dao.BaseDao;
import com.abcdef.frm.model.system.GlobalType;

/**
 * 
 * @author 
 *
 */
public interface GlobalTypeDao extends BaseDao<GlobalType>{
	/**
	 * 取得某种分类下的子结点列表
	 * @param parentId
	 * @param catKey
	 * @return
	 */
	public List<GlobalType> getByParentIdCatKey(Long parentId,String catKey);
	
	/**
	 * 取得该分类下的数目
	 * @param parentId
	 * @return
	 */
	public Integer getCountsByParentId(Long parentId);
	
	/**
	 * 取得该分类下的所有子分类
	 * @param parentId
	 * @return
	 */
	public List<GlobalType> getByParentId(Long parentId);
	
	/**
	 * 
	 * @param path
	 * @return
	 */
	public List<GlobalType> getByPath(String path);

	public GlobalType findByTypeName(String typeName);
}