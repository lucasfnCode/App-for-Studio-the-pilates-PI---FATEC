const api = "http://localhost:8080/";

export async function getStudios() {
    try {
        const response = await fetch(`${api}studios`, {
            method: 'GET'
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
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studioData)
        });
        
        return response.json();
    } catch (error) {
        console.error("Erro ao criar estúdio:", error);
        return null;
    }
}

export async function deleteStudio(id) {
    try {
        const response = await fetch(`${api}studios/${id}`, {
            method: 'DELETE'
        });
        return response.json();
    } catch (error) {
        console.error("Erro ao excluir estúdio:", error);
        return null;
    }
}

export async function getStudioById(id) {
    try {
        const response = await fetch(`${api}studios/${id}`, {
            method: 'GET'
        });
        return response.json();
    } catch (error) {
        console.error("Erro ao buscar estúdio por ID:", error);
        return null;
    }
}
