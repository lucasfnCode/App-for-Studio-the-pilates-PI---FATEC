package br.com.semesperanca.app.managing.pilates.studios.application.controller;

import br.com.semesperanca.app.managing.pilates.studios.application.model.SessionInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.SessionOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.service.SessionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@AllArgsConstructor
@RestController
@RequestMapping("/sessions")

public class SessionController {
    
    private final SessionService service;

    @GetMapping("/actives")
    public ResponseEntity<List<SessionOutputDTO>> listAllActive() {
        return ResponseEntity.ok(service.listAllActiveSessions());
    }

    @PostMapping()
    public ResponseEntity<SessionOutputDTO> open(@RequestBody SessionInputDTO session) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.openSession(session));
    }
    
    

}
