package com.abcdef.frm.dao.system.impl;

/*
 *  
 *  
 */
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.abcdef.core.Constants;
import com.abcdef.core.dao.impl.BaseDaoImpl;
import com.abcdef.core.web.paging.PagingBean;
import com.abcdef.frm.dao.system.AppUserDao;
import com.abcdef.frm.dao.system.UserAgentDao;
import com.abcdef.frm.model.system.AppRole;
import com.abcdef.frm.model.system.AppUser;
import com.abcdef.frm.model.system.UserAgent;

@SuppressWarnings("unchecked")
public class AppUserDaoImpl extends BaseDaoImpl<AppUser> implements AppUserDao,
		UserDetailsService {
	//private Log log = LogFactory.getLog(AppUserDaoImpl.class);

	@Resource
	private UserAgentDao userAgentDao;
	
	public AppUserDaoImpl() {
		super(AppUser.class);
	}

	@Override
	public AppUser findByUserName(String username) {
		String hql = "from AppUser au where au.username=? and au.delFlag=?";
		Object[] params = { username, Constants.FLAG_UNDELETED };
		List<AppUser> list = findByHql(hql, params);
		AppUser user = null;
		if (list.size() == 1) {
			user = list.get(0);
		}

		return user;
	}

	@Override
	public UserDetails loadUserByUsername(final String username)
			throws UsernameNotFoundException, DataAccessException {
		AppUser user = (AppUser) getHibernateTemplate().execute(
				new HibernateCallback<Object>() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {

						String hql = "from AppUser ap where ap.username=? and ap.delFlag = ?";
						Query query = session.createQuery(hql);
						query.setString(0, username);
						query.setShort(1, Constants.FLAG_UNDELETED);
						AppUser user = null;
						try {

							user = (AppUser) query.uniqueResult();

							if (user != null) {
								Hibernate.initialize(user.getRoles());
								if (user.getEmployee() != null) {
									Hibernate.initialize(user.getEmployee().getDepartment());
								}

								// 进行合并权限的处理
								Set<AppRole> roleSet = user.getRoles();
								Iterator<AppRole> it = roleSet.iterator();

								while (it.hasNext()) {
									AppRole role = it.next();
									if (role.getRoleId().equals(
											AppRole.SUPER_ROLEID)) {// 具有超级权限
										user.getRights().clear();
										user.getRights().add(
												AppRole.SUPER_RIGHTS);
										break;
									} else {
										if (StringUtils.isNotEmpty(role
												.getRights())) {
											String[] items = role.getRights()
													.split("[,]");
											for (int i = 0; i < items.length; i++) {
												if (!user.getRights().contains(
														items[i])) {
													user.getRights().add(
															items[i]);
												}
											}
										}
									}
								}

							}
						} catch (Exception ex) {
							logger.warn("user:" + username
									+ " can't not loding rights:"
									+ ex.getMessage());
						}
						return user;
					}
				});

		return user;
	}
	
	/**
	 * 根据部门PATH属性查找
	 */
	@Override
	public List<AppUser> findByDepartment(String path, PagingBean pb) {
		List<String> list = new ArrayList<String>();
		String hql = new String();
		if ("0.".equals(path)) {
			hql = "from AppUser vo2 where vo2.delFlag = ? order by vo2.fullname";
			list.add(Constants.FLAG_UNDELETED.toString());
		} else {
			hql = "select vo2 from Department vo1,AppUser vo2 where vo1=vo2.department and vo1.path like ? and vo2.delFlag = ? order by vo2.fullname";
			list.add(path + "%");
			list.add(Constants.FLAG_UNDELETED.toString());
		}
		if (pb != null)
			return findByHql(hql, list.toArray(), pb);
		else
			return findByHql(hql, list.toArray());
	}
	
/*
	@Override
	public List<AppUser> findByDepartment(String path) {
		String hql = "select vo2 from Department vo1,AppUser vo2 where vo1=vo2.department and vo1.path like ? and vo2.delFlag =?";
		Object[] params = { path + "%", Constants.FLAG_UNDELETED };
		return findByHql(hql, params);
	}
*/
	
	@Override
	public List<AppUser> findByRoleId(Long roleId, PagingBean pb) {
		String hql = "select vo from AppUser vo join vo.roles roles where roles.roleId=? and vo.delFlag = ?";
		Object[] objs = { roleId, Constants.FLAG_UNDELETED };
		if (pb != null)
			return findByHql(hql, objs, pb);
		else
			return findByHql(hql, objs);
	}

	@Override
	public List<AppUser> findByFullname(String fullname, PagingBean pb) {
		String hql = "select vo2 from Employee vo1, AppUser vo2 where vo1=vo2.employee and vo1.fullname like ? and vo2.delFlag =?";
		Object[] objs = { "%" + fullname + "%", Constants.FLAG_UNDELETED };
		if (pb != null)
			return findByHql(hql, objs, pb);
		else
			return findByHql(hql, objs);
	}

	@Override
	public List<AppUser> findUnAgents(final Long userId, String fullname,
			PagingBean pb) {
		//先取得该用户的代理人信息列表
		List<UserAgent> userAgents = userAgentDao.getByUserId(userId);
		
		String hql = "from AppUser au, Employee ep where ep=au.employee and au.status=? and au.delFlag=? ";
		List<String> params = new ArrayList<String>();
		params.add(Constants.ENABLED.toString());			//状态有效
		params.add(Constants.FLAG_UNDELETED.toString());	//未被删除

		//根据用户名称过滤
		if (StringUtils.isNotEmpty(fullname)) {
			hql += " and ep.fullname like ?";
			params.add("%" + fullname + "%");
		}

		StringBuffer sb = new StringBuffer(userId.toString());
		for (UserAgent userAgent : userAgents) {
			sb.append(",").append(userAgent.getGrantUId());
		}
		hql += " and au.userId not in(" + sb.toString() + ")";

		return findByHql(hql, params.toArray(), pb);
	}

	@Override
	public boolean isExit(String empCode) {
		final String hql = "from AppUser where employee.empCode='"+empCode+"'";
		List<AppUser> list = findByHql(hql);
		if(list.size() > 0){
			return true;
		}else{
			return false;
		}
	}

	@Override
	public boolean validate(String userName) {
		final String hql = "from AppUser where delFlag=" + Constants.FLAG_UNDELETED + " and username='"+userName+"'";
		List<AppUser> list = findByHql(hql);
		if(list.size() > 0){
			return true;
		}else{
			return false;
		}
	}

}
