package br.com.semesperanca.app.managing.pilates.studios.application.controller;

import br.com.semesperanca.app.managing.pilates.studios.application.model.SessionInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.SessionOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.service.SessionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;

@AllArgsConstructor
@RestController
@RequestMapping("/sessions")

public class SessionController {
    
    private final SessionService service;

    @GetMapping("/actives")
    public ResponseEntity<List<SessionOutputDTO>> listAllActive() {
        return ResponseEntity.ok(service.listAllActiveSessions());
    }

    @GetMapping()
    public ResponseEntity<List<SessionOutputDTO>> listAll() {
        return ResponseEntity.ok(service.listAllSessions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SessionOutputDTO> listById(@PathVariable String id) {
        return ResponseEntity.ok(service.listSessionById(id));
    }

    @PostMapping()
    public ResponseEntity<SessionOutputDTO> open(@RequestBody SessionInputDTO session) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.openSession(session));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SessionOutputDTO> update(@PathVariable String id, @RequestBody SessionInputDTO session) {
       return ResponseEntity.status(HttpStatus.OK).body(service.updateSessionById(id, session));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SessionOutputDTO> desactive(@PathVariable String id){
        return ResponseEntity.ok(service.desactiveSessionById(id));
    }

    
    

}
