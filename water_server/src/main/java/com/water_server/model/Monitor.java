package com.water_server.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/**
 * Classe que representa os dados de monitoramento persistidos no banco de dados.
 * Essa classe é mapeada para uma entidade no banco de dados e armazena as informações
 * de temperatura, turbidez, nível, pH e condutividade de um monitoramento.
 */

@Entity
public class Monitor implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "mac_address", unique = true)
    private String MACAddress;

    @Column(name = "temperatura")
    private double temperatura;

    @Column(name = "turbidez")
    private double turbidez;

    @Column(name = "nivel")
    private double nivel;

    @Column(name = "ph")
    private double ph;

    @Column(name = "condutividade")
    private double condutividade;


    public Monitor() {
    }

    public Monitor(double temperatura, double turbidez, double nivel) {
        this.temperatura = temperatura;
        this.turbidez = turbidez;
        this.nivel = nivel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMACAddress() {
        return MACAddress;
    }

    public void setMACAddress(String MACAddress) {
        this.MACAddress = MACAddress;
    }

    public double getTemperatura() {
        return temperatura;
    }

    public void setTemperatura(double temperatura) {
        this.temperatura = temperatura;
    }

    public double getTurbidez() {
        return turbidez;
    }

    public void setTurbidez(double turbidez) {
        this.turbidez = turbidez;
    }

    public double getNivel() {
        return nivel;
    }

    public void setNivel(double nivel) {
        this.nivel = nivel;
    }   

    public double getPh() {
        return ph;
    }

    public void setPh(double ph) {
        this.ph = ph;
    }

    public double getCondutividade() {
        return condutividade;
    }

    public void setCondutividade(double condutividade) {
        this.condutividade = condutividade;
    }


}
