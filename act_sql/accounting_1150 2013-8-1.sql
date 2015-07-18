-- MySQL dump 10.11 11:50 2013-8-1
--
-- Host: 10.138.4.107    Database: accounting
-- ------------------------------------------------------
-- Server version	5.0.51b-community-nt-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `act_accounting_title`
--

DROP TABLE IF EXISTS `act_accounting_title`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `act_accounting_title` (
  `act_title_id` bigint(20) NOT NULL auto_increment,
  `code` varchar(20) NOT NULL,
  `name` varchar(40) NOT NULL,
  `name_en` varchar(100) default NULL,
  `remark` varchar(500) default NULL,
  `parent_id` bigint(20) default NULL,
  `level` int(11) default NULL COMMENT '1：一級科目(資產、負債、業主權益)、2：二級科目、3：三級科目、4：四級科目',
  `left_or_right` char(1) default NULL COMMENT 'l：左方科目(借餘表示正值，貸餘表示負值)、r：右方科目(貸餘表示正值，借餘表示負值)',
  `is_basic` int(11) NOT NULL default '0' COMMENT '0：非基礎資料、1：基礎資料',
  `is_delete` int(11) NOT NULL default '0' COMMENT '0：未刪除、1：已刪除',
  `create_date` datetime default NULL,
  `create_by` varchar(50) default NULL,
  `update_date` datetime default NULL,
  `update_by` varchar(50) default NULL,
  PRIMARY KEY  (`act_title_id`),
  UNIQUE KEY `ak_code` (`code`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `act_accounting_title`
--

LOCK TABLES `act_accounting_title` WRITE;
/*!40000 ALTER TABLE `act_accounting_title` DISABLE KEYS */;
INSERT INTO `act_accounting_title` VALUES (1,'1','資產','assets ','指商業透過交易或其他事項所獲得之經濟資源，能以貨幣衡量並預期未來能提供經濟效益者。\nEconomic resources controlled by an entity as a result of past transactions or events and from which future economic benefits probably are obtained. ',NULL,1,NULL,0,0,'2013-08-01 11:23:21','admin',NULL,NULL),(2,'2','負債','liabilities','指商業由於過去之交易或其他事項，所產生之經濟義務，能以貨幣衡量，並將以提供勞務或支付經濟資源之方式償付者。\nAn obligation of an entity arising from past transactions or events,the settlement of which may result in the transfer or use of assets, provision of services or other yielding of conomic ',NULL,1,NULL,0,0,'2013-08-01 11:25:36','admin',NULL,NULL);
/*!40000 ALTER TABLE `act_accounting_title` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `act_journal_detail`
--

DROP TABLE IF EXISTS `act_journal_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `act_journal_detail` (
  `journal_detail_id` bigint(20) NOT NULL auto_increment,
  `ref_no` varchar(20) NOT NULL,
  `item_no` int(11) default NULL,
  `code` varchar(20) NOT NULL,
  `name` varchar(40) NOT NULL,
  `debit_amount` double(20,10) default NULL,
  `credit_amount` double(20,10) default NULL,
  `create_date` datetime default NULL,
  `create_by` varchar(50) default NULL,
  `update_date` datetime default NULL,
  `update_by` varchar(50) default NULL,
  PRIMARY KEY  (`journal_detail_id`),
  KEY `fk_jldl_r_jlhd` (`ref_no`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=utf8 COMMENT='日記帳明細表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `act_journal_detail`
--

LOCK TABLES `act_journal_detail` WRITE;
/*!40000 ALTER TABLE `act_journal_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `act_journal_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `act_journal_head`
--

DROP TABLE IF EXISTS `act_journal_head`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `act_journal_head` (
  `journal_head_id` bigint(20) NOT NULL auto_increment,
  `ref_no` varchar(20) NOT NULL,
  `ref_date` date NOT NULL,
  `brief` varchar(100) default NULL,
  `journal_type` int(11) NOT NULL COMMENT '1：日常分錄、2：調整分錄、3：更新分錄、4：結帳分錄(結清)、5：結帳分錄(結轉)、6：開帳分錄',
  `data_from` varchar(10) default NULL COMMENT 'act：會計系統、erp：進銷存系統',
  `is_post` int(11) NOT NULL default '0' COMMENT '0：未過帳、1：已過帳',
  `is_delete` int(11) NOT NULL default '0' COMMENT '0：未刪除、1：已刪除',
  `is_backup` int(11) NOT NULL default '0' COMMENT '0：未備份、1：已備份',
  `create_date` datetime default NULL,
  `create_by` varchar(50) default NULL,
  `update_date` datetime default NULL,
  `update_by` varchar(50) default NULL,
  PRIMARY KEY  (`journal_head_id`),
  UNIQUE KEY `ak_ref_no` (`ref_no`)
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 COMMENT='日記帳表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `act_journal_head`
--

LOCK TABLES `act_journal_head` WRITE;
/*!40000 ALTER TABLE `act_journal_head` DISABLE KEYS */;
/*!40000 ALTER TABLE `act_journal_head` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_app_function`
--

DROP TABLE IF EXISTS `frm_app_function`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_app_function` (
  `functionId` bigint(20) NOT NULL auto_increment,
  `funKey` varchar(64) NOT NULL,
  `funName` varchar(128) NOT NULL,
  PRIMARY KEY  (`functionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_app_function`
--

LOCK TABLES `frm_app_function` WRITE;
/*!40000 ALTER TABLE `frm_app_function` DISABLE KEYS */;
/*!40000 ALTER TABLE `frm_app_function` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_app_role`
--

DROP TABLE IF EXISTS `frm_app_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_app_role` (
  `roleId` bigint(20) NOT NULL auto_increment,
  `roleCode` varchar(40) NOT NULL,
  `roleName` varchar(40) NOT NULL,
  `roleDesc` varchar(240) default NULL,
  `status` smallint(6) default NULL,
  `rights` longtext,
  `createDate` datetime default NULL,
  `createBy` varchar(40) default NULL,
  `updateDate` datetime default NULL,
  `updateBy` varchar(40) default NULL,
  PRIMARY KEY  (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_app_role`
--

LOCK TABLES `frm_app_role` WRITE;
/*!40000 ALTER TABLE `frm_app_role` DISABLE KEYS */;
INSERT INTO `frm_app_role` VALUES (-2,'ROLE_COMMON','通用角色','系统默认角色,只有基本权限',1,'PersonInfomation,ProfileForm,AMMeter,SystemSetting',NULL,NULL,'2013-07-08 16:05:18','admin'),(-1,'ROLE_SUPER','超级管理员角色','超级管理员拥有所有权限',1,NULL,'2013-07-08 16:05:19','system','2013-07-08 16:05:19','system');
/*!40000 ALTER TABLE `frm_app_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_app_tips`
--

DROP TABLE IF EXISTS `frm_app_tips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_app_tips` (
  `tipsId` bigint(20) NOT NULL auto_increment,
  `tipsName` varchar(128) default NULL,
  `text` varchar(1000) default NULL,
  `disheight` int(11) default NULL,
  `diswidth` int(11) default NULL,
  `disleft` int(11) default NULL,
  `distop` int(11) default NULL,
  `dislevel` int(11) default NULL,
  `createTime` datetime default NULL,
  `userId` bigint(20) default NULL,
  PRIMARY KEY  (`tipsId`),
  KEY `FKC1555034AABDADA3` (`userId`),
  CONSTRAINT `FKC1555034AABDADA3` FOREIGN KEY (`userId`) REFERENCES `frm_app_user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_app_tips`
--

LOCK TABLES `frm_app_tips` WRITE;
/*!40000 ALTER TABLE `frm_app_tips` DISABLE KEYS */;
/*!40000 ALTER TABLE `frm_app_tips` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_app_user`
--

DROP TABLE IF EXISTS `frm_app_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_app_user` (
  `userId` bigint(20) NOT NULL auto_increment,
  `username` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `employeeId` bigint(20) default NULL,
  `status` smallint(6) NOT NULL,
  `delFlag` smallint(6) NOT NULL,
  `createDate` datetime default NULL,
  `createBy` varchar(255) default NULL,
  `updateDate` datetime default NULL,
  `updateBy` varchar(255) default NULL,
  PRIMARY KEY  (`userId`),
  KEY `FKC155E8C7C1D58B26` (`employeeId`),
  CONSTRAINT `FKC155E8C7C1D58B26` FOREIGN KEY (`employeeId`) REFERENCES `frm_employee` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_app_user`
--

LOCK TABLES `frm_app_user` WRITE;
/*!40000 ALTER TABLE `frm_app_user` DISABLE KEYS */;
INSERT INTO `frm_app_user` VALUES (-1,'system','0',-1,0,1,NULL,NULL,NULL,NULL),(1,'admin','XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=',-1,1,0,NULL,NULL,'2013-07-08 16:05:24','admin');
/*!40000 ALTER TABLE `frm_app_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_company`
--

DROP TABLE IF EXISTS `frm_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_company` (
  `companyId` bigint(20) NOT NULL auto_increment,
  `companyNo` varchar(40) default NULL,
  `companyName` varchar(40) NOT NULL,
  `companyDesc` varchar(200) default NULL,
  `legalPerson` varchar(40) default NULL,
  `setup` datetime default NULL,
  `phone` varchar(40) default NULL,
  `fax` varchar(40) default NULL,
  `site` varchar(100) default NULL,
  `logo` varchar(200) default NULL,
  PRIMARY KEY  (`companyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_company`
--

LOCK TABLES `frm_company` WRITE;
/*!40000 ALTER TABLE `frm_company` DISABLE KEYS */;
/*!40000 ALTER TABLE `frm_company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_department`
--

DROP TABLE IF EXISTS `frm_department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_department` (
  `depId` bigint(20) NOT NULL auto_increment,
  `parentId` bigint(20) NOT NULL,
  `depLevel` int(11) NOT NULL,
  `depCode` varchar(40) default NULL,
  `depName` varchar(40) NOT NULL,
  `depDesc` varchar(200) default NULL,
  `path` varchar(240) default NULL,
  `delFlag` smallint(6) NOT NULL,
  `createDate` datetime default NULL,
  `createBy` varchar(40) default NULL,
  `updateDate` datetime default NULL,
  `updateBy` varchar(40) default NULL,
  PRIMARY KEY  (`depId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_department`
--

LOCK TABLES `frm_department` WRITE;
/*!40000 ALTER TABLE `frm_department` DISABLE KEYS */;
INSERT INTO `frm_department` VALUES (-1,0,0,NULL,'系统使用','系统默认部门，不可删除',NULL,0,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `frm_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_dictionary`
--

DROP TABLE IF EXISTS `frm_dictionary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_dictionary` (
  `dicId` bigint(20) NOT NULL auto_increment,
  `itemName` varchar(64) NOT NULL,
  `itemValue` varchar(128) NOT NULL,
  `sn` smallint(6) NOT NULL,
  `descp` varchar(256) default NULL,
  `proTypeId` bigint(20) default NULL,
  PRIMARY KEY  (`dicId`),
  KEY `FKD6DE6A74A940C4AE` (`proTypeId`),
  CONSTRAINT `FKD6DE6A74A940C4AE` FOREIGN KEY (`proTypeId`) REFERENCES `frm_global_type` (`proTypeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_dictionary`
--

LOCK TABLES `frm_dictionary` WRITE;
/*!40000 ALTER TABLE `frm_dictionary` DISABLE KEYS */;
/*!40000 ALTER TABLE `frm_dictionary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_employee`
--

DROP TABLE IF EXISTS `frm_employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_employee` (
  `ID` bigint(20) NOT NULL auto_increment,
  `empCode` varchar(30) NOT NULL,
  `depId` bigint(20) default NULL,
  `position` varchar(32) default NULL,
  `imagePath` varchar(150) default NULL,
  `officePhone` varchar(30) default NULL,
  `mobilePhone` varchar(30) default NULL,
  `email` varchar(128) default NULL,
  `fax` varchar(32) default NULL,
  `address` varchar(64) default NULL,
  `zip` varchar(32) default NULL,
  `birthday` datetime NOT NULL,
  `sex` smallint(6) NOT NULL,
  `fullname` varchar(128) NOT NULL,
  `accessionDate` datetime NOT NULL,
  `beforeSeniority` varchar(255) default NULL,
  `isLeaving` smallint(6) default NULL,
  `leaveDate` datetime default NULL,
  `remark` varchar(400) default NULL,
  `delflag` smallint(6) NOT NULL,
  `createDate` datetime default NULL,
  `createBy` varchar(40) default NULL,
  `updateDate` datetime default NULL,
  `updateBy` varchar(40) default NULL,
  PRIMARY KEY  (`ID`),
  KEY `FKAE6CC00C37D5612B` (`depId`),
  CONSTRAINT `FKAE6CC00C37D5612B` FOREIGN KEY (`depId`) REFERENCES `frm_department` (`depId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_employee`
--

LOCK TABLES `frm_employee` WRITE;
/*!40000 ALTER TABLE `frm_employee` DISABLE KEYS */;
INSERT INTO `frm_employee` VALUES (-1,'sysDefault',-1,'ddd',NULL,'24809','13811223344',NULL,'4545','555555','5544','2013-07-08 16:05:22',0,'系统用户','2013-07-08 16:05:22',NULL,NULL,NULL,NULL,0,NULL,NULL,'2013-07-08 16:05:22','admin');
/*!40000 ALTER TABLE `frm_employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_file_attach`
--

DROP TABLE IF EXISTS `frm_file_attach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_file_attach` (
  `fileId` bigint(20) NOT NULL auto_increment,
  `fileName` varchar(128) NOT NULL,
  `filePath` varchar(128) NOT NULL,
  `ext` varchar(32) default NULL,
  `fileType` varchar(32) default NULL,
  `note` varchar(1024) default NULL,
  `totalBytes` double NOT NULL,
  `creator` varchar(32) NOT NULL,
  `createtime` datetime NOT NULL,
  PRIMARY KEY  (`fileId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_file_attach`
--

LOCK TABLES `frm_file_attach` WRITE;
/*!40000 ALTER TABLE `frm_file_attach` DISABLE KEYS */;
/*!40000 ALTER TABLE `frm_file_attach` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_fun_url`
--

DROP TABLE IF EXISTS `frm_fun_url`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_fun_url` (
  `urlId` bigint(20) NOT NULL auto_increment,
  `urlPath` varchar(128) NOT NULL,
  `functionId` bigint(20) default NULL,
  PRIMARY KEY  (`urlId`),
  KEY `FKAB242D916E59C57D` (`functionId`),
  CONSTRAINT `FKAB242D916E59C57D` FOREIGN KEY (`functionId`) REFERENCES `frm_app_function` (`functionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_fun_url`
--

LOCK TABLES `frm_fun_url` WRITE;
/*!40000 ALTER TABLE `frm_fun_url` DISABLE KEYS */;
/*!40000 ALTER TABLE `frm_fun_url` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_global_type`
--

DROP TABLE IF EXISTS `frm_global_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_global_type` (
  `proTypeId` bigint(20) NOT NULL auto_increment,
  `typeName` varchar(128) NOT NULL,
  `path` varchar(64) default NULL,
  `depth` int(11) NOT NULL,
  `parentId` bigint(20) default NULL,
  `nodeKey` varchar(64) NOT NULL,
  `catKey` varchar(64) NOT NULL,
  `sn` int(11) NOT NULL,
  PRIMARY KEY  (`proTypeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_global_type`
--

LOCK TABLES `frm_global_type` WRITE;
/*!40000 ALTER TABLE `frm_global_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `frm_global_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_in_message`
--

DROP TABLE IF EXISTS `frm_in_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_in_message` (
  `receiveId` bigint(20) NOT NULL auto_increment,
  `userId` bigint(20) NOT NULL,
  `userFullname` varchar(40) default NULL,
  `readFlag` smallint(6) NOT NULL,
  `delFlag` smallint(6) NOT NULL,
  `messageId` bigint(20) default NULL,
  PRIMARY KEY  (`receiveId`),
  KEY `FK693AB8CBB7ABCBDD` (`messageId`),
  CONSTRAINT `FK693AB8CBB7ABCBDD` FOREIGN KEY (`messageId`) REFERENCES `frm_short_message` (`messageId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_in_message`
--

LOCK TABLES `frm_in_message` WRITE;
/*!40000 ALTER TABLE `frm_in_message` DISABLE KEYS */;
/*!40000 ALTER TABLE `frm_in_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_index_display`
--

DROP TABLE IF EXISTS `frm_index_display`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_index_display` (
  `indexId` bigint(20) NOT NULL auto_increment,
  `portalId` varchar(64) NOT NULL,
  `colNum` int(11) NOT NULL,
  `rowsNum` int(11) NOT NULL,
  `userId` bigint(20) default NULL,
  PRIMARY KEY  (`indexId`),
  KEY `FKC70847B7AABDADA3` (`userId`),
  CONSTRAINT `FKC70847B7AABDADA3` FOREIGN KEY (`userId`) REFERENCES `frm_app_user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_index_display`
--

LOCK TABLES `frm_index_display` WRITE;
/*!40000 ALTER TABLE `frm_index_display` DISABLE KEYS */;
/*!40000 ALTER TABLE `frm_index_display` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_region`
--

DROP TABLE IF EXISTS `frm_region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_region` (
  `regionId` bigint(20) NOT NULL auto_increment,
  `regionName` varchar(128) NOT NULL,
  `regionType` smallint(6) NOT NULL,
  `parentId` bigint(20) default NULL,
  PRIMARY KEY  (`regionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_region`
--

LOCK TABLES `frm_region` WRITE;
/*!40000 ALTER TABLE `frm_region` DISABLE KEYS */;
/*!40000 ALTER TABLE `frm_region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_role_fun`
--

DROP TABLE IF EXISTS `frm_role_fun`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_role_fun` (
  `roleId` bigint(20) NOT NULL,
  `functionId` bigint(20) NOT NULL,
  PRIMARY KEY  (`roleId`,`functionId`),
  KEY `FK576AEB946E59C57D` (`functionId`),
  KEY `FK576AEB94A5685839` (`roleId`),
  CONSTRAINT `FK576AEB94A5685839` FOREIGN KEY (`roleId`) REFERENCES `frm_app_role` (`roleId`),
  CONSTRAINT `FK576AEB946E59C57D` FOREIGN KEY (`functionId`) REFERENCES `frm_app_function` (`functionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_role_fun`
--

LOCK TABLES `frm_role_fun` WRITE;
/*!40000 ALTER TABLE `frm_role_fun` DISABLE KEYS */;
/*!40000 ALTER TABLE `frm_role_fun` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_short_message`
--

DROP TABLE IF EXISTS `frm_short_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_short_message` (
  `messageId` bigint(20) NOT NULL auto_increment,
  `content` varchar(500) NOT NULL,
  `sender` varchar(40) NOT NULL,
  `msgType` smallint(6) NOT NULL,
  `sendTime` datetime NOT NULL,
  `senderId` bigint(20) NOT NULL,
  PRIMARY KEY  (`messageId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_short_message`
--

LOCK TABLES `frm_short_message` WRITE;
/*!40000 ALTER TABLE `frm_short_message` DISABLE KEYS */;
/*!40000 ALTER TABLE `frm_short_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_suggest_box`
--

DROP TABLE IF EXISTS `frm_suggest_box`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_suggest_box` (
  `boxId` bigint(20) NOT NULL auto_increment,
  `subject` varchar(256) NOT NULL,
  `content` varchar(4000) NOT NULL,
  `createtime` datetime default NULL,
  `recUid` bigint(20) default NULL,
  `recFullname` varchar(32) default NULL,
  `senderId` bigint(20) default NULL,
  `senderFullname` varchar(32) default NULL,
  `senderIp` varchar(64) default NULL,
  `phone` varchar(64) default NULL,
  `email` varchar(100) default NULL,
  `isOpen` smallint(6) default NULL,
  `replyContent` varchar(4000) default NULL,
  `replyTime` datetime default NULL,
  `replyId` bigint(20) default NULL,
  `replyFullname` varchar(32) default NULL,
  `status` smallint(6) default NULL,
  `queryPwd` varchar(128) default NULL,
  PRIMARY KEY  (`boxId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_suggest_box`
--

LOCK TABLES `frm_suggest_box` WRITE;
/*!40000 ALTER TABLE `frm_suggest_box` DISABLE KEYS */;
/*!40000 ALTER TABLE `frm_suggest_box` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_sys_config`
--

DROP TABLE IF EXISTS `frm_sys_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_sys_config` (
  `configid` bigint(20) NOT NULL auto_increment,
  `configkey` varchar(64) NOT NULL,
  `configname` varchar(64) NOT NULL,
  `configdesc` varchar(256) default NULL,
  `typename` varchar(32) NOT NULL,
  `datatype` smallint(6) NOT NULL,
  `datavalue` varchar(64) default NULL,
  `typekey` varchar(64) default NULL,
  PRIMARY KEY  (`configid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_sys_config`
--

LOCK TABLES `frm_sys_config` WRITE;
/*!40000 ALTER TABLE `frm_sys_config` DISABLE KEYS */;
INSERT INTO `frm_sys_config` VALUES (1,'codeConfig','captcha','ifNeedCaptcha','CaptchaConfig',2,'2','codeConfig');
/*!40000 ALTER TABLE `frm_sys_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_system_log`
--

DROP TABLE IF EXISTS `frm_system_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_system_log` (
  `logId` bigint(20) NOT NULL auto_increment,
  `username` varchar(128) NOT NULL,
  `userId` bigint(20) NOT NULL,
  `createtime` datetime NOT NULL,
  `exeOperation` varchar(512) NOT NULL,
  PRIMARY KEY  (`logId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_system_log`
--

LOCK TABLES `frm_system_log` WRITE;
/*!40000 ALTER TABLE `frm_system_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `frm_system_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_user_agent`
--

DROP TABLE IF EXISTS `frm_user_agent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_user_agent` (
  `grantId` bigint(20) NOT NULL auto_increment,
  `userId` bigint(20) NOT NULL,
  `fullname` varchar(64) default NULL,
  `grantUId` bigint(20) NOT NULL,
  `grantFullname` varchar(64) default NULL,
  `grantSex` smallint(6) default NULL,
  PRIMARY KEY  (`grantId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_user_agent`
--

LOCK TABLES `frm_user_agent` WRITE;
/*!40000 ALTER TABLE `frm_user_agent` DISABLE KEYS */;
/*!40000 ALTER TABLE `frm_user_agent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_user_role`
--

DROP TABLE IF EXISTS `frm_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_user_role` (
  `userId` bigint(20) NOT NULL,
  `roleId` bigint(20) NOT NULL,
  PRIMARY KEY  (`userId`,`roleId`),
  KEY `FKDADC72ACA5685839` (`roleId`),
  KEY `FKDADC72ACAABDADA3` (`userId`),
  KEY `FK962D46CCA5685839` (`roleId`),
  KEY `FK962D46CCAABDADA3` (`userId`),
  CONSTRAINT `FK962D46CCAABDADA3` FOREIGN KEY (`userId`) REFERENCES `frm_app_user` (`userId`),
  CONSTRAINT `FK962D46CCA5685839` FOREIGN KEY (`roleId`) REFERENCES `frm_app_role` (`roleId`),
  CONSTRAINT `FKDADC72ACA5685839` FOREIGN KEY (`roleId`) REFERENCES `frm_app_role` (`roleId`),
  CONSTRAINT `FKDADC72ACAABDADA3` FOREIGN KEY (`userId`) REFERENCES `frm_app_user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_user_role`
--

LOCK TABLES `frm_user_role` WRITE;
/*!40000 ALTER TABLE `frm_user_role` DISABLE KEYS */;
INSERT INTO `frm_user_role` VALUES (1,-2),(1,-1);
/*!40000 ALTER TABLE `frm_user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-08-01 11:49:09
