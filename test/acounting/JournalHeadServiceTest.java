package acounting;

import java.util.Calendar;
import java.util.List;

import javax.annotation.Resource;

import org.junit.Test;

import com.abcdef.BaseTestCase;
import com.act.dao.AccountingTitleDao;
import com.act.dao.JournalDetailDao;
import com.act.model.AccountingTitle;
import com.act.model.JournalDetail;
import com.act.model.JournalHead;
import com.act.service.JournalHeadService;

public class JournalHeadServiceTest extends BaseTestCase{
	
	@Resource
	private JournalHeadService journalHeadService;
	@Resource
	private JournalDetailDao journalDetailDao;
	@Resource
	private AccountingTitleDao accountingTitleDao;
	
	@Test
	//@Rollback
	public void testSave(){
		AccountingTitle at = new AccountingTitle();
		at.setCode("1");
		at.setName("1");
		at.setIsBasic(0);
		at.setIsDelete(0);
		accountingTitleDao.save(at);
		at = new AccountingTitle();
		at.setCode("2");
		at.setName("2");
		at.setIsBasic(0);
		at.setIsDelete(0);
		accountingTitleDao.save(at);
		
		for (int i=0;i<5;i++) {
			JournalHead journalHead = new JournalHead();
			Calendar c = Calendar.getInstance();	
			c.add(Calendar.DAY_OF_MONTH, (int)(Math.random()*10)-5);
			journalHead.setRefDate(c.getTime());
			
			journalHead.setRefNo("110_"+(int)(Math.random()*1000));			
			journalHead.setType(1);
			journalHead.setIsDelete(0);
			journalHead.setIsBackup(0);
			journalHead.setIsPost(0);
			try {
				journalHead = journalHeadService.save(journalHead);
			} catch (Exception e) {
				e.printStackTrace();
			}
			
			journalHeadService.flush();
			
			double m = Math.random()*1000;
			JournalDetail j0 = new JournalDetail();
			j0.setCode("1");
			j0.setName("name0_");
			j0.setCreditAmount(m);
			j0.setJournalHead(journalHead);
			journalDetailDao.save(j0);
			JournalDetail j1 = new JournalDetail();
			j1.setCode("2");
			j1.setName("name1_");
			j1.setDebitAmount(0-m);
			j1.setJournalHead(journalHead);
			journalDetailDao.save(j1);
			
			journalHead.getDetails().add(j0);
			journalHead.getDetails().add(j1);
		}
		
		System.out.println("=====================testSave()ed===================");
	}
	
	@Test
	public void testList(){
		
		List<JournalHead>  list = journalHeadService.getAll();
		for (JournalHead jh :list) {
			System.out.println(jh.getRefNo());
			
			JournalDetail []JournalDetails = (JournalDetail[]) jh.getDetails().toArray();
			for(JournalDetail jd:JournalDetails){
				System.out.println(jd.getCode());
			}
		}
		
		System.out.println("=====================testSave()ed===================");
	}
}
