"use client";

import { getAdverts } from "@/api";
import styles from "./page.module.scss";
import { AdvertList } from "@/components/AdvertList/AdvertList";
import { useEffect, useState } from "react";
import { AdvertType } from "@/types/Database";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

export default function Adverts() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const [adverts, setAdverts] = useState<AdvertType[]>([]);
	const [advertsToList, setAdvertsToList] = useState<AdvertType[]>([]);
	const [currPage, setCurrPage] = useState<number>(
		searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1
	);

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

	useEffect(() => {
		router.push(`/adverts?page=${currPage}`);
		setAdvertsToList(returnAdverts());
	}, [adverts, currPage]);

	const returnAdverts = (): AdvertType[] => {
		return adverts.slice(currPage * 10 - 1, currPage * 10 + 9);
	};

	const nextAdverts = (): void => {
		setCurrPage((currPage + 1) * 10 > adverts.length ? currPage : currPage + 1);
	};

	const prevAdverts = (): void => {
		setCurrPage(currPage - 1 < 1 ? 1 : currPage - 1);
	};

	return (
		<div className={styles.adverts}>
			<AdvertList title="Объявления" adverts={advertsToList} />

			<button className={`${styles["arrow"]} ${styles["arrow--left"]}`} onClick={prevAdverts}>
				<Image src="/img/icons/arrow.svg" alt="" width={50} height={50} />
			</button>

			<button className={`${styles["arrow"]} ${styles["arrow--right"]}`} onClick={nextAdverts}>
				<Image src="/img/icons/arrow.svg" alt="" width={50} height={50} />
			</button>
		</div>
	);
}
