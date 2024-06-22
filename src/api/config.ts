const BASE_URL = "http://localhost:8000/api";

export const endpoints: Record<string, string> = {
    adverts: `${BASE_URL}/adverts`,
    users: `${BASE_URL}/users`,
    userByLogin: `${BASE_URL}/users/login`,
};