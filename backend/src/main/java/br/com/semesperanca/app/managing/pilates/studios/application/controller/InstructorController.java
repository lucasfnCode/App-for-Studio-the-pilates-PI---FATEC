package br.com.semesperanca.app.managing.pilates.studios.application.controller;

import br.com.semesperanca.app.managing.pilates.studios.application.model.InstructorInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.InstructorOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.service.InstructorService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;



@AllArgsConstructor
@RestController
@RequestMapping("/instructors")
public class InstructorController {
    
    private final InstructorService service;

    @GetMapping("/actives")
    public ResponseEntity<List<InstructorOutputDTO>> listAllActive() {
        return ResponseEntity.ok(service.listAllActiveInstructors());
    }

    @GetMapping()
    public ResponseEntity<List<InstructorOutputDTO>> listAll() {
        return ResponseEntity.ok(service.listAllInstructors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InstructorOutputDTO> getById(@PathVariable String id) {
        return ResponseEntity.ok(service.getInstructorById(id));
    }
    
    @PostMapping()
    public ResponseEntity<InstructorOutputDTO> register(@RequestBody InstructorInputDTO instructor) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.registerInstructor(instructor));

    }

    @PutMapping("/{id}")
    public ResponseEntity<InstructorOutputDTO> update(@PathVariable String id, @RequestBody InstructorInputDTO instructor) {
        return ResponseEntity.status(HttpStatus.OK).body(service.updateInstructorById(id, instructor));
        
    }

    /*
    
     Anotações -- 

     Possiveis funções a serem adicionadas:
     1. Função para ativar ou desativar um instrutor(sem precisar mandar os dados do instrutor junto no body).
     2. sla tinha mais coisa qnd eu pensei em fzr essa anotações, mas são 5h 04min da manhã e eu esqueci oq eu ia colocar obs* estou acabado :)

     Qualquer comentário pode colocar aq ou na task no github

    */
    
}