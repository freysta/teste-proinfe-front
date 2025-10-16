import Sidebar from "@/components/sidebar";
import "./globals.css";
import Header from "@/components/header";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body>
				<Header />
				<div className="flex h-screen">
					<Sidebar />
					<main className="flex-1 p-4 pt-28">{children}</main>
				</div>
			</body>
		</html>
	);
}
