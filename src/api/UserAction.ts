import { UserActionType, UserActionTypeEnum, UserType } from "@/types/Database";
import axios, { AxiosResponse } from "axios";
import { endpoints } from "./config";
import { useUser } from "@/utils/storage";

export const createUserAction = async (userAction: UserActionType): Promise<UserActionType> => {
	try {
		const response: AxiosResponse = await axios.post(endpoints.userActions, userAction);
		return response.data;
	} catch (e) {
		console.error(e);
		return {} as UserActionType;
	}
};
