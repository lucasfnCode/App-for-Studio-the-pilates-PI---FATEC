package br.com.semesperanca.app.managing.pilates.studios.service;


import org.springframework.stereotype.Service;

import br.com.semesperanca.app.managing.pilates.studios.application.model.InstructorOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.InstructorInputDTO;
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
            throw new RuntimeException();
        }

        Instructor instructor = optionalInstructor.get();

        instructor.setName(instructorInputDTO.name());
        instructor.setType(instructorInputDTO.type());
        instructor.setHiringDate(instructorInputDTO.hiringDate());
        instructor.setEmail(instructorInputDTO.email());
        instructor.setContact(instructorInputDTO.contact());
        instructor.setFormation(instructorInputDTO.formation());
        instructor.setFormation(instructorInputDTO.formation());
        instructor.setAdvice(instructorInputDTO.advice());
        instructor.setHiringDate(instructorInputDTO.hiringDate());
        instructor.setPermissions(instructorInputDTO.permissions());
        instructor.setIsActive(instructorInputDTO.isActive());

        Instructor updated = instructorRepository.save(instructor);
        return assemblerInstructorOutputDTO(updated);
    }

    public InstructorOutputDTO desactiveInstructorById(String id){
        Optional<Instructor> optionalInstructor = instructorRepository.findById(id);
        if (optionalInstructor.isEmpty()){
            throw new RuntimeException("Instrutor não encontrado.");
        }

        Instructor instructor = optionalInstructor.get();

        instructor.setIsActive(Boolean.FALSE);

        Instructor desactived = instructorRepository.save(instructor);
        return assemblerInstructorOutputDTO(desactived);

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
                instructor.getName(),
                instructor.getType(),
                instructor.getHiringDate(),
                instructor.getEmail(),
                instructor.getContact(),
                instructor.getPhoto(),
                instructor.getFormation(),
                instructor.getAdvice(),
                instructor.getPermissions()
        );
    }

    private Instructor assemblerInstructorEntity(InstructorInputDTO dto){
        Instructor instructor = new Instructor();
                instructor.setName(dto.name());
                instructor.setType(dto.type());
                instructor.setEmail(dto.email());
                instructor.setContact(dto.contact());
                instructor.setPhoto(dto.photo());
                instructor.setHiringDate(dto.hiringDate());
                instructor.setIsActive(dto.isActive());
                instructor.setFormation(dto.formation());
                instructor.setAdvice(dto.advice());
                instructor.setPermissions(dto.permissions());
            return instructor;
    }

}
