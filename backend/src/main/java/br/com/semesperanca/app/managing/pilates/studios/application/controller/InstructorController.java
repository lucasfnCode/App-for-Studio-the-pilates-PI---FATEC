package br.com.semesperanca.app.managing.pilates.studios.application.controller;

import br.com.semesperanca.app.managing.pilates.studios.application.model.InstructorInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.InstructorOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.service.InstructorService;
import br.com.semesperanca.app.managing.pilates.studios.application.model.Messages;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@AllArgsConstructor
@RestController
@RequestMapping("/instructors")
public class InstructorController {
    
    private final InstructorService service;

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

    /*@PostMapping("/{id}")
    public ResponseEntity<InstructorOutputDTO> update(@PathVariable String id, @RequestBody InstructorInputDTO instructor) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.updateInstructorById(id, instructor));

    }*/
    
    
}