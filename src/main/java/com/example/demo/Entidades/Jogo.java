package com.example.demo.Entidades;

import javax.persistence.*;

@Entity
@Table(name="jogos")
public class Jogo {
  @Id 
  @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;
    private String nomeA;
    private String nomeB;
    private int pontosA;
    private int pontosB;
  
  public Jogo() {
    nomeA = "";
    nomeB = "";
  }

  public Jogo(String nomeA, String nomeB, long id, int pontosA, int pontosB) {
    this.id = id;
    this.nomeA = nomeA;
    this.nomeB = nomeB;
    this.pontosA = pontosA;
    this.pontosB = pontosB;
  }

  public String getNomeA() { return this.nomeA; }
  public String getNomeB() { return this.nomeB; }
  public long getId() { return this.id; }
  public int getPontosA() { return this.pontosA; }
  public int getPontosB() { return this.pontosB; }

  public void setId(long id) {this.id = id;}
  public void setNomeA(String nomeA) {this.nomeA = nomeA;}
  public void setNomeB(String nomeB) {this.nomeB = nomeB;}
  public void setPontosA(int pontosA) {this.pontosA = pontosA;}
  public void setPontosB(int pontosB) {this.pontosB = pontosB;}

  public String toString() {
    return "ID: " + id + ", Nome time A: " + nomeA + ", Nome time B: " + nomeB + ", Pontos do time A " + pontosA + ", Pontos do time B " + pontosB;
  }
}