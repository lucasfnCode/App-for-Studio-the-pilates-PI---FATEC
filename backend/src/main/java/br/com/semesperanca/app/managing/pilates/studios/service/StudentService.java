package br.com.semesperanca.app.managing.pilates.studios.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import br.com.semesperanca.app.managing.pilates.studios.application.model.studentInputDTO.StudentInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.studentInputDTO.UpComingClassInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.studentOutputDTO.StudentOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.studentOutputDTO.UpComingClassOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.studentOutputDTO.ClientAreaOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.studentOutputDTO.AssessmentOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.studentOutputDTO.PlanOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.model.student.Student;
import br.com.semesperanca.app.managing.pilates.studios.model.student.UpComingClass;
import br.com.semesperanca.app.managing.pilates.studios.model.student.ClientArea;
import br.com.semesperanca.app.managing.pilates.studios.model.student.Assessment;
import br.com.semesperanca.app.managing.pilates.studios.model.student.Plan;
import br.com.semesperanca.app.managing.pilates.studios.repository.StudentRepository;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service

public class StudentService {

    private final StudentRepository studentRepository;

    public List<StudentOutputDTO> getAllStudentsByRole(String role) {
        return studentRepository.findByRole(role).stream()
                .map(this::assemblerStudentOutputDTO)
                .collect(Collectors.toList());
    }

    public StudentOutputDTO getStudentById(String id) {
        return studentRepository.findById(id)
                .map(this::assemblerStudentOutputDTO)
                .orElse(null);

    }

    public StudentOutputDTO getStudentByCpf(String cpf) {
        Student student = studentRepository.findByCpf(cpf)
                .orElseThrow(() -> new RuntimeException("Student not found with CPF: " + cpf));
        return assemblerStudentOutputDTO(student);
    }

    public List<StudentOutputDTO> listAllActiveStudent() {
        List<Student> Students = studentRepository.findAll().stream()
            .filter(i -> Boolean.TRUE.equals(i.getIsActive()))
            .toList();
        return Students.stream().map(this::assemblerStudentOutputDTO).toList();
    }

    public StudentOutputDTO createStudent(StudentInputDTO dto) {
        Student student = assemblerStudentEntity(dto);
        Student saved = studentRepository.save(student);
        return assemblerStudentOutputDTO(saved);
    }

    public void desactivateStudent(String id) {
        studentRepository.findById(id)
                .filter(Student::getIsActive)
                .ifPresent(student -> {
                    student.setIsActive(false);
                    studentRepository.save(student);
                });
    }

    public void activateStudent(String id) {
        studentRepository.findById(id)
                .filter(student -> !student.getIsActive())
                .ifPresent(student -> {
                    student.setIsActive(true);
                    studentRepository.save(student);
                });
    }

    public StudentOutputDTO updateStudent(String id, StudentInputDTO dto) {
        return studentRepository.findById(id)
                .map(existingStudent -> {
                    existingStudent.setName(dto.name());
                    existingStudent.setRole(dto.role());
                    existingStudent.setCpf(dto.cpf());
                    existingStudent.setBirthDate(dto.birthDate());
                    existingStudent.setEmail(dto.email());
                    existingStudent.setContact(dto.contact());
                    existingStudent.setPhoto(dto.photo());
                    existingStudent.setIsActive(dto.isActive());
                    existingStudent.setProgress(dto.progress());

                    if (dto.assessment() != null) {
                        existingStudent.setAssessment(new Assessment(
                                dto.assessment().description(),
                                dto.assessment().professional(),
                                dto.assessment().posturalPhoto(),
                                dto.assessment().relevantData()));
                    }

                    if (dto.plan() != null) {
                        existingStudent.setPlan(new Plan(
                                dto.plan().modality(),
                                dto.plan().frequency(),
                                dto.plan().duration(),
                                dto.plan().startDate(),
                                dto.plan().paymentMethod(),
                                dto.plan().discount(),
                                dto.plan().paymentType(),
                                dto.plan().firstPaymentDate(),
                                dto.plan().dueDate()));
                    }

                    if (dto.clientArea() != null) {
                        existingStudent.setClientArea(new ClientArea(
                                dto.clientArea().paymentDueDate(),
                                dto.clientArea().makeUps(),
                                dto.clientArea().paymentProof(),
                                dto.clientArea().fiscalReceipt(),
                                dto.clientArea().contract(),
                                convertToEntityList(dto.clientArea().upComingClasses()), // aqui
                                dto.clientArea().imageAuthorization()));
                    }

                    Student updated = studentRepository.save(existingStudent);
                    return assemblerStudentOutputDTO(updated);
                })
                .orElse(null);
    }

