package com.abcdef.frm.service.system.impl;
/*
 *  
 *   
*/

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import javax.annotation.Resource;

import com.abcdef.core.Constants;
import com.abcdef.core.command.CriteriaCommand;
import com.abcdef.core.command.FieldCommandImpl;
import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.exception.ExistException;
import com.abcdef.core.exception.NotCompleteException;
import com.abcdef.core.exception.NotExistException;
import com.abcdef.core.model.CheckCompleteResult;
import com.abcdef.core.service.impl.BaseServiceImpl;
import com.abcdef.core.util.BeanUtil;
import com.abcdef.core.util.ContextUtil;
import com.abcdef.core.util.StringUtil;
import com.abcdef.core.web.paging.PagingBean;
import com.abcdef.frm.dao.system.AppUserDao;
import com.abcdef.frm.model.system.AppRole;
import com.abcdef.frm.model.system.AppUser;
import com.abcdef.frm.model.system.Employee;
import com.abcdef.frm.service.system.AppRoleService;
import com.abcdef.frm.service.system.AppUserService;
import com.abcdef.frm.service.system.EmployeeService;
import com.abcdef.frm.service.system.UserAgentService;

public class AppUserServiceImpl extends BaseServiceImpl<AppUser> implements AppUserService{

	private AppUserDao dao;
	@Resource
	private AppRoleService appRoleService;
	@Resource
	private EmployeeService employeeService;
	@Resource
	private UserAgentService userAgentService;
	//logger放到基类中，观察是否会出现日志记录混乱的问题
	//private Log logger = LogFactory.getLog(AppUserServiceImpl.class);
	
