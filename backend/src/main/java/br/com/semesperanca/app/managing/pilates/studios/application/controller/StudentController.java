package br.com.semesperanca.app.managing.pilates.studios.application.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.semesperanca.app.managing.pilates.studios.application.model.studentInputDTO.StudentInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.studentOutputDTO.StudentOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.service.StudentService;

@RestController
@RequestMapping("/students")

public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping
    public ResponseEntity<StudentOutputDTO> create(@RequestBody StudentInputDTO dto) {
        StudentOutputDTO created = studentService.createStudent(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public ResponseEntity<List<StudentOutputDTO>> getAll() {
        List<StudentOutputDTO> students = studentService.getAllStudentsByRole("aluno");
        return ResponseEntity.ok(students);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentOutputDTO> getById(@PathVariable String id) {
        StudentOutputDTO student = studentService.getStudentById(id);
        return student != null ? ResponseEntity.ok(student) : ResponseEntity.notFound().build();
    }

    @GetMapping("/cpf{cpf}")
    public ResponseEntity<StudentOutputDTO> getByCpf(@PathVariable String cpf) {
        StudentOutputDTO student = studentService.getStudentByCpf(cpf);
        return ResponseEntity.ok(student);
    }

    @GetMapping("/actives")
    public ResponseEntity<List<StudentOutputDTO>> listAllActive() {
        return ResponseEntity.ok(studentService.listAllActiveStudent());
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentOutputDTO> update(@PathVariable String id, @RequestBody StudentInputDTO dto) {
        StudentOutputDTO updated = studentService.updateStudent(id, dto);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @PutMapping("/desactivate{id}")
    public ResponseEntity<Void> desactivate(@PathVariable String id) {
        studentService.desactivateStudent(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/activate{id}")
    public ResponseEntity<Void> activate(@PathVariable String id) {
        studentService.activateStudent(id);
        return ResponseEntity.noContent().build();
    }

}
