"use client";

import { AdvertType } from "@/types/Database";
import styles from "./LastAdverts.module.scss";
import Link from "next/link";
import { AdvertCard } from "../AdvertCard/AdvertCard";
import { useEffect, useState } from "react";

type PropsType = {
	adverts: AdvertType[];
};

export const LastAdverts = (props: PropsType) => {
	const [lastAdverts, setLastAdverts] = useState<AdvertType[]>([]);

	useEffect(() => {
		setLastAdverts(
			props.adverts
				.sort((a: AdvertType, b: AdvertType) => {
					return a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0;
				})
				.slice(0, 5)
		);
	}, [props.adverts]);

	return (
		<section className={`${styles.adverts} container`}>
			<h2 className={styles.adverts__title}>Последние объявления</h2>
			{lastAdverts.length === 0 && <p className={styles.adverts__empty}>Нет объявлений</p>}
			{lastAdverts.length > 0 && (
				<ul className={styles.adverts__list}>
					{lastAdverts.map((advert: AdvertType) => (
						<li className={styles.adverts__item} key={advert.id}>
							<Link href={`/adverts/${advert.id}`} className={styles.advert}>
								<AdvertCard advert={advert} />
							</Link>
						</li>
					))}
				</ul>
			)}
		</section>
	);
};
