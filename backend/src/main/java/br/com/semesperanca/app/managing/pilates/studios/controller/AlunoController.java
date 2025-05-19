package br.com.semesperanca.app.managing.pilates.studios.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.semesperanca.app.managing.pilates.studios.model.Aluno;
import br.com.semesperanca.app.managing.pilates.studios.service.AlunoService;


@RestController
@RequestMapping("/alunos")
public class AlunoController {
    
    @Autowired
    private AlunoService alunoService;
    
    @GetMapping
    public List<Aluno> listarAlunos(){
        return alunoService.listarAlunos("aluno");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aluno> getAlunoPorId(@PathVariable String id) {
    Aluno aluno = alunoService.listarAlunoPorId(id);
    if (aluno != null) {
        return ResponseEntity.ok(aluno);
    } else {
        return ResponseEntity.notFound().build();
    }

    }


    @PostMapping
    public Aluno salvarAluno(@RequestBody Aluno aluno){
        return alunoService.salvarAluno(aluno);
    }

}
