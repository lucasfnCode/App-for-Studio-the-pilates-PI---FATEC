import { EditInstructorForm } from "../../components/EditFormInstrutor";
import { deleteInstructor, getInstructors, updateInstructor } from "../service";

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
            <td data-name="${instrutor.name}"><strong class="small">${instrutor.name}</strong></td>
            <td><span class="badge bg-info text-dark">Instrutor</span></td>
            <td class="small" data-email="${instrutor.email}">${instrutor.email}</td>
            <td class="small" data-contact="${instrutor.contact}">${instrutor.contact}</td>
            <td class="small" data-cpf="${instrutor.cpf}">${instrutor.cpf}</td>
            <td class="small" data-birth="${birthDate}">${birthDate}</td>
            <td class="small" data-formation="${instrutor.formation}">${instrutor.formation}</td>
            <td class="small" data-hiringDate="${hiringDate}">${hiringDate}</td>
            <td>${activeBadge}</td>
            <td class="text-center">
            
            ${actionButtons}
            </td>
        </tr>
        `);
    document.querySelectorAll(".activate").forEach(btn => {
    const dataid = btn.dataset.id
    btn.addEventListener("click", () => { console.log(instrutor)})

    })
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

  // document.querySelectorAll(".activate").forEach(btn => {
  //   const dataid = btn.dataset.id
  //   btn.addEventListener("click", () => { 
  //                 // Seleciona todas as linhas da tabela que contêm dados do instrutor
  //       const linhasInstrutores = document.querySelectorAll('tr');

  //       // Percorre cada linha
  //       linhasInstrutores.forEach((linha) => {
  //                 const thisinstrutor = {
  //                   name: linha.querySelector('td[data-name]')?.dataset.name,
  //                   email: linha.querySelector('td[data-email]')?.dataset.email,
  //                   contact: linha.querySelector('td[data-contact]')?.dataset.contact,
  //                   cpf: linha.querySelector('td[data-cpf]')?.dataset.cpf,
  //                   birthDate: linha.querySelector('td[data-birth]')?.dataset.birth,
  //                   formation: linha.querySelector('td[data-formation]')?.dataset.formation,
  //                   hiringDate: linha.querySelector('td[data-hiringDate]')?.dataset.hiringDate
  //                 };
  //                 console.log(thisinstrutor);
                  
  //             });

  //         });
  //       });


}