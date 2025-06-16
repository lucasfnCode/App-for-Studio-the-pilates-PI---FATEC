import { EditInstructorForm } from "../../components/EditFormInstrutor";
import { deleteInstructor, getInstructors } from "../service";

export async function listarInstructors() {
  const $instructorsTable = document.querySelector("#instructors-body");
  const instructors = await getInstructors()

  instructors.forEach(instrutor => {
        const activeBadge = instrutor.isActive
        ? `<span class="badge bg-success">Ativo</span>`
        : `<span class="badge bg-secondary">Inativo</span>`;

        const actionButtons = instrutor.isActive
  ? `
    <button class="btn btn-sm btn-outline-danger me-1 deactivate" data-id="${instrutor.id}">
      <i class="bi bi-slash-circle"></i>
    </button>
    <button class="btn btn-sm btn-outline-secondary edit" data-id="${instrutor.id}">
      <i class="bi bi-pencil"></i>
    </button>
    `
  : `
    <button class="btn btn-sm btn-outline-success activate" data-id="${instrutor.id}">
      <i class="bi bi-check-circle"></i>
    </button>
    `;

        const birthDate = new Date(instrutor.birthDate).toLocaleDateString("pt-BR");
        const hiringDate = new Date(instrutor.hiringDate).toLocaleDateString("pt-BR");

        $instructorsTable.insertAdjacentHTML("afterbegin", `
        <tr>
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
            
            ${actionButtons}
            </td>
        </tr>
        `);
  });

 

  // Exemplo de listeners para botões (se desejar)
  document.querySelectorAll(".deactivate").forEach(btn => {
    btn.addEventListener("click", async () => { 
    const dataid = btn.dataset.id
      await deleteInstructor(dataid)
      $instructorsTable.innerHTML ="" 
      listarInstructors()
     });
  });
  
  document.querySelectorAll(".edit").forEach(btn => {
    const dataid = btn.dataset.id
    btn.addEventListener("click", () => { 
        EditInstructorForm(dataid)
       });
  });
}





