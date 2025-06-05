import { getOrCreateMainElement } from "../../../components/main";
import { clearBody } from "../../../function/clearbody";
import {  createlistinstrutor, listarInstrutores } from "../services/people/instrutor";

/**
 * Exibe formulário de edição para um instrutor
 * @param {string} id - ID do instrutor
 * @param {Object} instrutor - Dados atuais do instrutor
 */
export function editForm(instrutor) {
    // Cria o formulário de edição
    const formHTML = `
        <form class="position-absolute bg-warning top-0 end-0 w-50" id="edit-instrutor-form">

            <div class="mb-3">
                <label class="isActive">esta ativo:</label>
                <input type="checkbox" name="isActive" value="on">
            </div>

            <div class="mb-3">
                <label class="form-label">Nome:</label>
                <input type="text" class="form-control" name="name" value="${instrutor.name }">
            </div>

            <div class="mb-3">
                <label class="form-label">Função:</label>
                <input type="text" class="form-control" name="type" value="${instrutor.type }"> 
            </div>

            <div class="mb-3">
                <label class="form-label">Data de Contratação:</label>
                <input type="date" class="form-control" name="hiringDate" value="${instrutor.hiringDate }">
            </div>

            <div class="mb-3">
                <label class="form-label">Email:</label>
                <input type="email" class="form-control" name="email" value="${instrutor.email }">
            </div>

            <div class="mb-3">
                <label class="form-label">Contato:</label>
                <input type="tel" class="form-control" name="contact" value="${instrutor.contact }">
            </div>

            <!-- <div class="mb-3">
                <label class="form-label">Foto:</label>
                <input type="file" accept="image/*" class="form-control" name="photo">
            </div> -->

            <div class="mb-3">
                <label class="form-label">Formação:</label>
                <input type="text" class="form-control" name="formation" value="${instrutor.formation }">
            </div>

            <div class="mb-3">
                <label class="form-label">Conselho:</label>
                <textarea class="form-control" name="advice">${instrutor.advice }</textarea>
            </div>

            <div class="mb-3">
                <label class="form-label">Permissões:</label>
                <ul class="list-group">
                    <li class="list-group-item">
                        Aprovar Orçamentos
                        <input type="checkbox" name="permissions" value="aprovar_orcamentos" >
                    </li>
                    <li class="list-group-item">
                        Gerenciar Equipe
                        <input type="checkbox" name="permissions" value="gerenciar_equipe">
                    </li>
                    <li class="list-group-item">
                        Acesso Total
                        <input type="checkbox" name="permissions" value="acesso_total">
                    </li>
                </ul>
            </div>

            <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                <button type="button" class="btn btn-secondary" id="cancel-edit">Cancelar</button>
            </div>
        </form>
    `;
    
   const main = getOrCreateMainElement()
    main.insertAdjacentHTML('beforeend', formHTML);

    document.getElementById('edit-instrutor-form').addEventListener('submit', (e) =>{
    e.preventDefault();
        const form = document.getElementById('edit-instrutor-form');
        const formrawdata = new FormData(form)
        const formdata = Object.fromEntries(formrawdata.entries())
        formdata.id = instrutor.id
        submitEditForm(formdata);
    
    })
    
}
async function submitEditForm(instrutor) {
    if( instrutor.isActive == "on"){
        instrutor.isActive = true
    }else{
        instrutor.isActive = false
    }
   
    try {
        const response = await fetch(`http://localhost:8080/instructors/${instrutor.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(instrutor)
        });

        if (response.ok) {
            alert('Instrutor atualizado com sucesso!');
        }
        clearBody()
        createlistinstrutor();
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao atualizar instrutor: ' + error.message);
    }
}