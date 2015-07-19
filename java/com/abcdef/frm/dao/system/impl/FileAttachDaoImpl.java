package com.abcdef.frm.dao.system.impl;
/*
 *  
 *   
*/
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.abcdef.core.dao.impl.BaseDaoImpl;
import com.abcdef.core.util.ContextUtil;
import com.abcdef.core.web.paging.PagingBean;
import com.abcdef.frm.dao.system.FileAttachDao;
import com.abcdef.frm.model.system.FileAttach;

@SuppressWarnings("unchecked")
public class FileAttachDaoImpl extends BaseDaoImpl<FileAttach> implements
		FileAttachDao {

	public FileAttachDaoImpl() {
		super(FileAttach.class);
	}

	@Override
	public void removeByPath(final String filePath) {
		final String hql = "delete from FileAttach fa where fa.filePath = ?";
		getHibernateTemplate().execute(new HibernateCallback<Object>() {
			@Override
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				query.setString(0, filePath);
				return query.executeUpdate();
			}
		});
	}

	/**
	 * 按文件路径取得路径
	 * 
	 * @param filePath
	 */
	public FileAttach getByPath(String filePath) {
		String hql = "from FileAttach fa where fa.filePath = ?";
		return (FileAttach) findUnique(hql, new Object[] { filePath });
	}

	/**
	 * @description 分页查询附件信息,备注：图片格式[bmp,png,jpg,gif,tiff]
	 * @param pb
	 *            PagingBean
	 * @param bo
	 *            boolean,true:file文件,false:image图片文件
	 * @return List <FileAttach>
	 */
	@Override
	public List<FileAttach> fileList(PagingBean pb, String fileType, boolean bo) {
		String creator = ContextUtil.getCurrentUser().getFullname();
		ArrayList<String> paramList = new ArrayList<String>();
		paramList.add(creator);
		String hql = "select f from FileAttach f where f.creator = ? and ";
		if (fileType != null && !fileType.equals("")) {
			hql += "f.fileType like ? and ";
			paramList.add(fileType);
		}
		if (bo) // 未image图片文件
			hql += "f.ext not in('bmp','png','jpg','gif','tiff') ";
		else
			hql += "f.ext in('bmp','png','jpg','gif','tiff') ";
		hql += "order by f.createtime DESC ";
		logger.debug("FileAttach：" + hql);
		return findByHql(hql, paramList.toArray(), pb);
	}

	/**
	 * 查询所有满足fileType条件的数据
	 */
	@Override
	public List<FileAttach> fileList(String fileType) {
		String creator = ContextUtil.getCurrentUser().getFullname();
		ArrayList<String> paramList = new ArrayList<String>();
		String hql = "select f from FileAttach f where f.creator = ? and ";
		paramList.add(creator);
		if (!fileType.isEmpty()) {
			hql += "f.fileType like ? ";
			paramList.add(fileType);
		}
		hql += "order by f.createtime DESC ";
		logger.debug(hql);
		return findByHql(hql, paramList.toArray());
	}
}