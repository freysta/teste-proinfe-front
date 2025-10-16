import * as yup from "yup";

export const alunoSchema = yup.object({
	nome: yup
		.string()
		.required("O nome é obrigatório")
		.min(5, "O nome deve ter no mínimo 5 caracteres"),
	data_nascimento: yup.string().required("A data de nascimento é obrigatória"),
	sexo: yup
		.string()
		.oneOf(["Masculino", "Feminino"])
		.required("O sexo é obrigatório"),
	nacionalidade: yup
		.string()
		.oneOf(["Brasileira", "Brasileira-naturalizada", "Estrangeira"])
		.required("A nacionalidade é obrigatória"),
	cpf: yup.string().required("O CPF é obrigatório"),
	contatos: yup
		.array()
		.of(
			yup.object({
				email: yup
					.string()
					.email("Digite um e-mail válido")
					.required("O e-mail é obrigatório"),
				telefone: yup.string().required("O telefone é obrigatório"),
			})
		)
		.min(1, "É obrigatório ter no mínimo um contato")
		.required(),
});
