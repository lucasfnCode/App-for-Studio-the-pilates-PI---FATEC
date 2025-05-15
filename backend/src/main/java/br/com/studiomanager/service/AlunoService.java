package br.com.studiomanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import br.com.studiomanager.model.Aluno;
import br.com.studiomanager.repository.AlunoRepository;
import org.springframework.stereotype.Service;

@Service
public class AlunoService {
    @Autowired
    private AlunoRepository alunoRepository;

    public List<Aluno> listarAlunos(){
        return alunoRepository.findAll();
    }

    public Aluno salvarAluno(Aluno aluno){
        return alunoRepository.save(aluno);
    }
}
