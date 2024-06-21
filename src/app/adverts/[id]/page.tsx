'use client';

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { AdvertType } from "@/types/Database";
import { getAdvert } from "@/api";
import { AdvertCard } from "@/components/AdvertCard/AdvertCard";

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


	return (
		<main className={styles.main}>
			<AdvertCard advert={advert} />
		</main>
	);
}
