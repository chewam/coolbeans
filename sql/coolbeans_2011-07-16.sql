# ************************************************************
# Sequel Pro SQL dump
# Version 3348
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.1.44)
# Database: coolbeans
# Generation Time: 2011-07-16 20:08:09 +0200
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table cities
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cities`;

CREATE TABLE `cities` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `locid` int(11) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `lng` float DEFAULT NULL,
  `metro_code` varchar(255) DEFAULT NULL,
  `area_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=311922 DEFAULT CHARSET=utf8;



# Dump of table countries
# ------------------------------------------------------------

DROP TABLE IF EXISTS `countries`;

CREATE TABLE `countries` (
  `id` varchar(2) NOT NULL DEFAULT '',
  `name` varchar(200) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;

INSERT INTO `countries` (`id`, `name`)
VALUES
	('AD','Andorra'),
	('AE','United Arab Emirates'),
	('AF','Afghanistan'),
	('AG','Antigua and Barbuda'),
	('AI','Anguilla'),
	('AL','Albania'),
	('AM','Armenia'),
	('AN','Netherlands Antilles'),
	('AO','Angola'),
	('AQ','Antarctica'),
	('AR','Argentina'),
	('AS','American Samoa'),
	('AT','Austria'),
	('AU','Australia'),
	('AW','Aruba'),
	('AX','Aland Islands'),
	('AZ','Azerbaijan'),
	('BA','Bosnia and Herzegovina'),
	('BB','Barbados'),
	('BD','Bangladesh'),
	('BE','Belgium'),
	('BF','Burkina Faso'),
	('BG','Bulgaria'),
	('BH','Bahrain'),
	('BI','Burundi'),
	('BJ','Benin'),
	('BL','Saint Barthélemy'),
	('BM','Bermuda'),
	('BN','Brunei Darussalam'),
	('BO','Bolivia'),
	('BR','Brazil'),
	('BS','Bahamas'),
	('BT','Bhutan'),
	('BV','Bouvet Island'),
	('BW','Botswana'),
	('BY','Belarus'),
	('BZ','Belize'),
	('CA','Canada'),
	('CC','Cocos (Keeling) Islands'),
	('CD','Congo, The Democratic Republic of the'),
	('CF','Central African Republic'),
	('CG','Congo'),
	('CH','Switzerland'),
	('CI','Cote D\'Ivoire'),
	('CK','Cook Islands'),
	('CL','Chile'),
	('CM','Cameroon'),
	('CN','China'),
	('CO','Colombia'),
	('CR','Costa Rica'),
	('CU','Cuba'),
	('CV','Cape Verde'),
	('CX','Christmas Island'),
	('CY','Cyprus'),
	('CZ','Czech Republic'),
	('DE','Germany'),
	('DJ','Djibouti'),
	('DK','Denmark'),
	('DM','Dominica'),
	('DO','Dominican Republic'),
	('DZ','Algeria'),
	('EC','Ecuador'),
	('EE','Estonia'),
	('EG','Egypt'),
	('EH','Western Sahara'),
	('ER','Eritrea'),
	('ES','Spain'),
	('ET','Ethiopia'),
	('FI','Finland'),
	('FJ','Fiji'),
	('FK','Falkland Islands (Malvinas)'),
	('FM','Micronesia, Federated States of'),
	('FO','Faroe Islands'),
	('FR','France'),
	('GA','Gabon'),
	('GB','United Kingdom'),
	('GD','Grenada'),
	('GE','Georgia'),
	('GF','French Guiana'),
	('GG','Guernsey'),
	('GH','Ghana'),
	('GI','Gibraltar'),
	('GL','Greenland'),
	('GM','Gambia'),
	('GN','Guinea'),
	('GP','Guadeloupe'),
	('GQ','Equatorial Guinea'),
	('GR','Greece'),
	('GS','South Georgia and the South Sandwich Islands'),
	('GT','Guatemala'),
	('GU','Guam'),
	('GW','Guinea-Bissau'),
	('GY','Guyana'),
	('HK','Hong Kong'),
	('HM','Heard Island and McDonald Islands'),
	('HN','Honduras'),
	('HR','Croatia'),
	('HT','Haiti'),
	('HU','Hungary'),
	('ID','Indonesia'),
	('IE','Ireland'),
	('IL','Israel'),
	('IM','Isle of Man'),
	('IN','India'),
	('IO','British Indian Ocean Territory'),
	('IQ','Iraq'),
	('IR','Iran, Islamic Republic of'),
	('IS','Iceland'),
	('IT','Italy'),
	('JE','Jersey'),
	('JM','Jamaica'),
	('JO','Jordan'),
	('JP','Japan'),
	('KE','Kenya'),
	('KG','Kyrgyzstan'),
	('KH','Cambodia'),
	('KI','Kiribati'),
	('KM','Comoros'),
	('KN','Saint Kitts and Nevis'),
	('KP','Korea, Democratic People\'s Republic of'),
	('KR','Korea, Republic of'),
	('KW','Kuwait'),
	('KY','Cayman Islands'),
	('KZ','Kazakhstan'),
	('LA','Lao People\'s Democratic Republic'),
	('LB','Lebanon'),
	('LC','Saint Lucia'),
	('LI','Liechtenstein'),
	('LK','Sri Lanka'),
	('LR','Liberia'),
	('LS','Lesotho'),
	('LT','Lithuania'),
	('LU','Luxembourg'),
	('LV','Latvia'),
	('LY','Libyan Arab Jamahiriya'),
	('MA','Morocco'),
	('MC','Monaco'),
	('MD','Moldova, Republic of'),
	('ME','Montenegro'),
	('MF','Saint Martin'),
	('MG','Madagascar'),
	('MH','Marshall Islands'),
	('MK','Macedonia, The Former Yugoslav Republic of'),
	('ML','Mali'),
	('MM','Myanmar'),
	('MN','Mongolia'),
	('MO','Macao'),
	('MP','Northern Mariana Islands'),
	('MQ','Martinique'),
	('MR','Mauritania'),
	('MS','Montserrat'),
	('MT','Malta'),
	('MU','Mauritius'),
	('MV','Maldives'),
	('MW','Malawi'),
	('MX','Mexico'),
	('MY','Malaysia'),
	('MZ','Mozambique'),
	('NA','Namibia'),
	('NC','New Caledonia'),
	('NE','Niger'),
	('NF','Norfolk Island'),
	('NG','Nigeria'),
	('NI','Nicaragua'),
	('NL','Netherlands'),
	('NO','Norway'),
	('NP','Nepal'),
	('NR','Nauru'),
	('NU','Niue'),
	('NZ','New Zealand'),
	('OM','Oman'),
	('PA','Panama'),
	('PE','Peru'),
	('PF','French Polynesia'),
	('PG','Papua New Guinea'),
	('PH','Philippines'),
	('PK','Pakistan'),
	('PL','Poland'),
	('PM','Saint Pierre and Miquelon'),
	('PN','Pitcairn'),
	('PR','Puerto Rico'),
	('PS','Palestinian Territory, Occupied'),
	('PT','Portugal'),
	('PW','Palau'),
	('PY','Paraguay'),
	('QA','Qatar'),
	('RE','Reunion'),
	('RO','Romania'),
	('RS','Serbia'),
	('RU','Russian Federation'),
	('RW','Rwanda'),
	('SA','Saudi Arabia'),
	('SB','Solomon Islands'),
	('SC','Seychelles'),
	('SD','Sudan'),
	('SE','Sweden'),
	('SG','Singapore'),
	('SH','Saint Helena'),
	('SI','Slovenia'),
	('SJ','Svalbard and Jan Mayen'),
	('SK','Slovakia'),
	('SL','Sierra Leone'),
	('SM','San Marino'),
	('SN','Senegal'),
	('SO','Somalia'),
	('SR','Suriname'),
	('ST','Sao Tome and Principe'),
	('SV','El Salvador'),
	('SY','Syrian Arab Republic'),
	('SZ','Swaziland'),
	('TC','Turks and Caicos Islands'),
	('TD','Chad'),
	('TF','French Southern Territories'),
	('TG','Togo'),
	('TH','Thailand'),
	('TJ','Tajikistan'),
	('TK','Tokelau'),
	('TL','Timor-Leste'),
	('TM','Turkmenistan'),
	('TN','Tunisia'),
	('TO','Tonga'),
	('TR','Turkey'),
	('TT','Trinidad and Tobago'),
	('TV','Tuvalu'),
	('TW','Taiwan, Province Of China'),
	('TZ','Tanzania, United Republic of'),
	('UA','Ukraine'),
	('UG','Uganda'),
	('UM','United States Minor Outlying Islands'),
	('US','United States'),
	('UY','Uruguay'),
	('UZ','Uzbekistan'),
	('VA','Holy See (Vatican City State)'),
	('VC','Saint Vincent and the Grenadines'),
	('VE','Venezuela'),
	('VG','Virgin Islands, British'),
	('VI','Virgin Islands, U.S.'),
	('VN','Viet Nam'),
	('VU','Vanuatu'),
	('WF','Wallis And Futuna'),
	('WS','Samoa'),
	('YE','Yemen'),
	('YT','Mayotte'),
	('ZA','South Africa'),
	('ZM','Zambia'),
	('ZW','Zimbabwe');

/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dives
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dives`;

CREATE TABLE `dives` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `dive_date` datetime DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `total_time` int(11) DEFAULT NULL,
  `max_depth` int(11) DEFAULT NULL,
  `pg_start` varchar(255) DEFAULT NULL,
  `pg_end` varchar(255) DEFAULT NULL,
  `time_in` time DEFAULT NULL,
  `time_out` time DEFAULT NULL,
  `country_id` varchar(255) DEFAULT NULL,
  `site` varchar(255) DEFAULT NULL,
  `objective_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

LOCK TABLES `dives` WRITE;
/*!40000 ALTER TABLE `dives` DISABLE KEYS */;

INSERT INTO `dives` (`id`, `dive_date`, `location`, `total_time`, `max_depth`, `pg_start`, `pg_end`, `time_in`, `time_out`, `country_id`, `site`, `objective_id`)
VALUES
	(1,'2011-06-19 00:00:00','Koh Tao',40,7,'0','G','13:42:00','14:22:00','TH','Aow Leuk (north)',1),
	(2,'2011-06-19 00:00:00','Koh Tao',56,10,'0','K','15:42:00','16:38:00','TH','Aow Leuk (south)',2),
	(3,'2011-06-20 00:00:00','Koh Tao',58,11,'TO CALCULATE','K','13:12:00','14:10:00','TH','Mango Bay',2),
	(4,'2011-06-20 00:00:00','Koh Tao',61,10,'TO CALCULATE','L','15:06:00','16:07:00','TH','Mango Bay',2),
	(5,'2011-06-21 00:00:00','Koh Tao',47,12,'TO CALCULATE','I','08:56:00','09:43:00','TH','Laem Thian',2),
	(6,'2011-06-21 00:00:00','Koh Tao',47,12,'TO CALCULATE','I','10:40:00','11:27:00','TH','Tanote Bay',2),
	(7,'2011-06-21 00:00:00','Koh Tao',37,12,'TO CALCULATE','G','13:26:00','14:03:00','TH','Japanese Garden',2),
	(8,'2011-06-23 00:00:00','Koh Tao',39,15,'TO CALCULATE','I','13:27:00','14:06:00','TH','Mango Bay',4),
	(9,'2011-06-21 00:00:00','Koh Tao',39,12,'TO CALCULATE','G','15:25:00','16:04:00','TH','Japanese Garden',2),
	(10,'2011-06-23 00:00:00','Koh Tao',43,12,'TO CALCULATE','H','15:12:00','15:55:00','TH','Mango Bay',4),
	(11,'2011-06-23 00:00:00','Koh Tao',38,12,'TO CALCULATE','G','18:48:00','19:26:00','TH','White Rock',4),
	(12,'2011-06-24 00:00:00','Koh Tao',35,30,'TO CALCULATE','','08:30:00','09:05:00','TH','Chumphon Pinnacle',4),
	(13,'2011-06-24 00:00:00','Koh Tao',45,16,'0','K','10:20:00','11:05:00','TH','White Rock',4),
	(14,'2011-06-27 00:00:00','Koh Tao',16,11,'0','B','13:47:00','14:03:00','TH','Mango Bay',5),
	(15,'2011-06-28 00:00:00','Koh Tao',27,17,'0','G','13:54:00','14:21:00','TH','Mango Bay',5),
	(16,'2010-08-17 00:00:00','Hurghada',60,4,'','','14:00:00','15:00:00','EG','Torfa',2),
	(17,'2010-08-17 00:00:00','Hurghada',40,13,'','','16:30:00','17:10:00','EG','Shaab Sabina',2),
	(18,'2010-08-19 00:00:00','Hurghada',50,12,'','','14:00:00','14:50:00','EG','Abu (south)',2),
	(19,'2010-08-19 00:00:00','Hurghada',48,13,'','','16:00:00','16:48:00','EG','Gota (east)',2);

/*!40000 ALTER TABLE `dives` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table objectives
# ------------------------------------------------------------

DROP TABLE IF EXISTS `objectives`;

CREATE TABLE `objectives` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

LOCK TABLES `objectives` WRITE;
/*!40000 ALTER TABLE `objectives` DISABLE KEYS */;

INSERT INTO `objectives` (`id`, `name`)
VALUES
	(1,'PADI DSD'),
	(2,'Fun dive'),
	(3,'PADI Open Water'),
	(4,'PADI Advanced Open Water'),
	(5,'PADI Rescue Diver'),
	(6,'PADI Dive Master');

/*!40000 ALTER TABLE `objectives` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table pressure_groups
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pressure_groups`;

CREATE TABLE `pressure_groups` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `pg` varchar(255) DEFAULT NULL,
  `btime` int(11) DEFAULT NULL,
  `depth` int(11) DEFAULT NULL,
  `oxygen` int(11) DEFAULT NULL,
  `pp` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=213 DEFAULT CHARSET=utf8;

LOCK TABLES `pressure_groups` WRITE;
/*!40000 ALTER TABLE `pressure_groups` DISABLE KEYS */;

INSERT INTO `pressure_groups` (`id`, `pg`, `btime`, `depth`, `oxygen`, `pp`)
VALUES
	(1,'A',10,14,32,0.77),
	(2,'A',9,16,32,0.83),
	(3,'A',8,18,32,0.9),
	(4,'A',7,20,32,0.96),
	(5,'A',6,22,32,1.02),
	(6,'A',5,24,32,1.09),
	(7,'A',5,26,32,1.15),
	(8,'A',4,30,32,1.28),
	(9,'A',3,36,32,1.47),
	(10,'A',3,40,32,1.6),
	(11,'B',19,14,32,0.77),
	(12,'B',16,16,32,0.83),
	(13,'B',14,18,32,0.9),
	(14,'B',12,20,32,0.96),
	(15,'B',11,22,32,1.02),
	(16,'B',10,24,32,1.09),
	(17,'B',9,26,32,1.15),
	(18,'B',8,30,32,1.28),
	(19,'B',6,36,32,1.47),
	(20,'B',5,40,32,1.6),
	(21,'C',26,14,32,0.77),
	(22,'C',21,16,32,0.83),
	(23,'C',19,18,32,0.9),
	(24,'C',16,20,32,0.96),
	(25,'C',14,22,32,1.02),
	(26,'C',13,24,32,1.09),
	(27,'C',12,26,32,1.15),
	(28,'C',10,30,32,1.28),
	(29,'C',8,36,32,1.47),
	(30,'C',7,40,32,1.6),
	(33,'D',29,14,32,0.77),
	(34,'D',24,16,32,0.83),
	(35,'D',21,18,32,0.9),
	(36,'D',18,20,32,0.96),
	(37,'D',16,22,32,1.02),
	(38,'D',15,24,32,1.09),
	(39,'D',13,26,32,1.15),
	(40,'D',11,30,32,1.28),
	(41,'D',9,36,32,1.47),
	(42,'D',8,40,32,1.6),
	(43,'E',33,14,32,0.77),
	(44,'E',27,16,32,0.83),
	(45,'E',23,18,32,0.9),
	(46,'E',20,20,32,0.96),
	(47,'E',18,22,32,1.02),
	(48,'E',16,24,32,1.09),
	(49,'E',15,26,32,1.15),
	(50,'E',13,30,32,1.28),
	(51,'E',10,36,32,1.47),
	(52,'E',9,40,32,1.6),
	(53,'F',36,14,32,0.77),
	(54,'F',30,16,32,0.83),
	(55,'F',26,18,32,0.9),
	(56,'F',23,20,32,0.96),
	(57,'F',20,22,32,1.02),
	(58,'F',18,24,32,1.09),
	(59,'F',16,26,32,1.15),
	(60,'F',14,30,32,1.28),
	(61,'F',11,36,32,1.47),
	(62,'F',10,40,32,1.6),
	(63,'G',40,14,32,0.77),
	(64,'G',33,16,32,0.83),
	(65,'G',28,18,32,0.9),
	(66,'G',25,20,32,0.96),
	(67,'G',22,22,32,1.02),
	(68,'G',20,24,32,1.09),
	(69,'G',18,26,32,1.15),
	(70,'G',15,30,32,1.28),
	(71,'G',12,36,32,1.47),
	(72,'G',11,40,32,1.6),
	(73,'H',44,14,32,0.77),
	(74,'H',37,16,32,0.83),
	(75,'H',31,18,32,0.9),
	(76,'H',27,20,32,0.96),
	(77,'H',24,22,32,1.02),
	(78,'H',22,24,32,1.09),
	(79,'H',20,26,32,1.15),
	(80,'H',16,30,32,1.28),
	(81,'H',13,36,32,1.47),
	(82,'H',12,40,32,1.6),
	(83,'I',49,14,32,0.77),
	(84,'I',40,16,32,0.83),
	(85,'I',34,18,32,0.9),
	(86,'I',29,20,32,0.96),
	(87,'I',26,22,32,1.02),
	(88,'I',23,24,32,1.09),
	(89,'I',21,26,32,1.15),
	(90,'I',18,30,32,1.28),
	(91,'I',14,36,32,1.47),
	(92,'I',13,40,32,1.6),
	(93,'J',53,14,32,0.77),
	(94,'J',43,16,32,0.83),
	(95,'J',37,18,32,0.9),
	(96,'J',32,20,32,0.96),
	(97,'J',28,22,32,1.02),
	(98,'J',25,24,32,1.09),
	(99,'J',23,26,32,1.15),
	(100,'J',19,30,32,1.28),
	(101,'J',15,36,32,1.47),
	(102,'J',14,40,32,1.6),
	(103,'K',58,14,32,0.77),
	(104,'K',47,16,32,0.83),
	(105,'K',40,18,32,0.9),
	(106,'K',34,20,32,0.96),
	(107,'K',30,22,32,1.02),
	(108,'K',27,24,32,1.09),
	(109,'K',24,26,32,1.15),
	(110,'K',21,30,32,1.28),
	(111,'K',17,36,32,1.47),
	(112,'K',15,40,32,1.6),
	(113,'L',63,14,32,0.77),
	(114,'L',51,16,32,0.83),
	(115,'L',43,18,32,0.9),
	(116,'L',37,20,32,0.96),
	(117,'L',32,22,32,1.02),
	(118,'L',29,24,32,1.09),
	(119,'L',26,26,32,1.15),
	(120,'L',22,30,32,1.28),
	(121,'L',18,36,32,1.47),
	(122,'L',16,40,32,1.6),
	(123,'M',68,14,32,0.77),
	(124,'M',55,16,32,0.83),
	(125,'M',46,18,32,0.9),
	(126,'M',40,20,32,0.96),
	(127,'M',35,22,32,1.02),
	(128,'M',31,24,32,1.09),
	(129,'M',28,26,32,1.15),
	(130,'M',23,30,32,1.28),
	(131,'M',19,36,32,1.47),
	(132,'N',74,14,32,0.77),
	(133,'N',59,16,32,0.83),
	(134,'N',49,18,32,0.9),
	(135,'N',42,20,32,0.96),
	(136,'N',37,22,32,1.02),
	(137,'N',33,24,32,1.09),
	(138,'N',30,26,32,1.15),
	(139,'N',25,30,32,1.28),
	(140,'N',20,36,32,1.47),
	(141,'O',80,14,32,0.77),
	(142,'O',63,16,32,0.83),
	(143,'O',53,18,32,0.9),
	(144,'O',45,20,32,0.96),
	(145,'O',39,22,32,1.02),
	(146,'O',35,24,32,1.09),
	(147,'O',32,26,32,1.15),
	(148,'O',26,30,32,1.28),
	(149,'P',87,14,32,0.77),
	(150,'P',68,16,32,0.83),
	(151,'P',56,18,32,0.9),
	(152,'P',48,20,32,0.96),
	(153,'P',42,22,32,1.02),
	(154,'P',37,24,32,1.09),
	(155,'P',33,26,32,1.15),
	(156,'P',28,30,32,1.28),
	(157,'Q',94,14,32,0.77),
	(158,'Q',73,16,32,0.83),
	(159,'Q',60,18,32,0.9),
	(160,'Q',51,20,32,0.96),
	(161,'Q',44,22,32,1.02),
	(162,'Q',39,24,32,1.09),
	(163,'Q',35,26,32,1.15),
	(164,'Q',29,30,32,1.28),
	(165,'R',102,14,32,0.77),
	(166,'R',78,16,32,0.83),
	(167,'R',64,18,32,0.9),
	(168,'R',54,20,32,0.96),
	(169,'R',47,22,32,1.02),
	(170,'R',42,24,32,1.09),
	(171,'R',37,26,32,1.15),
	(172,'R',30,30,32,1.28),
	(173,'S',110,14,32,0.77),
	(174,'S',84,16,32,0.83),
	(175,'S',68,18,32,0.9),
	(176,'S',57,20,32,0.96),
	(177,'S',50,22,32,1.02),
	(178,'S',44,24,32,1.09),
	(179,'S',39,26,32,1.15),
	(180,'T',120,14,32,0.77),
	(181,'T',89,16,32,0.83),
	(182,'T',72,18,32,0.9),
	(183,'T',61,20,32,0.96),
	(184,'T',52,22,32,1.02),
	(185,'T',46,24,32,1.09),
	(186,'T',40,26,32,1.15),
	(187,'U',130,14,32,0.77),
	(188,'U',96,16,32,0.83),
	(189,'U',77,18,32,0.9),
	(190,'U',64,20,32,0.96),
	(191,'U',55,22,32,1.02),
	(192,'U',49,24,32,1.09),
	(193,'V',142,14,32,0.77),
	(194,'V',102,16,32,0.83),
	(195,'V',81,18,32,0.9),
	(196,'V',68,20,32,0.96),
	(197,'V',58,22,32,1.02),
	(198,'V',50,24,32,1.09),
	(199,'W',156,14,32,0.77),
	(200,'W',110,16,32,0.83),
	(201,'W',86,18,32,0.9),
	(202,'W',71,20,32,0.96),
	(203,'W',60,22,32,1.02),
	(204,'X',173,14,32,0.77),
	(205,'X',118,16,32,0.83),
	(206,'X',92,18,32,0.9),
	(207,'X',75,20,32,0.96),
	(208,'Y',194,14,32,0.77),
	(209,'Y',127,16,32,0.83),
	(210,'Y',95,18,32,0.9),
	(211,'Z',205,14,32,0.77),
	(212,'Z',130,16,32,0.83);

/*!40000 ALTER TABLE `pressure_groups` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table pg_interval
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pg_interval`;

CREATE TABLE `pg_interval` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
