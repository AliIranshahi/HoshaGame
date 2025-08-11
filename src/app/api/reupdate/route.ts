import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const Account =
    req.cookies.get("Login")?.value || req.cookies.get("Signup")?.value;
  const { category, freshnumber } = await req.json();
  const supabase = await createClient();

  try {
    const { data: user, error } = await supabase
      .from("UserAccount")
      .select("questionStatus")
      .eq("username", Account)
      .single();

    if (error) {
      console.error("Update error:", error);
      return NextResponse.json(
        { message: "Update failed", error },
        { status: 500 }
      );
    }
    if (user) {
      const updateQuestionStatus = {
        ...user.questionStatus,
        [category]: freshnumber,
      };

      const {} = await supabase
        .from("UserAccount")
        .update({ questionStatus: updateQuestionStatus })
        .eq("username", Account);
    }

    return NextResponse.json(
      { message: "seccuse", freshnumber, category },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating questionStatus:", error);
    console.error("API Error:", error); // لاگ کردن خطا

    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
