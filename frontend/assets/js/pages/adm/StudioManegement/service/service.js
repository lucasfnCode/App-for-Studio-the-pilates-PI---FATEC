import { listarStudios } from "./functions/listar";

const api = "http://localhost:8080/";

// Função para montar os headers com token
function getAuthHeaders(extraHeaders = {}) {
    const token = localStorage.getItem('token');
    return {
        authorization: token,
        ...extraHeaders
    };
}

export async function getStudios() {
    try {
        const response = await fetch(`${api}studios`, {
            method: 'GET',
            headers: getAuthHeaders()
        });
        return response.json();
    } catch (error) {
        console.error("Erro ao buscar estúdios:", error);
        return null;
    }
}

export async function createStudio(studioData) {
    try {
        const response = await fetch(`${api}studios`, {
            method: 'POST',
            headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(studioData)
        });

        // Verifica se há conteúdo antes de tentar fazer o .json()
        const contentType = response.headers.get("content-type");
        
        if (response.ok) {
            if (contentType && contentType.includes("application/json")) {
                return await response.json();
            } else {
                console.warn("Resposta sem JSON válido.");
                return null;
            }
        } else {
            console.error(`Erro ${response.status}:`, await response.text());
            return null;
        }
    } catch (error) {
        console.error("Erro ao criar estúdio:", error);
        return null;
    }
}


export async function deleteStudio(id) {
    try {
        const response = await fetch(`${api}studios/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if(response.ok){
            alert("esudio deletado")
            listarStudios()
        }
        return response.json();
    } catch (error) {
        alert("erro ao deletar estudio")
        console.error("Erro ao excluir estúdio:", error);
        return null;
    }
}

export async function getStudioById(id) {
    try {
        const response = await fetch(`${api}studios/${id}`, {
            method: 'GET',
            headers: getAuthHeaders()
        });
        return response.json();
    } catch (error) {
        console.error("Erro ao buscar estúdio por ID:", error);
        return null;
    }
}
