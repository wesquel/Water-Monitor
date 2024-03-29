package com.water_server.data;

import java.io.Serializable;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.github.dozermapper.core.Mapping;


/**
 * Classe que representa os dados de um monitoramento.
 * Essa classe encapsula as informações de um monitoramento, incluindo
 * os valores de pH, temperatura, turbidez e condutividade.
 */

@JsonIgnoreProperties({"id"})
public class MonitorVO implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Mapping("id")
    @JsonProperty("id")
    private UUID id;

    private String MACAddress;

    private double ph;

    private double temperatura;

    private double turbidez;

    private double condutividade;

    private double nivel;

    public MonitorVO() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getMACAddress() {
        return MACAddress;
    }

    public void setMACAddress(String MACAddress) {
        this.MACAddress = MACAddress;
    }

    public double getPh() {
        return ph;
    }

    public void setPh(double ph) {
        this.ph = ph;
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

    public double getCondutividade() {
        return condutividade;
    }

    public void setCondutividade(double condutividade) {
        this.condutividade = condutividade;
    }

    public double getNivel() {
        return nivel;
    }

    public void setNivel(double nivel) {
        this.nivel = nivel;
    }
}