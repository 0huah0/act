package com.abcdef.core.exception;
public class NotCompleteException extends Exception {
	private static final long serialVersionUID = 1L;

	public NotCompleteException() {
		super("信息不完整");
	}
	public NotCompleteException(String msg) {
		super(msg);
	}
	public NotCompleteException(String msg, Throwable cause) {
		super(msg, cause);
	}
	public NotCompleteException(Throwable cause) {
		super(cause);
	}

}
