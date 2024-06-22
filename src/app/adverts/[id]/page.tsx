"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { AdvertType } from "@/types/Database";
import { getAdvert } from "@/api";
import { AdvertCard } from "@/components/AdvertCard/AdvertCard";
import Image from "next/image";
import { AdvertCardStatus } from "@/components/AdvertCardStatus/AdvertCardStatus";
import Link from "next/link";

type PropsType = {
	params: {
		id: string;
	};
};

export default function Advert(props: PropsType) {
	const [advert, setAdvert] = useState<AdvertType>({} as AdvertType);

	useEffect(() => {
		const fetchAdvert = async () => {
			setAdvert(await getAdvert(props.params.id));
		};
		fetchAdvert();
	}, [props.params]);

	const getImageSource = (src: string): string => {
		return src ? `/img/animals/${src}` : `/img/not-found.webp`;
	};

	const getAddress = (): string => {
		return `${advert.advert_address.locality?.region?.name}, 
		${advert.advert_address?.locality.name}, 
		ул. ${advert.advert_address?.street_name}, 
		д. ${advert.advert_address?.house_number}`;
	};

	return (
		<section className={`container ${styles.advert}`}>
			{!advert.id && <h2>Загрузка...</h2>}
			{advert.id && (
				<>
					<div className={`${styles["advert__img-container"]}`}>
						<Image
							src={getImageSource(advert.advert_photos[0]?.image)}
							alt="animal"
							className={`${styles["advert__img"]}`}
							width={500}
							height={250}
						/>
						<div
							className={`${styles["advert__img-container"]} ${styles["advert__img-container--horizontal"]}`}
						>
							<Image
								src={getImageSource(advert.advert_photos[1]?.image)}
								alt="animal"
								className={`${styles["advert__img"]}`}
								width={250}
								height={125}
							/>
							<Image
								src={getImageSource(advert.advert_photos[2]?.image)}
								alt="animal"
								className={`${styles["advert__img"]}`}
								width={250}
								height={125}
							/>
						</div>
					</div>
					<div className={`${styles["advert__content"]}`}>
						<h2 className={`${styles["advert__title"]}`}>{advert.title}</h2>
						<p className={`${styles["advert__text"]}`}>Вид животного: {advert.animal_type.name}</p>
						<p className={`${styles["advert__text"]}`}>Адрес: {getAddress()}</p>
						<p className={`${styles["advert__text"]}`}>
							Дата публикации: {new Date(advert.created_at).toLocaleDateString()}
						</p>
						<div className={`${styles["advert__user"]}`}>
							<p className={`${styles["advert__text"]}`}>Пользователь:</p>
							<Link href={`/users/${advert.user.id}`} className={`${styles["advert__link"]}`}>
								{advert.user.first_name}
							</Link>
							<i className="pi pi-user"></i>
						</div>
						<p className={`${styles["advert__text"]}`}>{advert.description}</p>
					</div>

					<AdvertCardStatus status={advert.advert_status} />
				</>
			)}
		</section>
	);
}
