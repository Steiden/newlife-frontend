import styles from "./Button.module.scss";

type PropsType = {
    type: "button" | "submit" | "reset" | undefined;
    children: React.ReactNode;
}

export const Button = (props: PropsType) => {
    return (
        <button className={styles.button} type={props.type}>
            {props.children}
        </button>
    );
}