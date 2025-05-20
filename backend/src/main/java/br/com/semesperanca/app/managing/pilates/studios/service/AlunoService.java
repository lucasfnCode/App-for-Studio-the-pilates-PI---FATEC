package br.com.semesperanca.app.managing.pilates.studios.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

// import br.com.semesperanca.app.managing.pilates.studios.application.model.alunoInputDTO.AlunoInputDTO;
// import br.com.semesperanca.app.managing.pilates.studios.application.model.alunoInputDTO.AlunoOutputDTO;
// import br.com.semesperanca.app.managing.pilates.studios.application.model.alunoInputDTO.AreaClienteOutputDTO;
// import br.com.semesperanca.app.managing.pilates.studios.application.model.alunoInputDTO.AvaliacaoOutputDTO;
// import br.com.semesperanca.app.managing.pilates.studios.application.model.alunoInputDTO.PlanoOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.model.aluno.Aluno;
import br.com.semesperanca.app.managing.pilates.studios.model.aluno.AreaCliente;
import br.com.semesperanca.app.managing.pilates.studios.model.aluno.Avaliacao;
import br.com.semesperanca.app.managing.pilates.studios.model.aluno.Plano;
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
