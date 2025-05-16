package br.com.semesperanca.app.managing.pilates.studios.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.semesperanca.app.managing.pilates.studios.model.Aluno;
import br.com.semesperanca.app.managing.pilates.studios.service.AlunoService;


@RestController
@RequestMapping("/Alunos")
public class AlunoController {
    @Autowired
    private AlunoService alunoService;
    
    @GetMapping
    public List<Aluno> listarAlunos(){
        return alunoService.listarAlunos();
    }

    @PostMapping
    public Aluno salvarAluno(@RequestBody Aluno aluno){
        return alunoService.salvarAluno(aluno);
    }

}
