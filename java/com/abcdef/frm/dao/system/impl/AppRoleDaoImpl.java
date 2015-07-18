package com.abcdef.frm.dao.system.impl;
/*
 *  
 * 
*/
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.abcdef.core.Constants;
import com.abcdef.core.dao.impl.BaseDaoImpl;
import com.abcdef.frm.dao.system.AppRoleDao;
import com.abcdef.frm.model.system.AppFunction;
import com.abcdef.frm.model.system.AppRole;
import com.abcdef.frm.model.system.AppUser;
import com.abcdef.frm.model.system.FunUrl;

public class AppRoleDaoImpl extends BaseDaoImpl<AppRole> implements AppRoleDao{

	public AppRoleDaoImpl() {
		super(AppRole.class);
	}
	/*
	@Override
	public AppRole getByRoleName(String roleName){
		String hql="from AppRole ar where ar.roleName=?";
		return (AppRole)findUnique(hql, new Object[]{roleName});
	}
	*/
	@Override
	public AppRole getByRoleCode(String roleCode){
		String hql="from AppRole ar where ar.roleCode=?";
		return (AppRole)findUnique(hql, new Object[]{roleCode});
	}
	/*
	 * (non-Javadoc)
	 * @see com.gdssoft.framework.dao.system.AppRoleDao#getSecurityDataSource()
	 */
	@Override
	public HashMap<String,Set<String>> getSecurityDataSource() {
		final HashMap<String,Set<String>> source=new HashMap<String, Set<String>>();
		
		getHibernateTemplate().execute(new HibernateCallback() {
			@Override
			public Object doInHibernate(Session session) throws HibernateException,
					SQLException {
					String hql="from com.abcdef.frm.model.system.AppRole";
					Query query=session.createQuery(hql);
					List<AppRole> roleList=query.list();
					
					for(AppRole role:roleList){
						TreeSet<String> urlSet=new TreeSet<String>();
						//取得某个角色的所有URL
						Iterator<AppFunction> functions=role.getFunctions().iterator();
						
						while(functions.hasNext()){
							AppFunction fun=functions.next();
							//logger.debug("funName:" + fun.getFunKey());
							Iterator<FunUrl> urlIt=fun.getFunUrls().iterator();
							while(urlIt.hasNext()){
								String url=urlIt.next().getUrlPath();
								//logger.debug("rolename:" + role.getName() + " url:" + url);
								urlSet.add(url);
							}
						}
						
						source.put(role.getRoleName(), urlSet);
					}
					return null;
			}
		});
		return source;
	}
	/*
	@Override
	public List<AppRole> findDepRole(long roleId,String path) {
		String hql = "select vo from AppRole vo,AppUser vo1,vo1.roles as roles where vo.roleId=roles.roleId and vo1.department.path like ? and vo1.delFlag =? and vo.roleId=?";
		Object[] params = { "0.1.3.", Constants.FLAG_UNDELETED,24};
		return findByHql(hql, params);
	}
	*/
}
