import { listarInstructors } from "./componentes/listarInstrutores";

const api = "http://localhost:8080/";

// Função para montar os headers com token
function getAuthHeaders(extraHeaders = {}) {
    const token = localStorage.getItem('token');
    return {
        authorization: token,
        ...extraHeaders
    };
}

export async function getInstructors() {
    try {
        const response = await fetch(`${api}users/instructors`, {
            method: 'GET',
            headers: getAuthHeaders()
        });
        return response.json();
    } catch (error) {
        console.error("Erro ao buscar instrutores:", error);
        return null;
    }
}

export async function getActiveInstructors() {
    try {
        const response = await fetch(`${api}users/instructors/actives`, {
            method: 'GET',
            headers: getAuthHeaders()
        });
        return response.json();
    } catch (error) {
        console.error("Erro ao buscar instrutores ativos:", error);
        return null;
    }
}

export async function createInstructor(instructorData) {
    try { 
        console.log("Instrutor a ser criado:", instructorData);
        const response = await fetch(`${api}users/instructors`, {
            method: 'POST',
            headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(instructorData)
        });

        if (response.ok) {
            const pinto = document.querySelector("#instructors-body")
            pinto.innerHTML = ""
            await listarInstructors()
            document.querySelector("#userFormCon").remove()
        }
    } catch (error) {
        console.error("Erro ao criar instrutor:", error);
        return null;
    }
}

export async function deleteInstructor(id) {
    try {
        const response = await fetch(`${api}users/instructors/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        if (response.ok) {
            alert("Instrutor desativado com sucesso");
        }

        return response.json();
    } catch (error) {
        alert("Erro ao deletar instrutor");
        console.error("Erro ao excluir instrutor:", error);
        return null;
    }
}

export async function getInstructorById(id) {
    try {
        console.log(id);
   
        const response = await fetch(`${api}users/instructors/${id}`, {
            method: 'GET',
            headers: getAuthHeaders()
        });
        const result = await response.json();
         result.isActive = true;
        return result;
    } catch (error) {
        console.error("Erro ao buscar instrutor por ID:", error);
        return null;
    }
}

export async function updateInstructor(id,bodyrequest) {
  
    try {
        const response = await fetch(`${api}users/instructors/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(bodyrequest)
        });

        const contentType = response.headers.get("content-type");

        if (response.ok) {
            alert("Instrutor atualizado com sucesso");

            console.log("Instrutor a ser atualizado:", bodyrequest);

            const $instructorsTable = document.querySelector("#instructors-body")
            $instructorsTable.innerHTML=""
            listarInstructors()
            if (contentType && contentType.includes("application/json")) {
                return await response.json();
            } else {
                console.warn("Resposta sem JSON.");
            }
        } else {
            console.error(`Erro ${response.status}:`, await response.text());
            return null;
        }
    } catch (error) {
        console.error("Erro ao atualizar instrutor:", error,bodyrequest);
        return null;
    }
}