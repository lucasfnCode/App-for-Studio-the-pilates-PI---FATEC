import { getOrCreateMainElement } from "../../../components/main";
import { getAllStudents } from "../../../service/studentService";

export const studentManagement = async () => {
    const token = localStorage.getItem("token");
    const alunos = await getAllStudents(token);
    const main = getOrCreateMainElement();
    
    main.innerHTML = `
        <div class="container py-4">
            <h1 class="text-center mb-4">Gerenciamento de Alunos</h1>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                ${alunos.map(aluno => `
                    <div class="col">
                        <a href="#student-report-${aluno.id}" class="text-decoration-none text-dark">
                            <div class="card h-100 shadow">
                                <img src="/assets/img/${aluno.photo || 'default-user.png'}" class="card-img-top object-fit-cover" alt="Foto de ${aluno.name}" style="height: 180px; object-fit: cover;">
                                <div class="card-body">
                                    <h5 class="card-title mb-2">${aluno.name}</h5>
                                    <p class="card-text mb-1"><strong>CPF:</strong> ${aluno.cpf}</p>
                                    <p class="card-text mb-1"><strong>Email:</strong> ${aluno.email}</p>
                                    <span class="badge ${aluno.isActive ? 'bg-success' : 'bg-secondary'}">
                                        ${aluno.isActive ? 'Ativo' : 'Inativo'}
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>
                `).join("")}
            </div>
        </div>
    `;
}