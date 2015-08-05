package com.abcdef.core.util;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

//import sun.misc.BASE64Decoder;
//import sun.misc.BASE64Encoder;
import org.apache.commons.codec.binary.Base64;

/**
 * 實現基于DES3對稱加密算法的，生成關鍵key，解密等操作
 * 
 */
public class DESUtil {

	private org.apache.commons.logging.Log log = org.apache.commons.logging.LogFactory
			.getLog(DESUtil.class);
	/**
	 * DES是一種常用于不太嚴謹場合的對稱加密算法
	 */
	private static String ARITHMETIC = "DES";
	
	/**
	 * 用戶加密和解密的key
	 */
	private SecretKey key = null;
	
	public DESUtil(String passwd) {
		setKey(passwd);
	}

	/**
	 * 使用約定的密碼生成key
	 * 
	 * @param passwd
	 *            (約定使用于 加密和解密的)密碼
	 */
	private void setKey(String passwd) {
		KeyGenerator _generator;
		try {
			_generator = KeyGenerator.getInstance(ARITHMETIC);
			_generator.init(new SecureRandom(passwd.getBytes()));
			key = _generator.generateKey();
			_generator = null;
		} catch (NoSuchAlgorithmException e) {
			log.error("選擇的加密算法不存在!");
		}
	}

	private SecretKey getKey() {
		return key;
	}

	/**
	 * 解密數據，默認所有的明文加密后都必須加以base64編碼，所以在解密前必须先使用base64解碼后才能成功解密
	 * 
	 * @param cryptograph
	 *            加密的數據
	 * @return 加密失败时返回空字符串
	 */
	public String decrypt(String cryptograph) {
		Base64 base64De = new Base64();
		String result = "";
		try {
			byte[] decodeCryptograph = base64De.decode(cryptograph.getBytes());
			result = decrypt(decodeCryptograph);
		} catch (Exception e) {
			log.error("解码(base64)字符串" + cryptograph + "失败");
		}
		return result;
	}

	private String decrypt(byte[] cryptograph) {
		String result = "";
		Cipher cipher;
		try {
			cipher = Cipher.getInstance(ARITHMETIC);
			cipher.init(Cipher.DECRYPT_MODE, getKey());
			// 这里注意解密后的结果为字节流，一定要使用utf-8格式转化为字符串，不然结果有误
			result = new String(cipher.doFinal(cryptograph), "utf-8");
		} catch (Exception e) {
			log.error("解密(des)字符串" + cryptograph.toString() + "失败");
		} finally {
			cipher = null;
		}
		return result;
	}

	/**
	 * 建议的加密接口，程序中不会使用
	 * 
	 * @param sourceString 源字符串
	 * @return 加密失败时返回<code>sourceString</code>的值
	 */
	public String encrypt(String sourceString) {
		String result = sourceString;
		byte[] sources = null;
		try {
			sources = sourceString.getBytes("UTF8");
			sources = encrypt(sources);
			Base64 base64en = new Base64();
			result = new String(base64en.encode(sourceString.getBytes()));
		} catch (Exception e) {
			log.error("编码(base64)字符串" + sources.toString() + "失败");
		}
		return result;

	}

	private byte[] encrypt(byte[] sources) {
		byte[] result = sources;
		Cipher cipher;
		try {
			cipher = Cipher.getInstance(ARITHMETIC);
			cipher.init(Cipher.ENCRYPT_MODE, getKey());
			result = cipher.doFinal(sources);
		} catch (Exception e) {
			log.error("加密(des)字符串" + sources.toString() + "失败");
		} finally {
			cipher = null;
		}
		return result;
	}
}
