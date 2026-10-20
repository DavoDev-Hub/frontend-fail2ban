requireSession();

document.getElementById("who").textContent = usuarioDelToken();
document.getElementById("logout").addEventListener("click", logout);

const lista = document.getElementById("lista");
const vacio = document.getElementById("vacio");

async function cargarItems() {
    try {
        const res = await api.get("/api/items");
        lista.innerHTML = "";
        vacio.hidden = res.data.items.length > 0;
        res.data.items.forEach((item) => {
            const li = document.createElement("li");
            li.innerHTML = `<span class="tag"></span><span class="name"></span>`;
            li.querySelector(".tag").textContent = item.category;
            li.querySelector(".name").textContent = item.name;
            lista.appendChild(li);
        });
    } catch (err) {
        console.error("No se pudo cargar la lista", err);
    }
}

cargarItems();
