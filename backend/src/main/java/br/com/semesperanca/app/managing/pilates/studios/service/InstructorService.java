package br.com.semesperanca.app.managing.pilates.studios.service;


import java.util.List;
import org.springframework.stereotype.Service;

import br.com.semesperanca.app.managing.pilates.studios.application.model.InstructorOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.InstructorInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.model.Instructor;
import br.com.semesperanca.app.managing.pilates.studios.repository.InstructorRepository;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class InstructorService {

    private final InstructorRepository instructorRepository;

    public List<InstructorOutputDTO> listAllInstructors() {
        List<Instructor> instructors = instructorRepository.findAll().stream()
            .filter(i -> Boolean.TRUE.equals(i.getIsActive()))
            .toList();
        return instructors.stream().map(this::assemblerInstructorOutputDTO).toList();
    }

    public InstructorOutputDTO registerInstructor(InstructorInputDTO instructorInputDTO){
        return assemblerInstructorOutputDTO(instructorRepository.save(assemblerInstructorEntity(instructorInputDTO)));
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
