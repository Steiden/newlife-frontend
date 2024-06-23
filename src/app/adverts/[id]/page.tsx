"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "./page.module.scss";
import { AdvertType, AnimalTypeType, LocalityType, UserType } from "@/types/Database";
import { getAdvert, getAnimalTypes, getLocalities, deleteAdvert } from "@/api";
import Image from "next/image";
import { AdvertCardStatus } from "@/components/AdvertCardStatus/AdvertCardStatus";
import Link from "next/link";
import { updateAdvert } from "@/api/Advert";
import { Input } from "@/components/UI/Input/Input";
import { Select } from "@/components/UI/Select/Select";
import { Button } from "@/components/UI/Button/Button";
import { useUser } from "@/utils/storage";
import { useRouter } from "next/navigation";

type PropsType = {
	params: {
		id: string;
	};
};

export default function Advert(props: PropsType) {
	const router = useRouter();
	const currUser: UserType = useUser();

	const [advert, setAdvert] = useState<AdvertType>({} as AdvertType);

	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [animalType, setAnimalType] = useState<AnimalTypeType>({} as AnimalTypeType);

	const [animalTypes, setAnimalTypes] = useState<AnimalTypeType[]>([]);

	const [isEditable, setIsEditable] = useState<boolean>(false);

	useEffect(() => {
		const fetchAnimalTypes = async () => {
			setAnimalTypes(await getAnimalTypes());
		};
		fetchAnimalTypes();
	}, []);

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
		return `${advert.advert_address?.locality?.region?.name}, 
		${advert.advert_address?.locality?.name}, 
		ул. ${advert.advert_address?.street_name}, 
		д. ${advert.advert_address?.house_number}`;
	};

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const advertData: AdvertType = {
			id: advert.id,
			title: title,
			description: description,
			animal_type_id: animalType.id,
		};

		const advertUpdated: AdvertType = await updateAdvert(advertData);

		setAdvert(advertUpdated);
		setIsEditable(false);
	};

	return (
		<section className={`container ${styles.advert}`}>
			{!advert.id && <h2>Загрузка...</h2>}
			{advert.id && (
				<>
					{advert.user!.id === currUser?.id && (
						<div className={styles.advert__actions}>
							<button
								className={styles.advert__action}
								type="button"
								onClick={() => setIsEditable(!isEditable)}
							>
								<i className="pi pi-pen-to-square"></i>
							</button>
							<button
								className={styles.advert__action}
								type="button"
								onClick={async () => {
									deleteAdvert(advert.id!.toString());
									router.push("/adverts/my");
								}}
							>
								<i className="pi pi-trash"></i>
							</button>
						</div>
					)}

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
						{!isEditable && (
							<>
								<h2 className={`${styles["advert__title"]}`}>{advert.title}</h2>
								<p className={`${styles["advert__text"]}`}>
									Вид животного: {advert?.animal_type?.name}
								</p>
								<p className={`${styles["advert__text"]}`}>Адрес: {getAddress()}</p>
								<p className={`${styles["advert__text"]}`}>
									Дата публикации: {new Date(advert.created_at!).toLocaleDateString()}
								</p>
								<div className={`${styles["advert__user"]}`}>
									<p className={`${styles["advert__text"]}`}>Пользователь:</p>
									<Link href={`/users/${advert?.user?.id}`} className={`${styles["advert__link"]}`}>
										{advert?.user?.first_name}
									</Link>
									<i className="pi pi-user"></i>
								</div>
								<p className={`${styles["advert__text"]}`}>{advert.description}</p>
							</>
						)}

						{isEditable && (
							<form onSubmit={onSubmit}>
								<Input
									placeholder="Название объявления"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
								<Input
									placeholder="Описание объявления"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
								<Select
									placeholder="Тип животного"
									options={animalTypes.reduce((acc: any, val: AnimalTypeType) => {
										acc.push({
											value: val.id,
											name: val.name,
										});
										return acc;
									}, [])}
									onChange={(e) =>
										setAnimalType(
											animalTypes.find((a) => a.id == +e.target.value) as AnimalTypeType
										)
									}
								/>

								<Button type="submit">Сохранить</Button>
							</form>
						)}
					</div>

					<AdvertCardStatus status={advert.advert_status!} />
				</>
			)}
		</section>
	);
}
