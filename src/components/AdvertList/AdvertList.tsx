"use client";

import { AdvertType } from "@/types/Database";
import styles from "./AdvertList.module.scss";
import Link from "next/link";
import { AdvertCard } from "../AdvertCard/AdvertCard";

type PropsType = {
	title: string;
	adverts: AdvertType[];
};

export const AdvertList = (props: PropsType) => {
	return (
		<section className={`${styles.adverts} container`}>
			<h2 className={styles.adverts__title}>{props.title}</h2>
			{props.adverts.length === 0 && <p className={styles.adverts__empty}>Нет объявлений</p>}
			{props.adverts.length > 0 && (
				<ul className={styles.adverts__list}>
					{props.adverts.map((advert: AdvertType) => (
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
