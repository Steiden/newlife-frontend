import styles from "./Input.module.scss";
import { HTMLInputTypeAttribute } from "react";

type PropsType = {
	placeholder?: string;
	type?: HTMLInputTypeAttribute;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = (props: PropsType) => {
	return <input className={styles.input} {...props} />;
};
