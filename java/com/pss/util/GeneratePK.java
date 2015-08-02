package com.pss.util;

import java.io.Serializable;
import java.util.List;
import java.util.Properties;

import org.hibernate.HibernateException;
import org.hibernate.MappingException;
import org.hibernate.dialect.Dialect;
import org.hibernate.engine.QueryParameters;
import org.hibernate.engine.SessionImplementor;
import org.hibernate.id.Configurable;
import org.hibernate.id.IdentifierGenerator;
import org.hibernate.type.Type;
/**
 * 
* 类名称：      GeneratePK   
* 类描述：     在hibernate的基础上自动生成自定义的主键
* 创建人：     andy_lj  
* 创建时间：2012-08-10 上午11:40:50     
* 修改备注：   
* @version
 */
public class GeneratePK implements Configurable, IdentifierGenerator {
    public String sign;// user000000001中的user
    public String classname; //实体类的类名
    public String pk;//主键名字
    public String idLength;//user000000001的长度
    
    /**
     * 取得XX.hbm.xml中的自定义的值
     */
    @Override
    public void configure(Type arg0, Properties arg1, Dialect arg2)
            throws MappingException {
        this.classname = arg1.getProperty("classname");
        this.pk = arg1.getProperty("pk");
        this.sign = arg1.getProperty("sign");
        this.idLength = arg1.getProperty("idLength");
    }
    
    /**
     * 生成主键
     */
    @Override
    public Serializable generate(SessionImplementor arg0, Object arg1)
            throws HibernateException {
         //获得主键的长度
        int leng = Integer.valueOf(idLength);
        //需要查询数据库中最大的ID号
        StringBuffer sql = new StringBuffer("select max(a.").append(pk)
                                                            .append(") from ")
                                                            .append(classname)
                                                            .append(" as a where a.")
                                                            .append(pk)
                                                            .append(" like '")
                                                            .append(sign)
                                                            .append("%'");
        QueryParameters qp = new QueryParameters();
        List<?> ls = arg0.list(sql.toString(), qp);
        String max = (String) ls.get(0);
        int i = 0;
        //如果是第一次添加记录那么就是类似user000000001
        if (max == null || max.trim().equals("")) {
            max = "1";
            for(; i < leng-sign.length()-1; i++) {
                max = "0" + max;
            }
            i = 0;
            return sign + max;
        }//不是第一次的操作,并且记录的长度没有超过从配置文件中读取的长度
        else if(max != null && max.length() <= leng) {
            max = max.replaceAll(sign, "");
            Integer imax = Integer.parseInt(max) + 1;
            String returnnum = String.valueOf(imax);
            int zero = leng-sign.length()-returnnum.length();
            for(; i < zero; i++) {
                returnnum = "0" + returnnum;
            }
            i = 0;
            return sign + returnnum;
        }//不是第一次的操作,记录的长度超过了从配置文件中读取的长度
        else {
            leng = max.length();
            max = max.replaceAll(sign, "");
            Integer imax = Integer.parseInt(max) + 1;
            String returnnum = String.valueOf(imax);
            int zero = leng-sign.length()-returnnum.length();
            for(; i < zero; i++) {
                returnnum = "0" + returnnum;
            }
            return sign + returnnum;
        }
    }

}