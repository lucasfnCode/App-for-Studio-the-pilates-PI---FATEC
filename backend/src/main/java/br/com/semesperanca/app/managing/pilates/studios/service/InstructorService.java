package br.com.semesperanca.app.managing.pilates.studios.service;


import org.springframework.stereotype.Service;

import br.com.semesperanca.app.managing.pilates.studios.application.model.InstructorOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.InstructorInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.Messages;
import br.com.semesperanca.app.managing.pilates.studios.model.Instructor;
import br.com.semesperanca.app.managing.pilates.studios.repository.InstructorRepository;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@AllArgsConstructor
@Service
public class InstructorService {

    private final InstructorRepository instructorRepository;

    public List<InstructorOutputDTO> listAllActiveInstructors() {
        List<Instructor> instructors = instructorRepository.findAll().stream()
            .filter(i -> Boolean.TRUE.equals(i.getIsActive()))
            .toList();
        return instructors.stream().map(this::assemblerInstructorOutputDTO).toList();
    }

    public List<InstructorOutputDTO> listAllInstructors(){
        List<Instructor> instructors = instructorRepository.findAll()
            .stream()
            .toList();
        return instructors.stream().map(this::assemblerInstructorOutputDTO).toList();
    }

    public InstructorOutputDTO getInstructorById(String id) {
        return assemblerInstructorOutputDTO(Objects.requireNonNull(checkIfIsActive(id)));
    }

    public InstructorOutputDTO registerInstructor(InstructorInputDTO instructorInputDTO){
        return assemblerInstructorOutputDTO(instructorRepository.save(assemblerInstructorEntity(instructorInputDTO)));
    }

    public InstructorOutputDTO updateInstructorById(String id, InstructorInputDTO instructorInputDTO){
        Optional<Instructor> optionalInstructor = instructorRepository.findById(id);
        if (optionalInstructor.isEmpty()){
            throw new RuntimeException(Messages.Instructor.notFound);
        }

        Instructor instructor = optionalInstructor.get();

        instructor.setFormation(instructorInputDTO.formation());
        instructor.setAdvice(instructorInputDTO.advice());
        instructor.setHiring_date(instructorInputDTO.hiring_date());
        instructor.setPermissions(instructorInputDTO.permissions());
        instructor.setIsActive(instructorInputDTO.isActive());

        Instructor updated = instructorRepository.save(instructor);
        return assemblerInstructorOutputDTO(updated);
    }

    private Instructor checkIfIsActive(String id) {
        Optional<Instructor> optionalInstructor = instructorRepository.findById(id);
        if(optionalInstructor.isPresent()) {
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
                instructor.getFormation(),
                instructor.getAdvice(),
                instructor.getHiring_date(),
                instructor.getPermissions()
        );
    }

    private Instructor assemblerInstructorEntity(InstructorInputDTO instructorInputDTO){
        return new Instructor(
            instructorInputDTO.formation(),
            instructorInputDTO.advice(),
            instructorInputDTO.hiring_date(),
            instructorInputDTO.permissions(),
            instructorInputDTO.isActive()
        );
    }

}
