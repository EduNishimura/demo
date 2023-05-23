package com.example.demo.Controladores;
import com.example.demo.Repositorios.TimeRepository;
import com.example.demo.Entidades.Time;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;



@RestController
@RequestMapping(value = "/api")
public class TimeController {
  @Autowired
  private TimeRepository repository;

  
  @GetMapping("/times")
  public List<Time> getTimes() {
    return repository.findAll();
  }

 
  @PostMapping("/times")
  public Time postTime(@RequestBody Time time) {
    return repository.save(time);
  }

  @RequestMapping(value = "/times/{id}", method =  RequestMethod.PUT)
    public ResponseEntity<Time> Put(@PathVariable(value = "id") long id, @RequestBody 
    Time newTime)
    {
        Optional<Time> oldTime = repository.findById(id);
        if(oldTime.isPresent()){
            Time time = oldTime.get();
            time.setNome(newTime.getNome());
            time.setAnoF(newTime.getAnoF());
            time.setCidade(newTime.getCidade());
            time.setEstado(newTime.getEstado());
            repository.save(time);
            return new ResponseEntity<Time>(time, HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

   @RequestMapping(value = "/times/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Time> Delete(@PathVariable(value = "id") long id)
    {
        Optional<Time> time = repository.findById(id);
        if(time.isPresent()){
            repository.delete(time.get());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }



  @RequestMapping(value = "/times/{id}", method = RequestMethod.GET)
    public ResponseEntity<Time> GetById(@PathVariable(value = "id") long id)
    {
        Optional<Time> time = repository.findById(id);
        if(time.isPresent())
            return new ResponseEntity<Time>(time.get(), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

	
  @GetMapping("/times/search")
	public List<Time> timesBusca(@RequestParam("nome") String nome) {
     return repository.findByNomeContains(nome);
	}

  
}
