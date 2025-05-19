package br.com.semesperanca.app.managing.pilates.studios.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import br.com.semesperanca.app.managing.pilates.studios.model.Aluno;
import br.com.semesperanca.app.managing.pilates.studios.repository.AlunoRepository;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class AlunoService {
    @Autowired
    private AlunoRepository alunoRepository;

    public List<Aluno> listarAlunos(String tipo){
        return alunoRepository.findByTipo(tipo);
    }

    public Aluno listarAlunoPorId(String id) {
    return alunoRepository.findById(id).orElse(null);
    }

    

    public Aluno salvarAluno(Aluno aluno){
        return alunoRepository.save(aluno);
    }

}
