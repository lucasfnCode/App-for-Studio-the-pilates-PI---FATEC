package br.com.semesperanca.app.managing.pilates.studios.service;

import br.com.semesperanca.app.managing.pilates.studios.application.model.receptionist.ReceptionistInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.receptionist.ReceptionistOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.repository.user.ReceptionistRepository;
import br.com.semesperanca.app.managing.pilates.studios.model.Role;
import br.com.semesperanca.app.managing.pilates.studios.model.User;
import br.com.semesperanca.app.managing.pilates.studios.model.receptionist.Receptionist;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ReceptionistService {

    private final ReceptionistRepository receptionistRepository;
    private final PasswordEncoder passwordEncoder;

    public List<ReceptionistOutputDTO> listAllActiveReceptionists() {
        List<Receptionist> receptionists = receptionistRepository.findByRolesContaining(Role.ROLE_RECEPTIONIST)
                .stream().filter(User::getIsActive).toList();
        return receptionists.stream().map(this::assemblerReceptionistOutputDTO).toList();
    }

    public List<ReceptionistOutputDTO> listAllReceptionists() {
        List<Receptionist> receptionists = receptionistRepository.findByRolesContaining(Role.ROLE_RECEPTIONIST);
        return receptionists.stream().map(this::assemblerReceptionistOutputDTO).toList();
    }

    public ReceptionistOutputDTO getReceptionistById(String id) {
        return assemblerReceptionistOutputDTO(Objects.requireNonNull(checkIfIsActive(id)));
    }

    public ReceptionistOutputDTO registerReceptionist(ReceptionistInputDTO receptionistInputDTO) {
        return assemblerReceptionistOutputDTO(receptionistRepository.save(assemblerReceptionistEntity(receptionistInputDTO)));
    }

    public ReceptionistOutputDTO desactiveReceptionistById(String id) {
        Receptionist receptionist = checkIfIsActive(id);
        if (receptionist == null) {
            throw new RuntimeException("Receptionist not found or already inactive");
        }

        receptionist.setIsActive(false);
        return assemblerReceptionistOutputDTO(receptionistRepository.save(receptionist));
    }

    public ReceptionistOutputDTO updateReceptionistById(String id, ReceptionistInputDTO receptionistInputDTO) {
        Optional<Receptionist> optionalReceptionist = receptionistRepository.findById(id);
        if (optionalReceptionist.isEmpty()) {
            throw new RuntimeException("Receptionist not found");
        }

        Receptionist receptionist = optionalReceptionist.get();

        receptionist.setName(receptionistInputDTO.name());
        receptionist.setRoles(receptionistInputDTO.roles().stream().collect(Collectors.toSet()));
        receptionist.setCpf(receptionistInputDTO.cpf());
        receptionist.setBirthDate(receptionistInputDTO.birthDate());
        receptionist.setEmail(receptionistInputDTO.email());
        receptionist.setContact(receptionistInputDTO.contact());
        receptionist.setPhoto(receptionistInputDTO.photo());
        receptionist.setHiringDate(receptionistInputDTO.hiringDate());
        receptionist.setIsActive(receptionistInputDTO.isActive());
        receptionist.setPassword(passwordEncoder.encode(receptionistInputDTO.password()));

        return assemblerReceptionistOutputDTO(receptionistRepository.save(receptionist));
    }

    private ReceptionistOutputDTO assemblerReceptionistOutputDTO(Receptionist receptionist) {
        return new ReceptionistOutputDTO(

                receptionist.getId(),
                receptionist.getName(),
                receptionist.getRoles(),
                receptionist.getCpf(),
                receptionist.getBirthDate(),
                receptionist.getEmail(),
                receptionist.getContact(),
                receptionist.getPhoto(),
                receptionist.getHiringDate(),
                receptionist.getIsActive()
        );
    }

    private Receptionist assemblerReceptionistEntity(ReceptionistInputDTO dto) {

        return Receptionist.builder()
                .name(dto.name())
                .roles(dto.roles().stream().collect(Collectors.toSet()))
                .cpf(dto.cpf())
                .birthDate(dto.birthDate())
                .email(dto.email())
                .contact(dto.contact())
                .photo(dto.photo())
                .hiringDate(dto.hiringDate())
                .isActive(dto.isActive())
                .password(passwordEncoder.encode(dto.password()))
                .build();
    }

    private Receptionist checkIfIsActive(String id) {
        Optional<Receptionist> optionalReceptionist = receptionistRepository.findById(id);
        if (optionalReceptionist.isPresent()) {
            Receptionist receptionist = optionalReceptionist.get();
            if (receptionist.getIsActive()) {
                return receptionist;
            }
        }
        return null;
    }

}