package br.com.semesperanca.app.managing.pilates.studios.service;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.semesperanca.app.managing.pilates.studios.model.Instrutor;
import br.com.semesperanca.app.managing.pilates.studios.repository.InstrutorRepository;

@Service
public class InstrutorService {
    @Autowired
    private InstrutorRepository instrutorRepository;

    public List<Instrutor> listarInstrutores(String tipo) {
        return instrutorRepository.findByTipo(tipo);
    }

    public List<Instrutor> listaInstrutorById(String id){
        return instrutorRepository.findByTipo(id);

    }

    public Instrutor salvarUpdateByIdInstrutor(Instrutor instrutor) {
        return instrutorRepository.save(instrutor);
    }




}
