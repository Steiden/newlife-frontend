"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { AdvertType, UserActionType, UserBlockingType, UserType } from "@/types/Database";
import { getAdverts, getUserActions, getUserBlockings, getUsers } from "@/api";
import { Chart } from "primereact/chart";

export default function Dashboard() {
	const [users, setUsers] = useState<UserType[]>([]);
	const [adverts, setAdverts] = useState<AdvertType[]>([]);
	const [rejectedAdverts, setRejectedAdverts] = useState<AdvertType[]>([]);
	const [userBlockings, setUserBlockings] = useState<UserBlockingType[]>([]);

	const [userRegistrationsData, setUserRegistrationsData] = useState({});
	const [newAdvertsData, setNewAdvertsData] = useState({});
	const [rejectedAdvertsData, setRejectedAdvertsData] = useState({});
	const [userBlockingsData, setUserBlockingsData] = useState({});

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
		const fetchAdverts = async () => {
			setAdverts(await getAdverts());
		};
		fetchAdverts();
	}, []);

	useEffect(() => {
		const fetchUserBlockings = async () => {
			setUserBlockings(await getUserBlockings());
		};
		fetchUserBlockings();
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
					label: "",
					data: Object.values(
						users.reduce((acc: any, val: UserType) => {
							const dateString = `${new Date(val.created_at!).getMonth()}.${new Date(
								val.created_at!
							).getDate()}.${new Date(val.created_at!).getFullYear()}`;
							if (!acc[dateString]) acc[dateString] = 0;
							acc[dateString]++;
							return acc;
						}, [])
					),
					backgroundColor: "rgba(255, 200, 0, 0.2)",
					borderColor: "rgba(255, 200, 0, 1)",
					borderWidth: 1,
				},
			],
		});
	}, [users]);

	useEffect(() => {
		setRejectedAdverts(adverts.filter((a) => a.advert_status_id === 3));

		setNewAdvertsData({
			labels: adverts.reduce((acc: string[], val: AdvertType) => {
				const dateString = new Date(val.created_at!).toLocaleDateString();
				if (!acc.includes(dateString)) {
					acc.push(dateString);
				}
				return acc;
			}, []),
			datasets: [
				{
					label: "",
					data: Object.values(
						adverts.reduce((acc: any, val: AdvertType) => {
							const dateString = `${new Date(val.created_at!).getMonth()}.${new Date(
								val.created_at!
							).getDate()}.${new Date(val.created_at!).getFullYear()}`;
							if (!acc[dateString]) acc[dateString] = 0;
							acc[dateString]++;
							return acc;
						}, [])
					),
					backgroundColor: "rgba(122, 255, 0, 0.2)",
					borderColor: "rgba(122, 255, 0, 1)",
					borderWidth: 1,
				},
			],
		});
	}, [adverts]);

	useEffect(() => {
		setRejectedAdvertsData({
			labels: rejectedAdverts.reduce((acc: string[], val: AdvertType) => {
				const dateString = new Date(val.created_at!).toLocaleDateString();
				if (!acc.includes(dateString)) {
					acc.push(dateString);
				}
				return acc;
			}, []),
			datasets: [
				{
					label: "",
					data: Object.values(
						rejectedAdverts.reduce((acc: any, val: AdvertType) => {
							const dateString = `${new Date(val.created_at!).getMonth()}.${new Date(
								val.created_at!
							).getDate()}.${new Date(val.created_at!).getFullYear()}`;
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
	}, [rejectedAdverts]);

	useEffect(() => {
		setUserBlockingsData({
			labels: userBlockings.reduce((acc: string[], val: UserBlockingType) => {
				const dateString = new Date(val.created_at!).toLocaleDateString();
				if (!acc.includes(dateString)) {
					acc.push(dateString);
				}
				return acc;
			}, []),
			datasets: [
				{
					label: "",
					data: Object.values(
						userBlockings.reduce((acc: any, val: UserBlockingType) => {
							const dateString = `${new Date(val.created_at!).getMonth()}.${new Date(
								val.created_at!
							).getDate()}.${new Date(val.created_at!).getFullYear()}`;
							if (!acc[dateString]) acc[dateString] = 0;
							acc[dateString]++;
							return acc;
						}, [])
					),
					backgroundColor: "rgba(0, 196, 255, 0.2)",
					borderColor: "rgba(0, 196, 255, 1)",
					borderWidth: 1,
				},
			],
		});
	}, [userBlockings]);

	return (
		<section className={`${styles.dashboard}`}>
			<h1 className={styles.dashboard__title}>Статистика</h1>
			<div
				className={`${styles.dashboard__container} ${styles["dashboard__container--horizontal"]}`}
			>
				<div className={styles.dashboard__container}>
					<h2 className={styles["dashboard__container-title"]}>Новые пользователи</h2>
					<Chart className={styles.dashboard__chart} type="bar" data={userRegistrationsData} />
				</div>
				<div className={styles.dashboard__container}>
					<h2 className={styles["dashboard__container-title"]}>Новые объявления</h2>
					<Chart className={styles.dashboard__chart} type="bar" data={newAdvertsData} />
				</div>
			</div>
			<div
				className={`${styles.dashboard__container} ${styles["dashboard__container--horizontal"]}`}
			>
				<div className={styles.dashboard__container}>
					<h2 className={styles["dashboard__container-title"]}>Отклоненные объявления</h2>
					<Chart className={styles.dashboard__chart} type="bar" data={rejectedAdvertsData} />
				</div>
				<div className={styles.dashboard__container}>
					<h2 className={styles["dashboard__container-title"]}>Заблокированные пользователи</h2>
					<Chart className={styles.dashboard__chart} type="bar" data={userBlockingsData} />
				</div>
			</div>
		</section>
	);
}
