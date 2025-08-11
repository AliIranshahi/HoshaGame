import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const { score: currentScore, postion }: { score: number; postion: boolean } =
    await req.json();

  const Account =
    req.cookies.get("Login")?.value || req.cookies.get("Signup")?.value;

  try {
    const { data: score, error } = await supabase
      .from("UserAccount")
      .select("score , questionStatus")
      .eq("username", Account)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (currentScore && postion) {
      const newScore = score.score + currentScore;
      const {} = await supabase
        .from("UserAccount")
        .update({ score: newScore })
        .eq("username", Account);
    }

    return NextResponse.json(
      { message: "Seccuse Sended Score" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
