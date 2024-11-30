CREATE DATABASE IF NOT EXISTS MechDesign;
USE MechDesign;

CREATE TABLE `members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `gv` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pwHash` varchar(255) NOT NULL,
  `firstName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `lastName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `loginCount` int NOT NULL DEFAULT '0',
  `timeStamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- You can optionally insert a default user here
-- INSERT INTO `members` (`username`, `email`, `pwHash`) VALUES
-- ('firstUser', 'firstUser@mail.com', '<HASHED_PASSWORD_YOU_WANT>');

CREATE TABLE `mecharm` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mechID` int DEFAULT NULL,
  `partLeftorRight` int DEFAULT '0',
  `slot1` varchar(255) DEFAULT '',
  `slot2` varchar(255) DEFAULT '',
  `slot3` varchar(255) DEFAULT '',
  `slot4` varchar(255) DEFAULT '',
  `slot5` varchar(255) DEFAULT '',
  `slot6` varchar(255) DEFAULT '',
  `slot7` varchar(255) DEFAULT '',
  `slot8` varchar(255) DEFAULT '',
  `slot9` varchar(255) DEFAULT '',
  `slot10` varchar(255) DEFAULT '',
  `slot11` varchar(255) DEFAULT '',
  `slot12` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `mechengine` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mechID` int DEFAULT NULL,
  `engineName` varchar(255) DEFAULT '',
  `activeEngine` tinyint(1) DEFAULT '0',
  `engineRating` int DEFAULT '0',
  `mechWalk` int DEFAULT '0',
  `mechRun` int DEFAULT '0',
  `mechJump` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `mechexternalarmor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mechID` int DEFAULT NULL,
  `armLeftArmor` int NOT NULL DEFAULT '0',
  `armRightArmor` int NOT NULL DEFAULT '0',
  `headArmor` int NOT NULL DEFAULT '0',
  `centerArmor` int NOT NULL DEFAULT '0',
  `rearCenterArmor` int NOT NULL DEFAULT '0',
  `torsoLeftArmor` int NOT NULL DEFAULT '0',
  `torsoRightArmor` int NOT NULL DEFAULT '0',
  `rearLeftTorsoArmor` int NOT NULL DEFAULT '0',
  `rearRightTorsoArmor` int NOT NULL DEFAULT '0',
  `legLeftArmor` int NOT NULL DEFAULT '0',
  `legRightArmor` int NOT NULL DEFAULT '0',
  `mechArmorTotal` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `mechhead` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mechID` int DEFAULT NULL,
  `partLeftorRight` varchar(255) DEFAULT '2',
  `slot1` varchar(255) DEFAULT '',
  `slot2` varchar(255) DEFAULT '',
  `slot3` varchar(255) DEFAULT '',
  `slot4` varchar(255) DEFAULT '',
  `slot5` varchar(255) DEFAULT '',
  `slot6` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `mechinternals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mechID` int DEFAULT NULL,
  `jumpJetsNum` int DEFAULT '0',
  `internalStructureTonnage` int DEFAULT '0',
  `engineTonnage` int DEFAULT '0',
  `gyroTonnage` int DEFAULT '0',
  `jumpJetsTonnage` int DEFAULT '0',
  `cockpitTonnage` int DEFAULT '0',
  `heatSinksTonnage` int DEFAULT '0',
  `totalInternalTonnage` int DEFAULT '0',
  `internalStructureCriticals` int DEFAULT '0',
  `engineCriticals` int DEFAULT '0',
  `gyroCriticals` int DEFAULT '0',
  `cockpitCriticals` int DEFAULT '0',
  `heatSinksCriticals` int DEFAULT '0',
  `enhancementsTonnage` int DEFAULT '0',
  `enhancementsCriticals` int DEFAULT '0',
  `jumpJetsCriticals` int DEFAULT '0',
  `heatSinkType` varchar(255) DEFAULT 'Singles',
  `heatSinksNum` int DEFAULT '0',
  `weaponTonnage` int DEFAULT '0',
  `internalStructureType` varchar(100) DEFAULT 'Standard',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `mechleg` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mechID` int DEFAULT NULL,
  `partLeftorRight` int DEFAULT '0',
  `slot1` varchar(255) DEFAULT '',
  `slot2` varchar(255) DEFAULT '',
  `slot3` varchar(255) DEFAULT '',
  `slot4` varchar(255) DEFAULT '',
  `slot5` varchar(255) DEFAULT '',
  `slot6` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `mechs` (
  `mechID` int NOT NULL AUTO_INCREMENT,
  `mechName` varchar(255) DEFAULT '',
  `armor` int DEFAULT '0',
  `maxTonnage` int DEFAULT '0',
  `introDate` int DEFAULT '3000',
  `mechModel` varchar(255) DEFAULT '',
  `era` varchar(255) DEFAULT 'Star League',
  `techBase` varchar(255) DEFAULT 'Inner-Sphere',
  `productionYear` varchar(255) DEFAULT '3030',
  PRIMARY KEY (`mechID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `mechtorso` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mechID` int DEFAULT NULL,
  `partLeftorRight` varchar(255) DEFAULT '0',
  `slot1` varchar(255) DEFAULT '',
  `slot2` varchar(255) DEFAULT '',
  `slot3` varchar(255) DEFAULT '',
  `slot4` varchar(255) DEFAULT '',
  `slot5` varchar(255) DEFAULT '',
  `slot6` varchar(255) DEFAULT '',
  `slot7` varchar(255) DEFAULT '',
  `slot8` varchar(255) DEFAULT '',
  `slot9` varchar(255) DEFAULT '',
  `slot10` varchar(255) DEFAULT '',
  `slot11` varchar(255) DEFAULT '',
  `slot12` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `mechtorsocenter` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mechID` int DEFAULT NULL,
  `partLeftorRight` varchar(255) DEFAULT '2',
  `slot1` varchar(255) DEFAULT '',
  `slot2` varchar(255) DEFAULT '',
  `slot3` varchar(255) DEFAULT '',
  `slot4` varchar(255) DEFAULT '',
  `slot5` varchar(255) DEFAULT '',
  `slot6` varchar(255) DEFAULT '',
  `slot7` varchar(255) DEFAULT '',
  `slot8` varchar(255) DEFAULT '',
  `slot9` varchar(255) DEFAULT '',
  `slot10` varchar(255) DEFAULT '',
  `slot11` varchar(255) DEFAULT '',
  `slot12` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `mechweapons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `weaponName` varchar(255) DEFAULT '',
  `damage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `heat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `rangeMin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `rangeShort` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `rangeMed` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `rangeLong` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `tons` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `slotsRequired` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `ammoNeeded` varchar(255) DEFAULT '',
  `weaponType` varchar(255) DEFAULT '',
  `availableDate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `techBase` varchar(20) DEFAULT 'Inner-Sphere',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Reference data, not modified but used for other calcuations
CREATE TABLE `engineratingweights` (
  `engineRating` int NOT NULL,
  `regEngWeight` float NOT NULL,
  `xlEngWeight` float NOT NULL,
  `gyroWeight` float NOT NULL,
  PRIMARY KEY (`engineRating`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Also reference table, max armor per tonnage used a lot
CREATE TABLE `maxarmorfortonnage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mechTonnage` int DEFAULT '20',
  `torsoMax` int DEFAULT '0',
  `armMax` int DEFAULT '0',
  `legMax` int DEFAULT '0',
  `centerTorsoMax` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Example starter mechs (2 clan and 1 IS)
INSERT INTO `mecharm` (`id`, `mechID`, `partLeftorRight`, `slot1`, `slot2`, `slot3`, `slot4`, `slot5`, `slot6`, `slot7`, `slot8`, `slot9`, `slot10`, `slot11`, `slot12`) VALUES
(3, 1, 0, 'Medium ER Laser (Clan)', 'Large ER Laser (Clan)', 'overflow', '', '', '', '', '', '', '', '', ''),
(5, 1, 1, 'Medium ER Laser (Clan)', 'Large ER Laser (Clan)', 'overflow', '', '', '', '', '', '', '', '', ''),
(19, 16, 0, 'Large Pulse Laser (Clan)', 'overflow', 'Medium Pulse Laser (Clan)', '', '', '', '', '', '', '', '', ''),
(20, 16, 1, 'Large Pulse Laser (Clan)', 'overflow', 'Medium Pulse Laser (Clan)', '', '', '', '', '', '', '', '', ''),
(23, 18, 0, 'PPC', 'overflow', 'overflow', '', '', '', '', '', '', '', '', ''),
(24, 18, 1, 'PPC', 'overflow', 'overflow', '', '', '', '', '', '', '', '', '');

-- Example starter mechs (2 clan and 1 IS)
INSERT INTO `mechengine` (`id`, `mechID`, `engineName`, `activeEngine`, `engineRating`, `mechWalk`, `mechRun`, `mechJump`) VALUES
(1, 1, 'XL Engine', 1, 2, 5, 8, 0),
(9, 16, 'XL Engine', 1, 2, 5, 8, 0),
(11, 18, 'Fusion Engine', 1, 3, 4, 6, 0);

-- Example starter mechs (2 clan and 1 IS)
INSERT INTO `mechexternalarmor` (`id`, `mechID`, `armLeftArmor`, `armRightArmor`, `headArmor`, `centerArmor`, `rearCenterArmor`, `torsoLeftArmor`, `torsoRightArmor`, `rearLeftTorsoArmor`, `rearRightTorsoArmor`, `legLeftArmor`, `legRightArmor`, `mechArmorTotal`) VALUES
(1, 1, 24, 24, 9, 36, 9, 25, 25, 7, 7, 32, 32, 230),
(9, 16, 16, 16, 9, 23, 7, 16, 16, 7, 7, 23, 23, 163),
(11, 18, 20, 20, 9, 22, 9, 17, 17, 8, 8, 15, 15, 160);

-- Example starter mechs (2 clan and 1 IS)
INSERT INTO `mechhead` (`id`, `mechID`, `partLeftorRight`, `slot1`, `slot2`, `slot3`, `slot4`, `slot5`, `slot6`) VALUES
(1, 1, '2', 'Medium Pulse Laser (Clan)', '', '', '', '', ''),
(9, 16, '2', '', '', '', '', '', ''),
(11, 18, '2', '', '', '', '', '', '');

-- Example starter mechs (2 clan and 1 IS)
INSERT INTO `mechinternals` (`id`, `mechID`, `jumpJetsNum`, `internalStructureTonnage`, `engineTonnage`, `gyroTonnage`, `jumpJetsTonnage`, `cockpitTonnage`, `heatSinksTonnage`, `totalInternalTonnage`, `internalStructureCriticals`, `engineCriticals`, `gyroCriticals`, `cockpitCriticals`, `heatSinksCriticals`, `enhancementsTonnage`, `enhancementsCriticals`, `jumpJetsCriticals`, `heatSinkType`, `heatSinksNum`, `weaponTonnage`, `internalStructureType`) VALUES
(1, 1, 0, 4, 20, 4, 0, 3, 7, 38, 25, 12, 4, 1, 7, 0, 0, 0, 'Doubles', 17, 26, 'Endo Steel'),
(9, 16, 0, 6, 10, 3, 0, 3, 2, 24, 20, 12, 4, 1, 2, 0, 0, 0, 'Doubles', 12, 28, 'Standard'),
(11, 18, 0, 7, 16, 3, 0, 3, 8, 37, 20, 12, 4, 1, 2, 0, 0, 0, 'Singles', 18, 23, 'Standard');

-- Example starter mechs (2 clan and 1 IS)
INSERT INTO `mechleg` (`id`, `mechID`, `partLeftorRight`, `slot1`, `slot2`, `slot3`, `slot4`, `slot5`, `slot6`) VALUES
(3, 1, 0, '', '', '', '', '', ''),
(5, 1, 1, '', '', '', '', '', ''),
(19, 16, 0, '', '', '', '', '', ''),
(20, 16, 1, '', '', '', '', '', ''),
(23, 18, 0, '', '', '', '', '', ''),
(24, 18, 1, '', '', '', '', '', '');

-- Example starter mechs (2 clan and 1 IS)
INSERT INTO `mechs` (`mechID`, `mechName`, `armor`, `maxTonnage`, `introDate`, `mechModel`, `era`, `techBase`, `productionYear`) VALUES
(1, 'MadCat', 120, 75, 3025, 'Prime', 'Star League', 'Clan', '3030'),
(16, 'MadDog', 120, 60, 3025, 'Prime', 'Star League', 'Clan', '3055'),
(18, 'Warhammer', 120, 70, 3025, 'WHM-6R', 'Succession War', 'Inner-Sphere', '3030');

-- Example starter mechs (2 clan and 1 IS)
INSERT INTO `mechtorso` (`id`, `mechID`, `partLeftorRight`, `slot1`, `slot2`, `slot3`, `slot4`, `slot5`, `slot6`, `slot7`, `slot8`, `slot9`, `slot10`, `slot11`, `slot12`) VALUES
(1, 1, '0', 'Machine Gun (Clan)', 'LRM-20 (Clan)', 'overflow', 'LRM-20 Ammo (Clan)', '', '', '', '', '', '', '', ''),
(3, 1, '1', 'Machine Gun (Clan)', 'LRM-20 (Clan)', 'overflow', 'LRM-20 Ammo (Clan)', '', '', '', '', '', '', '', ''),
(17, 16, '0', 'LRM-20 (Clan)', 'overflow', 'LRM-20 Ammo (Clan)', '', '', '', '', '', '', '', '', ''),
(18, 16, '1', 'LRM-20 (Clan)', 'overflow', 'LRM-20 Ammo (Clan)', '', '', '', '', '', '', '', '', ''),
(21, 18, '0', 'Machine Gun', 'Medium Laser', 'Small Laser', '', '', '', '', '', '', '', '', ''),
(22, 18, '1', 'Machine Gun', 'Medium Laser', 'Small Laser', 'SRM-6', 'overflow', 'SRM-6 Ammo', '', '', '', '', '', '');

-- Example starter mechs (2 clan and 1 IS)
INSERT INTO `mechtorsocenter` (`id`, `mechID`, `partLeftorRight`, `slot1`, `slot2`, `slot3`, `slot4`, `slot5`, `slot6`, `slot7`, `slot8`, `slot9`, `slot10`, `slot11`, `slot12`) VALUES
(1, 1, '2', 'Machine Gun Ammo (Clan)', 'Machine Gun Ammo (Clan)', '', '', '', '', '', '', '', '', '', ''),
(9, 16, '2', '', '', '', '', '', '', '', '', '', '', '', ''),
(11, 18, '2', 'Machine Gun Ammo', 'Machine Gun Ammo', '', '', '', '', '', '', '', '', '', '');

-- Always insert these, these are static and are added to mech customizations
INSERT INTO `mechweapons` (`id`, `weaponName`, `damage`, `heat`, `rangeMin`, `rangeShort`, `rangeMed`, `rangeLong`, `tons`, `slotsRequired`, `ammoNeeded`, `weaponType`, `availableDate`, `techBase`) VALUES
(1, 'Medium Laser', '5', '3', '0', '3', '6', '9', '1', '1', 'N/A', 'Energy', '3000', 'Inner-Sphere'),
(2, 'Small Laser', '3', '1', '0', '1', '2', '3', '0.5', '1', 'N/A', 'Energy', '3000', 'Inner-Sphere'),
(3, 'Large Laser', '8', '8', '0', '5', '10', '15', '5', '2', 'N/A', 'Energy', '3000', 'Inner-Sphere'),
(4, 'PPC', '10', '10', '3', '6', '12', '18', '7', '3', 'N/A', 'Energy', '3000', 'Inner-Sphere'),
(5, 'Flamer', '2', '3', '0', '1', '2', '3', '0.5', '1', 'N/A', 'Energy', '3000', 'Inner-Sphere'),
(6, 'Vehicle Flamer', '2', '3', '0', '1', '2', '3', '0.5', '1', 'Yes', 'Energy', '3000', 'Inner-Sphere'),
(7, 'Machine Gun', '2', '0', '0', '1', '2', '3', '0.5', '1', 'Yes', 'Ballistics', '3000', 'Inner-Sphere'),
(8, 'Autocannon 2', '2', '1', '0', '8', '16', '24', '6', '1', 'Yes', 'Ballistics', '3000', 'Inner-Sphere'),
(9, 'Autocannon 5', '5', '1', '3', '6', '12', '18', '8', '4', 'Yes', 'Ballistics', '3000', 'Inner-Sphere'),
(10, 'Autocannon 10', '10', '3', '0', '5', '10', '15', '12', '7', 'Yes', 'Ballistics', '3000', 'Inner-Sphere'),
(11, 'Autocannon 20', '20', '7', '0', '3', '6', '9', '14', '10', 'Yes', 'Ballistics', '3000', 'Inner-Sphere'),
(12, 'SRM-2', '4', '2', '0', '3', '6', '9', '1', '1', 'Yes', 'Missiles', '3000', 'Inner-Sphere'),
(13, 'SRM-4', '8', '3', '0', '3', '6', '9', '2', '1', 'Yes', 'Missiles', '3000', 'Inner-Sphere'),
(14, 'SRM-6', '12', '4', '0', '3', '6', '9', '3', '2', 'Yes', 'Missiles', '3000', 'Inner-Sphere'),
(15, 'LRM-5', '5', '2', '6', '7', '14', '21', '2', '2', 'Yes', 'Missiles', '3000', 'Inner-Sphere'),
(16, 'LRM-10', '10', '4', '6', '7', '14', '21', '5', '2', 'Yes', 'Missiles', '3000', 'Inner-Sphere'),
(17, 'LRM-15', '15', '5', '6', '7', '14', '21', '7', '3', 'Yes', 'Missiles', '3000', 'Inner-Sphere'),
(18, 'LRM-20', '20', '6', '6', '7', '14', '21', '10', '5', 'Yes', 'Missiles', '3000', 'Inner-Sphere'),
(19, 'SRM-2 Ammo', '', '', '', '', '', '', '1', '1', '', 'Ammunition', '3000', 'Inner-Sphere'),
(20, 'SRM-4 Ammo', '', '', '', '', '', '', '1', '1', '', 'Ammunition', '3000', 'Inner-Sphere'),
(21, 'SRM-6 Ammo', '', '', '', '', '', '', '1', '1', '', 'Ammunition', '3000', 'Inner-Sphere'),
(22, 'LRM-5 Ammo', '', '', '', '', '', '', '1', '1', '', 'Ammunition', '3000', 'Inner-Sphere'),
(23, 'LRM-10 Ammo', '', '', '', '', '', '', '1', '1', '', 'Ammunition', '3000', 'Inner-Sphere'),
(24, 'LRM-15 Ammo', '', '', '', '', '', '', '1', '1', '', 'Ammunition', '3000', 'Inner-Sphere'),
(25, 'LRM-20 Ammo', '', '', '', '', '', '', '1', '1', '', 'Ammunition', '3000', 'Inner-Sphere'),
(26, 'Machine Gun Ammo', '', '', '', '', '', '', '0.5', '1', '', 'Ammunition', '3000', 'Inner-Sphere'),
(27, 'Autocannon 2 Ammo', '', '', '', '', '', '', '1', '1', '', 'Ammunition', '3000', 'Inner-Sphere'),
(28, 'Autocannon 5 Ammo', '', '', '', '', '', '', '1', '1', '', 'Ammunition', '3000', 'Inner-Sphere'),
(29, 'Autocannon 10 Ammo', '', '', '', '', '', '', '1', '1', '', 'Ammunition', '3000', 'Inner-Sphere'),
(30, 'Autocannon 20 Ammo', '', '', '', '', '', '', '1', '1', '', 'Ammunition', '3000', 'Inner-Sphere'),
(31, 'Vehicle Flamer Ammo', '', '', '', '', '', '', '1', '1', '', 'Ammunition', '3000', 'Inner-Sphere'),
(32, 'Medium Laser (Clan)', '5', '3', '0', '3', '6', '9', '1', '1', 'N/A', 'Energy', '3000', 'Clan'),
(33, 'Small Laser (Clan)', '3', '1', '0', '1', '2', '3', '0.5', '1', 'N/A', 'Energy', '3000', 'Clan'),
(34, 'Large Laser (Clan)', '8', '8', '0', '5', '10', '15', '4', '1', 'N/A', 'Energy', '3000', 'Clan'),
(35, 'PPC (Clan)', '10', '10', '0', '6', '12', '18', '6', '2', 'N/A', 'Energy', '3000', 'Clan'),
(36, 'Flamer (Clan)', '2', '3', '0', '1', '2', '3', '0.5', '1', 'N/A', 'Energy', '3000', 'Clan'),
(37, 'Machine Gun (Clan)', '2', '0', '0', '1', '2', '3', '0.25', '1', 'Yes', 'Ballistics', '3000', 'Clan'),
(38, 'Autocannon 2 (Clan)', '2', '1', '0', '8', '16', '24', '5', '1', 'Yes', 'Ballistics', '3000', 'Clan'),
(39, 'Autocannon 5 (Clan)', '5', '1', '0', '6', '12', '18', '6', '3', 'Yes', 'Ballistics', '3000', 'Clan'),
(40, 'Autocannon 10 (Clan)', '10', '3', '0', '5', '10', '15', '10', '6', 'Yes', 'Ballistics', '3000', 'Clan'),
(41, 'Autocannon 20 (Clan)', '20', '7', '0', '3', '6', '9', '12', '10', 'Yes', 'Ballistics', '3000', 'Clan'),
(42, 'SRM-2 (Clan)', '4', '2', '0', '3', '6', '9', '0.5', '1', 'Yes', 'Missiles', '3000', 'Clan'),
(43, 'SRM-4 (Clan)', '8', '3', '0', '3', '6', '9', '1', '1', 'Yes', 'Missiles', '3000', 'Clan'),
(44, 'SRM-6 (Clan)', '12', '4', '0', '3', '6', '9', '1.5', '1', 'Yes', 'Missiles', '3000', 'Clan'),
(45, 'LRM-5 (Clan)', '5', '2', '0', '7', '14', '21', '1', '1', 'Yes', 'Missiles', '3000', 'Clan'),
(46, 'LRM-10 (Clan)', '10', '4', '0', '7', '14', '21', '2.5', '2', 'Yes', 'Missiles', '3000', 'Clan'),
(47, 'LRM-15 (Clan)', '15', '5', '0', '7', '14', '21', '3.5', '2', 'Yes', 'Missiles', '3000', 'Clan'),
(48, 'LRM-20 (Clan)', '20', '6', '0', '7', '14', '21', '5', '2', 'Yes', 'Missiles', '3000', 'Clan'),
(49, 'SRM-2 Ammo (Clan)', '', '', '', '', '', '', '1', '1', '', 'Ammunition', '3000', 'Clan'),
(50, 'SRM-4 Ammo (Clan)', '', '', '', '', '', '', '1', '1', '', 'Ammunition', '3000', 'Clan'),
(51, 'SRM-6 Ammo (Clan)', '', '', '', '', '', '', '1', '1', '', 'Ammunition', '3000', 'Clan'),
(52, 'LRM-5 Ammo (Clan)', '', '', '', '', '', '', '1', '1', '', 'Ammunition', '3000', 'Clan'),
(53, 'LRM-10 Ammo (Clan)', '', '', '', '', '', '', '1', '1', '', 'Ammunition', '3000', 'Clan'),
(54, 'LRM-15 Ammo (Clan)', '', '', '', '', '', '', '1', '1', '', 'Ammunition', '3000', 'Clan'),
(55, 'LRM-20 Ammo (Clan)', '', '', '', '', '', '', '1', '1', '', 'Ammunition', '3000', 'Clan'),
(56, 'Machine Gun Ammo (Clan)', '', '', '', '', '', '', '0.5', '1', '', 'Ammunition', '3000', 'Clan'),
(57, 'Small Pulse Laser (IS)', '3', '2', '0', '2', '4', '6', '1', '1', 'N/A', 'Energy', '3025', 'Inner-Sphere'),
(58, 'Medium Pulse Laser (IS)', '6', '4', '0', '3', '6', '9', '2', '1', 'N/A', 'Energy', '3025', 'Inner-Sphere'),
(59, 'Large Pulse Laser (IS)', '10', '10', '0', '5', '10', '15', '7', '2', 'N/A', 'Energy', '3025', 'Inner-Sphere'),
(60, 'Small Pulse Laser (Clan)', '3', '2', '0', '3', '6', '9', '0.5', '1', 'N/A', 'Energy', '2825', 'Clan'),
(61, 'Medium Pulse Laser (Clan)', '7', '4', '0', '4', '8', '12', '2', '1', 'N/A', 'Energy', '2825', 'Clan'),
(62, 'Large Pulse Laser (Clan)', '10', '10', '0', '7', '14', '21', '6', '2', 'N/A', 'Energy', '2825', 'Clan'),
(63, 'Small ER Laser (IS)', '3', '2', '0', '2', '4', '6', '0.5', '1', 'N/A', 'Energy', '3049', 'Inner-Sphere'),
(64, 'Medium ER Laser (IS)', '5', '5', '0', '5', '10', '15', '1', '1', 'N/A', 'Energy', '3049', 'Inner-Sphere'),
(65, 'Large ER Laser (IS)', '8', '8', '0', '8', '15', '25', '5', '2', 'N/A', 'Energy', '3049', 'Inner-Sphere'),
(66, 'Small ER Laser (Clan)', '5', '2', '0', '3', '6', '9', '0.5', '1', 'N/A', 'Energy', '2825', 'Clan'),
(67, 'Medium ER Laser (Clan)', '7', '5', '0', '7', '14', '21', '1', '1', 'N/A', 'Energy', '2825', 'Clan'),
(68, 'Large ER Laser (Clan)', '10', '12', '0', '8', '25', '40', '4', '2', 'N/A', 'Energy', '2825', 'Clan'),
(69, 'Streak SRM-2 (IS)', '4', '2', '0', '3', '6', '9', '1.5', '1', 'Yes', 'Missiles', '3045', 'Inner-Sphere'),
(70, 'Streak SRM-4 (IS)', '8', '3', '0', '3', '6', '9', '2.5', '1', 'Yes', 'Missiles', '3045', 'Inner-Sphere'),
(71, 'Streak SRM-6 (IS)', '12', '4', '0', '3', '6', '9', '4.5', '2', 'Yes', 'Missiles', '3045', 'Inner-Sphere'),
(72, 'Streak SRM-2 (Clan)', '4', '2', '0', '3', '6', '9', '1', '1', 'Yes', 'Missiles', '2825', 'Clan'),
(73, 'Streak SRM-4 (Clan)', '8', '3', '0', '3', '6', '9', '2', '1', 'Yes', 'Missiles', '2825', 'Clan'),
(74, 'Streak SRM-6 (Clan)', '12', '4', '0', '3', '6', '9', '3', '2', 'Yes', 'Missiles', '2825', 'Clan');

-- Reference data, not modified but used for other calcuations
INSERT INTO `engineratingweights` (`engineRating`, `regEngWeight`, `xlEngWeight`, `gyroWeight`) VALUES
(100, 5, 2.5, 1),
(200, 10, 5, 2),
(300, 15, 7.5, 3),
(400, 20, 10, 4),
(500, 25, 12.5, 5),
(600, 30, 15, 6),
(700, 35, 17.5, 7),
(800, 40, 20, 8);

-- Reference data, not modified but used for other calcuations
INSERT INTO `maxarmorfortonnage` (`id`, `mechTonnage`, `torsoMax`, `armMax`, `legMax`, `centerTorsoMax`) VALUES
(18, 20, 18, 12, 14, 22),
(19, 25, 22, 14, 16, 28),
(20, 30, 26, 16, 18, 32),
(21, 35, 30, 18, 20, 38),
(22, 40, 34, 20, 22, 44),
(23, 45, 38, 22, 24, 50),
(24, 50, 42, 24, 26, 56),
(25, 55, 46, 26, 28, 62),
(26, 60, 50, 28, 30, 68),
(27, 65, 54, 30, 32, 74),
(28, 70, 58, 32, 34, 80),
(29, 75, 62, 34, 36, 86),
(30, 80, 66, 36, 38, 92),
(31, 85, 70, 38, 40, 98),
(32, 90, 74, 40, 42, 104),
(33, 95, 78, 42, 44, 110),
(34, 100, 82, 44, 46, 116);