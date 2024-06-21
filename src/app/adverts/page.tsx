"use client";

import { getAdverts } from "@/api";
import styles from "./page.module.scss";
import { AdvertList } from "@/components/AdvertList/AdvertList";
import { useEffect, useState } from "react";
import { AdvertType } from "@/types/Database";

export default function Adverts() {
	const [adverts, setAdverts] = useState<AdvertType[]>([]);

	useEffect(() => {
		const fetchAdverts = async () => {
			setAdverts(
				(await getAdverts()).sort((a, b) =>
					a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0
				)
			);
		};
		fetchAdverts();
	}, []);

	return (
		<div className={styles.adverts}>
			<AdvertList title="Объявления" adverts={adverts} />
		</div>
	);
}
