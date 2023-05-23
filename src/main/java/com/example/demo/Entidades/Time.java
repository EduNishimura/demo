package com.example.demo.Entidades;

import javax.persistence.*;

@Entity
@Table(name="times")
public class Time {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;
    private String nome;
    private int anoF;
    private String cidade;
    private String estado;
  
  public Time() {
    nome = "";
  }

  public Time(long id, String nome, int anoF, String cidade, String estado) {
    this.id = id;
    this.nome = nome;
    this.anoF = anoF;
    this.cidade = cidade;
    this.estado = estado;
  }

  public long getId() { return this.id; }
  public String getNome() { return this.nome; }
  public int getAnoF() { return this.anoF; }
  public String getCidade() { return this.cidade; }
  public String getEstado() { return this.estado; }

  public void setId(long id) {this.id = id; }
  public void setNome(String nome) {this.nome = nome; }
  public void setAnoF(int anoF) {this.anoF = anoF; }
  public void setCidade(String cidade) {this.cidade = cidade; }
  public void setEstado(String estado) {this.estado = estado; }

  public String toString() {
    return "Time " + nome + ", ID: " + id + ", Ano de Fundacao " + anoF + ", Cidade " + cidade + ", Estado " + estado;
  }
}
