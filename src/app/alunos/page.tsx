"use client";
import { useEffect, useState } from "react";
import api from "@/api/api";
import { Eye, Pencil, Trash } from "react-bootstrap-icons";
import Link from "next/link";
interface Contato {
	telefone?: string;
	email: string;
}
interface Aluno {
	id_aluno: number;
	nome: string;
	cpf?: string;
	data_nascimento: string;
	sexo: string;
	nacionalidade: string;
	contato: Contato[];
}

export default function ConsultarAlunos() {
	const [alunos, setAlunos] = useState<Aluno[]>([]);
	const [busca, setBusca] = useState("");

	useEffect(() => {
		listarAlunos();
	}, []);

	const listarAlunos = async () => {
		try {
			const res = await api.get("/aluno");
			setAlunos(res.data);
		} catch (err) {
			console.error(err);
		}
	};

	const handleDelete = async (id: number) => {
		if (window.confirm("Tem certeza que deseja excluir este aluno?")) {
			try {
				await api.delete(`/aluno/${id}`);
				listarAlunos();
			} catch (err) {
				console.error(err);
			}
		}
	};

	return (
		<div className="p-8">
			<div className="flex justify-between items-center mb-6">
				<div>
					<h2 className="text-2xl font-semibold">Consultar Alunos</h2>
					<p className="text-gray-500 text-sm">
						Acompanhe ou edite as informações
					</p>
				</div>
				<Link href="/alunos/formaluno">
					<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow">
						+ Novo
					</button>
				</Link>
			</div>

			<div className="mb-4">
				<input
					type="text"
					placeholder="Digite o nome do aluno para pesquisar"
					className="w-full border rounded-md p-2"
					value={busca}
					onChange={(e) => setBusca(e.target.value)}
				/>
			</div>

			<div className="overflow-x-auto bg-white rounded-md shadow">
				<table className="w-full text-left border-collapse">
					<thead>
						<tr>
							<th className="py-2 px-4 font-medium text-gray-700">Nome</th>
							<th className="py-2 px-4 font-medium text-gray-700">CPF</th>
							<th className="py-2 px-4 font-medium text-gray-700">Contato</th>
							<th className="py-2 px-4 font-medium text-gray-700">E-mail</th>
							<th className="py-2 px-4 font-medium text-gray-700 text-center">
								Ações
							</th>
						</tr>
					</thead>
					<tbody>
						{alunos.length > 0 ? (
							alunos.map((aluno) => (
								<tr key={aluno.id_aluno} className="border-t">
									<td className="py-2 px-4">{aluno.nome}</td>
									<td className="py-2 px-4">{aluno.cpf}</td>
									<td className="py-2 px-4">
										{aluno.contato[0]?.telefone || "-"}
									</td>
									<td className="py-2 px-4">
										{aluno.contato[0]?.email || "-"}
									</td>
									<td className="py-2 px-4 text-center">
										<div className="flex justify-center gap-3">
											<Link href={`/alunos/${aluno.id_aluno}`}>
												<button className="text-gray-500 hover:text-gray-700">
													<Eye size={18} />
												</button>
											</Link>
											<Link href={`/alunos/formaluno?id=${aluno.id_aluno}`}>
												<button className="text-blue-500 hover:text-blue-700">
													<Pencil size={18} />
												</button>
											</Link>
											<button
												className="text-red-500 hover:text-red-700"
												onClick={() => handleDelete(aluno.id_aluno)}
											>
												<Trash size={18} />
											</button>
										</div>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={5}
									className="text-center text-gray-500 py-6 italic"
								>
									Nenhum aluno encontrado
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
