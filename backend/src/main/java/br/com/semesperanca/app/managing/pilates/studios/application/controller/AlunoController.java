package br.com.semesperanca.app.managing.pilates.studios.application.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.semesperanca.app.managing.pilates.studios.application.model.alunoInputDTO.AlunoInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.alunoOutputDTO.AlunoOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.service.AlunoService;


@RestController
@RequestMapping("/alunos")
public class AlunoController {

    private final AlunoService alunoService;

    public AlunoController(AlunoService alunoService) {
        this.alunoService = alunoService;
    }

    @PostMapping
    public ResponseEntity<AlunoOutputDTO> create(@RequestBody AlunoInputDTO alunoDTO) {
        AlunoOutputDTO createdAluno = alunoService.salvarAluno(alunoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAluno);
    }

    @GetMapping
    public ResponseEntity<List<AlunoOutputDTO>> listAll() {
        List<AlunoOutputDTO> alunos = alunoService.listarAlunos("aluno");
        return ResponseEntity.ok(alunos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlunoOutputDTO> getById(@PathVariable String id) {
        AlunoOutputDTO aluno = alunoService.listarAlunoPorId(id);
        if (aluno != null) {
            return ResponseEntity.ok(aluno);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable String id) {
        alunoService.deleteAluno(id);
        return ResponseEntity.noContent().build();
    }
}
