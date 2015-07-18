package com.abcdef;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:app-test.xml"})
@TransactionConfiguration(transactionManager="txManager", defaultRollback=false)
@Transactional
public class BaseTestCase {
	@Rollback(false)
	@Test
	public void test(){
		System.out.println("--------------------------------------------------");
	}
}
