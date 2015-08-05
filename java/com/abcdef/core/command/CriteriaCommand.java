package com.abcdef.core.command;
import org.hibernate.Criteria;


/**
 * Creates a command to wrap the Hibernate criteria API.
 * 
 * 
 */
public interface CriteriaCommand {
	public final static String SORT_DESC="desc";
	public final static String SORT_ASC="asc";
	
	public Criteria execute(Criteria criteria);
}
