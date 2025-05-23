package br.com.semesperanca.app.managing.pilates.studios.service;

import br.com.semesperanca.app.managing.pilates.studios.application.model.StudioInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.StudioOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.model.studio.DaysOfWeek;
import br.com.semesperanca.app.managing.pilates.studios.model.studio.Schedules;
import br.com.semesperanca.app.managing.pilates.studios.model.studio.Studio;
import br.com.semesperanca.app.managing.pilates.studios.repository.StudioRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class StudioService {

    private final StudioRepository studioRepository;

    public StudioOutputDTO createStudio(StudioInputDTO studioInputDTO) {
        return assemblerStudioOutputDTO(studioRepository.save(assemblerStudioEntity(studioInputDTO)));
    }

    public List<StudioOutputDTO> listAllStudios() {
        List<Studio> studios = studioRepository.findAll().stream().filter(Studio::getIsActive).toList();
        return studios.stream().map(this::assemblerStudioOutputDTO).toList();
    }

    public StudioOutputDTO getStudioById(String id) {
        return assemblerStudioOutputDTO(Objects.requireNonNull(checkIfItIsActive(id)));
    }

    public void deleteStudio(String id) {
        Studio studio = checkIfItIsActive(id);
        assert studio != null;
        studio.setIsActive(Boolean.FALSE);
        studioRepository.save(studio);
    }

    private Studio checkIfItIsActive(String id) {
        Optional<Studio> optionalStudio = studioRepository.findById(id);
        if (optionalStudio.isPresent()) {
            Studio studio = optionalStudio.get();
            if (studio.getIsActive()) {
                return studio;
            }
        }
        return null;
    }

    private Studio assemblerStudioEntity(StudioInputDTO studioInputDTO) {
        List<DaysOfWeek> daysOperation = studioInputDTO.daysOperation().stream()
                .map(DaysOfWeek::fromDescricao)
                .toList();
        List<Schedules> openingHours = studioInputDTO.openingHours().stream().map(Schedules::fromHorario).toList();
        List<Schedules> unavailableTimes = studioInputDTO.unavailableTimes().stream().map(Schedules::fromHorario).toList();
        Map<Schedules, String> instructorsByTime = studioInputDTO.instructorsByTime().entrySet().stream()
                .collect(Collectors.toMap(e -> Schedules.fromHorario(e.getKey()), Map.Entry::getValue));

        return new Studio(
                studioInputDTO.name(),
                studioInputDTO.address(),
                daysOperation,
                openingHours,
                studioInputDTO.limitStudentsPerClass(),
                unavailableTimes,
                instructorsByTime,
                studioInputDTO.holidays(),
                studioInputDTO.recesses(),
                studioInputDTO.isActive()
        );

    }

    private StudioOutputDTO assemblerStudioOutputDTO(Studio studio) {
        List<String> daysOperation = studio.getDaysOperation().stream()
                .map(DaysOfWeek::toDescricao)
                .toList();
        List<String> openingHours = studio.getOpeningHours().stream().map(Schedules::getValor).toList();
        List<String> unavailableTimes = studio.getUnavailableTimes().stream().map(Schedules::getValor).toList();
        Map<String, String> instructorsByTime = studio.getInstructorsByTime().entrySet().stream()
                .collect(Collectors.toMap(e -> e.getKey().getValor(), Map.Entry::getValue));

        return new StudioOutputDTO(
                studio.getId(),
                studio.getName(),
                studio.getAddress(),
                daysOperation,
                openingHours,
                studio.getLimitStudentsPerClass(),
                unavailableTimes,
                instructorsByTime,
                studio.getHolidays(),
                studio.getRecesses()
        );
    }

}
