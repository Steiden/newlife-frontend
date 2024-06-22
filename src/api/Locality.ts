import { LocalityType } from "@/types/Database";
import axios, { AxiosResponse } from "axios";
import { endpoints } from "./config";

export const getLocalities = async (): Promise<LocalityType[]> => {
	try {
		const response: AxiosResponse = await axios.get(endpoints.localities);
		if (response.status !== 200) throw new Error(response.statusText);
		return response.data.data;
	} catch (e) {
		console.error(e);
		return [];
	}
};
