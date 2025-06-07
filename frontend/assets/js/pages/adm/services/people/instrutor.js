import { getOrCreateMainElement } from "../../../../components/main";
import { editForm } from "../../components/editinstrutorfroms";
import { callFormInstrutor } from "../../components/newInstrutorForm";

/**
 * Função principal que cria e exibe a lista de instrutores
 * - Cria a estrutura HTML da tabela
 * - Chama a função para carregar os dados dos instrutores
 * - Configura o botão de novo instrutor
 */
export function createlistinstrutor() {
    // Estrutura HTML da tabela de instrutores
    const $list = `
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>---</th>
                    <th>instrutor</th>
                    <th>telefone</th>
                    <th>açoes</th>
                </tr>
            </thead>
            <tbody id="tr">
                <tr></tr>
            </tbody>
        </table>
        <button id="new">novo instrutor</button>
    `;

    // Insere a tabela no elemento principal da página
    const main = getOrCreateMainElement();
    main.insertAdjacentHTML("afterbegin", $list);
    
    // Carrega a lista de instrutores
    listarInstrutores();
    
    // Configura o evento de clique no botão "novo instrutor"
    document.getElementById("new").addEventListener("click", () => callFormInstrutor());
    // TODO: Verificar duplicação de forms (possível bug)
    
}

/**
 * Busca e exibe a lista de instrutores do servidor
 * - Faz uma requisição GET para a API
 * - Para cada instrutor retornado, chama a função de inserção na tabela
 */
export async function listarInstrutores() {
    try {
        const response = await fetch("http://localhost:8080/instructors", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        const result = await response.json();
        result.forEach(element => {insertinlist(element)});
        return result
    } catch (error) {
        console.error("Erro ao listar instrutores:", error);
    }
}
    
function setupEditarButton(instrutor) {
    document.querySelectorAll('.btn-primary').forEach(btn => {
            btn.addEventListener('click', ()=> {
                const tr = btn.closest("tr"); // Encontra a <tr> pai do botão
                const pId = tr.querySelector("p.id").dataset.id; // Busca o <p class="id"> dentro da <tr>
                if(instrutor.id == pId){
                  editForm(instrutor)
                }
            })
    })
    }
    
/**
 * Insere um instrutor na tabela
 * @param {Object} instrutor - Objeto com os dados do instrutor
 * - Cria a linha da tabela com os dados do instrutor
 * - Configura os botões de ação (editar/desativar)
 */



function insertinlist(instrutor) {
    const tr = document.getElementById("tr");
    // Template da linha do instrutor
    const $instrutor = `
        <tr class="${instrutor.isActive}">
            <td><img src="${instrutor.photo}"></td>
            <td>
                nome ${instrutor.name}<br>
                email ${instrutor.email}<br>
   
                <p class="id" data-id="${instrutor.id}">id ${instrutor.id}</p>
            </td>
            <td>${instrutor.contact}</td>
            <td>
                <button class="btn btn-sm btn-primary">Editar</button>
                <button class="btn btn-sm btn-danger">Desativar</button>
            </td>
        </tr>
    `;
    
    // Insere a linha no início da tabela
    tr.insertAdjacentHTML("afterbegin", $instrutor);
    
    // Configura o botão de desativar para este instrutor
    
    setupDesativarButton(instrutor);
    setupEditarButton(instrutor)
}

/**
 * Configura o evento de clique no botão "Desativar"
 * @param {Object} instrutor - Objeto com os dados do instrutor
 * - Extrai o ID do elemento HTML
 * - Chama a função para desativar o instrutor
 */
function setupDesativarButton(instrutor) {
    document.querySelectorAll('.btn-danger').forEach(btn => {
        btn.addEventListener('click', function() {
            // Encontra o elemento que contém o ID
            const idElement = this.closest('tr').querySelector('.id');
            
            // Extrai apenas o valor do ID (remove "id" do início)
            const id = idElement.textContent.replace('id', '').trim();
            
            // Chama a função para desativar o instrutor
            desativainstrutor(id, instrutor);
          
            
        });
    });
}

/**
 * Envia requisição para desativar um instrutor
 * @param {string} id - ID do instrutor a ser desativado
 * @param {Object} bodyrequest - Objeto com os dados do instrutor
 * - Altera o status isActive para false
 * - Envia requisição PUT para a API
 */
async function desativainstrutor(id, bodyrequest) {
    bodyrequest.isActive = false;
    try {
        await fetch(`http://localhost:8080/instructors/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyrequest)
        });
       
        // TODO: Adicionar feedback visual para o usuário (sucesso/erro)
    } catch (error) {
        console.error("Erro ao desativar instrutor:", error);
        return error;
    }
    
    
}