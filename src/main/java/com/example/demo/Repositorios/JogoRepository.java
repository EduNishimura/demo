package com.example.demo.Repositorios;
import com.example.demo.Entidades.*;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
//import org.springframework.http.ResponseEntity;

public interface JogoRepository extends JpaRepository<Jogo, Long> {
  //ResponseEntity<Jogo> findByNomeContains(String nomeA);
  List<Jogo> findByNomeAContains(String nomeA);
  List<Jogo> findByNomeBContains(String nomeB);
}