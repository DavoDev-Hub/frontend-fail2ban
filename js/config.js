// URLs de los servicios (vistas desde el navegador, por eso localhost)
const KEYCLOAK_URL = "http://localhost:8081";
const KEYCLOAK_REALM = "cybersecurity";
const KEYCLOAK_CLIENT_ID = "fastapi-api";
const API_URL = "http://localhost:5000";

const TOKEN_ENDPOINT = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`;
