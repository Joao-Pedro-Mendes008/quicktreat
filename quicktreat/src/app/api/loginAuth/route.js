import { NextResponse } from "next/server";
import supabase from "../../../../connections/database";

export async function POST() {
  const {data, error} = await supabase
  .insert 
}