package com.water_server.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Monitor implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "temperatura")
    private double temperatura;
    @Column(name = "turbidez")
    private double turbidez;
    @Column(name = "nivel")
    private double nivel;

    public Monitor() {
    }

    public Monitor(double temperatura, double turbidez, double nivel) {
        this.temperatura = temperatura;
        this.turbidez = turbidez;
        this.nivel = nivel;
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

}
