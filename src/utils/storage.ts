import { UserType } from "@/types/Database";

export const useUser = (): UserType => {
	return JSON.parse(localStorage.getItem("user") || "") as UserType;
};
