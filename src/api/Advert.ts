import { AdvertType } from "@/types/Database";
import axios, { AxiosResponse } from "axios";
import { endpoints } from "./config";

export const getAdverts = async (): Promise<AdvertType[]> => {
	try {
		const response: AxiosResponse = await axios.get(endpoints.adverts);
		if (response.status !== 200) throw new Error(response.statusText);
		return response.data.data;
	} catch (e) {
        console.log(e);
		return [];
	}
};
