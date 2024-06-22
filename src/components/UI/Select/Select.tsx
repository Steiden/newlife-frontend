import styles from "./Select.module.scss";

type PropsType = {
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	options: {
		value: string;
		name: string;
	}[];
};

export const Select = (props: PropsType) => {
	return (
		<select className={styles.select} onChange={props.onChange}>
			<option value="" disabled selected>{props.placeholder}</option>
			{props.options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.name}
				</option>
			))}
		</select>
	);
};
