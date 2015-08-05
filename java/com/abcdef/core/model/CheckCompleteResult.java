package com.abcdef.core.model;


public class CheckCompleteResult {
	/**
	 * 结论
	 */
	private Boolean isComplete = true;
	/**
	 * 消息，检查不完整时会把信息写在这个属性上
	 */
	private String message;
	
	public Boolean isComplete() {
		return isComplete;
	}
	public void setIsComplete(Boolean isComplete) {
		this.isComplete = isComplete;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	
}
