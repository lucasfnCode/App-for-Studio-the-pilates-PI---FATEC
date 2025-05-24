package br.com.semesperanca.app.managing.pilates.studios.application.controller;

import br.com.semesperanca.app.managing.pilates.studios.application.model.StudioInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.StudioOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.service.StudioService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/studios")
public class StudioController {

    private final StudioService service;

    @PostMapping
    public ResponseEntity<StudioOutputDTO> create(@RequestBody StudioInputDTO studio){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createStudio(studio));
    }

    @GetMapping
    public ResponseEntity<List<StudioOutputDTO>> listAll(){
        return ResponseEntity.ok(service.listAllStudios());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudioOutputDTO> getById(@PathVariable String id){
        return ResponseEntity.status(HttpStatus.OK).body(service.getStudioById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable String id){
        service.deleteStudio(id);
        return ResponseEntity.noContent().build();
    }


}
