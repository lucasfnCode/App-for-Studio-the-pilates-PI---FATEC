package br.com.semesperanca.app.managing.pilates.studios.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.semesperanca.app.managing.pilates.studios.application.model.studentInputDTO.PlanStudentInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.studentInputDTO.StudentInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.studentInputDTO.UpComingClassInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.studentOutputDTO.StudentOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.studentOutputDTO.UpComingClassOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.studentOutputDTO.ClientAreaOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.studentOutputDTO.AssessmentOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.studentOutputDTO.PlanStudentOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.model.student.Student;
import br.com.semesperanca.app.managing.pilates.studios.model.student.UpComingClass;
import br.com.semesperanca.app.managing.pilates.studios.model.student.ClientArea;
import br.com.semesperanca.app.managing.pilates.studios.model.Plan;
import br.com.semesperanca.app.managing.pilates.studios.model.student.Assessment;
import br.com.semesperanca.app.managing.pilates.studios.model.student.PlanStudent;
import br.com.semesperanca.app.managing.pilates.studios.repository.PlanRepository;
import br.com.semesperanca.app.managing.pilates.studios.repository.StudentRepository;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class StudentService {

        private final StudentRepository studentRepository;

        private final PlanRepository planRepository;

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
                List<Student> students = studentRepository.findAll().stream()
                                .filter(i -> Boolean.TRUE.equals(i.getIsActive()))
                                .toList();
                return students.stream().map(this::assemblerStudentOutputDTO).toList();
        }

        public StudentOutputDTO createStudent(StudentInputDTO dto) {
                Student student = assemblerStudentEntity(dto);
                Student saved = studentRepository.save(student);
                return assemblerStudentOutputDTO(saved);
        }

        public StudentOutputDTO addPlanToStudent(String studentId, PlanStudentInputDTO planDTO) {
                return studentRepository.findById(studentId)
                                .map(student -> {
                                        PlanStudent plan = mergePlanData(planDTO);
                                        student.setPlan(plan);
                                        Student updated = studentRepository.save(student);
                                        return assemblerStudentOutputDTO(updated);
                                })
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                                                "Student not found with ID: " + studentId));
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


                                        if (dto.clientArea() != null) {
                                                existingStudent.setClientArea(new ClientArea(
                                                                dto.clientArea().paymentDueDate(),
                                                                dto.clientArea().makeUps(),
                                                                dto.clientArea().paymentProof(),
                                                                dto.clientArea().fiscalReceipt(),
                                                                dto.clientArea().contract(),
                                                                convertToEntityList(dto.clientArea().upComingClasses()),
                                                                dto.clientArea().imageAuthorization()));
                                        }

                                        Student updated = studentRepository.save(existingStudent);
                                        return assemblerStudentOutputDTO(updated);
                                })
                                .orElse(null);
        }

        public StudentOutputDTO cancelStudentPlan(String studentId) {
                Student student = studentRepository.findById(studentId)
                                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));

                if (student.getPlan() == null || Boolean.FALSE.equals(student.getPlan().getIsActive())) {
                        throw new RuntimeException("Student does not have an active plan.");
                }

                if (!cancelPlan(student)) {
                        throw new RuntimeException(
                                        "The plan cannot be canceled at this time. Please check the cancellation rules.");
                }

                student.getPlan().setIsActive(false);
                Student updated = studentRepository.save(student);

                return assemblerStudentOutputDTO(updated);
        }

        private Student assemblerStudentEntity(StudentInputDTO input) {
                Assessment assessment = new Assessment(
                                input.assessment().description(),
                                input.assessment().professional(),
                                input.assessment().posturalPhoto(),
                                input.assessment().relevantData());

                ClientArea clientArea = new ClientArea(
                                input.clientArea().paymentDueDate(),
                                input.clientArea().makeUps(),
                                input.clientArea().paymentProof(),
                                input.clientArea().fiscalReceipt(),
                                input.clientArea().contract(),
                                convertToEntityList(input.clientArea().upComingClasses()),
                                input.clientArea().imageAuthorization());

                return Student.builder()
                                .name(input.name())
                                .role(input.role())
                                .cpf(input.cpf())
                                .birthDate(input.birthDate())
                                .email(input.email())
                                .contact(input.contact())
                                .photo(input.photo())
                                .isActive(input.isActive())
                                .assessment(assessment)
                                .clientArea(clientArea)
                                .progress(input.progress())
                                .build();
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

                PlanStudentOutputDTO planDTO = null;
                if (student.getPlan() != null) {
                        planDTO = new PlanStudentOutputDTO(
                                        student.getPlan().getIdPlan(),
                                        student.getPlan().getDuration(),
                                        student.getPlan().getStartDate(),
                                        student.getPlan().getPaymentMethod(),
                                        student.getPlan().getDiscount(),
                                        student.getPlan().getPaymentType(),
                                        student.getPlan().getFirstPaymentDate(),
                                        student.getPlan().getDueDate(),
                                        student.getPlan().getIsActive());
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

        private PlanStudent mergePlanData(PlanStudentInputDTO dto) {
                Plan basePlan = planRepository.findById(dto.idPlan())
                                .orElseThrow(() -> new RuntimeException(
                                                "Plan not found with ID: " + dto.idPlan()));

                PlanStudent mergedPlan = new PlanStudent();
                mergedPlan.setIdPlan(basePlan.getId());

                mergedPlan.setDuration(dto.duration());
                mergedPlan.setStartDate(dto.startDate());
                mergedPlan.setPaymentMethod(dto.paymentMethod());
                mergedPlan.setPaymentType(dto.paymentType());
                mergedPlan.setDiscount(dto.discount());
                mergedPlan.setFirstPaymentDate(dto.firstPaymentDate());
                mergedPlan.setDueDate(dto.dueDate());
                mergedPlan.setIsActive(dto.isActive() != null ? dto.isActive() : true);

                return mergedPlan;
        }

        private boolean cancelPlan(Student student) {
                PlanStudent plan = student.getPlan();
                return plan != null;
        }

}
