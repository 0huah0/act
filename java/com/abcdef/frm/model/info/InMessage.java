package com.abcdef.frm.model.info;
/*
 *   
 *  
*/

import com.abcdef.core.model.BaseModel;

public class InMessage extends BaseModel {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public final static Short FLAG_READ=1;
	public final static Short FLAG_UNREAD=0;
	
	private Long receiveId;
	private ShortMessage shortMessage;
	private Long userId;
	private String userFullname;
	private Short readFlag;
    private Short delFlag;	
   
    public InMessage(){
    	
    }

	public Long getReceiveId() {
		return receiveId;
	}
	
	public ShortMessage getShortMessage() {
		return shortMessage;
	}

	public void setShortMessage(ShortMessage shortMessage) {
		this.shortMessage = shortMessage;
	}

	public void setReceiveId(Long receiveId) {
		this.receiveId = receiveId;
	}


	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUserFullname() {
		return userFullname;
	}

	public void setUserFullname(String userFullname) {
		this.userFullname = userFullname;
	}

	public Short getReadFlag() {
		return readFlag;
	}

	public void setReadFlag(Short readFlag) {
		this.readFlag = readFlag;
	}

	public Short getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(Short delFlag) {
		this.delFlag = delFlag;
	}
		
}