	public AppUserServiceImpl(AppUserDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	@Override
	public AppUser getByUserName(String username) {
		return dao.findByUserName(username);
	}

	@Override
	public List<AppUser> findByRoleId(Long roleId) {
		return findByRoleId(roleId, null);
	}

	@Override
	public List<AppUser> findByRoleId(Long roleId, PagingBean pb) {
		return dao.findByRoleId(roleId, pb);
	}

	@Override
	public List<AppUser> findByEmpCode(String empCode) {
		List<AppUser> list = null;
		Employee employee = employeeService.getByEmpCode(empCode);
		if (null != employee) {
			QueryFilter filter = new QueryFilter();
			filter.addFilter("Q_employee_N_EQ", employee.getId().toString());
			list = this.getAll(filter);
		} else {
			list = new ArrayList<AppUser>();
		}
		return list;
	}

	@Override
	public List<AppUser> findByDepartment(String path) {
		return findByDepartment(path, null);
	}

	@Override
	public List<AppUser> findByDepartment(String path, PagingBean pb) {
		return dao.findByDepartment(path, pb);
	}
	/**
	 * 获取非代理人用户列表，分页
	 * 默认增加条件：用户没有被标示为已删除
	 */
	@Override
	public List<AppUser> findUnAgents(Long userId, String fullname, PagingBean pb) {
		return dao.findUnAgents(userId, fullname, pb);
	}
	/**
	 * 获取所有用户列表，不分页
	 * 默认增加条件：用户没有被标示为已删除
	 */
	@Override
	public List<AppUser> getAll() {
		QueryFilter filter = new QueryFilter();
		filter.addFilter("Q_delFlag_SN_EQ", Constants.FLAG_UNDELETED.toString());
		return super.getAll(filter);
	}
	/**
	 * 获取所有用户列表，分页
	 * 默认增加条件：用户没有被标示为已删除
	 * @param pb 分页器
	 */
	@Override
	public List<AppUser> getAll(PagingBean pb) {
		QueryFilter filter = new QueryFilter(
				pb.getStart(),
				pb.getPageSize());
		filter.addFilter("Q_delFlag_SN_EQ", Constants.FLAG_UNDELETED.toString());
		return super.getAll(filter);
	}
	/**
	 * 获取所有用户列表，带过滤条件
	 * 默认增加条件：用户没有被标示为已删除
	 * @param filter 过滤条件
	 */
	@Override
	public List<AppUser> getAll(QueryFilter filter) {
		//按员工姓名查询
		List<CriteriaCommand> criteriaCommands = filter.getCommands();
		for (CriteriaCommand criteriaCommand : criteriaCommands) {
			if (criteriaCommand instanceof FieldCommandImpl) {
				FieldCommandImpl command = (FieldCommandImpl)criteriaCommand;
				if (command.getProperty().equals("fullname")) {
					return dao.findByFullname(command.getValue().toString(), 
							filter.getPagingBean());
				}
			}
		}
		//正常查询
		filter.addFilter("Q_delFlag_SN_EQ", Constants.FLAG_UNDELETED.toString());
		return super.getAll(filter);
	}
	
	@Override
	public AppUser save(AppUser appUser) throws NotCompleteException, 
			ExistException, NotExistException {
		CheckCompleteResult result = appUser.checkComplete();
		if (result.isComplete()) {
			
			//先保存员工对象
			Employee employee = employeeService.save(appUser.getEmployee());
			appUser.setEmployee(employee);
			
			if (appUser.getUserId() != null) {
				return doUpdate(appUser);
			} else {
				return doInsert(appUser);
			}
		} else {
			logger.error("输入信息不完整" + result.getMessage() + "，传入参数：" + appUser);
			throw new NotCompleteException("输入信息不完整");
		}
	}
	
	@Override
	public Boolean remove(Long userId) throws NotExistException {
		AppUser appUser = this.get(userId);
		if (null == appUser) {
			logger.error("账号不存在，传入参数：" + userId);
			throw new NotExistException("账号不存在");
		} else {
			
			Employee defaultEmployee = employeeService.get(Employee.DEFAULT_EMPLOYEE_ID);
			if (null != defaultEmployee) {
				appUser.setEmployee(defaultEmployee);
			}
			appUser.setStatus(Constants.FLAG_DISABLE);
			appUser.setDelFlag(Constants.FLAG_DELETED);
			appUser.setUsername("__" + appUser.getUserId() + 
					"_" + appUser.getUsername() + 
					"_" + appUser.getFullname());
			
			AppUser currUser = ContextUtil.getCurrentUser();
			if (null != currUser) {
				appUser.setUpdateBy(currUser.getUsername());
			}
			appUser.setUpdateDate(new Date());
			try {
				appUser = this.save(appUser);
			} catch (Exception e) {
				logger.error("删除账号失败，参数：" + appUser, e);
			}
			return null!=appUser;
			//dao.remove(appUser);
		}
	}
	
	
	/**
	 * 新增
	 * @param appUser
	 * @return
	 * @throws ExistException 对象已存在
	 */
	private AppUser doInsert(AppUser appUser) throws ExistException {

		if (null == this.getByUserName(appUser.getUsername())) {
			AppUser currUser = ContextUtil.getCurrentUser();
			appUser.setDelFlag(Constants.FLAG_UNDELETED);
			appUser.setPassword(StringUtil.encryptSha256(appUser
					.getPassword()));
			
			//赋予通用角色
			AppRole appRole = appRoleService.get(AppRole.COMMON_ROLEID);
			Set<AppRole> rules = appUser.getRoles();
			if (null==rules) rules = new HashSet<AppRole>();
			rules.remove(appRole);	//先移除
			rules.add(appRole);		//再添加
			appUser.setRoles(rules);
			
			if (null != currUser) {
				appUser.setCreateBy(currUser.getUsername());
			}
			appUser.setCreateDate(new Date());
			//保存之后重新获取对象实例
			Long newId = dao.save(appUser);
			//因save方法会持久化对象实例，根据id取该实例会非常快
			return dao.get(newId);
		} else {
			logger.error("该账号已经存在，传入参数：" + appUser);
			throw new ExistException("该账号已经存在");
		}
	}
	/**
	 * 更新
	 * @param appUser
	 * @return
	 * @throws NotExistException 对象不存在
	 */
	private AppUser doUpdate(AppUser appUser) throws NotExistException {
		AppUser old = this.get(appUser.getUserId());
		if (null == old) {
			logger.error("更新的账号不存在，传入参数：" + appUser);
			throw new NotExistException("更新的账号不存在");
		} else {
			AppUser currUser = ContextUtil.getCurrentUser();
			//如果实体中有UserId则更新
			if (null == appUser.getDelFlag())
				appUser.setDelFlag(old.getDelFlag());
			
			if (null == appUser.getPassword())
				appUser.setPassword(old.getPassword());
			
			if (null != currUser) {
				appUser.setUpdateBy(currUser.getUsername());
			}
			appUser.setUpdateDate(new Date());
			return dao.merge(appUser);
		}
	}

	@Override
	public boolean hasRole(AppUser au, String roleCode) {
		Set<AppRole> set = au.getRoles();
		Iterator<AppRole> it = set.iterator();
		while(it.hasNext()){
			String rc = ((AppRole)it.next()).getRoleCode();
			if(rc.equals(roleCode)){
				return true;
			}
		}
		return false;
	}

	@Override
	public void selfAlter(AppUser appUser) {
		AppUser au = get(appUser.getUserId());
		try {
			BeanUtil.copyNotNullProperties(au, appUser);
			Employee e = employeeService.get(au.getEmployeeId());
			BeanUtil.copyNotNullProperties(e, appUser.getEmployee());
			e = employeeService.merge(e);
			appUser = dao.merge(au);
		} catch (IllegalAccessException e1) {
			e1.printStackTrace();
		} catch (InvocationTargetException e1) {
			e1.printStackTrace();
		}		
	}

	@Override
	public boolean isExit(String empCode) {
		
		return dao.isExit(empCode);
	}
	
	@Override
	public boolean validate(String userName) {
		
		return dao.validate(userName);
	}
}
