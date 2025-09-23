import { NextResponse } from "next/server";
import supabase from "../../../../connections/database";

export async function POST(req) {
  try {
    const body = await req.json();
    const { nome, cpf, data_nascimento, telefone, email, endereco } = body
    const { data, error } = await supabase
      .from('usuarios_consultorio')
      .insert([
        email,
        nome,
        cpf,
        data_nascimento,
        telefone,
        endereco,
        senha
      ]);
    if (error) {
      return NextResponse.json({ err: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Usuário criado com sucesso!" }, {status: 200})
  } catch (err){
    return NextResponse.json({err: error.messgae}, {status: 500})
  }
};

export default async function PATCH(req, res) {
  const body = await req.json();
  const { senha, email } = body;
  const 
  if
  const {data, error} = await supabase.from('usuarios').update('senha')
};