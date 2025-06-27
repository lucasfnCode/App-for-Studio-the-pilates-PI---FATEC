import { API } from "../../../service/api";

const URI = 'sessions';

const fetchData = async (url, options) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`Erro: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

export async function fetchAulasInstrutor() {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
    if (!usuario.id) return [];
    return fetchData(`${API}${URI}/instructor/${encodeURIComponent(usuario.name)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${usuario.token}`,
        }
    });
}

export async function fetchAlunosDaAula(aulaId) {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
    const aula = await fetchData(`${API}${URI}/${aulaId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${usuario.token}`,
        }
    });
    return {
        alunos: aula.students || [],
        presences: aula.presences || [],
    };
}

export async function fetchStudios() {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
    return fetchData(`${API}studios`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${usuario.token}`,
        }
    });
}

export async function criarAula(body) {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
    return fetchData(`${API}${URI}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + usuario.token
        },
        body: JSON.stringify(body)
    });
}

export async function excluirAula(id) {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
    await fetchData(`${API}${URI}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + usuario.token
        }
    });
    return true;
}

export async function atualizarAula(id, body) {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
    return fetchData(`${API}${URI}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usuario.token}`,
        },
        body: JSON.stringify(body),
    });
}

export async function removerPresencaAula(aulaId, alunoId) {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
    await fetchData(`${API}${URI}/presence/${aulaId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usuario.token}`,
        },
        body: JSON.stringify([alunoId]),
    });
    return true;
}

export async function fetchAlunoById(alunoId) {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
    return fetchData(`${API}users/students/${alunoId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${usuario.token}`,
        }
    });
}

export async function getSessionsByAluno(alunoId) {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
    return fetchData(`${API}${URI}/user/${alunoId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${usuario.token}`,
        }
    });
}