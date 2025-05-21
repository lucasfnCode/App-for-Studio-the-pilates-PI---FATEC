package br.com.semesperanca.app.managing.pilates.studios.application.controller;

import br.com.semesperanca.app.managing.pilates.studios.application.model.InstructorInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.InstructorOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.service.InstructorService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@AllArgsConstructor
@RestController
@RequestMapping("/instructors")
public class InstructorController {
    
    private final InstructorService service;

    @GetMapping()
    public ResponseEntity<List<InstructorOutputDTO>> listAll() {
        return ResponseEntity.ok(service.listAllInstructors());
    }

    @PostMapping()
    public ResponseEntity<InstructorOutputDTO> register(@RequestBody InstructorInputDTO instrutor) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.registerInstructor(instrutor));

    }
    
}