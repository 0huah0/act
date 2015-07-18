package acounting;

import java.util.List;

import javax.annotation.Resource;

import org.junit.Test;

import com.abcdef.BaseTestCase;
import com.abcdef.frm.dao.system.SysConfigDao;
import com.abcdef.frm.model.system.SysConfig;

public class TestDataSource extends BaseTestCase{
	
	@Resource
	private SysConfigDao sysConfigDao;
	
	@Test
	public void testDataSource(){
		List<SysConfig> list = sysConfigDao.getAll();
		
		for (SysConfig sysConfig : list) {
			System.out.println(sysConfig);			
		}
	}
}
