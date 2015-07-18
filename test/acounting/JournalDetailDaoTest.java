package acounting;

import java.text.ParseException;
import java.util.List;

import javax.annotation.Resource;

import org.junit.Test;

import com.abcdef.BaseTestCase;
import com.act.dao.JournalDetailDao;
import com.act.model.JournalDetail;

public class JournalDetailDaoTest extends BaseTestCase{
	
	@Resource
	private JournalDetailDao journalDetailDao;

	
	@Test
	public void testlistActTitleSum(){
		List<JournalDetail> list = null;
		try {
			list = journalDetailDao.listActTitleSum("2013-08-22","2013-08-23");
			for (JournalDetail journalDetail : list) {
				System.out.println("======================="+list.size());
				System.out.println(journalDetail.getName());
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}		
	}
	
}
