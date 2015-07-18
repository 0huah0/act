package com.abcdef.frm.service.system;
/*
 *   
 *   
*/
import java.util.List;

import com.abcdef.core.service.BaseService;
import com.abcdef.frm.model.system.GlobalType;

public interface GlobalTypeService extends BaseService<GlobalType>{
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
	 * 删除分类，同时删除其下所有子子分类
	 * @param parentId
	 */
	public void mulDel(Long parentId);
}


