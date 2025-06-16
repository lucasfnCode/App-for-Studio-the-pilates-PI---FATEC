import { getOrCreateMainElement } from "../../../../components/main";
import { instructorManegement } from "../instructorManegement";
import { listarInstructors } from "../instructorService/componentes/listarInstrutores";
import { createInstructor } from "../instructorService/service";

export function NewInstructorForm(){
 
    const $new = document.querySelector("#new")
    const main = getOrCreateMainElement()

  
    $new.addEventListener("click", () =>{
         main.insertAdjacentHTML("beforeend", `
<div class="card position-absolute top-50 start-50 translate-middle" id="userFormCon">

  <div class="card-header bg-success text-white d-flex justify-content-between align-items-center">

    <h5 class="card-title mb-0">Cadastro de Instrutor</h5>

    <button id="close" class="p-0 btn">
      <i class="bi bi-x-lg btn btn-danger"></i>
    </button>

  </div>

  <div class="card-body">


    <form id="userForm">
  <!-- Nome -->
  <div class="mb-3">
    <label for="name" class="form-label">Nome Completo</label>
    <input type="text" class="form-control" name="name" id="name" required>
  </div>

  <!-- E-mail e Contato -->
  <div class="row mb-3">
    <div class="col-md-6">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" name="email" id="email" required>
    </div>
    <div class="col-md-6">
      <label for="contact" class="form-label">Contato</label>
      <input type="tel" class="form-control" name="contact" id="contact">
    </div>
  </div>

  <!-- CPF e Nascimento -->
  <div class="row mb-3">
    <div class="col-md-6">
      <label for="cpf" class="form-label">CPF</label>
      <input type="text" class="form-control" name="cpf" id="cpf">
    </div>
    <div class="col-md-6">
      <label for="birthDate" class="form-label">Data de Nascimento</label>
      <input type="date" class="form-control" name="birthDate" id="birthDate">
    </div>
  </div>

  <!-- Formação -->
  <div class="mb-3">
    <label for="formation" class="form-label">Formação</label>
    <input type="text" class="form-control" name="formation" id="formation">
  </div>

  <!-- Frase de conselho -->
  <div class="mb-3">
    <label for="advice" class="form-label">Conselho</label>
    <textarea class="form-control" name="advice" id="advice" rows="2"></textarea>
  </div>

  <!-- Data de contratação e ativo -->
  <div class="row mb-3">
    <div class="col-md-6">
      <label for="hiringDate" class="form-label">Data de Contratação</label>
      <input type="date" class="form-control" name="hiringDate" id="hiringDate">
    </div>
  </div>

  <!-- Senha -->
  <div class="mb-3">
    <label for="password" class="form-label">Senha</label>
    <input type="password" class="form-control" name="password" id="password">
  </div>

  <!-- Botão -->
  <button type="submit" class="btn btn-success w-100">Salvar</button>
</form>



  </div>
</div>`)
    })
    
    document.addEventListener("submit",async (e)=>{
        e.preventDefault()


            const $form = document.querySelector("#userForm");
            const formData = new FormData($form);
            const data = Object.fromEntries(formData.entries())
            data.isActive = true
            data.roles = ["ROLE_INSTRUCTOR"]
            data.photo = ""
           
            await createInstructor(data)
            document.querySelector("#userFormCon").remove()
          })
}