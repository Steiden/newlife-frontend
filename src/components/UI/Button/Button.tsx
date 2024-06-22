import styles from "./Button.module.scss";

type PropsType = {
    type?: "button" | "submit" | "reset";
    children: React.ReactNode;
    onClick?: React.ReactEventHandler<HTMLButtonElement>;
}

export const Button = (props: PropsType) => {
    return (
        <button className={styles.button} {...props}>
            {props.children}
        </button>
    );
}