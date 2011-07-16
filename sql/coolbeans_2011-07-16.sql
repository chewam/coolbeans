# ************************************************************
# Sequel Pro SQL dump
# Version 3348
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.1.44)
# Database: coolbeans
# Generation Time: 2011-07-16 05:57:51 +0200
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
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

LOCK TABLES `dives` WRITE;
/*!40000 ALTER TABLE `dives` DISABLE KEYS */;

INSERT INTO `dives` (`id`, `dive_date`, `location`, `total_time`, `max_depth`, `pg_start`, `pg_end`, `time_in`, `time_out`, `country_id`, `site`, `objective_id`)
VALUES
	(1,'2011-06-19 00:00:00','Koh Tao',40,7,'B','N','13:42:00','14:22:00','TH','Aow Leuk (north)',1),
	(2,'2011-06-19 00:00:00','Koh Tao',56,10,'','','15:42:00','16:38:00','TH','Aow Leuk (south)',2),
	(3,'2011-06-20 00:00:00','Koh Tao',58,11,NULL,NULL,'13:12:00','14:10:00','TH','Mango Bay',2),
	(4,'2011-06-20 00:00:00','Koh Tao',61,10,NULL,NULL,'15:06:00','16:07:00','TH','Mango Bay',2),
	(5,'2011-06-21 00:00:00','Koh Tao',67,12,NULL,NULL,'08:36:00','09:43:00','TH','Laem Thian',2),
	(6,'2011-06-21 00:00:00','Koh Tao',47,12,'','','10:40:00','11:27:00','TH','Tanote Bay',2),
	(7,'2011-06-21 00:00:00','Koh Tao',37,12,'','','13:26:00','14:03:00','TH','Japanese Garden',2);

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
	(1,'DSD'),
	(2,'Fun dive'),
	(3,'PADI Open Water'),
	(4,'PADI Advanced Open Water'),
	(5,'PADI Rescue Diver'),
	(6,'PADI Dive Master');

/*!40000 ALTER TABLE `objectives` ENABLE KEYS */;
UNLOCK TABLES;


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
