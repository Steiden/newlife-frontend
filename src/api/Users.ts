import { UserType } from "@/types/Database";
import axios, { AxiosResponse } from "axios";
import { endpoints } from "./config";

export const getUser = async (id: string): Promise<UserType> => {
	try {
		const response: AxiosResponse = await axios.get(`${endpoints.users}/${id}`);
		if (response.status !== 200) throw new Error(response.statusText);
		return response.data.data;
	} catch (e) {
		console.error(e);
		return {} as UserType;
	}
};

export const getUserByLogin = async (login: string): Promise<UserType> => {
	try {
		const response: AxiosResponse = await axios.get(`${endpoints.userByLogin}/${login}`);
		if (response.status !== 200) throw new Error(response.statusText);
		return response.data.data;
	} catch (e) {
		console.error(e);
		return {} as UserType;
	}
};

export const createUser = async (user: UserType): Promise<UserType> => {
	try {
		const response: AxiosResponse = await axios.post(endpoints.users, user);
		if (response.status !== 200) throw new Error(response.statusText);
		return response.data.data;
	} catch (e) {
		console.error(e);
		return {} as UserType;
	}
};

export const updateUser = async (user: UserType): Promise<UserType> => {
	try {
		const response: AxiosResponse = await axios.put(`${endpoints.users}/${user.id}`, user);
		if (response.status !== 200) throw new Error(response.statusText);
		return response.data.data;
	} catch (e) {
		console.error(e);
		return {} as UserType;
	}
};
