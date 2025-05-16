package br.com.semesperanca.app.managing.pilates.studios.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.semesperanca.app.managing.pilates.studios.model.Aluno;


public interface AlunoRepository extends JpaRepository<Aluno, String> {

}
