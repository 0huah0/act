package com.abcdef.frm.service.system.impl;
/*
 *   
 *   
*/
import java.util.List;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.abcdef.frm.dao.system.GlobalTypeDao;
import com.abcdef.frm.model.system.GlobalType;
import com.abcdef.frm.service.system.GlobalTypeService;

public class GlobalTypeServiceImpl extends BaseServiceImpl<GlobalType> implements GlobalTypeService{
	private GlobalTypeDao dao;
	
	public GlobalTypeServiceImpl(GlobalTypeDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.gdssoft.framework.service.system.GlobalTypeService#getByParentIdCatKey(java.lang.Long, java.lang.String)
	 */
	public List<GlobalType> getByParentIdCatKey(Long parentId,String catKey){
		return dao.getByParentIdCatKey(parentId, catKey);
	}
	
	@Override
	public Integer getCountsByParentId(Long parentId) {
		return dao.getCountsByParentId(parentId);
	}
	
	/**
	 * 删除分类，同时删除其下所有子子分类
	 * @param parentId
	 */
	public void mulDel(Long proTypeId){
		GlobalType globalType=get(proTypeId);
		dao.evict(globalType);
		
		List<GlobalType> subList=dao.getByPath(globalType.getPath());
		
		for(GlobalType gt:subList){
			dao.remove(gt);
		}

	}

}