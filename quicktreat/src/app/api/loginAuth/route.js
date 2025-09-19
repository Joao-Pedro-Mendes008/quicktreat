import { NextResponse } from "next/server";
import supabase from "../../../../connections/database";

export async function POST(req) {
  const body = await req.json();
  const { nome, cpf, data_nascimento, telefone, email, endereco } = body
  const {data, error} = await supabase
  .from('pacientes')
  .insert([

  ])
}