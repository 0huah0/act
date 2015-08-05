package com.abcdef.core.exception;
public class ExistException extends Exception {
	private static final long serialVersionUID = 1L;

	public ExistException() {
		super("实体已存在");
	}
	public ExistException(String msg) {
		super(msg);
	}
	public ExistException(String msg, Throwable cause) {
		super(msg, cause);
	}
	public ExistException(Throwable cause) {
		super(cause);
	}

}
