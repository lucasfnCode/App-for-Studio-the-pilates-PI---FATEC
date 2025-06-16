import { getOrCreateMainElement } from "../../../../components/main";
import { listarInstructors } from "../instructorService/componentes/listarInstrutores";
import { getInstructorById, updateInstructor } from "../instructorService/service";

export async function EditInstructorForm(id) {
  const main = getOrCreateMainElement();
    
  const instructor = await getInstructorById(id);
  
  main.insertAdjacentHTML("beforeend", `
<div class="w-100 card position-absolute top-50 start-50 translate-middle" id="userFormCon" style="max-width: 48rem">
  <div class="card-header bg-success text-white d-flex justify-content-between align-items-center">
    <h5 class="card-title mb-0">Editar Instrutor</h5>
    <button id="close" class="p-0 btn">
      <i class="bi bi-x-lg btn btn-danger"></i>
    </button>
  </div>
  <div class="card-body">
   <form id="userForm" data-id="${instructor.id}">
  <div class="row mb-3">
    <div class="col-md-6">
      <label for="name" class="form-label">Nome Completo</label>
      <input type="text" class="form-control" name="name" id="name" value="${instructor.name}" required>
    </div>
    <div class="col-md-6">
      <label for="cpf" class="form-label">CPF</label>
      <input type="text" class="form-control" name="cpf" id="cpf" value="${instructor.cpf}">
    </div>
  </div>

  <div class="row mb-3">
    <div class="col-md-6">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" name="email" id="email" value="${instructor.email}" required>
    </div>
    <div class="col-md-6">
      <label for="birthDate" class="form-label">Data de Contratação</label>
      <input type="date" class="form-control" name="birthDate" id="birthDate" value="${instructor.birthDate}">
    </div>
  </div>

  <div class="row mb-3">
    <div class="col-md-6">
      <label for="hiringDate" class="form-label">Data de Contratação</label>
      <input type="date" class="form-control" name="hiringDate" id="hiringDate" value="${instructor.hiringDate}">
    </div>
    <div class="col-md-6">
      <label for="contact" class="form-label">Contato</label>
      <input type="text" class="form-control" name="contact" id="contact" value="${instructor.contact}">
    </div>
  </div>

  <div class="row mb-3">
    <div class="col-md-6">
      <label for="formation" class="form-label">Formação</label>
      <input type="text" class="form-control" name="formation" id="formation" value="${instructor.formation}">
    </div>
  

  <div class="mb-3">
    <label for="advice" class="form-label">Conselho</label>
    <textarea class="form-control" name="advice" id="advice" rows="2">${instructor.advice}</textarea>
  </div>

  <button type="submit" class="btn btn-primary w-100">Atualizar</button>
</form>

  </div>
</div>`);

  document.querySelector("#userForm").addEventListener("submit",async (e)=>{

      e.preventDefault();
        const $form = document.querySelector("#userForm");
        const formData = new FormData($form);
        const data =  Object.fromEntries( formData.entries());

        const $instructorsTable = document.querySelector("#instructors-body")

        data.roles = ["ROLE_INSTRUCTOR"]
        data.isActive = true
        const id = $form.dataset.id;

        const bodyrequest =  data
        
        
        await updateInstructor(id,bodyrequest)
        $instructorsTable.innerHTML=""
        
  });
  document.addEventListener("DOMContentLoaded",()=>listarInstructors())
}
