import { AdvertStatusType } from "@/types/Database";
import styles from "./AdvertCardStatus.module.scss";

type PropsType = {
	status: AdvertStatusType;
};

export const AdvertCardStatus = (props: PropsType) => {
	const getStatusStyle = (): string => {
		return props.status.name === "На рассмотрении"
			? "consideration"
			: props.status.name === "Опубликован"
			? "published"
			: props.status.name === "Закрыт"
			? "closed"
			: props.status.name === "Отклонен"
			? "rejected"
			: "";
	};

	return (
		<div className={`${styles["status"]} ${styles[`status--${getStatusStyle()}`]}`}>
			<span className={styles.status__name}>{props.status.name}</span>
		</div>
	);
};
