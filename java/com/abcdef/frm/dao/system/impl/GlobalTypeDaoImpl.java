package com.abcdef.frm.dao.system.impl;
/*
 *   
 *  
*/
import java.util.ArrayList;
import java.util.List;

import com.abcdef.core.dao.impl.BaseDaoImpl;
import com.abcdef.frm.dao.system.GlobalTypeDao;
import com.abcdef.frm.model.system.GlobalType;

@SuppressWarnings("unchecked")
public class GlobalTypeDaoImpl extends BaseDaoImpl<GlobalType> implements GlobalTypeDao{

	public GlobalTypeDaoImpl() {
		super(GlobalType.class);
	}
	/*
	 * (non-Javadoc)
	 * @see com.gdssoft.framework.dao.system.GlobalTypeDao#getByParentIdCatKey(java.lang.Long, java.lang.String)
	 */
	public List<GlobalType> getByParentIdCatKey(Long parentId,String catKey){
		String hql=" from GlobalType gt where gt.parentId = ? and gt.catKey = ? order by gt.sn asc";
		return findByHql(hql, new Object[]{parentId,catKey});
	}
	
	public Integer getCountsByParentId(Long parentId){
		ArrayList<Long> param=new ArrayList<Long>();
		String hql= " select count(proTypeId) from GlobalType gt ";
		if(parentId!=null && parentId!=0){
			hql+=" where gt.parentId=?";
			param.add(parentId);
		}else{
			hql+=" where gt.parentId is null";
		}
		
		Object obj=findUnique(hql, param.toArray());
		return new Integer(obj.toString());
		
	}
	
	public List<GlobalType> getByParentId(Long parentId){
		ArrayList<Long> param=new ArrayList<Long>();
		String hql= " from GlobalType gt ";
		if(parentId!=null && parentId!=0){
			hql+=" where gt.parentId=?";
			param.add(parentId);
		}else{
			hql+=" where gt.parentId is null";
		}
		
		return findByHql(hql, param.toArray());
	}
	
	/**
	 * 
	 * @param path
	 * @return
	 */
	public List<GlobalType> getByPath(String path){
		String hql=" from GlobalType gt where gt.path like ?";
		return findByHql(hql,new Object[]{path+"%"});
	}
	@Override
	public GlobalType findByTypeName(String typeName) {
		String hql=" from GlobalType gt where gt.typeName = ?";
		List<GlobalType> list = findByHql(hql,new Object[]{typeName});
		if(list.size()>0){
			return list.get(0);
		}else{
			return null;
		}
		
	}

}