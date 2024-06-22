"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { AdvertType, UserType } from "@/types/Database";
import { getAdverts } from "@/api";
import Image from "next/image";
import { AdvertList } from "@/components/AdvertList/AdvertList";
import { useUser } from "@/utils/storage";

export default function AdvertsMy() {
	const user: UserType = useUser();

	const [adverts, setAdverts] = useState<AdvertType[]>([]);

	useEffect(() => {
		const fetchAdverts = async () => {
            console.log(user);
            
			setAdverts(
				(await getAdverts())
					.filter((a) => a.user_id === user.id)
					.sort((a, b) => (a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0))
			);
		};
		fetchAdverts();
	}, []);

	return (
		<section className={`${styles["adverts"]} container`}>
			<h1 className={styles["adverts__title"]}>Мои объявления</h1>

			{/* На рассмотрении */}
			<details className={`${styles["adverts__accordion"]} ${styles["accordion"]}`}>
				<summary className={styles["accordion__header"]}>
					<h2 className={styles["accordion__title"]}>На рассмотрении</h2>
					<Image
						src="/img/icons/arrow.svg"
						alt="arrow"
						width={50}
						height={50}
						className={styles["accordion__icon"]}
					/>
				</summary>
				<AdvertList title="" adverts={adverts.filter((a) => a.advert_status.id === 1)} />
			</details>

			{/* Опубликованные */}
			<details className={`${styles["adverts__accordion"]} ${styles["accordion"]}`}>
				<summary className={styles["accordion__header"]}>
					<h2 className={styles["accordion__title"]}>Опубликованные</h2>
					<Image
						src="/img/icons/arrow.svg"
						alt="arrow"
						width={50}
						height={50}
						className={styles["accordion__icon"]}
					/>
				</summary>
				<AdvertList title="" adverts={adverts.filter((a) => a.advert_status.id === 2)} />
			</details>

			{/* Отклоненные */}
			<details className={`${styles["adverts__accordion"]} ${styles["accordion"]}`}>
				<summary className={styles["accordion__header"]}>
					<h2 className={styles["accordion__title"]}>Отклоненные</h2>
					<Image
						src="/img/icons/arrow.svg"
						alt="arrow"
						width={50}
						height={50}
						className={styles["accordion__icon"]}
					/>
				</summary>
				<AdvertList title="" adverts={adverts.filter((a) => a.advert_status.id === 3)} />
			</details>

			{/* Закрытые */}
			<details className={`${styles["adverts__accordion"]} ${styles["accordion"]}`}>
				<summary className={styles["accordion__header"]}>
					<h2 className={styles["accordion__title"]}>Закрытые</h2>
					<Image
						src="/img/icons/arrow.svg"
						alt="arrow"
						width={50}
						height={50}
						className={styles["accordion__icon"]}
					/>
				</summary>
				<AdvertList title="" adverts={adverts.filter((a) => a.advert_status.id === 4)} />
			</details>
		</section>
	);
}
