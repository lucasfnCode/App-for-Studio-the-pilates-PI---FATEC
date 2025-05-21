package br.com.semesperanca.app.managing.pilates.studios.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import br.com.semesperanca.app.managing.pilates.studios.application.model.alunoInputDTO.AlunoInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.alunoOutputDTO.AlunoOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.alunoOutputDTO.AreaClienteOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.alunoOutputDTO.AvaliacaoOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.alunoOutputDTO.PlanoOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.model.aluno.Aluno;
import br.com.semesperanca.app.managing.pilates.studios.model.aluno.AreaCliente;
import br.com.semesperanca.app.managing.pilates.studios.model.aluno.Avaliacao;
import br.com.semesperanca.app.managing.pilates.studios.model.aluno.Plano;
import br.com.semesperanca.app.managing.pilates.studios.repository.AlunoRepository;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class AlunoService {
    @Autowired
    private AlunoRepository alunoRepository;

    public List<AlunoOutputDTO> listarAlunos(String tipo) {
        return alunoRepository.findByTipo(tipo).stream()
                .map(this::assemblerAlunoOutputDTO)
                .collect(Collectors.toList());
    }

    public AlunoOutputDTO listarAlunoPorId(String id) {
        Aluno aluno = alunoRepository.findById(id).orElse(null);
        return aluno != null ? assemblerAlunoOutputDTO(aluno) : null;
    }

    public AlunoOutputDTO salvarAluno(AlunoInputDTO alunoInputDTO) {
        Aluno aluno = new Aluno(
                alunoInputDTO.nome(),
                alunoInputDTO.tipo(),
                alunoInputDTO.dataNascimento(),
                alunoInputDTO.email(),
                alunoInputDTO.contato(),
                alunoInputDTO.foto(),
                alunoInputDTO.isActive(),
                new Avaliacao(),
                new Plano(),
                new AreaCliente(),
                alunoInputDTO.evolucao());
        aluno = alunoRepository.save(aluno);
        return assemblerAlunoOutputDTO(aluno);
    }

    public void deleteAluno(String id) {
        Aluno aluno = checkIfAlunoIsActive(id);
        if (aluno != null) {
            aluno.setIsActive(Boolean.FALSE);
            alunoRepository.save(aluno);
        }
    }

    private Aluno checkIfAlunoIsActive(String id) {
        Optional<Aluno> optionalAluno = alunoRepository.findById(id);
        if (optionalAluno.isPresent()) {
            Aluno aluno = optionalAluno.get();
            if (Boolean.TRUE.equals(aluno.getIsActive())) {
                return aluno;
            }
        }
        return null;
    }

    private Aluno assemblerAlunoEntity(AlunoInputDTO alunoInput) {
        System.out.println("Alvo da deserialização: " + alunoInput);

        Avaliacao avaliacao = new Avaliacao(
                alunoInput.avaliacao().descricao(),
                alunoInput.avaliacao().profissional(),
                alunoInput.avaliacao().fotoPostural(),
                alunoInput.avaliacao().dadosRelevantes());
                System.out.println("Avaliacao mapeada: " + avaliacao);

        Plano plano = new Plano(
                alunoInput.plano().modalidade(),
                alunoInput.plano().frequencia(),
                alunoInput.plano().duracao(),
                alunoInput.plano().dataInicio(),
                alunoInput.plano().formaPagamento(),
                alunoInput.plano().desconto(),
                alunoInput.plano().tipoPagamento(),
                alunoInput.plano().dataPrimeiroPagamento(),
                alunoInput.plano().dataVencimento());
                System.out.println("Plano mapeado: " + plano);

        AreaCliente areaCliente = new AreaCliente(
                alunoInput.areaCliente().dataVencimentoPagamento(),
                alunoInput.areaCliente().reposicoes(),
                alunoInput.areaCliente().comprovantePagamento(),
                alunoInput.areaCliente().reciboFiscal(),
                alunoInput.areaCliente().contrato(),
                alunoInput.areaCliente().autorizacaoImagem());
                System.out.println("Área Cliente mapeada: " + areaCliente);

        return new Aluno(
                alunoInput.nome(),
                alunoInput.tipo(),
                alunoInput.dataNascimento(),
                alunoInput.email(),
                alunoInput.contato(),
                alunoInput.foto(),
                alunoInput.isActive(),
                avaliacao,
                plano,
                areaCliente,
                alunoInput.evolucao());
    }

   private AlunoOutputDTO assemblerAlunoOutputDTO(Aluno aluno) {
    AvaliacaoOutputDTO avaliacaoOutputDTO = null;
    if (aluno.getAvaliacao() != null) {
        avaliacaoOutputDTO = new AvaliacaoOutputDTO(
                aluno.getAvaliacao().getDescricao(),
                aluno.getAvaliacao().getProfissional(),
                aluno.getAvaliacao().getFotoPostural(),
                aluno.getAvaliacao().getDadosRelevantes());
    }

    PlanoOutputDTO planoOutputDTO = null;
    if (aluno.getPlano() != null) {
        planoOutputDTO = new PlanoOutputDTO(
                aluno.getPlano().getModalidade(),
                aluno.getPlano().getFrequencia(),
                aluno.getPlano().getDuracao(),
                aluno.getPlano().getDataInicio(),
                aluno.getPlano().getFormaPagamento(),
                aluno.getPlano().getDesconto(),
                aluno.getPlano().getTipoPagamento(),
                aluno.getPlano().getDataPrimeiroPagamento(),
                aluno.getPlano().getDataVencimento());
    }

    AreaClienteOutputDTO areaClienteOutputDTO = null;
    if (aluno.getAreaCliente() != null) {
        areaClienteOutputDTO = new AreaClienteOutputDTO(
                aluno.getAreaCliente().getDataVencimentoPagamento(),
                aluno.getAreaCliente().getReposicoes(),
                aluno.getAreaCliente().getComprovantePagamento(),
                aluno.getAreaCliente().getReciboFiscal(),
                aluno.getAreaCliente().getContrato(),
                aluno.getAreaCliente().getAutorizacaoImagem());
    }

    return new AlunoOutputDTO(
            aluno.getId(),
            aluno.getNome(),
            aluno.getTipo(),
            aluno.getDataNascimento(),
            aluno.getEmail(),
            aluno.getContato(),
            aluno.getFoto(),
            avaliacaoOutputDTO,
            aluno.getEvolucao(),
            planoOutputDTO,
            areaClienteOutputDTO,
            aluno.getIsActive());
}


}
