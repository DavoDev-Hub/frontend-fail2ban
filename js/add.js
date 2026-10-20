requireSession();

document.getElementById("who").textContent = usuarioDelToken();
document.getElementById("logout").addEventListener("click", logout);

const form = document.getElementById("addForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "";
    msg.className = "";

    try {
        await api.post("/api/items", {
            name: document.getElementById("name").value,
            category: document.getElementById("category").value,
        });
        // Al volver al dashboard, la lista se vuelve a pedir y ya incluye el nuevo elemento.
        window.location.href = "dashboard.html";
    } catch (err) {
        msg.className = "error";
        msg.textContent = (err.response && err.response.data && err.response.data.error) || "No se pudo guardar";
    }
});
