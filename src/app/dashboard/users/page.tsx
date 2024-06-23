"use client";

import { getUsers, updateUser } from "@/api";
import styles from "./page.module.scss";
import { UserType } from "@/types/Database";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/utils/storage";

export default function Users() {
	const user = useUser();
	const router = useRouter();

	const [users, setUsers] = useState<UserType[]>([]);

	useEffect(() => {
		if (user.role!.name != "admin") router.push("/");

		const fetchUsers = async () => {
			setUsers(await getUsers());
		};
		fetchUsers();
	}, []);

	const blockUser = async (e: any, id: number) => {
		e.stopPropagation();

		await updateUser({
			id: id,
			is_banned: true,
		});

		setUsers(await getUsers());
	};

	const unblockUser = async (e: any, id: number) => {
		e.stopPropagation();

		await updateUser({
			id: id,
			is_banned: false,
		});

		setUsers(await getUsers());
	};

	return (
		<section className={styles.users}>
			{users.length === 0 && <h1 className={styles.users__title}>Нет пользователей</h1>}
			{users.length > 0 && (
				<ul className={styles.users__list}>
					{users.map((user: UserType) => (
						<li
							className={`${styles.users__item} ${user?.is_banned && styles["users__item--block"]}`}
							key={user.id}
						>
							<button
								className={`${styles["users__user-card"]} ${styles["user-card"]}`}
								onClick={() => router.push(`/users/${user.id}`)}
							>
								<div className={styles["user-card__content"]}>
									<i className="pi pi-user"></i>
									<div className={styles["user-card__info"]}>
										<p
											className={`${styles["user-card__text"]} ${styles["user-card__text--small"]}`}
										>
											{user.first_name} {user.second_name} {user.patronymic}
										</p>
										<p
											className={`${styles["user-card__text"]} ${styles["user-card__text--small"]}`}
										>
											{user.email}
										</p>
										<p
											className={`${styles["user-card__text"]} ${styles["user-card__text--small"]}`}
										>
											{user.telephone}
										</p>
									</div>
								</div>
								{!user?.is_banned ? (
									<button
										className={styles["user-card__button"]}
										onClick={(e) => blockUser(e, user.id!)}
									>
										<i className="pi pi-ban"></i>
									</button>
								) : (
									<button
										className={styles["user-card__button"]}
										onClick={(e) => unblockUser(e, user.id!)}
									>
										<i className="pi pi-check"></i>
									</button>
								)}
							</button>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
