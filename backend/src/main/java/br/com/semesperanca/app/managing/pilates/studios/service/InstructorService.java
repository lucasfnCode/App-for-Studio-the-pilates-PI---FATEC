package br.com.semesperanca.app.managing.pilates.studios.service;

import br.com.semesperanca.app.managing.pilates.studios.application.model.InstructorInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.InstructorOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.model.Instructor;
import br.com.semesperanca.app.managing.pilates.studios.model.Role;
import br.com.semesperanca.app.managing.pilates.studios.model.User;
import br.com.semesperanca.app.managing.pilates.studios.repository.user.InstructorRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class InstructorService {

    private final InstructorRepository instructorRepository;
    private final PasswordEncoder passwordEncoder;

    public List<InstructorOutputDTO> listAllActiveInstructors() {
        List<Instructor> instructors = instructorRepository.findByRolesContaining(Role.ROLE_INSTRUCTOR)
                .stream().filter(User::getIsActive).toList();
        return instructors.stream().map(this::assemblerInstructorOutputDTO).toList();
    }

    public List<InstructorOutputDTO> listAllInstructors() {
        List<Instructor> instructors = instructorRepository.findByRolesContaining(Role.ROLE_INSTRUCTOR);
        return instructors.stream().map(this::assemblerInstructorOutputDTO).toList();
    }

    public InstructorOutputDTO getInstructorById(String id) {
        return assemblerInstructorOutputDTO(Objects.requireNonNull(checkIfIsActive(id)));
    }

    public InstructorOutputDTO registerInstructor(InstructorInputDTO instructorInputDTO) {
        return assemblerInstructorOutputDTO(instructorRepository.save(assemblerInstructorEntity(instructorInputDTO)));
    }

    public InstructorOutputDTO updateInstructorById(String id, InstructorInputDTO instructorInputDTO) {
        Optional<Instructor> optionalInstructor = instructorRepository.findById(id);
        if (optionalInstructor.isEmpty()) {
            throw new RuntimeException();
        }

        Instructor instructor = optionalInstructor.get();

        instructor.setName(instructorInputDTO.name());
        instructor.setRoles(instructorInputDTO.roles().stream().collect(Collectors.toSet()));
        instructor.setCpf(instructorInputDTO.cpf());
        instructor.setBirthDate(instructorInputDTO.birthDate());
        instructor.setEmail(instructorInputDTO.email());
        instructor.setContact(instructorInputDTO.contact());
        instructor.setFormation(instructorInputDTO.formation());
        instructor.setAdvice(instructorInputDTO.advice());
        instructor.setHiringDate(instructorInputDTO.hiringDate());
        instructor.setIsActive(instructorInputDTO.isActive());

        Instructor updated = instructorRepository.save(instructor);
        return assemblerInstructorOutputDTO(updated);
    }

    public InstructorOutputDTO desactiveInstructorById(String id) {
        Optional<Instructor> optionalInstructor = instructorRepository.findById(id);
        if (optionalInstructor.isEmpty()) {
            throw new RuntimeException("Instrutor não encontrado.");
        }

        Instructor instructor = optionalInstructor.get();

        instructor.setIsActive(Boolean.FALSE);

        Instructor desactived = instructorRepository.save(instructor);
        return assemblerInstructorOutputDTO(desactived);

    }

    private Instructor checkIfIsActive(String id) {
        Optional<Instructor> optionalInstructor = instructorRepository.findById(id);
        if (optionalInstructor.isPresent()) {
            Instructor instructor = optionalInstructor.get();
            if (instructor.getIsActive()) {
                return instructor;
            }
        }
        return null;
    }

    private InstructorOutputDTO assemblerInstructorOutputDTO(Instructor instructor) {
        return new InstructorOutputDTO(
                instructor.getId(),
                instructor.getName(),
                instructor.getRoles(),
                instructor.getCpf(),
                instructor.getBirthDate(),
                instructor.getEmail(),
                instructor.getContact(),
                instructor.getPhoto(),
                instructor.getFormation(),
                instructor.getAdvice(),
                instructor.getHiringDate(),
                instructor.getIsActive());
    }

    private Instructor assemblerInstructorEntity(InstructorInputDTO dto) {
        return Instructor.builder()
                .name(dto.name())
                .roles(dto.roles().stream().collect(Collectors.toSet()))
                .cpf(dto.cpf())
                .birthDate(dto.birthDate())
                .email(dto.email())
                .contact(dto.contact())
                .photo(dto.photo())
                .isActive(dto.isActive())
                .formation(dto.formation())
                .advice(dto.advice())
                .hiringDate(dto.hiringDate())
                .password(passwordEncoder.encode(dto.password()))
                .build();

    }

}