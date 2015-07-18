package com.abcdef.frm.action.system;
import javax.annotation.Resource;
import com.abcdef.core.web.action.BaseAction;
import com.abcdef.frm.model.system.FileAttach;
import com.abcdef.frm.service.system.FileAttachService;

/**
 * @description 图片详细信息展示
 */
public class FileAttachDetailAction extends BaseAction {

	@Resource
	private FileAttachService fileAttachService;

	private Long fileId;
	private FileAttach fileAttach;

	public Long getFileId() {
		return fileId;
	}

	public void setFileId(Long fileId) {
		this.fileId = fileId;
	}

	public FileAttach getFileAttach() {
		return fileAttach;
	}

	public void setFileAttach(FileAttach fileAttach) {
		this.fileAttach = fileAttach;
	}

	@Override
	public String execute() throws Exception {
		fileAttach = fileAttachService.get(fileId);
		return SUCCESS;
	}
}
