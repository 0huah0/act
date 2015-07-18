-- MySQL dump 10.13  Distrib 5.6.21, for Win64 (x86_64)
--
-- Host: localhost    Database: accounting-dev
-- ------------------------------------------------------
-- Server version	5.6.21-log

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
-- Table structure for table `act_accounting_period`
--

DROP TABLE IF EXISTS `act_accounting_period`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `act_accounting_period` (
  `period_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `period_type` varchar(10) NOT NULL,
  `period_y` int(11) NOT NULL,
  `period_hy` int(11) DEFAULT NULL,
  `period_s` int(11) DEFAULT NULL,
  `period_m` int(11) DEFAULT NULL,
  `period_date_s` datetime NOT NULL,
  `period_date_e` datetime NOT NULL,
  `create_date` datetime DEFAULT NULL,
  `create_by` varchar(50) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`period_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `act_accounting_period`
--

LOCK TABLES `act_accounting_period` WRITE;
/*!40000 ALTER TABLE `act_accounting_period` DISABLE KEYS */;
/*!40000 ALTER TABLE `act_accounting_period` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `act_accounting_title`
--

DROP TABLE IF EXISTS `act_accounting_title`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `act_accounting_title` (
  `act_title_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(100) NOT NULL,
  `name` varchar(200) NOT NULL,
  `name_en` varchar(200) DEFAULT NULL,
  `remark` varchar(500) DEFAULT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `level` int(11) DEFAULT NULL COMMENT '1：一級科目(資產、負債、業主權益)、2：二級科目、3：三級科目、4：四級科目',
  `left_or_right` char(1) DEFAULT NULL COMMENT 'l：左方科目(借餘表示正值，貸餘表示負值)、r：右方科目(貸餘表示正值，借餘表示負值)',
  `is_basic` int(11) NOT NULL DEFAULT '0' COMMENT '0：非基礎資料、1：基礎資料',
  `is_delete` int(11) NOT NULL DEFAULT '0' COMMENT '0：未刪除、1：已刪除',
  `create_date` datetime DEFAULT NULL,
  `create_by` varchar(50) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`act_title_id`),
  UNIQUE KEY `ak_code` (`code`),
  KEY `fk_agte_r_agte` (`parent_id`),
  CONSTRAINT `fk_agte_r_agte` FOREIGN KEY (`parent_id`) REFERENCES `act_accounting_title` (`act_title_id`)
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `act_accounting_title`
--

LOCK TABLES `act_accounting_title` WRITE;
/*!40000 ALTER TABLE `act_accounting_title` DISABLE KEYS */;
INSERT INTO `act_accounting_title` VALUES (1,'1','資產','assets','',NULL,1,'L',1,0,'2013-08-24 17:33:06','admin','2014-04-02 16:44:44','admin'),(2,'2','負債','liabilities','',NULL,1,'R',1,0,'2013-08-24 19:03:29','admin','2013-08-24 19:03:29','admin'),(3,'3','業主權益','owners equity','',NULL,1,'R',1,0,'2013-08-25 17:59:31','admin','2013-08-25 17:59:31','admin'),(4,'4','營業收入','operating revenue','',NULL,1,'R',1,0,'2013-08-25 18:05:41','admin','2013-08-25 18:05:41','admin'),(5,'5','營業成本','operating costs','',NULL,1,'L',1,0,'2013-08-25 18:09:04','admin','2013-08-25 18:09:04','admin'),(6,'6','營業費用','operating expenses','',NULL,1,'L',1,0,'2013-08-25 18:09:09','admin','2013-08-25 18:09:09','admin'),(7,'11-12','流動資產','current assets','',1,2,'L',0,0,'2014-04-02 16:45:38','admin','2014-04-02 16:46:43','admin'),(8,'111','現金及約當現金','cash and cash equivalents','',7,3,'L',0,0,'2014-04-02 16:50:38','admin','2014-04-02 16:50:38','admin'),(9,'1111','庫存現金','cash on hand','',8,4,'L',0,0,'2014-04-02 16:51:09','admin','2014-04-02 16:51:09','admin'),(10,'1112','零用金／週轉金','petty cash/revolving funds','',8,4,'L',0,0,'2014-04-02 16:51:45','admin','2014-04-02 16:55:17','admin'),(11,'1113','銀行存款','cash in banks','',8,4,'L',0,0,'2014-04-02 16:52:09','admin','2014-04-02 16:52:09','admin'),(12,'1114','定期存款','deposit account','',8,4,'L',0,0,'2014-04-02 16:52:35','admin','2014-04-02 16:52:35','admin'),(13,'1115','可轉讓定存單','negotiable certificate of deposite','',8,4,'L',0,0,'2014-04-02 16:53:36','admin','2014-04-02 16:53:36','admin'),(14,'1116','在途現金','cash in transit','',8,4,'L',0,0,'2014-04-02 16:54:30','admin','2014-04-02 16:54:30','admin'),(15,'1117','約當現金','cash equivalents','',8,4,'L',0,0,'2014-04-02 16:55:48','admin','2014-04-02 16:55:48','admin'),(16,'1118','其他現金及約當現金','other cash and cash equivalents','',8,4,'L',0,0,'2014-04-02 16:56:26','admin','2014-04-02 16:56:26','admin'),(17,'112','短期投資','short-term investments','',7,3,'L',0,0,'2014-04-02 16:57:03','admin','2014-04-02 16:57:03','admin'),(18,'1121','公平價值變動列入損益之金融資產','financial assets at fair value through income statement','',17,4,'L',0,0,'2014-04-02 17:08:02','admin','2014-04-02 17:08:02','admin'),(19,'1122','備供出售金融資產','financial assets in available-for-sale','',17,4,'L',0,0,'2014-04-02 17:09:03','admin','2014-04-02 17:09:03','admin'),(20,'1123','持有至到期日金融資產','financial assets in held-to-maturity','',17,4,'L',0,0,'2014-04-02 17:09:59','admin','2014-04-02 17:09:59','admin'),(21,'1129','金融資產評價調整','Adjustments for change in value of investment','',17,4,'L',0,0,'2014-04-02 17:10:38','admin','2014-04-02 17:10:38','admin'),(22,'115','避險性金融資產','financial assets for hedging','',7,3,'L',0,0,'2014-04-02 17:11:10','admin','2014-04-02 17:11:10','admin'),(23,'1151','避險之衍生性金融資產','derivative financial assets for hedging','',22,4,'L',0,0,'2014-04-02 17:11:40','admin','2014-04-02 17:11:40','admin'),(24,'1156','避險之衍生性金融資產評價調整','Adjustments for change in value of derivative financial assets for hedging','',22,4,'L',0,0,'2014-04-02 17:12:52','admin','2014-04-02 17:12:52','admin'),(25,'113','應收票據','notes receivable','',7,3,'L',0,0,'2014-04-02 17:15:21','admin','2014-04-02 17:15:21','admin'),(26,'1131','應收票據','notes receivable','',25,4,'L',0,0,'2014-04-02 17:15:48','admin','2014-04-02 17:15:48','admin'),(27,'1132','應收票據貼現','discounted notes receivable','',25,4,'L',0,0,'2014-04-02 17:18:46','admin','2014-04-02 17:18:46','admin'),(28,'114','應收帳款','accounts receivable','',7,3,'L',0,0,'2014-04-02 17:25:47','admin','2014-04-02 17:25:47','admin'),(29,'1137','應收票據－關係人','notes receivable - related parties','',25,4,'L',0,0,'2014-04-02 17:34:02','admin','2014-04-02 17:34:02','admin'),(30,'1138','其他應收票據','other notes receivable','',25,4,'L',0,0,'2014-04-02 17:34:56','admin','2014-04-02 17:34:56','admin'),(31,'1139','備抵呆帳－應收票據','allowance for uncollectible accounts - notes receivable','',25,4,'L',0,0,'2014-04-02 17:35:33','admin','2014-04-02 17:35:33','admin'),(32,'1141','應收帳款','accounts receivable','',28,4,'L',0,0,'2014-04-02 17:36:25','admin','2014-04-02 17:36:25','admin'),(33,'1142','應收分期帳款','installment accounts receivable','',28,4,'L',0,0,'2014-04-02 17:36:54','admin','2014-04-02 17:36:54','admin'),(34,'1147','應收帳款－關係人','accounts receivable - related parties','',28,4,'L',0,0,'2014-04-02 17:38:41','admin','2014-04-02 17:38:41','admin'),(35,'1149','備抵呆帳－應收帳款','allowance for uncollectible accounts - accounts receivable','',28,4,'L',0,0,'2014-04-02 17:39:49','admin','2014-04-02 17:39:49','admin'),(36,'118','其他應收帳款','other receivables','',7,3,'L',0,0,'2014-04-02 17:40:39','admin','2014-04-02 17:40:39','admin'),(37,'1184','應收收益','earned revenue receivable','',36,4,'L',0,0,'2014-04-02 17:41:17','admin','2014-04-02 17:41:17','admin'),(38,'1185','應收退稅款','income tax refund receivable','',36,4,'L',0,0,'2014-04-02 17:41:56','admin','2014-04-02 17:41:56','admin'),(39,'1187','其他應收款－關係人','other receivables - related parties','',36,4,'L',0,0,'2014-04-02 17:42:33','admin','2014-04-02 17:42:33','admin'),(40,'1188','其他應收款－其他','other receivables - other','',36,4,'L',0,0,'2014-04-02 17:43:08','admin','2014-04-02 17:43:08','admin'),(41,'1189','備抵呆帳－其他應收款','allowance for uncollectible accounts - accounts receivable','',36,4,'L',0,0,'2014-04-02 17:43:47','admin','2014-04-02 17:43:47','admin'),(42,'121-122','存貨','inventories','',7,3,'L',0,0,'2014-04-02 17:45:54','admin','2014-04-02 17:45:54','admin'),(43,'1211','商品存貨','merchandise inventory','',42,4,'L',0,0,'2014-04-02 17:46:34','admin','2014-04-02 17:46:34','admin'),(44,'1212','寄銷商品','consigned merchandise','',42,4,'L',0,0,'2014-04-02 17:47:09','admin','2014-04-02 17:47:09','admin'),(45,'1213','在途商品','merchandise in transit','',42,4,'L',0,0,'2014-04-03 08:11:47','admin','2014-04-03 08:11:47','admin'),(46,'1219','備抵存貨跌價損失','allowance to reduce inventory to market','',42,4,'L',0,0,'2014-04-03 08:12:23','admin','2014-04-03 08:12:23','admin'),(47,'1221','製成品','finished goods','',42,4,'L',0,0,'2014-04-03 08:13:04','admin','2014-04-03 08:13:04','admin'),(48,'1222','寄銷製成品','consigned finished goods','',42,4,'L',0,0,'2014-04-03 08:13:40','admin','2014-04-03 08:13:40','admin'),(49,'1223','副產品','by-products','',42,4,'L',0,0,'2014-04-03 08:14:14','admin','2014-04-03 08:14:14','admin'),(50,'1224','在製品','work in process','',42,4,'L',0,0,'2014-04-03 08:14:59','admin','2014-04-03 08:14:59','admin'),(51,'1225','委外加工','work in process - outsourced','',42,4,'L',0,0,'2014-04-03 08:15:38','admin','2014-04-03 08:15:38','admin'),(52,'1226','原料','raw materials','',42,4,'L',0,0,'2014-04-03 08:16:30','admin','2014-04-03 08:16:30','admin'),(53,'1227','物料','supplies','',42,4,'L',0,0,'2014-04-03 08:17:06','admin','2014-04-03 08:17:06','admin'),(54,'1228','在途原物料','materials and supplies in transit','',42,4,'L',0,0,'2014-04-03 08:17:42','admin','2014-04-03 08:17:42','admin'),(55,'1229','備抵存貨跌價損失','allowance to reduce inventory to market','',42,4,'L',0,0,'2014-04-03 08:18:53','admin','2014-04-03 08:18:53','admin'),(56,'125','預付費用','prepaid expenses','',7,3,'L',0,0,'2014-04-03 08:19:41','admin','2014-04-03 08:19:41','admin'),(57,'1251','預付薪資','prepaid payroll','',56,4,'L',0,0,'2014-04-03 08:21:09','admin','2014-04-03 08:21:09','admin'),(58,'1252','預付租金','prepaid rents','',56,4,'L',0,0,'2014-04-03 08:21:39','admin','2014-04-03 08:21:39','admin'),(59,'1253','預付保險費','prepaid insurance','',56,4,'L',0,0,'2014-04-03 08:22:41','admin','2014-04-03 08:22:41','admin'),(60,'1254','用品盤存','office supplies','',56,4,'L',0,0,'2014-04-03 08:23:12','admin','2014-04-03 08:23:12','admin'),(61,'1255','預付所得稅','prepaid income tax','',56,4,'L',0,0,'2014-04-03 08:23:41','admin','2014-04-03 08:23:41','admin'),(62,'1258','其他預付費用','other prepaid expenses','',56,4,'L',0,0,'2014-04-03 08:24:12','admin','2014-04-03 08:24:12','admin'),(63,'126','預付款項','prepayments','',7,3,'L',0,0,'2014-04-03 08:24:35','admin','2014-04-03 08:24:35','admin'),(64,'1261','預付貨款','prepayment for purchases','',63,4,'L',0,0,'2014-04-03 08:25:03','admin','2014-04-03 08:25:03','admin'),(65,'1268','其他預付款項','other prepayments','',63,4,'L',0,0,'2014-04-03 08:25:28','admin','2014-04-03 08:25:28','admin'),(66,'128-129','其他流動資產','other current assets','',7,3,'L',0,0,'2014-04-03 08:26:14','admin','2014-04-03 08:26:14','admin'),(67,'1281','進項稅額','prepaid sales tax','',66,4,'L',0,0,'2014-04-03 08:26:39','admin','2014-04-03 08:26:39','admin'),(68,'1282','留抵稅額','overpaid sales tax','',66,4,'L',0,0,'2014-04-03 08:27:26','admin','2014-04-03 08:27:26','admin'),(69,'1283','暫付款','temporary payments','',66,4,'L',0,0,'2014-04-03 08:30:55','admin','2014-04-03 08:30:55','admin'),(70,'1284','代付款','payment on behalf of others','',66,4,'L',0,0,'2014-04-03 08:31:29','admin','2014-04-03 08:31:29','admin'),(71,'1285','員工借支','advances to employees','',66,4,'L',0,0,'2014-04-03 08:32:03','admin','2014-04-03 08:32:03','admin'),(72,'1286','存出保證金','refundable deposits','',66,4,'L',0,0,'2014-04-03 08:36:30','admin','2014-04-03 08:36:30','admin'),(73,'1287','受限制存款','restricted deposit','',66,4,'L',0,0,'2014-04-03 08:54:17','admin','2014-04-03 08:54:17','admin'),(74,'1291','遞延所得稅資產','deferred income tax assets(current)','',66,4,'L',0,0,'2014-04-03 08:59:20','admin','2014-04-03 08:59:20','admin'),(75,'1292','遞延兌換損失','deferred foreign exchange losses','',66,4,'L',0,0,'2014-04-03 08:59:55','admin','2014-04-03 08:59:55','admin'),(76,'1293','業主(股東)往來','owners’ (stockholders’) current account','',66,4,'L',0,0,'2014-04-03 09:00:30','admin','2014-04-03 09:00:30','admin'),(77,'1294','同業往來','Trades’ current account','',66,4,'L',0,0,'2014-04-03 09:01:17','admin','2014-04-03 09:01:17','admin'),(78,'1298','其他流動資產－其他','other current assets - other','',66,4,'L',0,0,'2014-04-03 09:01:50','admin','2014-04-03 09:01:50','admin'),(79,'13','基金及長期投資','funds and long-term investments','',1,2,'L',0,0,'2014-04-03 09:08:52','admin','2014-04-03 09:08:52','admin'),(80,'131','基金','funds','',79,3,'L',0,0,'2014-04-03 09:11:11','admin','2014-04-03 09:11:11','admin'),(81,'1311','償債基金','redemption fund (or sinking fund)','',80,4,'L',0,0,'2014-04-03 09:11:54','admin','2014-04-03 09:11:54','admin'),(82,'1312','改良及擴充基金','fund for improvement and expansion','',80,4,'L',0,0,'2014-04-03 09:12:28','admin','2014-04-03 09:12:28','admin'),(83,'1313','意外損失準備基金','contingency fund','',80,4,'L',0,0,'2014-04-03 09:14:33','admin','2014-04-03 09:14:33','admin'),(84,'1314','退休基金','pension fund','',80,4,'L',0,0,'2014-04-03 09:35:35','admin','2014-04-03 09:35:35','admin'),(85,'1318','其他基金','other funds','',80,4,'L',0,0,'2014-04-03 09:35:59','admin','2014-04-03 09:35:59','admin'),(86,'132-134','長期投資','long-term investments','',79,3,'L',0,0,'2014-04-03 09:36:51','admin','2014-04-03 09:36:51','admin'),(87,'1321','公平價值變動列入損益之金融資產－非流動','financial assets at fair value through income statement - noncurrent','',86,4,'L',0,0,'2014-04-03 09:38:07','admin','2014-04-03 09:38:07','admin'),(88,'1322','備供出售金融資產－非流動','financial assets in available-for-sale - noncurrent','',86,4,'L',0,0,'2014-04-03 09:39:23','admin','2014-04-03 09:39:23','admin'),(89,'1323','持有至到期日金融資產－非流動','financial asset in held-tomaturity - noncurrent','',86,4,'L',0,0,'2014-04-03 09:40:09','admin','2014-04-03 09:40:09','admin'),(90,'1325','以成本衡量之金融資產','financial assets at cost - noncurrent','',86,4,'L',0,0,'2014-04-03 09:40:58','admin','2014-04-03 09:40:58','admin'),(91,'1329','金融資產評價調整','Adjustments for change in value of investment','',86,4,'L',0,0,'2014-04-03 09:41:36','admin','2014-04-03 09:41:36','admin'),(92,'1331','採權益法之長期股權投資','long-term investments at equity','',86,4,'L',0,0,'2014-04-03 09:52:15','admin','2014-04-03 09:52:15','admin'),(93,'1341','長期不動產投資','longterm real estate investments','',86,4,'L',0,0,'2014-04-03 09:53:02','admin','2014-04-03 09:53:02','admin'),(94,'1345','人壽保險現金解約價值','cash surrender value','',86,4,'L',0,0,'2014-04-03 09:53:38','admin','2014-04-03 09:53:38','admin'),(95,'1349','其他長期投資','other','',86,4,'L',0,0,'2014-04-03 09:54:43','admin','2014-04-03 09:54:43','admin'),(96,'14-15','固定資產','Fixed assets','',1,2,'L',0,0,'2014-04-03 09:55:15','admin','2014-04-03 09:55:15','admin'),(97,'141','土地','land','',96,3,'L',0,0,'2014-04-03 09:55:51','admin','2014-04-03 09:55:51','admin'),(98,'1411','土地','land','',97,4,'L',0,0,'2014-04-03 09:56:19','admin','2014-04-03 09:56:19','admin'),(99,'1417','土地－重估增值','land - revaluation increments','',97,4,'L',0,0,'2014-04-03 10:06:15','admin','2014-04-03 10:06:15','admin'),(100,'1419','累計減損－土地','accumulated impairment - land','',97,4,'L',0,0,'2014-04-03 10:10:14','admin','2014-04-03 10:10:14','admin'),(101,'142','土地改良物','land improvements','',96,3,'L',0,0,'2014-04-03 10:10:58','admin','2014-04-03 10:10:58','admin'),(102,'1421','土地改良物','land improvements','',101,4,'L',0,0,'2014-04-03 17:43:59','admin','2014-04-03 17:43:59','admin'),(103,'1427','土地改良物－重估增值','land improvements - revaluation increments','',101,4,'L',0,0,'2014-04-03 17:44:54','admin','2014-04-03 17:44:54','admin'),(104,'1428','累計折舊－土地改良物','accumulated depreciation - land improvements','',101,4,'L',0,0,'2014-04-03 17:45:52','admin','2014-04-03 17:45:52','admin'),(105,'1429','累計減損－土地改良物','accumulated impairment - land improvements','',101,4,'L',0,0,'2014-04-03 17:46:42','admin','2014-04-03 17:46:42','admin'),(106,'143','房屋及建築','buildings','',96,3,'L',0,0,'2014-04-03 17:52:54','admin','2014-04-03 17:52:54','admin'),(107,'1431','房屋及建築','buildings','',106,4,'L',0,0,'2014-04-03 17:53:27','admin','2014-04-03 17:53:27','admin'),(108,'21-22','流動負債','current liabilities','',2,2,'R',0,0,'2014-11-09 21:36:22','admin','2014-11-09 21:36:22','admin'),(109,'211','短期借款','short-term debt','',108,3,'R',0,0,'2014-11-09 21:36:54','admin','2014-11-09 21:36:54','admin'),(110,'2111','銀行透支','bank overdraft','',109,4,'R',0,0,'2014-11-09 21:37:45','admin','2014-11-09 21:37:45','admin'),(111,'2112','銀行借款','bank loan','',109,4,'R',0,0,'2014-11-09 21:38:13','admin','2014-11-09 21:38:13','admin'),(112,'212','應付短期票券','short-term notes and bills payable','',108,3,'R',0,0,'2014-11-09 21:38:46','admin','2014-11-09 21:38:46','admin'),(113,'2121','應付商業本票','commercial paper payable','',112,4,'R',0,0,'2014-11-09 21:39:20','admin','2014-11-09 21:39:20','admin'),(114,'2122','銀行承兌匯票','','',112,4,'R',0,0,'2014-11-09 21:39:40','admin','2014-11-09 21:39:40','admin'),(115,'23','長期負債','long-term liabilities','',2,2,'R',0,0,'2014-11-09 21:40:23','admin','2014-11-09 21:40:23','admin'),(116,'231','應付公司債','bonds payable','',115,3,'R',0,0,'2014-11-09 21:40:43','admin','2014-11-09 21:40:43','admin'),(117,'2311','應付公司債','bonds payable','',116,4,'R',0,0,'2014-11-09 21:41:05','admin','2014-11-09 21:41:05','admin'),(118,'2312','應付公司債溢(折)價','premium(discount) on bonds payable','',116,4,'R',0,0,'2014-11-09 21:41:34','admin','2014-11-09 21:41:34','admin'),(119,'232','長期借款','long-term debt payable','',115,3,'R',0,0,'2014-11-09 21:42:03','admin','2014-11-09 21:42:03','admin'),(120,'2321','長期銀行借款','long-term debt payable – bank','',119,4,'R',0,0,'2014-11-09 21:42:31','admin','2014-11-09 21:42:31','admin'),(121,'2322','長期借款－業主','longterm debt payable – owners','',119,4,'R',0,0,'2014-11-09 21:43:04','admin','2014-11-09 21:43:04','admin'),(122,'31','資本','capital','',3,2,'R',0,0,'2014-11-09 21:43:37','admin','2014-11-09 21:43:37','admin'),(123,'311','資本(或股本)','capital','',122,3,'R',0,0,'2014-11-09 21:44:02','admin','2014-11-09 21:44:02','admin'),(124,'3111','普通股股本','capital – common stock','',123,4,'R',0,0,'2014-11-09 21:44:29','admin','2014-11-09 21:44:29','admin'),(125,'3112','特別股股本','capital – preferred stock','',123,4,'R',0,0,'2014-11-09 21:44:59','admin','2014-11-09 21:44:59','admin'),(126,'32','資本公積','additional paid-in capital','',3,2,'R',0,0,'2014-11-09 21:45:29','admin','2014-11-09 21:45:29','admin'),(127,'321','股票溢價','additional paid-in capital in excess of par','',126,3,'R',0,0,'2014-11-09 21:46:04','admin','2014-11-09 21:46:04','admin'),(128,'3211','普通股股票溢價','additional paid-in capital in excess of par- common stock','',127,4,'R',0,0,'2014-11-09 21:46:29','admin','2014-11-09 21:46:29','admin'),(129,'3212','特別股股票溢價','additional paid-in capital in excess of par- preferred stock','',127,4,'R',0,0,'2014-11-09 21:46:54','admin','2014-11-09 21:46:54','admin'),(130,'41','銷貨收入','sales revenue','',4,2,'R',0,0,'2014-11-09 21:47:21','admin','2014-11-09 21:47:21','admin'),(131,'411','銷貨收入','sales revenue','',130,3,'R',0,0,'2014-11-09 21:47:41','admin','2014-11-09 21:47:41','admin'),(132,'4111','銷貨收入','sales revenue','',131,4,'R',0,0,'2014-11-09 21:48:00','admin','2014-11-09 21:48:00','admin'),(133,'4112','分期付款銷貨收入','installment sales revenue','',131,4,'R',0,0,'2014-11-09 21:48:23','admin','2014-11-09 21:48:23','admin'),(134,'417','銷貨退回','sales return','',130,3,'R',0,0,'2014-11-09 21:48:50','admin','2014-11-09 21:48:50','admin'),(135,'4171','銷貨退回','sales return','',134,4,'R',0,0,'2014-11-09 21:49:09','admin','2014-11-09 21:49:09','admin'),(136,'46','勞務收入','service revenue','',4,2,'R',0,0,'2014-11-09 21:49:40','admin','2014-11-09 21:49:40','admin'),(137,'461','勞務收入','service revenue','',136,3,'R',0,0,'2014-11-09 21:50:09','admin','2014-11-09 21:50:09','admin'),(138,'4611','勞務收入','service revenue','',137,4,'R',0,0,'2014-11-09 21:50:27','admin','2014-11-09 21:50:27','admin'),(139,'51','銷貨成本','cost of goods sold','',5,2,'L',0,0,'2014-11-09 21:51:12','admin','2014-11-09 21:51:12','admin'),(140,'511','銷貨成本','cost of goods sold','',139,3,'L',0,0,'2014-11-09 21:51:34','admin','2014-11-09 21:51:34','admin'),(141,'5111','銷貨成本','cost of goods sold','',140,4,'L',0,0,'2014-11-09 21:51:52','admin','2014-11-09 21:51:52','admin'),(142,'5112','分期付款銷貨成本','installment cost of goods sold','',140,4,'L',0,0,'2014-11-09 21:52:16','admin','2014-11-09 21:52:16','admin'),(143,'512','進貨','purchases','',139,3,'L',0,0,'2014-11-09 21:52:44','admin','2014-11-09 21:52:44','admin'),(144,'5121','進貨','purchases','',143,4,'L',0,0,'2014-11-09 21:53:12','admin','2014-11-09 21:53:12','admin'),(145,'5122','進貨費用','purchase expenses','',143,4,'L',0,0,'2014-11-09 21:53:36','admin','2014-11-09 21:53:36','admin'),(146,'56','勞務成本','service costs','',5,2,'L',0,0,'2014-11-09 21:54:14','admin','2014-11-09 21:54:14','admin'),(147,'561','勞務成本','service costs','',146,3,'L',0,0,'2014-11-09 21:54:40','admin','2014-11-09 21:54:40','admin'),(148,'5611','勞務成本','service costs','',147,4,'L',0,0,'2014-11-09 21:55:02','admin','2014-11-09 21:55:02','admin'),(149,'61','推銷費用','selling expenses','',6,2,'L',0,0,'2014-11-09 21:55:35','admin','2014-11-09 21:55:35','admin'),(150,'615-618','推銷費用','selling expenses','',149,3,'L',0,0,'2014-11-09 21:55:57','admin','2014-11-09 21:55:57','admin'),(151,'6151','薪資支出','payroll expense','',150,4,'L',0,0,'2014-11-09 21:56:33','admin','2014-11-09 21:56:33','admin'),(152,'6152','租金支出','rent expense','',150,4,'L',0,0,'2014-11-09 21:56:56','admin','2014-11-09 21:56:56','admin'),(153,'62','管理及總務費用','general & administrative expenses','',6,2,'L',0,0,'2014-11-09 21:57:24','admin','2014-11-09 21:57:24','admin'),(154,'625-628','管理及總務費用','general & administrative expenses','',153,3,'L',0,0,'2014-11-09 21:57:57','admin','2014-11-09 21:57:57','admin'),(155,'6251','薪資支出','payroll expense','',154,4,'L',0,0,'2014-11-09 21:58:17','admin','2014-11-09 21:58:17','admin'),(156,'6252','租金支出','rent expense','',154,4,'L',0,0,'2014-11-09 21:58:43','admin','2014-11-09 21:58:43','admin'),(157,'7','營業外收益','non-operating revenue','',NULL,1,'R',1,0,'2013-08-25 18:09:09','admin','2013-08-25 18:09:09','admin'),(158,'71-74','利息收入','interest revenue','',157,2,'R',0,0,'2014-11-09 22:05:18','admin','2014-11-09 22:05:18','admin'),(159,'711','利息收入','interest revenue/income','',158,3,'R',0,0,'2014-11-09 22:05:56','admin','2014-11-09 22:05:56','admin'),(160,'7111','投資收益','investment income','',159,4,'R',0,0,'2014-11-09 22:06:19','admin','2014-11-09 22:06:19','admin'),(161,'714','營業外收益','non-operating revenue','',158,3,'R',0,0,'2014-11-09 22:06:56','admin','2014-11-09 22:06:56','admin'),(162,'7141','金融資產評價利益','Gain on valuation of financial asset','',161,4,'R',0,0,'2014-11-09 22:07:31','admin','2014-11-09 22:07:31','admin'),(163,'7142','金融負債評價利益','Gain on valuation of financial liability','',161,4,'R',0,0,'2014-11-09 22:08:02','admin','2014-11-09 22:08:02','admin'),(164,'75-78','營業外費損','non-operating expenses','',157,2,'L',0,0,'2014-11-09 22:09:46','admin','2014-11-09 22:09:46','admin'),(165,'751','利息費用','interest expense','',164,3,'L',0,0,'2014-11-09 22:10:06','admin','2014-11-09 22:10:06','admin'),(166,'7511','利息費用','interest expense','',165,4,'L',0,0,'2014-11-09 22:10:27','admin','2014-11-09 22:10:27','admin'),(167,'752','負債性特別股股息','dividends on preferred stock liabilities','',164,3,'L',0,0,'2014-11-09 22:10:55','admin','2014-11-09 22:10:55','admin'),(168,'7521','負債性特別股股息','dividends on preferred stock liabilities','',167,4,'L',0,0,'2014-11-09 22:11:18','admin','2014-11-09 22:11:18','admin');
/*!40000 ALTER TABLE `act_accounting_title` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `act_journal_detail`
--

DROP TABLE IF EXISTS `act_journal_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `act_journal_detail` (
  `journal_detail_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ref_no` varchar(100) NOT NULL,
  `item_no` int(11) DEFAULT NULL,
  `code` varchar(100) NOT NULL,
  `name` varchar(200) NOT NULL,
  `debit_amount` double(20,10) DEFAULT NULL,
  `credit_amount` double(20,10) DEFAULT NULL,
  `brief` varchar(500) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `create_by` varchar(50) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`journal_detail_id`),
  KEY `fk_jldl_r_agte_idx` (`code`),
  KEY `fk_jldl_r_jlhd_idx` (`ref_no`),
  CONSTRAINT `fk_jldl_r_agte` FOREIGN KEY (`code`) REFERENCES `act_accounting_title` (`code`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_jldl_r_jlhd` FOREIGN KEY (`ref_no`) REFERENCES `act_journal_head` (`ref_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `act_journal_detail`
--

LOCK TABLES `act_journal_detail` WRITE;
/*!40000 ALTER TABLE `act_journal_detail` DISABLE KEYS */;
INSERT INTO `act_journal_detail` VALUES (1,'20141101001',NULL,'1111','庫存現金',10000.0000000000,0.0000000000,'',NULL,NULL,NULL,NULL),(2,'20141101001',NULL,'2111','銀行透支',0.0000000000,10000.0000000000,'',NULL,NULL,NULL,NULL),(3,'20141101002',NULL,'3111','普通股股本',0.0000000000,20000.0000000000,'',NULL,NULL,NULL,NULL),(4,'20141101002',NULL,'1111','庫存現金',20000.0000000000,0.0000000000,'',NULL,NULL,NULL,NULL),(5,'20141102001',NULL,'2311','應付公司債',0.0000000000,12345.0000000000,'',NULL,NULL,NULL,NULL),(6,'20141102001',NULL,'6151','薪資支出',12345.0000000000,0.0000000000,'',NULL,NULL,NULL,NULL),(7,'20141102002',NULL,'1131','應收票據',789.0000000000,0.0000000000,'',NULL,NULL,NULL,NULL),(8,'20141102002',NULL,'1113','銀行存款',0.0000000000,789.0000000000,'',NULL,NULL,NULL,NULL),(9,'20141103001',NULL,'4111','銷貨收入',0.0000000000,987654.0000000000,'',NULL,NULL,NULL,NULL),(10,'20141103001',NULL,'1141','應收帳款',987654.0000000000,0.0000000000,'',NULL,NULL,NULL,NULL),(11,'20141103002',NULL,'1226','原料',9510.0000000000,0.0000000000,'',NULL,NULL,NULL,NULL),(12,'20141103002',NULL,'1111','庫存現金',0.0000000000,9510.0000000000,'',NULL,NULL,NULL,NULL),(13,'20141104001',NULL,'5111','銷貨成本',75310.0000000000,0.0000000000,'',NULL,NULL,NULL,NULL),(14,'20141104001',NULL,'2111','銀行透支',0.0000000000,75310.0000000000,'',NULL,NULL,NULL,NULL),(15,'20141104002',NULL,'7111','投資收益',0.0000000000,4260.0000000000,'',NULL,NULL,NULL,NULL),(16,'20141104002',NULL,'1311','償債基金',4260.0000000000,0.0000000000,'',NULL,NULL,NULL,NULL),(17,'20141105001',NULL,'7511','利息費用',9820.0000000000,0.0000000000,'',NULL,NULL,NULL,NULL),(18,'20141105001',NULL,'2112','銀行借款',0.0000000000,9820.0000000000,'',NULL,NULL,NULL,NULL),(19,'123',NULL,'1111','庫存現金',1230.0000000000,0.0000000000,'',NULL,NULL,NULL,NULL),(20,'123',NULL,'7111','投資收益',0.0000000000,1530.0000000000,'',NULL,NULL,NULL,NULL),(21,'20141216001',NULL,'1114','定期存款',1030.0000000000,0.0000000000,'',NULL,NULL,NULL,NULL),(22,'20141216001',NULL,'5111','銷貨成本',0.0000000000,1030.0000000000,'',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `act_journal_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `act_journal_detail_backup`
--

DROP TABLE IF EXISTS `act_journal_detail_backup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `act_journal_detail_backup` (
  `journal_detail_id` bigint(20) DEFAULT NULL,
  `ref_no` varchar(100) NOT NULL,
  `item_no` int(11) DEFAULT NULL,
  `code` varchar(100) NOT NULL,
  `name` varchar(200) NOT NULL,
  `debit_amount` double(20,10) DEFAULT NULL,
  `credit_amount` double(20,10) DEFAULT NULL,
  `brief` varchar(500) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `create_by` varchar(50) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='日記帳備份明細表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `act_journal_detail_backup`
--

LOCK TABLES `act_journal_detail_backup` WRITE;
/*!40000 ALTER TABLE `act_journal_detail_backup` DISABLE KEYS */;
/*!40000 ALTER TABLE `act_journal_detail_backup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `act_journal_head`
--

DROP TABLE IF EXISTS `act_journal_head`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `act_journal_head` (
  `journal_head_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ref_no` varchar(100) NOT NULL COMMENT '傳票/發票開票/結帳編號。',
  `ref_date` date NOT NULL COMMENT '傳票/發票開票/結帳日期。',
  `brief` varchar(500) DEFAULT NULL,
  `journal_type` int(11) NOT NULL COMMENT '1：日常分錄、2：調整分錄、3：更新分錄、4：結清分錄、5：結轉分錄、6：開帳分錄。',
  `data_from` varchar(10) DEFAULT NULL COMMENT 'act：會計系統、erp：進銷存系統。',
  `is_post` int(11) NOT NULL DEFAULT '0' COMMENT '0：未過帳、1：已過帳。',
  `is_delete` int(11) NOT NULL DEFAULT '0' COMMENT '0：未刪除、1：已刪除。',
  `is_backup` int(11) NOT NULL DEFAULT '0' COMMENT '0：未備份、1：已備份。',
  `create_date` datetime DEFAULT NULL,
  `create_by` varchar(50) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`journal_head_id`),
  UNIQUE KEY `ak_ref_no` (`ref_no`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='日記帳表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `act_journal_head`
--

LOCK TABLES `act_journal_head` WRITE;
/*!40000 ALTER TABLE `act_journal_head` DISABLE KEYS */;
INSERT INTO `act_journal_head` VALUES (1,'20141101001','2014-11-01','20141101001',1,'act',1,0,0,'2014-11-09 22:13:20','admin','2014-11-09 22:29:12','admin'),(2,'20141101002','2014-11-01','20141101002',1,'act',1,0,0,'2014-11-09 22:15:01','admin','2014-11-09 22:29:12','admin'),(3,'20141102001','2014-11-02','20141102001',2,'act',1,0,0,'2014-11-09 22:16:11','admin','2014-11-09 22:29:12','admin'),(4,'20141102002','2014-11-02','20141102002',3,'act',1,0,0,'2014-11-09 22:17:00','admin','2014-11-09 22:29:12','admin'),(5,'20141103001','2014-11-03','20141103001',1,'act',1,0,0,'2014-11-09 22:22:40','admin','2014-11-09 22:29:12','admin'),(6,'20141103002','2014-11-03','20141103002',2,'act',1,0,0,'2014-11-09 22:24:14','admin','2014-11-09 22:29:12','admin'),(7,'20141104001','2014-11-04','20141104001',1,'act',1,0,0,'2014-11-09 22:26:05','admin','2014-11-09 22:29:12','admin'),(8,'20141104002','2014-11-04','20141104002',1,'act',1,0,0,'2014-11-09 22:28:15','admin','2014-11-09 22:29:12','admin'),(9,'20141105001','2014-11-05','20141105001',2,'act',1,0,0,'2014-11-09 22:29:09','admin','2014-11-09 22:29:12','admin'),(10,'123','2014-12-09','123456',1,'act',1,0,0,'2014-12-09 16:19:41','admin','2014-12-09 17:39:14','admin'),(11,'20141216001','2014-12-16','20141216001-1',1,'act',1,0,0,'2014-12-16 17:02:36','admin','2014-12-19 17:55:02','admin');
/*!40000 ALTER TABLE `act_journal_head` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `act_journal_head_backup`
--

DROP TABLE IF EXISTS `act_journal_head_backup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `act_journal_head_backup` (
  `journal_head_id` bigint(20) DEFAULT NULL,
  `ref_no` varchar(100) NOT NULL,
  `ref_date` date NOT NULL,
  `brief` varchar(500) DEFAULT NULL,
  `journal_type` int(11) NOT NULL COMMENT '1：日常分錄、2：調整分錄、3：更新分錄、4：結帳分錄(結清)、5：結帳分錄(結轉)、6：開帳分錄',
  `data_from` varchar(10) DEFAULT NULL COMMENT 'act：會計系統、erp：進銷存系統',
  `is_post` int(11) NOT NULL DEFAULT '0' COMMENT '0：未過帳、1：已過帳',
  `is_delete` int(11) NOT NULL DEFAULT '0' COMMENT '0：未刪除、1：已刪除',
  `is_backup` int(11) NOT NULL DEFAULT '0' COMMENT '0：未備份、1：已備份',
  `create_date` datetime DEFAULT NULL,
  `create_by` varchar(50) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='日記帳備份主表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `act_journal_head_backup`
--

LOCK TABLES `act_journal_head_backup` WRITE;
/*!40000 ALTER TABLE `act_journal_head_backup` DISABLE KEYS */;
/*!40000 ALTER TABLE `act_journal_head_backup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_app_function`
--

DROP TABLE IF EXISTS `frm_app_function`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_app_function` (
  `functionId` bigint(20) NOT NULL AUTO_INCREMENT,
  `funKey` varchar(64) NOT NULL,
  `funName` varchar(128) NOT NULL,
  PRIMARY KEY (`functionId`)
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
  `roleId` bigint(20) NOT NULL AUTO_INCREMENT,
  `roleCode` varchar(40) NOT NULL,
  `roleName` varchar(40) NOT NULL,
  `roleDesc` varchar(240) DEFAULT NULL,
  `status` smallint(6) DEFAULT NULL,
  `rights` longtext,
  `createDate` datetime DEFAULT NULL,
  `createBy` varchar(40) DEFAULT NULL,
  `updateDate` datetime DEFAULT NULL,
  `updateBy` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_app_role`
--

LOCK TABLES `frm_app_role` WRITE;
/*!40000 ALTER TABLE `frm_app_role` DISABLE KEYS */;
INSERT INTO `frm_app_role` VALUES (-2,'ROLE_COMMON','通用角色','系统默认角色,只有基本权限_',1,'PersonInfomation,ProfileForm,AMMeter,SystemSetting',NULL,NULL,'2013-09-30 08:59:55','admin'),(-1,'ROLE_SUPER','超級管理員角色','超级管理员拥有所有权限',1,NULL,'2013-07-08 16:05:19','system','2013-07-08 16:05:19','system'),(2,'用這個修改為你想要的','用這個修改為你想要的','用這個修改為你想要的',1,NULL,'2013-09-30 09:20:05','admin','2013-09-30 15:28:24','admin'),(3,'ROLE_ADMIN','行政主管','行政主管',1,'PersonInfomation,ProfileForm,Accounting,AccountingTitleView,_AccountingTitleAdd,_AccountingTitleDel,_AccountingTitleEdit,Journal,JournalView,_JournalAdd,_JournalDel,_JournalEdit,JournalPostView,MemberManager,AccountingTitleExport,ReportActTitleSum,ReportJournal,ReportActTitle,MemberBlackView,MemberBlackView1,MemberBlackView2,MemberBlackView3,JournalAction,JournalRestoreView,JournalBackupView,JournalClearView','2013-10-06 17:24:11','admin','2013-10-06 17:24:11','admin'),(8,'ROLE_ACCOUNTANT','會計人員','會計人員',1,'PersonInfomation,ProfileForm,Accounting,AccountingTitleView,_AccountingTitleAdd,_AccountingTitleDel,_AccountingTitleEdit,Journal,JournalView,_JournalAdd,_JournalDel,_JournalEdit,JournalPostView,JournalAction,JournalRestoreView,JournalBackupView,JournalClearView','2013-11-13 18:32:58','admin','2013-11-13 18:38:48','admin');
/*!40000 ALTER TABLE `frm_app_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_app_tips`
--

DROP TABLE IF EXISTS `frm_app_tips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_app_tips` (
  `tipsId` bigint(20) NOT NULL AUTO_INCREMENT,
  `tipsName` varchar(128) DEFAULT NULL,
  `text` varchar(1000) DEFAULT NULL,
  `disheight` int(11) DEFAULT NULL,
  `diswidth` int(11) DEFAULT NULL,
  `disleft` int(11) DEFAULT NULL,
  `distop` int(11) DEFAULT NULL,
  `dislevel` int(11) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`tipsId`),
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
  `userId` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `employeeId` bigint(20) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `delFlag` smallint(6) NOT NULL,
  `createDate` datetime DEFAULT NULL,
  `createBy` varchar(255) DEFAULT NULL,
  `updateDate` datetime DEFAULT NULL,
  `updateBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  KEY `FKC155E8C7C1D58B26` (`employeeId`),
  CONSTRAINT `FKC155E8C7C1D58B26` FOREIGN KEY (`employeeId`) REFERENCES `frm_employee` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_app_user`
--

LOCK TABLES `frm_app_user` WRITE;
/*!40000 ALTER TABLE `frm_app_user` DISABLE KEYS */;
INSERT INTO `frm_app_user` VALUES (-1,'system','0',-1,0,1,NULL,NULL,NULL,NULL),(1,'admin','XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=',-1,1,0,NULL,NULL,'2013-10-19 15:01:16','admin'),(2,'__2_312_系统用户','XgcEEXO4IRNd5inWVoCLhCC9ln5VzX605TXzr9qnve0=',-1,0,1,'2013-08-15 14:36:21','admin','2014-03-18 14:37:30','admin'),(3,'321','jSPPbIboNKeqbt7VTCbOK7LnSQNTjGG91dIZeZerL3I=',2,1,0,'2013-09-28 20:20:20','admin',NULL,NULL),(4,'123','pmWkWSBCL51Bfkhn79xPuKBKHz//H6B+mY6G9/eieuM=',3,1,0,'2013-10-18 17:32:56','admin',NULL,NULL),(5,'__5_test_系统用户','n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=',-1,0,1,'2013-10-18 18:16:42','123','2013-10-19 14:42:11','123'),(6,'accountant01','ZbCCb9CTOCUEsvG4nAJ1OKdVaPmlwKOZAu0lM2zJffE=',5,1,0,'2013-11-12 19:10:51','admin',NULL,NULL),(7,'accountant02','ZbCCb9CTOCUEsvG4nAJ1OKdVaPmlwKOZAu0lM2zJffE=',6,1,0,'2013-11-12 19:11:57','admin',NULL,NULL),(8,'accountant03','ZbCCb9CTOCUEsvG4nAJ1OKdVaPmlwKOZAu0lM2zJffE=',7,1,0,'2013-11-13 19:04:52','admin',NULL,NULL),(9,'__9_test11_系统用户','ZbCCb9CTOCUEsvG4nAJ1OKdVaPmlwKOZAu0lM2zJffE=',-1,0,1,'2014-03-18 13:34:06','admin','2014-03-18 14:37:30','admin');
/*!40000 ALTER TABLE `frm_app_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_company`
--

DROP TABLE IF EXISTS `frm_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_company` (
  `companyId` bigint(20) NOT NULL AUTO_INCREMENT,
  `companyNo` varchar(40) DEFAULT NULL,
  `companyName` varchar(40) NOT NULL,
  `companyDesc` varchar(200) DEFAULT NULL,
  `legalPerson` varchar(40) DEFAULT NULL,
  `setup` datetime DEFAULT NULL,
  `phone` varchar(40) DEFAULT NULL,
  `fax` varchar(40) DEFAULT NULL,
  `site` varchar(100) DEFAULT NULL,
  `logo` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`companyId`)
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
  `depId` bigint(20) NOT NULL AUTO_INCREMENT,
  `parentId` bigint(20) NOT NULL,
  `depLevel` int(11) NOT NULL,
  `depCode` varchar(40) DEFAULT NULL,
  `depName` varchar(40) NOT NULL,
  `depDesc` varchar(200) DEFAULT NULL,
  `path` varchar(240) DEFAULT NULL,
  `delFlag` smallint(6) NOT NULL,
  `createDate` datetime DEFAULT NULL,
  `createBy` varchar(40) DEFAULT NULL,
  `updateDate` datetime DEFAULT NULL,
  `updateBy` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`depId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_department`
--

LOCK TABLES `frm_department` WRITE;
/*!40000 ALTER TABLE `frm_department` DISABLE KEYS */;
INSERT INTO `frm_department` VALUES (-1,0,0,NULL,'系统使用','系统默认部门，不可删除',NULL,0,NULL,NULL,NULL,NULL),(1,0,2,NULL,'行政部門','處理一般會計作業','0.1.',0,'2013-08-15 14:32:15','admin','2013-08-15 14:32:15','admin'),(2,0,2,NULL,'技術部門','執行工廠現場作業','0.1.2.',1,'2013-08-15 14:40:22','admin','2013-08-15 14:42:12','admin'),(3,0,2,NULL,'adasaaa','','0.1.3.',1,'2013-08-15 14:45:52','admin','2013-11-12 19:05:00','admin'),(6,0,2,NULL,'test1','ttt1','0.1.6.',1,'2013-09-29 17:17:54','admin','2013-09-29 17:18:18','admin'),(7,3,2,NULL,'test','tst','0.1.3.7.',1,'2013-09-30 09:21:59','admin','2013-09-30 09:22:11','admin'),(8,3,2,NULL,'aab','','0.1.3.8.',1,'2013-10-18 17:31:57','admin','2013-11-12 19:04:42','admin'),(9,0,2,NULL,'abc1','abc2','0.9.',1,'2013-11-12 19:05:23','admin','2013-11-12 19:07:33','admin'),(10,9,2,NULL,'def3','def4','0.9.10.',1,'2013-11-12 19:05:40','admin','2013-11-12 19:07:26','admin'),(11,0,2,NULL,'管理部門','查詢並導出會計報表','0.11.',0,'2013-11-12 19:07:47','admin','2013-11-12 19:07:47','admin'),(12,1,2,NULL,'行政一部','','0.1.12.',0,'2013-11-12 19:08:37','admin','2013-11-12 19:08:37','admin'),(13,1,2,NULL,'行政二部','','0.1.13.',0,'2013-11-12 19:08:51','admin','2013-11-12 19:08:51','admin');
/*!40000 ALTER TABLE `frm_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_dictionary`
--

DROP TABLE IF EXISTS `frm_dictionary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_dictionary` (
  `dicId` bigint(20) NOT NULL AUTO_INCREMENT,
  `itemName` varchar(64) NOT NULL,
  `itemValue` varchar(128) NOT NULL,
  `sn` smallint(6) NOT NULL,
  `descp` varchar(256) DEFAULT NULL,
  `proTypeId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`dicId`),
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
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `empCode` varchar(30) NOT NULL,
  `depId` bigint(20) DEFAULT NULL,
  `position` varchar(32) DEFAULT NULL,
  `imagePath` varchar(150) DEFAULT NULL,
  `officePhone` varchar(30) DEFAULT NULL,
  `mobilePhone` varchar(30) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `fax` varchar(32) DEFAULT NULL,
  `address` varchar(64) DEFAULT NULL,
  `zip` varchar(32) DEFAULT NULL,
  `birthday` datetime NOT NULL,
  `sex` smallint(6) NOT NULL,
  `fullname` varchar(128) NOT NULL,
  `accessionDate` datetime NOT NULL,
  `beforeSeniority` varchar(255) DEFAULT NULL,
  `isLeaving` smallint(6) DEFAULT NULL,
  `leaveDate` datetime DEFAULT NULL,
  `remark` varchar(400) DEFAULT NULL,
  `delflag` smallint(6) NOT NULL,
  `createDate` datetime DEFAULT NULL,
  `createBy` varchar(40) DEFAULT NULL,
  `updateDate` datetime DEFAULT NULL,
  `updateBy` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FKAE6CC00C37D5612B` (`depId`),
  CONSTRAINT `FKAE6CC00C37D5612B` FOREIGN KEY (`depId`) REFERENCES `frm_department` (`depId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_employee`
--

LOCK TABLES `frm_employee` WRITE;
/*!40000 ALTER TABLE `frm_employee` DISABLE KEYS */;
INSERT INTO `frm_employee` VALUES (-1,'sysDefault',-1,'ddd','','24809','13811223344','kingsu@gmail.com','4545','66666','5544','2013-07-08 16:05:22',1,'系统用户','2013-07-08 16:05:22',NULL,NULL,NULL,NULL,0,NULL,NULL,'2014-03-18 14:37:30','admin'),(1,'123132',1,'',NULL,'','',NULL,'','','','2013-08-02 00:00:00',1,'1231','2013-08-05 00:00:00',NULL,NULL,NULL,NULL,0,'2013-08-15 14:36:21','admin',NULL,NULL),(2,'321',1,'',NULL,'','',NULL,'','','','2013-09-28 00:00:00',1,'321','2013-09-28 00:00:00',NULL,NULL,NULL,NULL,0,'2013-09-28 20:20:20','admin',NULL,NULL),(3,'123',8,'',NULL,'','',NULL,'','','','2013-10-18 00:00:00',1,'123','2013-10-18 00:00:00',NULL,NULL,NULL,NULL,0,'2013-10-18 17:32:56','admin',NULL,NULL),(4,'test',8,'',NULL,'','',NULL,'','','','2013-10-25 00:00:00',1,'test','2013-10-25 00:00:00',NULL,NULL,NULL,NULL,0,'2013-10-18 18:16:42','123',NULL,NULL),(5,'A001',12,'',NULL,'','',NULL,'','','','2013-11-12 00:00:00',1,'會計人員01','2013-11-12 00:00:00',NULL,NULL,NULL,NULL,0,'2013-11-12 19:10:51','admin',NULL,NULL),(6,'A002',13,'',NULL,'','',NULL,'','','','2013-11-12 00:00:00',0,'會計人員02','2013-11-12 00:00:00',NULL,NULL,NULL,NULL,0,'2013-11-12 19:11:57','admin',NULL,NULL),(7,'A003',12,'',NULL,'','',NULL,'','','','2013-11-13 00:00:00',1,'會計人員03','2013-11-13 00:00:00',NULL,NULL,NULL,NULL,0,'2013-11-13 19:04:52','admin',NULL,NULL),(8,'test11',11,'',NULL,'','',NULL,'','','','2014-03-18 00:00:00',1,'蘇test11','2014-03-18 00:00:00',NULL,NULL,NULL,NULL,0,'2014-03-18 13:34:06','admin',NULL,NULL);
/*!40000 ALTER TABLE `frm_employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_file_attach`
--

DROP TABLE IF EXISTS `frm_file_attach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_file_attach` (
  `fileId` bigint(20) NOT NULL AUTO_INCREMENT,
  `fileName` varchar(128) NOT NULL,
  `filePath` varchar(128) NOT NULL,
  `ext` varchar(32) DEFAULT NULL,
  `fileType` varchar(32) DEFAULT NULL,
  `note` varchar(1024) DEFAULT NULL,
  `totalBytes` double NOT NULL,
  `creator` varchar(32) NOT NULL,
  `createtime` datetime NOT NULL,
  PRIMARY KEY (`fileId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_file_attach`
--

LOCK TABLES `frm_file_attach` WRITE;
/*!40000 ALTER TABLE `frm_file_attach` DISABLE KEYS */;
INSERT INTO `frm_file_attach` VALUES (1,'去結算-購物車.jpg','system/appUser/201309/7086c84099b647f089ae36e2a40ae207.jpg','jpg','system/appUser','80.40 KB',82333,'系统用户','2013-09-23 17:45:47'),(2,'IMAG0633.jpg','system/appUser/201309/8a3981d726a44c959e0a44bc6f774d1c.jpg','jpg','system/appUser','930.98 KB',953324,'系统用户','2013-09-23 17:47:26'),(4,'圖片3.jpg','system/appUser/201310/2b762c7a0a54413897db2ed1d4a3342b.jpg','jpg','system/appUser','16.38 KB',16776,'系统用户','2013-10-18 17:25:28'),(6,'001.jpg','system/appUser/201403/610856706d104b03908d10fa10ee6aed.jpg','jpg','system/appUser','18.46 KB',18907,'系统用户','2014-03-20 15:11:04'),(9,'我的頭像.jpg','system/appUser/201403/465ba772b1d44dbf8d3e2b9a7d7d434b.jpg','jpg','system/appUser','28.08 KB',28749,'系统用户','2014-03-20 17:44:47');
/*!40000 ALTER TABLE `frm_file_attach` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_fun_url`
--

DROP TABLE IF EXISTS `frm_fun_url`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_fun_url` (
  `urlId` bigint(20) NOT NULL AUTO_INCREMENT,
  `urlPath` varchar(128) NOT NULL,
  `functionId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`urlId`),
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
  `proTypeId` bigint(20) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(128) NOT NULL,
  `path` varchar(64) DEFAULT NULL,
  `depth` int(11) NOT NULL,
  `parentId` bigint(20) DEFAULT NULL,
  `nodeKey` varchar(64) NOT NULL,
  `catKey` varchar(64) NOT NULL,
  `sn` int(11) NOT NULL,
  PRIMARY KEY (`proTypeId`)
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
  `receiveId` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) NOT NULL,
  `userFullname` varchar(40) DEFAULT NULL,
  `readFlag` smallint(6) NOT NULL,
  `delFlag` smallint(6) NOT NULL,
  `messageId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`receiveId`),
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
  `indexId` bigint(20) NOT NULL AUTO_INCREMENT,
  `portalId` varchar(64) NOT NULL,
  `colNum` int(11) NOT NULL,
  `rowsNum` int(11) NOT NULL,
  `userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`indexId`),
  KEY `FKC70847B7AABDADA3` (`userId`),
  CONSTRAINT `FKC70847B7AABDADA3` FOREIGN KEY (`userId`) REFERENCES `frm_app_user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_index_display`
--

LOCK TABLES `frm_index_display` WRITE;
/*!40000 ALTER TABLE `frm_index_display` DISABLE KEYS */;
INSERT INTO `frm_index_display` VALUES (1,'MessagePanelView',0,0,1);
/*!40000 ALTER TABLE `frm_index_display` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_region`
--

DROP TABLE IF EXISTS `frm_region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frm_region` (
  `regionId` bigint(20) NOT NULL AUTO_INCREMENT,
  `regionName` varchar(128) NOT NULL,
  `regionType` smallint(6) NOT NULL,
  `parentId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`regionId`)
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
  PRIMARY KEY (`roleId`,`functionId`),
  KEY `FK576AEB946E59C57D` (`functionId`),
  KEY `FK576AEB94A5685839` (`roleId`),
  CONSTRAINT `FK576AEB946E59C57D` FOREIGN KEY (`functionId`) REFERENCES `frm_app_function` (`functionId`),
  CONSTRAINT `FK576AEB94A5685839` FOREIGN KEY (`roleId`) REFERENCES `frm_app_role` (`roleId`)
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
  `messageId` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(500) NOT NULL,
  `sender` varchar(40) NOT NULL,
  `msgType` smallint(6) NOT NULL,
  `sendTime` datetime NOT NULL,
  `senderId` bigint(20) NOT NULL,
  PRIMARY KEY (`messageId`)
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
  `boxId` bigint(20) NOT NULL AUTO_INCREMENT,
  `subject` varchar(256) NOT NULL,
  `content` varchar(4000) NOT NULL,
  `createtime` datetime DEFAULT NULL,
  `recUid` bigint(20) DEFAULT NULL,
  `recFullname` varchar(32) DEFAULT NULL,
  `senderId` bigint(20) DEFAULT NULL,
  `senderFullname` varchar(32) DEFAULT NULL,
  `senderIp` varchar(64) DEFAULT NULL,
  `phone` varchar(64) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `isOpen` smallint(6) DEFAULT NULL,
  `replyContent` varchar(4000) DEFAULT NULL,
  `replyTime` datetime DEFAULT NULL,
  `replyId` bigint(20) DEFAULT NULL,
  `replyFullname` varchar(32) DEFAULT NULL,
  `status` smallint(6) DEFAULT NULL,
  `queryPwd` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`boxId`)
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
  `configid` bigint(20) NOT NULL AUTO_INCREMENT,
  `configkey` varchar(64) NOT NULL,
  `configname` varchar(64) NOT NULL,
  `configdesc` varchar(256) DEFAULT NULL,
  `typename` varchar(32) NOT NULL,
  `datatype` smallint(6) NOT NULL,
  `datavalue` varchar(64) DEFAULT NULL,
  `typekey` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`configid`)
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
  `logId` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(128) NOT NULL,
  `userId` bigint(20) NOT NULL,
  `createtime` datetime NOT NULL,
  `exeOperation` varchar(512) NOT NULL,
  PRIMARY KEY (`logId`)
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
  `grantId` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) NOT NULL,
  `fullname` varchar(64) DEFAULT NULL,
  `grantUId` bigint(20) NOT NULL,
  `grantFullname` varchar(64) DEFAULT NULL,
  `grantSex` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`grantId`)
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
  PRIMARY KEY (`userId`,`roleId`),
  KEY `FKDADC72ACA5685839` (`roleId`),
  KEY `FKDADC72ACAABDADA3` (`userId`),
  KEY `FK962D46CCA5685839` (`roleId`),
  KEY `FK962D46CCAABDADA3` (`userId`),
  CONSTRAINT `FK962D46CCA5685839` FOREIGN KEY (`roleId`) REFERENCES `frm_app_role` (`roleId`),
  CONSTRAINT `FK962D46CCAABDADA3` FOREIGN KEY (`userId`) REFERENCES `frm_app_user` (`userId`),
  CONSTRAINT `FKDADC72ACA5685839` FOREIGN KEY (`roleId`) REFERENCES `frm_app_role` (`roleId`),
  CONSTRAINT `FKDADC72ACAABDADA3` FOREIGN KEY (`userId`) REFERENCES `frm_app_user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_user_role`
--

LOCK TABLES `frm_user_role` WRITE;
/*!40000 ALTER TABLE `frm_user_role` DISABLE KEYS */;
INSERT INTO `frm_user_role` VALUES (4,-2),(5,-2),(6,-2),(7,-2),(8,-2),(9,-2),(1,-1),(4,3),(5,3),(9,3),(8,8);
/*!40000 ALTER TABLE `frm_user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_config`
--

DROP TABLE IF EXISTS `system_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `system_config` (
  `config_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `config_type` varchar(100) NOT NULL,
  `config_code` varchar(100) NOT NULL,
  `config_value` varchar(200) NOT NULL,
  `sort_no` int(11) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `create_by` varchar(50) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`config_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_config`
--

LOCK TABLES `system_config` WRITE;
/*!40000 ALTER TABLE `system_config` DISABLE KEYS */;
INSERT INTO `system_config` VALUES (1,'IncomeStatementReport','OpRev','4',1,'2014-11-08 16:00:00','admin','2014-11-08 16:00:00','admin'),(2,'IncomeStatementReport','OpCost','5',1,'2014-11-08 16:00:00','admin','2014-11-08 16:00:00','admin'),(3,'IncomeStatementReport','OpExp','6',1,'2014-11-08 16:00:00','admin','2014-11-08 16:00:00','admin'),(4,'IncomeStatementReport','NonOpRev','71',1,'2014-11-08 16:00:00','admin','2014-11-08 16:00:00','admin'),(5,'IncomeStatementReport','NonOpRev','72',2,'2014-11-08 16:00:00','admin','2014-11-08 16:00:00','admin'),(6,'IncomeStatementReport','NonOpRev','73',3,'2014-11-08 16:00:00','admin','2014-11-08 16:00:00','admin'),(7,'IncomeStatementReport','NonOpRev','74',4,'2014-11-08 16:00:00','admin','2014-11-08 16:00:00','admin'),(8,'IncomeStatementReport','NonOpExp','75',1,'2014-11-08 16:00:00','admin','2014-11-08 16:00:00','admin'),(9,'IncomeStatementReport','NonOpExp','76',2,'2014-11-08 16:00:00','admin','2014-11-08 16:00:00','admin'),(10,'IncomeStatementReport','NonOpExp','77',3,'2014-11-08 16:00:00','admin','2014-11-08 16:00:00','admin'),(11,'IncomeStatementReport','NonOpExp','78',4,'2014-11-08 16:00:00','admin','2014-11-08 16:00:00','admin'),(12,'BalanceSheetReport','Assets','1',1,'2014-11-08 16:00:00','admin','2014-11-08 16:00:00','admin'),(13,'BalanceSheetReport','Liabilities','2',1,'2014-11-08 16:00:00','admin','2014-11-08 16:00:00','admin'),(14,'BalanceSheetReport','Equity','3',1,'2014-11-08 16:00:00','admin','2014-11-08 16:00:00','admin');
/*!40000 ALTER TABLE `system_config` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-02-23 18:45:17
