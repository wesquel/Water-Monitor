CREATE TABLE IF NOT EXISTS user_permission (
  id_user BINARY(16) NOT NULL,
  id_permission BINARY(16) NOT NULL,
  PRIMARY KEY (id_user, id_permission),
  KEY fk_user_permission_user (id_user),
  KEY fk_user_permission_permission (id_permission),
  CONSTRAINT fk_user_permission_user FOREIGN KEY (id_user) REFERENCES users (id),
  CONSTRAINT fk_user_permission_permission FOREIGN KEY (id_permission) REFERENCES permission (id)
) ENGINE=InnoDB;
