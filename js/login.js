const form = document.getElementById("loginForm");
const errorBox = document.getElementById("error");

if (sessionStorage.getItem("jwt")) {
    window.location.href = "dashboard.html";
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorBox.textContent = "";

    // Se usa axios "plano" (no `api`): esta es la petición que OBTIENE el JWT,
    // por eso es la única que no puede llevarlo todavía.
    const body = new URLSearchParams({
        grant_type: "password",
        client_id: KEYCLOAK_CLIENT_ID,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        scope: "openid",
    });

    try {
        const res = await axios.post(TOKEN_ENDPOINT, body, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        sessionStorage.setItem("jwt", res.data.access_token);
        window.location.href = "dashboard.html";
    } catch (err) {
        errorBox.textContent =
            err.response && [400, 401].includes(err.response.status)
                ? "Usuario o contraseña incorrectos"
                : "No se pudo conectar con Keycloak (¿está corriendo en :8081?)";
    }
});
