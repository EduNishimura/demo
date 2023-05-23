package com.example.demo.Repositorios;
import com.example.demo.Entidades.*;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface TimeRepository extends JpaRepository<Time, Long> {
  List<Time> findByNomeContains(String nome);
}
