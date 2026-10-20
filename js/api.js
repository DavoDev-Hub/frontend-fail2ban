// Cliente Axios para el backend. El interceptor es el ÚNICO lugar donde se
// inyecta el JWT: toda petición hecha con `api` lleva el header Authorization.
const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("jwt");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Si el backend rechaza el token (expirado o inválido), se regresa al login.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("[JWT] El backend respondió 401: sesión expirada o token inválido");
            logout();
        }
        return Promise.reject(error);
    }
);

function logout() {
    sessionStorage.removeItem("jwt");
    window.location.href = "index.html";
}

// Redirige al login si no hay sesión. Se llama al inicio de dashboard/agregar.
function requireSession() {
    if (!sessionStorage.getItem("jwt")) {
        window.location.href = "index.html";
    }
}

// Lee el nombre de usuario guardado dentro del propio JWT (solo para mostrarlo).
function usuarioDelToken() {
    try {
        const payload = sessionStorage.getItem("jwt").split(".")[1];
        const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
        return JSON.parse(json).preferred_username;
    } catch (e) {
        return "";
    }
}
