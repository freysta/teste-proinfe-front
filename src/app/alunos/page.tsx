"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
type Contato = {
	email: string;
	telefone: string;
};

type Aluno = {
	id: number;
	nome: string;
	cpf: string;
	contatos: Contato[];
};

export default function PaginaAlunos() {
	const [alunos, setAlunos] = useState<Aluno[]>([]);
