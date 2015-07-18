package acounting;

import java.util.List;

import javax.annotation.Resource;

import org.junit.Test;

import com.abcdef.BaseTestCase;
import com.act.dao.JournalHeadDao;
import com.act.model.JournalHead;

public class JournalHeadDaoTest extends BaseTestCase{
	
	@Resource
	private JournalHeadDao journalHeadDao;
	@Test
	public void testSave(){/*
		for (int i=0;i<5;i++) {
			JournalHead journalHead = new JournalHead();
			
			journalHead.setRefNo("110_"+(int)(Math.random()*10)+i);
			journalHead.setRefDate(new Date());
			journalHead.setType(1);
			journalHead.setIsDelete(0);
			journalHead.setIsBackup(0);
			journalHead.setIsPost(0);
			journalHeadDao.save(journalHead);
			
		}
		
		System.out.println("=====================testSave()ed===================");
	*/}
	
	@Test
	public void testList(){
		List<JournalHead> list = journalHeadDao.getAll();
		for (JournalHead journalHead : list) {
			System.out.println(journalHead);			
		}
		System.out.println("=====================testList()ed===================");
	}
	
	@Test
	public void testDel(){/*
		List<JournalHead> list = journalHeadDao.getAll();
		for (JournalHead journalHead : list) {
			journalHeadDao.remove(journalHead);
		}
		System.out.println("=====================testDel()ed===================");
	*/}
	
}
