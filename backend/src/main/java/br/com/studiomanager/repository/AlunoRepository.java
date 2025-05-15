package br.com.studiomanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.studiomanager.model.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno, String> {

}