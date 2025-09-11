'use client'

import '../lista/teste.css'
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
    <div>
      <h1>Pacientes</h1>
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
            value={email}                      // Valor do input controlado pelo estado email
            onChange={(e) => setEmail(e.target.value)} // Atualiza estado email a cada digitação
            className="teste"
          />
          <input
            type="text"
            placeholder="Telefone"
            value={telefone}                      // Valor do input controlado pelo estado email
            onChange={(e) => setTelefone(e.target.value)} // Atualiza estado email a cada digitação
            className="teste"
          />
          <input
            type="text"
            placeholder="CPF"
            value={cpf}                      // Valor do input controlado pelo estado email
            onChange={(e) => setCPF(e.target.value)} // Atualiza estado email a cada digitação
            className="teste"
          />
          <input
            type="date"
            placeholder="Data de Nascimento"
            value={dtNasc}                      // Valor do input controlado pelo estado email
            onChange={(e) => setDtNasc(e.target.value)} // Atualiza estado email a cada digitação
            className="teste"
          />
          <input
            type="text"
            placeholder="Endereço"
            value={endereco}                      // Valor do input controlado pelo estado email
            onChange={(e) => setEndereco(e.target.value)} // Atualiza estado email a cada digitação
            className="teste"
          />
        </div>
        <button type="submit" className='botaoEnviar'>
          Adicionar
        </button>
      </form>

      {/* Lista de pacientes */}
      <ul>
        {pacientes.map((p) => (                 // Itera sobre cada paciente no estado
          <li key={p.id}>
            {p.nome} — {p.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
