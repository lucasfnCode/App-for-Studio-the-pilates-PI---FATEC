export async function fetchAulasInstrutor() {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
  if (!usuario.id) return [];

  try {
    const response = await fetch(`http://localhost:8080/sessions/instructor/${encodeURIComponent(usuario.name)}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usuario.token}`,
      },
    });
    if (!response.ok) return [];
    return await response.json();
  } catch (e) {
    console.error("Erro ao buscar aulas do instrutor:", e);
    return [];
  }
}

export async function fetchStudios() {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
  try {
    const response = await fetch("http://localhost:8080/studios", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usuario.token}`,
      },
    });
    if (!response.ok) return [];
    return await response.json();
  } catch (e) {
    console.error("Erro ao buscar studios:", e);
    return [];
  }
}

export async function criarAula(body) {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
  try {
    const response = await fetch("http://localhost:8080/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + usuario.token
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) throw new Error("Erro ao criar aula");
    return await response.json();
  } catch (err) {
    throw err;
  }
}

export async function excluirAula(id) {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
  try {
    const response = await fetch(`http://localhost:8080/sessions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + usuario.token
      }
    });
    if (!response.ok) throw new Error("Erro ao excluir aula");
    return true;
  } catch (err) {
    throw err;
  }
}