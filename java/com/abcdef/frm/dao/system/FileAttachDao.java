package com.abcdef.frm.dao.system;
/*
 *  
 *   
*/
import java.util.List;

import com.abcdef.core.dao.BaseDao;
import com.abcdef.core.web.paging.PagingBean;
import com.abcdef.frm.model.system.FileAttach;

/**
 * @description 附件分类管理
 * @author YHZ
 * @company
 * @datatime 2010-11-20PM
 * 
 */
public interface FileAttachDao extends BaseDao<FileAttach> {

	void removeByPath(String filePath);

	/**
	 * 按文件路径取得路径
	 */
	FileAttach getByPath(String filePath);

	/**
	 * 分页查询图片
	 * 参数[pb:PagingBean,filePath:fileType搜索条件,bo:boolean{true:file文件,false:
	 * image图片}]
	 */
	List<FileAttach> fileList(PagingBean pb, String fileType, boolean bo);

	/**
	 * @description 根据fileType查询所有满足条件的数据
	 * @param fileType
	 *            fileType搜索条件
	 * @return List<FileAttach>
	 */
	List<FileAttach> fileList(String fileType);
}