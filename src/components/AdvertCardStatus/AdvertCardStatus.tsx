import { AdvertStatusType } from "@/types/Database";
import styles from "./AdvertCardStatus.module.scss";

type PropsType = {
	status: AdvertStatusType;
};

export const AdvertCardStatus = (props: PropsType) => {
	const getStatusStyle = (): string => {
		return props.status.name === "На рассмотрении"
			? "consideration"
			: props.status.name === "Опубликовано"
			? "published"
			: props.status.name === "Закрыто"
			? "closed"
			: props.status.name === "Отклонено"
			? "rejected"
			: "";
	};

	return (
		<div className={`${styles["status"]} ${styles[`status--${getStatusStyle()}`]}`}>
			<span className={styles.status__name}>{props.status.name}</span>
		</div>
	);
};
