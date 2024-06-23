const BASE_URL = "http://localhost:8000/api";

export const endpoints: Record<string, string> = {
    adverts: `${BASE_URL}/adverts`,
    users: `${BASE_URL}/users`,
    userByLogin: `${BASE_URL}/users/login`,
    advertAddress: `${BASE_URL}/advert-address`,
    animalTypes: `${BASE_URL}/animal-types`,
    localities: `${BASE_URL}/localities`,
    userActions: `${BASE_URL}/user-actions`,
    userBlockings: `${BASE_URL}/user-blockings`,
};