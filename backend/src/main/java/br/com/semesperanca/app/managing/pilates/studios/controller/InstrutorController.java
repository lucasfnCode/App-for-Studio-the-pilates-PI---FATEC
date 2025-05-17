package br.com.semesperanca.app.managing.pilates.studios.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import br.com.semesperanca.app.managing.pilates.studios.model.Instrutor;
import br.com.semesperanca.app.managing.pilates.studios.service.InstrutorService;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/instrutores")
public class InstrutorController {
    @Autowired
    private InstrutorService instrutorService;

    @GetMapping
    public List<Instrutor> listarInstrutores() {
        return instrutorService.listarInstrutores("instrutor");
    }

    @GetMapping("/instrutores/id")
    public List<Instrutor> listaInstrutorById(@RequestParam String id) {
        return instrutorService.listaInstrutorById(id);
    }
    

    @PostMapping
    public Instrutor salvarInstrutor(@RequestBody Instrutor instrutor) {
        return instrutorService.salvarUpdateByIdInstrutor(instrutor);
    }

}
