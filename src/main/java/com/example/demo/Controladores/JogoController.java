package com.example.demo.Controladores;
import com.example.demo.Repositorios.JogoRepository;
import com.example.demo.Entidades.Jogo;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping(value = "/api")
public class JogoController {
  @Autowired
  private JogoRepository repository;

  // @RequestMapping(value = "/alunos", method = RequestMethod.GET)
  @GetMapping("/jogos")
  public List<Jogo> getJogos() {
    return repository.findAll();
  }

 // @RequestMapping(value = "/alunos", method = RequestMethod.POST)
  @PostMapping("/jogos")
  public Jogo postJogo(@RequestBody Jogo jogo) {
    return repository.save(jogo);
  }

  @RequestMapping(value = "/jogos/{id}", method =  RequestMethod.PUT)
    public ResponseEntity<Jogo> Put(@PathVariable(value = "id") long id, @RequestBody 
    Jogo newJogo)
    {
        Optional<Jogo> oldJogo = repository.findById(id);
        if(oldJogo.isPresent()){
            Jogo jogo = oldJogo.get();
            jogo.setNomeA(newJogo.getNomeA());
            jogo.setNomeB(newJogo.getNomeB());
            jogo.setPontosA(newJogo.getPontosA());
            jogo.setPontosB(newJogo.getPontosB());
            repository.save(jogo);
            return new ResponseEntity<Jogo>(jogo, HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

   @RequestMapping(value = "/jogos/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Jogo> Delete(@PathVariable(value = "id") long id)
    {
        Optional<Jogo> jogo = repository.findById(id);
        if(jogo.isPresent()){
            repository.delete(jogo.get());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


  @RequestMapping(value = "/jogos/{id}", method = RequestMethod.GET)
    public ResponseEntity<Jogo> GetById(@PathVariable(value = "id") long id)
    {
        Optional<Jogo> jogo = repository.findById(id);
        if(jogo.isPresent())
            return new ResponseEntity<Jogo>(jogo.get(), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  @GetMapping("/jogosA/search")
	public List<Jogo> jogoBuscaA(@RequestParam("nomeA") String nomeA) {
     return repository.findByNomeAContains(nomeA);
	}

  @GetMapping("/jogosB/search")
	public List<Jogo> jogoBuscaB(@RequestParam("nomeB") String nomeB) {
     return repository.findByNomeBContains(nomeB);
	}
}

