package com.abcdef.core.exception;
public class NotExistException extends Exception {
	private static final long serialVersionUID = 1L;

	public NotExistException() {
		super("实体不存在");
	}
	public NotExistException(String msg) {
		super(msg);
	}
	public NotExistException(String msg, Throwable cause) {
		super(msg, cause);
	}
	public NotExistException(Throwable cause) {
		super(cause);
	}

}
