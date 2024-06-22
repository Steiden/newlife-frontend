"use client";

import { Input } from "@/components/UI/Input/Input";
import styles from "./page.module.scss";
import React, { FormEvent, useState } from "react";
import { Button } from "@/components/UI/Button/Button";
import { UserType } from "@/types/Database";
import { createUser, getUserByLogin } from "@/api";
import { Toast } from "@/components/Toast/Toast";
import { ToastDataType, ToastStatusEnum } from "@/types/Toast";
import { useRouter } from "next/navigation";

export default function Login() {
	const router = useRouter();

	const [fio, setFio] = useState<string>("");
	const [telephone, setTelephone] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [login, setLogin] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isShow, setIsShow] = useState<boolean>(false);
	const [toastData, setToastData] = useState<ToastDataType>({} as ToastDataType);

	const onSubmit = async (e: FormEvent): Promise<void> => {
		e.preventDefault();

		const user: UserType = {
			second_name: fio.split(" ")[0],
			first_name: fio.split(" ")[1],
			patronymic: fio.split(" ")[2],
			telephone: telephone,
			email: email,
			login: login,
			password: password,
            is_banned: false,
            role_id: 2, 
		};

        const newUser: UserType = await createUser(user);

		if (!newUser?.id) {
			setToastData({
				title: "Не удалось зарегистрироваться",
				text: "Проверьте, что ввели все данные для регистрации, а также их корректность. Повторите попытку",
				status: ToastStatusEnum.WARNING,
			});
			setIsShow(true);
			return;
		}

		localStorage.setItem("user", JSON.stringify(newUser));
		router.push("/users/me");
	};

	return (
		<>
			<form className={styles.form} onSubmit={onSubmit}>
				<h1 className={styles.form__title}>Регистрация</h1>
				<Input placeholder="ФИО" type="text" value={fio} onChange={(e) => setFio(e.target.value)} />
				<Input
					placeholder="Телефон"
					type="telephone"
					value={telephone}
					onChange={(e) => setTelephone(e.target.value)}
				/>
				<Input
					placeholder="Почта"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
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
				<Button type="submit">Зарегистрироваться</Button>
			</form>

			<Toast data={toastData} isShow={isShow} setIsShow={setIsShow} />
		</>
	);
}
