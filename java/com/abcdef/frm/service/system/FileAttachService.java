package com.abcdef.frm.service.system;
/*
 *  
 *   
*/
import java.util.List;

import com.abcdef.core.service.BaseService;
import com.abcdef.core.web.paging.PagingBean;
import com.abcdef.frm.model.system.FileAttach;

public interface FileAttachService extends BaseService<FileAttach> {

	public void removeByPath(String filePath);

	/**
	 * 按文件路径取得路径
	 */
	FileAttach getByPath(String filePath);

	/**
	 * @description 删除多条数据
	 */
	void mutilDel(String filePath);

	/**
	 * @description 分页查询附件信息,备注：图片格式[bmp,png,jpg,gif,tiff]
	 * @param pb
	 *            PagingBean
	 * @param filePath
	 *            filePath搜索条件
	 * @param bo
	 *            boolean,true:file文件,false:image图片文件
	 * @return List <FileAttach>
	 */
	List<FileAttach> fileList(PagingBean pb, String filePath, boolean bo);

	/**
	 * @description 根据fileType查询所有满足条件的数据
	 * @param fileType
	 *            fileType搜索条件
	 * @return List<FileAttach>
	 */
	List<FileAttach> fileList(String fileType);
}
