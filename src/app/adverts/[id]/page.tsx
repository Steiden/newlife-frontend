import styles from "./page.module.scss";

type PropsType = {
	params: {
		id: string;
		slug: string;
	};
};

export default function Advert(prop: PropsType) {
	return (
		<main className={styles.main}>
			<h1 className={styles.title}>{prop.params.id}</h1>
		</main>
	);
}