    private Student assemblerStudentEntity(StudentInputDTO input) {
        Assessment assessment = new Assessment(
                input.assessment().description(),
                input.assessment().professional(),
                input.assessment().posturalPhoto(),
                input.assessment().relevantData());

        Plan plan = new Plan(
                input.plan().modality(),
                input.plan().frequency(),
                input.plan().duration(),
                input.plan().startDate(),
                input.plan().paymentMethod(),
                input.plan().discount(),
                input.plan().paymentType(),
                input.plan().firstPaymentDate(),
                input.plan().dueDate());

        ClientArea clientArea = new ClientArea(
                input.clientArea().paymentDueDate(),
                input.clientArea().makeUps(),
                input.clientArea().paymentProof(),
                input.clientArea().fiscalReceipt(),
                input.clientArea().contract(),
                convertToEntityList(input.clientArea().upComingClasses()), // aqui também
                input.clientArea().imageAuthorization());

        return new Student(
                input.name(),
                input.role(),
                input.cpf(),
                input.birthDate(),
                input.email(),
                input.contact(),
                input.photo(),
                input.isActive(),
                assessment,
                plan,
                clientArea,
                input.progress());
    }

    private StudentOutputDTO assemblerStudentOutputDTO(Student student) {
        AssessmentOutputDTO assessmentDTO = null;
        List<UpComingClassOutputDTO> upcomingDTOs = student.getClientArea().getUpComingClasses()
                .stream()
                .map(c -> new UpComingClassOutputDTO(
                        c.getDate(),
                        c.getTime(), 
                        c.getStatus())) 
                .collect(Collectors.toList());

        if (student.getAssessment() != null) {
            assessmentDTO = new AssessmentOutputDTO(
                    student.getAssessment().getDescription(),
                    student.getAssessment().getProfessional(),
                    student.getAssessment().getPosturalPhoto(),
                    student.getAssessment().getRelevantData());
        }

        PlanOutputDTO planDTO = null;
        if (student.getPlan() != null) {
            planDTO = new PlanOutputDTO(
                    student.getPlan().getModality(),
                    student.getPlan().getFrequency(),
                    student.getPlan().getDuration(),
                    student.getPlan().getStartDate(),
                    student.getPlan().getPaymentMethod(),
                    student.getPlan().getDiscount(),
                    student.getPlan().getPaymentType(),
                    student.getPlan().getFirstPaymentDate(),
                    student.getPlan().getDueDate());
        }

        ClientAreaOutputDTO clientAreaDTO = new ClientAreaOutputDTO(
                student.getClientArea().getPaymentDueDate(),
                student.getClientArea().getMakeUps(),
                student.getClientArea().getPaymentReceipt(),
                student.getClientArea().getFiscalReceipt(),
                student.getClientArea().getContract(),
                upcomingDTOs,
                student.getClientArea().getImageAuthorization());

        return new StudentOutputDTO(
                student.getId(),
                student.getName(),
                student.getRole(),
                student.getCpf(),
                student.getBirthDate(),
                student.getEmail(),
                student.getContact(),
                student.getPhoto(),
                assessmentDTO,
                student.getProgress(),
                planDTO,
                clientAreaDTO,
                student.getIsActive());
    }

    private List<UpComingClass> convertToEntityList(List<UpComingClassInputDTO> dtoList) {
        return dtoList.stream()
                .map(dto -> new UpComingClass(dto.date(), dto.time(), dto.status()))
                .collect(Collectors.toList());
    }

}