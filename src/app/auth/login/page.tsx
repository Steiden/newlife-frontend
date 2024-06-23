"use client";

import { Input } from "@/components/UI/Input/Input";
import styles from "./page.module.scss";
import React, { FormEvent, useState } from "react";
import { Button } from "@/components/UI/Button/Button";
import { UserActionTypeEnum, UserType } from "@/types/Database";
import { createUserAction, getUserByLogin } from "@/api";
import { Toast } from "@/components/Toast/Toast";
import { ToastDataType, ToastStatusEnum } from "@/types/Toast";
import { useRouter } from "next/navigation";

export default function Login() {
	const router = useRouter();

	const [login, setLogin] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isShow, setIsShow] = useState<boolean>(false);
	const [toastData, setToastData] = useState<ToastDataType>({} as ToastDataType);

	const onSubmit = async (e: FormEvent): Promise<void> => {
		e.preventDefault();

		const user: UserType = await getUserByLogin(login);
		if (!user?.id) {
			setToastData({
				title: "Не удалось авторизоваться",
				text: "Пользователь с таким логином не найден. Проверьте корректность введенных данных и повторите попытку",
				status: ToastStatusEnum.WARNING,
			});
			setIsShow(true);
			return;
		}

		if (password !== user.password) {
			setToastData({
				title: "Не удалось авторизоваться",
				text: "Вы ввели неправильный пароль. Попробуйте другой пароль и повторите попытку",
				status: ToastStatusEnum.WARNING,
			});
			setIsShow(true);
			return;
		}

		await createUserAction({
			user_action_type_id: UserActionTypeEnum.LOG_IN,
			user_id: user?.id,
		});

		localStorage.setItem("user", JSON.stringify(user));
		router.push("/users/me");
	};

	return (
		<>
			<form className={styles.form} onSubmit={onSubmit}>
				<h1 className={styles.form__title}>Авторизация</h1>
				<Input
					placeholder="Логин"
					type="text"
					value={login}
					onChange={(e) => setLogin(e.target.value)}
				/>
				<Input
					placeholder="Пароль"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button type="submit">Войти</Button>
			</form>

			<Toast data={toastData} isShow={isShow} setIsShow={setIsShow} />
		</>
	);
}
