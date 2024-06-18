"use client";

import { LastAdverts } from "@/components/LastAdverts/LastAdverts";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { AdvertType } from "@/types/Database";
import { getAdverts } from "@/api";

export default function Home() {
	const [adverts, setAdverts] = useState<AdvertType[]>([]);

	useEffect(() => {
		const fetchAdverts = async () => {
			setAdverts(await getAdverts());
		};
		fetchAdverts();
	}, []);

	return (
		<main className={styles.main}>
			<section className={`${styles.main__banner} ${styles.banner}`}>
				<h1 className={styles.banner__title}>Новая жизнь</h1>
				<p className={styles.banner__text}>сервис по поиску пропавших животных</p>
			</section>

			<LastAdverts adverts={adverts} />
		</main>
	);
}
