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

export const updateAnimalType = async (animalType: AnimalTypeType): Promise<AnimalTypeType> => {
	try {
		const response: AxiosResponse = await axios.put(
			`${endpoints.animalTypes}/${animalType.id}`,
			animalType
		);
		if (response.status !== 200) throw new Error(response.statusText);
		return response.data.data;
	} catch (e) {
		console.log(e);
		return {} as AnimalTypeType;
	}
};

export const deleteAnimalType = async (id: number): Promise<void> => {
	try {
		const response: AxiosResponse = await axios.delete(`${endpoints.animalTypes}/${id}`);
		if (response.status !== 200) throw new Error(response.statusText);
		return response.data;
	} catch (e) {
		console.log(e);
		return;
	}
};
