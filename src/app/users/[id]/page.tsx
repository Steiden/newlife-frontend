"use client";

import styles from "./page.module.scss";
import { FormEvent, useEffect, useState } from "react";
import { UserType } from "@/types/Database";
import { getUser, updateUser } from "@/api";
import { useUser } from "@/utils/storage";
import { Input } from "@/components/UI/Input/Input";
import { Button } from "@/components/UI/Button/Button";
import { createUnzip } from "zlib";
import axios, { AxiosResponse } from "axios";

type PropsType = {
	params: {
		id: string;
		slug: string;
	};
};

export default function User(props: PropsType) {
	const currUser = useUser();

	const [user, setUser] = useState<UserType>({} as UserType);
	const [fio, setFio] = useState<string>("");
	const [telephone, setTelephone] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [login, setLogin] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const [isEditable, setIsEditable] = useState<boolean>(false);

	useEffect(() => {
		const fetchUser = async () => {
			setUser(await getUser(props.params.id));
		};
		fetchUser();
	}, [props.params]);

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const userData: UserType = {
			id: user.id,
			second_name: fio.split(" ")[0],
			first_name: fio.split(" ")[1],
			patronymic: fio.split(" ")[2],
			telephone: telephone,
			email: email,
			login: login,
			password: password,
		};

		const userUpdated = await updateUser(userData);
		setUser(userUpdated);
	};

	return (
		<form className={styles.data} onSubmit={onSubmit}>
			{user.id === currUser.id && (
				<button
					className={styles.data__mark}
					type="button"
					onClick={() => setIsEditable(!isEditable)}
				>
					<i className="pi pi-pen-to-square"></i>
				</button>
			)}

			<h1 className={styles.data__title}>Мои данные</h1>
			<div className={styles.data__container}>
				<p className={styles.data__text}>
					{user.second_name} {user.first_name} {user.patronymic}
				</p>
				<Input
					className={`${styles.data__input} ${isEditable ? styles["data__input--editable"] : ""}`}
					placeholder="ФИО"
					value={fio}
					onChange={(e) => setFio(e.target.value)}
				/>
			</div>
			<div className={styles.data__container}>
				<p className={styles.data__text}>Телефон: {user.telephone}</p>
				<Input
					className={`${styles.data__input} ${isEditable ? styles["data__input--editable"] : ""}`}
					placeholder="Телефон"
					value={telephone}
					onChange={(e) => setTelephone(e.target.value)}
				/>
			</div>
			<div className={styles.data__container}>
				<p className={styles.data__text}>Почта: {user.email}</p>
				<Input
					className={`${styles.data__input} ${isEditable ? styles["data__input--editable"] : ""}`}
					placeholder="Почта"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			{user.id === currUser.id && (
				<>
					<div className={styles.data__container}>
						<p className={styles.data__text}>Логин: {user.login}</p>
						<Input
							className={`${styles.data__input} ${
								isEditable ? styles["data__input--editable"] : ""
							}`}
							placeholder="Логин"
							value={login}
							onChange={(e) => setLogin(e.target.value)}
						/>
					</div>
					<div className={styles.data__container}>
						<p className={styles.data__text}>Пароль: {user.password}</p>
						<Input
							className={`${styles.data__input} ${
								isEditable ? styles["data__input--editable"] : ""
							}`}
							placeholder="Пароль"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</>
			)}
			{user.id === currUser.id && isEditable && <Button type="submit">Сохранить</Button>}
		</form>
	);
}
