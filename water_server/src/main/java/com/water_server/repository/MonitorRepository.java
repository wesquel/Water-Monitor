package com.water_server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.water_server.model.Monitor;

@Repository
public interface MonitorRepository extends JpaRepository<Monitor, Long> {

    @Query("SELECT m FROM Monitor m WHERE m.MACAddress = :MACAddress")
    Monitor findByMACAddress(@Param("MACAddress") String MACAddress);
}
