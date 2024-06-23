"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { UserActionType, UserType } from "@/types/Database";
import { getUserActions, getUsers } from "@/api";
import { Chart } from "primereact/chart";

export default function Dashboard() {
	const [userActions, setUserActions] = useState<UserActionType[]>([]);
	const [users, setUsers] = useState<UserType[]>([]);

	const [userRegistrationsData, setUserRegistrationsData] = useState({});

	useEffect(() => {
		const fetchUserActions = async () => {
			setUserActions(await getUserActions());
		};
		fetchUserActions();
	}, []);

	useEffect(() => {
		const fetchUsers = async () => {
			setUsers(
				(await getUsers()).map((u) => {
					const dateString = `${new Date(u.created_at!).getMonth() + 1}.${new Date(
						u.created_at!
					).getDate()}.${new Date(u.created_at!).getFullYear()}`;
					u.created_at = new Date(dateString);
					return u;
				})
			);
		};
		fetchUsers();
	}, []);

	useEffect(() => {
		setUserRegistrationsData({
			labels: users.reduce((acc: string[], val: UserType) => {
				const dateString = new Date(val.created_at!).toLocaleDateString();
				if (!acc.includes(dateString)) {
					acc.push(dateString);
				}
				return acc;
			}, []),
			datasets: [
				{
					label: "Пользователи",
					data: Object.values(
						users.reduce((acc: any, val: UserType) => {
							const dateString = `${new Date(val.created_at!).getMonth()}.${new Date(
								val.created_at!
							).getDate()}.${new Date(val.created_at!).getFullYear()}`;

							console.log(acc, dateString);

							if (!acc[dateString]) acc[dateString] = 0;

							acc[dateString]++;
							return acc;
						}, [])
					),
					backgroundColor: "rgba(255, 99, 132, 0.2)",
					borderColor: "rgba(255, 99, 132, 1)",
					borderWidth: 1,
				},
			],
		});
	}, [users]);

	return (
		<section className={`${styles.dashboard}`}>
			<div className={styles.dashboard__container}>
				<Chart type="bar" data={userRegistrationsData} />
			</div>
		</section>
	);
}
