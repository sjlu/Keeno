-- MySQL dump 10.13  Distrib 5.1.49, for debian-linux-gnu (i486)
--
-- Host: localhost    Database: nexus
-- ------------------------------------------------------
-- Server version	5.1.49-3

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
-- Table structure for table `Interests`
--

DROP TABLE IF EXISTS `Interests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Interests` (
  `fbid` bigint(20) NOT NULL DEFAULT '0',
  `interest_name` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`fbid`,`interest_name`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Interests`
--

LOCK TABLES `Interests` WRITE;
/*!40000 ALTER TABLE `Interests` DISABLE KEYS */;
INSERT INTO `Interests` VALUES (870110500,'AMD'),(870110500,'Apple Inc.'),(870110500,'null'),(870110500,'Politics'),(1051411742,'Apple Inc.'),(1051411742,'Intel'),(1051411742,'The Big Bang Theory'),(1051411742,'The Office'),(1278105751,'Apple Inc.'),(1278105751,'August Burns Red'),(1278105751,'Saturday Ska Band'),(1278105751,'Toy Story'),(1278105751,'WeatherWatcher'),(1333170187,'A-Trak'),(1333170187,'Adam Goldstein'),(1333170187,'Ailee'),(1333170187,'Alicia Keys'),(1333170187,'AMD'),(1333170187,'Apple Inc.'),(1333170187,'Art Of Fresh'),(1333170187,'Avocados'),(1333170187,'Boys Noize'),(1333170187,'Business'),(1333170187,'by HÃ¤zel'),(1333170187,'Charles Barkley'),(1333170187,'Childish Gambino'),(1333170187,'Cinematography'),(1333170187,'Color'),(1333170187,'Contax G'),(1333170187,'Cosina VoigtlÃ¤nder'),(1333170187,'D\'Angelo'),(1333170187,'Daft Punk'),(1333170187,'David Ryan Harris'),(1333170187,'Design'),(1333170187,'Diners'),(1333170187,'DJ AM'),(1333170187,'DJ EV - The Project EV'),(1333170187,'Drake'),(1333170187,'Drive-Ins and Dives'),(1333170187,'Duck Sauce'),(1333170187,'Dwele'),(1333170187,'EBRAHIM'),(1333170187,'Ed Banger Records'),(1333170187,'F1'),(1333170187,'Fool\'s Gold Records'),(1333170187,'Frank Ocean'),(1333170187,'Girls'),(1333170187,'HÃ¤zel'),(1333170187,'intel'),(1333170187,'Jack Johnson'),(1333170187,'Jackson 5'),(1333170187,'John Mayer'),(1333170187,'Jonathan Carr'),(1333170187,'Josh Rose'),(1333170187,'Justice'),(1333170187,'Karting'),(1333170187,'Lauryn Hill'),(1333170187,'Lupe Fiasco'),(1333170187,'Mad Men'),(1333170187,'Madlib'),(1333170187,'Man Laws'),(1333170187,'Music'),(1333170187,'Musiq Soulchild'),(1333170187,'Nabil Elderkin'),(1333170187,'OneRepublic'),(1333170187,'Onra'),(1333170187,'Panerai'),(1333170187,'Photography'),(1333170187,'Pino Palladino'),(1333170187,'Politics'),(1333170187,'PRIZM'),(1333170187,'Rolex Submariner'),(1333170187,'SebastiAn'),(1333170187,'Slakah the Beatchild'),(1333170187,'SportsCenter'),(1333170187,'Steve Jordan'),(1333170187,'Street food'),(1333170187,'Talib Kweli'),(1333170187,'The Food Channel'),(1333170187,'the lost tapes'),(1333170187,'Travis Barker'),(1333170187,'TRV$DJAM'),(1333170187,'Vanessa Hudgens'),(1333170187,'YONAS'),(1333170187,'å‘¨æ°å€« Jay'),(1340490250,'AMD'),(1340490250,'Apple Inc.'),(1340490250,'Asus'),(1340490250,'Castle'),(1340490250,'Damato'),(1340490250,'Eureka'),(1340490250,'EVGA'),(1340490250,'Futurama'),(1340490250,'G.Skill'),(1340490250,'Google'),(1340490250,'House'),(1340490250,'Intel'),(1340490250,'ì‚¼ì„± (Samsung)'),(1340490250,'No Ordinary Family'),(1340490250,'NVIDIA'),(1340490250,'Official CHUCK Page'),(1340490250,'Samsung'),(1340490250,'Shameless'),(1340490250,'The Chicago Code'),(1340490250,'The Mentalist'),(1340490250,'Warehouse 13'),(1340490250,'Western Digital'),(1340490375,'A-SynC'),(1340490375,'Adema'),(1340490375,'Andromeda'),(1340490375,'Andy McKee'),(1340490375,'Angra'),(1340490375,'Animals As Leaders'),(1340490375,'Antoine Dufour'),(1340490375,'Anubis Gate'),(1340490375,'Aphex Twin'),(1340490375,'Apparat'),(1340490375,'Arkarna'),(1340490375,'As Tall As Lions'),(1340490375,'Audioslave'),(1340490375,'Bach'),(1340490375,'Beethoven'),(1340490375,'Bizet'),(1340490375,'Blind Guardian'),(1340490375,'Bloodbound'),(1340490375,'Bob Dylan'),(1340490375,'Buckethead'),(1340490375,'by Short of the Sun'),(1340490375,'Champagne Blvd'),(1340490375,'Chevelle'),(1340490375,'Circa Survive'),(1340490375,'Circus Maximus'),(1340490375,'Cloudkicker'),(1340490375,'Cloudscape'),(1340490375,'Cog'),(1340490375,'Cold War Kids'),(1340490375,'Coldplay'),(1340490375,'Communic'),(1340490375,'Computer science'),(1340490375,'Copeland'),(1340490375,'Creed'),(1340490375,'Da Vinci\'s Notebook'),(1340490375,'Daft Punk'),(1340490375,'Dave Matthews Band'),(1340490375,'David Bowie (Official)'),(1340490375,'Demons'),(1340490375,'Edit'),(1340490375,'Flux Pavillion'),(1340490375,'Gaming'),(1340490375,'Holy Fuck'),(1340490375,'In Flames(Official)'),(1340490375,'Intelligent Conversation'),(1340490375,'Jack Conte'),(1340490375,'Jakob'),(1340490375,'Karnivool'),(1340490375,'Lowercase Noises'),(1340490375,'Lydia'),(1340490375,'M83'),(1340490375,'Minus the Bear'),(1340490375,'Moderat'),(1340490375,'Mogwai'),(1340490375,'Music'),(1340490375,'Orka Veer'),(1340490375,'Periphery'),(1340490375,'Philosophy'),(1340490375,'Phoenix'),(1340490375,'Politics'),(1340490375,'Ralph Nicastro: Producer/Engineer'),(1340490375,'Shamrocks EP'),(1340490375,'Short of the Sun'),(1340490375,'Skrillex'),(1340490375,'Snow Patrol'),(1340490375,'States'),(1340490375,'T.R.A.M.'),(1340490375,'TesseracT'),(1340490375,'The Chosen'),(1340490375,'The Doobie Brothers'),(1340490375,'The Six Parts Seven'),(1340490375,'We'),(1343820029,'Airplane!'),(1343820029,'AMD'),(1343820029,'Books'),(1343820029,'Disturbed'),(1343820029,'Etc'),(1343820029,'Family Guy'),(1343820029,'Foo Fighters'),(1343820029,'Hanging Out W My Friends'),(1343820029,'Harold'),(1343820029,'Help Nathan Buy Firefly'),(1343820029,'MÃ¶tley CrÃ¼e'),(1343820029,'Metallica'),(1343820029,'Skillet'),(1343820029,'Soccer'),(1343820029,'Star Trek'),(1343820029,'System of a Down'),(1343820029,'Technology in General'),(1343820029,'Tennis'),(1343820029,'The Colbert Report'),(1343820029,'Weird Al'),(1343820029,'Whose Line Is It Anyway?'),(1343820029,'Wit');
/*!40000 ALTER TABLE `Interests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Messages`
--

DROP TABLE IF EXISTS `Messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Messages` (
  `fbid_from` bigint(20) DEFAULT NULL,
  `fbid_to` bigint(20) DEFAULT NULL,
  `msg_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `message` varchar(512) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Messages`
--

LOCK TABLES `Messages` WRITE;
/*!40000 ALTER TABLE `Messages` DISABLE KEYS */;
INSERT INTO `Messages` VALUES (1340490250,1051411742,'2011-04-11 04:08:05','Lol'),(1340490250,1278105751,'2011-07-01 14:21:57','Hello!'),(1340490250,1343820029,'2011-04-11 03:07:42','teehee'),(1340490250,1343820029,'2011-04-11 03:07:39','I eat nooks for dinner'),(1333170187,0,'2011-04-07 23:33:04','I beg to differ'),(1340490250,1343820029,'2011-04-11 03:07:31','Super funny'),(1340490250,1333170187,'2011-04-14 21:34:49','So sad'),(1343820029,0,'2011-04-07 22:07:18','Vfggggfggbhhoggcb'),(1340490250,1343820029,'2011-04-10 06:23:48','Messages!'),(1340490250,0,'2011-04-07 19:51:36',':('),(1343820029,0,'2011-04-07 22:07:13','Ggffrfgfhhkhhygg'),(1343820029,0,'2011-04-07 22:07:08','Bhggcjjbccgjjbh'),(1343820029,0,'2011-04-07 22:07:00','Bhyuhhtfhoyvbbv'),(1343820029,0,'2011-04-07 22:07:04','Vggggkiggvgh'),(1343820029,0,'2011-04-07 22:06:51','Ghbbjifddfbhu'),(1343820029,0,'2011-04-07 22:06:55','Gggfgijhyffvhi'),(1343820029,0,'2011-04-07 22:06:48','Gygggvvjjjjg'),(1343820029,0,'2011-04-07 22:06:41','Fgfcvjiuygggnjj'),(1343820029,0,'2011-04-07 22:06:32','Hhgcffhutffghj'),(1343820029,0,'2011-04-07 22:06:25','Ghhkkigfdg'),(1343820029,0,'2011-04-07 22:06:20','Fffgbhhdf'),(1340490250,1343820029,'2011-04-10 06:23:26','Testing'),(1343820029,0,'2011-04-07 22:06:29','Bhuhgfvhjjyfh'),(1343820029,0,'2011-04-07 22:06:36','Gfggfbbhgffbh'),(1340490250,0,'2011-04-07 19:51:30','Lol'),(1340490250,0,'2011-04-07 19:50:58',':('),(1340490250,0,'2011-04-07 19:50:53','Eh?'),(1340490250,0,'2011-04-07 19:50:45','Sad'),(1340490250,0,'2011-04-07 19:50:34','Sad'),(1340490250,1343820029,'2011-04-10 06:23:39','Rolling around town like its 1984'),(870110500,0,'2011-04-10 02:55:13','What\'s up'),(1340490250,1343820029,'2011-04-13 03:27:57','What\'s up?'),(1340490250,870110500,'2011-04-25 04:53:25','Lol.'),(1340490250,870110500,'2011-05-08 16:38:53','Sayd'),(870110500,0,'2011-04-08 07:41:59','Hey did I give u the iPod back'),(1340490250,1343820029,'2011-04-10 06:23:42','So sad'),(870110500,0,'2011-04-08 06:11:40','What'),(1340490250,1333170187,'2011-04-12 21:31:04','What do you want bad boy.');
/*!40000 ALTER TABLE `Messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `fbid` bigint(20) NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `sq_photo` varchar(128) DEFAULT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `firstName` varchar(64) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `device_id` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`fbid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (870110500,40.5267181396484,-74.4583282470703,'http://profile.ak.fbcdn.net/hprofile-ak-snc4/187702_870110500_3557829_q.jpg','male','Jason C.','2011-04-14 22:56:25','7ac72e54f1fccb10aeb1a04702460c1f1843331e3069c0efa000f473ea021895'),(1333170187,40.4845428466797,-74.4318008422852,'http://profile.ak.fbcdn.net/hprofile-ak-snc4/211439_1333170187_4161618_q.jpg','','Wayne S.','2011-04-12 21:30:21','e2c5f6ddd8afaa2567b2cbfc5a568235b25ab7c817ec10b6995e98ae0fda4773'),(1278105751,40.5277709960938,-74.4672241210938,'http://profile.ak.fbcdn.net/hprofile-ak-snc4/173833_1278105751_7355387_q.jpg','female','Aileen Y.','2011-04-19 19:11:43','09a4524f641adaabad414d430116cad487d8beaa08fa216118e37651dd1a84dd'),(1340490250,40.6651649475098,-74.2754516601562,'http://profile.ak.fbcdn.net/hprofile-ak-snc4/186023_1340490250_2239862_q.jpg','male','Steven L.','2011-07-02 14:16:09','09a4524f641adaabad414d430116cad487d8beaa08fa216118e37651dd1a84dd'),(1343820029,40.5267944335937,-74.4621756591797,'http://profile.ak.fbcdn.net/hprofile-ak-snc4/186870_1343820029_8112430_q.jpg','male','Jarek S.','2011-04-10 07:00:21','5c784898f68496d0b919f81b0f3e7282fcdf365b82954e390bb498ea86ee9e33'),(1051411742,40.7284355163574,-73.9955062866211,'http://profile.ak.fbcdn.net/hprofile-ak-snc4/211640_1051411742_3491712_q.jpg','male','Vaibhav V.','2011-04-10 01:18:33','802bab96707e2cfb631361471a4d65df422f9478b220bfcda804d2755bf57799');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2011-08-24 11:12:15
