package br.com.semesperanca.app.managing.pilates.studios.application.controller;

import br.com.semesperanca.app.managing.pilates.studios.application.model.receptionist.ReceptionistInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.receptionist.ReceptionistOutputDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.com.semesperanca.app.managing.pilates.studios.service.ReceptionistService;


import java.util.List;


@RestController
@RequestMapping("/users/receptionists")
@AllArgsConstructor
public class ReceptionistController {

    private final ReceptionistService service;

    @GetMapping("/actives")
    public ResponseEntity<List<ReceptionistOutputDTO>> listAllActive() {
        return ResponseEntity.ok(service.listAllActiveReceptionists());
    }

    @GetMapping()
    public ResponseEntity<List<ReceptionistOutputDTO>> listAll() {
        return ResponseEntity.ok(service.listAllReceptionists());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReceptionistOutputDTO> getById(@PathVariable String id) {
        return ResponseEntity.ok(service.getReceptionistById(id));
    }

    @PostMapping()
    public ResponseEntity<ReceptionistOutputDTO> register(@RequestBody ReceptionistInputDTO receptionist) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.registerReceptionist(receptionist));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReceptionistOutputDTO> update(@PathVariable String id, @RequestBody ReceptionistInputDTO receptionist) {
        return ResponseEntity.status(HttpStatus.OK).body(service.updateReceptionistById(id, receptionist));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ReceptionistOutputDTO> desactive(@PathVariable String id) {
        return ResponseEntity.status(HttpStatus.OK).body(service.desactiveReceptionistById(id));
    }

}
