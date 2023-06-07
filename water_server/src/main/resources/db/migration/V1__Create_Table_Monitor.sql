CREATE TABLE IF NOT EXISTS `monitor` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `temperatura` DECIMAL(10, 2) NOT NULL,
  `turbidz` DECIMAL(10, 2) NOT NULL,
  `nivel` DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (`id`)
);