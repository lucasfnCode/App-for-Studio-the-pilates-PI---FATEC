import { API } from "./api";

const URI = 'users/students'

const fetchData = async (url, options) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`Erro: ${response.statusText}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

export const getAllStudents = (token) => fetchData(`${API}${URI}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
});

export const getAllStudentsActives = (token) => fetchData(`${API}${URI}/actives`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
});