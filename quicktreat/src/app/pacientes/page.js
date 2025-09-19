'use client'

import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
})

import Navbar from '../components/navbar'
import '../pacientes/teste.css'
import { useEffect, useState } from "react";

export default function Pacientes() {

  const [pacientes, setPacientes] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCPF] = useState("");
  const [endereco, setEndereco] = useState("");
  const [dtNasc, setDtNasc] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPacientes() {
      try {
        const res = await fetch('api/pacientes')
        const data = await res.json();
        setPacientes(data);
      } catch (err) {
        console.error('erro ao buscar pacientes! ', err)
      }
    }
    fetchPacientes();
  }, []);

  async function addPacientes(e) {
    e.preventDefault();
    try {
      const res = await fetch('api/pacientes', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ nome, telefone, email, endereco, cpf, dtNasc })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao adicionar paciente');
      location.reload()
      setPacientes(...pacientes, data.data[0]);

      setNome("");
      setEmail("");
      setCPF("");
      setDtNasc("");
      setEndereco("");
      setTelefone("");
    } catch (err) {

    }
  }

  return (
    <body className={montserrat.className}>
      <Navbar />
      <div className={"fundo-branco"}>
        <h1 className='titulo'>Adicionar pacientes:</h1>
        <form onSubmit={addPacientes}>
          <div className="container">
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="teste"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="teste"
            />
            <input
              type="text"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="teste"
            />
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCPF(e.target.value)}
              className="teste"
            />
            <input
              type="text"
              placeholder="DD/MM/AA"
              value={dtNasc}
              onChange={(e) => setDtNasc(e.target.value)}
              className="teste"
            />
            <input
              type="text"
              placeholder="Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="teste"
            />
          </div>
          <div class="centraliza-botao">
            <button className="botaoEnviar">Enviar</button>
          </div>
        </form>

        <div className='ul-container'>
          <ul>
            {pacientes.map((p) => (
              <li key={p.id}>
                Nome: {p.nome} <br /> Email: {p.email} <br /> Telefone: {p.telefone} <br />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </body>
  );
}
