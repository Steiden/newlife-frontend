"use client";

import { Input } from "@/components/UI/Input/Input";
import styles from "./page.module.scss";
import { FormEvent, useEffect, useState } from "react";
import {
	AdvertAddressType,
	AdvertType,
	AnimalTypeType,
	LocalityType,
	RegionType,
	UserType,
} from "@/types/Database";
import { useUser } from "@/utils/storage";
import { Button } from "@/components/UI/Button/Button";
import { createAdvert, createAdvertAdress, getAnimalTypes, getLocalities } from "@/api";
import { Select } from "@/components/UI/Select/Select";

export default function AdvertCreate() {
	const user: UserType = useUser();

	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [animalType, setAnimalType] = useState<AnimalTypeType>({} as AnimalTypeType);
	const [locality, setLocality] = useState<LocalityType>({} as LocalityType);
	const [street, setStreet] = useState<string>("");
	const [houseNumber, setHouseNumber] = useState<string>("");

	const [animalTypes, setAnimalTypes] = useState<AnimalTypeType[]>([]);
	const [loalities, setLoalities] = useState<LocalityType[]>([]);

	useEffect(() => {
		const fetchAnimalTypes = async () => {
			setAnimalTypes(await getAnimalTypes());
		};
		fetchAnimalTypes();

		const fetchLocalities = async () => {
			setLoalities(await getLocalities());
		};
		fetchLocalities();
	}, []);

	const onSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

		const advertAdressData: AdvertAddressType = {
			street_name: street,
			house_number: houseNumber,
			locality_id: locality.id,
		};

		const advertAddress: AdvertAddressType = await createAdvertAdress(advertAdressData);

		const advertData: AdvertType = {
			title: title,
			description: description,
			animal_type_id: animalType.id,
			advert_address_id: advertAddress.id,
			user_id: user.id!,
            advert_status_id: 1
		};

		const advert: AdvertType = await createAdvert(advertData);
	};

	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<h1 className={styles.form__title}>Создание объявления</h1>

			<Input placeholder="Заголовок" value={title} onChange={(e) => setTitle(e.target.value)} />
			<Input
				placeholder="Описание"
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
					setAnimalType(animalTypes.find((a) => a.id == +e.target.value) as AnimalTypeType)
				}
			/>
			<Select
				placeholder="Город"
				options={loalities.reduce((acc: any, val: LocalityType) => {
					acc.push({
						value: val.id,
						name: val.name,
					});
					return acc;
				}, [])}
				onChange={(e) =>
					setLocality(loalities.find((a) => a.id == +e.target.value) as LocalityType)
				}
			/>
			<Input placeholder="Улица" value={street} onChange={(e) => setStreet(e.target.value)} />
			<Input
				placeholder="Номер дома"
				value={houseNumber}
				onChange={(e) => setHouseNumber(e.target.value)}
			/>

			<Button type="submit">Создать</Button>
		</form>
	);
}
