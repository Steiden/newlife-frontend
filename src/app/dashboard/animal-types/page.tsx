"use client";

import styles from "./page.module.scss";
import { deleteAnimalType, getAnimalTypes, updateAnimalType } from "@/api";
import { Input } from "@/components/UI/Input/Input";
import { AnimalTypeType } from "@/types/Database";
import { useEffect, useState } from "react";

export default function AnimalTypes() {
	const [animalTypes, setAnimalTypes] = useState<AnimalTypeType[]>([]);

	useEffect(() => {
		refreshAnimalTypes();
	}, []);

	const refreshAnimalTypes = async () => {
		setAnimalTypes(await getAnimalTypes());
	};

	const editAnimalType = async (id: number) => {
		const animalType: AnimalTypeType = animalTypes.find(
			(animalType: AnimalTypeType) => animalType.id === id
		)!;
		await updateAnimalType(animalType);
		refreshAnimalTypes();
	};

	return (
		<section className={styles["animal-types"]}>
			{animalTypes.length === 0 && (
				<h1 className={styles["animal-types__title"]}>Нет типов животных</h1>
			)}
			{animalTypes.length > 0 && (
				<ul className={styles["animal-types__list"]}>
					{animalTypes.map((animalType: AnimalTypeType) => (
						<li className={styles["animal-types__item"]} key={animalType.id}>
							<div className={styles["animal-types__content"]}>
								<p className={styles["animal-types__text"]}>{animalType.name}</p>
								<Input
									placeholder="Тип животного"
									value={animalType.name}
									onChange={(e) => {
										setAnimalTypes(
											animalTypes.reduce((acc: AnimalTypeType[], val: AnimalTypeType) => {
												if (val.id === animalType.id) {
													val.name = e.target.value;
													acc.push(val);
													return acc;
												}
												acc.push(val);
												return acc;
											}, [])
										);
									}}
								/>
							</div>

							<div className={styles["animal-types__actions"]}>
								<button onClick={() => editAnimalType(animalType.id!)}>
									<i className="pi pi-check"></i>
								</button>
								<button onClick={async () => await deleteAnimalType(animalType.id!)}>
									<i className="pi pi-trash"></i>
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
