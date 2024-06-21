"use client";

import { AdvertList } from "@/components/AdvertList/AdvertList";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { AdvertType } from "@/types/Database";
import { getAdverts } from "@/api";
import Image from "next/image";

export default function Home() {
	const [lastAdverts, setLastAdverts] = useState<AdvertType[]>([]);

	useEffect(() => {
		const fetchAdverts = async () => {
			setLastAdverts(
				(await getAdverts())
					.sort((a, b) => {
						return a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0;
					})
					.slice(0, 5)
			);
		};
		fetchAdverts();
	}, []);

	return (
		<div className={styles.main}>
			<section className={`${styles.main__banner} ${styles.banner}`}>
				<h1 className={styles.banner__title}>Новая жизнь</h1>
				<p className={styles.banner__text}>сервис по поиску пропавших животных</p>
			</section>
			<AdvertList title="Последние объявления" adverts={lastAdverts} />
		</div>
	);
}
