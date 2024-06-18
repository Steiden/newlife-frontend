'use client';

import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Header = () => {
	const router = useRouter();

	return (
		<header className={styles.header}>
			<Link href="/">
                <Image src="/img/icons/logo.svg" alt="logo" width={160} height={40} className={styles.header__logo} />
            </Link>
			<div className={styles.header__content}>
				<nav className={`${styles.header__nav} ${styles.nav}`}>
					<ul className={`${styles.nav__list}`}>
						<li className={`${styles.nav__item}`}>
							<Link href="/adverts">Объявления</Link>
						</li>
						<li className={`${styles.nav__item}`}>
							<Link href="/adverts/create">Создать объявление</Link>
						</li>
						<li className={`${styles.nav__item}`}>
							<Link href="/adverts/my">Мои объявления</Link>
						</li>
					</ul>
				</nav>
				<button className={styles.header__button} onClick={() => router.push("/users/me")}>
					Я
				</button>
			</div>
		</header>
	);
};
