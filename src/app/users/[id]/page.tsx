import { deflate } from "zlib";
import styles from "./page.module.scss";

type PropsType = {
    params: {
        id: string;
        slug: string;
    }
}

export default function User(props: PropsType) {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>{props.params.id}</h1>
        </main>
    )
}