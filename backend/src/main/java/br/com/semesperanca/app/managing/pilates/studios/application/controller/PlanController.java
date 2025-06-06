package br.com.semesperanca.app.managing.pilates.studios.application.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.semesperanca.app.managing.pilates.studios.application.model.plan.PlanInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.plan.PlanOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.service.PlanService;
import lombok.AllArgsConstructor;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@AllArgsConstructor
@RestController
@RequestMapping("/plans")
public class PlanController {

    private final PlanService service;

    @GetMapping("/actives")
    public ResponseEntity<List<PlanOutputDTO>> listAllActive() {
        return ResponseEntity.ok(service.listAllActivePlans());
    }

    @GetMapping()
    public ResponseEntity<List<PlanOutputDTO>> listAll() {
        return ResponseEntity.ok(service.listAllPlans());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlanOutputDTO> listById(@PathVariable String id) {
        return ResponseEntity.ok(service.listPlanById(id));
    }

    @PostMapping()
    public ResponseEntity<PlanOutputDTO> create(@RequestBody PlanInputDTO plan) {
        return ResponseEntity.ok(service.createPlan(plan));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlanOutputDTO> update(@PathVariable String id, @RequestBody PlanInputDTO plan) {
        return ResponseEntity.ok(service.updatePlanById(id, plan));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PlanOutputDTO> desactive(@PathVariable String id) {
        return ResponseEntity.ok(service.desactivePlanById(id));
    }
    

}
