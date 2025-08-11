import { createClient } from "@/utils/supabase/server";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { username, password } = await req.json();

  try {
    const { data: user, error } = await supabase
      .from("UserAccount")
      .select("username, password")
      .eq("username", username)
      .single();

    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: "نام کاربری یا رمز عبور اشتباه است" },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
      { message: "secsuse" },
      { status: 200 }
    );

    response.cookies.set("Login", username, {
      httpOnly: true,
      maxAge: 60 * 60,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
    return response;
  } catch (error) {
    return NextResponse.json({ message: "مشکل در ورود" }, { status: 401 });
  }
}
