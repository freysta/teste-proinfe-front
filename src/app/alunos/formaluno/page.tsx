"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "@/api/api";
import { alunoSchema } from "@/validations/validate-aluno";

type FormData = yup.InferType<typeof alunoSchema>;

export default function CadastrarAluno() {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<FormData>({
		resolver: yupResolver(alunoSchema),
		defaultValues: {
			contatos: [{ telefone: "", email: "" }],
		},
	});

	const { fields, append } = useFieldArray({
		control,
		name: "contatos",
	});

	const onSubmit = async (data: FormData) => {
		try {
			await api.post("/alunos", data);
			alert("Aluno cadastrado com sucesso!");
			reset();
		} catch (err) {
			console.error(err);
			alert("Erro ao cadastrar aluno!");
		}
	};

	return (
		<div className="flex justify-center py-10">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full max-w-3xl bg-white p-6 rounded-lg shadow"
			>
				<h2 className="text-xl font-semibold mb-4">Cadastrar Aluno</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block mb-1">Nome *</label>
						<input
							{...register("nome")}
							className="border rounded w-full p-2"
							placeholder="Nome completo"
						/>
						<p className="text-red-500 text-sm">{errors.nome?.message}</p>
					</div>

					<div>
						<label className="block mb-1">CPF</label>
						<input
							{...register("cpf")}
							className="border rounded w-full p-2"
							placeholder="000.000.000-00"
						/>
					</div>

					<div>
						<label className="block mb-1">Data de nascimento *</label>
						<input
							type="date"
							{...register("data_nascimento")}
							className="border rounded w-full p-2"
						/>
						<p className="text-red-500 text-sm">
							{errors.data_nascimento?.message}
						</p>
					</div>

					<div>
						<label className="block mb-1">Sexo *</label>
						<select {...register("sexo")} className="border rounded w-full p-2">
							<option value="">Selecione</option>
							<option value="Masculino">Masculino</option>
							<option value="Feminino">Feminino</option>
						</select>
						<p className="text-red-500 text-sm">{errors.sexo?.message}</p>
					</div>
				</div>

				<div className="mt-4">
					<label className="block mb-1">Nacionalidade *</label>
					<div className="flex gap-4">
						{["Brasileira", "Brasileira_Naturalizada", "Estrangeira"].map(
							(n) => (
								<label key={n} className="flex items-center gap-2">
									<input
										type="radio"
										value={n}
										{...register("nacionalidade")}
									/>
									{n.replace("_", " ")}
								</label>
							)
						)}
					</div>
					<p className="text-red-500 text-sm">
						{errors.nacionalidade?.message}
					</p>
				</div>

				<h3 className="text-lg font-medium mt-6 mb-2">Contatos</h3>
				{fields.map((field, index) => (
					<div
						key={field.id}
						className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3"
					>
						<div>
							<label className="block mb-1">Telefone</label>
							<input
								{...register(`contatos.${index}.telefone`)}
								className="border rounded w-full p-2"
								placeholder="(69) 99999-9999"
							/>
						</div>
						<div>
							<label className="block mb-1">E-mail *</label>
							<input
								{...register(`contatos.${index}.email`)}
								className="border rounded w-full p-2"
								placeholder="email@provedor.com"
							/>
							<p className="text-red-500 text-sm">
								{errors.contatos?.[index]?.email?.message}
							</p>
						</div>
					</div>
				))}

				<button
					type="button"
					onClick={() => append({ telefone: "", email: "" })}
					className="text-blue-600 text-sm mt-2"
				>
					+ Adicionar contato
				</button>

				<div className="flex justify-end gap-3 mt-6">
					<button
						type="button"
						onClick={() => reset()}
						className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
					>
						Limpar
					</button>
					<button
						type="submit"
						className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
					>
						Salvar
					</button>
				</div>
			</form>
		</div>
	);
}
