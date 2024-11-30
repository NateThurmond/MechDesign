db = db.getSiblingDB('mechdesign');

const result = db.mechs.insertOne({
  "baseMech": 1,
  "mechs_mechID": 1,
  "mechs_mechName": "MadCat",
  "mechs_armor": 120,
  "mechs_maxTonnage": 75,
  "mechs_introDate": 3025,
  "mechs_mechModel": "Prime",
  "mechs_era": "Star League",
  "mechs_techBase": "Clan",
  "mechs_productionYear": "3030",
  "mecharmLeft_id": 3,
  "mecharmRight_id": 5,
  "mecharmLeft_mechID": 1,
  "mecharmRight_mechID": 1,
  "mecharmLeft_partLeftorRight": 0,
  "mecharmRight_partLeftorRight": 1,
  "mecharmLeft_slot1": "Medium ER Laser (Clan)",
  "mecharmRight_slot1": "Medium ER Laser (Clan)",
  "mecharmLeft_slot2": "Large ER Laser (Clan)",
  "mecharmRight_slot2": "Large ER Laser (Clan)",
  "mecharmLeft_slot3": "overflow",
  "mecharmRight_slot3": "overflow",
  "mecharmLeft_slot4": "",
  "mecharmRight_slot4": "",
  "mecharmLeft_slot5": "",
  "mecharmRight_slot5": "",
  "mecharmLeft_slot6": "",
  "mecharmRight_slot6": "",
  "mecharmLeft_slot7": "",
  "mecharmRight_slot7": "",
  "mecharmLeft_slot8": "",
  "mecharmRight_slot8": "",
  "mecharmLeft_slot9": "",
  "mecharmRight_slot9": "",
  "mecharmLeft_slot10": "",
  "mecharmRight_slot10": "",
  "mecharmLeft_slot11": "",
  "mecharmRight_slot11": "",
  "mecharmLeft_slot12": "",
  "mecharmRight_slot12": "",
  "mechengine_id": 1,
  "mechengine_mechID": 1,
  "mechengine_engineName": "XL Engine",
  "mechengine_activeEngine": 1,
  "mechengine_engineRating": 2,
  "mechengine_mechWalk": 5,
  "mechengine_mechRun": 8,
  "mechengine_mechJump": 0,
  "mechexternalarmor_id": 1,
  "mechexternalarmor_mechID": 1,
  "mechexternalarmor_armLeftArmor": 24,
  "mechexternalarmor_armRightArmor": 24,
  "mechexternalarmor_headArmor": 9,
  "mechexternalarmor_centerArmor": 36,
  "mechexternalarmor_rearCenterArmor": 9,
  "mechexternalarmor_torsoLeftArmor": 25,
  "mechexternalarmor_torsoRightArmor": 25,
  "mechexternalarmor_rearLeftTorsoArmor": 7,
  "mechexternalarmor_rearRightTorsoArmor": 7,
  "mechexternalarmor_legLeftArmor": 32,
  "mechexternalarmor_legRightArmor": 32,
  "mechexternalarmor_mechArmorTotal": 230,
  "mechhead_id": 1,
  "mechhead_mechID": 1,
  "mechhead_partLeftorRight": "2",
  "mechhead_slot1": "Medium Pulse Laser (Clan)",
  "mechhead_slot2": "",
  "mechhead_slot3": "",
  "mechhead_slot4": "",
  "mechhead_slot5": "",
  "mechhead_slot6": "",
  "mechinternals_id": 1,
  "mechinternals_mechID": 1,
  "mechinternals_jumpJetsNum": 0,
  "mechinternals_internalStructureTonnage": "4.0",
  "mechinternals_engineTonnage": "19.5",
  "mechinternals_gyroTonnage": "4.0",
  "mechinternals_jumpJetsTonnage": "0.0",
  "mechinternals_cockpitTonnage": "3.0",
  "mechinternals_heatSinksTonnage": "7.0",
  "mechinternals_totalInternalTonnage": "37.5",
  "mechinternals_internalStructureCriticals": 25,
  "mechinternals_engineCriticals": 12,
  "mechinternals_gyroCriticals": 4,
  "mechinternals_cockpitCriticals": 1,
  "mechinternals_heatSinksCriticals": 7,
  "mechinternals_enhancementsTonnage": 0,
  "mechinternals_enhancementsCriticals": 0,
  "mechinternals_jumpJetsCriticals": 0,
  "mechinternals_heatSinkType": "Doubles",
  "mechinternals_heatSinksNum": 17,
  "mechinternals_weaponTonnage": 26,
  "mechinternals_internalStructureType": "Endo Steel",
  "mechlegLeft_id": 3,
  "mechlegRight_id": 5,
  "mechlegLeft_mechID": 1,
  "mechlegRight_mechID": 1,
  "mechlegLeft_partLeftorRight": 0,
  "mechlegRight_partLeftorRight": 1,
  "mechlegLeft_slot1": "",
  "mechlegRight_slot1": "",
  "mechlegLeft_slot2": "",
  "mechlegRight_slot2": "",
  "mechlegLeft_slot3": "",
  "mechlegRight_slot3": "",
  "mechlegLeft_slot4": "",
  "mechlegRight_slot4": "",
  "mechlegLeft_slot5": "",
  "mechlegRight_slot5": "",
  "mechlegLeft_slot6": "",
  "mechlegRight_slot6": "",
  "mechtorsoLeft_id": 1,
  "mechtorsoRight_id": 3,
  "mechtorsoLeft_mechID": 1,
  "mechtorsoRight_mechID": 1,
  "mechtorsoLeft_partLeftorRight": "0",
  "mechtorsoRight_partLeftorRight": "1",
  "mechtorsoLeft_slot1": "Machine Gun (Clan)",
  "mechtorsoRight_slot1": "Machine Gun (Clan)",
  "mechtorsoLeft_slot2": "LRM-20 (Clan)",
  "mechtorsoRight_slot2": "LRM-20 (Clan)",
  "mechtorsoLeft_slot3": "overflow",
  "mechtorsoRight_slot3": "overflow",
  "mechtorsoLeft_slot4": "LRM-20 Ammo (Clan)",
  "mechtorsoRight_slot4": "LRM-20 Ammo (Clan)",
  "mechtorsoLeft_slot5": "",
  "mechtorsoRight_slot5": "",
  "mechtorsoLeft_slot6": "",
  "mechtorsoRight_slot6": "",
  "mechtorsoLeft_slot7": "",
  "mechtorsoRight_slot7": "",
  "mechtorsoLeft_slot8": "",
  "mechtorsoRight_slot8": "",
  "mechtorsoLeft_slot9": "",
  "mechtorsoRight_slot9": "",
  "mechtorsoLeft_slot10": "",
  "mechtorsoRight_slot10": "",
  "mechtorsoLeft_slot11": "",
  "mechtorsoRight_slot11": "",
  "mechtorsoLeft_slot12": "",
  "mechtorsoRight_slot12": "",
  "mechtorsocenter_id": 1,
  "mechtorsocenter_mechID": 1,
  "mechtorsocenter_partLeftorRight": "2",
  "mechtorsocenter_slot1": "Machine Gun Ammo (Clan)",
  "mechtorsocenter_slot2": "Machine Gun Ammo (Clan)",
  "mechtorsocenter_slot3": "",
  "mechtorsocenter_slot4": "",
  "mechtorsocenter_slot5": "",
  "mechtorsocenter_slot6": "",
  "mechtorsocenter_slot7": "",
  "mechtorsocenter_slot8": "",
  "mechtorsocenter_slot9": "",
  "mechtorsocenter_slot10": "",
  "mechtorsocenter_slot11": "",
  "mechtorsocenter_slot12": ""
});

print("Inserted document ID:", result.insertedId);