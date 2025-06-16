import { getOrCreateMainElement } from "../../../components/main";
import { NewInstructorForm } from "./components/NewInstructorForm";
import { listarInstructors } from "./instructorService/componentes/listarInstrutores";

export function instructorManegement(){
    const main =getOrCreateMainElement()
    main.innerHTML= `
     <button class="btn btn-success fw-bold px-4 py-2 rounded-pill shadow-sm w-25 m-5" id="new">
                <i class="bi bi-plus-circle me-2"></i>Criar usuario
        </button>



    <div class="container-fluid m-0">
    <div class="card shadow-sm border-0">
        <div class="card-header bg-success text-white py-2 px-3">
        <h6 class="mb-0">Lista de Usuários</h6>
        </div>
        <div class="table-responsive">
        <table class="table table-sm table-striped table-hover align-middle mb-0">
            <thead class="table-light">
            <tr>
                <th>Nome</th>
                <th>Função</th>
                <th>Email</th>
                <th>Contato</th>
                <th>CPF</th>
                <th>Nascimento</th>
                <th>Formação</th>
                <th>Contratação</th>
                <th>Status</th>
                <th class="text-center">Ações</th>
            </tr>
            </thead>
            <tbody id="instructors-body">
            
            <tr>
               
            </tr>
            </tbody>
        </table>
        </div>
    </div>
    </div>
    `
   
    listarInstructors()
    NewInstructorForm()
}