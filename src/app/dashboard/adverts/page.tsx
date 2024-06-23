"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { AdvertType } from "@/types/Database";
import { getAdverts } from "@/api";
import Link from "next/link";
import { AdvertCard } from "@/components/AdvertCard/AdvertCard";
import { updateAdvert } from "@/api/Advert";

export default function Adverts() {
	const [adverts, setAdverts] = useState<AdvertType[]>([]);

	useEffect(() => {
		refreshAdverts();
	}, []);

	const refreshAdverts = async () => {
		setAdverts((await getAdverts()).filter((a) => a.advert_status_id === 1));
	};

	const acceptAdvert = async (id: number): Promise<void> => {
		await updateAdvert({
			id,
			advert_status_id: 2,
		});

        refreshAdverts();
	};

	const declineAdvert = async (id: number): Promise<void> => {
		await updateAdvert({
			id,
			advert_status_id: 3,
		});

        refreshAdverts();
	};

	return (
		<section className={styles.adverts}>
			{adverts.length === 0 && <h1 className={styles.adverts__title}>Нет объявлений</h1>}
			{adverts.length > 0 && (
				<ul className={styles.adverts__list}>
					{adverts.map((advert: AdvertType) => (
						<li className={styles.adverts__item} key={advert.id}>
							<Link href={`/adverts/${advert.id}`} className={styles.advert}>
								<AdvertCard advert={advert} />
							</Link>

							<div className={styles.adverts__actions}>
								<button className={styles.adverts__action} onClick={() => acceptAdvert(advert.id!)}>
									<i className="pi pi-check"></i>
								</button>
								<button
									className={styles.adverts__action}
									onClick={() => declineAdvert(advert.id!)}
								>
									<i className="pi pi-times"></i>
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
