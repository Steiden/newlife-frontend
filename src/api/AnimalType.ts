import axios, { AxiosResponse } from "axios";
import { endpoints } from "./config";
import { AnimalTypeType } from "@/types/Database";

export const getAnimalTypes = async (): Promise<AnimalTypeType[]> => {
	try {
		const response: AxiosResponse = await axios.get(endpoints.animalTypes);
		if (response.status !== 200) throw new Error(response.statusText);
		return response.data.data;
	} catch (e) {
		console.log(e);
		return [];
	}
};
