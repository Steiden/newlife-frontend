import styles from "./Input.module.scss";
import { HTMLInputTypeAttribute } from "react";

type PropsType = {
	placeholder: string;
	type: HTMLInputTypeAttribute;
};

export const Input = (props: PropsType) => {
	return <input className={styles.input} type={props.type} placeholder={props.placeholder} />;
};
