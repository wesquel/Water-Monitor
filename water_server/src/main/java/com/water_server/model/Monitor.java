package com.water_server.model;

import java.io.Serializable;
import java.util.UUID;

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
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    //@Column(name = "mac_address", unique = true)
    @Column(name = "mac_address")
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

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        long temp;
        temp = Double.doubleToLongBits(temperatura);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(turbidez);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(nivel);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(ph);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(condutividade);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Monitor other = (Monitor) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (Double.doubleToLongBits(temperatura) != Double.doubleToLongBits(other.temperatura))
            return false;
        if (Double.doubleToLongBits(turbidez) != Double.doubleToLongBits(other.turbidez))
            return false;
        if (Double.doubleToLongBits(nivel) != Double.doubleToLongBits(other.nivel))
            return false;
        if (Double.doubleToLongBits(ph) != Double.doubleToLongBits(other.ph))
            return false;
        if (Double.doubleToLongBits(condutividade) != Double.doubleToLongBits(other.condutividade))
            return false;
        return true;
    }




}
