CREATE TABLE IF NOT EXISTS `monitor` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `mac_address` CHAR(12) NOT NULL,
  `temperatura` DECIMAL(10, 2) NOT NULL,
  `turbidez` DECIMAL(10, 2) NOT NULL,
  `nivel` DECIMAL(10, 2) NOT NULL,
  `ph` DECIMAL(10, 2) NOT NULL,
  `condutividade` DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY uk_mac_address (mac_address)
);