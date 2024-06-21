import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.scss";
import { Header } from "@/components/Header/Header";

const montserrat = Montserrat({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
	title: "Новая жизнь",
	description: "Приложение по поиску пропавших животных",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body className={montserrat.className}>
				<Header />
				<main>{children}</main>
				<div className="heart__wrapper">
					<div className="heart"></div>
				</div>
			</body>
		</html>
	);
}
