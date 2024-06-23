import axios, { AxiosResponse } from "axios";
import { endpoints } from "./config";
import { UserBlockingType } from "@/types/Database";

export const getUserBlockings = async (): Promise<UserBlockingType[]> => {
	try {
		const response: AxiosResponse = await axios.get(endpoints.userBlockings);
		if (response.status !== 200) throw new Error(response.statusText);
		return response.data.data;
	} catch (e) {
		console.error(e);
		return [];
	}
};

export const createUserBlocking = async (
	userBlockings: UserBlockingType
): Promise<UserBlockingType> => {
	try {
		const response: AxiosResponse = await axios.post(endpoints.userBlockings, userBlockings);
		if (response.status !== 200) throw new Error(response.statusText);
		return response.data.data;
	} catch (e) {
		console.error(e);
		return {} as UserBlockingType;
	}
};
