import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {


  const supabase = await createClient();
  const Account =
    req.cookies.get("Login")?.value || req.cookies.get("Signup")?.value;
  try {
    const { data: score, error } = await supabase
      .from("UserAccount")
      .select("score , questionStatus")
      .eq("username", Account)
      .single();
    console.log(score);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }



    return NextResponse.json({
      score: score.score,
      questionStatus: score.questionStatus,
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
