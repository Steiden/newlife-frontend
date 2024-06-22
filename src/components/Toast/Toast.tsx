"use client";

import Image from "next/image";
import styles from "./Toast.module.scss";
import { ToastDataType } from "@/types/Toast";

type PropsType = {
	data: ToastDataType;
	isShow: boolean;
	setIsShow: (isShow: boolean) => void;
};

export const Toast = (props: PropsType) => {
	return (
		<div
			className={`${styles["toast"]} ${styles[`toast--${props.data.status}`]} ${
				props.isShow ? styles["show"] : ""
			}`}
		>
			<header className={styles.toast__header}>
				<h3 className={styles.toast__title}>{props.data.title}</h3>
				<button className={styles.toast__close} onClick={() => props.setIsShow(false)}>
					<Image src="/img/icons/close.svg" alt="close" width={25} height={25} />
				</button>
			</header>
			<div className={styles.toast__content}>
				<p className={styles.toast__text}>{props.data.text}</p>
			</div>
		</div>
	);
};
