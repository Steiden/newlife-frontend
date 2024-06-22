import { AdvertAddressType } from "@/types/Database";
import axios, { AxiosResponse } from "axios";
import { endpoints } from "./config";

export const createAdvertAdress = async (
	advertAdress: AdvertAddressType
): Promise<AdvertAddressType> => {
	try {
		const response: AxiosResponse = await axios.post(endpoints.advertAddress, advertAdress);
		if (response.status !== 200) throw new Error(response.statusText);
		return response.data.data;
	} catch (e) {
		console.error(e);
		return {} as AdvertAddressType;
	}
};
