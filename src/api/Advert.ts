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

export const getAdvert = async (id: string): Promise<AdvertType> => {
	try {
		const response: AxiosResponse = await axios.get(`${endpoints.adverts}/${id}`);
		if (response.status !== 200) throw new Error(response.statusText);
		return response.data.data;
	} catch (e) {
		console.log(e);
		return {} as AdvertType;
	}
};

export const createAdvert = async (advert: AdvertType): Promise<AdvertType> => {
	try {
		const response: AxiosResponse = await axios.post(endpoints.adverts, advert);
		if (response.status !== 200) throw new Error(response.statusText);
		return response.data.data;
	} catch (e) {
		console.log(e);
		return {} as AdvertType;
	}
};

export const updateAdvert = async (advert: AdvertType): Promise<AdvertType> => {
	try {
		const response: AxiosResponse = await axios.put(`${endpoints.adverts}/${advert.id}`, advert);
		if (response.status !== 200) throw new Error(response.statusText);
		return response.data.data;
	} catch (e) {
		console.log(e);
		return {} as AdvertType;
	}
};

export const deleteAdvert = async (id: string): Promise<AdvertType> => {
	try {
		const response: AxiosResponse = await axios.delete(`${endpoints.adverts}/${id}`);
		if (response.status !== 200) throw new Error(response.statusText);
		return response.data;
	} catch (e) {
		console.log(e);
		return {} as AdvertType;
	}
};
