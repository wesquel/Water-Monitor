package com.water_server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.water_server.model.Permission;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {
    
}