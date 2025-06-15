import { getInstructors } from "../service";

export async function listarInstructors() {
  const $instructorsTable = document.querySelector("#instructors-body");
  const instructors = await getInstructors()

  instructors.forEach(instrutor => {
    
        console.log("Instrutores vindos do back:", instrutor)
        const activeBadge = instrutor.isActive
        ? `<span class="badge bg-success">Ativo</span>`
        : `<span class="badge bg-secondary">Inativo</span>`;

        const birthDate = new Date(instrutor.birthDate).toLocaleDateString("pt-BR");
        const hiringDate = new Date(instrutor.hiringDate).toLocaleDateString("pt-BR");

        $instructorsTable.insertAdjacentHTML("afterbegin", `
        <tr>
            <td><img src="${instrutor.photo}" alt="${instrutor.name}" class="rounded-circle" width="36" height="36"></td>
            <td><strong class="small">${instrutor.name}</strong></td>
            <td><span class="badge bg-info text-dark">Instrutor</span></td>
            <td class="small">${instrutor.email}</td>
            <td class="small">${instrutor.contact}</td>
            <td class="small">${instrutor.cpf}</td>
            <td class="small">${birthDate}</td>
            <td class="small">${instrutor.formation}</td>
            <td class="small">${hiringDate}</td>
            <td>${activeBadge}</td>
            <td class="text-center">
            
            <button class="btn btn-sm btn-outline-danger me-1 deactivate" data-id="${instrutor.id}">
                <i class="bi bi-slash-circle"></i>
            </button>

            <button class="btn btn-sm btn-outline-secondary edit" data-id="${instrutor.id}">
                <i class="bi bi-pencil"></i>
            </button>
            </td>
        </tr>
        `);
  });

 

  // Exemplo de listeners para botões (se desejar)
  document.querySelectorAll(".view").forEach(btn => {
    btn.addEventListener("click", () => { /* ação de visualizar */ });
  });
  
  document.querySelectorAll(".edit").forEach(btn => {
    btn.addEventListener("click", () => { /* ação de editar */ });
  });
}
