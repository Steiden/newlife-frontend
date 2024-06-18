import { AdvertType } from "@/types/Database";
import styles from "./AdvertCard.module.scss";
import Image from "next/image";

type PropsType = {
	advert: AdvertType;
};

export const AdvertCard = (props: PropsType) => {
	return (
		<article className={styles.card}>
			<Image
				src={props.advert?.advert_photos ? props.advert.advert_photos[0].image : ""}
				alt={props.advert.title}
				width={200}
				height={250}
                className={styles.card__image}
			/>
			<div className={styles.card__content}>
				<h4 className={styles.card__title}>{props.advert.title}</h4>
				<p className={styles.card__text}>&bull;{props.advert?.animal_type?.name}</p>
				<p className={styles.card__text}>{props.advert.description}</p>
			</div>
		</article>
	);
};
