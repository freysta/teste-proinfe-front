import { House, People } from "react-bootstrap-icons";
import React from "react";
import Link from "next/link";

export const Sidebar: React.FC = () => {
	return (
		<aside className="flex flex-col w-56 bg-white shadow-md rounded-r-xl p-3 gap-3 pt-28">
			<Link
				href="/"
				className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
			>
				<House size={18} className="text-gray-700" />
				<span className="text-gray-700 font-medium">Início</span>
			</Link>

			<Link
				href="/alunos"
				className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
			>
				<People size={18} className="text-gray-700" />
				<span className="text-gray-700 font-medium">Alunos</span>
			</Link>
		</aside>
	);
};

export default Sidebar;
