package br.com.semesperanca.app.managing.pilates.studios.service;

import br.com.semesperanca.app.managing.pilates.studios.application.model.plan.PlanInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.plan.PlanOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.model.Plan;
import br.com.semesperanca.app.managing.pilates.studios.repository.PlanRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class PlanService {

    private final PlanRepository planRepository;

    public List<PlanOutputDTO> listAllActivePlans() {
        List<Plan> plans = planRepository.findAll().stream()
                .filter(i -> Boolean.TRUE.equals(i.getIsActive()))
                .toList();
        return plans.stream().map(this::assemblerPlanOutputDTO).toList();
    }

    public List<PlanOutputDTO> listAllPlans() {
        List<Plan> plans = planRepository.findAll()
                .stream()
                .toList();
        return plans.stream().map(this::assemblerPlanOutputDTO).toList();
    }

    public PlanOutputDTO listPlanById(String id) {
        Optional<Plan> optionalplan = planRepository.findById(id);
        Plan plan = optionalplan.get();
        return assemblerPlanOutputDTO(plan);
    }

    public PlanOutputDTO createPlan(PlanInputDTO planInputDTO) {
        return assemblerPlanOutputDTO(planRepository.save(assemblerPlanEntity(planInputDTO)));
    }

    public PlanOutputDTO updatePlanById(String id, PlanInputDTO planInputDTO) {
        Optional<Plan> optionalplan = planRepository.findById(id);
        if (optionalplan.isEmpty()) {
            throw new RuntimeException("Plano não encontrado");
        }

        Plan plan = optionalplan.get();

        plan.setName(planInputDTO.name());
        plan.setPeriod(planInputDTO.period());
        plan.setFrequency(planInputDTO.frequency());
        plan.setMonthlyPrice(planInputDTO.monthlyPrice());
        plan.setTotalPrice(planInputDTO.totalPrice());
        plan.setCancellationPolicy(planInputDTO.cancellationPolicy());
        plan.setIsActive(planInputDTO.isActive());

        Plan updated = planRepository.save(plan);
        return assemblerPlanOutputDTO(updated);

    }

    public PlanOutputDTO desactivePlanById(String id) {
        Optional<Plan> optionalplan = planRepository.findById(id);
        Plan plan = optionalplan.get();

        plan.setIsActive(Boolean.FALSE);

        Plan updated = planRepository.save(plan);
        return assemblerPlanOutputDTO(updated);

    }

    private PlanOutputDTO assemblerPlanOutputDTO(Plan plan) {
        return new PlanOutputDTO(
                plan.getId(),
                plan.getName(),
                plan.getPeriod(),
                plan.getFrequency(),
                plan.getMonthlyPrice(),
                plan.getTotalPrice(),
                plan.getCancellationPolicy(),
                plan.getIsActive());
    }

    private Plan assemblerPlanEntity(PlanInputDTO planInputDTO) {
        return new Plan(
                planInputDTO.name(),
                planInputDTO.period(),
                planInputDTO.frequency(),
                planInputDTO.monthlyPrice(),
                planInputDTO.totalPrice(),
                planInputDTO.cancellationPolicy(),
                planInputDTO.isActive());
    }

}
