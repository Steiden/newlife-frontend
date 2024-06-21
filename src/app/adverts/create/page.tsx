import styles from "./page.module.scss";

export default function AdvertCreate() {
    return (
        <form className={styles.form}>
            <h1 className={styles.form__title}>Создание объявления</h1>
        </form>
    );
}