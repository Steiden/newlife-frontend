import { AdvertType } from "@/types/Database";
import styles from "./AdvertCard.module.scss";
import Image from "next/image";
import { AdvertCardStatus } from "../AdvertCardStatus/AdvertCardStatus";

type PropsType = {
	advert: AdvertType;
};

export const AdvertCard = (props: PropsType) => {
	const getImage = (src: string): string => {
		return src ? `/img/animals/${src}` : '/img/not-found.webp';
	};

	return (
		<article className={styles.card}>
			<div className={styles['card__img-container']}>
				<Image
					src={getImage(
						props.advert?.advert_photos?.length ? props.advert.advert_photos[0].image : ""
					)}
					alt={props.advert.title}
					width={200}
					height={250}
					className={styles.card__image}
				/>
			</div>
			<div className={styles.card__content}>
				<h4 className={styles.card__title}>{props.advert.title}</h4>
				<p className={styles.card__text}>&bull; {props.advert?.animal_type?.name}</p>
				<p className={styles.card__text}>
					&bull; {new Date(props.advert?.created_at).toLocaleDateString()}
				</p>
				<div className={`${styles["card__description-wrapper"]}`}>
					<p className={styles.card__text}>{props.advert.description}</p>
				</div>
			</div>

			<AdvertCardStatus status={props.advert.advert_status} />
		</article>
	);
};
