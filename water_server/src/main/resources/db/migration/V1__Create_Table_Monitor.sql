CREATE TABLE IF NOT EXISTS `monitor` (
  `id` BINARY(20) NOT NULL,
  `mac_address` varchar(255) NOT NULL,
  `temperatura` DECIMAL(10, 2) NOT NULL,
  `turbidez` DECIMAL(10, 2) NOT NULL,
  `nivel` DECIMAL(10, 2) NOT NULL,
  `ph` DECIMAL(10, 2) NOT NULL,
  `condutividade` DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY uk_mac_address (mac_address)
);