# Frontend – Favoritos

Login (usuarios LDAP vía Keycloak) → Dashboard con la lista → Pantalla para agregar.

- El login pide el JWT a Keycloak (`password grant`) y lo guarda en `sessionStorage`.
- `js/api.js`: **interceptor de Axios** que agrega `Authorization: Bearer <jwt>` a cada request al backend y lo muestra con `console.log` (`[JWT] ...`).

```bash
docker compose up --build   # http://localhost:3000
```
Usuarios de prueba: `alice` / `alice123`, `bob` / `bob123`.
# frontend-fail2ban
