import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  try {
    const { username, password } = await req.json();

    const { data: sameuser } = await supabase
      .from("UserAccount")
      .select("username")
      .eq("username", username)
      .single();

    if (sameuser) {
      return NextResponse.json({ message: "نام کاربری وجود دارد" }, { status: 401 });
    }

    const { error } = await supabase
      .from("UserAccount")
      .insert([{ username: username, password: password }]);

    if (error) {
      return NextResponse.json(
        { message: "failed to upload" },
        { status: 500 }
      );
    }

    const trackSing = NextResponse.json(
      { message: "secsuse" },
      { status: 200 }
    );

    trackSing.cookies.set("Signup", username, {
      maxAge: 60 * 60,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
    return trackSing;
  } catch (error) {
    return NextResponse.json(
      { message: "failed", error: (error as Error).message },
      { status: 401 }
    );
  }
}
