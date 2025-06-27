import { getOrCreateMainElement } from "../../../components/main";
import { formatarDataExibicao } from "../../../service/formatData";
import { getAllStudents } from "../../../service/studentService";
import { getSessionsByAluno } from "../../session/service/sessionService";

export const studentReportPage = async (alunoId) => {
    const token = localStorage.getItem("token");
    const alunos = await getAllStudents(token);
    const aluno = alunos.find(a => a.id === alunoId);
    const aulas = await getSessionsByAluno(alunoId);

    console.log(aulas);
    

    const main = getOrCreateMainElement();
    main.innerHTML = `
        <div class="container py-4">
            <div class="row mb-4">
                <div class="col-md-4 d-flex flex-column align-items-center">
                    <img src="/assets/img/${aluno.photo || 'default-user.png'}" class="rounded-circle mb-3" alt="Foto de ${aluno.name}" style="width: 180px; height: 180px; object-fit: cover;">
                    <span class="badge ${aluno.isActive ? 'bg-success' : 'bg-secondary'} mb-2">
                        ${aluno.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                </div>
                <div class="col-md-8">
                    <h2>${aluno.name}</h2>
                    <p><strong>CPF:</strong> ${aluno.cpf}</p>
                    <p><strong>Email:</strong> ${aluno.email}</p>
                </div>
            </div>
            <h4 class="mb-3">Aulas Agendadas</h4>
            <div class="table-responsive">
                <table class="table table-striped align-middle">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Hora</th>
                            <th>Status</th>
                            <th>Instrutor</th>
                            <th>Estúdio</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${aulas.length > 0 ? aulas.map(aula => `
                            <tr>
                                <td>${formatarDataExibicao(aula.day)}</td>
                                <td>${aula.hours || '-'}</td>
                                <td>
                                    <span class="badge ${aula.status === 'CONFIRMED' ? 'bg-success' : 'bg-secondary'}">
                                        ${aula.status}
                                    </span>
                                </td>
                                <td>${aula.instructor || '-'}</td>
                                <td>${aula.studio || '-'}</td>
                            </tr>
                        `).join("") : `
                            <tr>
                                <td colspan="5" class="text-center">Nenhuma aula agendada.</td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>
        </div>
    `;
};