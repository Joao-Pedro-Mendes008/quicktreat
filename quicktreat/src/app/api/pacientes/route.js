import { NextResponse } from "next/server";
import supabase from "../../../../connections/database";

export async function GET() {
  const { data, error } = await supabase
    .from('pacientes')
    .select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { nome_completo, cpf, data_nascimento, telefone, email, endereco } = body;
    const { data, error } = await supabase
      .from('pacientes')
      .insert([
        {
          nome_completo,
          cpf,
        },
      ]);
    if (error) {
      return NextResponse.json({ err: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'paciente inserido!' , data}, {status: 200})
  } catch (err) {
    return (NextResponse.json({ error: err.message }), { status: 500 })
  }
}